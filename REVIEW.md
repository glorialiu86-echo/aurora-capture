# Review Summary

## 0. 本次变更一句话
- 接入静态英文映射并提供二态切换与缺失统计输出

## 1. 改动范围（Scope）

### 1.1 改了什么
- `trans.js`：引入 `TRANSLATIONS_EN` 并实现 `applyTrans`（含 missing 统计输出）
- `index.html`：`trans.js` 脚本改为 module 以支持静态 import
- `AUDIT_i18n_stoploss_v0.md`：记录可翻译节点策略与统计输出说明

### 1.2 明确没改什么（Hard No）
- 未引入系统语言检测
- 未新增翻译服务/代理请求
- 未改动 FMI 相关数据源或 CORS 处理

## 2. 行为变化（Behavior Change）
- Before：Trans 开关仅切换文本标签，不做中英渲染
  After：Trans 开关可切换中/英渲染并输出 missing 统计

## 3. 风险与护栏（Risk & Guardrails）
- 风险：当前 missing 可能 > 0
- 触发条件：切换到英文态时
- 护栏：控制台输出完整 missing 列表供收敛

## 4. 验收清单（Acceptance Checklist）
- [ ] Trans ON/OFF 可切换中英渲染
- [ ] 控制台输出 totalNodes/totalKeys/missing 统计
- [ ] 与本次改动无关项标记为 Not in scope

## 5. 回滚方案（Rollback）
- 使用 `git revert <commit>` 回滚本次提交即可
