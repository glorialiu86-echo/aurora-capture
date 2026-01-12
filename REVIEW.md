# Review Summary

## What changed
- setStatusText 统一维护 data-i18n 英文母本与 data-zh 中文母本
- 中文系统或 Trans OFF 时，状态词强制写回中文 textContent
- 非中文且 Trans ON 时，状态词显示英文母本并保留翻译输入
- index.html 版本号 0335 更新为 0336（缓存与页脚展示）

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
1. 将系统语言设置为中文，分别切换 Trans ON/OFF，观察状态词始终为中文
2. 将系统语言设置为英文，Trans ON 观察状态词为英文母本，Trans OFF 观察状态词强制为中文
3. 将系统语言设置为非中非英，Trans ON 观察状态词以英文母本作为翻译输入，Trans OFF 观察状态词为中文
4. 打开页面，确认资源 URL 与页脚版本号显示为 0336

## Rollback plan
- 回滚本次提交或切回上一个版本分支

## Open questions / follow-ups
- 暂无
