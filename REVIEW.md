# REVIEW

## Round 1 — i18n 基础设施

### 本轮变更
- 新增最小 i18n 层（`i18n.js`），提供 `setLang/getLang/t/th` 与最小资源表（仅 `HDR_TITLE_BRAND`）。
- 在 `index.html` 中引入 `i18n.js`，并将 `ui.js` 的语言切换与 i18n 绑定。
- 最小 rerender：语言切换时仅更新品牌标题文本（`HDR_TITLE_BRAND`）。

### 验证步骤
1) 打开页面。
2) 点击头部 CN/EN 切换。
3) 预期：品牌标题在“极光捕手”(CN) 与 “Aurora Capture”(EN) 之间切换。

### 声明
- 未触碰任何业务逻辑。
- 未修改 UI 结构。
- `index.html` 仅新增脚本引入与挂接，未改动文本内容。
- `th()` 已实现但本轮未使用。

## Round 2 — 静态 UI Key 化

### 本轮变更
- index.html：静态文案全部改为 data-i18n 驱动，不改 DOM 结构，仅替换文本内容与添加最小属性。
- ui.js：重写 applyLang 静态渲染逻辑，基于 i18n 渲染静态文本；About/Footer 仅用 th() 注入。
- i18n.js：补齐 Round 2 静态文本资源（含 About/Footer HTML 块）。

### 验证步骤
1) 打开页面，确认无 JS 报错。
2) 点击 CN/EN 切换：tabs、标题、分级说明、alert 按钮文案随语言变化。
3) 打开 About：正文与 Footer 在切换后为对应语言（仅 About/Footer 使用 HTML 注入）。

### 声明
- 未触碰任何业务逻辑。
- 未修改 UI 结构，仅替换静态文案渲染方式。
- 非 About/Footer 文案均为 text/template 渲染，无 innerHTML 注入。

## Round 2.1 — 纠偏修补

### 本轮变更
- alert body 改为纯文本渲染（textContent），并对 `#alertBody` 启用 `white-space: pre-line` 以支持换行。
- status dots 完全改为 `DOT_LABEL_* + DOT_ICON_*` 组合渲染，移除 “云量”等裸字符串拼接。
- 全站移除 About/Footer 之外的 HTML 注入路径：`safeHTML` 改为 textContent；`openAlertOverlay` 改为纯文本；动态块使用 DOM 组装。
- 新增/补充的技术类 key 已在 Round 2 资源中体现（例如 `ABOUT_MODAL_TITLE` / `ABOUT_CLOSE_ARIA` / `STATUS_ROW_ARIA` / `T1_SW_LABEL_*`）。

### 验证步骤
1) 触发任一 alert：body 为纯文本，换行正常显示。
2) 切换 CN/EN：status dots label 随语言切换，icon 使用 DOT_ICON_*。
3) 全仓检查：除 About/Footer 外无 innerHTML 注入路径。

### 声明
- 未触碰任何业务逻辑与判断分支。
- About/Footer 仍为唯一允许的 HTML 注入点。

## Round 2.1 — dots 收敛说明
- status dots item 结构统一为 `{ level, labelKey, iconKey }`，已移除旧的 text 路径。
