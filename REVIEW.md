# Review Summary

## What changed
- Enforced logged-in favorites to use cloud-only listFavorites and skip local data
- Create now uses user-provided name when present, with lat/lon fallback only when empty
- Rename save re-fetches cloud data without clearing list to avoid empty-state flicker
- Delete remains serialized and re-fetches cloud data after completion
- Bumped cache/version tokens in index.html from 0333 to 0334

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
2. Clear localStorage `ac_favorites` and reopen → list and names unchanged (cloud-only)
3. Create a favorite with a custom name → Supabase name is non-null and equals the input
4. Rename a favorite → no empty-state flicker; reopen modal shows new name
5. Rapidly delete → no lingering rows; list stays in sync with Supabase

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- None
