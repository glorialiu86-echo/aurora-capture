# Key Draft (Phase 1 v1.1.3) — Third Pass Hotfix

> 本文件仅为文档草案修订，不包含任何代码改动。

---

## 0) Key 命名与规则（必读）
- 不允许按语言拆 key：**禁止**使用 `_EN` / `_CN` 等语言后缀。一个 key 对应一个语义锚点，多语言在资源层提供 `zh/en`。
- 同文不同 key：相同文本出现在不同位置/语境，必须使用不同 key（按页面/区域/组件前缀拆分）。
- 文档块冻结：`UI_ABOUT_BODY` 与 `UI_FOOTER_BLOCK` 为**整块 HTML**，`type=html`，同一 key 下提供 zh/en 两整块 HTML，禁止拆分/复用句子。
- HTML 类型严格边界：`type=html` **仅允许**用于 `UI_ABOUT_BODY` 与 `UI_FOOTER_BLOCK`。除这两个 key 外，任何 UI 文案不得用 innerHTML 注入；必须使用 text/template + DOM 组合渲染。
- 含链接文本的类型策略：凡包含链接/按钮/外部跳转的说明类文案，**必须**使用 `type=template` + `params`（如 linkText/linkUrl），渲染层用 DOM 构建 `<a>`；禁止升级为 `type=html`。
- 模板标注：含插值的 key 必须标注 `type=template` 并列出 `params`（zh/en 参数名必须一致）。
- 语言无关符号规则：`DOT_ICON_*` 与 `UI_PLACEHOLDER_*` 为 **lang-neutral**。资源可只存一个值（或 zh/en 同值），并视为全局复用例外。
- DOT 拆分原则：状态点文案拆为 **label** / **icon** / **placeholder** 三类 key；原 `DOT_*_OK` 等混合 key 视为将被弃用/替换为组合。

---

## 1) Key 清单草案（分组）

### A) statusKey（结论等级，C1–C5）
> 说明：括号中文为**语义说明（非 UI 文案）**。
- STATUS_C5（强烈推荐）
- STATUS_C4（值得出门）
- STATUS_C3（可蹲守）
- STATUS_C2（低概率）
- STATUS_C1（不可观测）

### B) reasonKey（主导原因，全局池）
- REASON_CLOUD_COVER_BLOCKS（天空被云层遮挡，不利于观测）
- REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE（天色偏亮，微弱极光难以分辨）
- REASON_ENERGY_INPUT_TOO_WEAK（能量注入弱，难以形成有效极光）
- REASON_MLAT_TOO_LOW_STOP（磁纬过低，已停止生成）

### C) docBlockKey / frozen html blocks（UI 域 key）
- UI_ABOUT_BODY（type=html；frozen；同一 key 下提供 zh/en 两整块 HTML）
- UI_FOOTER_BLOCK（type=html；frozen；同一 key 下提供 zh/en 两整块 HTML）

### D) uiTextKey（所有 UI/交互/提示文字）

#### 头部/品牌
- HDR_TITLE_BRAND（Aurora Capture / 极光捕手；同一 key 下提供 zh/en）
- HDR_LOGO_ALT（Aurora Capture logo；同一 key 下提供 zh/en）
- HDR_BTN_ABOUT（📖 工具介绍 / 📖 User Guide；同一 key 下提供 zh/en）
- HDR_BTN_ABOUT_ARIA（工具介绍；同一 key 下提供 zh/en）
- HDR_LANG_TOGGLE_ARIA（Language；同一 key 下提供 zh/en）
- HDR_LANG_CN_LABEL（CN；同一 key 下提供 zh/en）
- HDR_LANG_EN_LABEL（EN；同一 key 下提供 zh/en）
- META_TITLE（<title> 文案；同一 key 下提供 zh/en）
- META_DESC（meta description；同一 key 下提供 zh/en）
- META_OG_DESC（og:description；同一 key 下提供 zh/en）

#### 输入区
- FORM_LABEL_LAT（纬度 Latitude；同一 key 下提供 zh/en）
- FORM_LABEL_LON（经度 Longitude；同一 key 下提供 zh/en）
- FORM_PLACEHOLDER_LAT（例如 53.47；同一 key 下提供 zh/en）
- FORM_PLACEHOLDER_LON（例如 122.35；同一 key 下提供 zh/en）
- FORM_BTN_GEO（📍 获取当前位置 / 📍 Get Location；同一 key 下提供 zh/en）
- FORM_BTN_RUN（✍️ 生成即时预测 / ✍️ Run Forecast；同一 key 下提供 zh/en）
- FORM_GEO_HINT_SUMMARY（推荐直接“获取当前位置”，也可手动输入经纬度；同一 key 下提供 zh/en）
- FORM_GEO_HINT_BODY_MAIN（type=template，params: link1Text, link1Url, link2Text, link2Url；同一 key 下提供 zh/en）

