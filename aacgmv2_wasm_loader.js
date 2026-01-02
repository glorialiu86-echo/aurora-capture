// aacgmv2_wasm_loader.js
// Exposes: window.AACGMV2 = { ready: Promise<void>, convertLatLon(lat, lon, altKm, dateObj) -> { mlat, mlon } }

(() => {
  // This file expects an Emscripten build output:
  //   ./aacgmv2_wasm.js
  //   ./aacgmv2_wasm.wasm
  //
  // After build, it will expose a global factory: createAACGMV2Module (see build step below).
  // We wrap it into window.AACGMV2 with a simple API.

  const state = {
    mod: null,
    ready: null,
    readyDone: false,
    err: null,
  };

  function toUnixSeconds(dateObj) {
    return Math.floor(dateObj.getTime() / 1000);
  }

  // Convert lon to [-180, 180)
  function normLon(lon) {
    let x = Number(lon);
    if (!Number.isFinite(x)) return 0;
    x = ((x + 180) % 360 + 360) % 360 - 180;
    return x;
  }

  async function init() {
    if (state.ready) return state.ready;

    state.ready = (async () => {
      if (typeof window.createAACGMV2Module !== "function") {
        throw new Error("createAACGMV2Module is not found. Did you include aacgmv2_wasm.js before this file?");
      }

      // createAACGMV2Module is the Emscripten factory
      const mod = await window.createAACGMV2Module({
        locateFile(path) {
          // Ensure .wasm loads from same dir
          if (path.endsWith(".wasm")) return "./aacgmv2_wasm.wasm";
          return path;
        },
      });

      // We expect the C wrapper to expose:
      //   double aacgmv2_mlat(double glat, double glon, double alt_km, int64_t ut_seconds);
      //   double aacgmv2_mlon(double glat, double glon, double alt_km, int64_t ut_seconds);
      //
      // Those are provided by our tiny C shim (see workflow below).
      mod._aacgmv2_mlat = mod.cwrap("aacgmv2_mlat", "number", ["number", "number", "number", "number"]);
      mod._aacgmv2_mlon = mod.cwrap("aacgmv2_mlon", "number", ["number", "number", "number", "number"]);

      state.mod = mod;
      state.readyDone = true;
    })().catch((e) => {
      state.err = e;
      throw e;
    });

    return state.ready;
  }

  function convertLatLon(lat, lon, altKm = 110, dateObj = new Date()) {
    if (!state.readyDone || !state.mod) {
      return null; // not ready yet
    }
    const glat = Number(lat);
    const glon = normLon(lon);
    const alt = Number(altKm);
    const ut = toUnixSeconds(dateObj);

    if (!Number.isFinite(glat) || !Number.isFinite(glon) || !Number.isFinite(alt) || !Number.isFinite(ut)) {
      return null;
    }

    const mlat = state.mod._aacgmv2_mlat(glat, glon, alt, ut);
    const mlon = state.mod._aacgmv2_mlon(glat, glon, alt, ut);

    if (!Number.isFinite(mlat) || !Number.isFinite(mlon)) return null;
    return { mlat, mlon };
  }

  window.AACGMV2 = {
    init,
    get ready() {
      return init();
    },
    convertLatLon,
  };

  // auto init (non-blocking)
  init().catch(() => {});
})();
