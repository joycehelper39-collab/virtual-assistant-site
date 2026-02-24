# Memory Layout

## Tiers
- `memory/hot/` — current/high-velocity notes (recent few days)
- `memory/warm/` — recent but less active context
- `memory/cold/` — older durable references
- `memory/archive/` — backups before risky edits/compaction

## Operations config
- `memory/ops-config.json` controls search limits, flush cadence, and compaction policy.

## Safety rule
Do not delete source daily files during organization. Move/copy only, and back up rewrites to `memory/archive/` first.