#### 状态区（顶部 statusRow）
- STATUS_TEXT_WAITING（等待生成。；同一 key 下提供 zh/en）
- STATUS_TEXT_READY（Ready.；同一 key 下提供 zh/en）
- STATUS_TEXT_FETCHING（拉取数据中…；同一 key 下提供 zh/en）
- STATUS_TEXT_DONE（已生成。；同一 key 下提供 zh/en）
- STATUS_TEXT_DATA_CONFIDENCE（⚠️ 数据可信度提醒；同一 key 下提供 zh/en）
- STATUS_TEXT_SW_OUTAGE（⚠️ 太阳风数据源长时间不可用：已进入弱模式（保守估算）；同一 key 下提供 zh/en）
- STATUS_TEXT_MLAT_STOP（⚠️ 磁纬过低：已停止生成。；同一 key 下提供 zh/en）
- STATUS_TEXT_GEO_FETCHING（📍 正在获取当前位置…；同一 key 下提供 zh/en）
- STATUS_TEXT_GEO_INVALID（⚠️ 定位返回无效坐标；同一 key 下提供 zh/en）
- STATUS_TEXT_GEO_SUCCESS（已获取当前位置 {acc}；type=template，params: acc；同一 key 下提供 zh/en）
- STATUS_TEXT_GEO_PROCESS_ERR（⚠️ 定位处理异常；同一 key 下提供 zh/en）
- STATUS_TEXT_GEO_UNAVAILABLE（⚠️ 无法获取定位；同一 key 下提供 zh/en）
- STATUS_TEXT_INPUT_INVALID（请先输入有效经纬度。；同一 key 下提供 zh/en）
- STATUS_TEXT_RANGE_INVALID（⚠️ 经纬度超出范围；同一 key 下提供 zh/en）
- STATUS_TEXT_SUNCALC_MISSING（关键计算模块未加载（SunCalc）。；同一 key 下提供 zh/en）
- STATUS_TEXT_RUN_ERROR（生成失败：请打开控制台查看错误。；同一 key 下提供 zh/en）

#### 状态点/小徽标（statusDots / swPill）
- DOT_LABEL_SW（太阳风；同一 key 下提供 zh/en）
- DOT_LABEL_KP（KP；同一 key 下提供 zh/en）
- DOT_LABEL_CLOUDS（云量；同一 key 下提供 zh/en）
- DOT_LABEL_OVATION（OVATION；同一 key 下提供 zh/en）
- DOT_ICON_OK（✅；lang-neutral）
- DOT_ICON_WARN（⚠️；lang-neutral）
- DOT_ICON_BAD（❌；lang-neutral）
- UI_PLACEHOLDER_DASH（—；lang-neutral）
- UI_PLACEHOLDER_ELLIPSIS（…；lang-neutral）

#### Tabs
- TAB_T1_LABEL（1小时精准 / 1H Precision；同一 key 下提供 zh/en）
- TAB_T3_LABEL（3小时预测 / 3H Window；同一 key 下提供 zh/en）
- TAB_T72_LABEL（72小时范围 / 72H Outlook；同一 key 下提供 zh/en）

#### 1小时面板（T1）
- T1_HERO_TITLE（当前建议（1小时内，10分钟粒度）；同一 key 下提供 zh/en）
- T1_UPSTREAM_TITLE（上游实况（近实时）；同一 key 下提供 zh/en）
- T1_SW_CLOUD_LINE（type=template，params: l, m, h；同一 key 下提供 zh/en）
- T1_SW_MOON_LINE（type=template，params: deg；同一 key 下提供 zh/en）
- T1_SW_META_TEMPLATE（更新时间…新鲜度…V/N回溯…；type=template，params: tsText, magAgeMin, plasmaAgeMin, backfillAgeMin；同一 key 下提供 zh/en）
- T1_CHART_TITLE（1小时 C值（Capture）柱状图；同一 key 下提供 zh/en）
- T1_CHART_SUB（C值越高，越建议投入。；同一 key 下提供 zh/en）
- T1_UNIT_10M（单位：10分钟 / Unit: 10 min；同一 key 下提供 zh/en）

