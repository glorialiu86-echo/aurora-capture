# Review Summary

## What changed
- Enforced favorites modal data source split: logged-in uses cloud only; logged-out never reads prior user data
- Normalized favorites items to {id,name,lat,lon} and skipped missing-id rows (console warn)
- Restored rename/delete actions for logged-in favorites list
- Invalidated local favorites cache on auth login state change
- Bumped cache/version tokens in index.html from 0331 to 0332

## Files touched
- Modified: app.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed: Logged-in favorites show only cloud data with rename/delete; logged-out favorites show no prior user data
- What explicitly did NOT change: Prediction flow, modal structure, and button state machine

## Risk assessment
- Possible failure modes: Missing id in cloud data hides those rows (warned in console)
- Performance / cost / quota impact: None
- Deployment or environment risks: Low; client-side focus handling only

## How to test
1. Log in and open favorites modal → list count matches Supabase favorites for that user
2. Clear localStorage `ac_favorites` and reopen → list count unchanged (cloud-only)
3. Log out and open favorites modal → no prior user data shown

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
