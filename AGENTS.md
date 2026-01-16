# Project Agent Rules (Aurora Capture)

This project is actively maintained by a human owner.
All agents (including Codex) must follow these rules strictly.

---

## 0. Absolute Priority (Hard Rules)
- ❌ Do NOT modify `main` branch unless the user explicitly says so
- ❌ Do NOT `commit` or `push` unless the user explicitly confirms
- ❌ Do NOT modify files outside the approved list
- ❌ Do NOT perform refactors unless explicitly requested

Violation of any hard rule = immediate rejection.

---

## 1. Branch & Deployment Rules (Very Important)
- `main` branch = production (www)
- `staging` branch = testing / preview
- **All changes must land in `staging` first**
- `staging` auto-deploys to aurora-capture-staging (GitHub Pages)
- `staging` must NOT introduce business-logic divergence from `main`
  - Only UI / testing / instrumentation differences are allowed

---

## 2. Mandatory REVIEW.md (Write Every Time)
For **every non-trivial change** (any code, logic, infra, or behavior change),
the agent **MUST generate a `REVIEW.md` file** in the repo root.

### 2.1 REVIEW.md is required BEFORE commit / push
- Changes are **NOT considered reviewable** without `REVIEW.md`
- The user will review `REVIEW.md` first, not raw diffs
- No `REVIEW.md` → no approval

### 2.1.1 REVIEW.md Rewrite Rule (Mandatory)
- REVIEW.md 只保留“当前这一轮（下一次 commit+push）”的变更摘要，不做历史累积。
- 在一次 commit+push 发生之前：所有细碎需求/补丁/修正都必须叠加进同一个 REVIEW.md（仍需遵守固定模板）。
- 一旦该轮 commit+push 完成：下一轮改动必须**重新改写/覆盖** REVIEW.md（仍使用同一固定模板），不允许把上一次的 `Planned` / `Open questions` / 旧变更继续保留或追加。
- 例外：如果 REVIEW.md 中存在“长期规范/词典/约束”（例如 FIXED_I18N_MAP canonical terms 这类不随版本变化的规范段落），允许保留，但必须明确标注为 `## Reference (Long-lived)` 并与本次变更摘要区块分隔。

### 2.2 REVIEW.md Fixed Template (Do NOT alter)
```md
# Review Summary

## What changed
- Bullet list of concrete changes (3–7 lines max)

## Files touched
- Modified:
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed
- What explicitly did NOT change

## Risk assessment
- Possible failure modes
- Performance / cost / quota impact
- Deployment or environment risks

## How to test
1. Step-by-step manual test instructions
2. Expected results

## Rollback plan
- How to revert safely (e.g. revert commit / switch branch)

## Open questions / follow-ups
- Anything uncertain, deferred, or intentionally skipped
```

---

## 3. Before Coding (Mandatory)
Before writing **any code**, the agent must:
1. Summarize understanding of the task
2. List **exact files** to be modified or created
3. Explicitly state whether business logic is affected
4. Wait for explicit user confirmation

---

## 4. Code Modification Rules
- Use **full function** or **full block replacement**
- ❌ Do NOT insert scattered lines
- ❌ Do NOT do “cleanup”, “formatting”, or “small improvements” unless asked
- ❌ Do NOT rename files / variables / functions unless requested

---

## 4.1 Large File Protocol (Mandatory for files > 800 lines)

### Anti-Disconnect Priority (High)
When connection instability or reconnecting is observed:
- The agent must prioritize minimal IO and minimal output over completeness.
- The agent must NOT re-read large files unless explicitly instructed.
- The agent must switch to "low-output mode" automatically.

### A. No Full-File Scans
- ❌ Do NOT read, summarize, or reason about the entire file.
- ❌ Do NOT output the full file or large continuous sections.
- All modifications MUST be localized via explicit anchors such as:
  - Function names (e.g. `bootstrap()`)
  - Event handlers (e.g. `btnLoginConfirm` click handler)
  - Clearly identifiable IDs or selectors
- Modifications are restricted to **within ~30–80 lines around the anchor**.
- If an anchor cannot be confidently located:
  - STOP
  - Report: `anchor not found` + the closest matching symbol
  - Do NOT guess or refactor.
- Re-reading the same large file multiple times due to reconnect is explicitly forbidden.

### B. Anchor-Based Editing Only
- All changes MUST be made relative to **explicit anchors**, such as:
  - Function names (e.g. `bootstrap()`)
  - Event handlers (e.g. `btnLoginConfirm` click handler)
  - Clearly identifiable IDs or selectors
- Modifications are restricted to **within ~30–80 lines around the anchor**.
- If an anchor cannot be confidently located:
  - STOP
  - Report: `anchor not found` + the closest matching symbol
  - Do NOT guess or refactor.

