# AUDIT_i18n_stoploss_v0

## 1) 环境信息
- git status -sb: ## staging...origin/staging [ahead 3]
- git rev-parse --abbrev-ref HEAD: staging
- git rev-parse HEAD: d68ae2cddb758b1ace67fc68189ffb080d88d2e1

### 1.1 目录与文件清单
#### ls -la
```
total 648
drwxr-xr-x@ 30 glorialiu  staff     960 Jan 25 18:53 .
drwx------@ 20 glorialiu  staff     640 Jan 25 18:53 ..
-rw-r--r--@  1 glorialiu  staff    8196 Jan  4 22:27 .DS_Store
drwxr-xr-x  16 glorialiu  staff     512 Jan 25 18:53 .git
drwxr-xr-x   3 glorialiu  staff      96 Jan 18 14:40 .github
-rw-r--r--@  1 glorialiu  staff      33 Jan 18 14:40 .gitignore
-rw-r--r--@  1 glorialiu  staff    9364 Jan 18 14:40 AGENTS.md
-rw-r--r--@  1 glorialiu  staff      21 Jan  4 13:19 CNAME
-rw-r--r--@  1 glorialiu  staff      32 Jan  4 13:19 IvL7cfDyBp.txt
-rw-r--r--@  1 glorialiu  staff    6085 Jan 18 14:40 MODEL_EXPLANATION.md
-rw-r--r--@  1 glorialiu  staff    9281 Jan 18 14:40 MODEL_WHITEBOX.md
-rw-r--r--@  1 glorialiu  staff    1561 Jan 18 17:46 REVIEW.md
drwxr-xr-x@  6 glorialiu  staff     192 Jan  4 10:39 aacgm-mlat-service
-rw-r--r--   1 glorialiu  staff    4275 Jan  3 07:02 adapter.js
-rw-r--r--@  1 glorialiu  staff  107532 Jan 18 14:40 app.js
drwxr-xr-x  11 glorialiu  staff     352 Jan  4 23:06 assets
-rw-r--r--@  1 glorialiu  staff     249 Jan 18 14:40 config.example.js
-rw-r--r--@  1 glorialiu  staff     220 Jan 18 14:40 config.public.js
drwxr-xr-x   4 glorialiu  staff     128 Jan  3 07:08 data
-rw-r--r--@  1 glorialiu  staff   28548 Jan 18 17:45 index.html
-rw-r--r--@  1 glorialiu  staff   13845 Jan 18 14:40 model.js
drwxr-xr-x   6 glorialiu  staff     192 Jan 18 14:40 noaa
-rw-r--r--@  1 glorialiu  staff     769 Jan 18 14:40 staging.css
-rw-r--r--@  1 glorialiu  staff   36605 Jan 18 14:40 style.css
-rw-r--r--@  1 glorialiu  staff    5629 Jan 18 14:40 supabaseClient.js
drwxr-xr-x   3 glorialiu  staff      96 Jan  3 07:18 tools
-rw-r--r--@  1 glorialiu  staff   19577 Jan 18 17:41 trans-zh-en.md
-rw-r--r--@  1 glorialiu  staff   15778 Jan 18 14:40 trans.js
-rw-r--r--@  1 glorialiu  staff    9870 Jan 18 14:40 ui.js
drwxr-xr-x@  4 glorialiu  staff     128 Jan 18 14:40 workers
```

#### find . -maxdepth 3 -type f | sort
```
./.DS_Store
./.git/.DS_Store
./.git/COMMIT_EDITMSG
./.git/FETCH_HEAD
./.git/HEAD
./.git/ORIG_HEAD
./.git/config
./.git/description
./.git/hooks/applypatch-msg.sample
./.git/hooks/commit-msg.sample
./.git/hooks/fsmonitor-watchman.sample
./.git/hooks/post-update.sample
./.git/hooks/pre-applypatch.sample
./.git/hooks/pre-commit.sample
./.git/hooks/pre-merge-commit.sample
./.git/hooks/pre-push.sample
./.git/hooks/pre-rebase.sample
./.git/hooks/pre-receive.sample
./.git/hooks/prepare-commit-msg.sample
./.git/hooks/push-to-checkout.sample
./.git/hooks/sendemail-validate.sample
./.git/hooks/update.sample
./.git/index
./.git/info/exclude
./.git/logs/.DS_Store
./.git/logs/HEAD
./.git/objects/.DS_Store
./.git/packed-refs
./.git/refs/.DS_Store
./.github/workflows/deploy-staging.yml
./.github/workflows/noaa-mirror.yml
./.gitignore
./AGENTS.md
./CNAME
./IvL7cfDyBp.txt
./MODEL_EXPLANATION.md
./MODEL_WHITEBOX.md
./REVIEW.md
./aacgm-mlat-service/.DS_Store
./aacgm-mlat-service/app.py.rtf
./aacgm-mlat-service/requirements.txt.rtf
./aacgm-mlat-service/start.sh.rtf
./adapter.js
./app.js
./assets/.DS_Store
./assets/apple-touch-icon.png
./assets/favicon-16.png
./assets/favicon-32.png
./assets/favicon.png
./assets/logo-v2.png
./assets/logo.png
./assets/main logo.png
./assets/main logo.psd
./config.example.js
./config.public.js
./data/aacgmv2_mlat_1deg_110km_2026-01-01_i16.bin
./data/aacgmv2_mlat_1deg_110km_2026-01-01_meta.json
./index.html
./model.js
./noaa/.gitkeep
./noaa/latest.json
./noaa/mag.json
./noaa/plasma.json
./staging.css
./style.css
./supabaseClient.js
./tools/build_aacgmv2_mlat_grid.py
./trans-zh-en.md
./trans.js
./ui.js
./workers/README.md
./workers/index.js
```

## 2) 结论摘要
- 结论：不满足“仅中英二态 + 无 DeepL/第三语言/RTL/自动语言检测 入口”。
- 证据要点：存在 DeepL Worker/翻译 API（`workers/index.js`、`trans.js`、`workers/README.md`）、运行态翻译请求与多语言目标解析（`trans.js`）、系统语言检测（`app.js`/`trans.js`）、`index.html` 中显式配置 `TRANS_CONFIG.apiBase`。
- `trans-zh-en.md` 未发现被运行时代码 import/fetch/读取；仅在 `REVIEW.md` 被提及（见 Step3-9 证据）。

