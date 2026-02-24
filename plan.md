# Memory Operations Plan

## Goal
Stabilize and slim memory operations by organizing notes into hot/warm/cold tiers, setting explicit retrieval/flush limits, and adding lightweight heartbeat maintenance.

## Status
- [x] Inspect current memory layout and existing config.
- [x] Back up edited files to `memory/archive/`.
- [x] Create tiered memory folders (`hot/`, `warm/`, `cold/`) and organize copies without deleting originals.
- [x] Add explicit memory operations config with tighter `memorySearch` and `memoryFlush/compaction` settings.
- [x] Update `HEARTBEAT.md` with concise memory-maintenance checklist.
- [x] Add durable daily note entry documenting this maintenance run.
- [x] Prepare workspace commit.

## Files involved
- `MEMORY.md` (new)
- `memory/` (new tier folders + archive + policy docs)
- `memory/ops-config.json` (new)
- `memory/README.md` (new)
- `HEARTBEAT.md` (updated)
- `memory/2026-02-24.md` (updated)
- `plan.md` (this file)
