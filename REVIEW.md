# Review Summary

## 0. 本次变更一句话
- 删除 openAlertOverlayFull 的翻译刷新调用并更新审计记录

## 1. 改动范围（Scope）

### 1.1 改了什么
- `app.js`：移除 openAlertOverlayFull 的 catch 分支中 applyTranslation 调用
- `AUDIT_i18n_stoploss_v0.md`：追加本次删除记录与 applyTranslation 命中数统计
- `REVIEW.md`：更新本轮变更摘要

### 1.2 明确没改什么（Hard No）
- 未引入任何翻译服务/代理/请求链路
- 未修改业务逻辑（预测、Auth、数据拉取）
- 未新增或引用 trans-zh-en.md 作为运行时数据源

## 2. 行为变化（Behavior Change）
- Before：openAlertOverlayFull 的错误链路会触发翻译刷新
  After：该错误链路不再触发翻译刷新

## 3. 风险与护栏（Risk & Guardrails）
- 风险：弹窗文案在错误链路中不再触发即时刷新
- 触发条件：打开 alert 弹窗并进入 catch 分支时
- 护栏：仅删除该调用点，不改文案与 DOM 更新逻辑

## 4. 验收清单（Acceptance Checklist）
- [ ] 触发 openAlertOverlayFull 的错误链路不再调用 applyTranslation
- [ ] applyTranslation 在 app.js 的命中数符合审计记录
- [ ] 与本次改动无关项标记为 Not in scope

## 5. 回滚方案（Rollback）
- 使用 `git revert <commit>` 回滚本次提交即可
