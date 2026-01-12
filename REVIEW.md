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
5. 可选证据：控制台执行 window.AC_DEBUG=true，触发状态词变化，观察输出字段 sysLang/sysIsZh/transOn/sourceTag

## Rollback plan
- 回滚本次提交或切回上一个版本分支

## Open questions / follow-ups
- 暂无
