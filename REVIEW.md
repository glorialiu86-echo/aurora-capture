# Review Summary

## What changed
- Added public Supabase config file for GitHub Pages delivery
- Updated client config loading to prefer local config.js override when present
- Removed direct config.js script include to avoid 404 noise
- Public config only includes SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY (sb_publishable_); sb_secret_ is forbidden in frontend/repo/docs

## Files touched
- Modified: index.html, supabaseClient.js, config.example.js, REVIEW.md
- Added: config.public.js
- Deleted:

## Behavior impact
- What user-visible behavior changed: None (config loading only)
- What explicitly did NOT change: Prediction flow, favorites UI/logic, and button state machine

## Risk assessment
- Possible failure modes: Missing/invalid public keys keep Supabase disabled without breaking predictions
- Performance / cost / quota impact: One extra config script load
- Deployment or environment risks: Low; only public keys are shipped

## How to test
1. Open the page and confirm config.public.js loads without 404
2. Verify console shows `[AC Supabase] session:`
3. If a local config.js exists, confirm it takes precedence over public config

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
