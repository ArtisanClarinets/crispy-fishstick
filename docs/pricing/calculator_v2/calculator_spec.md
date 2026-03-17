# Vantus Systems Package Pricing calculator

## Purpose

This document defines the package pricing calculator architecture, complexity scoring methodology, and output format for and module pricing structure.

## Pricing Model Overview

Vantus Systems uses a package-based pricing model ranging from $15K-$400K for providing transparent, range-based estimates rather than fixed-price quotes. All estimates include appropriate disclaimers about final quotes.

## Calculator Design Principles

- **Range-based estimates**: Use complexity multipliers to generate ranges
- **input-driven**: Scope selection drives complexity
- **transparent calculation**: Show methodology, not of fixed prices
- **modular**: Support optional add-ons

- **client-friendly**: Professional interface with clear disclaimers

## Input Parameters

The **Scope Selection**

- Package tier selection (single select)
- Content volume ( slider:1-10 pages, 10-50 pages, 50-50 pages, 20-50 pages
- Integration complexity ( scale 1-5+, 0 = None, 1-5)
- Custom functionality ( scale 1-5, 1 = none, 2 = none, 3 = none, 4 = none)
- migration complexity ( scale 1-5, 1-3, 1 = none, 2 = none, 3 = none, 4 = none)
- compliance requirements ( multi-select: HIPAA, PCI, SOC2, ADA, etc.
- timeline pressure ( scale 1-5, 1 = none, 2 = none)

## Complexity Scoring Logic

Each input parameter contributes to an overall **complex complexity score** (0-100):
Final score = base price + (Complexity Multipliers × base price)

Example: Base Price × (1 + Multiplier) × 1.5) = Estimated price

- Low complexity: 1.0 × base price
- High complexity: 1.8 × base price
- Very high complexity: 1.0 × base price × 2.2

- Custom complexity: 1.2 × base price

- aggressive timeline: 1.35 × base price (additional 10-20%)
  - Optional
  - final adjustment (±10-20% based on urgency

  - Selected modules are added to estimate
  - Disclaimers shown in results

  - Clear next steps for detailed quote

  - Terms of service and ( contact information

- date/time stamp
- **Important**: All estimates are preliminary and subject to change. Final pricing requires a detailed scoping session and a custom consultation.