## 3) 命中清单（Step1）
### A. DeepL/翻译服务相关
```
./workers/README.md:1:# Aurora Capture Translation Worker
./workers/README.md:3:This Worker proxies DeepL API calls for the frontend `Trans` toggle.
./workers/README.md:5:## Endpoints
./workers/README.md:6:- `POST /api/translate`
./workers/README.md:13:- `DEEPL_API_KEY` (required)
./workers/README.md:14:- `DEEPL_API_URL` (optional, default `https://api-free.deepl.com`)
./style.css:453:  transform: translateY(-1px);
./style.css:801:  transform: translateY(-1px);
./trans.js:1:// trans.js: minimal translation toggle + DeepL proxy
./trans.js:4:  const LANGS_KEY = "ac_deepl_langs";
./trans.js:73:      translateUrl: base ? `${base}/api/translate` : "/api/translate",
./trans.js:182:  const translateBatch = async (texts, target, sourceLang = "zh") => {
./trans.js:191:    if(!cfg.apiBase || !cfg.translateUrl){
./trans.js:195:      const r = await fetch(cfg.translateUrl, {
./trans.js:200:      if(!r.ok) throw new Error("translate_failed");
./trans.js:228:  const setTranslatedAttr = (el, attrName, value) => {
./trans.js:273:  const applyTranslation = async () => {
./trans.js:294:    const canTranslate = !!cfg.apiBase;
./trans.js:295:    if(!canTranslate){
./trans.js:317:            }else if(!canTranslate){
./trans.js:328:          }else if(!canTranslate){
./trans.js:343:        if(!canTranslate){
./trans.js:344:          setTranslatedAttr(el, "placeholder", placeholderSource);
./trans.js:348:            setTranslatedAttr(el, "placeholder", cache[key]);
./trans.js:355:        if(!canTranslate){
./trans.js:356:          setTranslatedAttr(el, attrName, source);
./trans.js:360:            setTranslatedAttr(el, attrName, cache[key]);
./trans.js:376:      const translatedList = await translateBatch(bucket.map((p) => p.source), target, sourceLang);
./trans.js:380:        const translated = translatedList[i] || "";
./trans.js:381:        if(translated){
./trans.js:382:          cache[item.key] = translated;
./trans.js:385:            setTranslatedAttr(item.el, item.attrName, translated);
./trans.js:387:            item.el.textContent = translated;
./trans.js:419:    window.AC_TRANS.applyTranslation = applyTranslation;
./trans.js:422:    applyTranslation();
./trans.js:428:      applyTranslation();
./workers/index.js:27:  const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:28:  const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:32:      headers: { "Authorization": `DeepL-Auth-Key ${apiKey}` },
./workers/index.js:56:    if(url.pathname === "/api/translate" && request.method === "POST"){
./workers/index.js:71:      const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:72:      const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:88:        const r = await fetch(`${apiBase}/v2/translate`, {
./workers/index.js:91:            "Authorization": `DeepL-Auth-Key ${apiKey}`,
./workers/index.js:101:        const list = Array.isArray(j?.translations) ? j.translations.map((t) => String(t?.text || "")) : [];
./workers/index.js:110:      const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:111:      const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:117:          headers: { "Authorization": `DeepL-Auth-Key ${apiKey}` },
./app.js:1:// 不在 app.js 里写死远程 AACGMv2 endpoint，避免覆盖 index.html 的配置与引发失败回退。
./app.js:3:window.MODEL_CONFIG = window.MODEL_CONFIG || { aacgmEndpoint: "" };
./app.js:119:    window.AC_TRANS?.applyTranslation?.();
./app.js:156:    window.AC_TRANS.applyTranslation?.();
./app.js:370:const AUTH_KEY = "ac_auth_stub";
./app.js:376:  const getState = () => storageProvider.get(AUTH_KEY) || { loggedIn: false };
./app.js:377:  const setState = (state) => storageProvider.set(AUTH_KEY, state);
./app.js:384:    storageProvider.remove(AUTH_KEY);
./app.js:508:    window.AC_TRANS.applyTranslation?.();
./app.js:539:    window.AC_TRANS.applyTranslation?.();
./app.js:552:    window.AC_TRANS.applyTranslation?.();
./app.js:569:    window.AC_TRANS.applyTranslation?.();
./app.js:629:    window.AC_TRANS.applyTranslation?.();
./app.js:721:    window.AC_TRANS.applyTranslation?.();
./app.js:761:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:765:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:1112:    window.AC_TRANS.applyTranslation?.();
./app.js:1120:      window.AC_TRANS.applyTranslation?.();
./app.js:1973:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:2432:      if(!isSystemZh()) window.AC_TRANS?.applyTranslation?.();
./app.js:2458:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:2605:          window.AC_TRANS.applyTranslation?.();
./app.js:2776:          window.AC_TRANS.applyTranslation?.();
./trans-zh-en.md:14:- This note is for translation / terminology consistency only.
./trans-zh-en.md:18:  - The entire **Guide modal** copy is treated as a single article-level translation entry (no sentence-by-sentence keys).
./trans-zh-en.md:668:- en: Translation service is not configured.
./index.html:479:  <!-- Model config (optional): enable real AACGMv2 MLAT via your own endpoint; otherwise falls back to approx -->
./index.html:483:      // 如未来你自己搭好 AACGMv2 换算服务，再把下面 aacgmEndpoint 填成你的真实地址即可。
./index.html:485:      aacgmEndpoint: ""
./adapter.js:8:const DATA_ENDPOINTS = {
./adapter.js:72:    fetchJson(DATA_ENDPOINTS.plasma),
./adapter.js:73:    fetchJson(DATA_ENDPOINTS.mag),
```

### B. 第三语言/多语言相关
```
./app.js:1:// 不在 app.js 里写死远程 AACGMv2 endpoint，避免覆盖 index.html 的配置与引发失败回退。
./app.js:2:// 当前采用离线“近似 AACGMv2 语境”的磁纬（model.js 的 approxMagLat / aacgmV2MagLat 已统一为本地计算）。
./app.js:3:window.MODEL_CONFIG = window.MODEL_CONFIG || { aacgmEndpoint: "" };
./app.js:5:// --- UI proxies (robust against load-order / cache) ---
./app.js:11:// Fallback to raw DOM APIs when UI.js is not ready (prevents occasional blank renders)
./app.js:45:// --- Solar wind placeholder HTML (.swMain/.swAux layout) ---
./app.js:46:const SW_PLACEHOLDER_HTML = `
./app.js:57:    <span class="swAuxItem"><span data-i18n="云量">云量</span> L/M/H —/—/—%</span>
./app.js:58:    <span class="swAuxItem"><span data-i18n="月角">月角</span> —°</span>
./app.js:65:  const sysLang = getSystemLang();
./app.js:69:    const fromKey = statusKey && STATUS_LABELS[statusKey];
./app.js:70:    const zhText = fromKey ? fromKey.zh : text;
./app.js:71:    let enText = fromKey ? fromKey.en : (STATUS_TEXT_EN_MAP[zhText] || "");
./app.js:72:    if(!fromKey && !enText && zhText.startsWith("已获取当前位置")){
./app.js:79:      el.setAttribute("data-i18n", enText);
./app.js:81:      el.removeAttribute("data-i18n");
./app.js:103:    if(window.AC_DEBUG === true){
./app.js:105:        console.debug("[AC][status]", {
./app.js:106:          sysLang,
./app.js:128:  const esc = (s) => String(s)
./app.js:135:  const renderDotText = (txt) => {
./app.js:138:      const rest = raw.slice("太阳风".length);
./app.js:139:      return `<span data-i18n="太阳风">太阳风</span>${esc(rest)}`;
./app.js:142:      const rest = raw.slice("云量".length);
./app.js:143:      return `<span data-i18n="云量">云量</span>${esc(rest)}`;
./app.js:145:    const rawEsc = esc(raw);
./app.js:146:    return `<span data-i18n="${rawEsc}">${rawEsc}</span>`;
./app.js:152:    return `<div class="dot ${lvl}">${renderDotText(txt)}</div>`;
./app.js:160:const cacheSet = (k, v) => {
./app.js:162:    if(uiReady() && typeof window.UI.cacheSet === "function") return window.UI.cacheSet(k, v);
./app.js:192:const levelFromNote = (note, okFlag = true) => {
./app.js:194:  if(s.includes("❌")) return "bad";
./app.js:195:  if(s.includes("⚠️")) return "warn";
./app.js:202:  if(st === "DEGRADED") return { level: "warn", text: "太阳风 ⚠️" };
./app.js:220:  return `${_pad2(x.getHours())}:${_pad2(x.getMinutes())}`;
./app.js:228:const escapeHTML = (s) => {
./app.js:229:  try{ if(uiReady() && typeof window.UI.escapeHTML === "function") return window.UI.escapeHTML(s); }catch(_){ /* ignore */ }
./app.js:247:  STRONGLY_RECOMMENDED: { zh: "强烈推荐", en: "Strongly Recommended" },
./app.js:255:  "请先输入有效经纬度。": "Please enter valid coordinates.",
./app.js:256:  "⚠️ 经纬度超出范围": "⚠️ Error: Coordinates out of range.",
./app.js:257:  "关键计算模块未加载（SunCalc）。": "Core calculation module not loaded (SunCalc).",
./app.js:260:  "⚠️ 太阳风数据源长时间不可用：已进入弱模式（保守估算）": "⚠️ Warning: Solar wind data source unavailable. Entered conservative mode.",
./app.js:266:  "生成失败：请打开控制台查看错误。": "⚠️ Error: Forecast failed. Check console for details.",
./app.js:275:const getSystemLang = () => normalizeTag(navigator.language || "en");
./app.js:276:const isSystemZh = () => getSystemLang().startsWith("zh");
./app.js:277:const isSystemEn = () => getSystemLang().startsWith("en");
./app.js:279:const getUiLang = () => {
./app.js:280:  const list = Array.isArray(navigator.languages) ? navigator.languages : [];
./app.js:281:  const raw = list.length ? list[0] : (navigator.language || "en");
./app.js:285:const isZhLang = () => getUiLang().startsWith("zh");
./app.js:298:  const textEsc = escapeHTML(textEn || "");
./app.js:300:  const initialEsc = escapeHTML(initialText || "");
./app.js:301:  const keyEsc = escapeHTML(String(key || ""));
./app.js:303:  return `<span data-status-key="${keyEsc}" data-i18n="${textEsc}" data-zh="${escapeHTML(textZh || "")}"${attrs}>${initialEsc}</span>`;
./app.js:306:const renderChart = (labels, vals, cols) => {
./app.js:308:    if(uiReady() && typeof window.UI.renderChart === "function") window.UI.renderChart(labels, vals, cols);
./app.js:310:    console.error("[AuroraCapture] renderChart error:", e);
./app.js:316:  return `<span class="badge ${escapeHTML(cls||"")}">${escapeHTML(text||"")}</span>`;
./app.js:332:         overlay.setAttribute("aria-hidden", "false");
./app.js:344:         overlay.setAttribute("aria-hidden", "true");
./app.js:351:// ---------- auth + favorites (local-only stub with providers) ----------
./app.js:352:const storageProvider = (() => {
./app.js:371:const FAV_KEY = "ac_favorites";
./app.js:375:const authProvider = (() => {
./app.js:376:  const getState = () => storageProvider.get(AUTH_KEY) || { loggedIn: false };
./app.js:377:  const setState = (state) => storageProvider.set(AUTH_KEY, state);
./app.js:384:    storageProvider.remove(AUTH_KEY);
./app.js:402:const coordsProvider = (() => {
./app.js:404:    const saved = storageProvider.get(COORD_KEY);
./app.js:413:    storageProvider.set(COORD_KEY, { lat, lon, ts: Date.now() });
./app.js:418:const geoUsageProvider = (() => {
./app.js:420:    const raw = storageProvider.get(GEO_USED_KEY);
./app.js:424:    storageProvider.set(GEO_USED_KEY, true);
./app.js:429:const favoritesProvider = (() => {
./app.js:431:    const raw = storageProvider.get(FAV_KEY);
./app.js:435:    storageProvider.set(FAV_KEY, items);
./app.js:449:    const idx = items.findIndex((it) => Number(it.created_at) === Number(createdAt));
./app.js:476:  if(btnFav) btnFav.classList.toggle("hidden", !split);
./app.js:479:    const i18n = btnGeo.getAttribute("data-i18n");
./app.js:481:      btnGeo.dataset.labelOriginal = i18n || label;
./app.js:482:      btnGeo.dataset.labelOriginalI18n = i18n || label;
./app.js:484:    btnGeo.setAttribute("data-i18n", label);
./app.js:489:    const i18n = btnFav.getAttribute("data-i18n");
./app.js:491:      btnFav.dataset.labelOriginal = i18n || label;
./app.js:492:      btnFav.dataset.labelOriginalI18n = i18n || label;
./app.js:494:    btnFav.setAttribute("data-i18n", label);
./app.js:499:    const i18n = btnRun.getAttribute("data-i18n");
./app.js:501:      btnRun.dataset.labelOriginal = i18n || label;
./app.js:502:      btnRun.dataset.labelOriginalI18n = i18n || label;
./app.js:504:    btnRun.setAttribute("data-i18n", label);
./app.js:519:const syncCoordsFromInputs = () => {
./app.js:523:    coordsProvider.set(lat, lon);
./app.js:530:    el.classList.add("hidden");
./app.js:532:    el.removeAttribute("data-i18n");
./app.js:535:  el.setAttribute("data-i18n", msg);
./app.js:537:  el.classList.remove("hidden");
./app.js:549:  modal.classList.remove("hidden");
./app.js:550:  modal.setAttribute("aria-hidden", "false");
./app.js:558:  modal.classList.add("hidden");
./app.js:559:  modal.setAttribute("aria-hidden", "true");
./app.js:566:  modal.classList.remove("hidden");
./app.js:567:  modal.setAttribute("aria-hidden", "false");
./app.js:578:  modal.classList.add("hidden");
./app.js:579:  modal.setAttribute("aria-hidden", "true");
./app.js:580:  restoreModalTrigger();
./app.js:583:let favEditMode = "create";
./app.js:597:const restoreModalTrigger = () => {
./app.js:604:const openFavEditModal = (mode, item, shouldReturn) => {
./app.js:606:  favEditMode = mode || "create";
./app.js:626:  modal.classList.remove("hidden");
./app.js:627:  modal.setAttribute("aria-hidden", "false");
./app.js:638:  modal.classList.add("hidden");
./app.js:639:  modal.setAttribute("aria-hidden", "true");
./app.js:641:    renderFavorites();
./app.js:645:  restoreModalTrigger();
./app.js:648:const renderFavorites = () => {
./app.js:652:  const items = favoritesProvider.list();
./app.js:655:    emptyEl.classList.remove("hidden");
./app.js:658:  emptyEl.classList.add("hidden");
./app.js:664:    row.tabIndex = 0;
./app.js:681:    renameBtn.setAttribute("data-i18n", "重命名");
./app.js:683:    const delBtn = document.createElement("button");
./app.js:684:    delBtn.className = "btn secondary";
./app.js:685:    delBtn.type = "button";
./app.js:686:    delBtn.textContent = "删除";
./app.js:687:    delBtn.setAttribute("data-i18n", "删除");
./app.js:689:    renameBtn.addEventListener("click", (e) => {
./app.js:695:    delBtn.addEventListener("click", (e) => {
./app.js:697:      favoritesProvider.remove(item.created_at);
./app.js:698:      renderFavorites();
./app.js:702:    actions.appendChild(delBtn);
./app.js:704:    row.addEventListener("click", () => {
./app.js:709:        coordsProvider.set(lat, lon);
./app.js:728:   const MLAT_STRONG_WARN = 50; // 40–50° : rare edge cases only
./app.js:731:   // Note: window.Model.aacgmV2MagLat may be provided later (async, returns degrees).
./app.js:734:       if(window.Model && typeof window.Model.aacgmV2MagLat === "function"){
./app.js:735:         const v = await window.Model.aacgmV2MagLat(lat, lon, atDate);
./app.js:740:       if(window.Model && typeof window.Model.approxMagLat === "function"){
./app.js:741:         const v2 = window.Model.approxMagLat(lat, lon);
./app.js:753:         title.setAttribute("data-i18n", titleText);
./app.js:757:         note.setAttribute("data-i18n", noteText);
./app.js:771:       `<span data-i18n="当前位置磁纬约">当前位置磁纬约</span> <b>${absM.toFixed(1)}°</b>` +
./app.js:772:       `<span data-i18n="（|MLAT|，近似值）。">（|MLAT|，近似值）。</span><br>` +
./app.js:773:       `<span data-i18n="当">当</span> <b>|MLAT| &lt; ${MLAT_STRONG_WARN}°</b> ` +
./app.js:774:       `<span data-i18n="时，极光可见性高度依赖">时，极光可见性高度依赖</span>` +
./app.js:775:       `<strong><span data-i18n="极端磁暴">极端磁暴</span></strong>` +
./app.js:776:       `<span data-i18n="与">与</span>` +
./app.js:777:       `<strong><span data-i18n="北向开阔地平线">北向开阔地平线</span></strong>` +
./app.js:778:       `<span data-i18n="，不适合“常规出门拍”的决策。">，不适合“常规出门拍”的决策。</span><br>` +
./app.js:779:       `<span data-i18n="建议：尽量提高磁纬（靠近/进入极光椭圆边缘）再使用本工具。">建议：尽量提高磁纬（靠近/进入极光椭圆边缘）再使用本工具。</span>`
./app.js:788:         `<span data-i18n="当前位置磁纬约">当前位置磁纬约</span> <b>${absM.toFixed(1)}°</b>` +
./app.js:789:         `<span data-i18n="（|MLAT|，近似值）。">（|MLAT|，近似值）。</span><br>` +
./app.js:790:         `<span data-i18n="当">当</span> <b>|MLAT| &lt; ${MLAT_HARD_STOP}°</b> ` +
./app.js:791:         `<span data-i18n="时，极光几乎不可能到达你的可见范围。">时，极光几乎不可能到达你的可见范围。</span><br>` +
./app.js:792:         `<span data-i18n="这是硬性地理限制：无论 Kp / Bz / 速度如何，都不建议投入等待与拍摄。">这是硬性地理限制：无论 Kp / Bz / 速度如何，都不建议投入等待与拍摄。</span>`
./app.js:807:   // Wait until the user dismisses the alert overlay (OK / X). Used for strong-warning gate.
./app.js:809:     return new Promise((resolve) => {
./app.js:816:         resolve();
./app.js:818:       // Resolve on either button click (existing handlers will hide overlay)
./app.js:819:       if(ok) ok.addEventListener("click", finish, { once: true });
./app.js:820:       if(x)  x.addEventListener("click", finish, { once: true });
./app.js:821:       // Fallback: if overlay is not present, just continue.
./app.js:826:   // --- astro/model helpers from UI.js (must be proxied too) ---
./app.js:832:   const getMoonAltDeg = (d, lat, lon) =>
./app.js:833:     (uiReady() && typeof window.UI.getMoonAltDeg === "function")
./app.js:834:       ? window.UI.getMoonAltDeg(d, lat, lon)
./app.js:837:   const getSunAltDeg = (d, lat, lon) =>
./app.js:838:     (uiReady() && typeof window.UI.getSunAltDeg === "function")
./app.js:839:       ? window.UI.getSunAltDeg(d, lat, lon)
./app.js:842:   const moonFactorByLat = (lat, moonAltDeg) =>
./app.js:844:       ? window.UI.moonFactorByLat(lat, moonAltDeg)
./app.js:874:  // hardBlock also means not worth investing now
./app.js:896:  const times = Array.isArray(h.time) ? h.time : [];
./app.js:901:  if(!times.length) return null;
./app.js:902:  return { times, low, mid, high };
./app.js:913:    function bestCloud3h(openMeteoJson, baseDate){
./app.js:920:      let best = null;
./app.js:921:      let bestTotal = Infinity;
./app.js:923:      for(let i=0;i<pack.times.length;i++){
./app.js:924:        const ti = Date.parse(pack.times[i]);
./app.js:930:        if(total < bestTotal){
./app.js:931:          bestTotal = total;
./app.js:932:          best = {
./app.js:933:            ts: pack.times[i],
./app.js:937:            total: bestTotal
./app.js:942:      return best;
./app.js:952:      let bestI = -1;
./app.js:953:      let bestD = Infinity;
./app.js:955:      for(let i=0;i<pack.times.length;i++){
./app.js:956:        const ti = Date.parse(pack.times[i]);
./app.js:959:        if(d < bestD){ bestD = d; bestI = i; }
./app.js:962:      if(bestI < 0) return null;
./app.js:964:      const low  = Number(pack.low[bestI]);
./app.js:965:      const mid  = Number(pack.mid[bestI]);
./app.js:966:      const high = Number(pack.high[bestI]);
./app.js:971:        ts: pack.times[bestI],
./app.js:979:      function cloudGradeFromBest(best){
./app.js:980:        if(!best || !Number.isFinite(best.total)) return "—";
./app.js:981:        const t = best.total;
./app.js:996:        // NOAA kp forecast json: first row header, others: [time_tag, kp, ...]
./app.js:1020:      function bestCloudHourForDay(openMeteoJson, dayDate){
./app.js:1029:        let best = null;
./app.js:1030:        let bestTotal = Infinity;
./app.js:1032:        for(let i=0;i<pack.times.length;i++){
./app.js:1033:          const ti = Date.parse(pack.times[i]);
./app.js:1040:          if(total < bestTotal){
./app.js:1041:            bestTotal = total;
./app.js:1043:            best = {
./app.js:1048:              total: bestTotal
./app.js:1053:        return best;
./app.js:1058:        const win = bestCloudHourForDay(openMeteoJson, dayDate);
./app.js:1068:      function estimateNightRatio(dayDate, lat, lon){
./app.js:1073:          d0.setHours(12,0,0,0); // 用当天中午求 times 稳一点
./app.js:1075:          const t = SunCalc.getTimes(d0, lat, lon);
./app.js:1079:          const t1 = SunCalc.getTimes(d1, lat, lon);
./app.js:1091:// ---------- btnGeo success flash (no color change / no animation) ----------
./app.js:1092:let __geoBtnResetTimer = null;
./app.js:1094:function flashGeoButtonSuccess(){
./app.js:1100:    const i18n = btn.getAttribute("data-i18n");
./app.js:1101:    btn.dataset.labelOriginal = i18n || btn.textContent || "📍获取位置";
./app.js:1102:    btn.dataset.labelOriginalI18n = i18n || btn.dataset.labelOriginal;
./app.js:1105:  // clear pending reset if user clicks again
./app.js:1106:  if(__geoBtnResetTimer) clearTimeout(__geoBtnResetTimer);
./app.js:1110:  btn.setAttribute("data-i18n", "已获取 ✓");
./app.js:1115:  // restore after 1.5s
./app.js:1116:  __geoBtnResetTimer = setTimeout(() => {
./app.js:1118:    btn.setAttribute("data-i18n", btn.dataset.labelOriginalI18n || btn.dataset.labelOriginal || "📍获取位置");
./app.js:1122:    __geoBtnResetTimer = null;
./app.js:1132:        `<span data-i18n="当前浏览器不支持定位功能。">当前浏览器不支持定位功能。</span><br><br>` +
./app.js:1133:          `<span data-i18n="你可以手动输入经纬度。">你可以手动输入经纬度。</span>`,
./app.js:1145:          const latitude = coords ? Number(coords.latitude) : NaN;
./app.js:1146:          const longitude = coords ? Number(coords.longitude) : NaN;
./app.js:1149:          if(!Number.isFinite(latitude) || !Number.isFinite(longitude)){
./app.js:1153:              `<span data-i18n="定位返回的经纬度无效，请重试或手动输入。">定位返回的经纬度无效，请重试或手动输入。</span>`,
./app.js:1159:          // Fill inputs (keep enough precision for users; 5 decimals ≈ 1.1m lat)
./app.js:1160:          applyCoordsToInputs(latitude, longitude);
./app.js:1161:          coordsProvider.set(normalizeCoord(latitude), normalizeCoord(longitude));
./app.js:1162:          geoUsageProvider.set();
./app.js:1167:          flashGeoButtonSuccess();
./app.js:1169:          console.error("[AuroraCapture] geolocation success handler error:", e);
./app.js:1173:            `<span data-i18n="定位成功返回，但处理坐标时发生异常。请重试或手动输入。">定位成功返回，但处理坐标时发生异常。请重试或手动输入。</span>`,
./app.js:1179:        const code = err && typeof err.code === "number" ? err.code : null;
./app.js:1182:        if(code === 1) reason = "你拒绝了定位授权。请在浏览器设置中允许定位后重试。";
./app.js:1183:        else if(code === 2) reason = "暂时无法获取定位（信号弱/系统未开启定位服务）。";
./app.js:1184:        else if(code === 3) reason = "获取定位超时，请稍后重试。";
./app.js:1189:          `<span data-i18n="${reason}">${reason}</span>`,
./app.js:1204:      `<span data-i18n="获取定位时发生异常，请重试或手动输入。">获取定位时发生异常，请重试或手动输入。</span>`,
./app.js:1211:    // Realtime solar-wind (B-route): keep generating unless catastrophic
./app.js:1212:    // Sources:
./app.js:1216:    //   4) FMI (reference)                          -> hint when degraded/outage
./app.js:1219:    const NOAA_RTSW_MAG_1M = "https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json";
./app.js:1220:    const NOAA_RTSW_WIND_1M = "https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json";
./app.js:1221:    const FMI_R_INDEX = "https://space.fmi.fi/MIRACLE/RWC/data/r_index_latest_en.json";
./app.js:1248:        const res = await fetch(url, { cache:"no-store", signal: ctrl.signal });
./app.js:1249:        if(!res.ok) throw new Error(`HTTP ${res.status}`);
./app.js:1250:        return await res.json();
./app.js:1256:    function _latestValidFromNoaaTable(noaaTable, want){
./app.js:1257:      // noaaTable: [headerRow, ...dataRows]
./app.js:1260:        const header = noaaTable[0];
./app.js:1261:        if(!Array.isArray(header)) return null;
./app.js:1263:        const idxT = header.indexOf(want.time);
./app.js:1267:        for(const [outKey, candKeys] of Object.entries(want.fields)){
./app.js:1270:            const j = header.indexOf(ck);
./app.js:1287:          for(const [k, j] of Object.entries(idx)){
./app.js:1306:        solarWind:{ speed_km_s:null, density_cm3:null, ts:null, ageMin: Infinity }
./app.js:1324:        // --- Trend (dBz/dt) from RTSW 1m history ---
./app.js:1325:        const pickBzBack = (arr, minutesBack) => {
./app.js:1330:            // approximate: use latest timestamp and scan backward to nearest target time
./app.js:1332:            const tLastStr = _pick(last, ["time_tag","time","timestamp","datetime","date_time"]);
./app.js:1336:            const target = tLast - minutesBack * 60000;
./app.js:1337:            let best = null;
./app.js:1338:            let bestD = Infinity;
./app.js:1340:            // scan from end backward (faster)
./app.js:1343:              const tsStr = _pick(row, ["time_tag","time","timestamp","datetime","date_time"]);
./app.js:1347:              // stop early if we are much older than target (array ordered by time)
./app.js:1351:              if(d < bestD){
./app.js:1354:                  bestD = d;
./app.js:1355:                  best = bzv;
./app.js:1359:            return best;
./app.js:1368:        const magTs = _pick(magLast, ["time_tag","time","timestamp","datetime","date_time"]);
./app.js:1372:        const windTs = _pick(windLast, ["time_tag","time","timestamp","datetime","date_time"]);
./app.js:1374:        const n = _num(_pick(windLast, ["density","density_cm3","n","N","proton_density"]));
./app.js:1390:        if(n != null) out.solarWind.density_cm3 = n;
./app.js:1395:        const okWind = (out.solarWind.speed_km_s != null || out.solarWind.density_cm3 != null) && Number.isFinite(out.solarWind.ageMin);
./app.js:1400:        out.err = String(e?.message || e);
./app.js:1410:        solarWind:{ speed_km_s:null, density_cm3:null, ts:null, ageMin: Infinity }
./app.js:1419:        const magLast = _latestValidFromNoaaTable(magWrap?.noaa, {
./app.js:1427:        const plasmaLast = _latestValidFromNoaaTable(plasmaWrap?.noaa, {
./app.js:1431:            n:["density","N","density_cm3","proton_density"]
./app.js:1447:          if(plasmaLast.n != null) out.solarWind.density_cm3 = plasmaLast.n;
./app.js:1455:          out.solarWind.speed_km_s != null || out.solarWind.density_cm3 != null;
./app.js:1460:        out.err = String(e?.message || e);
./app.js:1467:        const j = await _fetchJson(FMI_R_INDEX, 12000);
./app.js:1469:        let bestProb = null;
./app.js:1470:        const scan = (node) => {
./app.js:1471:          if(!node) return;
./app.js:1472:          if(Array.isArray(node)) return node.forEach(scan);
./app.js:1473:          if(typeof node !== "object") return;
./app.js:1475:          const prob = _num(_pick(node, ["probability","prob","AuroraProbability","aurora_probability"]));
./app.js:1476:          if(prob != null) bestProb = (bestProb == null ? prob : Math.max(bestProb, prob));
./app.js:1478:          for(const v of Object.values(node)) scan(v);
./app.js:1482:        return { ok: bestProb != null, prob: bestProb };
./app.js:1484:        return { ok:false, err:String(e?.message || e) };
./app.js:1491:      if(!out.solarWind) out.solarWind = { speed_km_s:null, density_cm3:null, ts:null, ageMin:Infinity };
./app.js:1506:        fill(out.solarWind, secondary.solarWind, "density_cm3");
./app.js:1514:    function _statusFromAge(rt){
./app.js:1525:        rt?.solarWind?.speed_km_s != null || rt?.solarWind?.density_cm3 != null;
./app.js:1527:      if(hasAny) return "DEGRADED";
./app.js:1541:        cacheSet(LKG_CACHE_KEY, { at: Date.now(), sw, rt });
./app.js:1553:    async function getRealtimeStateSmart(){
./app.js:1560:      // Prefer mirror-products, merge rtsw to reduce dead air
./app.js:1563:      let status = _statusFromAge(merged);
./app.js:1582:        n: merged?.solarWind?.density_cm3 ?? null,
./app.js:1603:          `<span data-i18n="请输入数字格式的纬度/经度。">请输入数字格式的纬度/经度。</span><br>` +
./app.js:1604:            `<span data-i18n="纬度范围：">纬度范围：</span><b>-90° ～ +90°</b>` +
./app.js:1605:            `<span data-i18n="；经度范围：">；经度范围：</span><b>-180° ～ +180°</b>` +
./app.js:1606:            `<span data-i18n="。">。</span>`,
./app.js:1617:          `<span data-i18n="你输入的是：">你输入的是：</span><b>Latitude ${lat}</b>，<b>Longitude ${lon}</b>。<br>` +
./app.js:1618:            `<span data-i18n="允许范围：">允许范围：</span><br>` +
./app.js:1619:            `<span data-i18n="纬度（Latitude）：">纬度（Latitude）：</span><b>-90° ～ +90°</b><br>` +
./app.js:1620:            `<span data-i18n="经度（Longitude）：">经度（Longitude）：</span><b>-180° ～ +180°</b>` ,
./app.js:1640:      // Ensure placeholder layout before any run
./app.js:1641:      safeHTML($("swLine"), SW_PLACEHOLDER_HTML);
./app.js:1649:      // 只做“温和降级”，不做一票否决；并且用 model.js 的乐观边距抵消磁纬误差。
./app.js:1652:          if(window.Model && typeof window.Model.applyOvalConstraint === "function" && Number.isFinite(mlat)){
./app.js:1653:            const r = window.Model.applyOvalConstraint(c10, mlat);
./app.js:1667:        const heroMetaEsc = escapeHTML(String(heroMetaText));
./app.js:1668:        safeHTML($("oneHeroMeta"), `<span data-i18n="${heroMetaEsc}">${heroMetaEsc}</span>`);
./app.js:1672:            `<span data-i18n="主要影响因素：">主要影响因素：</span>` +
./app.js:1673:            `<span data-i18n="磁纬过低，已停止生成">磁纬过低，已停止生成</span>` +
./app.js:1676:        safeHTML($("swLine"), SW_PLACEHOLDER_HTML);
./app.js:1682:        renderChart(labels, vals, cols);
./app.js:1684:        // For 3-hour burst model: only state (big word) and one-line hint
./app.js:1685:        safeHTML($("threeState"), statusSpanHTML("SILENT"));
./app.js:1686:        safeHTML($("threeBurst"), `<span data-i18n="磁纬过低，已停止生成">磁纬过低，已停止生成</span>`);
./app.js:1687:        safeText($("threeDeliver"), "—");
./app.js:1688:        safeText($("threeDeliverMeta"), "—");
./app.js:1692:          safeText($("threeSlot"+i+"Time"), "—");
./app.js:1693:          safeHTML($("threeSlot"+i+"Conclusion"), statusSpanHTML("UNOBSERVABLE"));
./app.js:1694:          safeText($("threeSlot"+i+"Note"), actionNote1h(1, { hardBlock:true }));
./app.js:1695:          safeHTML($("threeSlot"+i+"Reason"), statusSpanHTML("UNOBSERVABLE"));
./app.js:1696:          const card = $("threeSlot"+i);
./app.js:1728:        getRealtimeStateSmart(),
./app.js:1737:        { level: levelFromNote(kp?.note, !!kp?.ok), text: kp?.note || "KP" },
./app.js:1738:        { level: levelFromNote(clouds?.note, !!clouds?.ok), text: clouds?.note || "云量" },
./app.js:1739:        { level: levelFromNote(ova?.note, !!ova?.ok), text: ova?.note || "OVATION" },
./app.js:1745:        n: rt.solarWind.density_cm3,
./app.js:1769:          // Prefer RTSW 1m-derived trend (more responsive)
./app.js:1780:          // Trigger rules (simple + stable)
./app.js:1787:          const desc = ok30
./app.js:1791:          return { on:true, level:1, reason: desc };
./app.js:1797:      // Inline "+" badge HTML (no extra CSS dependency)
./app.js:1799:        `<span style="position:absolute; top:-6px; right:-6px; width:18px; height:18px; line-height:18px; text-align:center; border-radius:999px; ` +
./app.js:1800:        `border:1px solid rgba(255,255,255,.22); background:rgba(255,255,255,.10); font-size:12px; font-weight:700; color:rgba(255,255,255,.88);">+</span>`
./app.js:1808:      const trendExplainInline = () => {
./app.js:1810:        return `<div style=\"margin-top:6px; font-size:12px; opacity:.88;\">${escapeHTML(trendPlus.reason)}</div>`;
./app.js:1813:      // --- Plasma 回溯（退路方案 B）：当 NOAA plasma 最新点缺失时，回溯最近一次有效 speed/density ---
./app.js:1815:      async function backfillPlasmaVNIfNeeded(swObj, maxAgeMin = 120){
./app.js:1822:          const res = await fetch(url, { cache: "no-store" });
./app.js:1823:          if(!res.ok) return { ok:false };
./app.js:1824:          const j = await res.json();
./app.js:1827:          // 1) noaa = [ [header...], [row...], ... ]
./app.js:1828:          // 2) noaa = ["time_tag","density","speed",...]（仅字段名，表示无数据）
./app.js:1833:          const header = arr[0];
./app.js:1834:          const idxT = header.indexOf("time_tag");
./app.js:1835:          const idxD = header.indexOf("density");
./app.js:1836:          const idxS = header.indexOf("speed");
./app.js:1839:          // 从最新往回找最近一次“speed + density 都有效”的点
./app.js:1846:            const dens  = Number(row[idxD]);
./app.js:1849:            if(!Number.isFinite(t) || !Number.isFinite(speed) || !Number.isFinite(dens)) continue;
./app.js:1856:            swObj.n = dens;
./app.js:1872:      if(missingKeys.includes("v") || missingKeys.includes("n")){
./app.js:1873:        await backfillPlasmaVNIfNeeded(sw, 120);
./app.js:1878:    // ✅ always render realtime solar-wind line (otherwise UI stays "—")
./app.js:1895:      const moonAlt = getMoonAltDeg(baseDate, lat, lon);
./app.js:1905:      `<span class="swK">${escapeHTML(k)}</span> ` +
./app.js:1906:      `<span class="swV">${escapeHTML(v)}</span>`
./app.js:1919:        `<span class="swAuxItem"><span data-i18n="云量">云量</span> ${escapeHTML(cloudLine)}</span>`
./app.js:1924:        `<span class="swAuxItem"><span data-i18n="月角">月角</span> ${escapeHTML(moonLine)}</span>`
./app.js:1934:      `<div class="swMain" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${line1}</div>${line2}`
./app.js:1937:      // meta: show timestamps + freshness
./app.js:1944:        `<span data-i18n="更新时间">更新时间</span>：${escapeHTML(tsText)} ・ ` +
./app.js:1945:          `<span data-i18n="新鲜度">新鲜度</span>：mag ${escapeHTML(String(magAge))}m / plasma ${escapeHTML(String(plasmaAge))}m` +
./app.js:1946:          `${escapeHTML(backfillText)}`
./app.js:1963:          <div><span data-i18n="NOAA 数据口径变动或部分数据缺失：">NOAA 数据口径变动或部分数据缺失：</span><b>${escapeHTML(missCN)}</b></div>
./app.js:1964:          <div class="mutedLine"><span data-i18n="当前预测可信度较低，建议谨慎参考。">当前预测可信度较低，建议谨慎参考。</span></div>
./app.js:1986:      const base10 = window.Model.baseScoreFromSW(sw, missingKeys);
./app.js:1988:      if (rt.status === "DEGRADED") base10Adj = base10 * 0.78;
./app.js:2004:        const moonAlt = getMoonAltDeg(d, lat, lon);
./app.js:2012:        const decay = Math.pow(0.92, i);
./app.js:2013:        let c10 = base10Adj * decay;
./app.js:2035:        // Low-density brightness attenuation (1h only)
./app.js:2036:        // Rationale: when N < 1 cm^-3, brightness potential is reduced (edge-latitude friendly)
./app.js:2042:        const s5 = window.Model.score5FromC10(c10); // 1..5
./app.js:2049:      const heroObj = window.Model.labelByScore5(heroScore);
./app.js:2055:        : `<span style="color:${cColor(heroScore)} !important;" data-i18n="—">—</span>`;
./app.js:2087:          }else if(typeof window.Model?.explainUnobservable === "function"){
./app.js:2091:              const best = bestCloud3h(clouds.data, baseDate);
./app.js:2092:              if(best && Number.isFinite(best.low) && Number.isFinite(best.mid) && Number.isFinite(best.high)){
./app.js:2093:                cloudMax = Math.max(Number(best.low), Number(best.mid), Number(best.high));
./app.js:2098:            const sunAltDeg  = getSunAltDeg(baseDate, lat, lon);
./app.js:2099:            const moonAltDeg = getMoonAltDeg(baseDate, lat, lon);
./app.js:2101:            // 月相亮度 fraction（0~1）
./app.js:2102:            let moonFrac = null;
./app.js:2106:                if(mi && mi.fraction != null) moonFrac = Number(mi.fraction);
./app.js:2108:            }catch(_){ moonFrac = null; }
./app.js:2110:            const ex = window.Model.explainUnobservable({ cloudMax, moonAltDeg, moonFrac, sunAltDeg });
./app.js:2118:          const primaryEsc = escapeHTML(primaryText);
./app.js:2122:                <span data-i18n="主要影响因素：">主要影响因素：</span>
./app.js:2123:                <span data-i18n="${primaryEsc}">${primaryEsc}</span>
./app.js:2131:      const heroMetaEsc = escapeHTML(String(heroMetaText));
./app.js:2132:      safeHTML($("oneHeroMeta"), `<span data-i18n="${heroMetaEsc}">${heroMetaEsc}</span>`);
./app.js:2135:      renderChart(labels, vals, cols);
./app.js:2142:        if(typeof window.Model?.state3h === "function"){
./app.js:2143:          s3Burst = window.Model.state3h(sw);
./app.js:2148:      const del = window.Model.deliverModel(sw);
./app.js:2149:      const deliverText = `${del.count}/3 成立`;
./app.js:2150:      const deliverEsc = escapeHTML(deliverText);
./app.js:2151:      const deliverMetaText = `Bt平台${del.okBt ? "✅" : "⚠️"} ・ 速度背景${del.okV ? "✅" : "⚠️"} ・ 密度结构${del.okN ? "✅" : "⚠️"}`;
./app.js:2152:      const deliverMetaEsc = escapeHTML(deliverMetaText);
./app.js:2153:      safeHTML($("threeDeliver"), `<span data-i18n="${deliverEsc}">${deliverEsc}</span>`);
./app.js:2154:      safeHTML($("threeDeliverMeta"), `<span data-i18n="${deliverMetaEsc}">${deliverMetaEsc}</span>`);
./app.js:2163:        let bestI = -1;
./app.js:2164:        let bestD = Infinity;
./app.js:2165:        for(let i=0;i<pack.times.length;i++){
./app.js:2166:          const ti = Date.parse(pack.times[i]);
./app.js:2169:          if(d < bestD){ bestD = d; bestI = i; }
./app.js:2171:        if(bestI < 0) return null;
./app.js:2173:        const low  = Number(pack.low[bestI]);
./app.js:2174:        const mid  = Number(pack.mid[bestI]);
./app.js:2175:        const high = Number(pack.high[bestI]);
./app.js:2198:      baseHour.setMinutes(0, 0, 0);
./app.js:2208:        const moonAlt = getMoonAltDeg(mid, lat, lon);
./app.js:2215:        const decay = Math.pow(0.92, h * 6);
./app.js:2218:        let c10 = base10Adj * decay;
./app.js:2246:        const score5 = window.Model.score5FromC10(c10);
./app.js:2252:        }else if(score5 <= 2 && typeof window.Model?.explainUnobservable === "function"){
./app.js:2253:          const sunAltDeg  = getSunAltDeg(mid, lat, lon);
./app.js:2254:          const moonAltDeg = moonAlt;
./app.js:2256:          let moonFrac = null;
./app.js:2260:              if(mi && mi.fraction != null) moonFrac = Number(mi.fraction);
./app.js:2262:          }catch(_){ moonFrac = null; }
./app.js:2264:          const ex = window.Model.explainUnobservable({ cloudMax, moonAltDeg, moonFrac, sunAltDeg });
./app.js:2273:      const best = slots.filter(s => s.score5 === maxScore);
./app.js:2275:      // 3h burst model: show only the state (big) + one-line hint (small)
./app.js:2278:      const burstHintEsc = escapeHTML(burstHintCN);
./app.js:2281:      const burstStateHTML = burstStateKey ? statusSpanHTML(burstStateKey) : `<span data-i18n="—">—</span>`;
./app.js:2282:      safeHTML($("threeState"), burstStateHTML);
./app.js:2284:      // one-line hint under the big word
./app.js:2285:      safeHTML($("threeBurst"), `<span data-i18n="${burstHintEsc}">${burstHintEsc}</span>`);
./app.js:2287:      // --- Render 3 hourly cards (restore) ---
./app.js:2289:      //  threeSlot0/1/2 (card), threeSlot{n}Time, threeSlot{n}Conclusion, threeSlot{n}Note, threeSlot{n}Reason
./app.js:2291:        const lab = (window.Model && typeof window.Model.labelByScore5 === "function")
./app.js:2292:          ? window.Model.labelByScore5(s.score5)
./app.js:2301:        const noteEsc = escapeHTML(String(noteText));
./app.js:2303:        safeText($("threeSlot" + i + "Time"), timeText);
./app.js:2304:        safeHTML($("threeSlot" + i + "Conclusion"), lab?.key ? statusSpanHTML(String(lab.key)) : `<span data-i18n="—">—</span>`);
./app.js:2305:        safeHTML($("threeSlot" + i + "Note"), `<span data-i18n="${noteEsc}">${noteEsc}</span>`);
./app.js:2311:        const reasonEsc = escapeHTML(reasonText);
./app.js:2313:          ? `<span data-i18n="主要影响因素：">主要影响因素：</span><span data-i18n="${reasonEsc}">${reasonEsc}</span>`
./app.js:2315:        safeHTML($("threeSlot" + i + "Reason"), reasonHTML);
./app.js:2317:        const card = $("threeSlot" + i);
./app.js:2322:      // safeText($("threeBestLine"), bestLine);
./app.js:2325:      // let cloudBest3h = null;
./app.js:2326:      // if(clouds.ok && clouds.data) cloudBest3h = bestCloud3h(clouds.data, baseDate);
./app.js:2327:      // if(cloudBest3h){
./app.js:2328:      //   const grade = cloudGradeFromBest(cloudBest3h);
./app.js:2331:      //     `云量评分：<b>${grade}</b>
./app.js:2332:      //      <div class="cloudDetail">低云 ${cloudBest3h.low}% ｜ 中云 ${cloudBest3h.mid}% ｜ 高云 ${cloudBest3h.high}%</div>`
./app.js:2337:      //     `云量评分：<b>—</b><div class="cloudDetail">低云 —% ｜ 中云 —% ｜ 高云 —%</div>`
./app.js:2346:      const p1a = window.Model.p1a_fastWind(sw) ? 1 : 0;
./app.js:2347:      const p1b = window.Model.p1b_energyInput(sw) ? 1 : 0;
./app.js:2355:        const sDel = del.count / 3;
./app.js:2358:        let cDay10 = (sKp * 0.48 + sDel * 0.32 + sCloud * 0.20) * 10;
./app.js:2360:        const nightRatio = estimateNightRatio(d, lat, lon);
./app.js:2363:        const mAlt = getMoonAltDeg(new Date(d.getTime() + 12 * 3600 * 1000), lat, lon);
./app.js:2373:          5: { key: "STRONGLY_RECOMMENDED", cls: "c5" },
./app.js:2382:        let cloudDetail = "云量更佳点：—";
./app.js:2385:          const win = bestCloudHourForDay(clouds.data, d);
./app.js:2388:            cloudDetail = `云量更佳点：${win.hh}:00（L/M/H≈${win.low}/${win.mid}/${win.high}%）`;
./app.js:2395:        const cloudDetailHTML = cloudWin
./app.js:2396:          ? `<span data-i18n="云量更佳点：">云量更佳点：</span>${escapeHTML(String(cloudWin.hh))}:00` +
./app.js:2397:            `<span data-i18n="（L/M/H≈">（L/M/H≈</span>` +
./app.js:2398:            `${escapeHTML(`${cloudWin.low}/${cloudWin.mid}/${cloudWin.high}`)}%` +
./app.js:2399:            `<span data-i18n="）">）</span>`
./app.js:2400:          : `<span data-i18n="云量更佳点：">云量更佳点：</span>—`;
./app.js:2404:            `<span data-i18n="能量背景：">能量背景：</span>` +
./app.js:2405:            `<span data-i18n="Kp峰值≈">Kp峰值≈</span>${escapeHTML(kpValue)}` +
./app.js:2408:            `<span data-i18n="送达模型：">送达模型：</span>${escapeHTML(String(del.count))}/3` +
./app.js:2409:            `<span data-i18n="（Bt/速度/密度）">（Bt/速度/密度）</span>` +
./app.js:2412:            `<span data-i18n="触发模型：">触发模型：</span>` +
./app.js:2413:            `<span data-i18n="高速风">高速风</span>${escapeHTML(String(p1a))}/1` +
./app.js:2414:            `<span data-i18n=" · 能量输入"> · 能量输入</span>${escapeHTML(String(p1b))}/1` +
./app.js:2417:            `<span data-i18n="夜晚占比：">夜晚占比：</span>${escapeHTML(String(nightPercent))}%` +
./app.js:2419:          `<div class="basisItem">${cloudDetailHTML}</div>`,
./app.js:2424:        safeHTML($("day"+i+"Conclusion"), lab?.key ? statusSpanHTML(String(lab.key)) : `<span data-i18n="—">—</span>`);
./app.js:2425:        safeHTML($("day"+i+"Note"), `<span data-i18n="${escapeHTML(String(actionNote72h(score5)))}">${escapeHTML(String(actionNote72h(score5)))}</span>`);
./app.js:2444:    const savedCoords = coordsProvider.get();
./app.js:2449:    updateActionRow(geoUsageProvider.get());
./app.js:2451:    // Ensure placeholder layout is consistent before any run()
./app.js:2452:    safeHTML($("swLine"), SW_PLACEHOLDER_HTML);
./app.js:2455:    $("btnRun")?.addEventListener("click", run);
./app.js:2456:    $("btnGeo")?.addEventListener("click", fillCurrentLocation);
./app.js:2457:    $("btnAbout")?.addEventListener("click", () => {
./app.js:2461:    $("lat")?.addEventListener("input", syncCoordsFromInputs);
./app.js:2462:    $("lon")?.addEventListener("input", syncCoordsFromInputs);
./app.js:2464:    $("btnFav")?.addEventListener("click", () => {
./app.js:2473:    $("btnFavs")?.addEventListener("click", async () => {
./app.js:2476:        const sess = await window.AC_SUPABASE?.getSession?.();
./app.js:2477:        const session = sess?.session || null;
./app.js:2478:        if(!session){
./app.js:2480:          if(row) row.classList.add("hidden");
./app.js:2485:        const userId = session.user?.id || null;
./app.js:2488:          if(row) row.classList.add("hidden");
./app.js:2495:        if(row) row.classList.remove("hidden");
./app.js:2500:        if(emptyEl) emptyEl.classList.add("hidden");
./app.js:2501:        const renderItems = (items) => {
./app.js:2504:            if(emptyEl) emptyEl.classList.remove("hidden");
./app.js:2511:            rowItem.tabIndex = 0;
./app.js:2528:            renameBtn.setAttribute("data-i18n", "重命名");
./app.js:2530:            const delBtn = document.createElement("button");
./app.js:2531:            delBtn.className = "btn secondary";
./app.js:2532:            delBtn.type = "button";
./app.js:2533:            delBtn.textContent = "删除";
./app.js:2534:            delBtn.setAttribute("data-i18n", "删除");
./app.js:2536:            renameBtn.addEventListener("click", async (e) => {
./app.js:2545:            delBtn.addEventListener("click", async (e) => {
./app.js:2549:              const delRes = await window.AC_SUPABASE?.deleteFavorite?.(item.id, userId);
./app.js:2550:              if(delRes && delRes.ok){
./app.js:2551:                const nextRes = await window.AC_SUPABASE?.listFavorites?.(userId);
./app.js:2552:                const nextRaw = Array.isArray(nextRes?.data) ? nextRes.data : [];
./app.js:2565:                renderItems(nextItems);
./app.js:2571:            actions.appendChild(delBtn);
./app.js:2573:            rowItem.addEventListener("click", () => {
./app.js:2578:                coordsProvider.set(lat, lon);
./app.js:2589:        const res = await window.AC_SUPABASE?.listFavorites?.(userId);
./app.js:2590:        const rawItems = Array.isArray(res?.data) ? res.data : [];
./app.js:2603:        renderItems(items);
./app.js:2611:    $("btnLoginConfirm")?.addEventListener("click", () => {
./app.js:2613:      if(!email || !email.includes("@")){
./app.js:2620:      window.AC_SUPABASE?.sendMagicLink?.(email, redirectTo).then((res) => {
./app.js:2621:        if(!res || res.ok !== true){
./app.js:2633:    $("btnLoginCancel")?.addEventListener("click", () => {
./app.js:2637:    $("btnLoginClose")?.addEventListener("click", () => {
./app.js:2641:    $("loginModal")?.addEventListener("click", (e) => {
./app.js:2649:    $("btnFavClose")?.addEventListener("click", closeFavModal);
./app.js:2650:    $("favModal")?.addEventListener("click", (e) => {
./app.js:2654:    $("btnLogout")?.addEventListener("click", async () => {
./app.js:2655:      const res = await window.AC_SUPABASE?.signOut?.();
./app.js:2656:      if(!res || res.ok !== true) return;
./app.js:2659:      if(row) row.classList.add("hidden");
./app.js:2663:      if(emptyEl) emptyEl.classList.add("hidden");
./app.js:2668:    $("btnFavEditClose")?.addEventListener("click", closeFavEditModal);
./app.js:2669:    $("btnFavEditCancel")?.addEventListener("click", closeFavEditModal);
./app.js:2670:    $("favEditModal")?.addEventListener("click", (e) => {
./app.js:2675:    $("btnFavEditSave")?.addEventListener("click", async () => {
./app.js:2698:      const renderCloudList = (items) => {
./app.js:2703:          if(emptyEl) emptyEl.classList.remove("hidden");
./app.js:2706:        if(emptyEl) emptyEl.classList.add("hidden");
./app.js:2712:          rowItem.tabIndex = 0;
./app.js:2729:          renameBtn.setAttribute("data-i18n", "重命名");
./app.js:2731:          const delBtn = document.createElement("button");
./app.js:2732:          delBtn.className = "btn secondary";
./app.js:2733:          delBtn.type = "button";
./app.js:2734:          delBtn.textContent = "删除";
./app.js:2735:          delBtn.setAttribute("data-i18n", "删除");
./app.js:2737:          renameBtn.addEventListener("click", (e) => {
./app.js:2744:          delBtn.addEventListener("click", async (e) => {
./app.js:2748:            const delRes = await window.AC_SUPABASE?.deleteFavorite?.(item.id, userId);
./app.js:2749:            if(delRes && delRes.ok){
./app.js:2750:              const nextRes = await window.AC_SUPABASE?.listFavorites?.(userId);
./app.js:2751:              const nextRaw = Array.isArray(nextRes?.data) ? nextRes.data : [];
./app.js:2752:              renderCloudList(normalizeItems(nextRaw));
./app.js:2758:          actions.appendChild(delBtn);
./app.js:2760:          rowItem.addEventListener("click", () => {
./app.js:2765:              coordsProvider.set(nLat, nLon);
./app.js:2780:      if(favEditMode === "rename" && favEditItem){
./app.js:2791:        const res = await window.AC_SUPABASE?.updateFavoriteName?.(favEditItem.id, userId, rawName.slice(0, 40));
./app.js:2792:        if(res && res.ok){
./app.js:2793:          const listRes = await window.AC_SUPABASE?.listFavorites?.(userId);
./app.js:2794:          const rawItems = Array.isArray(listRes?.data) ? listRes.data : [];
./app.js:2795:          renderCloudList(normalizeItems(rawItems));
./app.js:2816:        const defaultName = `${formatCoord(lat, 2)}, ${formatCoord(lon, 2)}`;
./app.js:2817:        const name = rawName ? rawName.slice(0, 40) : defaultName;
./app.js:2818:        const res = await window.AC_SUPABASE?.createFavorite?.({
./app.js:2824:        if(res && res.ok){
./app.js:2825:          const listRes = await window.AC_SUPABASE?.listFavorites?.(userId);
./app.js:2826:          const rawItems = Array.isArray(listRes?.data) ? listRes.data : [];
./app.js:2827:          renderCloudList(normalizeItems(rawItems));
./app.js:2840:      const result = favoritesProvider.add({
./app.js:2846:      if(!result.ok && result.reason === "duplicate"){
./app.js:2853:      renderFavorites();
./app.js:2857:    window.AC_SUPABASE?.onAuthStateChange?.((evt, session) => {
./app.js:2858:      const loggedIn = !!session?.user;
./app.js:2861:        userId: session?.user?.id || null
./app.js:2864:      if(row) row.classList.toggle("hidden", !loggedIn);
./app.js:2866:        try{ storageProvider.set(FAV_KEY, []); }catch(_){ /* ignore */ }
./app.js:2871:        if(emptyEl) emptyEl.classList.add("hidden");
./app.js:2877:    document.getElementById("alertClose")?.addEventListener("click", closeAlertOverlay);
./app.js:2878:    document.getElementById("alertOk")?.addEventListener("click", closeAlertOverlay);
./app.js:2880:  document.addEventListener("DOMContentLoaded", bootstrap);
./app.js:2882:getRealtimeStateSmart().then(s => console.log("RealtimeState", s)).catch(e => console.error(e));
./trans.js:1:// trans.js: minimal translation toggle + DeepL proxy
./trans.js:4:  const LANGS_KEY = "ac_deepl_langs";
./trans.js:6:  const LANGS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
./trans.js:7:  const FIXED_I18N_MAP = {
./trans.js:9:    "月角": "Moon elevation",
./trans.js:11:    "新鲜度": "Data freshness",
./trans.js:36:    "⚠️ 经纬度输入无效": "⚠️ Error: Invalid coordinates.",
./trans.js:37:    "⚠️ 经纬度超出范围": "⚠️ Error: Coordinates out of range.",
./trans.js:41:    "🌟 收藏夹": "🌟 Saved Locations",
./trans.js:43:    "⭐ 收藏地址": "⭐ Save location",
./trans.js:46:    "📍 刷新定位": "📍 Re-acquire location",
./trans.js:53:    "当前坐标": "Current coordinates",
./trans.js:56:    "删除": "Delete",
./trans.js:58:    "为了跨设备保存收藏位置，需要登录一次。": "To save locations across devices, please log in once.",
./trans.js:59:    "登录后，你收藏的地点就可以在不同设备上使用啦 🌟": "After logging in, your saved locations will be available across devices 🌟",
./trans.js:60:    "经纬度无效，无法收藏。": "Invalid coordinates. Unable to save.",
./trans.js:61:    "该地点已在收藏中，如需修改请先删除后重建。": "This location is already saved. Delete it before saving again.",
./trans.js:66:  const GEO_HINT_EN = "Destination coordinates: you can get lat/long by dropping a pin in Apple Maps or Google Maps, then copying the latitude & longitude from the place details.";
./trans.js:74:      languagesUrl: base ? `${base}/api/languages` : "/api/languages",
./trans.js:78:  const normalizeTag = (lang) => {
./trans.js:79:    const raw = String(lang || "").trim().toLowerCase();
./trans.js:84:  const getSystemLang = () => normalizeTag(navigator.language || "en");
./trans.js:85:  const isSystemZh = () => getSystemLang().startsWith("zh");
./trans.js:86:  const isSystemEn = () => getSystemLang().startsWith("en");
./trans.js:88:  const getPreferredLang = () => getSystemLang();
./trans.js:98:  const getDefaultState = () => {
./trans.js:99:    const pref = getPreferredLang();
./trans.js:107:  const getLangCache = () => {
./trans.js:109:      const raw = localStorage.getItem(LANGS_KEY);
./trans.js:113:      if(!parsed.ts || (Date.now() - parsed.ts) > LANGS_TTL_MS) return null;
./trans.js:120:  const setLangCache = (targets) => {
./trans.js:122:      localStorage.setItem(LANGS_KEY, JSON.stringify({ ts: Date.now(), targets }));
./trans.js:127:    const cached = getLangCache();
./trans.js:130:    if(!cfg.apiBase || !cfg.languagesUrl){
./trans.js:134:      const r = await fetch(cfg.languagesUrl, { cache: "no-store" });
./trans.js:135:      if(!r.ok) throw new Error("languages_fetch_failed");
./trans.js:138:      if(!targets.length) throw new Error("languages_empty");
./trans.js:139:      setLangCache(targets);
./trans.js:146:  const resolveTarget = async () => {
./trans.js:147:    const preferred = getPreferredLang();
./trans.js:155:      const exactIndex = supportedNorm.indexOf(c);
./trans.js:156:      if(exactIndex >= 0) return supported[exactIndex];
./trans.js:159:      const primaryExactIndex = supportedNorm.indexOf(primary);
./trans.js:160:      if(primaryExactIndex >= 0) return supported[primaryExactIndex];
./trans.js:161:      const variantIndex = supportedNorm.findIndex((s) => s.startsWith(primary + "-"));
./trans.js:162:      if(variantIndex >= 0) return supported[variantIndex];
./trans.js:182:  const translateBatch = async (texts, target, sourceLang = "zh") => {
./trans.js:185:    const src = String(sourceLang || "zh").trim().toLowerCase();
./trans.js:197:        headers: { "Content-Type": "application/json" },
./trans.js:198:        body: JSON.stringify({ texts: items, target, source: sourceLang }),
./trans.js:214:  const restoreOriginal = (elements) => {
./trans.js:216:      const original = el.getAttribute("data-i18n");
./trans.js:217:      const hasI18nAttr = el.hasAttribute("data-i18n-attr");
./trans.js:218:      if(original != null && !hasI18nAttr) el.textContent = original;
./trans.js:219:      const origPlaceholder = el.getAttribute("data-orig-placeholder");
./trans.js:220:      if(origPlaceholder != null) el.setAttribute("placeholder", origPlaceholder);
./trans.js:221:      const attrName = el.getAttribute("data-i18n-attr");
./trans.js:229:    const key = attrName === "placeholder" ? "data-orig-placeholder" : `data-orig-attr-${attrName}`;
./trans.js:236:  const forceStatusZh = () => {
./trans.js:237:    const items = Array.from(document.querySelectorAll("#statusText, [data-status-key]"));
./trans.js:244:  const resolveFixedText = (source, target) => {
./trans.js:246:    if(Object.prototype.hasOwnProperty.call(FIXED_I18N_MAP, source)){
./trans.js:247:      return target.startsWith("zh") ? source : FIXED_I18N_MAP[source];
./trans.js:251:      const base = FIXED_I18N_MAP["已获取当前位置"] || "Location Acquired";
./trans.js:264:    const source = String(el.getAttribute("data-i18n") || el.textContent || "").trim();
./trans.js:275:    const elements = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-placeholder], [data-i18n-attr]"));
./trans.js:278:      restoreOriginal(elements);
./trans.js:280:      forceStatusZh();
./trans.js:285:      restoreOriginal(elements);
./trans.js:287:      forceStatusZh();
./trans.js:292:    const target = await resolveTarget();
./trans.js:299:    const preferred = getPreferredLang();
./trans.js:306:      const attrName = String(el.getAttribute("data-i18n-attr") || "").trim();
./trans.js:307:      const source = String(el.getAttribute("data-i18n") || "").trim();
./trans.js:314:            const fixed = resolveFixedText(source, target);
./trans.js:320:              const sourceLang = statusEl ? "en" : "zh";
./trans.js:321:              const key = `${target}::${sourceLang}::text::${source}`;
./trans.js:325:                pendingBySource[sourceLang].push({ el, source, key });
./trans.js:331:            const sourceLang = "en";
./trans.js:332:            const key = `${target}::${sourceLang}::text::${source}`;
./trans.js:336:              pendingBySource[sourceLang].push({ el, source, key });
./trans.js:341:      const placeholderSource = String(el.getAttribute("data-i18n-placeholder") || "").trim();
./trans.js:342:      if(placeholderSource){
./trans.js:344:          setTranslatedAttr(el, "placeholder", placeholderSource);
./trans.js:346:          const key = `${target}::zh::placeholder::${placeholderSource}`;
./trans.js:348:            setTranslatedAttr(el, "placeholder", cache[key]);
./trans.js:350:            pendingBySource.zh.push({ el, source: placeholderSource, key, attrName: "placeholder" });
./trans.js:374:    for(const sourceLang of sourceBuckets){
./trans.js:375:      const bucket = pendingBySource[sourceLang];
./trans.js:376:      const translatedList = await translateBatch(bucket.map((p) => p.source), target, sourceLang);
./trans.js:415:    currentState = stored || getDefaultState();
./trans.js:424:    btn?.addEventListener("click", () => {
./trans.js:433:    document.addEventListener("DOMContentLoaded", init);
./data/aacgmv2_mlat_1deg_110km_2026-01-01_meta.json:13:  "indexing": "idx = (lat+90)*360 + ((lon+180)%360), lon uses floor to 1deg bin",
./staging.css:2:body.stagingMode .wrap{
./staging.css:6:body.stagingMode .stagingBar{
./staging.css:18:  z-index: 9999;
./staging.css:23:body.stagingMode .stagingCorner{
./staging.css:32:  border: 2px solid #111111;
./staging.css:33:  border-radius: 6px;
./staging.css:34:  z-index: 10000;
./index.html:2:<html lang="zh-CN">
./index.html:5:  <meta name="viewport" content="width=device-width, initial-scale=1" />
./index.html:10:  <!-- Description for link preview -->
./index.html:11:  <meta name="description" content="现在要不要出门追光？一键给出观测窗口">
./index.html:12:  <meta property="og:description" content="现在要不要出门追光？一键给出观测窗口">
./index.html:13:  <link rel="stylesheet" href="./style.css?v=0343" />
./index.html:15:  <script defer src="https://static.cloudflareinsights.com/beacon.min.js"
./index.html:21:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
./index.html:27:      document.body.classList.add("stagingMode");
./index.html:30:      link.rel = "stylesheet";
./index.html:37:      bar.setAttribute("aria-label", "TEST / STAGING");
./index.html:38:      bar.textContent = "TEST / STAGING";
./index.html:43:      corner.setAttribute("aria-label", "TEST / STAGING");
./index.html:44:      corner.textContent = "TEST / STAGING";
./index.html:51:    <header class="head">
./index.html:59:              <h1 class="brandTitle"><span class="brandEn">Aurora Capture</span> <span class="brandCn">极光捕手</span></h1>
./index.html:66:        <button id="btnFavs" type="button" class="topLink" aria-label="收藏夹" data-i18n-attr="aria-label" data-i18n="🌟 收藏夹">🌟 收藏夹</button>
./index.html:67:        <button id="btnAbout" type="button" class="topLink" aria-label="工具介绍" data-i18n-attr="aria-label" data-i18n="📖 工具介绍">📖 工具介绍</button>
./index.html:68:        <button id="btnTrans" type="button" class="btnTrans" aria-label="Trans Toggle" data-i18n-attr="aria-label" data-i18n="翻译开关">Trans OFF</button>
./index.html:70:    </header>
./index.html:75:          <span class="label" data-i18n="纬度 Latitude">纬度 Latitude</span>
./index.html:76:          <input id="lat" type="number" step="0.0001" placeholder="例如 53.47" data-i18n-placeholder="例如 53.47" />
./index.html:79:          <span class="label" data-i18n="经度 Longitude">经度 Longitude</span>
./index.html:80:          <input id="lon" type="number" step="0.0001" placeholder="例如 122.35" data-i18n-placeholder="例如 122.35" />
./index.html:85:        <button id="btnGeo" type="button" class="btn secondary" data-i18n="📍 获取当前位置">📍 获取当前位置</button>
./index.html:86:        <button id="btnFav" type="button" class="btn secondary hidden" data-i18n="⭐ 收藏">⭐ 收藏</button>
./index.html:87:        <button id="btnRun" type="button" class="btn primary" data-i18n="✍️ 生成即时预测">✍️ 生成即时预测</button>
./index.html:90:      <details class="faq">
./index.html:91:        <summary id="geoHintSummary" data-i18n="推荐直接“获取当前位置”，也可手动输入经纬度">推荐直接“获取当前位置”，也可手动输入经纬度</summary>
./index.html:92:        <div class="faqBody" id="geoHintBody" data-i18n="目的地经纬度：可通过奥维地图长按获取，或使用腾讯地图坐标拾取器：https://lbs.qq.com/getPoint/。">
./index.html:95:      </details>
./index.html:97:      <div class="row statusRow" aria-label="数据状态" data-i18n-attr="aria-label" data-i18n="数据状态">
./index.html:99:        <div class="statusText" id="statusText" aria-live="polite" data-i18n="等待生成。">等待生成。</div>
./index.html:105:        <button class="tab active" data-tab="t1" data-i18n="1小时精准">1小时精准</button>
./index.html:106:        <button class="tab" data-tab="t3" data-i18n="3小时预测">3小时预测</button>
./index.html:107:        <button class="tab" data-tab="t72" data-i18n="72小时范围">72小时范围</button>
./index.html:116:        <div class="k" data-i18n="当前建议（1小时内，10分钟粒度）">当前建议（1小时内，10分钟粒度）</div>
./index.html:125:          <div class="heroSide" id="oneBlockers"></div>
./index.html:130:      <div class="card hero swHeroWide">
./index.html:131:        <div class="k" data-i18n="上游实况（近实时）">上游实况（近实时）</div>
./index.html:146:            <span class="swAuxItem"><span data-i18n="云量">云量</span> L/M/H —/—/—%</span>
./index.html:147:            <span class="swAuxItem"><span data-i18n="月角">月角</span> —°</span>
./index.html:158:              <div class="k" data-i18n="1小时 C值（Capture）柱状图">1小时 C值（Capture）柱状图</div>
./index.html:159:              <div class="small" data-i18n="C值越高，越建议投入。">C值越高，越建议投入。</div>
./index.html:161:            <div class="pill" id="unit10m" data-i18n="单位：10分钟">单位：10分钟</div>
./index.html:169:          <div class="k" data-i18n="1小时预测结论分级（C值）">1小时预测结论分级（C值）</div>
./index.html:171:            <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：投入回报高，建议立即行动。">：投入回报高，建议立即行动。</span></li>
./index.html:172:            <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：条件不错，建议准备与试拍。">：条件不错，建议准备与试拍。</span></li>
./index.html:173:            <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：存在机会，建议架机等待触发。">：存在机会，建议架机等待触发。</span></li>
./index.html:174:            <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：机会小，可低成本尝试。">：机会小，可低成本尝试。</span></li>
./index.html:175:            <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：当前时段不建议投入。">：当前时段不建议投入。</span></li>
./index.html:189:        <div class="dayCard c1" id="threeSlot0">
./index.html:191:            <div class="dayLabel" id="threeSlot0Time">—</div>
./index.html:193:          <div class="dayConclusion" id="threeSlot0Conclusion">不可观测</div>
./index.html:194:          <div class="dayNote" id="threeSlot0Note">当前时段不建议投入。</div>
./index.html:195:          <div class="dayBasis" id="threeSlot0Reason">—</div>
./index.html:198:        <div class="dayCard c1" id="threeSlot1">
./index.html:200:            <div class="dayLabel" id="threeSlot1Time">—</div>
./index.html:202:          <div class="dayConclusion" id="threeSlot1Conclusion">—</div>
./index.html:203:          <div class="dayNote" id="threeSlot1Note">—</div>
./index.html:204:          <div class="dayBasis" id="threeSlot1Reason">—</div>
./index.html:207:        <div class="dayCard c1" id="threeSlot2">
./index.html:209:            <div class="dayLabel" id="threeSlot2Time">—</div>
./index.html:211:          <div class="dayConclusion" id="threeSlot2Conclusion">—</div>
./index.html:212:          <div class="dayNote" id="threeSlot2Note">—</div>
./index.html:213:          <div class="dayBasis" id="threeSlot2Reason">—</div>
./index.html:220:        <div class="burstModelHead" data-i18n="近期极光状态">近期极光状态</div>
./index.html:221:        <div class="burstState" id="threeState">—</div>
./index.html:223:        <div class="burstNote" data-i18n="备注：爆发 ≠ 可观测，仍受云量与天光影响。">备注：爆发 ≠ 可观测，仍受云量与天光影响。</div>
./index.html:228:        <div class="k" data-i18n="太阳风送达能力综合模型">太阳风送达能力综合模型</div>
./index.html:229:        <div class="big2" id="threeDeliver">—</div>
./index.html:230:        <div class="small" id="threeDeliverMeta">—</div>
./index.html:235:        <div class="k" data-i18n="3小时结论分级（C值）">3小时结论分级（C值）</div>
./index.html:237:          <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：投入回报高，建议立即行动。">：投入回报高，建议立即行动。</span></li>
./index.html:238:          <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：条件不错，建议准备与试拍。">：条件不错，建议准备与试拍。</span></li>
./index.html:239:          <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：存在机会，建议架机等待触发。">：存在机会，建议架机等待触发。</span></li>
./index.html:240:          <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：机会小，可低成本尝试。">：机会小，可低成本尝试。</span></li>
./index.html:241:          <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：当前时段不建议投入。">：当前时段不建议投入。</span></li>
./index.html:250:        <div class="k" data-i18n="72小时范围预测">72小时范围预测</div>
./index.html:251:        <div class="small heroSub" id="outlookSub" data-i18n="按天评估极光出现的可能性，用于行程与时间规划。">按天评估极光出现的可能性，用于行程与时间规划。</div>
./index.html:257:              <div class="dayLabel" data-i18n="今天">今天</div>
./index.html:267:              <div class="dayLabel" data-i18n="明天">明天</div>
./index.html:277:              <div class="dayLabel" data-i18n="后天">后天</div>
./index.html:288:        <div class="k" data-i18n="72小时结论分级（C值）">72小时结论分级（C值）</div>
./index.html:290:          <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：能量背景+送达能力更强，值得提前规划。">：能量背景+送达能力更强，值得提前规划。</span></li>
./index.html:291:          <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：存在机会，重点看云与当晚即时模块。">：存在机会，重点看云与当晚即时模块。</span></li>
./index.html:292:          <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：机会少，除非位置/条件极佳。">：机会少，除非位置/条件极佳。</span></li>
./index.html:293:          <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：综合偏弱，提前投入意义不大。">：综合偏弱，提前投入意义不大。</span></li>
./index.html:294:          <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：不建议投入。">：不建议投入。</span></li>
./index.html:306:  <div id="aboutModal" class="modal hidden" aria-hidden="true">
./index.html:310:        <div id="aboutTitle" class="modalTitle" data-i18n="📖 工具介绍">📖 工具介绍</div>
./index.html:311:        <button id="btnAboutClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:315:        <p class="aboutSectionTitle" data-i18n="工具应该怎么使用？">
./index.html:319:        <p data-i18n="输入经纬度，系统会自动读取你当前所在的时间与时区，生成极光观测预告。">
./index.html:324:          <b data-i18n="【1 小时精准】">【1 小时精准】</b><br>
./index.html:325:          <span data-i18n="以 10 分钟为粒度，即时回答：">以 10 分钟为粒度，即时回答：</span><br>
./index.html:326:          <span data-i18n="「我现在要不要出门？要不要架机？」">「我现在要不要出门？要不要架机？」</span>
./index.html:330:          <b data-i18n="【3 小时预测】">【3 小时预测】</b><br>
./index.html:331:          <span data-i18n="呈现逐小时状态，选出最适合观测极光的一个小时。">呈现逐小时状态，选出最适合观测极光的一个小时。</span><br>
./index.html:332:          <span data-i18n="同时告诉你当前极光是处在爆发中还是已衰落，并回答：">同时告诉你当前极光是处在爆发中还是已衰落，并回答：</span><br>
./index.html:333:          <span data-i18n="「接下来 3 小时值不值得守？」">「接下来 3 小时值不值得守？」</span>
./index.html:337:          <b data-i18n="【72 小时范围】">【72 小时范围】</b><br>
./index.html:338:          <span data-i18n="引入更多 CH 与 CME 日冕物质抛射的信息，以天为单位，预测极光爆发的可能性。">引入更多 CH 与 CME 日冕物质抛射的信息，以天为单位，预测极光爆发的可能性。</span><br>
./index.html:339:          <span data-i18n="从更宏观的数据视角，回答：">从更宏观的数据视角，回答：</span><br>
./index.html:340:          <span data-i18n="「未来三天，哪一天最值得安排时间？」">「未来三天，哪一天最值得安排时间？」</span>
./index.html:343:        <p class="aboutSectionTitle" data-i18n="极光预测，为什么不能只是 KP？">
./index.html:348:          <span data-i18n="KP 是为全球空间天气监测而设计的宏观指标。">KP 是为全球空间天气监测而设计的宏观指标。</span><br>
./index.html:349:          <span data-i18n="它在航天器运行、电力系统防护、长期磁扰评估中非常有效，">它在航天器运行、电力系统防护、长期磁扰评估中非常有效，</span><br>
./index.html:350:          <span data-i18n="但它的设计目标，从来不是服务于具体地点、具体时段的地面观测者。">但它的设计目标，从来不是服务于具体地点、具体时段的地面观测者。</span>
./index.html:354:          <span data-i18n="对于普通极光观测与拍摄来说，KP 的粒度过于粗糙。">对于普通极光观测与拍摄来说，KP 的粒度过于粗糙。</span><br>
./index.html:355:          <span data-i18n="它不区分 IMF 的瞬时方向变化，也难以反映短时稳定性与局地响应。">它不区分 IMF 的瞬时方向变化，也难以反映短时稳定性与局地响应。</span><br>
./index.html:356:          <span data-i18n="这也是为什么在真实体验中，常常会出现：">这也是为什么在真实体验中，常常会出现：</span><br>
./index.html:357:          <span data-i18n="KP 看似“非常合适”，却完全无法观测或拍摄的情况。">KP 看似“非常合适”，却完全无法观测或拍摄的情况。</span>
./index.html:359:        <p data-i18n="于是，在漠河零下40度的寒夜中，Aurora Capture 诞生了。">
./index.html:363:          <span data-i18n="C 值（Capture指数）并不是用来替代 KP 的。">C 值（Capture指数）并不是用来替代 KP 的。</span><br>
./index.html:364:          <span data-i18n="它更像是一个面向摄影师与追光者的【可拍可观指数】。">它更像是一个面向摄影师与追光者的【可拍可观指数】。</span>
./index.html:368:          <span data-i18n="作为一名理工科出身的风光摄影爱好者，">作为一名理工科出身的风光摄影爱好者，</span><br>
./index.html:369:          <span data-i18n="我尝试从更接近观测者的角度出发，直接调用太阳风与磁场的原始参数建模，">我尝试从更接近观测者的角度出发，直接调用太阳风与磁场的原始参数建模，</span><br>
./index.html:370:          <span data-i18n="在更短的时间尺度上，评估它们是否正在形成一个对拍摄友好的窗口。">在更短的时间尺度上，评估它们是否正在形成一个对拍摄友好的窗口。</span>
./index.html:374:          <span data-i18n="让我们一起看看：">让我们一起看看：</span><br>
./index.html:375:          <span data-i18n="此刻，地球手里握着的，究竟是一副什么样的牌？">此刻，地球手里握着的，究竟是一副什么样的牌？</span>
./index.html:378:        <p class="aboutSectionTitle" style="margin-top:18px;" data-i18n="反馈与建议">
./index.html:382:          <span data-i18n="报错 / 建议 / 数据异常 请发送邮件至：">报错 / 建议 / 数据异常 请发送邮件至：</span><br>
./index.html:383:          <a href="mailto:maintainer@auroracapture.com" style="color:rgba(255,255,255,.85); text-decoration:underline;">maintainer@auroracapture.com</a><br>
./index.html:384:          <span style="display:inline-block; margin-top:6px; color:rgba(255,255,255,.55); font-size:12px;" data-i18n="个人维护，可能延迟回复。">个人维护，可能延迟回复。</span>
./index.html:387:        <p style="margin-top:18px; text-align:right; color:rgba(255,255,255,.55); font-size:12px;" data-i18n="—— @小狮子佑酱">
./index.html:397:  <div id="loginModal" class="modal hidden" aria-hidden="true">
./index.html:401:        <div id="loginTitle" class="modalTitle" data-i18n="需要登录">需要登录</div>
./index.html:402:        <button id="btnLoginClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:405:        <p data-i18n="为了跨设备保存收藏位置，需要登录一次。">为了跨设备保存收藏位置，需要登录一次。</p>
./index.html:406:        <p data-i18n="登录后，你收藏的地点就可以在不同设备上使用啦 🌟">登录后，你收藏的地点就可以在不同设备上使用啦 🌟</p>
./index.html:408:          <span class="label" data-i18n="邮箱">邮箱</span>
./index.html:409:          <input id="loginEmail" type="email" placeholder="邮箱" data-i18n-placeholder="邮箱" />
./index.html:411:        <div class="formError hidden" id="loginError">—</div>
./index.html:414:        <button id="btnLoginConfirm" class="btn primary" type="button" aria-label="发送登录链接" data-i18n-attr="aria-label" data-i18n="发送登录链接">发送登录链接</button>
./index.html:415:        <button id="btnLoginCancel" class="btn secondary" type="button" aria-label="取消" data-i18n-attr="aria-label" data-i18n="取消">取消</button>
./index.html:421:  <div id="favModal" class="modal hidden" aria-hidden="true">
./index.html:425:        <div id="favTitle" class="modalTitle" data-i18n="🌟 收藏夹">🌟 收藏夹</div>
./index.html:426:        <button id="btnFavClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:429:        <div id="favEmpty" class="emptyText" data-i18n="还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏">还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏</div>
./index.html:431:        <div id="favLogoutRow" class="hidden" style="margin-top:10px; text-align:center;">
./index.html:432:          <button id="btnLogout" type="button" data-i18n="退出登录" style="border:0; background:transparent; color:rgba(255,255,255,.5); font-size:12px; cursor:pointer; text-decoration:underline;">退出登录</button>
./index.html:439:  <div id="favEditModal" class="modal hidden" aria-hidden="true">
./index.html:443:        <div id="favEditTitle" class="modalTitle" data-i18n="收藏地点">收藏地点</div>
./index.html:444:        <button id="btnFavEditClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:448:          <div class="kvLabel" data-i18n="当前坐标">当前坐标</div>
./index.html:452:          <span class="label" data-i18n="地点名称">地点名称</span>
./index.html:453:          <input id="favEditName" type="text" maxlength="40" placeholder="地点名称" data-i18n-placeholder="地点名称" />
./index.html:455:        <div class="formError hidden" id="favEditError">—</div>
./index.html:458:        <button id="btnFavEditSave" class="btn primary" type="button" data-i18n="保存">保存</button>
./index.html:459:        <button id="btnFavEditCancel" class="btn secondary" type="button" data-i18n="取消">取消</button>
./index.html:465:  <div class="alertOverlay" id="alertOverlay" aria-hidden="true">
./index.html:468:        <div class="alertTitle" id="alertTitle" data-i18n="⚠️ 数据可信度提醒">⚠️ 数据可信度提醒</div>
./index.html:469:        <button class="modalX" id="alertClose" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:472:      <div class="alertNote" id="alertNote" data-i18n="不代表无法观测，仅表示模型输入存在不确定性。">不代表无法观测，仅表示模型输入存在不确定性。</div>
./index.html:474:        <button class="btn primary" id="alertOk" type="button" data-i18n="知道了">知道了</button>
./index.html:479:  <!-- Model config (optional): enable real AACGMv2 MLAT via your own endpoint; otherwise falls back to approx -->
./index.html:481:    window.MODEL_CONFIG = window.MODEL_CONFIG || {
./index.html:488:  <!-- Trans config (optional): set apiBase to your Worker origin, e.g., https://xxx.workers.dev -->
./index.html:491:      apiBase: "https://aurora-capture-trans.glorialiu86.workers.dev"
./index.html:495:  <script defer src="config.public.js?v=0343"></script>
./index.html:497:  <script defer src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
./index.html:498:  <script defer src="./supabaseClient.js?v=0343"></script>
./index.html:499:  <!-- your modules -->
./index.html:500:  <script defer src="./adapter.js?v=0343"></script>
./index.html:501:  <script defer src="./ui.js?v=0343"></script>
./index.html:502:  <script defer src="./trans.js?v=0343"></script>
./index.html:503:  <script defer src="./model.js?v=0343"></script>
./index.html:504:  <script defer src="./app.js?v=0343"></script>
./supabaseClient.js:1:// supabaseClient.js — Supabase client init + Magic Link auth + favorites API
./supabaseClient.js:10:    const override = window[CONFIG_KEY] || {};
./supabaseClient.js:11:    const cfg = { ...base, ...override };
./supabaseClient.js:22:  let localConfigLoaded = false;
./supabaseClient.js:28:    if(localConfigLoaded) return;
./supabaseClient.js:29:    localConfigLoaded = true;
./supabaseClient.js:32:      const res = await fetch("./config.js", { cache: "no-store" });
./supabaseClient.js:33:      if(!res.ok) return;
./supabaseClient.js:34:      const code = await res.text();
./supabaseClient.js:35:      if(!code) return;
./supabaseClient.js:36:      const fn = new Function(code);
./supabaseClient.js:49:      auth: { persistSession: true, autoRefreshToken: true }
./supabaseClient.js:74:      const { data, error } = await cli.auth.getSession();
./supabaseClient.js:76:        console.log(`${LOG_PREFIX} getSession error:`, error);
./supabaseClient.js:79:      console.log(`${LOG_PREFIX} session:`, data?.session || null);
./supabaseClient.js:81:      console.log(`${LOG_PREFIX} getSession exception:`, err);
./supabaseClient.js:85:  const getSession = async () => {
./supabaseClient.js:87:    if(!cli) return { session: null, error: "unavailable" };
./supabaseClient.js:88:    const { data, error } = await cli.auth.getSession();
./supabaseClient.js:89:    if(error) return { session: null, error };
./supabaseClient.js:90:    return { session: data?.session || null, error: null };
./supabaseClient.js:96:    return cli.auth.onAuthStateChange((event, session) => {
./supabaseClient.js:97:      try{ handler?.(event, session); }catch(_){ /* ignore */ }
./supabaseClient.js:120:  const listFavorites = async (userId) => {
./supabaseClient.js:124:      .from("favorites")
./supabaseClient.js:127:      .order("created_at", { ascending: false });
./supabaseClient.js:142:      .from("favorites")
./supabaseClient.js:156:      .from("favorites")
./supabaseClient.js:164:  const deleteFavorite = async (id, userId) => {
./supabaseClient.js:168:      .from("favorites")
./supabaseClient.js:169:      .delete()
./supabaseClient.js:180:    getSession,
./supabaseClient.js:184:    listFavorites,
./supabaseClient.js:187:    deleteFavorite
./REVIEW.md:10:- `index.html`：版本号统一递增（缓存参数与页脚版本号）
./REVIEW.md:28:- 护栏：只改 `trans-zh-en.md` 与 `index.html`，不改代码与参数；术语已按冻结规范执行
./workers/README.md:3:This Worker proxies DeepL API calls for the frontend `Trans` toggle.
./workers/README.md:8:  - Response: `{ "ok": true, "target": "EN-GB", "texts": ["...", "..."] }`
./workers/README.md:9:- `GET /api/languages`
./workers/README.md:10:  - Response: `{ "ok": true, "targets": ["EN", "EN-GB", "PT-BR"] }`
./workers/README.md:12:## Environment Variables
./workers/README.md:13:- `DEEPL_API_KEY` (required)
./workers/README.md:14:- `DEEPL_API_URL` (optional, default `https://api-free.deepl.com`)
./workers/README.md:15:- `ALLOW_ORIGIN` (optional, CORS allowlist; default `*`)
./workers/README.md:17:## Deploy (Cloudflare Workers)
./workers/README.md:19:2. Deploy `workers/index.js`.
./workers/README.md:20:3. Set `window.TRANS_CONFIG.apiBase` in `index.html` to your Worker origin.
./MODEL_WHITEBOX.md:1:# Aurora Capture 内部白盒模型说明（与 model.js 一一对应）
./MODEL_WHITEBOX.md:7:- 对应文件：`model.js`
./MODEL_WHITEBOX.md:8:- 入口函数/暴露：`window.Model = { ... }`
./MODEL_WHITEBOX.md:12:  3) 评分与标签 `baseScoreFromSW` / `score5FromC10` / `labelByScore5`
./MODEL_WHITEBOX.md:13:  4) Aurora Oval 软约束 `ovalMinMlatFromC10` / `applyOvalConstraint`
./MODEL_WHITEBOX.md:14:  5) 1h 投递模型 `deliverModel`
./MODEL_WHITEBOX.md:29:- 太阳风基准评分权重（`baseScoreFromSW`）：
./MODEL_WHITEBOX.md:36:  - `block_moon_frac_ge=0.50`
./MODEL_WHITEBOX.md:39:  - `oval_margin_deg=3.0`
./MODEL_WHITEBOX.md:40:  - `oval_in_deg=2.0`
./MODEL_WHITEBOX.md:41:  - `oval_edge_out_deg=6.0`
./MODEL_WHITEBOX.md:61:- 定义 `MLAT = 90 - deg(c)`
./MODEL_WHITEBOX.md:72:### 3.1 `baseScoreFromSW(sw, missingKeys)`
./MODEL_WHITEBOX.md:95:### 3.2 `score5FromC10(c10)`
./MODEL_WHITEBOX.md:109:- 5 → `STRONGLY_RECOMMENDED` / `强烈推荐` / `g`
./MODEL_WHITEBOX.md:118:### 4.1 `ovalMinMlatFromC10(c10)`
./MODEL_WHITEBOX.md:122:- `c10`：0~10 活动强度（来自 `baseScoreFromSW` 或后续调整）。
./MODEL_WHITEBOX.md:145:- 常量：`oval_margin_deg`、`oval_in_deg`、`oval_edge_out_deg`、`oval_floor_factor`、`oval_edge_factor`。
./MODEL_WHITEBOX.md:148:- `delta = userMlat - minMlat`
./MODEL_WHITEBOX.md:149:- `deltaEff = delta + oval_margin_deg`（抵消磁纬误差）
./MODEL_WHITEBOX.md:152:- **IN**：`deltaEff >= oval_in_deg` → `factor=1.0`
./MODEL_WHITEBOX.md:153:- **EDGE**：`-oval_edge_out_deg <= deltaEff < oval_in_deg`
./MODEL_WHITEBOX.md:155:- **OUT**：`deltaEff < -oval_edge_out_deg`
./MODEL_WHITEBOX.md:169:## 5. 1 小时模型：`deliverModel(sw)`
./MODEL_WHITEBOX.md:198:- `dense = (n >= 2.0)`
./MODEL_WHITEBOX.md:202:2) `bg && (dense || trig)` → `OUTBURST_BUILDING` / `score: 6.4`
./MODEL_WHITEBOX.md:235:- `moonAltDeg`、`moonFrac`：月亮高度 / 月相（推导状态）。
./MODEL_WHITEBOX.md:236:- `sunAltDeg`：太阳高度（推导状态）。
./MODEL_WHITEBOX.md:240:- 月光干扰：`moonAltDeg >= 15` 且 `moonFrac >= 0.50`
./MODEL_WHITEBOX.md:241:- 天光干扰：`sunAltDeg > -10`
./MODEL_WHITEBOX.md:255:- `baseScoreFromSW` → `score5FromC10` → `labelByScore5`
./MODEL_WHITEBOX.md:256:- 评分线可被 `applyOvalConstraint` 软约束调整后再进入 `score5FromC10`。
./MODEL_WHITEBOX.md:263:- 1h：`deliverModel`（阈值计数）
./MODEL_WHITEBOX.md:278:- `baseScoreFromSW` 缺字段惩罚（`miss_bz` / `miss_bt` / `miss_v`）
./MODEL_WHITEBOX.md:289:- `baseScoreFromSW`：太阳风评分（0~10）
./MODEL_WHITEBOX.md:290:- `score5FromC10`：评分分档（1~5）
./MODEL_WHITEBOX.md:292:- `ovalMinMlatFromC10`：椭圆最低磁纬估计
./MODEL_WHITEBOX.md:294:- `deliverModel`：1h 阈值计数
./workers/index.js:2:  const headers = Object.assign({ "Content-Type": "application/json; charset=utf-8" }, init.headers || {});
./workers/index.js:3:  return new Response(JSON.stringify(body), Object.assign({}, init, { headers }));
./workers/index.js:6:const corsHeaders = (origin) => ({
./workers/index.js:7:  "Access-Control-Allow-Origin": origin || "*",
./workers/index.js:8:  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
./workers/index.js:9:  "Access-Control-Allow-Headers": "Content-Type",
./workers/index.js:12:const normalizeTarget = (lang) => {
./workers/index.js:13:  const raw = String(lang || "").trim();
./workers/index.js:18:const targetLooksValid = (target) => /^[A-Z]{2,3}(-[A-Z0-9]{2,8})?$/.test(target);
./workers/index.js:27:  const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:28:  const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:31:    const r = await fetch(`${apiBase}/v2/languages?type=target`, {
./workers/index.js:32:      headers: { "Authorization": `DeepL-Auth-Key ${apiKey}` },
./workers/index.js:36:    const targets = Array.isArray(j) ? j.map((x) => String(x?.language || "").trim()).filter(Boolean) : [];
./workers/index.js:47:export default {
./workers/index.js:48:  async fetch(request, env) {
./workers/index.js:49:    const url = new URL(request.url);
./workers/index.js:52:    if(request.method === "OPTIONS"){
./workers/index.js:53:      return new Response("", { status: 204, headers: corsHeaders(origin) });
./workers/index.js:56:    if(url.pathname === "/api/translate" && request.method === "POST"){
./workers/index.js:58:      try{ payload = await request.json(); }catch(_){ /* ignore */ }
./workers/index.js:65:        return json({ ok:false, error:"bad_request" }, { status: 400, headers: corsHeaders(origin) });
./workers/index.js:68:        return json({ ok:false, error:"bad_request" }, { status: 400, headers: corsHeaders(origin) });
./workers/index.js:71:      const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:72:      const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:74:        return json({ ok:false, error:"unauthorized" }, { status: 401, headers: corsHeaders(origin) });
./workers/index.js:78:      if(targetList && !targetList.includes(target)){
./workers/index.js:79:        return json({ ok:false, error:"bad_request" }, { status: 400, headers: corsHeaders(origin) });
./workers/index.js:84:      body.set("target_lang", target);
./workers/index.js:85:      body.set("source_lang", source);
./workers/index.js:90:          headers: {
./workers/index.js:91:            "Authorization": `DeepL-Auth-Key ${apiKey}`,
./workers/index.js:92:            "Content-Type": "application/x-www-form-urlencoded",
./workers/index.js:98:          return json({ ok:false, error:"upstream_error" }, { status, headers: corsHeaders(origin) });
./workers/index.js:103:        return json({ ok:true, target, text: out, texts: list }, { status: 200, headers: corsHeaders(origin) });
./workers/index.js:105:        return json({ ok:false, error:"upstream_error" }, { status: 502, headers: corsHeaders(origin) });
./workers/index.js:109:    if(url.pathname === "/api/languages" && request.method === "GET"){
./workers/index.js:110:      const apiBase = (env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/g, "");
./workers/index.js:111:      const apiKey = env.DEEPL_API_KEY || "";
./workers/index.js:113:        return json({ ok:false, error:"unauthorized" }, { status: 401, headers: corsHeaders(origin) });
./workers/index.js:116:        const r = await fetch(`${apiBase}/v2/languages?type=target`, {
./workers/index.js:117:          headers: { "Authorization": `DeepL-Auth-Key ${apiKey}` },
./workers/index.js:120:          return json({ ok:false, error:"upstream_error" }, { status: 502, headers: corsHeaders(origin) });
./workers/index.js:123:        const targets = Array.isArray(j) ? j.map((x) => String(x?.language || "").trim()).filter(Boolean) : [];
./workers/index.js:127:        return json({ ok:true, targets }, { status: 200, headers: corsHeaders(origin) });
./workers/index.js:129:        return json({ ok:false, error:"upstream_error" }, { status: 502, headers: corsHeaders(origin) });
./workers/index.js:133:    return json({ ok:false, error:"not_found" }, { status: 404, headers: corsHeaders(origin) });
./model.js:1:// model.js
./model.js:3:  // Local math helpers (do NOT depend on UI.js load order)
./model.js:15:    // baseScoreFromSW 内部权重（先按你原来的）
./model.js:29:    block_moon_frac_ge: 0.50,   // 月相亮度（0~1）≥ 0.50（半月以上）
./model.js:35:    oval_margin_deg: 3.0,       // 乐观边距：等价于把用户磁纬向极区“挪近”3°（减少误杀）
./model.js:36:    oval_in_deg: 2.0,           // 视为“椭圆内”的安全余量（>= +2°）
./model.js:37:    oval_edge_out_deg: 6.0,     // 视为“边缘可视”的外延范围（到 -6° 仍可能看见低仰角/高空极光）
./model.js:49:    // 2024 North magnetic dip pole (IGRF/WMM-derived)
./model.js:51:    const poleLon = 142.3; // degrees East
./model.js:54:    const deg = (rad)=> rad * 180 / Math.PI;
./model.js:63:    // Define MLAT as 90° minus the angular distance to the dip pole
./model.js:64:    return 90 - deg(c);
./model.js:68:  // Magnetic Latitude (simplified)
./model.js:85:    if(s >= 5) return { score:5, key:"STRONGLY_RECOMMENDED", t:"强烈推荐", cls:"g" };
./model.js:93:  function baseScoreFromSW(sw, missingKeys){
./model.js:102:    const bzMissing = missingKeys?.includes("bz");
./model.js:110:    if(missingKeys?.includes("bt")) raw *= W.miss_bt;
./model.js:111:    if(missingKeys?.includes("v"))  raw *= W.miss_v;
./model.js:116:  function score5FromC10(c10){
./model.js:135:  function ovalMinMlatFromC10(c10){
./model.js:154:  // - 用 oval_margin_deg 做“乐观边距”以抵消磁纬误差（减少误杀）
./model.js:166:        deltaEff: null,
./model.js:171:    const minMlat = ovalMinMlatFromC10(base);
./model.js:173:    // delta: >0 表示你比椭圆最低磁纬更靠极（更有利）
./model.js:174:    // deltaEff: 加上乐观边距，减少因磁纬误差导致的误杀
./model.js:175:    const delta = mlat - minMlat;
./model.js:176:    const deltaEff = delta + Number(W.oval_margin_deg ?? 0);
./model.js:178:    const inDeg   = Number(W.oval_in_deg ?? 2.0);
./model.js:179:    const edgeOut = Number(W.oval_edge_out_deg ?? 6.0);
./model.js:185:    if(deltaEff >= inDeg){
./model.js:190:    } else if(deltaEff >= -edgeOut){
./model.js:192:      // 从 inDeg -> -edgeOut 线性过渡到 oval_edge_factor
./model.js:193:      const t = clamp((inDeg - deltaEff) / (inDeg + edgeOut), 0, 1);
./model.js:221:      deltaEff,
./model.js:225:  function deliverModel(sw){
./model.js:246:    const dense = (n >= 2.0);
./model.js:251:    if(bg && (dense || trig)){
./model.js:296:   *  moonAltDeg?: number|null,
./model.js:297:   *  moonFrac?: number|null,  // 0~1
./model.js:298:   *  sunAltDeg?: number|null
./model.js:303:    const moonAltDeg = (p?.moonAltDeg == null) ? null : Number(p.moonAltDeg);
./model.js:304:    const moonFrac   = (p?.moonFrac   == null) ? null : Number(p.moonFrac);
./model.js:305:    const sunAltDeg  = (p?.sunAltDeg  == null) ? null : Number(p.sunAltDeg);
./model.js:317:    if(moonAltDeg != null && moonFrac != null){
./model.js:318:      if(moonAltDeg >= W.block_moon_alt_ge && moonFrac >= W.block_moon_frac_ge){
./model.js:324:    if(sunAltDeg != null){
./model.js:325:      if(sunAltDeg > W.block_twilight_sun_alt_gt){
./model.js:355:  window.Model = {
./model.js:361:    baseScoreFromSW,
./model.js:362:    score5FromC10,
./model.js:363:    deliverModel,
./model.js:368:    ovalMinMlatFromC10,
./trans-zh-en.md:4:  - Tool Guide section headings MUST use brackets in both languages: `【现在】/【未来 3 小时】/【未来 3 天】` and `【Now】/【Next 3 Hours】/【Next 3 Days】`.
./trans-zh-en.md:6:## ⚠️ Terminology Note (Frozen)
./trans-zh-en.md:8:- Frontend UI should use **“未来 3 天 / Next 3 Days”** for this timeframe.
./trans-zh-en.md:13:- “未来 3 天” is the required presentation term and must appear in UI text.
./trans-zh-en.md:15:- ⚠️ No implementation changes should be made based on this note at this stage.
./trans-zh-en.md:17:- Guide content freeze rule:
./trans-zh-en.md:18:  - The entire **Guide modal** copy is treated as a single article-level translation entry (no sentence-by-sentence keys).
./trans-zh-en.md:19:  - This prevents tab/sheet labels from being “merged” with Guide headings and avoids cross-UI contamination.
./trans-zh-en.md:20:  - ⚠️ No implementation changes should be made based on this note at this stage.
./trans-zh-en.md:24:## Entries
./trans-zh-en.md:41:- en: Guide
./trans-zh-en.md:49:- zh: 纬度 Latitude
./trans-zh-en.md:50:- en: Latitude
./trans-zh-en.md:55:- zh: 经度 Longitude
./trans-zh-en.md:56:- en: Longitude
./trans-zh-en.md:71:- en: Notice: We recommend using “Get current location”. You can also enter coordinates manually.
./trans-zh-en.md:74:- en: Notice: To get destination coordinates, right-click a point in Google Maps to copy the latitude and longitude. You can also use any online coordinate picker.
./trans-zh-en.md:92:- en: Current Recommendation (updated every 10 minutes)
./trans-zh-en.md:107:- en: Higher C values indicate stronger justification for committing time and effort.
./trans-zh-en.md:110:- en: Unit: 10 minutes
./trans-zh-en.md:116:- en: Strongly Recommended
./trans-zh-en.md:119:- en: High expected return; immediate action is recommended.
./trans-zh-en.md:125:- en: Conditions are favorable; preparation and test shots are recommended.
./trans-zh-en.md:143:- en: Not observable under current conditions.
./trans-zh-en.md:149:- en: Not recommended to commit resources during this time window.
./trans-zh-en.md:155:- en: Note: A surge does not guarantee observability; cloud cover and sky brightness still apply.
./trans-zh-en.md:158:- en: Solar Wind Coupling & Propagation Model
./trans-zh-en.md:167:- en: A day-by-day outlook for the next three days, designed to help with trip planning and time allocation.
./trans-zh-en.md:182:- en: Strong background energy and favorable delivery conditions. Suitable for advance planning.
./trans-zh-en.md:185:- en: Moderate-to-good conditions. Planning may be worthwhile, depending on location and clouds.
./trans-zh-en.md:194:- en: Very weak background and delivery conditions. Planning is not recommended.
./trans-zh-en.md:200:- en: Data sources: NOAA SWPC (real-time solar wind, OVATION nowcast, Kp forecast) and Open-Meteo cloud forecast. MLAT is currently estimated (dipole approximation).
./trans-zh-en.md:205:- zh: 【Guide｜整篇文案（冻结）】
./trans-zh-en.md:211:    Enter coordinates and Aurora Capture will automatically use your local time and time zone to generate an observing briefing.
./trans-zh-en.md:214:    Updated every 10 minutes to answer:
./trans-zh-en.md:218:    Shows hour-by-hour conditions and highlights the best hour to observe.
./trans-zh-en.md:219:    Also indicates whether auroral activity is building, peaking, or fading, and answers:
./trans-zh-en.md:223:    Incorporates additional CH and CME information to assess auroral activity on a day-by-day basis.
./trans-zh-en.md:224:    From a broader data perspective, it answers:
./trans-zh-en.md:229:    Kp is a broad, global index designed for monitoring space weather at scale.
./trans-zh-en.md:231:    It is highly useful for spacecraft operations, power-grid protection, and long-term geomagnetic disturbance assessment.
./trans-zh-en.md:233:    But Kp was never designed to serve a ground observer who cares about a specific location and a specific time window.
./trans-zh-en.md:237:    It does not capture rapid changes in the IMF direction, and it struggles to reflect short-term stability and local responses.
./trans-zh-en.md:244:    The C value (Capture Index) is not meant to replace Kp.
./trans-zh-en.md:245:    It is closer to a “photographability index” built for photographers and chasers.
./trans-zh-en.md:247:    As a landscape photographer with an engineering background, I started from an observer’s perspective:
./trans-zh-en.md:248:    I model directly from raw solar wind and magnetic-field parameters,
./trans-zh-en.md:249:    and evaluate—on shorter time scales—whether they are forming a window that is friendly for shooting.
./trans-zh-en.md:257:- en: For errors, suggestions, or data issues, please email:
./trans-zh-en.md:260:- en: Maintained personally; replies may be delayed.
./trans-zh-en.md:269:- en: To save locations across devices, please log in once.
./trans-zh-en.md:272:- en: After logging in, your saved locations will be available across devices.
./trans-zh-en.md:293:- en: Current coordinates
./trans-zh-en.md:305:- en: This does not mean it is Unobservable; it only indicates uncertainty in the model inputs.
./trans-zh-en.md:311:- en: Surge in Progress
./trans-zh-en.md:314:- en: Surge in Progress
./trans-zh-en.md:332:- en: Strongly Recommended
./trans-zh-en.md:356:- en: ⚠️ Error: Invalid coordinates.
./trans-zh-en.md:359:- en: ⚠️ Error: Coordinates out of range.
./trans-zh-en.md:362:- en: ⚠️ Error: Location processing failed.
./trans-zh-en.md:365:- en: ⚠️ Error: Invalid coordinates returned from location services.
./trans-zh-en.md:395:- en: Please enter valid coordinates.
./trans-zh-en.md:398:- en: Core calculation module not loaded (SunCalc).
./trans-zh-en.md:401:- en: ⚠️ Warning: Solar wind data source unavailable. Entered conservative mode.
./trans-zh-en.md:407:- en: ⚠️ Error: Forecast failed. Check console for details.
./trans-zh-en.md:422:- en: This is a hard geographic limit, not missing data or model uncertainty.
./trans-zh-en.md:437:- en: Keep an eye on it now; decide closer to the time.
./trans-zh-en.md:452:- en: ⚠️ Error: Your browser does not support location services.
./trans-zh-en.md:455:- en: Notice: You can enter coordinates manually.
./trans-zh-en.md:461:- en: ⚠️ Error: Invalid coordinates returned from location services. Please re-acquire or enter coordinates manually.
./trans-zh-en.md:470:- en: ⚠️ Error: Location succeeded, but processing the coordinates failed. Please re-acquire or enter coordinates manually.
./trans-zh-en.md:473:- en: ⚠️ Error: Location acquisition failed. Please re-acquire or enter coordinates manually.
./trans-zh-en.md:476:- en: ⚠️ Error: Location permission was denied. Please enable location access in your browser settings, then re-acquire.
./trans-zh-en.md:479:- en: ⚠️ Error: Unable to acquire location (weak signal or location services are disabled).
./trans-zh-en.md:482:- en: ⚠️ Error: Location acquisition timed out. Please re-acquire later, or enter coordinates manually.
./trans-zh-en.md:485:- en: ⚠️ Error: An error occurred while acquiring location. Please re-acquire or enter coordinates manually.
./trans-zh-en.md:488:- en: ⚠️ Error: Please enter numeric values for latitude and longitude.
./trans-zh-en.md:491:- en: Latitude range:
./trans-zh-en.md:494:- en: ; longitude range:
./trans-zh-en.md:497:- en: Example: latitude 53.47, longitude 122.35.
./trans-zh-en.md:505:- zh: 纬度（Latitude）：
./trans-zh-en.md:506:- en: Latitude:
./trans-zh-en.md:508:- zh: 经度（Longitude）：
./trans-zh-en.md:509:- en: Longitude:
./trans-zh-en.md:512:- en: Please correct the values, then run the forecast.
./trans-zh-en.md:542:- en: Trend: Bz has turned strongly south over the past 30 minutes (≈${drop30} nT). Prepare in advance (30–60 min).
./trans-zh-en.md:545:- en: Trend: Bz has turned south rapidly over the past 15 minutes (≈${drop15} nT). Prepare in advance (30–60 min).
./trans-zh-en.md:554:- en: Data freshness
./trans-zh-en.md:557:- en: NOAA data definitions have changed, or some fields are missing:
./trans-zh-en.md:563:- en: View data reliability details
./trans-zh-en.md:584:- en: Solar Wind Propagation Assessment
./trans-zh-en.md:587:- en: (Bt / Speed / Density)
./trans-zh-en.md:602:- en: Please enter a valid email address.
./trans-zh-en.md:614:- en: Invalid coordinates. Unable to save.
./trans-zh-en.md:617:- en: This location is already saved. Delete it before saving again.
./trans-zh-en.md:644:- en: You are in the outer visibility zone: expect low-elevation northern aurora and higher-altitude glow; outcomes depend heavily on clouds and sky brightness.
./trans-zh-en.md:647:- en: You are far from the primary oval region: it becomes an edge-horizon gamble and requires stronger triggering or longer duration.
./style.css:63:*{box-sizing:border-box}
./style.css:73:    linear-gradient(180deg, var(--bg0), var(--bg1));
./style.css:90:/* Header right area: 工具介绍 + language toggle */
./style.css:99:/* Header help button: compact in header */
./style.css:103:  border-radius: 999px;
./style.css:107:/* Header top link (text-style, no box, but clickable) */
./style.css:110:  border: 0;
./style.css:125:  text-decoration: underline;
./style.css:126:  text-underline-offset: 3px;
./style.css:127:  text-decoration-color: rgba(255,255,255,.35);
./style.css:136:  border: 1px solid rgba(255,255,255,.16);
./style.css:139:  border-radius: 999px;
./style.css:151:  border-color: rgba(255,255,255,.22);
./style.css:161:  /* Let logo scale with brand title size (desktop first) */
./style.css:165:  /* scale by brand font-size so logo naturally matches title height */
./style.css:170:  border:1px solid var(--stroke);
./style.css:171:  border-radius: .42em;
./style.css:174:  overflow: hidden; /* 让发光边缘更干净 */
./style.css:179:/* Logo without frame (used when index adds .logoPlain) */
./style.css:181:  border: 0;
./style.css:206:  overflow: hidden;
./style.css:210:.brandTitle .brandEn{ color: var(--txt); }
./style.css:217:  border-radius:999px;
./style.css:218:  border:1px solid var(--stroke);
./style.css:229:  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
./style.css:230:  border:1px solid var(--stroke);
./style.css:231:  border-radius: var(--r);
./style.css:239:  grid-template-columns: 1fr 1fr;
./style.css:280:  border-radius: 14px;
./style.css:281:  border:1px solid var(--stroke2);
./style.css:288:input::placeholder{color:rgba(255,255,255,.35)}
./style.css:299:  border-radius: 14px;
./style.css:300:  border:1px solid var(--stroke2);
./style.css:307:  background: linear-gradient(180deg, rgba(91,124,255,.95), rgba(91,124,255,.75));
./style.css:308:  border-color: rgba(91,124,255,.35);
./style.css:310:.btn.primary:hover{filter:brightness(1.04)}
./style.css:316:  border-radius: 14px;
./style.css:328:  border-color: rgba(255,255,255,.14);
./style.css:350:  border-radius: 14px;
./style.css:352:  border: 1px solid rgba(70, 210, 150, .32);
./style.css:357:  border-color: rgba(70, 210, 150, .42);
./style.css:359:/* If btnHelp also has .ghost, force the downgraded look */
./style.css:362:  border: 1px solid rgba(255,255,255,.12);
./style.css:367:  border-color: rgba(255,255,255,.16);
./style.css:372:  border-radius: 12px;
./style.css:413:  border-radius: 999px;
./style.css:414:  border:1px solid var(--stroke);
./style.css:419:  /* prevent long status text (e.g. 来源/FMI) from breaking layout */
./style.css:423:  overflow: hidden;
./style.css:427:/* Mobile: let each dot take a full row so text doesn't squeeze */
./style.css:429:  /* Mobile: pills compact; long explanation hidden */
./style.css:441:.dot.ok{color:rgba(43,209,126,.95); border-color: rgba(43,209,126,.22)}
./style.css:442:.dot.warn{color:rgba(255,204,102,.95); border-color: rgba(255,204,102,.22)}
./style.css:443:.dot.bad{color:rgba(255,91,106,.95); border-color: rgba(255,91,106,.22)}
./style.css:475:  border-radius: 999px;
./style.css:478:  border: 1px solid rgba(255,255,255,.12);
./style.css:483:  border-color: rgba(255,255,255,.16);
./style.css:490:    grid-template-columns: 1fr auto;
./style.css:513:  border-radius: 999px;
./style.css:514:  border:1px solid var(--stroke2);
./style.css:520:  border-color: rgba(91,124,255,.45);
./style.css:529:  grid-template-columns: 1fr 1fr;
./style.css:602:.burstModelHead{
./style.css:634:#threeState:empty{ display:none; }
./style.css:635:#threeState:empty + #threeBurst{ margin-top: 0; }
./style.css:638:  .burstModelHead{ font-size: 14px; }
./style.css:653:  border-radius: 999px;
./style.css:654:  border:1px solid var(--stroke);
./style.css:680:  overflow: hidden;
./style.css:735:.tableWrap{overflow:auto; border-radius: 14px; margin-top:10px}
./style.css:738:  border-collapse: collapse;
./style.css:743:  border-bottom: 1px solid rgba(255,255,255,.06);
./style.css:796:/* best 卡：轻微抬起 + 内描边（不强行改颜色，保持 c1~c5 体系） */
./style.css:797:.dayCard.best{
./style.css:810:  grid-template-columns: repeat(3, 1fr);
./style.css:815:  border-radius: 18px;
./style.css:816:  border: 1px solid rgba(255,255,255,.10);
./style.css:860:.dayCard.c1{ border-color: var(--c1b); background: var(--c1bg); }
./style.css:861:.dayCard.c2{ border-color: var(--c2b); background: var(--c2bg); }
./style.css:862:.dayCard.c3{ border-color: var(--c3b); background: var(--c3bg); }
./style.css:863:.dayCard.c4{ border-color: var(--c4b); background: var(--c4bg); }
./style.css:864:.dayCard.c5{ border-color: var(--c5b); background: var(--c5bg); }
./style.css:874:.dayCard.g{ border-color: var(--c4b); background: var(--c4bg); }
./style.css:875:.dayCard.y{ border-color: var(--c2b); background: var(--c2bg); }
./style.css:876:.dayCard.b{ border-color: var(--c3b); background: var(--c3bg); }
./style.css:877:.dayCard.r{ border-color: var(--c5b); background: var(--c5bg); }
./style.css:885:  .daysTri{ grid-template-columns: 1fr; }
./style.css:897:  /* Mobile: language button on its own row (index.html places .headRight below .brandRow) */
./style.css:909:  .logo{ width: 1.25em; height: 1.25em; border-radius: .40em; }
./style.css:923:  grid-template-columns: repeat(3, 1fr);
./style.css:928:  border-radius: 16px;
./style.css:929:  border: 1px solid rgba(255,255,255,.10);
./style.css:971:  overflow: hidden;
./style.css:976:.dayMini.g{ border-color: rgba(43,209,126,.22); background: rgba(43,209,126,.06); }
./style.css:977:.dayMini.y{ border-color: rgba(255,204,102,.22); background: rgba(255,204,102,.05); }
./style.css:978:.dayMini.r{ border-color: rgba(255,91,106,.22); background: rgba(255,91,106,.05); }
./style.css:979:.dayMini.b{ border-color: rgba(91,124,255,.22); background: rgba(91,124,255,.06); }
./style.css:982:  .daysOverview{ grid-template-columns: 1fr; }
./style.css:991:  border-radius: 12px;
./style.css:992:  border: 1px solid rgba(255,255,255,.10);
./style.css:1005:/* hide default marker */
./style.css:1006:.basisFold summary::-webkit-details-marker{ display:none; }
./style.css:1020:.basisFold .basisDetail{
./style.css:1023:  border-top: 1px solid rgba(255,255,255,.08);
./style.css:1040:#t3 .threeSlots{ margin-bottom: 14px; }
./style.css:1070:  border-radius: 999px;
./style.css:1072:  border:1px solid var(--stroke);
./style.css:1078:  width:9px; height:9px; border-radius:50%;
./style.css:1094:.badge.c1{ border-color: var(--c1b); background: rgba(0,0,0,.16); color: var(--c1); }
./style.css:1095:.badge.c2{ border-color: var(--c2b); background: rgba(0,0,0,.16); color: var(--c2); }
./style.css:1096:.badge.c3{ border-color: var(--c3b); background: rgba(0,0,0,.16); color: var(--c3); }
./style.css:1097:.badge.c4{ border-color: var(--c4b); background: rgba(0,0,0,.16); color: var(--c4); }
./style.css:1098:.badge.c5{ border-color: var(--c5b); background: rgba(0,0,0,.16); color: var(--c5); }
./style.css:1101:.badge.g{ border-color: var(--c4b); color: var(--c4); }
./style.css:1102:.badge.y{ border-color: var(--c2b); color: var(--c2); }
./style.css:1103:.badge.b{ border-color: var(--c3b); color: var(--c3); }
./style.css:1104:.badge.r{ border-color: var(--c5b); color: var(--c5); }
./style.css:1113:/* Utility: hide any element (used by CN/EN toggle) */
./style.css:1114:.hidden{ display:none !important; }
./style.css:1117:.modal.hidden{display:none}
./style.css:1121:  z-index: 9000;
./style.css:1136:  border-radius: 18px;
./style.css:1137:  border: 1px solid var(--stroke);
./style.css:1138:  background: linear-gradient(180deg, rgba(12,18,36,.92), rgba(8,12,22,.92));
./style.css:1181:  border: 1px solid rgba(255,255,255,.12);
./style.css:1183:  border-radius: 14px;
./style.css:1214:  border-radius: 12px;
./style.css:1216:  border: 1px solid rgba(255,255,255,.10);
./style.css:1234:.cloudDetail{
./style.css:1244:.threeSlots{
./style.css:1250:.threeSlots .slot{
./style.css:1252:  border-radius: 14px;
./style.css:1253:  border: 1px solid rgba(255,255,255,.10);
./style.css:1257:.threeSlots .slot.best{
./style.css:1265:.threeSlots .slot.c1{ border-color: var(--c1b); background: var(--c1bg); }
./style.css:1266:.threeSlots .slot.c2{ border-color: var(--c2b); background: var(--c2bg); }
./style.css:1267:.threeSlots .slot.c3{ border-color: var(--c3b); background: var(--c3bg); }
./style.css:1268:.threeSlots .slot.c4{ border-color: var(--c4b); background: var(--c4bg); }
./style.css:1269:.threeSlots .slot.c5{ border-color: var(--c5b); background: var(--c5bg); }
./style.css:1272:.threeSlots .badge{
./style.css:1276:  border-color: rgba(255,255,255,.12);
./style.css:1281:.threeSlots .badge{
./style.css:1288:  .grid2{grid-template-columns: 1fr}
./style.css:1289:  .gridCards{grid-template-columns: 1fr}
./style.css:1297:  .threeSlots{ gap: 12px; }
./style.css:1298:  .threeSlots .slot{ padding: 10px 12px; }
./style.css:1303:  /* 移动端 Header：logo + 标题更大，信息更像“工具品牌” */
./style.css:1306:  .logo{ width:56px; height:56px; border-radius:16px; }
./style.css:1314:    overflow: hidden;
./style.css:1336:  z-index: 9999;
./style.css:1342:  border-radius: 18px;
./style.css:1343:  border: 1px solid rgba(255,255,255,.14);
./style.css:1344:  background: linear-gradient(180deg, rgba(20,28,52,.92), rgba(10,14,26,.92));
./style.css:1346:  overflow: hidden;
./style.css:1355:  border-bottom: 1px solid rgba(255,255,255,.08);
./style.css:1367:  border-radius: 12px;
./style.css:1368:  border: 1px solid rgba(255,255,255,.12);
./style.css:1403:  border-radius: 14px;
./style.css:1405:  border: 1px solid rgba(255,255,255,.22);
./style.css:1423:.blockerExplain.c1{ background: rgba(210,210,210,.14); border-color: rgba(210,210,210,.26); }
./style.css:1424:.blockerExplain.c2{ background: rgba(255,204,102,.14); border-color: rgba(255,204,102,.26); }
./style.css:1425:.blockerExplain.c3{ background: rgba(91,124,255,.14);  border-color: rgba(91,124,255,.26); }
./style.css:1426:.blockerExplain.c4{ background: rgba(43,209,126,.14);  border-color: rgba(43,209,126,.26); }
./style.css:1427:.blockerExplain.c5{ background: rgba(255,91,106,.14);  border-color: rgba(255,91,106,.26); }
./style.css:1430:.blockerExplain.s1{ background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.30); }
./style.css:1431:.blockerExplain.s2{ background: rgba(255,255,255,.15); border-color: rgba(255,255,255,.24); }
./style.css:1432:.blockerExplain.s3{ background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.20); }
./style.css:1439:  grid-template-columns: 1fr;
./style.css:1456:.heroTopRow .heroSide{
./style.css:1462:.heroTopRow .heroSide .blockerExplain{
./style.css:1468:.swHeroWide{
./style.css:1477:  .heroTopRow .heroSide{
./style.css:1488:  grid-template-columns: 1fr;
./style.css:1519:  .logo{ width: 1.20em; height: 1.20em; border-radius: .38em; }
./style.css:1538:  /* 顶部按钮已移到 actions，不再需要为 header 的 btnAbout 做布局兜底 */
./style.css:1547:  .actions .btn.ghost{ border-radius: 14px; height: 44px; }
./style.css:1557:  .threeSlots,
./style.css:1558:  .threeSlotGrid,
./style.css:1563:  .threeSlots > .dayCard,
./style.css:1564:  .threeSlotGrid > .dayCard,
./style.css:1569:  .threeSlots > .dayCard:last-child,
./style.css:1570:  .threeSlotGrid > .dayCard:last-child,
./style.css:1576:  #threeSlot0Time,
./style.css:1577:  #threeSlot1Time,
./style.css:1578:  #threeSlot2Time {
./ui.js:26:  function cacheSet(key, value){
./ui.js:44:  // ---------- status note (short, no details) ----------
./ui.js:62:    const mm = String(d.getMinutes()).padStart(2,'0');
./ui.js:67:  function escapeHTML(s){
./ui.js:77:  function deg(rad){ return rad * 180 / Math.PI; }
./ui.js:79:  function getSunAltDeg(date, lat, lon){
./ui.js:83:      return deg(p.altitude);
./ui.js:86:  function getMoonAltDeg(date, lat, lon){
./ui.js:90:      return deg(p.altitude);
./ui.js:96:    const s = getSunAltDeg(date, lat, lon);
./ui.js:98:    // inWindow: the "best" observing window (sun <= -12°)
./ui.js:103:  function moonFactorByLat(lat, moonAltDeg){
./ui.js:104:    if(moonAltDeg <= 0) return 1.0;
./ui.js:108:    if(moonAltDeg > 35) tier = 2;
./ui.js:109:    else if(moonAltDeg > 15) tier = 1;
./ui.js:124:    const tabs = Array.from(document.querySelectorAll(".tab"));
./ui.js:125:    const panes = Array.from(document.querySelectorAll(".pane"));
./ui.js:126:    if(!tabs.length || !panes.length) return;
./ui.js:130:      panes.forEach(p => p.classList.toggle("active", p.id === tabId));
./ui.js:134:      b.addEventListener("click", () => activate(b.dataset.tab));
./ui.js:146:      modal.classList.remove("hidden");
./ui.js:147:      modal.setAttribute("aria-hidden", "false");
./ui.js:150:    const hide = () => {
./ui.js:151:      modal.classList.add("hidden");
./ui.js:152:      modal.setAttribute("aria-hidden", "true");
./ui.js:156:    btn.addEventListener("click", open);
./ui.js:157:    close?.addEventListener("click", hide);
./ui.js:159:    modal.addEventListener("click", (e) => {
./ui.js:161:      if(t && t.getAttribute && t.getAttribute("data-close") === "1") hide();
./ui.js:164:    document.addEventListener("keydown", (e) => {
./ui.js:165:      if(e.key === "Escape") hide();
./ui.js:178:    overlay.classList.remove("hidden");
./ui.js:179:    overlay.setAttribute("aria-hidden", "false");
./ui.js:181:    const hide = () => {
./ui.js:182:      overlay.classList.add("hidden");
./ui.js:183:      overlay.setAttribute("aria-hidden", "true");
./ui.js:185:    btnX?.addEventListener("click", hide, { once:true });
./ui.js:186:    btnOk?.addEventListener("click", hide, { once:true });
./ui.js:191:  function renderChart(labels, vals, cols){
./ui.js:200:      try{ _chart.destroy(); }catch(e){}
./ui.js:211:          borderWidth: 0,
./ui.js:215:        responsive: true,
./ui.js:218:        scales: {
./ui.js:222:              // Make time labels more visible (important for decision-making)
./ui.js:247:    const safe = escapeHTML(text);
./ui.js:253:    const url = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json";
./ui.js:259:      cacheSet("cache_kp", j);
./ui.js:272:    const url = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json";
./ui.js:278:      cacheSet("cache_ovation", j);
./ui.js:290:    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&hourly=cloudcover_low,cloudcover_mid,cloudcover_high&forecast_days=3&timezone=auto`;
./ui.js:297:      cacheSet(k, { lat, lon, j });
./ui.js:318:    cacheSet,
./ui.js:325:    escapeHTML,
./ui.js:327:    // chart / badges
./ui.js:328:    renderChart,
./ui.js:332:    getSunAltDeg,
./ui.js:333:    getMoonAltDeg,
./noaa/plasma.json:1:{"fetchedAt": "2026-01-06T23:55:06.996057Z", "noaa": [["time_tag", "density", "speed", "temperature"], ["2026-01-06 21:56:00.000", "2.67", null, null], ["2026-01-06 21:57:00.000", "2.67", "342.6", "24251"], ["2026-01-06 22:28:00.000", "2.89", null, null], ["2026-01-06 22:29:00.000", "2.89", "342.0", "25868"], ["2026-01-06 22:30:00.000", "2.89", null, null], ["2026-01-06 22:33:00.000", "2.55", "339.9", "30739"], ["2026-01-06 22:34:00.000", "2.55", "339.9", "30739"], ["2026-01-06 22:37:00.000", "2.46", "340.4", "33545"], ["2026-01-06 22:38:00.000", "2.46", "340.4", "33545"], ["2026-01-06 22:40:00.000", "2.45", "339.2", "35737"], ["2026-01-06 22:41:00.000", "2.45", "339.2", "35737"], ["2026-01-06 22:44:00.000", "24.29", null, null], ["2026-01-06 22:45:00.000", "24.29", "343.7", "74767"], ["2026-01-06 22:46:00.000", "24.29", null, null], ["2026-01-06 22:49:00.000", "2.45", "328.1", "40173"], ["2026-01-06 22:50:00.000", "2.45", "328.1", "40173"], ["2026-01-06 22:53:00.000", "2.40", "330.4", "35297"], ["2026-01-06 22:54:00.000", "2.40", "330.4", "35297"], ["2026-01-06 22:56:00.000", "2.37", "331.6", "41844"], ["2026-01-06 22:57:00.000", "2.37", "331.6", "41844"], ["2026-01-06 23:00:00.000", "2.07", null, null], ["2026-01-06 23:01:00.000", "2.07", "334.7", "44002"], ["2026-01-06 23:02:00.000", "2.07", null, null], ["2026-01-06 23:05:00.000", "2.44", "339.6", "31462"], ["2026-01-06 23:06:00.000", "2.44", "339.6", "31462"], ["2026-01-06 23:09:00.000", "2.27", "335.8", "21322"], ["2026-01-06 23:10:00.000", "2.27", "335.8", "21322"], ["2026-01-06 23:12:00.000", "2.48", "331.0", "38592"], ["2026-01-06 23:13:00.000", "2.48", "331.0", "38592"], ["2026-01-06 23:21:00.000", "2.63", "337.8", "39888"], ["2026-01-06 23:22:00.000", "2.63", "337.8", "39888"], ["2026-01-06 23:25:00.000", "4.41", "358.9", "31213"], ["2026-01-06 23:26:00.000", "4.41", "358.9", "31213"], ["2026-01-06 23:32:00.000", "3.32", null, null], ["2026-01-06 23:33:00.000", "3.32", "339.0", "25066"], ["2026-01-06 23:34:00.000", "3.32", null, null], ["2026-01-06 23:37:00.000", "3.61", "339.0", "27043"], ["2026-01-06 23:38:00.000", "3.61", "339.0", "27043"], ["2026-01-06 23:41:00.000", "2.31", "339.4", "30607"], ["2026-01-06 23:42:00.000", "2.31", "339.4", "30607"], ["2026-01-06 23:44:00.000", "3.50", "348.0", "25926"], ["2026-01-06 23:45:00.000", "3.50", "348.0", "25926"], ["2026-01-06 23:48:00.000", "3.78", null, null], ["2026-01-06 23:49:00.000", "3.78", "347.7", "25247"]]}
./adapter.js:2:// Data Adapter (frozen protocol v1)
./adapter.js:4:const BASE_PATH = window.location.pathname.includes("/aurora-capture/")
./adapter.js:17:function ageMinutesFromFetchedAt(fetchedAtIso) {
./adapter.js:23:function statusFromAgeMin(ageMin) {
./adapter.js:25:  if (ageMin <= 180) return "DEGRADED";
./adapter.js:29:function toIsoUtcFromNoaaTimeTag(timeTag) {
./adapter.js:35:  if (s.endsWith("Z") || s.includes("+") || s.includes("-") && s.includes("T") && s.lastIndexOf("-") > s.indexOf("T")) {
./adapter.js:43:function pickLatestRowFromNoaaTable(noaaTable) {
./adapter.js:44:  // Expect: [ [header...], [row...], [row...] ... ]
./adapter.js:46:  const header = noaaTable[0];
./adapter.js:48:  if (!Array.isArray(header) || !Array.isArray(last)) return null;
./adapter.js:51:  for (let i = 0; i < header.length; i++) {
./adapter.js:52:    map[String(header[i])] = last[i];
./adapter.js:58:  if (v === null || v === undefined) return null;
./adapter.js:69:// The ONLY realtime input for model/UI after refactor:
./adapter.js:70:async function getRealtimeState() {
./adapter.js:79:  const agePlasma = fetchedAtPlasma ? ageMinutesFromFetchedAt(fetchedAtPlasma) : Infinity;
./adapter.js:80:  const ageMag = fetchedAtMag ? ageMinutesFromFetchedAt(fetchedAtMag) : Infinity;
./adapter.js:82:  const solarWindRow = pickLatestRowFromNoaaTable(plasmaWrap?.noaa);
./adapter.js:83:  const imfRow = pickLatestRowFromNoaaTable(magWrap?.noaa);
./adapter.js:87:  const densityRaw = toNumberOrNull(solarWindRow?.density);
./adapter.js:88:  // density 可能是 0.x，绝不能用 truthy 判断
./adapter.js:89:  const density = Number.isFinite(densityRaw) ? densityRaw : null;
./adapter.js:91:  const plasmaTs = toIsoUtcFromNoaaTimeTag(solarWindRow?.time_tag);
./adapter.js:94:  const bz = toNumberOrNull(imfRow?.bz_gsm);
./adapter.js:95:  const by = toNumberOrNull(imfRow?.by_gsm);
./adapter.js:96:  const bx = toNumberOrNull(imfRow?.bx_gsm);
./adapter.js:97:  const bt = toNumberOrNull(imfRow?.bt);
./adapter.js:98:  const magTs = toIsoUtcFromNoaaTimeTag(imfRow?.time_tag);
./adapter.js:103:    status: statusFromAgeMin(agePlasma),
./adapter.js:105:    density_cm3: density,
./adapter.js:115:    status: statusFromAgeMin(ageMag),
./adapter.js:125:  // combined status: INVALID > DEGRADED > OK
./adapter.js:126:  const order = { OK: 0, DEGRADED: 1, INVALID: 2 };
./adapter.js:127:  const combinedStatus = order[solarWind.status] >= order[imf.status] ? solarWind.status : imf.status;
./adapter.js:137:window.getRealtimeState = getRealtimeState;
./AGENTS.md:1:# Project Agent Rules (Aurora Capture)
./AGENTS.md:4:All agents (including Codex) must follow these rules strictly.
./AGENTS.md:8:## 0. Absolute Priority (Hard Rules)
./AGENTS.md:9:- ❌ Do NOT modify `main` branch unless the user explicitly says so
./AGENTS.md:10:- ❌ Do NOT `commit` or `push` unless the user explicitly confirms
./AGENTS.md:11:- ❌ Do NOT modify files outside the approved list
./AGENTS.md:12:- ❌ Do NOT perform refactors unless explicitly requested
./AGENTS.md:18:## 1. Branch & Deployment Rules (Very Important)
./AGENTS.md:20:- `staging` branch = testing / preview
./AGENTS.md:21:- **All changes must land in `staging` first**
./AGENTS.md:22:- `staging` auto-deploys to aurora-capture-staging (GitHub Pages)
./AGENTS.md:23:- `staging` must NOT introduce business-logic divergence from `main`
./AGENTS.md:24:  - Only UI / testing / instrumentation differences are allowed
./AGENTS.md:29:For **every non-trivial change** (any code, logic, infra, or behavior change),
./AGENTS.md:33:- Changes are **NOT considered reviewable** without `REVIEW.md`
./AGENTS.md:40:- 一旦该轮 commit+push 完成：下一轮改动必须**重新改写/覆盖** REVIEW.md（仍使用同一固定模板），不允许把上一次的 `Planned` / `Open questions` / 旧变更继续保留或追加。
./AGENTS.md:41:- 例外：如果 REVIEW.md 中存在“长期规范/词典/约束”（例如 FIXED_I18N_MAP canonical terms 这类不随版本变化的规范段落），允许保留，但必须明确标注为 `## Reference (Long-lived)` 并与本次变更摘要区块分隔。
./AGENTS.md:48:- Bullet list of concrete changes (3–7 lines max)
./AGENTS.md:50:## Files touched
./AGENTS.md:52:- Added:
./AGENTS.md:53:- Deleted:
./AGENTS.md:59:## Risk assessment
./AGENTS.md:60:- Possible failure modes
./AGENTS.md:62:- Deployment or environment risks
./AGENTS.md:64:## How to test
./AGENTS.md:65:1. Step-by-step manual test instructions
./AGENTS.md:66:2. Expected results
./AGENTS.md:71:## Open questions / follow-ups
./AGENTS.md:72:- Anything uncertain, deferred, or intentionally skipped
./AGENTS.md:78:Before writing **any code**, the agent must:
./AGENTS.md:79:1. Summarize understanding of the task
./AGENTS.md:80:2. List **exact files** to be modified or created
./AGENTS.md:81:3. Explicitly state whether business logic is affected
./AGENTS.md:86:## 4. Code Modification Rules
./AGENTS.md:88:- ❌ Do NOT insert scattered lines
./AGENTS.md:89:- ❌ Do NOT do “cleanup”, “formatting”, or “small improvements” unless asked
./AGENTS.md:90:- ❌ Do NOT rename files / variables / functions unless requested
./AGENTS.md:94:## 4.1 Large File Protocol (Mandatory for files > 800 lines)
./AGENTS.md:98:- The agent must prioritize minimal IO and minimal output over completeness.
./AGENTS.md:99:- The agent must NOT re-read large files unless explicitly instructed.
./AGENTS.md:100:- The agent must switch to "low-output mode" automatically.
./AGENTS.md:106:  - Function names (e.g. `bootstrap()`)
./AGENTS.md:108:  - Clearly identifiable IDs or selectors
./AGENTS.md:109:- Modifications are restricted to **within ~30–80 lines around the anchor**.
./AGENTS.md:110:- If an anchor cannot be confidently located:
./AGENTS.md:112:  - Report: `anchor not found` + the closest matching symbol
./AGENTS.md:113:  - Do NOT guess or refactor.
./AGENTS.md:114:- Re-reading the same large file multiple times due to reconnect is explicitly forbidden.
./AGENTS.md:117:- All changes MUST be made relative to **explicit anchors**, such as:
./AGENTS.md:118:  - Function names (e.g. `bootstrap()`)
./AGENTS.md:120:  - Clearly identifiable IDs or selectors
./AGENTS.md:121:- Modifications are restricted to **within ~30–80 lines around the anchor**.
./AGENTS.md:122:- If an anchor cannot be confidently located:
./AGENTS.md:124:  - Report: `anchor not found` + the closest matching symbol
./AGENTS.md:125:  - Do NOT guess or refactor.
./AGENTS.md:129:- Multi-anchor changes MUST be split into multiple steps.
./AGENTS.md:133:### D. Output Restrictions (Anti-Disconnect)
./AGENTS.md:134:- Default to "low-output mode" once reconnecting or stream interruption is detected.
./AGENTS.md:135:- Allowed outputs in low-output mode:
./AGENTS.md:136:  1. Anchor-local diffs only (±20 lines)
./AGENTS.md:137:  2. Short bullet summaries (max 5 bullets)
./AGENTS.md:139:- Explicitly forbidden in low-output mode:
./AGENTS.md:140:  - Full files
./AGENTS.md:143:  - Re-reading or summarizing large files
./AGENTS.md:145:### E. Review-by-Evidence (No Global Self-Verification)
./AGENTS.md:146:- For large files, **evidence-based review** replaces full consistency scans.
./AGENTS.md:147:- Evidence consists of:
./AGENTS.md:154:- For large files:
./AGENTS.md:155:  - ❌ The agent must NOT commit or push by default.
./AGENTS.md:156:  - The agent provides diffs or patch instructions only.
./AGENTS.md:157:  - Commit / push is performed by the human unless explicitly approved.
./AGENTS.md:163:- Only modify files explicitly approved by the user
./AGENTS.md:166:  - Wait for user decision
./AGENTS.md:171:## 6. Language & Style
./AGENTS.md:172:- User instructions may be in Chinese
./AGENTS.md:173:- Code, APIs, comments, and identifiers must be in English
./AGENTS.md:179:- 当前版本号仅存在于 **index.html** 中，用于：
./AGENTS.md:185:- 每次 push 时，将 **index.html 中现有的版本号 `0319` 全部统一 +1**（例如 `0319 → 0320`）。
./AGENTS.md:186:- 仅允许修改 **index.html 内已存在的版本号位置**（预计约 8 处）。
./AGENTS.md:193:- 若越权修改 index.html 以外的文件中的“版本号”，同样视为 **违规**
./AGENTS.md:254:Anything outside this flow is invalid.
./tools/build_aacgmv2_mlat_grid.py:2:from datetime import datetime, timezone
./tools/build_aacgmv2_mlat_grid.py:14:def clamp_i16(x: int) -> int:
./tools/build_aacgmv2_mlat_grid.py:23:    # AACGMv2 can be undefined (NaN) near the equator / low latitudes.
./tools/build_aacgmv2_mlat_grid.py:32:bin_path = "data/aacgmv2_mlat_1deg_110km_2026-01-01_i16.bin"
./tools/build_aacgmv2_mlat_grid.py:33:meta_path = "data/aacgmv2_mlat_1deg_110km_2026-01-01_meta.json"
./tools/build_aacgmv2_mlat_grid.py:49:  "indexing": "idx = (lat+90)*360 + ((lon+180)%360), lon uses floor to 1deg bin",
./tools/build_aacgmv2_mlat_grid.py:53:  json.dump(meta, f, ensure_ascii=False, indent=2)
./tools/build_aacgmv2_mlat_grid.py:57:print("size bytes:", os.path.getsize(bin_path))
./noaa/latest.json:1:{"fetchedAt": "2026-01-06T23:55:06.996057Z", "noaa": [["time_tag", "density", "speed", "temperature"], ["2026-01-06 21:56:00.000", "2.67", null, null], ["2026-01-06 21:57:00.000", "2.67", "342.6", "24251"], ["2026-01-06 22:28:00.000", "2.89", null, null], ["2026-01-06 22:29:00.000", "2.89", "342.0", "25868"], ["2026-01-06 22:30:00.000", "2.89", null, null], ["2026-01-06 22:33:00.000", "2.55", "339.9", "30739"], ["2026-01-06 22:34:00.000", "2.55", "339.9", "30739"], ["2026-01-06 22:37:00.000", "2.46", "340.4", "33545"], ["2026-01-06 22:38:00.000", "2.46", "340.4", "33545"], ["2026-01-06 22:40:00.000", "2.45", "339.2", "35737"], ["2026-01-06 22:41:00.000", "2.45", "339.2", "35737"], ["2026-01-06 22:44:00.000", "24.29", null, null], ["2026-01-06 22:45:00.000", "24.29", "343.7", "74767"], ["2026-01-06 22:46:00.000", "24.29", null, null], ["2026-01-06 22:49:00.000", "2.45", "328.1", "40173"], ["2026-01-06 22:50:00.000", "2.45", "328.1", "40173"], ["2026-01-06 22:53:00.000", "2.40", "330.4", "35297"], ["2026-01-06 22:54:00.000", "2.40", "330.4", "35297"], ["2026-01-06 22:56:00.000", "2.37", "331.6", "41844"], ["2026-01-06 22:57:00.000", "2.37", "331.6", "41844"], ["2026-01-06 23:00:00.000", "2.07", null, null], ["2026-01-06 23:01:00.000", "2.07", "334.7", "44002"], ["2026-01-06 23:02:00.000", "2.07", null, null], ["2026-01-06 23:05:00.000", "2.44", "339.6", "31462"], ["2026-01-06 23:06:00.000", "2.44", "339.6", "31462"], ["2026-01-06 23:09:00.000", "2.27", "335.8", "21322"], ["2026-01-06 23:10:00.000", "2.27", "335.8", "21322"], ["2026-01-06 23:12:00.000", "2.48", "331.0", "38592"], ["2026-01-06 23:13:00.000", "2.48", "331.0", "38592"], ["2026-01-06 23:21:00.000", "2.63", "337.8", "39888"], ["2026-01-06 23:22:00.000", "2.63", "337.8", "39888"], ["2026-01-06 23:25:00.000", "4.41", "358.9", "31213"], ["2026-01-06 23:26:00.000", "4.41", "358.9", "31213"], ["2026-01-06 23:32:00.000", "3.32", null, null], ["2026-01-06 23:33:00.000", "3.32", "339.0", "25066"], ["2026-01-06 23:34:00.000", "3.32", null, null], ["2026-01-06 23:37:00.000", "3.61", "339.0", "27043"], ["2026-01-06 23:38:00.000", "3.61", "339.0", "27043"], ["2026-01-06 23:41:00.000", "2.31", "339.4", "30607"], ["2026-01-06 23:42:00.000", "2.31", "339.4", "30607"], ["2026-01-06 23:44:00.000", "3.50", "348.0", "25926"], ["2026-01-06 23:45:00.000", "3.50", "348.0", "25926"], ["2026-01-06 23:48:00.000", "3.78", null, null], ["2026-01-06 23:49:00.000", "3.78", "347.7", "25247"]]}
./.github/workflows/noaa-mirror.yml:14:  cancel-in-progress: true
./.github/workflows/noaa-mirror.yml:18:    runs-on: ubuntu-latest
./.github/workflows/noaa-mirror.yml:20:      # 1️⃣ checkout（拉完整历史，后面要 rebase）
./.github/workflows/noaa-mirror.yml:21:      - name: Checkout repo
./.github/workflows/noaa-mirror.yml:22:        uses: actions/checkout@v4
./.github/workflows/noaa-mirror.yml:24:          fetch-depth: 0
./.github/workflows/noaa-mirror.yml:30:          git reset --hard origin/main
./.github/workflows/noaa-mirror.yml:56:          def wrap(raw_path, out_path):
./.github/workflows/noaa-mirror.yml:76:          wrap("noaa/plasma.raw.json", "noaa/latest.json")
./.github/workflows/noaa-mirror.yml:87:          git add noaa/plasma.json noaa/mag.json noaa/latest.json
./.github/workflows/noaa-mirror.yml:90:            echo "No changes."
./.github/workflows/deploy-staging.yml:1:name: Deploy Staging
./.github/workflows/deploy-staging.yml:5:    branches:
./.github/workflows/deploy-staging.yml:12:  deploy:
./.github/workflows/deploy-staging.yml:13:    runs-on: ubuntu-latest
./.github/workflows/deploy-staging.yml:15:      - name: Checkout
./.github/workflows/deploy-staging.yml:16:        uses: actions/checkout@v4
./.github/workflows/deploy-staging.yml:18:      - name: Verify index.html exists
./.github/workflows/deploy-staging.yml:19:        run: test -f index.html
./.github/workflows/deploy-staging.yml:21:      - name: Deploy to staging repo (gh-pages)
./.github/workflows/deploy-staging.yml:22:        uses: peaceiris/actions-gh-pages@v4
./.github/workflows/deploy-staging.yml:24:          personal_token: ${{ secrets.STAGING_DEPLOY_PAT }}
./.github/workflows/deploy-staging.yml:26:          publish_branch: gh-pages
./config.public.js:4:  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_pOCJMKJhQkQJrhwHukIxjA_YajKXuj2"
./config.example.js:1:// Copy this file to config.js (gitignored) for local overrides.
./config.example.js:2:// Public config is served from config.public.js.
./aacgm-mlat-service/start.sh.rtf:4:{\*\expandedcolortbl;;\cssrgb\c6700\c6700\c6700;}
./aacgm-mlat-service/app.py.rtf:4:{\*\expandedcolortbl;;}
./aacgm-mlat-service/app.py.rtf:8:\f0\fs24 \cf0 from fastapi import FastAPI, HTTPException\
./aacgm-mlat-service/app.py.rtf:9:from pydantic import BaseModel, Field\
./aacgm-mlat-service/app.py.rtf:10:from datetime import datetime, timezone\
./aacgm-mlat-service/app.py.rtf:15:class Req(BaseModel):\
./aacgm-mlat-service/app.py.rtf:22:def mlat(req: Req):\
./aacgm-mlat-service/app.py.rtf:25:        dtime = datetime.fromisoformat(t)\
./aacgm-mlat-service/app.py.rtf:31:            req.lat, req.lon, req.alt_km, dtime, method_code="G2A"\
./aacgm-mlat-service/app.py.rtf:35:        raise HTTPException(status_code=400, detail=f"convert failed: \{e\}")}
./aacgm-mlat-service/requirements.txt.rtf:4:{\*\expandedcolortbl;;}
```

### C. 文本源/写回风险相关
```
./app.js:33:    el.textContent = (t == null ? "" : String(t));
./app.js:41:    el.innerHTML = (h == null ? "" : String(h));
./app.js:57:    <span class="swAuxItem"><span data-i18n="云量">云量</span> L/M/H —/—/—%</span>
./app.js:58:    <span class="swAuxItem"><span data-i18n="月角">月角</span> —°</span>
./app.js:79:      el.setAttribute("data-i18n", enText);
./app.js:81:      el.removeAttribute("data-i18n");
./app.js:84:      el.setAttribute("data-zh", zhText);
./app.js:86:      el.removeAttribute("data-zh");
./app.js:91:      el.textContent = zhText || "";
./app.js:94:      el.textContent = enText || zhText || "";
./app.js:97:      const zh = el.getAttribute("data-zh");
./app.js:99:        el.textContent = zh;
./app.js:139:      return `<span data-i18n="太阳风">太阳风</span>${esc(rest)}`;
./app.js:143:      return `<span data-i18n="云量">云量</span>${esc(rest)}`;
./app.js:146:    return `<span data-i18n="${rawEsc}">${rawEsc}</span>`;
./app.js:149:  wrap.innerHTML = arr.map(it => {
./app.js:164:  try{ localStorage.setItem(String(k), JSON.stringify(v)); }catch(_){ /* ignore */ }
./app.js:172:    const raw = localStorage.getItem(String(k));
./app.js:303:  return `<span data-status-key="${keyEsc}" data-i18n="${textEsc}" data-zh="${escapeHTML(textZh || "")}"${attrs}>${initialEsc}</span>`;
./app.js:328:       if(body) body.innerHTML = html;
./app.js:355:      const raw = localStorage.getItem(String(key));
./app.js:362:    try{ localStorage.setItem(String(key), JSON.stringify(value)); }catch(_){ /* ignore */ }
./app.js:365:    try{ localStorage.removeItem(String(key)); }catch(_){ /* ignore */ }
./app.js:479:    const i18n = btnGeo.getAttribute("data-i18n");
./app.js:484:    btnGeo.setAttribute("data-i18n", label);
./app.js:485:    btnGeo.textContent = label;
./app.js:489:    const i18n = btnFav.getAttribute("data-i18n");
./app.js:494:    btnFav.setAttribute("data-i18n", label);
./app.js:495:    btnFav.textContent = label;
./app.js:499:    const i18n = btnRun.getAttribute("data-i18n");
./app.js:504:    btnRun.setAttribute("data-i18n", label);
./app.js:505:    btnRun.textContent = label;
./app.js:531:    el.textContent = "";
./app.js:532:    el.removeAttribute("data-i18n");
./app.js:535:  el.setAttribute("data-i18n", msg);
./app.js:536:  el.textContent = msg;
./app.js:619:    coordsEl.textContent = `${formatCoord(lat, 5)}, ${formatCoord(lon, 5)}`;
./app.js:653:  listEl.innerHTML = "";
./app.js:668:    main.textContent = item.name || "—";
./app.js:672:    sub.textContent = `${formatCoord(item.lat, 2)}, ${formatCoord(item.lon, 2)}`;
./app.js:680:    renameBtn.textContent = "重命名";
./app.js:681:    renameBtn.setAttribute("data-i18n", "重命名");
./app.js:686:    delBtn.textContent = "删除";
./app.js:687:    delBtn.setAttribute("data-i18n", "删除");
./app.js:753:         title.setAttribute("data-i18n", titleText);
./app.js:754:         title.textContent = titleText;
./app.js:757:         note.setAttribute("data-i18n", noteText);
./app.js:758:         note.textContent = noteText;
./app.js:771:       `<span data-i18n="当前位置磁纬约">当前位置磁纬约</span> <b>${absM.toFixed(1)}°</b>` +
./app.js:772:       `<span data-i18n="（|MLAT|，近似值）。">（|MLAT|，近似值）。</span><br>` +
./app.js:773:       `<span data-i18n="当">当</span> <b>|MLAT| &lt; ${MLAT_STRONG_WARN}°</b> ` +
./app.js:774:       `<span data-i18n="时，极光可见性高度依赖">时，极光可见性高度依赖</span>` +
./app.js:775:       `<strong><span data-i18n="极端磁暴">极端磁暴</span></strong>` +
./app.js:776:       `<span data-i18n="与">与</span>` +
./app.js:777:       `<strong><span data-i18n="北向开阔地平线">北向开阔地平线</span></strong>` +
./app.js:778:       `<span data-i18n="，不适合“常规出门拍”的决策。">，不适合“常规出门拍”的决策。</span><br>` +
./app.js:779:       `<span data-i18n="建议：尽量提高磁纬（靠近/进入极光椭圆边缘）再使用本工具。">建议：尽量提高磁纬（靠近/进入极光椭圆边缘）再使用本工具。</span>`
./app.js:788:         `<span data-i18n="当前位置磁纬约">当前位置磁纬约</span> <b>${absM.toFixed(1)}°</b>` +
./app.js:789:         `<span data-i18n="（|MLAT|，近似值）。">（|MLAT|，近似值）。</span><br>` +
./app.js:790:         `<span data-i18n="当">当</span> <b>|MLAT| &lt; ${MLAT_HARD_STOP}°</b> ` +
./app.js:791:         `<span data-i18n="时，极光几乎不可能到达你的可见范围。">时，极光几乎不可能到达你的可见范围。</span><br>` +
./app.js:792:         `<span data-i18n="这是硬性地理限制：无论 Kp / Bz / 速度如何，都不建议投入等待与拍摄。">这是硬性地理限制：无论 Kp / Bz / 速度如何，都不建议投入等待与拍摄。</span>`
./app.js:1100:    const i18n = btn.getAttribute("data-i18n");
./app.js:1101:    btn.dataset.labelOriginal = i18n || btn.textContent || "📍获取位置";
./app.js:1109:  btn.textContent = "已获取 ✓";
./app.js:1110:  btn.setAttribute("data-i18n", "已获取 ✓");
./app.js:1117:    btn.textContent = btn.dataset.labelOriginal || "📍获取位置";
./app.js:1118:    btn.setAttribute("data-i18n", btn.dataset.labelOriginalI18n || btn.dataset.labelOriginal || "📍获取位置");
./app.js:1132:        `<span data-i18n="当前浏览器不支持定位功能。">当前浏览器不支持定位功能。</span><br><br>` +
./app.js:1133:          `<span data-i18n="你可以手动输入经纬度。">你可以手动输入经纬度。</span>`,
./app.js:1153:              `<span data-i18n="定位返回的经纬度无效，请重试或手动输入。">定位返回的经纬度无效，请重试或手动输入。</span>`,
./app.js:1173:            `<span data-i18n="定位成功返回，但处理坐标时发生异常。请重试或手动输入。">定位成功返回，但处理坐标时发生异常。请重试或手动输入。</span>`,
./app.js:1189:          `<span data-i18n="${reason}">${reason}</span>`,
./app.js:1204:      `<span data-i18n="获取定位时发生异常，请重试或手动输入。">获取定位时发生异常，请重试或手动输入。</span>`,
./app.js:1603:          `<span data-i18n="请输入数字格式的纬度/经度。">请输入数字格式的纬度/经度。</span><br>` +
./app.js:1604:            `<span data-i18n="纬度范围：">纬度范围：</span><b>-90° ～ +90°</b>` +
./app.js:1605:            `<span data-i18n="；经度范围：">；经度范围：</span><b>-180° ～ +180°</b>` +
./app.js:1606:            `<span data-i18n="。">。</span>`,
./app.js:1617:          `<span data-i18n="你输入的是：">你输入的是：</span><b>Latitude ${lat}</b>，<b>Longitude ${lon}</b>。<br>` +
./app.js:1618:            `<span data-i18n="允许范围：">允许范围：</span><br>` +
./app.js:1619:            `<span data-i18n="纬度（Latitude）：">纬度（Latitude）：</span><b>-90° ～ +90°</b><br>` +
./app.js:1620:            `<span data-i18n="经度（Longitude）：">经度（Longitude）：</span><b>-180° ～ +180°</b>` ,
./app.js:1668:        safeHTML($("oneHeroMeta"), `<span data-i18n="${heroMetaEsc}">${heroMetaEsc}</span>`);
./app.js:1672:            `<span data-i18n="主要影响因素：">主要影响因素：</span>` +
./app.js:1673:            `<span data-i18n="磁纬过低，已停止生成">磁纬过低，已停止生成</span>` +
./app.js:1686:        safeHTML($("threeBurst"), `<span data-i18n="磁纬过低，已停止生成">磁纬过低，已停止生成</span>`);
./app.js:1803:      const maybePlusWrap = (innerHtml, allow) => {
./app.js:1804:        if(!(trendPlus?.on && allow)) return innerHtml;
./app.js:1805:        return `<span style="position:relative; display:inline-block; padding-right:10px;">${innerHtml}${plusBadgeInline()}</span>`;
./app.js:1919:        `<span class="swAuxItem"><span data-i18n="云量">云量</span> ${escapeHTML(cloudLine)}</span>`
./app.js:1924:        `<span class="swAuxItem"><span data-i18n="月角">月角</span> ${escapeHTML(moonLine)}</span>`
./app.js:1944:        `<span data-i18n="更新时间">更新时间</span>：${escapeHTML(tsText)} ・ ` +
./app.js:1945:          `<span data-i18n="新鲜度">新鲜度</span>：mag ${escapeHTML(String(magAge))}m / plasma ${escapeHTML(String(plasmaAge))}m` +
./app.js:1963:          <div><span data-i18n="NOAA 数据口径变动或部分数据缺失：">NOAA 数据口径变动或部分数据缺失：</span><b>${escapeHTML(missCN)}</b></div>
./app.js:1964:          <div class="mutedLine"><span data-i18n="当前预测可信度较低，建议谨慎参考。">当前预测可信度较低，建议谨慎参考。</span></div>
./app.js:2055:        : `<span style="color:${cColor(heroScore)} !important;" data-i18n="—">—</span>`;
./app.js:2122:                <span data-i18n="主要影响因素：">主要影响因素：</span>
./app.js:2123:                <span data-i18n="${primaryEsc}">${primaryEsc}</span>
./app.js:2132:      safeHTML($("oneHeroMeta"), `<span data-i18n="${heroMetaEsc}">${heroMetaEsc}</span>`);
./app.js:2153:      safeHTML($("threeDeliver"), `<span data-i18n="${deliverEsc}">${deliverEsc}</span>`);
./app.js:2154:      safeHTML($("threeDeliverMeta"), `<span data-i18n="${deliverMetaEsc}">${deliverMetaEsc}</span>`);
./app.js:2281:      const burstStateHTML = burstStateKey ? statusSpanHTML(burstStateKey) : `<span data-i18n="—">—</span>`;
./app.js:2285:      safeHTML($("threeBurst"), `<span data-i18n="${burstHintEsc}">${burstHintEsc}</span>`);
./app.js:2304:        safeHTML($("threeSlot" + i + "Conclusion"), lab?.key ? statusSpanHTML(String(lab.key)) : `<span data-i18n="—">—</span>`);
./app.js:2305:        safeHTML($("threeSlot" + i + "Note"), `<span data-i18n="${noteEsc}">${noteEsc}</span>`);
./app.js:2313:          ? `<span data-i18n="主要影响因素：">主要影响因素：</span><span data-i18n="${reasonEsc}">${reasonEsc}</span>`
./app.js:2396:          ? `<span data-i18n="云量更佳点：">云量更佳点：</span>${escapeHTML(String(cloudWin.hh))}:00` +
./app.js:2397:            `<span data-i18n="（L/M/H≈">（L/M/H≈</span>` +
./app.js:2399:            `<span data-i18n="）">）</span>`
./app.js:2400:          : `<span data-i18n="云量更佳点：">云量更佳点：</span>—`;
./app.js:2404:            `<span data-i18n="能量背景：">能量背景：</span>` +
./app.js:2405:            `<span data-i18n="Kp峰值≈">Kp峰值≈</span>${escapeHTML(kpValue)}` +
./app.js:2408:            `<span data-i18n="送达模型：">送达模型：</span>${escapeHTML(String(del.count))}/3` +
./app.js:2409:            `<span data-i18n="（Bt/速度/密度）">（Bt/速度/密度）</span>` +
./app.js:2412:            `<span data-i18n="触发模型：">触发模型：</span>` +
./app.js:2413:            `<span data-i18n="高速风">高速风</span>${escapeHTML(String(p1a))}/1` +
./app.js:2414:            `<span data-i18n=" · 能量输入"> · 能量输入</span>${escapeHTML(String(p1b))}/1` +
./app.js:2417:            `<span data-i18n="夜晚占比：">夜晚占比：</span>${escapeHTML(String(nightPercent))}%` +
./app.js:2424:        safeHTML($("day"+i+"Conclusion"), lab?.key ? statusSpanHTML(String(lab.key)) : `<span data-i18n="—">—</span>`);
./app.js:2425:        safeHTML($("day"+i+"Note"), `<span data-i18n="${escapeHTML(String(actionNote72h(score5)))}">${escapeHTML(String(actionNote72h(score5)))}</span>`);
./app.js:2499:        if(listEl) listEl.innerHTML = "";
./app.js:2502:          if(listEl) listEl.innerHTML = "";
./app.js:2515:            main.textContent = item.name || `${formatCoord(item.lat, 2)}, ${formatCoord(item.lon, 2)}`;
./app.js:2519:            sub.textContent = `${formatCoord(item.lat, 2)}, ${formatCoord(item.lon, 2)}`;
./app.js:2527:            renameBtn.textContent = "重命名";
./app.js:2528:            renameBtn.setAttribute("data-i18n", "重命名");
./app.js:2533:            delBtn.textContent = "删除";
./app.js:2534:            delBtn.setAttribute("data-i18n", "删除");
./app.js:2661:      if(listEl) listEl.innerHTML = "";
./app.js:2701:        if(listEl) listEl.innerHTML = "";
./app.js:2716:          main.textContent = item.name || `${formatCoord(item.lat, 2)}, ${formatCoord(item.lon, 2)}`;
./app.js:2720:          sub.textContent = `${formatCoord(item.lat, 2)}, ${formatCoord(item.lon, 2)}`;
./app.js:2728:          renameBtn.textContent = "重命名";
./app.js:2729:          renameBtn.setAttribute("data-i18n", "重命名");
./app.js:2734:          delBtn.textContent = "删除";
./app.js:2735:          delBtn.setAttribute("data-i18n", "删除");
./app.js:2869:        if(listEl) listEl.innerHTML = "";
./trans.js:92:      const v = localStorage.getItem(TRANS_KEY);
./trans.js:104:    try{ localStorage.setItem(TRANS_KEY, state); }catch(_){ /* ignore */ }
./trans.js:109:      const raw = localStorage.getItem(LANGS_KEY);
./trans.js:122:      localStorage.setItem(LANGS_KEY, JSON.stringify({ ts: Date.now(), targets }));
./trans.js:171:      const raw = localStorage.getItem(CACHE_KEY);
./trans.js:179:    try{ localStorage.setItem(CACHE_KEY, JSON.stringify(map)); }catch(_){ /* ignore */ }
./trans.js:216:      const original = el.getAttribute("data-i18n");
./trans.js:217:      const hasI18nAttr = el.hasAttribute("data-i18n-attr");
./trans.js:218:      if(original != null && !hasI18nAttr) el.textContent = original;
./trans.js:221:      const attrName = el.getAttribute("data-i18n-attr");
./trans.js:239:      const zh = el.getAttribute && el.getAttribute("data-zh");
./trans.js:240:      if(zh) el.textContent = zh;
./trans.js:264:    const source = String(el.getAttribute("data-i18n") || el.textContent || "").trim();
./trans.js:267:      el.textContent = source;
./trans.js:270:    el.textContent = GEO_HINT_EN;
./trans.js:275:    const elements = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-placeholder], [data-i18n-attr]"));
./trans.js:306:      const attrName = String(el.getAttribute("data-i18n-attr") || "").trim();
./trans.js:307:      const source = String(el.getAttribute("data-i18n") || "").trim();
./trans.js:311:          el.textContent = source;
./trans.js:316:              el.textContent = fixed;
./trans.js:318:              el.textContent = source;
./trans.js:323:                el.textContent = cache[key];
./trans.js:329:            el.textContent = source;
./trans.js:334:              el.textContent = cache[key];
./trans.js:341:      const placeholderSource = String(el.getAttribute("data-i18n-placeholder") || "").trim();
./trans.js:387:            item.el.textContent = translated;
./trans.js:398:    btn.textContent = currentState === "on" ? "Trans ON" : "Trans OFF";
./model.js:71:  // 不再尝试远程 AACGMv2 换算服务，也不做 localStorage 缓存，避免旧版本/失败回退导致的误报。
./ui.js:9:  function safeText(el, t) { if (el) el.textContent = t; }
./ui.js:10:  function safeHTML(el, h) { if (el) el.innerHTML = h; }
./ui.js:15:    box.innerHTML = "";
./ui.js:19:      d.textContent = it.text;
./ui.js:27:    try{ localStorage.setItem(key, JSON.stringify({ ts: Date.now(), value })); }catch(e){}
./ui.js:31:      const raw = localStorage.getItem(key);
./index.html:38:      bar.textContent = "TEST / STAGING";
./index.html:44:      corner.textContent = "TEST / STAGING";
./index.html:66:        <button id="btnFavs" type="button" class="topLink" aria-label="收藏夹" data-i18n-attr="aria-label" data-i18n="🌟 收藏夹">🌟 收藏夹</button>
./index.html:67:        <button id="btnAbout" type="button" class="topLink" aria-label="工具介绍" data-i18n-attr="aria-label" data-i18n="📖 工具介绍">📖 工具介绍</button>
./index.html:68:        <button id="btnTrans" type="button" class="btnTrans" aria-label="Trans Toggle" data-i18n-attr="aria-label" data-i18n="翻译开关">Trans OFF</button>
./index.html:75:          <span class="label" data-i18n="纬度 Latitude">纬度 Latitude</span>
./index.html:76:          <input id="lat" type="number" step="0.0001" placeholder="例如 53.47" data-i18n-placeholder="例如 53.47" />
./index.html:79:          <span class="label" data-i18n="经度 Longitude">经度 Longitude</span>
./index.html:80:          <input id="lon" type="number" step="0.0001" placeholder="例如 122.35" data-i18n-placeholder="例如 122.35" />
./index.html:85:        <button id="btnGeo" type="button" class="btn secondary" data-i18n="📍 获取当前位置">📍 获取当前位置</button>
./index.html:86:        <button id="btnFav" type="button" class="btn secondary hidden" data-i18n="⭐ 收藏">⭐ 收藏</button>
./index.html:87:        <button id="btnRun" type="button" class="btn primary" data-i18n="✍️ 生成即时预测">✍️ 生成即时预测</button>
./index.html:91:        <summary id="geoHintSummary" data-i18n="推荐直接“获取当前位置”，也可手动输入经纬度">推荐直接“获取当前位置”，也可手动输入经纬度</summary>
./index.html:92:        <div class="faqBody" id="geoHintBody" data-i18n="目的地经纬度：可通过奥维地图长按获取，或使用腾讯地图坐标拾取器：https://lbs.qq.com/getPoint/。">
./index.html:97:      <div class="row statusRow" aria-label="数据状态" data-i18n-attr="aria-label" data-i18n="数据状态">
./index.html:99:        <div class="statusText" id="statusText" aria-live="polite" data-i18n="等待生成。">等待生成。</div>
./index.html:105:        <button class="tab active" data-tab="t1" data-i18n="1小时精准">1小时精准</button>
./index.html:106:        <button class="tab" data-tab="t3" data-i18n="3小时预测">3小时预测</button>
./index.html:107:        <button class="tab" data-tab="t72" data-i18n="72小时范围">72小时范围</button>
./index.html:116:        <div class="k" data-i18n="当前建议（1小时内，10分钟粒度）">当前建议（1小时内，10分钟粒度）</div>
./index.html:131:        <div class="k" data-i18n="上游实况（近实时）">上游实况（近实时）</div>
./index.html:146:            <span class="swAuxItem"><span data-i18n="云量">云量</span> L/M/H —/—/—%</span>
./index.html:147:            <span class="swAuxItem"><span data-i18n="月角">月角</span> —°</span>
./index.html:158:              <div class="k" data-i18n="1小时 C值（Capture）柱状图">1小时 C值（Capture）柱状图</div>
./index.html:159:              <div class="small" data-i18n="C值越高，越建议投入。">C值越高，越建议投入。</div>
./index.html:161:            <div class="pill" id="unit10m" data-i18n="单位：10分钟">单位：10分钟</div>
./index.html:169:          <div class="k" data-i18n="1小时预测结论分级（C值）">1小时预测结论分级（C值）</div>
./index.html:171:            <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：投入回报高，建议立即行动。">：投入回报高，建议立即行动。</span></li>
./index.html:172:            <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：条件不错，建议准备与试拍。">：条件不错，建议准备与试拍。</span></li>
./index.html:173:            <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：存在机会，建议架机等待触发。">：存在机会，建议架机等待触发。</span></li>
./index.html:174:            <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：机会小，可低成本尝试。">：机会小，可低成本尝试。</span></li>
./index.html:175:            <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：当前时段不建议投入。">：当前时段不建议投入。</span></li>
./index.html:220:        <div class="burstModelHead" data-i18n="近期极光状态">近期极光状态</div>
./index.html:223:        <div class="burstNote" data-i18n="备注：爆发 ≠ 可观测，仍受云量与天光影响。">备注：爆发 ≠ 可观测，仍受云量与天光影响。</div>
./index.html:228:        <div class="k" data-i18n="太阳风送达能力综合模型">太阳风送达能力综合模型</div>
./index.html:235:        <div class="k" data-i18n="3小时结论分级（C值）">3小时结论分级（C值）</div>
./index.html:237:          <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：投入回报高，建议立即行动。">：投入回报高，建议立即行动。</span></li>
./index.html:238:          <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：条件不错，建议准备与试拍。">：条件不错，建议准备与试拍。</span></li>
./index.html:239:          <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：存在机会，建议架机等待触发。">：存在机会，建议架机等待触发。</span></li>
./index.html:240:          <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：机会小，可低成本尝试。">：机会小，可低成本尝试。</span></li>
./index.html:241:          <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：当前时段不建议投入。">：当前时段不建议投入。</span></li>
./index.html:250:        <div class="k" data-i18n="72小时范围预测">72小时范围预测</div>
./index.html:251:        <div class="small heroSub" id="outlookSub" data-i18n="按天评估极光出现的可能性，用于行程与时间规划。">按天评估极光出现的可能性，用于行程与时间规划。</div>
./index.html:257:              <div class="dayLabel" data-i18n="今天">今天</div>
./index.html:267:              <div class="dayLabel" data-i18n="明天">明天</div>
./index.html:277:              <div class="dayLabel" data-i18n="后天">后天</div>
./index.html:288:        <div class="k" data-i18n="72小时结论分级（C值）">72小时结论分级（C值）</div>
./index.html:290:          <li><b data-i18n="【C值5】强烈推荐">【C值5】强烈推荐</b><span data-i18n="：能量背景+送达能力更强，值得提前规划。">：能量背景+送达能力更强，值得提前规划。</span></li>
./index.html:291:          <li><b data-i18n="【C值4】值得出门">【C值4】值得出门</b><span data-i18n="：存在机会，重点看云与当晚即时模块。">：存在机会，重点看云与当晚即时模块。</span></li>
./index.html:292:          <li><b data-i18n="【C值3】可蹲守">【C值3】可蹲守</b><span data-i18n="：机会少，除非位置/条件极佳。">：机会少，除非位置/条件极佳。</span></li>
./index.html:293:          <li><b data-i18n="【C值2】低概率">【C值2】低概率</b><span data-i18n="：综合偏弱，提前投入意义不大。">：综合偏弱，提前投入意义不大。</span></li>
./index.html:294:          <li><b data-i18n="【C值1】不可观测">【C值1】不可观测</b><span data-i18n="：不建议投入。">：不建议投入。</span></li>
./index.html:310:        <div id="aboutTitle" class="modalTitle" data-i18n="📖 工具介绍">📖 工具介绍</div>
./index.html:311:        <button id="btnAboutClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:315:        <p class="aboutSectionTitle" data-i18n="工具应该怎么使用？">
./index.html:319:        <p data-i18n="输入经纬度，系统会自动读取你当前所在的时间与时区，生成极光观测预告。">
./index.html:324:          <b data-i18n="【1 小时精准】">【1 小时精准】</b><br>
./index.html:325:          <span data-i18n="以 10 分钟为粒度，即时回答：">以 10 分钟为粒度，即时回答：</span><br>
./index.html:326:          <span data-i18n="「我现在要不要出门？要不要架机？」">「我现在要不要出门？要不要架机？」</span>
./index.html:330:          <b data-i18n="【3 小时预测】">【3 小时预测】</b><br>
./index.html:331:          <span data-i18n="呈现逐小时状态，选出最适合观测极光的一个小时。">呈现逐小时状态，选出最适合观测极光的一个小时。</span><br>
./index.html:332:          <span data-i18n="同时告诉你当前极光是处在爆发中还是已衰落，并回答：">同时告诉你当前极光是处在爆发中还是已衰落，并回答：</span><br>
./index.html:333:          <span data-i18n="「接下来 3 小时值不值得守？」">「接下来 3 小时值不值得守？」</span>
./index.html:337:          <b data-i18n="【72 小时范围】">【72 小时范围】</b><br>
./index.html:338:          <span data-i18n="引入更多 CH 与 CME 日冕物质抛射的信息，以天为单位，预测极光爆发的可能性。">引入更多 CH 与 CME 日冕物质抛射的信息，以天为单位，预测极光爆发的可能性。</span><br>
./index.html:339:          <span data-i18n="从更宏观的数据视角，回答：">从更宏观的数据视角，回答：</span><br>
./index.html:340:          <span data-i18n="「未来三天，哪一天最值得安排时间？」">「未来三天，哪一天最值得安排时间？」</span>
./index.html:343:        <p class="aboutSectionTitle" data-i18n="极光预测，为什么不能只是 KP？">
./index.html:348:          <span data-i18n="KP 是为全球空间天气监测而设计的宏观指标。">KP 是为全球空间天气监测而设计的宏观指标。</span><br>
./index.html:349:          <span data-i18n="它在航天器运行、电力系统防护、长期磁扰评估中非常有效，">它在航天器运行、电力系统防护、长期磁扰评估中非常有效，</span><br>
./index.html:350:          <span data-i18n="但它的设计目标，从来不是服务于具体地点、具体时段的地面观测者。">但它的设计目标，从来不是服务于具体地点、具体时段的地面观测者。</span>
./index.html:354:          <span data-i18n="对于普通极光观测与拍摄来说，KP 的粒度过于粗糙。">对于普通极光观测与拍摄来说，KP 的粒度过于粗糙。</span><br>
./index.html:355:          <span data-i18n="它不区分 IMF 的瞬时方向变化，也难以反映短时稳定性与局地响应。">它不区分 IMF 的瞬时方向变化，也难以反映短时稳定性与局地响应。</span><br>
./index.html:356:          <span data-i18n="这也是为什么在真实体验中，常常会出现：">这也是为什么在真实体验中，常常会出现：</span><br>
./index.html:357:          <span data-i18n="KP 看似“非常合适”，却完全无法观测或拍摄的情况。">KP 看似“非常合适”，却完全无法观测或拍摄的情况。</span>
./index.html:359:        <p data-i18n="于是，在漠河零下40度的寒夜中，Aurora Capture 诞生了。">
./index.html:363:          <span data-i18n="C 值（Capture指数）并不是用来替代 KP 的。">C 值（Capture指数）并不是用来替代 KP 的。</span><br>
./index.html:364:          <span data-i18n="它更像是一个面向摄影师与追光者的【可拍可观指数】。">它更像是一个面向摄影师与追光者的【可拍可观指数】。</span>
./index.html:368:          <span data-i18n="作为一名理工科出身的风光摄影爱好者，">作为一名理工科出身的风光摄影爱好者，</span><br>
./index.html:369:          <span data-i18n="我尝试从更接近观测者的角度出发，直接调用太阳风与磁场的原始参数建模，">我尝试从更接近观测者的角度出发，直接调用太阳风与磁场的原始参数建模，</span><br>
./index.html:370:          <span data-i18n="在更短的时间尺度上，评估它们是否正在形成一个对拍摄友好的窗口。">在更短的时间尺度上，评估它们是否正在形成一个对拍摄友好的窗口。</span>
./index.html:374:          <span data-i18n="让我们一起看看：">让我们一起看看：</span><br>
./index.html:375:          <span data-i18n="此刻，地球手里握着的，究竟是一副什么样的牌？">此刻，地球手里握着的，究竟是一副什么样的牌？</span>
./index.html:378:        <p class="aboutSectionTitle" style="margin-top:18px;" data-i18n="反馈与建议">
./index.html:382:          <span data-i18n="报错 / 建议 / 数据异常 请发送邮件至：">报错 / 建议 / 数据异常 请发送邮件至：</span><br>
./index.html:384:          <span style="display:inline-block; margin-top:6px; color:rgba(255,255,255,.55); font-size:12px;" data-i18n="个人维护，可能延迟回复。">个人维护，可能延迟回复。</span>
./index.html:387:        <p style="margin-top:18px; text-align:right; color:rgba(255,255,255,.55); font-size:12px;" data-i18n="—— @小狮子佑酱">
./index.html:401:        <div id="loginTitle" class="modalTitle" data-i18n="需要登录">需要登录</div>
./index.html:402:        <button id="btnLoginClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:405:        <p data-i18n="为了跨设备保存收藏位置，需要登录一次。">为了跨设备保存收藏位置，需要登录一次。</p>
./index.html:406:        <p data-i18n="登录后，你收藏的地点就可以在不同设备上使用啦 🌟">登录后，你收藏的地点就可以在不同设备上使用啦 🌟</p>
./index.html:408:          <span class="label" data-i18n="邮箱">邮箱</span>
./index.html:409:          <input id="loginEmail" type="email" placeholder="邮箱" data-i18n-placeholder="邮箱" />
./index.html:414:        <button id="btnLoginConfirm" class="btn primary" type="button" aria-label="发送登录链接" data-i18n-attr="aria-label" data-i18n="发送登录链接">发送登录链接</button>
./index.html:415:        <button id="btnLoginCancel" class="btn secondary" type="button" aria-label="取消" data-i18n-attr="aria-label" data-i18n="取消">取消</button>
./index.html:425:        <div id="favTitle" class="modalTitle" data-i18n="🌟 收藏夹">🌟 收藏夹</div>
./index.html:426:        <button id="btnFavClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:429:        <div id="favEmpty" class="emptyText" data-i18n="还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏">还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏</div>
./index.html:432:          <button id="btnLogout" type="button" data-i18n="退出登录" style="border:0; background:transparent; color:rgba(255,255,255,.5); font-size:12px; cursor:pointer; text-decoration:underline;">退出登录</button>
./index.html:443:        <div id="favEditTitle" class="modalTitle" data-i18n="收藏地点">收藏地点</div>
./index.html:444:        <button id="btnFavEditClose" class="btn icon" type="button" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:448:          <div class="kvLabel" data-i18n="当前坐标">当前坐标</div>
./index.html:452:          <span class="label" data-i18n="地点名称">地点名称</span>
./index.html:453:          <input id="favEditName" type="text" maxlength="40" placeholder="地点名称" data-i18n-placeholder="地点名称" />
./index.html:458:        <button id="btnFavEditSave" class="btn primary" type="button" data-i18n="保存">保存</button>
./index.html:459:        <button id="btnFavEditCancel" class="btn secondary" type="button" data-i18n="取消">取消</button>
./index.html:468:        <div class="alertTitle" id="alertTitle" data-i18n="⚠️ 数据可信度提醒">⚠️ 数据可信度提醒</div>
./index.html:469:        <button class="modalX" id="alertClose" aria-label="关闭" data-i18n-attr="aria-label" data-i18n="关闭">✕</button>
./index.html:472:      <div class="alertNote" id="alertNote" data-i18n="不代表无法观测，仅表示模型输入存在不确定性。">不代表无法观测，仅表示模型输入存在不确定性。</div>
./index.html:474:        <button class="btn primary" id="alertOk" type="button" data-i18n="知道了">知道了</button>
```

### D. 运行时切换与开关
```
./app.js:67:  const transOn = window.AC_TRANS?.isOn?.() === true;
./app.js:96:    if(isSystemZh() || window.AC_TRANS?.isOn?.() !== true){
./app.js:119:    window.AC_TRANS?.applyTranslation?.();
./app.js:155:  if(window.AC_TRANS?.isOn?.()){
./app.js:156:    window.AC_TRANS.applyTranslation?.();
./app.js:299:  const initialText = (isSystemZh() || window.AC_TRANS?.isOn?.() !== true) ? textZh : textEn;
./app.js:324:   // --- Alert overlay helpers (do not rely on UI.showAlertModal, which may not toggle .show) ---
./app.js:475:  if(row) row.classList.toggle("split", split);
./app.js:476:  if(btnFav) btnFav.classList.toggle("hidden", !split);
./app.js:507:  if(window.AC_TRANS?.isOn?.()){
./app.js:508:    window.AC_TRANS.applyTranslation?.();
./app.js:538:  if(window.AC_TRANS?.isOn?.()){
./app.js:539:    window.AC_TRANS.applyTranslation?.();
./app.js:551:  if(window.AC_TRANS?.isOn?.()){
./app.js:552:    window.AC_TRANS.applyTranslation?.();
./app.js:568:  if(window.AC_TRANS?.isOn?.()){
./app.js:569:    window.AC_TRANS.applyTranslation?.();
./app.js:628:  if(window.AC_TRANS?.isOn?.()){
./app.js:629:    window.AC_TRANS.applyTranslation?.();
./app.js:720:  if(window.AC_TRANS?.isOn?.()){
./app.js:721:    window.AC_TRANS.applyTranslation?.();
./app.js:761:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:765:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:1111:  if(window.AC_TRANS?.isOn?.()){
./app.js:1112:    window.AC_TRANS.applyTranslation?.();
./app.js:1119:    if(window.AC_TRANS?.isOn?.()){
./app.js:1120:      window.AC_TRANS.applyTranslation?.();
./app.js:1973:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:2432:      if(!isSystemZh()) window.AC_TRANS?.applyTranslation?.();
./app.js:2458:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
./app.js:2604:        if(window.AC_TRANS?.isOn?.()){
./app.js:2605:          window.AC_TRANS.applyTranslation?.();
./app.js:2775:        if(window.AC_TRANS?.isOn?.()){
./app.js:2776:          window.AC_TRANS.applyTranslation?.();
./app.js:2864:      if(row) row.classList.toggle("hidden", !loggedIn);
./trans.js:1:// trans.js: minimal translation toggle + DeepL proxy
./trans.js:3:  const TRANS_KEY = "ac_trans";
./trans.js:5:  const CACHE_KEY = "ac_trans_cache";
./trans.js:396:  const updateToggleText = (btn) => {
./trans.js:398:    btn.textContent = currentState === "on" ? "Trans ON" : "Trans OFF";
./trans.js:409:    try{ console.warn("[AuroraCapture] Trans service not configured."); }catch(_){ /* ignore */ }
./trans.js:416:    updateToggleText(btn);
./trans.js:418:    window.AC_TRANS = window.AC_TRANS || {};
./trans.js:419:    window.AC_TRANS.applyTranslation = applyTranslation;
./trans.js:420:    window.AC_TRANS.isOn = () => currentState === "on";
./trans.js:427:      updateToggleText(btn);
./REVIEW.md:9:- `trans-zh-en.md`：英文母本补齐与术语一致性调整（含趋势提示、状态词等）
./REVIEW.md:13:- 未触碰任何 JS/逻辑文件（`app.js`、`trans.js` 等）
./REVIEW.md:28:- 护栏：只改 `trans-zh-en.md` 与 `index.html`，不改代码与参数；术语已按冻结规范执行
./trans-zh-en.md:47:- en: Trans ON / Trans OFF
./index.html:68:        <button id="btnTrans" type="button" class="btnTrans" aria-label="Trans Toggle" data-i18n-attr="aria-label" data-i18n="翻译开关">Trans OFF</button>
./index.html:488:  <!-- Trans config (optional): set apiBase to your Worker origin, e.g., https://xxx.workers.dev -->
./index.html:491:      apiBase: "https://aurora-capture-trans.glorialiu86.workers.dev"
./index.html:502:  <script defer src="./trans.js?v=0343"></script>
./AGENTS.md:69:- How to revert safely (e.g. revert commit / switch branch)
./AGENTS.md:100:- The agent must switch to "low-output mode" automatically.
./ui.js:129:      tabs.forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
./ui.js:130:      panes.forEach(p => p.classList.toggle("active", p.id === tabId));
./style.css:90:/* Header right area: 工具介绍 + language toggle */
./style.css:133:/* Trans toggle button */
./style.css:1113:/* Utility: hide any element (used by CN/EN toggle) */
./workers/README.md:3:This Worker proxies DeepL API calls for the frontend `Trans` toggle.
```

## 4) 依赖与构建链路核查（Step2）
### 4.1 依赖文件扫描结果
- 依赖/配置文件命中清单（仅存在如下文件）：
```
config.example.js
config.public.js
```
- 未发现：`package.json` / `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` / `requirements.txt` / `poetry.lock` / `.env.example` 等标准依赖文件。
- 备注：`aacgm-mlat-service/requirements.txt.rtf` 为 RTF 文档，非标准依赖清单。
- 配置文件 `config.example.js` / `config.public.js` 未包含翻译/语言相关依赖或注入脚本（见文件内容）。

### 4.2 构建/CI/workflows 检查
- `.github/workflows/deploy-staging.yml`：仅做 checkout + deploy，无翻译生成/同步步骤。
- `.github/workflows/noaa-mirror.yml`：仅拉取 NOAA 数据并提交，无翻译相关调用。
- 未发现构建时注入 locale/lang 的脚本或插件。

## 5) 关键问题逐条回答（Step3）
### 5.1 Trans ON/OFF 的状态存储在哪里？
- `trans.js:3` `TRANS_KEY = "ac_trans"`；`trans.js:92-104` 使用 `localStorage` 读写状态。
- `trans.js:398` `btn.textContent = currentState === "on" ? "Trans ON" : "Trans OFF"`。
- `trans.js:418-420` `window.AC_TRANS.isOn` 暴露状态。

### 5.2 切换时影响哪些 DOM 节点？
- `trans.js:275` 选择器：`[data-i18n], [data-i18n-placeholder], [data-i18n-attr]`。
- `trans.js:236-237` 状态节点：`#statusText, [data-status-key]`。
- `trans.js:65,262,305` `#geoHintBody` 特殊处理。

### 5.3 英文显示来自哪里？
- 固定映射：`trans.js:7` `FIXED_I18N_MAP`。
- 运行时翻译：`trans.js:182-200` 调用 `/api/translate`；`workers/index.js:56-101` 代理 DeepL。
- 状态文本英文源：`app.js:250` `STATUS_TEXT_EN_MAP`；`app.js:303` `data-i18n` 写入英文文本。

### 5.4 中文显示来自哪里？
- HTML 初始文案：`index.html` 多处 `data-i18n` 与正文中文（如 `index.html:68`）。
- 状态中文：`app.js:303` `data-zh` 保存中文；`trans.js:236-241` 强制恢复中文。

### 5.5 是否存在第三语言分支或 systemLang 分支？
- `trans.js:78-98` 使用 `navigator.language`；`trans.js:142-170` 依据语言目标解析（可返回非英语目标）。
- `app.js:275-285` `navigator.language / navigator.languages` 参与 `getSystemLang` / `getUiLang`。
- `workers/index.js:14-49` 允许任意目标语言码（`targetLooksValid`）。

### 5.6 是否存在网络请求用于翻译或拉取词表？
- `trans.js:134-135` 请求 `/api/languages`。
- `trans.js:195` 请求 `/api/translate`。
- `workers/index.js:27-101` 调用 DeepL `v2/languages` / `v2/translate`。

### 5.7 是否存在读 textContent 作为翻译 source 的逻辑？
- 是：`trans.js:264` `const source = ... el.getAttribute("data-i18n") || el.textContent`。

### 5.8 是否存在把结果写回 data-i18n / data-en / data-zh / map 的逻辑？
- 写回 `data-i18n`：`app.js:484,494,504,535` 等多处 `setAttribute("data-i18n", ...)`。
- 写回 `data-zh`：`app.js:84`；`app.js:303` `data-zh` 生成。
- 未发现 `data-en`（`rg -n "data-en" .` 无命中）。
- `trans.js` 对翻译结果写回 `textContent` / 属性（`trans.js:382-387`）。

### 5.9 trans-zh-en.md 是否被 fetch/import/读取用于运行时？
- 未发现：全仓 `rg -n "trans-zh-en" .` 仅命中 `REVIEW.md`（非运行时代码）。

## 6) 风险分级
### 会导致功能出错
- 翻译服务依赖 DeepL Worker 与外部 API（`trans.js`, `workers/index.js`），当不可用时翻译逻辑仍被触发，可能导致状态异常/提示（`trans.js:191-200`、`workers/index.js:56-101`）。

### 会导致未来误入
- 系统语言检测与多目标语言解析仍在（`trans.js:78-170`, `app.js:275-285`），可将目标语言扩展到非英语。
- 运行时翻译入口与代理文档仍存在（`workers/README.md`）。
- `textContent` 作为翻译源（`trans.js:264`）容易引入“文本被覆盖后再翻译”的隐性路径。

### 仅残留无影响
- `trans-zh-en.md` 仅作为翻译资产文档，未被运行时引用（见 Step3-9）。

## 7) 需要硬删除的对象清单（候选）
- `trans.js`
- `workers/index.js`
- `workers/README.md`
- `index.html` 中 `window.TRANS_CONFIG` 配置块
- `app.js` 中与 `data-i18n`/翻译相关的运行时代码片段（需谨慎确认范围）


## 8) 第1轮修复记录（追加）

### 8.0 预检（index.html script + README 恢复）
- index.html 全文搜索 `index.js`：未命中（无需修改）。
- README.md 恢复：main/staging 均不存在该文件，无法恢复。
  - main: `git checkout main -- README.md` -> `pathspec 'README.md' did not match any file(s) known to git`
  - staging: `git checkout staging -- README.md` -> `pathspec 'README.md' did not match any file(s) known to git`


### 8.1 锚点 #2（app.js：系统语言检测块）
- 锚点名：`normalizeTag/getSystemLang/isSystemZh/getUiLang` 语言检测辅助块
- 删除/替换内容：
  - 删除 `normalizeTag/getSystemLang/isSystemZh/isSystemEn/getUiLang/isZhLang` 整段函数。
  - `statusSpanHTML` 初始文案不再依赖系统语言，仅依赖 `Trans` 开关。
  - 删除 `if(!isSystemZh()) window.AC_TRANS?.applyTranslation?.();`（该行仅用于系统语言分支）。
- 关键片段（删除后）：
```
const statusTextByKey = (key, preferZh = false) => {
  if(!key) return "";
  const item = STATUS_LABELS[key];
  if(!item) return "";
  if(preferZh) return item.zh;
  return item.en;
};

const statusSpanHTML = (key, extraAttrs = "") => {
  const textEn = statusTextByKey(key, false);
  const textZh = statusTextByKey(key, true);
  const textEsc = escapeHTML(textEn || "");
  const initialText = window.AC_TRANS?.isOn?.() === true ? textEn : textZh;
  const initialEsc = escapeHTML(initialText || "");
  const keyEsc = escapeHTML(String(key || ""));
  const attrs = extraAttrs ? " " + String(extraAttrs).trim() : "";
  return `<span data-status-key="${keyEsc}" data-i18n="${textEsc}" data-zh="${escapeHTML(textZh || "")}"${attrs}>${initialEsc}</span>`;
};
```
- grep 结果（app.js）：
  - `normalizeTag|getSystemLang|isSystemZh|isSystemEn|getUiLang|isZhLang|navigator.language|navigator.languages|Intl` -> 0 命中
- 本步自测：未执行（按流程下一步统一做全量核查）。


### 8.2 锚点 #3-1（app.js：setStatusDots 内 applyTranslation 调用）
- 锚点名：`setStatusDots`
- 删除内容：移除 `if(window.AC_TRANS?.isOn?.()) { window.AC_TRANS.applyTranslation?.(); }`。
- 关键片段（删除后）：`setStatusDots` 末尾不再调用 `applyTranslation`。
- grep 结果（app.js）：
```
446:    window.AC_TRANS.applyTranslation?.();
477:    window.AC_TRANS.applyTranslation?.();
490:    window.AC_TRANS.applyTranslation?.();
507:    window.AC_TRANS.applyTranslation?.();
567:    window.AC_TRANS.applyTranslation?.();
659:    window.AC_TRANS.applyTranslation?.();
699:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
703:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
1050:    window.AC_TRANS.applyTranslation?.();
1058:      window.AC_TRANS.applyTranslation?.();
1911:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2395:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2542:          window.AC_TRANS.applyTranslation?.();
2713:          window.AC_TRANS.applyTranslation?.();
```
- 本步自测：未执行（按流程待全量核查）。


### 8.3 锚点 #3-2（app.js：updateActionRow 内 applyTranslation 调用）
- 锚点名：`updateActionRow`
- 删除内容：移除 `if(window.AC_TRANS?.isOn?.()) { window.AC_TRANS.applyTranslation?.(); }`。
- 关键片段（删除后）：`updateActionRow` 末尾不再调用 `applyTranslation`。
- grep 结果（app.js）：
```
474:    window.AC_TRANS.applyTranslation?.();
487:    window.AC_TRANS.applyTranslation?.();
504:    window.AC_TRANS.applyTranslation?.();
564:    window.AC_TRANS.applyTranslation?.();
656:    window.AC_TRANS.applyTranslation?.();
696:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
700:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
1047:    window.AC_TRANS.applyTranslation?.();
1055:      window.AC_TRANS.applyTranslation?.();
1908:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2392:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2539:          window.AC_TRANS.applyTranslation?.();
2710:          window.AC_TRANS.applyTranslation?.();
```
- 当前命中数：13（较上次预期减少 1）。
- 本步自测：未执行（按流程待全量核查）。


### 8.4 锚点 #3-3（app.js：setFormError 内 applyTranslation 调用）
- 锚点名：`setFormError`
- 删除内容：移除 `if(window.AC_TRANS?.isOn?.()) { window.AC_TRANS.applyTranslation?.(); }`。
- 关键片段（删除后）：`setFormError` 末尾不再调用 `applyTranslation`。
- grep 结果（app.js）：
```
484:    window.AC_TRANS.applyTranslation?.();
501:    window.AC_TRANS.applyTranslation?.();
561:    window.AC_TRANS.applyTranslation?.();
653:    window.AC_TRANS.applyTranslation?.();
693:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
697:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
1044:    window.AC_TRANS.applyTranslation?.();
1052:      window.AC_TRANS.applyTranslation?.();
1905:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2389:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2536:          window.AC_TRANS.applyTranslation?.();
2707:          window.AC_TRANS.applyTranslation?.();
```
- 当前命中数：12（较上次减少 1）。
- 本步自测：未执行（按流程待全量核查）。


### 8.5 锚点 #3-4（app.js：openAlertOverlayFull 错误/提示链路）
- 锚点名：`openAlertOverlayFull`
- 删除内容：移除 try 分支内的 `if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();`（错误/提示链路二次触发翻译）。
- 关键片段摘要：`openAlertOverlayFull` 在 `openAlertOverlay(html);` 后不再触发 `applyTranslation`。
- grep 结果（app.js）：
```
484:    window.AC_TRANS.applyTranslation?.();
501:    window.AC_TRANS.applyTranslation?.();
561:    window.AC_TRANS.applyTranslation?.();
653:    window.AC_TRANS.applyTranslation?.();
696:       if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
1043:    window.AC_TRANS.applyTranslation?.();
1051:      window.AC_TRANS.applyTranslation?.();
1904:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2388:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2535:          window.AC_TRANS.applyTranslation?.();
2706:          window.AC_TRANS.applyTranslation?.();
```
- 当前命中数：11（本轮从 12 降至 11）。
- 本步自检：未运行 lint（仓库无 package.json 脚本），仅目检语法无改动风险。


### 8.6 锚点 #3-5（app.js：openAlertOverlayFull / catch 分支）
- 删除位置：`openAlertOverlayFull` / catch 分支
- 删除原因：避免错误/提示链路再次触发翻译刷新
- 删除内容：移除 `if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();`
- 片段摘要：`openAlertOverlayFull` 的 try/catch 均不再调用 `applyTranslation`。
- 删除后总命中数：10（本轮从 11 降至 10）
- 自检：目检语法无悬空括号/逗号；try/catch 均不含 `applyTranslation`。
- grep 结果（app.js）：
```
484:    window.AC_TRANS.applyTranslation?.();
501:    window.AC_TRANS.applyTranslation?.();
561:    window.AC_TRANS.applyTranslation?.();
653:    window.AC_TRANS.applyTranslation?.();
1042:    window.AC_TRANS.applyTranslation?.();
1050:      window.AC_TRANS.applyTranslation?.();
1903:            if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2387:      if(window.AC_TRANS?.isOn?.()) window.AC_TRANS.applyTranslation?.();
2534:          window.AC_TRANS.applyTranslation?.();
2705:          window.AC_TRANS.applyTranslation?.();
```


## 9) 第2轮 A 阶段：静态英文映射生成
- 新增文件：`translations_en.js`
- 导出：`export const TRANSLATIONS_EN = { ... }`
- 统计：
  - 总条目数：200
  - 成功映射数：200
  - 缺 zh：0
  - 缺 en：0
  - en 为空：0
  - 多行块解析失败：0
  - 重复 zh key：0

### 9.1 异常条目（可定位片段）
#### 缺 zh
(无)

#### 缺 en
(无)

#### en 为空
(无)

#### 多行块解析失败
(无)

#### 重复 zh key（保留首次）
(无)


## 10) 第2轮 B 阶段（B1-B3）：接入静态映射 + 二态切换
- 接入位置：`trans.js` 通过 `import { TRANSLATIONS_EN } from "./translations_en.js"` 使用静态映射。
- 入口与触发：
  - 初始化：`trans.js` 的 `init()` 内调用 `applyTrans(currentState)`
  - 点击开关：`btnTrans` click -> `applyTrans(currentState)`
  - 对外暴露：`window.AC_TRANS.applyTrans(state)`

### 10.1 可翻译节点集合与缓存策略
- 基础集合：`[data-zh]` 叶子节点。
- 兼容现有标注：对 `data-i18n` 元素，仅当 `textContent.trim() === data-i18n.trim()` 时才缓存 `data-zh`。
- 自动缓存（止血优先）：遍历 `body *` 的叶子节点（排除 `script/style/noscript`），若 `textContent.trim()` 命中 `TRANSLATIONS_EN` key，则设置 `data-zh`。
- 说明：仅缓存中文原文，不做翻译请求，不触发系统语言检测。

### 10.2 统计输出（运行时）
- `applyTrans` 每次执行输出：
  - `totalTranslatableNodes`
  - `totalKeysUsed`
  - `missingCount`
  - `missingKeys`（完整数组）
- 统计对象挂载：`window.AC_TRANS_STATS`
- 当前未执行浏览器统计（需在本地页面切换 Trans 查看控制台）。


## 11) 加载层止血：资源引用统一为 ?v=0343
- 说明：已清除历史文件名后缀写法，统一使用缓存参数。
- 当前（统一 ?v=0343）：
  - `./style.css?v=0343`
  - `config.public.js?v=0343`
  - `./supabaseClient.js?v=0343`
  - `./adapter.js?v=0343`
  - `./ui.js?v=0343`
  - `./trans.js?v=0343`
  - `./model.js?v=0343`
  - `./app.js?v=0343`
- 验证：待用户强刷后确认 Network 200（本次未执行浏览器验证）。


## 12) B4 收尾验证（staging 实测）
- Trans ON/OFF：可正常切换
- 资源加载：静态资源 200（无历史文件名后缀 / 404）
- 统计结果（window.AC_TRANS_STATS）：
  - totalTranslatableNodes: 118
  - totalKeysUsed: 97
  - missingCount: 0
  - missingKeys: []
- 结论：英文母本覆盖率 100%，运行时无缺失项。


## 13) 加载层修复：staging.css 动态注入版本号
- 发现：`index.html` 动态注入 `./staging.css?v=0343`（与缓存参数一致）
- 处理：确认 `staging.css` 存在，修正为 `./staging.css?v=0343`
- 说明：不引入新缓存机制，仅回到既定 `?v=0343`


## 14) 版本号一致性修复（footer + 缓存参数）
- staging.css 动态注入：已为 `./staging.css?v=0343`（保持不变）
- footer 版本号修复：
  - 修复前：`版本号` 文案与缓存参数不一致
  - 修复后：`版本号：v5.0.0343`
- 说明：与 `?v=0343` 缓存参数保持一致。


## 15) C45 清零复核（本轮收口）
- 说明：错误缓存命中已清零；全仓检索 0。
- 时间：2026-01-26 19:06:02
- 操作者：Codex
- 约束：未引入新规则，未改变其他条目语义。


## 16) B 类复核说明（固定字符串全仓检索）
- 方法：对 `UI_TEXT_ALIGN_PLAN.md` 的 B 类 canonical zh 逐条执行 `rg -nF` 全仓定位。
- 复核统计：B_total 36；B1_leak 25；B2_real_gap 0；doc_only 11。
- 说明：详见 `UI_TEXT_ALIGN_PLAN_B_RECLASS.md`。


## 17) model.js 中文对齐预检（A 阶段）
### 17.1 环境记录
- 分支：staging
- HEAD：617dc92edf14d4a34409362f07242615cf597849
- git status -sb：
  - M `AUDIT_i18n_stoploss_v0.md`
  - M `REVIEW.md`
  - ?? `UI_TEXT_ALIGN_PLAN.md`
  - ?? `UI_TEXT_ALIGN_PLAN_B_RECLASS.md`

### 17.2 canonical 集合统计
- trans-zh-en.md `zh:` 条目数：200

### 17.3 model.js 中文候选清单（20 条）
| 文案 | 行号 | 语境/变量 |
|---|---|---|
| 强烈推荐 | 85 | if(s >= 5) return { score:5, key:"STRONGLY_RECOMMENDED", t:"强烈推荐", cls:"g" }; |
| 值得出门 | 86 | if(s >= 4) return { score:4, key:"WORTH_GOING_OUT", t:"值得出门", cls:"g" }; |
| 可蹲守 | 87 | if(s >= 3) return { score:3, key:"WAIT_AND_OBSERVE", t:"可蹲守", cls:"b" }; |
| 低概率 | 88 | if(s >= 2) return { score:2, key:"LOW_PROBABILITY", t:"低概率", cls:"y" }; |
| 不可观测 | 89 | return { score:1, key:"UNOBSERVABLE", t:"不可观测", cls:"r" }; |
| 你的位置处于主发生区附近（更容易头顶/高仰角出现）。 | 183 | let hint = "你的位置处于主发生区附近（更容易头顶/高仰角出现）。"; |
| 你的位置更接近主发生区（更容易头顶/高仰角出现）。 | 189 | hint = "你的位置更接近主发生区（更容易头顶/高仰角出现）。"; |
| 你在椭圆外缘的可视区：更可能是北向低仰角/高空极光，成败更吃云与天色。 | 197 | hint = "你在椭圆外缘的可视区：更可能是北向低仰角/高空极光，成败更吃云与天色。"; |
| 你离主发生区较远：更像“赌边缘天边光”，需要更强触发或更长持续。 | 203 | hint = "你离主发生区较远：更像“赌边缘天边光”，需要更强触发或更长持续。"; |
| 爆发进行中 | 249 | return { stateKey:"IN_OUTBURST", state:"爆发进行中", hint:"离子触发更明确。", score:8.0 }; |
| 离子触发更明确。 | 249 | return { stateKey:"IN_OUTBURST", state:"爆发进行中", hint:"离子触发更明确。", score:8.0 }; |
| 爆发概率上升 | 252 | return { stateKey:"OUTBURST_BUILDING", state:"爆发概率上升", hint:"系统更容易发生，但未到持续触发。", score:6.4 }; |
| 系统更容易发生，但未到持续触发。 | 252 | return { stateKey:"OUTBURST_BUILDING", state:"爆发概率上升", hint:"系统更容易发生，但未到持续触发。", score:6.4 }; |
| 爆发后衰落期 | 255 | return { stateKey:"OUTBURST_FADING", state:"爆发后衰落期", hint:"刚有过波动，仍可能余震一会儿。", score:5.4 }; |
| 刚有过波动，仍可能余震一会儿。 | 255 | return { stateKey:"OUTBURST_FADING", state:"爆发后衰落期", hint:"刚有过波动，仍可能余震一会儿。", score:5.4 }; |
| 静默 | 257 | return { stateKey:"SILENT", state:"静默", hint:"背景不足或触发不清晰。", score:3.0 }; |
| 背景不足或触发不清晰。 | 257 | return { stateKey:"SILENT", state:"静默", hint:"背景不足或触发不清晰。", score:3.0 }; |
| 天空被云层遮挡，不利于观测 | 281 | [ObservationBlocker.CLOUD_COVER]: "天空被云层遮挡，不利于观测", |
| 天色偏亮，微弱极光难以分辨 | 282 | [ObservationBlocker.BRIGHT_SKY]: "天色偏亮，微弱极光难以分辨", |
| 能量注入弱，难以形成有效极光 | 283 | [ObservationBlocker.LOW_AURORA_CONTRAST]: "能量注入弱，难以形成有效极光", |

### 17.4 对齐判定统计
- 精确匹配 canonical：19
- 近似匹配候选：0
- 未匹配：1（需替换）

### 17.5 替换计划清单（OLD -> NEW）
- 锚点：评分分级映射（C 值分级）
  - model.js:88 `低概率` -> canonical `希望不大`（理由：词汇统一到 canonical）

### 17.6 计划锚点列表（按执行顺序）
1) ObservationBlocker 映射（当前均已对齐，无替换项）
   - 执行结果：无替换；仅确认无需改动
2) 位置/椭圆区提示 hint 文案组（当前均已对齐，无替换项）
   - 执行结果：无替换；仅确认无需改动
3) 其它 model 层提示组：评分分级映射（含 1 项替换）
   - 替换：model.js:88 `低概率` -> `希望不大`（canonical 词汇更新）
   - 自检：
     - `rg -nF "低概率" model.js` -> 0
     - `rg -nF "希望不大" model.js` -> 1

### 17.7 验证方式调整（Pages 手动验证）
- 原因：当前环境无 node/npm，无法本地运行验证脚本
- 用户需验证：
  - staging 页面 Trans on/off 是否正常
  - 控制台 `window.AC_TRANS_STATS.missingCount` 是否为 0
  - C 值 2 文案是否为“希望不大”（不再出现“低概率”）
