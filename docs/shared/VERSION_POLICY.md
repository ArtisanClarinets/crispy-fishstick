# Documentation Version Policy

**Version:** 1.1.0  
**Last Updated:** 2026-03-08  
**Status:** Active  
**Classification:** Internal

## Purpose

This policy keeps the Vantus docs tree readable by making it obvious which documents are active, which are replaced, and which are archival.

## Required Header Fields

Every controlled document should declare:

- version
- last updated date
- status
- classification when needed

## Status Rules

- `Active` means the document can guide current implementation or operations.
- `Deprecated` means it has been replaced and should not guide new work.
- `Archived` means it is kept only for history, audit trail, or background context.

## When To Bump Versions

- bump major when the document changes purpose, structure, or canonical direction
- bump minor when sections are added or materially revised
- bump patch when changes are editorial and do not change meaning

## Synchronization Rules

- if a master index changes, update linked navigation docs that depend on it
- if pricing or offer definitions change, update related public and care docs in the same pass
- if a document becomes archival, mark it clearly instead of letting it look active

## Practical Rule

Prefer one current document plus a clearly labeled archival trail over several half-current documents that say almost the same thing.
