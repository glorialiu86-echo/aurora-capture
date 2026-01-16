# Review Summary

## What changed
- 将 Magic Link 登录的 redirectTo 固定为 https://www.auroracapture.com
- 移除对 staging / GitHub Pages 地址的分支判断

## Files touched
- Modified: app.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- 用户通过邮件登录后统一回跳到 www.auroracapture.com
- 明确未改变：Supabase 配置、其他业务逻辑

## Risk assessment
- 可能的失败模式：若 Supabase Redirect URLs 未包含正式域名会导致登录回跳失败
- Performance / cost / quota impact：无
- Deployment or environment risks：无

## How to test
1. 触发 Magic Link 登录并完成邮件回跳
2. 确认登录后落地到 https://www.auroracapture.com

## Rollback plan
- 回滚该提交以恢复原有回跳逻辑

## Open questions / follow-ups
- 无
