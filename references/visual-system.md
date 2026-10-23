# Visual system

## Color and surfaces

Give canvas, reading surfaces, navigation, brand anchor, actions and states explicit foreground/background pairs in both appearances. Blue-white may include a confident blue or dark navigation region; it need not be white cards plus one blue button. Treat chart series and category colors independently from success/warning/error meaning, and pair state color with text or icons.

Use a small surface vocabulary: flat reading, grouped records, raised context, floating controls and modal overlays. Coordinate borders, depth and a small radius family across the shell. Derive nested corners from the actual inset rather than applying one large radius everywhere. Dark mode needs surface and edge separation, not merely a dark body.

Glass can be solid, frosted or more transparent. Restrict its scope; keep tables, long copy and inputs dependable. Compare it over the real background, include opaque fallbacks, and avoid arbitrary gradients or glow as a substitute for hierarchy.

## Typography

Assign display, section, body, supporting, label and technical roles. Coordinate size, weight, leading and measure for the actual script and density. Do not apply tight Latin tracking to Chinese by default. Preserve semantic heading order and readable secondary text.

Use interface fonts with tabular numbers for ordinary metrics; reserve monospace for code, IDs and technical values when it helps. Font choice and availability are separate: [font guide](fonts.md).

## Space, density and alignment

Use shared spacing roles for within-object, between-object and between-section relationships. Bound content width by reading or operational needs. More columns and larger margins are not automatic improvements.

Short metrics normally need a compact strip or modest card. Large areas must contain useful detail, trends or tasks. For peer overview panels align their outer edges and action/footer anchors deliberately. For independent content use natural height. Do not force equal height, universal fixed rows or artificial empty space.

Records should behave like records: proportional insets, complete identifiers or an accessible detail path, aligned numeric columns and reachable actions. Let long labels grow. After tightening a local component, inspect its neighboring group and the first useful record's position.

## Icons and controls

Choose one coherent icon family, with matching meaning, stroke, size and geometry. Icon-only actions need accessible names. Inspect dropdowns while open, not only their triggers. Use the rounded select helper where a native menu conflicts with the design; keep labels, keyboard selection, disabled options, Escape and focus return intact.

Assign buttons by priority and context: primary, secondary, quiet row action and destructive action. Related buttons share type, padding, icon ratio and geometry; compact row controls need usable targets. Include hover, press, focus, selected, disabled and genuine pending states. Loading should preserve dimensions and prevent duplicates.

## Motion and interaction

Use immediate feedback and continuity. Drag, swipe or spring behavior needs cancellation, interruption and a button/keyboard alternative. Keep spatial relationships stable during transitions. Prefer native scrolling and focus. Respect reduced motion; do not add audio, vibration or gestures solely for style. Adapted Apple interaction guidance retains [its license](apple-design-LICENSE.txt).
