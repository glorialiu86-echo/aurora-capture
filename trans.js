// trans.js: minimal translation toggle + DeepL proxy
(() => {
  const TRANS_KEY = "ac_trans";
  const LANGS_KEY = "ac_deepl_langs";
  const CACHE_KEY = "ac_trans_cache";
  const LANGS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  const FIXED_I18N_MAP = {
    "云量": "Cloud cover",
    "月角": "Moon altitude",
    "更新时间": "Updated",
    "新鲜度": "Data freshness",
    "太阳风": "Solar wind",
    "已生成。": "Generated.",
    "已获取": "Acquired",
    "已获取 ✓": "Acquired ✓",
    "已获取位置": "Location acquired",
    "已获取当前位置": "Location acquired",
    "静默": "stand in silence",
    "爆发进行中": "in outburst",
    "爆发中": "in outburst",
    "爆发概率上升": "outburst building",
    "爆发后衰落期": "fading after outburst",
    "值得出门": "worth going out",
    "可蹲守": "wait-and-observe",
    "低概率": "low probability",
    "不可观测": "unobservable",
    "拉取数据中…": "Fetching data…",
    "等待生成。": "Waiting…",
    "📍 正在获取当前位置…": "Getting current location…",
    "📍 无法获取定位": "Unable to get location",
    "⚠️ 数据可信度提醒": "⚠️ Data reliability notice",
    "⚠️ 磁纬过低：已停止生成": "⚠️ MLAT too low: generation stopped",
    "磁纬过低，已停止生成": "MLAT too low. Generation stopped",
    "⚠️ 磁纬限制：不可观测": "⚠️ MLAT limit: unobservable",
    "⚠️ 磁纬较低：仅极端事件才可能": "⚠️ Low MLAT: only extreme events may work",
    "⚠️ 经纬度输入无效": "⚠️ Invalid coordinates",
    "⚠️ 经纬度超出范围": "⚠️ Coordinates out of range",
    "⚠️ 无法获取定位": "⚠️ Unable to get location",
    "⚠️ 定位处理异常": "⚠️ Location error",
    "⚠️ 定位返回无效坐标": "⚠️ Invalid location returned",
    "🌟 收藏夹": "Favorites",
    "⭐ 收藏": "Save",
    "⭐ 收藏地址": "Save address",
    "📍 获取当前位置": "Get current location",
    "📍 获取": "Get",
    "📍 刷新定位": "Refresh location",
    "✍️ 生成预测": "Generate prediction",
    "需要登录": "Login required",
    "登录 / 注册": "Login / Sign up",
    "取消": "Cancel",
    "收藏地点": "Save location",
    "地点名称": "Location name",
    "当前坐标": "Current coordinates",
    "保存": "Save",
    "重命名": "Rename",
    "删除": "Delete",
    "还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏": "No saved locations yet. Generate or enter a location, then tap ⭐ Save.",
    "为了跨设备保存收藏位置，需要登录一次。": "To save favorites across devices, please log in once.",
    "登录后，你收藏的地点就可以在不同设备上使用啦 🌟": "After logging in, your saved locations will be available across devices 🌟",
    "经纬度无效，无法收藏。": "Invalid coordinates. Unable to save.",
    "该地点已在收藏中，如需修改请先删除后重建。": "This location is already saved. Delete it before saving again.",
    "请输入地点名称。": "Please enter a location name.",
    "—— @小狮子佑酱": "—— @小狮子佑酱",
  };
  const GEO_HINT_ID = "geoHintBody";
  const GEO_HINT_EN = "Destination coordinates: you can get lat/long by dropping a pin in Apple Maps or Google Maps, then copying the latitude & longitude from the place details.";

  const getConfig = () => {
    const cfg = window.TRANS_CONFIG || {};
    const base = String(cfg.apiBase || "").trim().replace(/\/+$/g, "");
    return {
      apiBase: base,
      translateUrl: base ? `${base}/api/translate` : "/api/translate",
      languagesUrl: base ? `${base}/api/languages` : "/api/languages",
    };
  };

  const normalizeTag = (lang) => {
    const raw = String(lang || "").trim().toLowerCase();
    if(!raw) return "";
    return raw.replace(/_/g, "-");
  };

  const getSystemLang = () => normalizeTag(navigator.language || "en");
  const isSystemZh = () => getSystemLang().startsWith("zh");
  const isSystemEn = () => getSystemLang().startsWith("en");

  const getPreferredLang = () => getSystemLang();

  const getStoredState = () => {
    try{
      const v = localStorage.getItem(TRANS_KEY);
      if(v === "on" || v === "off") return v;
    }catch(_){ /* ignore */ }
    return null;
  };

  const getDefaultState = () => {
    const pref = getPreferredLang();
    return pref.startsWith("zh") ? "off" : "on";
  };

  const setStoredState = (state) => {
    try{ localStorage.setItem(TRANS_KEY, state); }catch(_){ /* ignore */ }
  };

  const getLangCache = () => {
    try{
      const raw = localStorage.getItem(LANGS_KEY);
      if(!raw) return null;
      const parsed = JSON.parse(raw);
      if(!parsed || !Array.isArray(parsed.targets)) return null;
      if(!parsed.ts || (Date.now() - parsed.ts) > LANGS_TTL_MS) return null;
      return parsed.targets;
    }catch(_){
      return null;
    }
  };

  const setLangCache = (targets) => {
    try{
      localStorage.setItem(LANGS_KEY, JSON.stringify({ ts: Date.now(), targets }));
    }catch(_){ /* ignore */ }
  };

  const fetchSupportedTargets = async () => {
    const cached = getLangCache();
    if(cached) return cached;
    const cfg = getConfig();
    if(!cfg.apiBase || !cfg.languagesUrl){
      return null;
    }
    try{
      const r = await fetch(cfg.languagesUrl, { cache: "no-store" });
      if(!r.ok) throw new Error("languages_fetch_failed");
      const j = await r.json();
      const targets = Array.isArray(j?.targets) ? j.targets.map((t) => String(t || "").trim()).filter(Boolean) : [];
      if(!targets.length) throw new Error("languages_empty");
      setLangCache(targets);
      return targets;
    }catch(_){
      return null;
    }
  };

  const resolveTarget = async () => {
    const preferred = getPreferredLang();
    const supported = await fetchSupportedTargets();
    if(!supported || !supported.length) return "en";
    const supportedNorm = supported.map(normalizeTag);

    const pickByCandidate = (cand) => {
      const c = normalizeTag(cand);
      if(!c) return null;
      const exactIndex = supportedNorm.indexOf(c);
      if(exactIndex >= 0) return supported[exactIndex];
      const primary = c.split("-")[0];
      if(!primary) return null;
      const primaryExactIndex = supportedNorm.indexOf(primary);
      if(primaryExactIndex >= 0) return supported[primaryExactIndex];
      const variantIndex = supportedNorm.findIndex((s) => s.startsWith(primary + "-"));
      if(variantIndex >= 0) return supported[variantIndex];
      return null;
    };

    return pickByCandidate(preferred) || pickByCandidate("en") || "en";
  };

  const getCacheMap = () => {
    try{
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(_){
      return {};
    }
  };

  const setCacheMap = (map) => {
    try{ localStorage.setItem(CACHE_KEY, JSON.stringify(map)); }catch(_){ /* ignore */ }
  };

  const translateBatch = async (texts, target, sourceLang = "zh") => {
    const items = Array.isArray(texts) ? texts : [];
    if(!items.length) return [];
    const src = String(sourceLang || "zh").trim().toLowerCase();
    const tgt = String(target || "").trim().toLowerCase();
    if(tgt.startsWith("zh") && src.startsWith("zh")){
      return items.slice();
    }
    const cfg = getConfig();
    if(!cfg.apiBase || !cfg.translateUrl){
      return [];
    }
    try{
      const r = await fetch(cfg.translateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: items, target, source: sourceLang }),
      });
      if(!r.ok) throw new Error("translate_failed");
      const j = await r.json();
      const list = Array.isArray(j?.texts) ? j.texts : [];
      if(list.length === items.length) return list;
      if(j?.text) return items.map((_, i) => (i === 0 ? String(j.text) : ""));
      return [];
    }catch(_){
      return [];
    }
  };

  let currentState = "off";
  let jobId = 0;

  const restoreOriginal = (elements) => {
    elements.forEach((el) => {
      const original = el.getAttribute("data-i18n");
      if(original != null) el.textContent = original;
    });
  };
  const forceStatusZh = () => {
    const items = Array.from(document.querySelectorAll("#statusText, [data-status-key]"));
    items.forEach((el) => {
      const zh = el.getAttribute && el.getAttribute("data-zh");
      if(zh) el.textContent = zh;
    });
  };

  const resolveFixedText = (source, target) => {
    if(!source) return null;
    if(Object.prototype.hasOwnProperty.call(FIXED_I18N_MAP, source)){
      return target.startsWith("zh") ? source : FIXED_I18N_MAP[source];
    }
    if(source.startsWith("已获取当前位置")){
      const suffix = source.slice("已获取当前位置".length);
      const base = FIXED_I18N_MAP["已获取当前位置"] || "Location acquired";
      return target.startsWith("zh") ? source : `${base}${suffix}`;
    }
    return null;
  };

  const isStatusElement = (el) => {
    return !!(el && el.hasAttribute && el.hasAttribute("data-status-key"));
  };

  const applyGeoHintRule = (target, state) => {
    const el = document.getElementById(GEO_HINT_ID);
    if(!el) return;
    const source = String(el.getAttribute("data-i18n") || el.textContent || "").trim();
    if(!source) return;
    if(state !== "on" || target.startsWith("zh")){
      el.textContent = source;
      return;
    }
    el.textContent = GEO_HINT_EN;
  };

  const applyTranslation = async () => {
    const myJob = ++jobId;
    const elements = Array.from(document.querySelectorAll("[data-i18n]"));

    if(isSystemZh()){
      restoreOriginal(elements);
      applyGeoHintRule("zh", "off");
      forceStatusZh();
      return;
    }

    if(currentState !== "on"){
      restoreOriginal(elements);
      applyGeoHintRule("zh", "off");
      forceStatusZh();
      return;
    }

    const cfg = getConfig();
    const target = await resolveTarget();
    if(myJob !== jobId || currentState !== "on") return;
    const canTranslate = !!cfg.apiBase;
    if(!canTranslate){
      showNoServiceHint();
    }

    const preferred = getPreferredLang();
    const preferredIsZh = preferred.startsWith("zh");
    const cache = getCacheMap();
    const pendingBySource = { zh: [], en: [] };

    for(const el of elements){
      if(el.id === GEO_HINT_ID) continue;
      const source = String(el.getAttribute("data-i18n") || "").trim();
      if(!source){
        continue;
      }
      const statusEl = isStatusElement(el);
      if(statusEl && preferredIsZh){
        el.textContent = source;
        continue;
      }
      if(!statusEl){
        const fixed = resolveFixedText(source, target);
        if(fixed != null){
          el.textContent = fixed;
          continue;
        }
      }
      if(!canTranslate){
        el.textContent = source;
        continue;
      }
      const sourceLang = statusEl ? "en" : "zh";
      const key = `${target}::${sourceLang}::${source}`;
      if(cache[key]){
        el.textContent = cache[key];
        continue;
      }
      pendingBySource[sourceLang].push({ el, source, key });
    }

    const sourceBuckets = Object.keys(pendingBySource).filter((k) => pendingBySource[k].length);
    if(!sourceBuckets.length){
      applyGeoHintRule(target, currentState);
      return;
    }

    for(const sourceLang of sourceBuckets){
      const bucket = pendingBySource[sourceLang];
      const translatedList = await translateBatch(bucket.map((p) => p.source), target, sourceLang);
      if(myJob !== jobId || currentState !== "on") return;
      for(let i = 0; i < bucket.length; i++){
        const item = bucket[i];
        const translated = translatedList[i] || "";
        if(translated){
          cache[item.key] = translated;
          item.el.textContent = translated;
        }
      }
    }
    setCacheMap(cache);
    applyGeoHintRule(target, currentState);
  };

  const updateToggleText = (btn) => {
    if(!btn) return;
    btn.textContent = currentState === "on" ? "Trans ON" : "Trans OFF";
  };

  let hintShown = false;
  const showNoServiceHint = () => {
    if(hintShown) return;
    hintShown = true;
    const btn = document.getElementById("btnTrans");
    if(btn){
      btn.title = "未配置翻译服务";
    }
    try{ console.warn("[AuroraCapture] Trans service not configured."); }catch(_){ /* ignore */ }
  };

  const init = () => {
    const btn = document.getElementById("btnTrans");
    const stored = getStoredState();
    currentState = stored || getDefaultState();
    updateToggleText(btn);

    window.AC_TRANS = window.AC_TRANS || {};
    window.AC_TRANS.applyTranslation = applyTranslation;
    window.AC_TRANS.isOn = () => currentState === "on";

    applyTranslation();

    btn?.addEventListener("click", () => {
      currentState = (currentState === "on") ? "off" : "on";
      setStoredState(currentState);
      updateToggleText(btn);
      applyTranslation();
    });
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
