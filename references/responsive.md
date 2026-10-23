# Responsive, language and appearance

Desktop-first describes the starting composition, not an exemption from other widths. Inspect actual small, medium, desktop and relevant wide CSS viewports. Typical samples are 390, 768 and 1440 px; use 360, compact desktop or wider cases when the content exposes a transition.

## Shell and reflow

Recompose navigation, tools, cards, forms, tables and overlays. Preserve meaningful tasks instead of shrinking a desktop screenshot or hiding search/date controls. Give necessary overflow to its owning canvas/table, not the document. Check long labels, zoom and text-spacing pressure.

An overlay sidebar must leave normal flow, remain reachable after scrolling, and restore focus. Inspect short-window scrolling and shell joins. A compact rail, drawer or top navigation is a product decision, not one universal breakpoint rule.

**Container queries cannot style their own query container.** Put the query boundary on an outer preview shell when the inner application's grid needs to change. Ensure studio-specific overrides do not return an off-canvas sidebar to normal flow and create an empty block.

SVG charts should adapt their coordinate system or retain a bounded readable width. Inspect actual label bounds; scaling a fixed wide viewBox can make text tiny or clip Y-axis labels. Use complete period/unit labels and offer exact data when useful.

## Wide desktops

Measure CSS width, height and DPR separately from monitor resolution. Use bounded reading measures, a wider operational grid or deliberate fluid areas. Do not magnify type and controls just because the viewport is wide. Inspect real open dialogs/menus; an embedded thumbnail is not wide-screen verification.

## Languages and fonts

Follow audience scope. For Chinese/English work, test expanded English labels and mixed-script content at narrow widths. Preserve route, filters, selection and form data during locale changes. System font availability varies; report the actual fallback rather than promising identical rendering.

## Appearance

New builds normally support light/dark/system unless excluded. Persist an explicit choice, react to system changes only in system mode, and retain task state. Verify text, edges, charts, states and overlays in both themes. Glass needs a readable solid fallback. If a capability is unverified, say so.
