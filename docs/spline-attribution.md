# Spline Attribution

## Source
- **Original File**: Glass Knot Vortex
- **URL**: https://community.spline.design/file/90d98893-bcd5-4c28-8338-d322ff5c3655
- **License**: CC0 1.0 (Public Domain)

## Current Status: PLACEHOLDER
**NOTE**: The file at `public/spline/living-blueprint.splinecode` is currently a generic placeholder because the AI agent cannot access the Spline 3D Editor GUI to perform the remix.

**ACTION REQUIRED**: A human designer must perform the remix steps below and replace the file.

## Required Modifications (Remix Instructions)
The "Living Blueprint" visualization requires the following structure in the Spline scene:

1.  **Structure**:
    - Root group named `Blueprint`.
    - 8 subgroups named `phase_0` through `phase_7`.
    - `phase_0`: Idle micro-core (small, subtle).
    - `phase_1`: Core appears.
    - ...
    - `phase_7`: Finished state.

2.  **Interactivity**:
    - **Variables**:
        - `phase` (Number): 0 to 7.
        - `progress` (Number): 0 to 1.
    - **Events**:
        - "Variable Change" on `phase`: Set visibility of corresponding `phase_X` group to true (and others false).
        - "Variable Change" on `progress`: Drive rotation/emission.

3.  **Aesthetics**:
    - Premium glass, crisp highlights, restrained glow.

## Usage
The exported `.splinecode` file is located at `/public/spline/living-blueprint.splinecode`.
It is loaded by `components/spline-blueprint-canvas.tsx` which bridges the React state (scroll progress) to the Spline variables.
