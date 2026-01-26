# Review Summary

## 0. 本次变更一句话
- 修复 *C45 资源引用为 ?v=0343 以恢复 Pages 资源加载

## 1. 改动范围（Scope）

### 1.1 改了什么
- `index.html`：将本地 css/js 资源从 `*C45` 后缀改回 `?v=0343`
- `AUDIT_i18n_stoploss_v0.md`：记录 8 条资源引用差异
- `REVIEW.md`：更新本轮变更摘要

### 1.2 明确没改什么（Hard No）
- 未修改任何 JS 运行时代码
- 未改动外链脚本或内联脚本
- 未处理 FMI CORS 或其他数据源问题

## 2. 行为变化（Behavior Change）
- Before：本地资源请求带 `*C45` 后缀导致 404
  After：资源请求使用 `?v=0343`，恢复可加载路径

## 3. 风险与护栏（Risk & Guardrails）
- 风险：如存在缓存/CDN 配置差异，可能仍需强刷
- 触发条件：浏览器缓存未更新时
- 护栏：统一回到既定 `?v=0343` 版本参数

## 4. 验收清单（Acceptance Checklist）
- [ ] 强刷后本地 css/js 资源请求均为 200
- [ ] window.AC_TRANS 为 object，window.AC_TRANS_STATS 有输出
- [ ] 与本次改动无关项标记为 Not in scope

## 5. 回滚方案（Rollback）
- 使用 `git revert <commit>` 回滚本次提交即可

i18n static mapping verified on staging: 97 keys used, 0 missing at runtime.

staging.css injection fixed to use ?v=0343.
