# Review Summary

## What changed
- Added a large-file protocol section to AGENTS.md
- Updated public Supabase config with project URL + publishable key
- Bumped cache/version tokens in index.html from 0328 to 0329

## Files touched
- Modified: AGENTS.md, config.public.js, index.html, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed: None
- What explicitly did NOT change: Prediction flow, favorites UI/logic, and button state machine

## Risk assessment
- Possible failure modes: Misconfigured public Supabase keys prevent auth; no impact on predictions
- Performance / cost / quota impact: None
- Deployment or environment risks: Low; publishable key only (no sb_secret_)

## How to test
1. Open staging and confirm assets load with v0329 cache tokens
2. Verify config.public.js is served and Supabase init logs appear

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
