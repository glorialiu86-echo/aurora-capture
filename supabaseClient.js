// supabaseClient.js — Supabase client init + Magic Link auth + favorites API
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

  const hasSDK = () => {
    return !!(window.supabase && typeof window.supabase.createClient === "function");
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

  let client = null;
  const init = async () => {
    await loadLocalConfig();
    if(client) return client;
    const cfg = readConfig();
    if(!cfg.url || !cfg.anonKey) return null;
    if(!hasSDK()) return null;
    client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return client;
  };

  const isReady = async () => {
    const cfg = readConfig();
    if(!cfg.url || !cfg.anonKey) return false;
    if(!hasSDK()) return false;
    await loadLocalConfig();
    return true;
  };

  const selfCheck = async () => {
    const ready = await isReady();
    if(!ready){
      console.log(`${LOG_PREFIX} Missing config or SDK.`);
      return;
    }
    const cli = await init();
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

  const getSession = async () => {
    const cli = await init();
    if(!cli) return { session: null, error: "unavailable" };
    const { data, error } = await cli.auth.getSession();
    if(error) return { session: null, error };
    return { session: data?.session || null, error: null };
  };

  const onAuthStateChange = async (handler) => {
    const cli = await init();
    if(!cli) return null;
    return cli.auth.onAuthStateChange((event, session) => {
      try{ handler?.(event, session); }catch(_){ /* ignore */ }
    });
  };

  const sendMagicLink = async (email, redirectTo) => {
    const cli = await init();
    if(!cli) return { ok: false, error: "unavailable" };
    const { error } = await cli.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });
    if(error) return { ok: false, error };
    return { ok: true, error: null };
  };

  const signOut = async () => {
    const cli = await init();
    if(!cli) return { ok: false, error: "unavailable" };
    const { error } = await cli.auth.signOut();
    if(error) return { ok: false, error };
    return { ok: true, error: null };
  };

  const listFavorites = async (userId) => {
    const cli = await init();
    if(!cli) return { ok: false, data: [], error: "unavailable" };
    const { data, error } = await cli
      .from("favorites")
      .select("id,user_id,name,lat,lon,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if(error) return { ok: false, data: [], error };
    return { ok: true, data: Array.isArray(data) ? data : [], error: null };
  };

  const createFavorite = async (payload) => {
    const cli = await init();
    if(!cli) return { ok: false, data: null, error: "unavailable" };
    const { data, error } = await cli
      .from("favorites")
      .insert(payload)
      .select("id,user_id,name,lat,lon,created_at")
      .single();
    if(error) return { ok: false, data: null, error };
    return { ok: true, data, error: null };
  };

  const updateFavoriteName = async (id, userId, name) => {
    const cli = await init();
    if(!cli) return { ok: false, error: "unavailable" };
    const { error } = await cli
      .from("favorites")
      .update({ name })
      .eq("id", id)
      .eq("user_id", userId);
    if(error) return { ok: false, error };
    return { ok: true, error: null };
  };

  const deleteFavorite = async (id, userId) => {
    const cli = await init();
    if(!cli) return { ok: false, error: "unavailable" };
    const { error } = await cli
      .from("favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if(error) return { ok: false, error };
    return { ok: true, error: null };
  };

  window.AC_SUPABASE = {
    init,
    isReady,
    selfCheck,
    getSession,
    onAuthStateChange,
    sendMagicLink,
    signOut,
    listFavorites,
    createFavorite,
    updateFavoriteName,
    deleteFavorite
  };
})();
