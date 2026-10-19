# Apple-inspired Interaction Craft for the Web

Adapted from the installed Apple Design skill by Emil Kowalski; retain [its MIT license](apple-design-LICENSE.txt). These are web practices and starting points, not claims of official Apple certification or exact platform API equivalence.

## Choose the appropriate level

| Situation | Preferred treatment |
|---|---|
| Buttons, tabs, ordinary forms | Immediate pressed/focus feedback; simple CSS transitions |
| Dense expert workflows | Predictable updates, minimal motion, opaque readable surfaces |
| Draggable sheet, movable panel, swipeable content | Direct tracking; an interruptible primitive when motion continues after release |
| Toolbar or overlay above scrolling content | Optional subtle translucency with opaque fallback and readable text |
| Editorial or marketing page | Motion supports understanding; content and type remain primary |

The Apple contribution is responsiveness, clarity, continuity, and care. It is not universal glass, huge radii, bounce, or copied macOS controls.

## Feedback and agency

- Show press feedback on pointer-down; commit through normal click/keyboard activation. Do not execute irreversible actions on pointer-down.
- Keep repeated and keyboard actions immediate. Avoid artificial delays, unnecessary double-tap detection, and animations that gate input.
- Distinguish status, completion, warning, and error using words/icons as well as semantic colors.
- Use undo for reversible edits, preserve values after errors, and provide clear exits from overlays.
- Prefer familiar web conventions over platform-specific positions or gestures. Swipe-only actions need visible accessible alternatives.

## Direct manipulation

Use an existing mature primitive where possible. For a small custom gesture:

1. Preserve the grab offset, track the active pointer, and capture it when dragging begins.
2. Resolve directional intent before claiming the gesture. Preserve scrolling and zoom; scope `touch-action` narrowly, not `none` on the page.
3. Estimate release velocity from a short time-stamped position history. Keep pixels/second versus pixels/millisecond explicit.
4. Update visual position with the pointer. Batch frame work; avoid full-app rerenders or synchronous layout reads on each move.
5. Choose a bounded snap destination using position and velocity. Transfer velocity when supported and settle in a valid state.
6. Handle `pointercancel`, lost capture, resize, unmount, and interrupted transitions. Restore meaningful state.

Maintain keyboard/button equivalents. Do not obstruct browser edge navigation or native scrolling to imitate a mobile interaction.

## Springs and interruption

- Start from the currently displayed value, not a stale logical endpoint; preserve velocity when the primitive supports retargeting.
- Ordinary feedback needs no spring. Physical motion should start without overshoot; allow subtle bounce only where momentum and boundaries justify it.
- Damping ratio and physical damping coefficient differ. Never copy `damping: 1` from a design description into an API expecting a physical coefficient.
- Response around 0.3–0.4 seconds is a tuning concept, not an exact duration or requirement. Spring settling depends on implementation and termination thresholds.
- Check the installed library's API and units. Do not assume Apple response/damping values map numerically to web bounce/duration or stiffness/damping fields.
- For relative velocity APIs, guard near-zero remaining distance and extreme values. For absolute velocity APIs, preserve their units. Independent axes may need independent springs.

Keep ordinary feedback short, usually 120–220 ms. Physical springs may settle longer but must not lock out input. CSS transitions can retarget and suit simple changes; a gesture needing velocity continuity usually benefits from a dedicated primitive.

## Spatial continuity

- Relate overlays to their trigger/content. A popover originates at its anchor; a centered dialog remains centered.
- Reverse a panel along a coherent path and retarget smoothly when intent changes.
- Use restrained resistance at gesture boundaries when useful; do not rubber-band normal buttons or inputs.
- Avoid scroll-jacking, decorative parallax, motion blur, and whole-page zoom in routine product work.

## Materials and depth

Use opaque surfaces as the baseline for dense data and long reading. Treat glass as a visible design choice for projects where material layers help identity, hierarchy, or context, including selected cards and floating chrome. Follow [glass materials](glass-materials.md) for scene recommendations and matched visual previews; users choose the feasible material intensity and placement after seeing it.

- Test over busy content in both themes. Do not infer contrast from an empty background.
- Avoid stacked transparent cards or nested blur. Prefer a stable tint or opaque fallback to animating large blur radii.
- Use a scrim for a modal task; a non-modal inspector should preserve unrelated work.
- In dark mode, surface values and borders provide elevation where shadows disappear.
- Limit blur coverage on mobile/low-power devices. Readability takes precedence over material effects.

```css
.floating-toolbar {
  background: var(--surface);
  border: 1px solid var(--border-strong);
}
@supports (backdrop-filter: blur(12px)) {
  .floating-toolbar {
    background: var(--chrome-translucent);
    backdrop-filter: blur(12px);
  }
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .floating-toolbar { background: var(--surface); backdrop-filter: none; }
}
```

Define `--chrome-translucent` per theme and retain the opaque baseline for environments without these preference queries.

## Typography and inclusive motion

Use the project's system or licensed font. Optical sizing only helps when the font supports it. UI text and Chinese body copy normally use neutral tracking. Tighter large Latin display tracking must be font-specific and visually tested; never apply it globally to Chinese or small controls. Follow [typography and hierarchy](typography-hierarchy.md) for sizing, measure, and numeric alignment.

Reduced motion uses static transitions or short crossfades; preserve feedback/focus without springs, parallax, or sliding. Do not block input during a theme change or introduce full-screen flashes.

Sound and vibration are optional features with platform limits, not default polish. Add them only when the project or user calls for them.

## Verify behavior

For implemented gestures, test slow drag, fast release, reversal mid-flight, cancellation, keyboard equivalents, mobile scroll, and reduced motion. Inspect jumps, lag, lost focus, and accidental commits. Inspect overlays in both themes over real content. Static screenshots alone cannot validate velocity continuity or gesture accessibility.
