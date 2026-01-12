# Review Summary

## What changed
- 版本号从 0334 升级到 0335（仅更新 index.html 既有位置）
- 纳入本次提交的 AGENTS.md 变更

## Files touched
- Modified: index.html, AGENTS.md, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- 资源缓存版本号更新，页面底部版本文案同步更新
- 功能行为未变

## Risk assessment
- Possible failure modes: 版本号漏改导致缓存未更新
- Performance / cost / quota impact: 无
- Deployment or environment risks: 无

## How to test
1. 打开页面并强制刷新 → 资源 URL 的 ?v=0335 生效，页脚版本显示 v3.0.0335
2. 正常浏览与生成流程 → 页面功能不受影响

## Rollback plan
- 回退本次提交或切回上一版 `staging`

## Open questions / follow-ups
- None
