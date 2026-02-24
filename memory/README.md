# Memory Layout

This workspace now uses a tiered memory layout to reduce retrieval cost and keep high-signal notes easy to find.

## Tiers
- `memory/hot/` — current day + very recent context (active work)
- `memory/warm/` — recent but less-active context
- `memory/cold/` — older reference context
- `memory/archive/` — backups before risky edits/compaction

## Compatibility
Primary daily notes remain in `memory/YYYY-MM-DD.md` for compatibility with existing workflows.
Tier folders currently store non-destructive copies for retrieval guidance and compaction planning.

## Operational Policy
See `memory/ops-config.json` for current memorySearch/memoryFlush/compaction limits.
