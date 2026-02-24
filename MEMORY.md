# MEMORY.md

Curated long-term memory (high-signal, durable only).

## User + operating preferences
- User prefers direct, action-oriented help and wants tasks executed end-to-end with minimal hand-holding.
- For non-trivial work, maintain/update a short plan on disk and commit workspace changes.
- Safety boundary: ask before external/public actions; internal workspace work can proceed proactively.

## Current focus
- Build PocketPivot.co course sales flow with Stripe + Cloudflare.
- Immediate objective: reliable paid checkout path and practical route to course delivery/paywall.

## Confirmed technical state
- Stripe checkout-session Worker endpoint is functioning in test mode when called with a valid test `price_...` id.
- Current known test product: "Day Trading 101" priced at $20 in Stripe test mode.
- Worker secret key mismatch issue was resolved by switching to `sk_test_...` for test-mode prices.

## Memory system notes
- Operational memory tiers in use: `memory/hot`, `memory/warm`, `memory/cold`.
- Policy/config is defined in `memory/ops-config.json`.
- Daily event logs remain in `memory/YYYY-MM-DD.md`.
