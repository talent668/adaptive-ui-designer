# Meaningful Icons and Coherent Controls

Use icons more deliberately in navigation, actions, status and field affordances when they improve recognition. Do not add an icon to every sentence or use unrelated symbols to fill decorative tiles.

## Meaning before decoration

Choose the glyph from the action or object. Common mappings include a magnifier for search, a calendar for dates, a plus for create, a downward tray/arrow for download, an upward arrow for upload, a pencil for edit, a funnel for filtering, a chart for analytics, and a notebook/list for records. A close `X` is not a delete/trash action. A gear should not stand for a calendar or reports just because it looks balanced. Keep text when the symbol could be ambiguous.

Prefer one coherent icon family. Retain an existing family when it is appropriate; replace incoherent or mismatched icon styling during redesign. Do not mix unrelated filled, outline, emoji and platform glyphs for peer controls. Avoid redistributing platform-proprietary icon assets without the applicable rights.

Typical calibration: 16 px for dense rows, 18–20 px for ordinary navigation/buttons, 24 px for prominent controls; these are starting sizes, not fixed rules. Use a consistent viewbox, about 1.5–2 px strokes at the intended size, rounded caps/joins for a rounded theme, and optical alignment with the label. Keep icon-to-label gaps coherent, commonly 6–8 px. Enlarge the hit area independently of the glyph; do not make a tiny symbol the entire click target.

Icon-only actions need accessible names and, where unfamiliar, visible help or tooltips. Decorative icons beside text are hidden from assistive technology. State colors and badges carry stable meaning; a green check means completion/success, not arbitrary emphasis.

## Inspect the whole control, including its open state

Match input, select trigger, popup, menu, button and dialog geometry to shared roles. Check border color, background, corner radius, elevation, padding, chevron/check size, selected/hover/focus/disabled/error states, and label alignment. A rounded trigger with a square operating-system popup is not a finished rounded select design.

Native controls remain appropriate when they satisfy the interaction and visual requirements. Styling `appearance: none` or the `<select>` border does not guarantee control over the platform's option popup. If that popup conflicts with the chosen theme, use the project's established accessible select/combobox primitive or a verified custom implementation. Choose a searchable combobox for long lists when needed; do not put a search input into a simple select without updating its semantics.

The bundled [rounded select helper](../assets/rounded-select.js) and [styles](../assets/rounded-select.css) are a framework-neutral single-select example. It retains the source `<select>` for form values/events while providing a rounded combobox/listbox, keyboard operation, disabled options, type-ahead, Escape/outside close and focus handling. Use its React/Vue integration pattern when a framework owns the DOM, and prefer an existing project primitive when available. Multi-select, virtualized lists and asynchronous search need their own appropriate implementation.

Use the [WAI-ARIA select-only combobox example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) as a behavioral reference, then validate the actual implementation in the project's browser/assistive-technology scope. The bundled helper is an example, not an accessibility certification.

Verify mouse and keyboard selection, Arrow keys, Home/End, Enter/Space, Escape, Tab, type-ahead, long labels, scrolling/viewport edges, disabled/error states, and form submission. Portal/popover placement must avoid clipping by cards with overflow. Theme or locale changes must preserve the selected value and update the visible label. Use stable text labels rather than assuming an icon communicates the field's name.

In React/Vue, do not replace a framework-owned label or subtree behind the renderer. Mount the helper through an adapter with a stable select ref, refresh it after controlled-value/option updates, and destroy it on unmount. Keep form validation and accessible error descriptions connected to the visible trigger.
