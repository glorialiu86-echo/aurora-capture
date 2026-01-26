import { TRANSLATIONS_EN } from "./translations_en.js";

(() => {
  const TRANS_KEY = "ac_trans";
  let currentState = "off";

  const getStoredState = () => {
    try{
      const v = localStorage.getItem(TRANS_KEY);
      if(v === "on" || v === "off") return v;
    }catch(_){ /* ignore */ }
    return null;
  };

  const setStoredState = (state) => {
    try{ localStorage.setItem(TRANS_KEY, state); }catch(_){ /* ignore */ }
  };

  const updateToggleText = (btn) => {
    if(!btn) return;
    btn.textContent = currentState === "on" ? "Trans ON" : "Trans OFF";
  };

  const isLeaf = (el) => el && el.nodeType === 1 && el.children && el.children.length === 0;

  const cacheFromDataAttrs = () => {
    const nodes = Array.from(document.querySelectorAll("[data-zh], [data-i18n]"));
    nodes.forEach((el) => {
      if(!el || !isLeaf(el)) return;
      if(el.hasAttribute("data-zh")) return;
      const i18n = el.getAttribute("data-i18n");
      if(i18n == null) return;
      const text = String(el.textContent || "").trim();
      if(text && text === String(i18n).trim()){
        el.setAttribute("data-zh", i18n);
      }
    });
  };

  const cacheFromText = () => {
    const all = Array.from(document.querySelectorAll("body *"));
    all.forEach((el) => {
      if(!el || !isLeaf(el)) return;
      const tag = String(el.tagName || "").toLowerCase();
      if(tag === "script" || tag === "style" || tag === "noscript") return;
      if(el.hasAttribute("data-zh")) return;
      const text = String(el.textContent || "").trim();
      if(!text) return;
      if(Object.prototype.hasOwnProperty.call(TRANSLATIONS_EN, text)){
        el.setAttribute("data-zh", text);
      }
    });
  };

  const collectNodes = () => {
    cacheFromDataAttrs();
    cacheFromText();
    return Array.from(document.querySelectorAll("[data-zh]")).filter(isLeaf);
  };

  const applyTrans = (nextState) => {
    currentState = nextState === "on" ? "on" : "off";
    setStoredState(currentState);

    const nodes = collectNodes();
    const missing = [];
    const keys = new Set();

    nodes.forEach((el) => {
      const key = String(el.getAttribute("data-zh") || "").trim();
      if(!key) return;
      keys.add(key);
      if(currentState === "on"){
        const en = TRANSLATIONS_EN[key];
        if(en != null){
          el.textContent = en;
        }else{
          missing.push({
            key,
            tag: el.tagName,
            id: el.id || null,
            className: el.className || null,
          });
        }
      }else{
        el.textContent = key;
      }
    });

    const stats = {
      totalTranslatableNodes: nodes.length,
      totalKeysUsed: keys.size,
      missingCount: missing.length,
      missingKeys: missing,
    };
    window.AC_TRANS_STATS = stats;
    try{
      console.info("[AC][trans][stats]", stats);
    }catch(_){ /* ignore */ }
  };

  const init = () => {
    const btn = document.getElementById("btnTrans");
    currentState = getStoredState() || "off";
    updateToggleText(btn);

    window.AC_TRANS = window.AC_TRANS || {};
    window.AC_TRANS.isOn = () => currentState === "on";
    window.AC_TRANS.applyTrans = (state) => {
      applyTrans(state);
      updateToggleText(btn);
    };

    applyTrans(currentState);

    btn?.addEventListener("click", () => {
      currentState = currentState === "on" ? "off" : "on";
      applyTrans(currentState);
      updateToggleText(btn);
    });
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
