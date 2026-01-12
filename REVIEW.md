# Review Summary

## What changed
- Replaced local login stub with Supabase Magic Link auth (no OTP)
- Wired favorites read/create to Supabase for signed-in users only
- Added email input + send-link control inside existing login modal
- Added logout text link at the end of favorites modal content (signed-in only)
- Explicit redirectTo: staging -> /aurora-capture-staging/, production -> /aurora-capture/
- Favorites user_id is taken from current session (not from UI input)
- Added i18n placeholder support for login email input
- App wiring: auth state stored in window.AC_AUTH; login button sends Magic Link; favorite button creates Supabase record

## Files touched
- Modified: index.html, app.js, supabaseClient.js, REVIEW.md
- Added:
- Deleted:

## Behavior impact
- What user-visible behavior changed: Login modal now accepts email + sends Magic Link; favorites sync to Supabase after login; logout link appears at bottom of favorites modal when logged in
- What explicitly did NOT change: Prediction flow, C-value model, status system, favorites button structure/state machine

## Risk assessment
- Possible failure modes: Missing config or auth errors block login/favorites but do not affect predictions; email send failure shows a short message
- Performance / cost / quota impact: Supabase auth + favorites queries per user action; no background polling
- Deployment or environment risks: Low; uses publishable key only (no sb_secret_)

## How to test
1. Open staging, click “⭐ 收藏地址” or “🌟 收藏夹”, enter email, send Magic Link
2. Click Magic Link, return to staging, confirm `[AC Supabase] session:` is non-null
3. Click “⭐ 收藏地址” to create a favorite; open “🌟 收藏夹” to confirm it appears (newest first)
4. On another device/browser, log in with same email and confirm favorites list matches
5. Click “退出登录” at the bottom of favorites modal; modal returns to logged-out prompt with no toast

## Rollback plan
- Revert the commit on `staging`

## Open questions / follow-ups
- Rename/delete not wired this round if no existing UI hook (documented)
