# Review Summary

## What changed
- setStatusText 统一维护 data-i18n 英文母本与 data-zh 中文母本
- 中文系统或 Trans OFF 时，状态词强制写回中文 textContent
- 非中文且 Trans ON 时，状态词显示英文母本并保留翻译输入
- trans.js 在中文系统与 Trans OFF 分支强制回写状态词中文
- index.html 版本号 0336 更新为 0337（缓存与页脚展示）

## Files touched
- Modified: app.js, index.html, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- 中文系统无论 Trans ON/OFF，状态词始终中文
- 非中文系统：Trans ON 显示英文母本并可走翻译链路；Trans OFF 强制中文
- 更新静态资源缓存版本号与页脚显示版本号
- 未改动预测、翻译主流程与其他 UI 行为

## Risk assessment
- 可能的失败模式：data-zh 为空时状态词为空
- 性能/成本/配额影响：无
- 部署或环境风险：仅涉及缓存版本变化

## How to test
1. 无痕窗口打开页面，确认资源 URL 与页脚版本号显示为 0337
2. 强刷页面（hard reload / 清缓存），再次确认资源 URL 与页脚版本号为 0337
3. 语言策略验收矩阵（系统语言以 navigator.language 判定）：
   - zh + Trans OFF：状态词为中文（#statusText 与 [data-status-key]），其他 UI 不翻译
   - zh + Trans ON：状态词为中文（#statusText 与 [data-status-key]），其他 UI 不翻译
   - non-zh + Trans ON：状态词为英文母本或目标语言（翻译输入为 data-i18n），其他 UI 允许翻译
   - non-zh + Trans OFF：状态词为中文（#statusText 与 [data-status-key]），其他 UI 不翻译
4. 每条矩阵断言下，连续两次 Generate/Refresh，不刷新页面，状态词保持正确语言
5. non-zh + Trans OFF：连续两次 Generate/Refresh（不刷新页面）后，状态词必须保持中文，不得回流英文
6. non-zh + Trans ON：placeholder（lat/lon/name）应翻译为目标语言；aria-label（关闭/数据状态）应翻译
7. non-zh + Trans OFF：placeholder 与 aria-label 必须回滚中文（不刷新页面连续操作两次也要稳定）
8. 可选证据：控制台执行 window.AC_DEBUG=true，触发状态词变化，观察输出字段 sysLang/sysIsZh/transOn/sourceTag

## Rollback plan
- 回滚本次提交或切回上一个版本分支

## Open questions / follow-ups
- 未翻译文案清单（待补齐）
- Type: runtime:setStatusText | Anchor: setStatusText() | Example: “📍 正在获取当前位置…”, “⚠️ 无法获取定位”
- Type: runtime:alertOverlay | Anchor: openAlertOverlayFull() | Example: “📍 无法获取定位”, “定位返回的经纬度无效，请重试或手动输入。” ✅
- Type: runtime:buttonText | Anchor: flashGeoButtonSuccess() | Example: “已获取 ✓”, “📍 获取当前位置” ✅
- Type: runtime:buttonText | Anchor: updateActionRow() | Example: “📍 刷新定位”, “✍️ 生成预测” ✅
- Type: runtime:setStatusText | Anchor: fillCurrentLocation() | Example: “⚠️ 定位处理异常”, “📍 定位失败”
- Type: runtime:setFormError | Anchor: setFormError() | Example: “请输入正确的邮箱。”, “该地点已在收藏中，如需修改请先删除后重建。” ✅
- Type: static:domText | Anchor: .label (纬度/经度) | Example: “纬度 Latitude”, “经度 Longitude” ✅
- Type: static:domText | Anchor: #favEmpty | Example: “还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏”
- Type: attr:i18n | Anchor: #lat/#lon | Example: placeholder “例如 53.47”, “例如 122.35” ✅
- Type: attr:i18n | Anchor: [aria-label="关闭"] | Example: aria-label “关闭” ✅