#### T1 分级说明（同文不同 key）
- T1_LEVEL_TITLE（1小时预测结论分级（C值）；同一 key 下提供 zh/en）
- T1_LEVEL_C5（【C值5】强烈推荐：投入回报高，建议立即行动。；同一 key 下提供 zh/en）
- T1_LEVEL_C4（【C值4】值得出门：条件不错，建议准备与试拍。；同一 key 下提供 zh/en）
- T1_LEVEL_C3（【C值3】可蹲守：存在机会，建议架机等待触发。；同一 key 下提供 zh/en）
- T1_LEVEL_C2（【C值2】低概率：机会小，可低成本尝试。；同一 key 下提供 zh/en）
- T1_LEVEL_C1（【C值1】不可观测：当前时段不建议投入。；同一 key 下提供 zh/en）

#### T1 动作提示
- T1_ACTION_LOW（当前时段不建议投入。；同一 key 下提供 zh/en）
- T1_ACTION_MID（可尝试短时观测。；同一 key 下提供 zh/en）
- T1_ACTION_HIGH（值得出门尝试。；同一 key 下提供 zh/en）
- T1_PRIMARY_PREFIX（主要影响因素： / Primary factor:；同一 key 下提供 zh/en）

#### 3小时面板（T3）
- T3_STATE_TITLE（近期极光状态；同一 key 下提供 zh/en）
- T3_STATE_NOTE（备注：爆发 ≠ 可观测，仍受云量与天光影响。；同一 key 下提供 zh/en）
- T3_DELIVER_TITLE（太阳风送达能力综合模型；同一 key 下提供 zh/en）
- T3_DELIVER_SUMMARY（{count}/3 成立；type=template，params: count；同一 key 下提供 zh/en）
- T3_DELIVER_DETAIL（type=template，params: btIcon, speedIcon, densityIcon；同一 key 下提供 zh/en）

#### T3 分级说明（同文不同 key）
- T3_LEVEL_TITLE（3小时结论分级（C值）；同一 key 下提供 zh/en）
- T3_LEVEL_C5（【C值5】强烈推荐…；同一 key 下提供 zh/en）
- T3_LEVEL_C4（【C值4】值得出门…；同一 key 下提供 zh/en）
- T3_LEVEL_C3（【C值3】可蹲守…；同一 key 下提供 zh/en）
- T3_LEVEL_C2（【C值2】低概率…；同一 key 下提供 zh/en）
- T3_LEVEL_C1（【C值1】不可观测…；同一 key 下提供 zh/en）

#### T3 动态状态/提示（来自 model.state3h）
- T3_BURST_STATE_ACTIVE（爆发进行中；同一 key 下提供 zh/en）
- T3_BURST_STATE_RISING（爆发概率上升；同一 key 下提供 zh/en）
- T3_BURST_STATE_DECAY（爆发后衰落期；同一 key 下提供 zh/en）
- T3_BURST_STATE_QUIET（静默；同一 key 下提供 zh/en）
- T3_BURST_HINT_ACTIVE（离子触发更明确。；同一 key 下提供 zh/en）
- T3_BURST_HINT_RISING（系统更容易发生，但未到持续触发。；同一 key 下提供 zh/en）
- T3_BURST_HINT_DECAY（刚有过波动，仍可能余震一会儿。；同一 key 下提供 zh/en）
- T3_BURST_HINT_QUIET（背景不足或触发不清晰。；同一 key 下提供 zh/en）

#### 72小时面板（T72）
- T72_TITLE（72小时范围预测；同一 key 下提供 zh/en）
- T72_SUBTITLE（按天评估极光出现的可能性，用于行程与时间规划。；同一 key 下提供 zh/en）
- T72_DAY_TODAY（今天；同一 key 下提供 zh/en）
- T72_DAY_TOMORROW（明天；同一 key 下提供 zh/en）
- T72_DAY_AFTER_TOMORROW（后天；同一 key 下提供 zh/en）

#### T72 分级说明（同文不同 key）
- T72_LEVEL_TITLE（72小时结论分级（C值）；同一 key 下提供 zh/en）
- T72_LEVEL_C5（【C值5】强烈推荐：能量背景+送达能力更强，值得提前规划。；同一 key 下提供 zh/en）
- T72_LEVEL_C4（【C值4】值得出门：存在机会，重点看云与当晚即时模块。；同一 key 下提供 zh/en）
- T72_LEVEL_C3（【C值3】可蹲守：机会少，除非位置/条件极佳。；同一 key 下提供 zh/en）
- T72_LEVEL_C2（【C值2】低概率：综合偏弱，提前投入意义不大。；同一 key 下提供 zh/en）
- T72_LEVEL_C1（【C值1】不可观测：不建议投入。；同一 key 下提供 zh/en）

