---
name: owner-preferences
description: Project owner wants questions asked before acting when anything is unclear; everything tunable should live in one config file
metadata:
  type: feedback
---

- Ask before doing anything when a requirement is ambiguous (e.g. conflicting color codes). The owner explicitly said "if you need to know anything ask me before you do anything."
- Values the owner may want to change later (colors, brand name, spelling) belong in one config file under `src/config/`, not scattered through components.
- The team works from multiple devices with multiple co-workers, so durable knowledge goes in this repo's `.claude/memory/`, not in a personal Claude memory.

**Why:** stated directly by the owner on 2026-10-22.
**How to apply:** batch clarifying questions up front, then execute; prefer central config over inline values; update `.claude/memory/` at the end of each task. Related: [[brand-identity]], [[brand-name]].
