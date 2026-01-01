// Aurora Decision v2.1
// - Tabs UI
// - 1h/3h 更宽松（避免全0/静默）
// - 1h 去掉分解列
// - UI 文案不出现 P1/P2

const $ = (id) => document.getElementById(id);

const H1_MINUTES = 60;
const H1_STEP = 10;
const DAYS = 3;

function setStatus(s){ $('status').textContent = s; }
function setNote(s){ $('note').textContent = s || ''; }

function pad(n){ return String(n).padStart(2,'0'); }
function fmtLocal(d){
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fmtHM(d){ return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function addMin(d, m){ return new Date(d.getTime() + m*60000); }
function addHour(d, h){ return new Date(d.getTime() + h*3600000); }

function cacheSet(key, obj){ try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{} }
function cacheGet(key){ try{ const t=localStorage.getItem(key); return t?JSON.parse(t):null; }catch{ return null; } }
function fmtAge(ms){
  const m = Math.round(ms/60000);
  if (m < 60) return `${m} 分钟前`;
  const h = m/60;
  return `${h.toFixed(h < 10 ? 1 : 0)} 小时前`;
}

async function fetchJSONWithFallback(url, label, cacheKey, notes){
  const now = Date.now();
  try{
    const res = await fetch(url, { cache:'no-store' });
    if(!res.ok) throw new Error(String(res.status));
    const text = await res.text();
    if(!text) throw new Error('empty');
    const data = JSON.parse(text);
    cacheSet(cacheKey, { ts: now, data });
    notes.push(`✅ ${label} 已更新`);
    return { data, ts: now, stale:false };
  }catch(e){
    const c = cacheGet(cacheKey);
    if(c?.data){
      notes.push(`⚠️ ${label}接口暂时无法拉取目前数据，将使用此前最新数据做解析（${fmtAge(now-c.ts)}）`);
      return { data:c.data, ts:c.ts, stale:true };
    }
    notes.push(`❌ ${label}接口无法拉取，且本地无历史缓存`);
    return { data:null, ts:null, stale:true };
  }
}

// ---------- NOAA ----------
async function fetchOvation(notes){
  const url = 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json';
  const r = await fetchJSONWithFallback(url, 'OVATION(30–90min)', 'cache_ovation_latest', notes);
  return r.data || null;
}

async function fetchSWPC2h(notes){
  const magUrl = 'https://services.swpc.noaa.gov/products/solar-wind/mag-2-hour.json';
  const plasmaUrl = 'https://services.swpc.noaa.gov/products/solar-wind/plasma-2-hour.json';

  const magR = await fetchJSONWithFallback(magUrl, 'NOAA磁场', 'cache_mag_2h', notes);
  const plaR = await fetchJSONWithFallback(plasmaUrl, 'NOAA等离子体', 'cache_plasma_2h', notes);
  if(!magR.data || !plaR.data) return null;

  const mag = magR.data, plasma = plaR.data;
  const magH = mag[0], plaH = plasma[0];

  const magRows = mag.slice(1).map(row => Object.fromEntries(magH.map((k,i)=>[k,row[i]])));
  const plaRows = plasma.slice(1).map(row => Object.fromEntries(plaH.map((k,i)=>[k,row[i]])));

  const map = new Map();
  for(const r of magRows){
    const t = r.time_tag || r.time || r.timestamp;
    if(!t) continue;
    if(!map.has(t)) map.set(t, { time: new Date(t+'Z') });
    map.get(t).bt = Number(r.bt);
    map.get(t).bz = Number(r.bz_gsm ?? r.bz);
  }

  // 更健壮：速度/密度字段名可能不同
  const pick = (obj, keys) => {
    for(const k of keys){
      const v = obj[k];
      if(v !== undefined && v !== null && v !== '') return Number(v);
    }
    return NaN;
  };

  for(const r of plaRows){
    const t = r.time_tag || r.time || r.timestamp;
    if(!t) continue;
    if(!map.has(t)) map.set(t, { time: new Date(t+'Z') });
    map.get(t).v = pick(r, ['speed','flow_speed','V','v']);
    map.get(t).n = pick(r, ['density','proton_density','N','n']);
  }

  const series = Array.from(map.values())
    .filter(x => x.time instanceof Date && !isNaN(x.time))
    .sort((a,b)=>a.time-b.time);

  return { series };
}

async function fetchKpForecast(notes){
  const url = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json';
  const r = await fetchJSONWithFallback(url, 'Kp三日预报', 'cache_kp_3day', notes);
  return r.data || null;
}

// ---------- 云量 ----------
async function fetchClouds3Days(lat, lon, notes){
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('hourly', 'cloud_cover_low,cloud_cover_mid,cloud_cover_high');
  url.searchParams.set('forecast_days', String(DAYS));
  url.searchParams.set('timezone', 'auto');

  const r = await fetchJSONWithFallback(url.toString(), '云量', 'cache_cloud_3d', notes);
  const j = r.data;
  if(!j?.hourly?.time) return null;

  const h = j.hourly;
  return h.time.map((t,i)=>({
    timeLocal: new Date(t),
    low: Number(h.cloud_cover_low?.[i] ?? NaN),
    mid: Number(h.cloud_cover_mid?.[i] ?? NaN),
    high:Number(h.cloud_cover_high?.[i] ?? NaN),
  }));
}

// ---------- helpers ----------
function mean(arr){
  const v = arr.filter(x=>Number.isFinite(x));
  if(!v.length) return NaN;
  return v.reduce((a,b)=>a+b,0)/v.length;
}
function std(arr){
  const v = arr.filter(x=>Number.isFinite(x));
  if(v.length<2) return NaN;
  const m = mean(v);
  const s2 = v.reduce((a,b)=>a+(b-m)*(b-m),0)/(v.length-1);
  return Math.sqrt(s2);
}

// ---------- OVATION point ----------
function ovationValueAt(ovation, lat, lon){
  if(!ovation?.coordinates?.length) return NaN;
  const lonN = ((lon % 360) + 360) % 360;
  const lonI = Math.round(lonN);
  const latI = Math.round(lat);
  if(latI < -90 || latI > 90) return NaN;
  const idx = (latI + 90) * 360 + lonI;
  const p = ovation.coordinates[idx]?.[2];
  return Number(p);
}

// ---------- features ----------
function computeFeatures(series){
  if(!series?.length) return null;
  const last = series[series.length-1];
  const t0 = last.time;

  const w120 = series.filter(x => (t0 - x.time) <= 120*60*1000);
  const w60  = series.filter(x => (t0 - x.time) <= 60*60*1000);

  // Bz 连续分钟（<=-2）
  let bzMinutes = 0;
  for(let i=w120.length-1;i>=0;i--){
    const bz = w120[i].bz;
    if(!Number.isFinite(bz)) break;
    if(bz <= -2) bzMinutes++;
    else break;
  }

  // Bz 触及次数（<= -1.0，放宽一点）
  const bzTouches = w60.filter(x => Number.isFinite(x.bz) && x.bz <= -1.0).length;

  // 锯齿：60分钟内符号翻转次数
  let flips = 0;
  let prev = null;
  for(const x of w60){
    if(!Number.isFinite(x.bz)) continue;
    const s = x.bz >= 0 ? 1 : -1;
    if(prev !== null && s !== prev) flips++;
    prev = s;
  }
  const bzSaw = flips >= 7;

  const btArr = w60.map(x=>x.bt);
  const vArr  = w60.map(x=>x.v);
  const nArr  = w60.map(x=>x.n);

  const btMean = mean(btArr);
  const btStd  = std(btArr);
  const vMean  = mean(vArr);
  const nMean  = mean(nArr);

  // 平台：更宽松（均值>=5.5 & std<=1.8）
  const btPlatform = (btMean >= 5.5) && (btStd <= 1.8);

  // 速度：更宽松（>=400）
  const vOk = vMean >= 400;

  // 密度：更宽松（均值>=1.6 或 60min 内有一些 >=3）
  const nBack = nMean >= 1.6;
  const nRebounds = w60.filter(x=>Number.isFinite(x.n) && x.n >= 3).length >= 4;

  const hadStrongBz = w60.some(x=>Number.isFinite(x.bz) && x.bz <= -4);

  return {
    now:last,
    t0,
    bzMinutes,
    bzTouches,
    bzSaw,
    btMean, btStd, btPlatform,
    vMean, vOk,
    nMean, nBack, nRebounds,
    hadStrongBz
  };
}

// ---------- 3h state machine（更松：静默更少） ----------
function classifyState(f){
  if(!f?.now) return { state:'未知', reason:['缺少近实时太阳风数据'] };

  const { bzMinutes, btPlatform, vOk, nBack, nRebounds, bzSaw, bzTouches, hadStrongBz } = f;

  // “太阳风送达能力综合模型” = 三项中满足 >=2 项即可算“基本就绪”
  const p2Count = (btPlatform?1:0) + (vOk?1:0) + ((nBack||nRebounds)?1:0);
  const deliverReady = p2Count >= 2;

  // 爆发进行中（放宽：连续>=8min 或 当前Bz<=-3）
  if(deliverReady && (bzMinutes >= 8 || (Number.isFinite(f.now.bz) && f.now.bz <= -3))){
    return {
      state:'爆发进行中',
      reason:[
        `触发成立：Bz南向持续≈${bzMinutes}min（或出现更强南向）`,
        `太阳风送达能力综合模型：${p2Count}/3 成立`,
        `锯齿：${bzSaw ? '偏明显（但仍在爆发态）' : '不明显'}`
      ]
    };
  }

  // 衰落期（曾强南向，但当前不再持续，且方向/平台开始松散）
  if((hadStrongBz || bzTouches >= 18) && bzMinutes < 2 && (bzSaw || !btPlatform)){
    return {
      state:'爆发后衰落期',
      reason:[
        `近1h 发生过较强南向/频繁触及（触及≈${bzTouches}）`,
        `当前连续南向不足（≈${bzMinutes}min）`,
        `平台/方向趋于松散（锯齿或平台破坏）`
      ]
    };
  }

  // 概率上升（更松：送达基本就绪 + 触及>=6）
  if(deliverReady && bzTouches >= 6){
    return {
      state:'爆发概率上升',
      reason:[
        `太阳风送达能力综合模型：${p2Count}/3 成立（“更容易发生”）`,
        `Bz 近1h 多次触及南向（触及≈${bzTouches}）`,
        `尚未形成持续触发（连续<8min）`
      ]
    };
  }

  // 静默（更严格：送达不就绪 或 Bz 触及很少）
  return {
    state:'静默',
    reason:[
      `太阳风送达能力综合模型：${p2Count}/3（不足以支撑爆发态）`,
      `Bz 触及南向偏少（≈${bzTouches}）`,
      `建议：只在出现持续南向时再提高关注`
    ]
  };
}

// ---------- 1h scoring（更松 + 5档结论） ----------
function clamp(x,a,b){ return Math.max(a, Math.min(b, x)); }

function scoreTo5(score10){
  // score10: 0..10
  if(score10 >= 8.5) return '强烈推荐';
  if(score10 >= 6.8) return '值得出门';
  if(score10 >= 5.0) return '可蹲守';
  if(score10 >= 3.0) return '低概率';
  return '不建议';
}

function score1h(prob, f, minutesAhead){
  // 更松的底盘：OVATION 不再“0就全0”
  // - OVATION 映射：prob=30 -> 10分（更不苛刻）
  const ovBase = Number.isFinite(prob) ? clamp((prob/30)*10, 0, 10) : 0;

  // 背景底盘：如果送达能力在（哪怕 OVATION 低），给 2~4 分底盘
  let floor = 0;
  if(f?.btPlatform || f?.vOk) floor = 2.0;
  if((f?.btPlatform && f?.vOk) || (f?.nBack || f?.nRebounds)) floor = 3.0;
  if((f?.bzTouches ?? 0) >= 10) floor = Math.max(floor, 3.6);

  let base = Math.max(ovBase, floor);

  // 触发加成：更松
  let trigger = 0;
  if(f?.bzMinutes >= 8 && (f?.now?.bz ?? 0) <= -2) trigger += 2.2;
  else if((f?.bzTouches ?? 0) >= 8) trigger += 1.4;
  else if((f?.bzTouches ?? 0) >= 4) trigger += 0.8;

  if(f?.bzSaw) trigger -= 0.6;

  // 时间衰减：更慢一点（更“宽松好看”）
  const decay = Math.exp(-minutesAhead / 55);

  let s = base + trigger * decay;
  s = clamp(s, 0, 10);

  return {
    score10: Number(s.toFixed(1)),
    level5: scoreTo5(s)
  };
}

function getCSS(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function dotColorBy5(level){
  if(level === '强烈推荐') return getCSS('--g3');
  if(level === '值得出门') return getCSS('--g2');
  if(level === '可蹲守') return getCSS('--g1');
  if(level === '低概率') return getCSS('--y1');
  return getCSS('--r2');
}

// ---------- 72h summarize ----------
function parseKpForecast(kpJson){
  if(!Array.isArray(kpJson) || kpJson.length < 2) return [];
  const header = kpJson[0];
  const rows = kpJson.slice(1).map(r => Object.fromEntries(header.map((k,i)=>[k,r[i]])));
  return rows.map(r => ({
    time: new Date((r.time_tag || r.time || r.timestamp) + 'Z'),
    kp: Number(r.kp ?? r.Kp ?? r['Kp Index'] ?? NaN)
  })).filter(x => x.time instanceof Date && !isNaN(x.time) && Number.isFinite(x.kp));
}

function dayKey(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

function cloudWindowScore(hour){
  // 低云一票否决（<=10 才算窗口）
  if(!Number.isFinite(hour.low) || hour.low > 10) return -1;
  let s = 0;
  if(Number.isFinite(hour.mid))  s += hour.mid <= 35 ? 1 : (hour.mid <= 50 ? 0.5 : 0);
  if(Number.isFinite(hour.high)) s += hour.high <= 65 ? 1 : (hour.high <= 80 ? 0.5 : 0);
  return s; // 0..2
}

function summarize72h(kpSeries, clouds){
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0);

  const days = [];
  for(let i=0;i<DAYS;i++){
    const d0 = addHour(start, i*24);
    const key = dayKey(d0);

    const kpMax = Math.max(...kpSeries.filter(x => dayKey(x.time)===key).map(x=>x.kp), -Infinity);
    const kpVal = Number.isFinite(kpMax) ? kpMax : NaN;

    const dayClouds = (clouds||[]).filter(x => dayKey(x.timeLocal)===key);
    let best = null;
    for(const h of dayClouds){
      const s = cloudWindowScore(h);
      if(s < 0) continue;
      if(!best || s > best.s) best = { s, h };
    }

    // 72h 只表达“范围可能性”
    let chance = '低可能';
    let explain = [];

    if(Number.isFinite(kpVal)){
      if(kpVal >= 6) chance = '可能性高';
      else if(kpVal >= 5) chance = '有窗口';
      else if(kpVal >= 4) chance = '小概率';
      else chance = '低可能';
      explain.push(`Kp 预报峰值≈${kpVal.toFixed(1)}（代表能量背景强弱）`);
    }else{
      explain.push('Kp 预报缺失（按低可能处理）');
    }

    if(best){
      explain.push(`云量更优时段：${fmtHM(best.h.timeLocal)}（Low=${best.h.low} Mid=${best.h.mid} High=${best.h.high}）`);
    }else{
      explain.push('云量窗口较差：未找到低云≤10%的小时（更像“拍不到”）');
    }

    days.push({ date:key, chance, explain });
  }
  return days;
}

// ---------- render ----------
function render1h(lat, lon, ovation, f){
  const box = $('out1h');
  const now = new Date();
  const prob = ovationValueAt(ovation, lat, lon);

  const rows = [];
  for(let m=0;m<=H1_MINUTES;m+=H1_STEP){
    const t = addMin(now, m);
    const r = score1h(prob, f, m);
    rows.push({ t, ...r });
  }

  // “当前建议”用第一个格子（+0min）放大显示
  const head = rows[0] || { score10:0, level5:'不建议' };

  box.innerHTML = `
    <div class="row">
      <div class="kpi">
        <div class="t">当前建议（1小时内，10分钟粒度）</div>
        <div class="v">${head.level5} <span class="pill" style="margin-left:10px">≈${head.score10}/10</span></div>
        <div class="s">本地时间：${fmtLocal(now)} ｜ 当前位置 OVATION 近似概率：${Number.isFinite(prob)?`${prob}%`:'—'}</div>
      </div>

      <div class="kpi">
        <div class="t">实时太阳风（近实时）</div>
        <div class="v">${f?.now ? `V ${Number.isFinite(f.now.v)?f.now.v:'—'} ｜ Bt ${Number.isFinite(f.now.bt)?f.now.bt:'—'} ｜ Bz ${Number.isFinite(f.now.bz)?f.now.bz:'—'} ｜ N ${Number.isFinite(f.now.n)?f.now.n:'—'}` : '—'}</div>
        <div class="s">${f ? `Bz连续南向≈${f.bzMinutes}min ｜ 触及≈${f.bzTouches} ｜ 锯齿:${f.bzSaw?'是':'否'}` : '缺少太阳风数据'}</div>
      </div>
    </div>

    <table class="table" style="margin-top:10px">
      <thead>
        <tr>
          <th>时间（本地）</th>
          <th>结论（5档）</th>
          <th>参考分(0-10)</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(x=>`
          <tr>
            <td class="time">${fmtLocal(x.t)}</td>
            <td class="judge">
              <span class="badge"><span class="dot" style="background:${dotColorBy5(x.level5)}"></span>${x.level5}</span>
            </td>
            <td><span class="pill">${x.score10}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function render3h(stateObj, f){
  const box = $('out3h');

  const color =
    stateObj.state.includes('进行中') ? getCSS('--g3') :
    stateObj.state.includes('上升') ? getCSS('--g2') :
    stateObj.state.includes('衰落') ? getCSS('--y1') :
    stateObj.state.includes('静默') ? getCSS('--r2') : getCSS('--g0');

  const p2Count = f ? ((f.btPlatform?1:0) + (f.vOk?1:0) + ((f.nBack||f.nRebounds)?1:0)) : 0;

  box.innerHTML = `
    <div class="row">
      <div class="kpi">
        <div class="t">当前系统状态（未来3小时不分分钟）</div>
        <div class="v"><span class="badge"><span class="dot" style="background:${color}"></span>${stateObj.state}</span></div>
        <div class="s">
          ${stateObj.reason.map(x=>`• ${x}`).join('<br/>')}
        </div>
      </div>

      <div class="kpi">
        <div class="t">太阳风送达能力综合模型（用于“更容易发生的状态”）</div>
        <div class="v">${f ? `${p2Count}/3 成立` : '—'}</div>
        <div class="s">
          ${f ? `Bt平台:${f.btPlatform?'✅':'⚠️'}（均值≈${Number.isFinite(f.btMean)?f.btMean.toFixed(1):'—'}） ｜ 速度背景:${f.vOk?'✅':'⚠️'}（≈${Number.isFinite(f.vMean)?f.vMean.toFixed(0):'—'}） ｜ 密度结构:${(f.nBack||f.nRebounds)?'✅':'⚠️'}（≈${Number.isFinite(f.nMean)?f.nMean.toFixed(1):'—'}）`
          : '缺少太阳风数据'}
        </div>
      </div>
    </div>
  `;
}

function render72h(days){
  const box = $('out72h');
  box.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>日期（本地）</th>
          <th>结论</th>
          <th>依据（人话）</th>
        </tr>
      </thead>
      <tbody>
        ${days.map(d=>`
          <tr>
            <td class="time">${d.date}</td>
            <td class="judge">
              <span class="badge"><span class="dot" style="background:${
                d.chance.includes('高')?getCSS('--g3'):
                d.chance.includes('窗口')?getCSS('--g2'):
                d.chance.includes('小')?getCSS('--y1'):getCSS('--r2')
              }"></span>${d.chance}</span>
            </td>
            <td style="text-align:left">${d.explain.map(x=>`• ${x}`).join('<br/>')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderExplain(){
  const box = $('explain');
  box.innerHTML = `
    <h3>说明（小字）</h3>
    <ul>
      <li><b>1小时精准</b>：以 OVATION nowcast 为“底盘”，叠加近实时磁场触发，输出 10 分钟粒度的 5 档结论。</li>
      <li><b>3小时概率态</b>：不预测时间点，只判断系统状态：静默 / 概率上升 / 进行中 / 衰落期。</li>
      <li><b>72小时范围</b>：按天只给“可能性”，结合 <b>日冕洞与日冕物质抛射模型</b>（用 Kp 三日预报作为能量背景代理）与 <b>太阳风送达能力综合模型</b>（简化表达），再叠加云量窗口（低云一票否决）。</li>
    </ul>
  `;
}

// ---------- Tabs ----------
function switchTab(id){
  document.querySelectorAll('.tab').forEach(b=>{
    b.classList.toggle('active', b.dataset.tab === id);
  });
  document.querySelectorAll('.panel').forEach(p=>{
    p.classList.toggle('active', p.id === id);
  });
}

// ---------- main run ----------
async function run(){
  const lat = Number($('lat').value);
  const lon = Number($('lon').value);
  if(!Number.isFinite(lat) || lat < -90 || lat > 90){ setStatus('纬度应在 -90 到 90'); return; }
  if(!Number.isFinite(lon) || lon < -180 || lon > 180){ setStatus('经度应在 -180 到 180'); return; }

  $('run').disabled = true;
  setStatus('拉取数据中…');
  setNote('');

  try{
    const notes = [];
    const [ovation, swpc, kpJ, clouds] = await Promise.all([
      fetchOvation(notes),
      fetchSWPC2h(notes),
      fetchKpForecast(notes),
      fetchClouds3Days(lat, lon, notes),
    ]);

    setNote(notes.join('｜'));

    const f = swpc?.series ? computeFeatures(swpc.series) : null;

    // ① 1h
    if(ovation){
      render1h(lat, lon, ovation, f);
    }else{
      $('out1h').innerHTML = 'OVATION 数据不可用（无缓存则无法生成 1 小时精准预测）。';
    }

    // ② 3h
    const st = classifyState(f);
    render3h(st, f);

    // ③ 72h
    const kpSeries = kpJ ? parseKpForecast(kpJ) : [];
    const days = summarize72h(kpSeries, clouds);
    render72h(days);

    renderExplain();
    setStatus(`完成｜本地时间：${fmtLocal(new Date())}`);
  }catch(e){
    setStatus(`异常：${String(e?.message || e)}`);
  }finally{
    $('run').disabled = false;
  }
}

function swapLatLon(){
  const a = $('lat').value;
  $('lat').value = $('lon').value;
  $('lon').value = a;
}

window.addEventListener('DOMContentLoaded', ()=>{
  // tabs
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>switchTab(btn.dataset.tab));
  });

  $('run').addEventListener('click', run);
  $('swap').addEventListener('click', swapLatLon);

  // 默认测试点（你可改）
  $('lat').value = '53.47';
  $('lon').value = '122.35';

  renderExplain();
});