#### T72 动作提示
- T72_ACTION_LOW（暂不建议为此规划行程。；同一 key 下提供 zh/en）
- T72_ACTION_MID（可提前关注，临近再决定。；同一 key 下提供 zh/en）
- T72_ACTION_HIGH（值得提前规划行程。；同一 key 下提供 zh/en）

#### T72 依据明细（basisHTML）
- T72_BASIS_KP（能量背景：Kp峰值≈{kp}；type=template，params: kp；同一 key 下提供 zh/en）
- T72_BASIS_DELIVERY（送达模型：{count}/3（Bt/速度/密度）；type=template，params: count；同一 key 下提供 zh/en）
- T72_BASIS_TRIGGER（触发模型：高速风{p1a}/1 · 能量输入{p1b}/1；type=template，params: p1a, p1b；同一 key 下提供 zh/en）
- T72_BASIS_NIGHT_RATIO（夜晚占比：{percent}%；type=template，params: percent；同一 key 下提供 zh/en）
- T72_BASIS_CLOUD_BEST（云量更佳点：{detail}；type=template，params: detail；同一 key 下提供 zh/en）

#### 地理/定位流程弹窗（Alert Overlay）
- ALERT_TITLE_DATA_CONF（⚠️ 数据可信度提醒；同一 key 下提供 zh/en）
- ALERT_NOTE_DATA_CONF（不代表无法观测，仅表示模型输入存在不确定性。；同一 key 下提供 zh/en）
- ALERT_OK_BTN（知道了；同一 key 下提供 zh/en）
- ALERT_CLOSE_ARIA（关闭；同一 key 下提供 zh/en）
- ALERT_BODY_PLACEHOLDER（使用 UI_PLACEHOLDER_DASH；lang-neutral）

- ALERT_TITLE_GEO_UNAVAILABLE（📍 无法获取定位；同一 key 下提供 zh/en）
- ALERT_BODY_GEO_NOT_SUPPORTED（当前浏览器不支持定位功能…；同一 key 下提供 zh/en）
- ALERT_BODY_GEO_INVALID（定位返回的经纬度无效…；同一 key 下提供 zh/en）
- ALERT_BODY_GEO_PROCESS_ERR（定位成功返回，但处理坐标时发生异常…；同一 key 下提供 zh/en）
- ALERT_BODY_GEO_GENERIC_ERR（获取定位时发生异常…；同一 key 下提供 zh/en）
- ALERT_GEO_REASON_DEFAULT（定位失败，请重试或手动输入。；同一 key 下提供 zh/en）
- ALERT_GEO_REASON_DENIED（你拒绝了定位授权…；同一 key 下提供 zh/en）
- ALERT_GEO_REASON_UNAVAILABLE（暂时无法获取定位（信号弱/系统未开启定位服务）。；同一 key 下提供 zh/en）
- ALERT_GEO_REASON_TIMEOUT（获取定位超时，请稍后重试。；同一 key 下提供 zh/en）
- ALERT_GEO_OPTIONS_HINT（可选方案：手动输入 / 奥维地图 / 在线经纬度查询工具。；同一 key 下提供 zh/en）

- ALERT_TITLE_INPUT_INVALID（⚠️ 经纬度输入无效；同一 key 下提供 zh/en）
- ALERT_BODY_INPUT_INVALID（请输入数字格式的纬度/经度…；同一 key 下提供 zh/en）
- ALERT_FOOTER_INPUT_INVALID（示例：纬度 53.47，经度 122.35；同一 key 下提供 zh/en）

- ALERT_TITLE_RANGE_INVALID（⚠️ 经纬度超出范围；同一 key 下提供 zh/en）
- ALERT_BODY_RANGE_INVALID（你输入的是…允许范围…；type=template，params: lat, lon；同一 key 下提供 zh/en）
- ALERT_FOOTER_RANGE_INVALID（请修正后再点击生成。；同一 key 下提供 zh/en）

- ALERT_TITLE_MLAT_HARD_STOP（⚠️ 磁纬限制：不可观测；同一 key 下提供 zh/en）
- ALERT_BODY_MLAT_HARD_STOP（type=template，params: absM, thresholdM；同一 key 下提供 zh/en）
- ALERT_NOTE_MLAT_HARD_STOP（这是硬性地理限制，不是数据缺失或模型不确定性。；同一 key 下提供 zh/en）

- ALERT_TITLE_MLAT_STRONG_WARN（⚠️ 磁纬较低：仅极端事件才可能；同一 key 下提供 zh/en）
- ALERT_BODY_MLAT_STRONG_WARN（type=template，params: absM, thresholdM；同一 key 下提供 zh/en）
- ALERT_NOTE_MLAT_STRONG_WARN（提示：你仍可继续生成…；同一 key 下提供 zh/en）

