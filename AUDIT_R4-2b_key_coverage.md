# R4-2b i18n Key Coverage Audit

## Scope
- Model output sources: `model.js` → `labelByScore5`, `state3h`, `explainUnobservable`
- i18n source: `i18n.js`

## MODEL_KEYS_ALL (explicit list)

### MODEL_KEYS_STATUS
- STATUS_C1
- STATUS_C2
- STATUS_C3
- STATUS_C4
- STATUS_C5

### MODEL_KEYS_BURST_STATE
- T3_BURST_STATE_ACTIVE
- T3_BURST_STATE_RISING
- T3_BURST_STATE_DECAY
- T3_BURST_STATE_QUIET

### MODEL_KEYS_BURST_HINT
- T3_BURST_HINT_ACTIVE
- T3_BURST_HINT_RISING
- T3_BURST_HINT_DECAY
- T3_BURST_HINT_QUIET

### MODEL_KEYS_REASON
- REASON_CLOUD_COVER_BLOCKS
- REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE
- REASON_ENERGY_INPUT_TOO_WEAK
- REASON_MLAT_TOO_LOW_STOP

## I18N_KEYS_DEFINED (from i18n.js)

### STATUS
- STATUS_C1
- STATUS_C2
- STATUS_C3
- STATUS_C4
- STATUS_C5

### REASON
- REASON_CLOUD_COVER_BLOCKS
- REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE
- REASON_ENERGY_INPUT_TOO_WEAK
- REASON_MLAT_TOO_LOW_STOP

### T3_BURST_STATE
- T3_BURST_STATE_ACTIVE
- T3_BURST_STATE_RISING
- T3_BURST_STATE_DECAY
- T3_BURST_STATE_QUIET

### T3_BURST_HINT
- T3_BURST_HINT_ACTIVE
- T3_BURST_HINT_RISING
- T3_BURST_HINT_DECAY
- T3_BURST_HINT_QUIET

## Coverage Diff
- MISSING (MODEL - I18N): (none)
- EXTRA (I18N - MODEL): (none)

## Coverage Table

| Key | 来源函数 | 分类 | i18n 是否存在 | zh 文案 | en 文案 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| STATUS_C5 | labelByScore5 | status | ✅ | 强烈推荐 | Highly Recommended |  |
| STATUS_C4 | labelByScore5 | status | ✅ | 值得出门 | Worth Going Out |  |
| STATUS_C3 | labelByScore5 | status | ✅ | 可蹲守 | Worth Waiting |  |
| STATUS_C2 | labelByScore5 | status | ✅ | 低概率 | Low Probability |  |
| STATUS_C1 | labelByScore5 | status | ✅ | 不可观测 | Not Observable |  |
| T3_BURST_STATE_ACTIVE | state3h | burst_state | ✅ | 爆发进行中 | Burst in progress |  |
| T3_BURST_STATE_RISING | state3h | burst_state | ✅ | 爆发概率上升 | Burst likelihood rising |  |
| T3_BURST_STATE_DECAY | state3h | burst_state | ✅ | 爆发后衰落期 | Post-burst decay |  |
| T3_BURST_STATE_QUIET | state3h | burst_state | ✅ | 静默 | Quiet |  |
| T3_BURST_HINT_ACTIVE | state3h | burst_hint | ✅ | 离子触发更明确。 | Ion triggering is clearer. |  |
| T3_BURST_HINT_RISING | state3h | burst_hint | ✅ | 系统更容易发生，但未到持续触发。 | More likely, but not in sustained triggering yet. |  |
| T3_BURST_HINT_DECAY | state3h | burst_hint | ✅ | 刚有过波动，仍可能余震一会儿。 | Recent fluctuation; aftershocks still possible. |  |
| T3_BURST_HINT_QUIET | state3h | burst_hint | ✅ | 背景不足或触发不清晰。 | Background insufficient or triggers unclear. |  |
| REASON_CLOUD_COVER_BLOCKS | explainUnobservable | reason | ✅ | 天空被云层遮挡，不利于观测 | Cloud cover blocks the sky. |  |
| REASON_SKY_TOO_BRIGHT_WEAK_AURORA_HARD_TO_SEE | explainUnobservable | reason | ✅ | 天色偏亮，微弱极光难以分辨 | Bright sky. Faint aurora is hard to discern. |  |
| REASON_ENERGY_INPUT_TOO_WEAK | explainUnobservable | reason | ✅ | 能量注入弱，难以形成有效极光 | Weak energy coupling. Effective aurora is unlikely. |  |
| REASON_MLAT_TOO_LOW_STOP | explainUnobservable | reason | ✅ | 磁纬过低，已停止生成 | MLAT too low. Generation stopped. |  |

## Conclusion
- PASS: All model output keys are present in i18n.js.

## Change Scope
- Only docs

## Next Step Gate
- R4-2b passed. OK to proceed to R4-2c after user confirmation.
