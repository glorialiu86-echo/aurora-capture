from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import List, Dict, Tuple

FIRST_PATH = Path("trans-zh-en-firstedition.md")
FINAL_PATH = Path("trans-zh-en.md")
OUT_JSON = Path("G2_CHANGESET.json")
OUT_MD = Path("G2_CHANGESET.md")

# Guide line ranges (1-based, inclusive). Adjust here if Guide range changes.
FIRST_GUIDE_LINES = (203, 294)
FINAL_GUIDE_LINES = (205, 251)

GUIDE_ZH_MISSING_PLACEHOLDER = "[GUIDE_ZH_MISSING_IN_FINAL_BLOCK]"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_entries_with_lines(text: str) -> List[Dict[str, object]]:
    marker = "## Entries"
    idx = text.find(marker)
    if idx == -1:
        raise SystemExit("marker not found: ## Entries")
    lines = text[idx + len(marker) :].splitlines()
    base_line_no = len(text[: idx + len(marker)].splitlines())

    entries = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped:
            i += 1
            continue
        if not stripped.startswith("- zh:"):
            i += 1
            continue
        zh_line_no = base_line_no + i + 1
        zh = stripped[len("- zh:") :].lstrip()
        i += 1
        if i >= len(lines):
            raise SystemExit(f"missing en after zh at line {zh_line_no}")
        line = lines[i]
        stripped = line.strip()
        if not stripped.startswith("- en:"):
            raise SystemExit(f"expected - en: after zh at line {zh_line_no}")
        en_line_no = base_line_no + i + 1
        en = stripped[len("- en:") :].lstrip()
        i += 1
        if en == "|":
            en_lines = []
            while i < len(lines):
                raw = lines[i]
                if raw.strip() == "":
                    j = i + 1
                    while j < len(lines) and lines[j].strip() == "":
                        j += 1
                    if j < len(lines) and lines[j].strip().startswith("- zh:"):
                        break
                    en_lines.append("")
                    i += 1
                    continue
                if raw.strip().startswith("- zh:"):
                    break
                if raw.startswith("    "):
                    en_lines.append(raw[4:])
                else:
                    en_lines.append(raw.lstrip())
                i += 1
            en = "\n".join(en_lines).rstrip()
        entries.append(
            {
                "idx": len(entries) + 1,
                "zh": zh,
                "en": en,
                "zh_line": zh_line_no,
                "en_line": en_line_no,
            }
        )
    return entries


def extract_block_by_lines(text: str, line_range: Tuple[int, int]) -> Dict[str, List[str]]:
    lines = text.splitlines()
    start, end = line_range
    if start < 1 or end > len(lines):
        raise SystemExit(f"line range out of bounds: {line_range}")
    raw = lines[start - 1 : end]

    zh_items: List[str] = []
    en_items: List[str] = []
    i = 0
    while i < len(raw):
        stripped = raw[i].strip()
        if stripped.startswith("- zh:"):
            zh_items.append(stripped[len("- zh:") :].lstrip())
            i += 1
            continue
        if stripped.startswith("- en:"):
            en_val = stripped[len("- en:") :].lstrip()
            i += 1
            if en_val == "|":
                en_lines = []
                while i < len(raw):
                    r = raw[i]
                    if r.strip().startswith("- zh:") or r.strip().startswith("- en:"):
                        break
                    if r.strip() == "" and (i + 1 < len(raw) and raw[i + 1].strip().startswith("- zh:")):
                        break
                    if r.startswith("    "):
                        en_lines.append(r[4:])
                    else:
                        en_lines.append(r.lstrip())
                    i += 1
                en_val = "\n".join(en_lines).rstrip()
            en_items.append(en_val)
            continue
        i += 1
    return {"zh_items": zh_items, "en_items": en_items}


