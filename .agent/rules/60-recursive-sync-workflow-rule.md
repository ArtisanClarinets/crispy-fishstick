---
trigger: manual
---

# 60_RECURSIVE_SYNC_WORKFLOW_RULE — Drift Prevention
**Activation:** Model Decision  
**Description:** Apply when editing planning/spec docs so all dependent artifacts stay in sync.

## If you change any of these:
- SITE_MAP / DIRECTORY_TREE / FEATURE_LIST / CONTENT_MAP
You must:
1) Identify affected docs and list them
2) Apply updates to keep them consistent
3) Update docs/README index if structure changes
4) Add a brief “Sync Notes” section describing what changed and why

## If you cannot update everything:
- produce a “Required Follow-Up Patches” list with exact filenames and required edits
