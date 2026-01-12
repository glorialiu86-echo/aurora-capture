# Review Summary

## What changed
- 新增本地登录 stub（无邮箱输入/无网络）解锁收藏与收藏夹
- 新增收藏数据结构与本地持久化，并通过 provider 层封装便于后续接后端
- 经纬度输入移除默认值，加入本地回填（不自动触发预测）
- 底部按钮区状态机与收藏入口/弹层完成
- 预测主流程与计算逻辑保持不变
- 明确不做：长按交互、地图预览、搜索/分组/排序、捐赠/联系方式
- 更新 index.html 版本号 0324 → 0325

## Files touched
- Modified: index.html, style.css, app.js, trans.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed: 新增收藏地点与收藏夹 UI；登录提示弹窗；按钮区状态机；经纬度输入回填
- What explicitly did NOT change: 预测主流程/模型计算不变；不新增教学引导/动画；不做跨设备同步（仅本机存储）

## Risk assessment
- Possible failure modes: 收藏/登录状态存储异常导致按钮/弹层状态不一致
- Performance / cost / quota impact: 本地存储读写增加，影响可忽略
- Deployment or environment risks: 无（仅前端变更，且不涉及网络请求）

## How to test
1. 新设备访问：经纬度输入为空，仅显示「📍 获取当前位置」「✍️ 生成即时预测」
2. 获取定位一次后：按钮变为「📍 获取」「⭐ 收藏」「✍️ 生成即时预测」，刷新后仍保持拆分态
3. 未登录点击「⭐ 收藏」或「🌟 收藏夹」：弹出登录提示；点击“登录/注册”后进入模拟已登录状态
4. 已登录收藏一个地点：在收藏夹列表可见，可重命名/删除；点击条目回填经纬度并关闭弹层
5. 刷新页面：经纬度自动回填，但不自动触发预测

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- 未来接入真实邮箱登录时的 authProvider / storageProvider 接口细节待确认