def hard_fail_len_mismatch(first_list, final_list) -> None:
    len_a = len(first_list)
    len_b = len(final_list)
    min_len = min(len_a, len_b)
    idx = min_len + 1
    a = first_list[min_len] if len_a > min_len else None
    b = final_list[min_len] if len_b > min_len else None
    a_snip = None if a is None else {"idx": a["idx"], "zh": a["zh"], "en": a["en"]}
    b_snip = None if b is None else {"idx": b["idx"], "zh": b["zh"], "en": b["en"]}
    msg = (
        "non-guide length mismatch\n"
        f"first_non_guide_len={len_a}, final_non_guide_len={len_b}\n"
        f"first_divergence_index={idx}\n"
        f"first_side={a_snip}\n"
        f"final_side={b_snip}\n"
    )
    raise SystemExit(msg)


def build_pairs(first_list, final_list) -> List[Dict[str, object]]:
    pairs = []
    for i in range(len(final_list)):
        old = first_list[i]
        new = final_list[i]
        flags = []
        if old["zh"] != new["zh"]:
            flags.append("ZH_CHANGED")
        if old["en"] != new["en"]:
            flags.append("EN_CHANGED")
        if old["zh"] == "MISSING" or old["en"] == "MISSING":
            flags.append("OLD_MISSING")
        if new["zh"] == "MISSING" or new["en"] == "MISSING":
            flags.append("NEW_MISSING")
        pairs.append(
            {
                "first_idx": old["idx"],
                "final_idx": new["idx"],
                "oldZh": old["zh"],
                "newZh": new["zh"],
                "oldEn": old["en"],
                "newEn": new["en"],
                "flags": flags,
            }
        )
    return pairs


def build_maps(pairs: List[Dict[str, object]]):
    zh_map: Dict[str, Dict[str, object]] = {}
    en_map: Dict[str, Dict[str, object]] = {}

    for p in pairs:
        old_zh = p["oldZh"]
        new_zh = p["newZh"]
        old_en = p["oldEn"]
        new_en = p["newEn"]

        if old_zh != new_zh and old_zh != "MISSING" and new_zh != "MISSING":
            item = zh_map.setdefault(old_zh, {"newZhSet": [], "idx": []})
            if new_zh not in item["newZhSet"]:
                item["newZhSet"].append(new_zh)
            item["idx"].append({"first_idx": p["first_idx"], "final_idx": p["final_idx"]})

        if old_en != new_en and old_en != "MISSING" and new_en != "MISSING":
            item = en_map.setdefault(old_en, {"newEnSet": [], "idx": []})
            if new_en not in item["newEnSet"]:
                item["newEnSet"].append(new_en)
            item["idx"].append({"first_idx": p["first_idx"], "final_idx": p["final_idx"]})

    conflicts = {
        "zh": {k: v for k, v in zh_map.items() if len(v["newZhSet"]) > 1},
        "en": {k: v for k, v in en_map.items() if len(v["newEnSet"]) > 1},
    }

    return zh_map, en_map, conflicts


def preview(s: str, n: int = 300) -> str:
    return s if len(s) <= n else s[:n] + "…"


