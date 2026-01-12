# Review Summary

## What changed
- Updated split-state button copy for clearer labels (refresh location/save address/generate prediction)
- Added new i18n mappings for the split-state button labels
- Bumped cache/version tokens in index.html from 0325 to 0326

## Files touched
- Modified: index.html, app.js, trans.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed: Only the split-state button text changed after a successful geolocation
- What explicitly did NOT change: Initial-state button copy, prediction flow, favorites/login logic, and layout behavior

## Risk assessment
- Possible failure modes: Inconsistent label if translation toggle fails
- Performance / cost / quota impact: None
- Deployment or environment risks: Low (static asset version bump only)

## How to test
1. Fresh device: confirm buttons show “📍 获取当前位置” and “✍️ 生成即时预测”
2. Get location once: buttons switch to “📍 刷新定位 / ⭐ 收藏地址 / ✍️ 生成预测”
3. Refresh page: split-state labels persist
4. Toggle translation: split-state labels still translate

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