#### 工程治理视图（GOV / ADMIN）
- GOV_TITLE（治理视图标题；同一 key 下提供 zh/en）
- GOV_DESC（用于审计 reasonKey 覆盖/引用；同一 key 下提供 zh/en）
- GOV_COL_REASON_KEY（列名：reasonKey；同一 key 下提供 zh/en）
- GOV_COL_ZH（列名：zh；同一 key 下提供 zh/en）
- GOV_COL_EN（列名：en；同一 key 下提供 zh/en）
- GOV_COL_USED（列名：已引用；同一 key 下提供 zh/en）
- GOV_COL_NOTES（列名：备注；同一 key 下提供 zh/en）
- GOV_FILTER_ALL（过滤：全部；同一 key 下提供 zh/en）
- GOV_FILTER_MISSING（过滤：缺失语言；同一 key 下提供 zh/en）
- GOV_FILTER_UNUSED（过滤：未被引用；同一 key 下提供 zh/en）
- GOV_EMPTY（空状态文案；同一 key 下提供 zh/en）

---

## 2) 映射点清单（Key → 消费位置/函数）

### statusKey
- STATUS_C5/4/3/2/1
  - model.js: labelByScore5 返回结论
  - app.js:
    - T1 结论：oneHeroLabel（1小时主结论）
    - T3 三卡：threeSlot{n}Conclusion
    - T72 三日卡：day{n}Conclusion
    - 72h map5（当前内嵌映射）
  - 说明：UI 展示短文案若需固定文案，应在 uiTextKey 中另行定义（按位置拆分）。

### reasonKey
- REASON_CLOUD_COVER_BLOCKS / REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE / REASON_ENERGY_INPUT_TOO_WEAK
  - model.js: explainUnobservable 返回 primary
  - app.js:
    - T1: oneBlockers（主因解释）
    - T3: threeSlot{n}Reason（低分段主因）
- REASON_MLAT_TOO_LOW_STOP
  - app.js: MLAT hard stop 路径中的 oneBlockers / threeBurst / 3h/72h reason 行

### docBlockKey（UI 域）
- UI_ABOUT_BODY
  - index.html: about modal 正文（原 aboutBodyCN/EN）
  - 渲染层: innerHTML（type=html，frozen，zh/en 两整块）
- UI_FOOTER_BLOCK
  - index.html: footer 整块
  - 渲染层: innerHTML（type=html，frozen，zh/en 两整块）

### uiTextKey（按区域）

#### 头部/品牌
- HDR_* / META_*
  - index.html: 头部按钮/品牌/aria/元信息
  - 说明：同一 key 多语言由资源层提供（无 *_EN/_CN key）

#### 输入区
- FORM_*
  - index.html: label/placeholder/buttons
  - app.js: 定位流程按钮文案（btnGeo 临时变更）
  - 说明：含链接条目统一为 template + DOM 渲染（不使用 html 注入）

#### 状态区
- STATUS_TEXT_*
  - index.html: 初始 statusText
  - app.js: 运行过程中的 setStatusText(...)

#### 状态点（DOT 拆分：label + icon + placeholder）
- DOT_LABEL_* / DOT_ICON_* / UI_PLACEHOLDER_*
  - ui.js: statusNote / fetchKp/fetchOvation/fetchClouds 返回提示
  - app.js: setStatusDots / swPill
  - 说明：原 DOT_*_OK / DOT_*_WARN / DOT_*_BAD 等混合 key 计划弃用，改为 label/icon/placeholder 组合

#### Tabs
- TAB_*
  - index.html: tabs 文案
  - ui.js: 原英文切换逻辑（将改为 key 渲染）

#### T1 面板
- T1_*
  - index.html: 标题/说明/单位等静态文本
  - app.js: 动态 oneHeroMeta / oneBlockers / swMeta
  - 说明：数值行使用 template + params，占位符使用 UI_PLACEHOLDER_*（lang-neutral）

#### T3 面板
- T3_*
  - index.html: 分级说明/标题
  - model.js: state3h 返回 state/hint（将转为 key）
  - app.js: threeState / threeBurst / threeDeliver / threeDeliverMeta

#### T72 面板
- T72_*
  - index.html: 标题/副标题/分级说明/日标签
  - app.js: day{n}Note / Basis 依据行

#### Alert Overlay
- ALERT_*
  - index.html: alert 模态结构与初始文案
  - app.js: openAlertOverlayFull(...) 各种场景

#### 工程治理视图
- GOV_*
  - 治理视图入口与列表渲染区域（reasonKey 覆盖/引用审计）
  - 说明：避免落地时出现裸字符串