### C. One Anchor per Step
- Each execution step may modify **only one anchor**.
- Multi-anchor changes MUST be split into multiple steps.
- The agent must STOP after completing one anchor and wait for confirmation.
- If reconnecting occurs, the agent must STOP after the current anchor and wait for user confirmation.

### D. Output Restrictions (Anti-Disconnect)
- Default to "low-output mode" once reconnecting or stream interruption is detected.
- Allowed outputs in low-output mode:
  1. Anchor-local diffs only (±20 lines)
  2. Short bullet summaries (max 5 bullets)
  3. File list or commit hash (no inline diffs)
- Explicitly forbidden in low-output mode:
  - Full files
  - Multi-anchor diffs
  - REVIEW.md full text
  - Re-reading or summarizing large files

### E. Review-by-Evidence (No Global Self-Verification)
- For large files, **evidence-based review** replaces full consistency scans.
- Evidence consists of:
  - File list (`git diff --stat`)
  - Anchor-local diffs (`git diff -U5`)
  - REVIEW.md alignment
- ❌ Do NOT perform whole-file re-reads to "ensure safety".

### F. Commit / Push Separation
- For large files:
  - ❌ The agent must NOT commit or push by default.
  - The agent provides diffs or patch instructions only.
  - Commit / push is performed by the human unless explicitly approved.

Violation of this protocol is treated as a **scope and workflow violation**.
---

## 5. Scope Control
- Only modify files explicitly approved by the user
- If a better solution exists:
  - Explain it
  - Wait for user decision
  - Do NOT auto-implement

---

## 6. Language & Style
- User instructions may be in Chinese
- Code, APIs, comments, and identifiers must be in English
- Markdown documentation must be clear, concise, and factual
- 语言规则：默认简体中文；仅在用户明确要求时使用英文！

## 6.1 Versioning Rule (Mandatory)
- 每次 **commit + push**（无论是否部署到 production），都必须同步更新项目版本号。
- 当前版本号仅存在于 **index.html** 中，用于：
  - 静态资源缓存控制（如 `?v=0319`）
  - 页面底部展示用版本号文本（如 `v3.0.0319`）
- 当前版本号格式为 **MMDD**（例如 0319）。

### 升级规则
- 每次 push 时，将 **index.html 中现有的版本号 `0319` 全部统一 +1**（例如 `0319 → 0320`）。
- 仅允许修改 **index.html 内已存在的版本号位置**（预计约 8 处）。
- ❌ 不得在其他文件中新建版本号字段
- ❌ 不得修改文件名、变量名、配置结构或引入新的版本机制
- ❌ 不得推断、搜索或修改“可能是版本号”的其他数字

### 约束
- 若发生 push 但未更新上述版本号，视为 **流程不合规**
- 若越权修改 index.html 以外的文件中的“版本号”，同样视为 **违规**

---

## 7. Workflow Summary (TL;DR)
1. Explain plan → wait
2. Implement in `staging`
3. Generate `REVIEW.md`
4. User reviews `REVIEW.md`
5. Only then: commit / push (if approved)

## Review Output Contract（强制）

本仓库的所有代码修改，必须产出**人类可读、可决策**的 REVIEW.md。
REVIEW.md 的目标读者是「项目 Owner（人类）」，不是工具或代理。

任何未按以下结构更新 REVIEW.md 的提交，视为 **未完成任务**，不得合并或部署。

---

### REVIEW.md 强制结构（顺序不可变）

#### 0. 本次变更一句话
- 用一句话说明“你改了什么”
- ≤ 25 字，禁止技术流水账

#### 1. 改动范围（Scope）
**1.1 改了什么**
- 文件列表
- 每个文件一句话说明改动点

**1.2 明确没改什么（Hard No）**
- 明确列出本次未触碰的模块 / 流程
- 例如：预测流程、Auth 状态机、翻译规则、Modal 结构等

#### 2. 行为变化（Behavior Change）
用 Before / After 描述用户可感知变化（3–8 条）：
- Before：……
  After：……

禁止只写实现细节。

#### 3. 风险与护栏（Risk & Guardrails）
最多 5 条，每条必须包含：
- 风险是什么
- 在什么条件下触发
- 已采取的护栏 / 降级策略

不确定的地方必须标注 **Unverified**。

#### 4. 验收清单（Acceptance Checklist）
- 必须是人类可以逐条操作的 Pass / Fail 清单
- 与本次改动无关的项必须标注 Not in scope

#### 5. 回滚方案（Rollback）
- 一句话说明如何回滚（revert 哪个 commit / tag）

### 输出要求
- 每次任务完成后，必须在回复中 **贴出本次更新的 REVIEW.md 全文**
- 只说“已更新 REVIEW.md”视为未完成

Anything outside this flow is invalid.