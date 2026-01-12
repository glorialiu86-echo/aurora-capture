// supabaseClient.js — minimal Supabase client init + self-check
(() => {
  const CONFIG_KEY = "__AC_CONFIG__";
  const URL_KEY = "SUPABASE_URL";
  const ANON_KEY = "SUPABASE_PUBLISHABLE_KEY";
  const LOG_PREFIX = "[AC Supabase]";

  const readConfig = () => {
    const base = window.__AC_PUBLIC_CONFIG__ || {};
    const override = window[CONFIG_KEY] || {};
    const cfg = { ...base, ...override };
    return {
      url: String(cfg[URL_KEY] || "").trim(),
      anonKey: String(cfg[ANON_KEY] || "").trim()
    };
  };

  let localConfigLoaded = false;
  const isLocalhost = () => {
    const host = String(window.location.hostname || "").trim();
    return host === "localhost" || host === "127.0.0.1";
  };
  const loadLocalConfig = async () => {
    if(localConfigLoaded) return;
    localConfigLoaded = true;
    if(!isLocalhost()) return;
    try{
      const res = await fetch("./config.js", { cache: "no-store" });
      if(!res.ok) return;
      const code = await res.text();
      if(!code) return;
      const fn = new Function(code);
      fn();
    }catch(_){ /* silent */ }
  };

  const hasSDK = () => {
    return !!(window.supabase && typeof window.supabase.createClient === "function");
  };

  let client = null;
  const init = () => {
    if(client) return client;
    const cfg = readConfig();
    if(!cfg.url || !cfg.anonKey) return null;
    if(!hasSDK()) return null;
    client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return client;
  };

  const selfCheck = async () => {
    await loadLocalConfig();
    const cfg = readConfig();
    if(!cfg.url || !cfg.anonKey){
      console.log(`${LOG_PREFIX} Missing config (set in config.js).`);
      return;
    }
    if(!hasSDK()){
      console.log(`${LOG_PREFIX} Supabase SDK not loaded.`);
      return;
    }
    const cli = init();
    if(!cli){
      console.log(`${LOG_PREFIX} Client init failed.`);
      return;
    }
    try{
      const { data, error } = await cli.auth.getSession();
      if(error){
        console.log(`${LOG_PREFIX} getSession error:`, error);
        return;
      }
      console.log(`${LOG_PREFIX} session:`, data?.session || null);
    }catch(err){
      console.log(`${LOG_PREFIX} getSession exception:`, err);
    }
  };

  window.AC_SUPABASE = { init, selfCheck, getClient: () => client };
})();
