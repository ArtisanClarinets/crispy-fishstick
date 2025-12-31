# Aurora Design System

## 1. Core principles

These principles are adapted from Apple’s Human Interface Guidelines and generalized for web/desktop apps.

1. **Hierarchy:**  
   Prioritize information so users instantly see what matters most. Use typography, color, and spacing to make primary actions and content clearly dominant over secondary ones.

2. **Harmony:**  
   Make the interface feel like a seamless extension of the device and OS. Use subtle depth, gentle motion, and restrained color so the UI never feels louder than the content.

3. **Consistency:**  
   Reuse patterns, components, and behaviors across all surfaces. Navigation, button styles, spacing, and interaction states must behave identically in all views.

4. **Clarity:**  
   Every label, icon, and layout choice should be immediately understandable. Avoid ambiguity, nested complexity, and cleverness that costs comprehension.

5. **Deference to content:**  
   UI chrome should be quiet and functional, allowing user content (data, documents, media) to visually dominate.

6. **Depth and feedback:**  
   Use visual depth, motion, and state changes to show hierarchy, transitions, and relationships between elements without distracting the user.

---

## 2. Visual foundations

### 2.1 Color system

**Philosophy:** Neutral, content‑first base with a single accent color and subtle statuses.

- **Base colors:**
  - **Background base:** `#0B0C0F` (dark mode) or `#F5F5F7` (light mode).
  - **Surface base:** `#1C1C1E` (dark) or `#FFFFFF` (light).
  - **Border/subtle divider:** `#2C2C2E` (dark) or `#D2D2D7` (light).

- **Primary accent:**
  - **Accent base:** `#0A84FF` (blue, Apple‑like) for primary actions, selection, key highlights.
  - Use accent sparingly; avoid more than one accent color in the same view.

- **Text colors (light mode):**
  - **Primary text:** `#111111`
  - **Secondary text:** `#6E6E73`
  - **Tertiary/placeholder text:** `#A1A1A6`
  - **On dark backgrounds:** Use white with opacity (e.g., `rgba(255,255,255,0.87)` primary, `0.60` secondary).

- **Status colors (use descriptively, not decoratively):**
  - **Success:** `#32D74B`
  - **Warning:** `#FFD60A`
  - **Error:** `#FF453A`
  - **Info:** `#64D2FF`
  - Never use status colors as generic decoration; always tie them to meaning.

- **Shadows and elevation:**
  - Use very subtle shadows for elevation:
    - **Low elevation:** `0 4px 12px rgba(0,0,0,0.12)`
    - **High elevation:** `0 18px 40px rgba(0,0,0,0.30)`
  - Shadows should never overpower content; they exist to distinguish layers.

### 2.2 Typography system

Aligns with HIG emphasis on clear hierarchy and legible typography.

