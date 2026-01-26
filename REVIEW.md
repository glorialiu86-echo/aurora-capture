# Review Summary

## 0. 本次变更一句话
- 升级 index.html 版本号与缓存参数（0343 → 0344）

## 1. 改动范围（Scope）

### 1.1 改了什么
- `index.html`：将现有版本号与缓存参数统一从 0343 改为 0344
- `REVIEW.md`：更新本轮变更摘要

### 1.2 明确没改什么（Hard No）
- 未修改任何 .js 逻辑或业务计算
- 未改动 trans-zh-en.md / translations_en.js
- 未引入新的版本机制或字段

## 2. 行为变化（Behavior Change）
- Before：静态资源缓存参数与页脚版本号为 0343
  After：静态资源缓存参数与页脚版本号为 0344

## 3. 风险与护栏（Risk & Guardrails）
- 风险：缓存参数未同步导致部分资源未刷新
- 触发条件：浏览器缓存命中旧版本
- 护栏：强刷与版本号核对

## 4. 验收清单（Acceptance Checklist）
- [ ] 页面底部版本号显示为 v5.0.0344
- [ ] 资源请求均带 `?v=0344`
- [ ] 与本次改动无关项标记为 Not in scope

## 5. 回滚方案（Rollback）
- revert 本次提交即可恢复旧版本号与缓存参数
