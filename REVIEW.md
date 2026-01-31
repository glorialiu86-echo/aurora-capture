# Review Summary

## What changed
- 72h 卡片在 score=1 时改用 `STATUS_C1` 作为标题 key
- 删除 `UI_72H_NOT_OBSERVABLE_TITLE` 定义，统一复用 `STATUS_C1`
- 更新本次修复的审计说明与验收点

## Files touched
- Modified: app.js, i18n.js, REVIEW.md
- Added: 
- Deleted: 

## Behavior impact
- 72h 卡片标题在“不可观测”场景下走 `STATUS_C1` 的多语言文本
- 未更改算法、阈值、分支逻辑与页面结构

## Risk assessment
- 可能风险：若 `STATUS_C1` 缺失会导致标题为空或 fallback
- 性能/成本：无变化
- 部署风险：低，仅文案 key 复用

## How to test
1. 运行一次 Run Forecast，确保 72h 卡片可渲染
2. 切换 CN/EN，确认 72h 卡片“不可观测”标题随语言变化

## Rollback plan
- 回退本次提交即可恢复为上一版本

## Open questions / follow-ups
- 无
