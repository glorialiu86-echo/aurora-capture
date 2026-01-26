# Review Summary

## 0. 本次变更一句话
- 对齐 model.js 的 C 值分级中文为 canonical，并补记验证方式

## 1. 改动范围（Scope）

### 1.1 改了什么
- `model.js`：将 C 值 2 文案从“低概率”改为 canonical “希望不大”
- `AUDIT_i18n_stoploss_v0.md`：追加本轮锚点执行记录与 Pages 验证说明
- `REVIEW.md`：更新本轮变更摘要

### 1.2 明确没改什么（Hard No）
- 未修改任何翻译映射逻辑或翻译开关机制
- 未改动 index.html / app.js / ui.js / trans.js
- 未变更任何业务逻辑或计算规则

## 2. 行为变化（Behavior Change）
- Before：C 值 2 文案为“低概率”
  After：C 值 2 文案为“希望不大”

## 3. 风险与护栏（Risk & Guardrails）
- 风险：仅文案层面的对齐误差
- 触发条件：canonical 文案定义变更未同步
- 护栏：以 trans-zh-en.md 为唯一 canonical，Pages 手动验证

## 4. 验收清单（Acceptance Checklist）
- [ ] staging 页面 Trans on/off 切换正常
- [ ] 控制台 `window.AC_TRANS_STATS.missingCount` 为 0
- [ ] C 值 2 文案显示为“希望不大”

## 5. 回滚方案（Rollback）
- revert 本次提交即可恢复旧文案
