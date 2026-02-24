# Open Loops

Last updated: 2026-02-24

## PocketPivot.co monetization
- Status: Stripe checkout endpoint works in test mode.
- Decision pending: full automated paywall vs A+ (auto-delivery without full auth system).
- Next action: choose implementation path and wire buyer access flow.

## Memory reliability
- Status: tiered memory + tighter ops config in place.
- Blocker: semantic `memory_search` availability depends on embedding provider quota.
- Next action: restore embedding quota/provider to re-enable semantic recall.

## Security hardening follow-up
- Status: credentials directory permissions corrected to `700`.
- Remaining note: openclaw security audit still flags small-model fallback posture.
- Next action: decide whether to sandbox all small models and deny web tool groups for those fallbacks.