def main() -> None:
    first_text = read_text(FIRST_PATH)
    final_text = read_text(FINAL_PATH)

    first_entries = parse_entries_with_lines(first_text)
    final_entries = parse_entries_with_lines(final_text)

    first_guide = extract_block_by_lines(first_text, FIRST_GUIDE_LINES)
    final_guide = extract_block_by_lines(final_text, FINAL_GUIDE_LINES)

    old_zh_block = "\n".join(first_guide["zh_items"])
    old_en_block = "\n".join(first_guide["en_items"])

    new_zh_block = "\n".join(final_guide["zh_items"]) if final_guide["zh_items"] else GUIDE_ZH_MISSING_PLACEHOLDER
    new_en_block = "\n".join(final_guide["en_items"])

    # Exclude guide range by zh_line
    first_non_guide = [
        e
        for e in first_entries
        if not (FIRST_GUIDE_LINES[0] <= e["zh_line"] <= FIRST_GUIDE_LINES[1])
    ]
    final_non_guide = [
        e
        for e in final_entries
        if not (FINAL_GUIDE_LINES[0] <= e["zh_line"] <= FINAL_GUIDE_LINES[1])
    ]

    if len(first_non_guide) != len(final_non_guide):
        hard_fail_len_mismatch(first_non_guide, final_non_guide)

    pairs = build_pairs(first_non_guide, final_non_guide)
    zh_map, en_map, conflicts = build_maps(pairs)

    out_json = {
        "guide_block": {
            "firstedition_lines": FIRST_GUIDE_LINES,
            "final_lines": FINAL_GUIDE_LINES,
            "old_zh_block": old_zh_block,
            "new_zh_block": new_zh_block,
            "old_en_block": old_en_block,
            "new_en_block": new_en_block,
            "type": "GUIDE_BLOCK",
        },
        "pairs": pairs,
        "zh_map": zh_map,
        "en_map": en_map,
        "conflicts": conflicts,
        "unmatched": {
            "firstedition": [],
            "final": [],
        },
    }

    OUT_JSON.write_text(json.dumps(out_json, ensure_ascii=False, indent=2), encoding="utf-8")

    md = []
    md.append("# G2 ChangeSet")
    md.append("")
    md.append("## Summary")
    md.append(f"- firstedition_total: {len(first_entries)}")
    md.append(f"- final_total: {len(final_entries)}")
    md.append(f"- guide_firstedition_lines: {FIRST_GUIDE_LINES[0]}..{FIRST_GUIDE_LINES[1]}")
    md.append(f"- guide_final_lines: {FINAL_GUIDE_LINES[0]}..{FINAL_GUIDE_LINES[1]}")
    md.append(f"- rest_matched: {len(pairs)}")
    md.append("- unmatched_firstedition: 0")
    md.append("- unmatched_final: 0")
    md.append(f"- conflicts_zh: {len(conflicts['zh'])}")
    md.append(f"- conflicts_en: {len(conflicts['en'])}")
    md.append("")
    md.append("## Guide Block")
    md.append(f"- guide_firstedition_lines: {FIRST_GUIDE_LINES[0]}..{FIRST_GUIDE_LINES[1]}")
    md.append(f"- guide_final_lines: {FINAL_GUIDE_LINES[0]}..{FINAL_GUIDE_LINES[1]}")
    md.append(f"- old_zh_preview: {preview(old_zh_block)}")
    md.append(f"- new_zh_preview: {preview(new_zh_block)}")
    md.append(f"- old_en_preview: {preview(old_en_block)}")
    md.append(f"- new_en_preview: {preview(new_en_block)}")
    md.append("- note: Guide is treated as a block-level replacement (type=GUIDE_BLOCK).")
    md.append("")
    md.append("## Conflicts")
    if not conflicts["zh"] and not conflicts["en"]:
        md.append("- None")
    else:
        if conflicts["zh"]:
            md.append("- zh_conflicts:")
            for k in sorted(conflicts["zh"]):
                v = conflicts["zh"][k]
                md.append(f"  - {k} -> {v['newZhSet']} @ {v['idx']}")
        if conflicts["en"]:
            md.append("- en_conflicts:")
            for k in sorted(conflicts["en"]):
                v = conflicts["en"][k]
                md.append(f"  - {k} -> {v['newEnSet']} @ {v['idx']}")
    md.append("")
    md.append("## zh_map")
    for k in sorted(zh_map):
        v = zh_map[k]
        md.append(f"- {k} -> {v['newZhSet']} @ {v['idx']}")
    md.append("")
    md.append("## en_map")
    for k in sorted(en_map):
        v = en_map[k]
        md.append(f"- {k} -> {v['newEnSet']} @ {v['idx']}")
    md.append("")
    md.append("## Unmatched")
    md.append("- firstedition: []")
    md.append("- final: []")

    OUT_MD.write_text("\n".join(md), encoding="utf-8")


if __name__ == "__main__":
    main()
