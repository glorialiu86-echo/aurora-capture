# Review Summary

## 0. 本次变更一句话
- 按 ChangeSet 替换前端文案并将 Guide 改为单块展示

## 1. 改动范围（Scope）

### 1.1 改了什么
- `app.js`：更新状态标签与错误提示英文文案
- `index.html`：Guide Modal 内容改为单块 key（GUIDE_BLOCK）
- `translations_en.js`：更新 Guide 英文整段并同步少量英文文案变化
- `AUDIT_i18n_stoploss_v0.md`：同步替换文档内旧文案（非运行时）
- `REVIEW.md`：更新本轮变更摘要

### 1.2 明确没改什么（Hard No）
- 未改动业务逻辑、算法或数据结构
- 未改动翻译源文件 `trans-zh-en*.md`
- 未新增/重命名翻译 key
- 未做全仓库自由改写或补翻译

## 2. 行为变化（Behavior Change）
- Before：Guide Modal 为旧版分段中文说明
  After：Guide Modal 使用单块 key 渲染（GUIDE_BLOCK 对应英文整段）
- Before：部分状态与错误提示英文为旧版
  After：对应英文文案更新为 ChangeSet 目标值

## 3. 风险与护栏（Risk & Guardrails）
- 风险：Guide 单块内容为文本块，可能呈现为原始 Markdown 样式
  触发条件：UI 未进行 Markdown 渲染
  护栏：仅做文案替换，不改渲染逻辑，需人工确认展示效果（Unverified）
- 风险：旧文案仍存在于 ChangeSet/翻译源文件/文档中
  触发条件：这些文件为非运行时或历史记录
  护栏：归零报告中明确标注为“非用户可见，保留”

## 4. 验收清单（Acceptance Checklist）
- [ ] 打开 Guide Modal，内容为单块 Guide（英文整段）
- [ ] 状态/错误英文文案与 ChangeSet 一致
- [ ] 归零扫描仅剩非运行时文件命中

## 5. 回滚方案（Rollback）
- revert 本次提交即可恢复旧 Guide 与文案
