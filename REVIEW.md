# Review Summary

## What changed
- Added public Supabase config file for GitHub Pages delivery
- Limited local config.js override loading to localhost only to avoid production 404s
- Ensured public config script uses a relative path for GitHub Pages
- Public config only includes SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY (sb_publishable_); sb_secret_ is forbidden in frontend/repo/docs
- Bumped cache/version tokens in index.html from 0327 to 0328

## Files touched
- Modified: index.html, supabaseClient.js, config.example.js, REVIEW.md
- Added: config.public.js
- Deleted:

## Behavior impact
- What user-visible behavior changed: None (config loading only)
- What explicitly did NOT change: Prediction flow, favorites UI/logic, and button state machine

## Risk assessment
- Possible failure modes: Missing/invalid public keys keep Supabase disabled without breaking predictions; localhost override skipped if host mismatch
- Performance / cost / quota impact: One extra config script load
- Deployment or environment risks: Low; only public keys are shipped

## How to test
1. Open staging and confirm no config-related 404s in Console
2. Verify console shows `[AC Supabase] session:`
3. On localhost with config.js present, confirm override takes precedence

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
