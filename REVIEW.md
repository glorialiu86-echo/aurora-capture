# Review Summary

## What changed
- 强制中文系统短路翻译：zh* 环境下不触发翻译管线，状态文案保持中文
- 状态文案源稳定化：status 元素 data-i18n 固定英文母本、data-zh 固定中文母本，展示文本按规则动态渲染
- Trans OFF 回滚修复：关闭翻译后状态文本回中文，避免英文锁死/污染回滚源
- 调整 setStatusText 调用点传入 statusKey 或 null，非 key 场景使用英文母本映射

## Files touched
- Modified: app.js, trans.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- 中文系统：Trans ON/OFF 均保持全站中文，不走翻译流程
- 英文系统：Trans ON 显示英文；Trans OFF 状态文本回到中文且不再锁死
- 其他语言：Trans ON 从英文母本翻译为目标语言；Trans OFF 回中文
- 未改变预测逻辑、数据获取与渲染结构

## Risk assessment
- Possible failure modes: 非 key 状态文案若缺少英文母本映射，可能在非中文系统下回退为中文显示
- Performance / cost / quota impact: 翻译调用频次与性能不变；中文系统短路可减少翻译调用
- Deployment or environment risks: 无

## How to test
1. iOS/OS 中文环境无痕打开 → Trans ON/OFF 来回切换 + Generate/Refresh 多次 → 全站始终中文（状态词/结论分级/按钮等不出现英文）
2. iOS/OS 英文环境无痕打开（默认 ON）→ 状态/结论为英文；切 Trans OFF → 全站回中文；连续 Generate/Refresh 两次 → 状态不回英文
3. iOS/OS 其他语言（如日/法）无痕打开（默认 ON）→ 状态为目标语言且来源为英文母本翻译；切 OFF → 全站中文；再切 ON → 恢复目标语言且不漂移

## Rollback plan
- 回退本次提交或切回上一版 `staging`

## Open questions / follow-ups
- “已获取当前位置 …” 当前未覆盖英文母本映射，若需更完整英文化可补充映射