- **Primary typeface:**
  - Use **SF Pro** (Apple platforms) or a cross‑platform fallback stack:
    - `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- **Type scale (web/desktop baseline):**

  - **Display / Page title:** 28 px, regular or semibold  
  - **Section title:** 22 px, semibold  
  - **Subsection / card title:** 17 px, semibold  
  - **Body text:** 15–17 px, regular  
  - **Caption / meta:** 13 px, regular  

- **Typographic rules:**
  - **Line length:** 60–80 characters for body text.
  - **Line height:** 1.4–1.6 for body, 1.2–1.3 for headings.
  - Avoid using more than **three distinct text sizes** in any single view.
  - Use **weight** (regular vs. semibold) more than **size** to indicate importance.

### 2.3 Spacing and layout

- **Base spacing unit:** 4 px.
- **Common spacing values:** 4, 8, 12, 16, 20, 24, 32 px.
- **Layout grid:**
  - Use a **8 px grid** for major layout and **4 px** for fine adjustments.
  - Align all key elements to this grid for visual cohesion.

- **Section spacing:**
  - Between major sections: 32–40 px.
  - Between related elements (label + field, title + content): 8–12 px.

- **Card layout rules:**
  - Padding inside cards: 16–20 px.
  - Cards should visually group related content and actions.
  - Avoid nesting more than 2 card levels deep.

### 2.4 Motion and transitions

Reflects Apple’s guidance that motion should be purposeful and support understanding.

- **Principles:**
  - Motion must:
    - Explain navigation or state change.
    - Reinforce spatial relationships (slide, scale, fade).
    - Never delay the user.

- **Timing:**
  - Standard UI transitions: 150–220 ms.
  - Small hover/press feedback: 80–120 ms.
  - Complex overlay/modal: 200–280 ms.

- **Easing:**
  - Use ease‑out for entering (`cubic-bezier(0.25, 0.8, 0.25, 1)`) and ease‑in for exiting (`cubic-bezier(0.4, 0.0, 1, 1)`).

---

## 3. Components

This section defines reusable components and their behaviors, aligned with Apple-style patterns (buttons, navigation, lists, etc.).

### 3.1 Buttons

#### 3.1.1 Button types

- **Primary button:**
  - Purpose: Main action for the view ("Save", "Create", "Continue").
  - Style:
    - Background: primary accent color.
    - Text: white.
    - Border-radius: 8–12 px.
    - Height: 32–40 px (desktop), 44 px minimum (touch).
  - Only one primary action per view or logical group.

- **Secondary button:**
  - Purpose: Less critical actions (e.g., "Cancel", "Back").
  - Style options:
    - Outline: 1 px border in divider color, transparent background.
    - Text: primary text color.

- **Tertiary / Text button:**
  - Purpose: Low-importance or inline actions ("Learn more", "Edit").
  - Style: Text with accent color, no border, subtle hover underline.

#### 3.1.2 Button states

Each button must define:

- **Default:** Normal resting appearance.
- **Hover (pointer devices):** Slight increase in brightness, shadow, or background tint.
- **Pressed:** Slightly darker background and “pressed in” shadow.
- **Disabled:** Reduced opacity (~40–50%), no hover effect, not focusable.

### 3.2 Navigation

- **Top app bar:**
  - Contains app name/logo, primary sections, key global actions, and account/avatar.
  - Height: 56–64 px.
  - Stays sticky when scrolling content.

- **Left sidebar (if used):**
  - Contains primary navigation sections.
  - Width: 240–280 px.
  - Use icons + labels.
  - Supports collapsed mode with icons only.

- **Navigation rules:**
  - Never mix more than two primary navigation patterns (e.g., top bar + sidebar).
  - Breadcrumbs should be used whenever there is deeper than 2 levels of hierarchy.

### 3.3 Cards and panels

- **Card:**
  - Used to group related content and/or actions.
  - Style:
    - Background: surface base.
    - Shadow: low elevation.
    - Radius: 10–14 px.
  - Must have:
    - Title or clear entry point.
    - Consistent padding.
    - Optional footer for actions.

- **Inspector / detail panel:**
  - Anchored to right or left side.
  - Width: 320–420 px.
  - Always reflects currently selected item.
  - Must support scroll independently of main canvas.

### 3.4 Forms and inputs

- **Text fields:**
  - Labels always visible (never placeholder-only).
  - Use floating labels or persistent labels above fields.
  - Minimum height: 32–36 px desktop, 44 px touch.
  - Error state: red border + concise, specific helper text.

- **Selects and dropdowns:**
  - Clearly indicate open/close state (chevron icon).
  - Support keyboard navigation.

- **Toggles and switches:**
  - For binary on/off states.
  - Label must state what is being controlled, not just “On/Off”.

### 3.5 Tables and lists

- **Table design:**
  - Use quiet row dividers.
  - Highlight row on hover.
  - Primary text left-aligned, numeric values right-aligned.
  - Use zebra striping only if density is high and clarity is improved.

- **List items:**
  - Each item: icon (optional), primary label, secondary label/meta, and affordance (chevron or button) if navigable.

---

## 4. Interaction patterns

These patterns generalize Apple’s recommended flows: clarity, predictability, and minimal friction.

### 4.1 Selection and focus

- **Hover (pointer):**
  - Surfaces slightly elevate or change background.
- **Focus (keyboard):**
  - Clearly visible focus ring (e.g., 2 px accent outline).
- **Selection (persistent):**
  - Use background tint + left accent bar or checkmark icon.

### 4.2 Modals, sheets, and popovers

- **Use modal dialogs only for:**
  - Destructive or irreversible actions.
  - Critical information requiring explicit confirmation.

- **Modal rules:**
  - Dimmed backdrop.
  - Clear primary and secondary actions.
  - Escape / click outside should close when safe.

- **Popovers / contextual menus:**
  - For small, contextual actions and filters.
  - Should not contain critical, high‑risk actions without confirmation.

### 4.3 Error handling and feedback

- **Inline first:**  
  Show errors as close as possible to the source (field, element).

- **Tone:**
  - Be specific, neutral, and constructive.
  - Example: “This time slot overlaps another segment from 7:00–7:30 PM.”

- **System banners:**
  - Use small, top‑aligned banners for global notifications (success, warning, error).
  - Auto-dismiss on success; keep error banners visible until resolved or dismissed.

---

## 5. Accessibility and inclusivity

Accessibility is a first-class requirement, aligned with Apple’s emphasis on inclusive design.

- **Color contrast:**
  - Meet or exceed WCAG AA: 4.5:1 for normal text, 3:1 for large text.

- **Keyboard:**
  - All interactive elements must be reachable and operable via keyboard.
  - Focus order must match visual order.

- **Hit targets:**
  - Minimum target size: 44×44 px for touch, 32×32 px for pointer interactions.

- **Labels:**
  - Every control must have an accessible name (label, aria-label, etc.).
  - Icons must have a text label or accessible equivalent.

- **Motion and reduces motion:**
  - Avoid mandatory, large-scale animations.
  - Provide reduced-motion behavior when requested by the system.

---

## 6. Implementation rules for coding agents

You can paste this section directly into repos or agent instructions as hard constraints.

1. **Consistency:**
   - Always use the shared tokens for color, spacing, typography, and motion.
   - Never introduce ad‑hoc colors, fonts, or spacing values without extending the design system.

2. **Component usage:**
   - Prefer existing design system components (Button, Input, Card, Modal, Table, Sidebar, TopBar, InspectorPanel) before creating new ones.
   - New components must:
     - Use the base spacing scale.
     - Use one of the defined typography styles.
     - Reuse button/input primitives where applicable.

3. **Responsiveness:**
   - Target breakpoints approximately at: 600 px, 900 px, 1200 px.
   - On narrow screens, stack panels vertically and keep primary actions visible without horizontal scroll.

4. **Error and empty states:**
   - All data‑driven views must define:
     - Empty state content (icon + title + short helper text + primary action, if relevant).
     - Loading state (skeletons or spinners).
     - Error state (message + retry action).

5. **Naming conventions:**
   - Components: `PascalCase` (e.g., `RateCardTimeline`, `DayProfileInspector`).
   - Tokens: `camelCase` or `kebab-case` (e.g., `colorAccent`, `space-16`).
   - Files: one main component per file where possible.

6. **Documentation expectation:**
   - Each new view or component must include:
     - Purpose.
     - Inputs/props.
     - States (idle, loading, empty, error).
     - Accessibility considerations.

---