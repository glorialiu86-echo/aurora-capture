# Review Summary

## What changed
- 72h 卡片标题改为使用 UI_72H_TITLE_C* 独立 key（不再复用 STATUS_C*）
- i18n.js 补齐 UI_72H_TITLE_C1~C5 的 zh/en 文案
- 72h 分数映射 map5 标题接线到新 key
- Geo button success toast（“已获取 ✓”）key 化：FORM_BTN_GEO_SUCCESS + app.js 接线
- 磁纬 hard-stop / strong-warn alerts 改为 ALERT_MLAT_* key 化

## Files touched
- Modified: app.js, i18n.js, REVIEW.md
- Added: 
- Deleted: 

## Behavior impact
- 72h 卡片标题在各档位使用独立 UI key，CN/EN 可随语言切换
- 未更改算法、阈值、分支逻辑与页面结构

## Risk assessment
- 可能风险：若新 key 缺失会导致标题显示占位或空字符串
- 性能/成本：无变化
- 部署风险：低，纯文案接线变更

## How to test
1. Run Forecast 后查看 72h 卡片标题是否正常显示
2. 切换 CN/EN，确认 72h 卡片标题随语言变化

## Rollback plan
- 回退本次提交即可恢复为上一版本

## Open questions / follow-ups
- Unverified：本地未执行运行时 missing key 观测

## R4-2 preflight：Upstream 与 Delivery 文案 key 化

### 变更摘要
- Upstream Status：云量行、月角行、更新时间行改用 T1_SW_* 模板 key。
- Delivery Model：Bt平台/速度背景/密度结构标签改用 T3_DELIVER_* key。

### 验证点
1) 切 EN：Upstream Status 三行不再出现中文（Unverified）。
2) 切 EN：Delivery Model 行显示英文标签（Unverified）。

## R4-2 preflight：delivery/72h 中文行 key 化

### 变更摘要
- “1/3 成立”改为 `DELIVERY_RATIO_OK` 模板 key。
- 72h 解释行标签与数值说明改为 `OUTLOOK72_*` key（含模板 value）。

### 验证点
1) 切 EN：Solar Wind Delivery Model 区域不再出现中文（Unverified）。
2) 72H Outlook 三张卡片解释行均为英文占位（Unverified）。

## R4-2 preflight A1 运行时核查
- 动作序列：CN/EN 切换、打开/关闭工具介绍、Run Forecast、点击获取当前位置、关闭 alert（X/知道了）
- 结果：A1=0（用户手动核查）

## R4-2 preflight：定位 alerts key 化
- 覆盖分支：不支持定位 / 无效坐标 / 处理异常 / 权限拒绝 / 不可用 / 超时 / 通用失败 / 异常
- 新增 key：ALERT_GEO_*（title/body/note）
- 结果：A1=0（用户手动核查）

## R4-2 E cleanup：接线已有 key（消除硬编码中文）

### 变更摘要
- swAux placeholder 移除“云 L/M/H”“月角”硬编码，保留占位符。
- 1h 主因 fallback 改为使用 REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE。
- 3h fallback label 改用 STATUS_C*（不再硬编码“值得出门/可蹲守/低概率/不可观测”）。

### 验证点
1) Run Forecast 后：1h 主因与 3h 小时卡结论在 EN 下不出现中文（Unverified）。
2) 切 CN/EN：swAux 占位不出现中文标签（Unverified）。

## R4-2 文案候选清单（扫雷证据）

### 变更摘要
- 新增 `R4-2_UI_TEXT_CANDIDATES.md` 作为中文残留候选清单（仅文档，不改代码逻辑）。

### 验证点
1) 确认新增文件已纳入版本控制。
2) 本轮无代码改动。

## R4-2 A-1：定位精度 + 时间相对 + OVATION 失败 + 云量评分

### 变更摘要
- 定位精度后缀改为 STATUS_TEXT_GEO_ACCURACY_SUFFIX（避免 EN 下中文括号/文案）。
- fmtAge 改为 UI_TIMEAGO_* 模板 key（刚刚/分钟前/小时前）。
- OVATION “失败”改为 T1_OVATION_STATUS_FAIL。
- 72h 云量评分优/中/差改为 UI_72H_CLOUD_GRADE_*。

### 验证点
1) 切 EN：不再出现“刚刚/分钟前/小时前/失败/优中差/精度约”等中文。
2) Run Forecast：72h 云量评分与定位精度后缀显示英文，console 无 missing key。

## R4-2 A-2：数据可信度与回溯文本 key 化

### 变更摘要
- 数据可信度正文改为 ALERT_DATA_CONF_BODY 模板 key（含 missText）。
- “点击查看数据可信度说明” title 改为 STATUS_TEXT_DATA_CONF_TITLE。
- V/N 回溯片段改为 T1_SW_META_BACKFILL 模板 key。

### 验证点
1) Run Forecast：数据可信度提醒弹出/提示时为英文，title 为英文。
2) 上游实况 meta 行出现 V/N 回溯时不含中文。

## R4-2 A-3：趋势提示 key 化 + debug 自查闭环

### 变更摘要
- 趋势提示改为模板 key：T1_TREND_BZ_DROP_30 / T1_TREND_BZ_DROP_15（含 drop 参数）。
- 新增 debug=1 自查钩子（仅 debug 生效）：强制展示 A-1/A-2/A-3 文案路径并输出 DOM 证据。

### 自查（静态扫描）
- 命令：`rg -n "[\\u4e00-\\u9fff]" app.js ui.js model.js index.html`
- 结果：仅命中注释与 model.js 内提示文案（F 类），无新增 UI 硬编码中文。

### 自查（运行自测，debug=1）
- 启动本地服务：`python3 -m http.server 8000`
- 触发 URL（EN + 自测注入）：
  - Trend 30min：
    `http://localhost:8000/index.html?debug=1&debugLang=en&debugAutoRun=1&debugSelfTest=1&debugAccM=35&debugMissText=v,n,bt,bz&debugBackfillMin=35&debugShowAlert=1&debugAgeMs=60000&debugTrend=30&debugCloudGrade=1&debugOvaFail=1&debugMissingCount=1`
  - Trend 15min：
    `http://localhost:8000/index.html?debug=1&debugLang=en&debugAutoRun=1&debugSelfTest=1&debugAccM=35&debugMissText=v,n,bt,bz&debugBackfillMin=35&debugShowAlert=1&debugAgeMs=60000&debugTrend=15&debugCloudGrade=1&debugOvaFail=1&debugMissingCount=1`

### 自查结果（DOM 证据摘录）
- A-1：`Location acquired (accuracy ≈ 35m)`
- A-1：`Failed`（OVATION fail）
- A-1：`5 min ago`（timeago）
- A-1：`Good`（云量评分）
- A-2：`Updated: 2026-01-31 00:00 · Freshness: mag 10m / plasma 20m · V/N backfill: 35m`
- A-2：`NOAA data format changes or missing fields: v,n,bt,bz` / `Forecast confidence is reduced; use caution.`
- A-3（trend=30）：`Trend: Bz turned south over the past 30 min (≈3.5 nT). Consider getting ready (30–60 min).`
- A-3（trend=15）：`Trend: Bz turned south quickly over the past 15 min (≈2.5 nT). Consider getting ready (30–60 min).`
- Missing key/param 计数：`[debug] i18n missing key/param: 0`（已写入 oneHeroMeta）

### 证据文件（本地）
- DOM dump：
  - `/tmp/aurora_debug_30.html`
  - `/tmp/aurora_debug_15.html`
- 截图：
  - `/tmp/aurora_debug_30.png`
  - `/tmp/aurora_debug_15.png`
