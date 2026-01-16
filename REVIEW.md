# Review Summary

## What changed
- 将 index.html 中现有版本号从 0343 统一更新为 0344

## Files touched
- Modified: index.html
- Added:
- Deleted:

## Behavior impact
- 静态资源与页脚版本号更新为 v3.0.0344，用于缓存刷新
- 明确未改变：页面结构、样式与业务逻辑

## Risk assessment
- 可能的失败模式：若有漏改版本号，缓存刷新不一致
- Performance / cost / quota impact：无
- Deployment or environment risks：无

## How to test
1. 打开页面并刷新
2. 打开开发者工具，确认静态资源 URL 携带 v=0344
3. 查看页脚版本号为 v3.0.0344

## Rollback plan
- 回滚该提交或将版本号改回 0343

## Open questions / follow-ups
- 无
