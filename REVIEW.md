# Review Summary

## What changed
- 将页面中的反馈邮箱地址替换为 maintainer@auroracapture.com
- 将 index.html 中现有版本号从 0342 统一更新为 0343

## Files touched
- Modified: index.html
- Added:
- Deleted:

## Behavior impact
- 页面展示与邮件链接指向的新维护邮箱地址
- 静态资源与页脚版本号更新为 v3.0.0343，用于缓存刷新
- 明确未改变：页面结构、样式与业务逻辑

## Risk assessment
- 可能的失败模式：若仍有遗漏旧邮箱，部分链接指向旧地址
- 可能的失败模式：若有漏改版本号，缓存刷新不一致
- Performance / cost / quota impact：无
- Deployment or environment risks：无

## How to test
1. 打开页面并滚动到包含联系方式的位置
2. 点击邮箱链接并确认邮件客户端地址为 maintainer@auroracapture.com
3. 观察页面展示的邮箱文本为 maintainer@auroracapture.com
4. 打开开发者工具，确认静态资源 URL 携带 v=0343
5. 查看页脚版本号为 v3.0.0343

## Rollback plan
- 回滚该提交或将邮箱地址与版本号改回原值

## Open questions / follow-ups
- 无
