Apply the project [art-direction contract](art-direction.md) before selecting tokens. Structure, brand/action and semantic are roles; they can contain multiple coordinated colors and meaningful colored regions.

# Visual System

Use a small, coherent set of semantic decisions. Blue-white is the default when no other palette is explicitly required; required brand constraints and confirmed designs take precedence. Adapt composition to the actual project rather than treating the default colors as a fixed template.

## Color has three jobs

| Role | Responsibility | Typical tokens and uses |
|---|---|---|
| Neutral | Structure, reading, hierarchy | Canvas, surface, primary/secondary text, borders, disabled |
| Accent | Action and current context | Primary action, links, selected surface, keyboard focus |
| Semantic | State and feedback | Info, success, warning, danger; separate background and foreground pairs |

Build a readable hierarchy on the actual planned surfaces. Choose the amount of neutral, tinted and branded area from the composition; neither a mostly-neutral page nor a strongly colored shell is universally preferred. The main action should remain distinguishable from its alternatives; use a quieter treatment for Cancel, Back, and secondary actions.

Use semantic variables in components rather than scattered literals. Preserve semantic meanings when the accent changes: a purple brand does not make errors purple. Charts and content categories may need separate series tokens and redundant labels/shape; do not confuse their palette with success/danger or action colors.

Measure rendered foreground/background contrast rather than trusting a scale number. Ordinary text should meet 4.5:1; qualifying large text and necessary non-text UI features should meet their applicable 3:1 requirement. Decorative separators need not pretend to be interactive boundaries. Essential help and placeholders should remain readable. Test color over the actual tinted or translucent surface. See the W3C explanations for [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) for definitions and exceptions.

The [token seeds](../assets/blue-white.tokens.css) define light/dark pairs, including action hover and status surfaces. They deliberately exclude chart categories and product-specific state. Adapt them to branding and verify the result.

## Blue-white interpretation

- White or near-white content surfaces sit on a light neutral canvas. Use cooler gray sparingly in surrounding chrome rather than tinting every surface blue.
- In the blue-white direction, blue identifies action and selection. Other directions can use brand anchors, companion fields and dark/light regions according to their composition. Color area is a deliberate design decision; do not impose a universal mostly-white canvas or a maximum color percentage.
- Dark mode uses neutral dark surfaces, a readable lighter blue, and corresponding status pairs. Preserve object roles and spacing instead of inverting the picture.
- Thin neutral borders and modest elevation separate objects. Use stronger shadow mainly for menus/dialogs, not every section.

## Design navigation and content as one shell

Inspect the sidebar, top toolbar, breadcrumbs and content surfaces together before polishing isolated cards. Choose whether navigation is an edge-attached rail, part of a continuous background, or an inset panel. Each can be valid. What matters is a coherent transition: shared surface roles, related corner geometry, deliberate border weight, consistent gutters and a clear layer relationship.

A full-height square rail can work in a precise tool; an inset rounded rail can fit a softer card-based workspace. Do not paste an unrelated hard divider or white header strip beside soft inset panels without a structural reason. Conversely, do not infer that every sidebar must float, have a large shadow or use the exact card radius. Derive the treatment from the selected visual language, density and attachment to the viewport. Match related roles, not every shape indiscriminately.

Review the joins and states: header-to-sidebar connection, exposed outer corners, sidebar-to-content gutter, nested selected-item inset/radius, icon weight, separators and page background. Borders should not unexpectedly become darker or heavier between adjacent regions. Keep selection and keyboard focus clear on the actual light/dark surfaces. Avoid adding a frame around every region just to make them look alike.

Check full-shell behavior in addition to its resting picture. At short heights, long navigation or translated labels must remain reachable without compressing controls or pushing the account area outside its container. Choose scroll ownership deliberately; overflow ancestors can defeat sticky positioning, and rounded overflow can clip focus rings, shadows or popovers. On a narrow layout or drawer, preserve the same identity while adapting geometry to its new edge attachment, destinations and open/close behavior.

Use a full-page view and at least one scroll/focus state to assess coherence; a cropped card screenshot cannot establish it. When changing one shell region, recheck its relationship with the others using [radius/elevation](radius-elevation.md), [spacing](spacing-grid.md) and [adaptive behavior](adaptive-experience.md).

## Cards as useful objects

Cards work for comparable products, courses, projects, summaries, media previews, and bounded task groups. Use a card-based scheme when the user's preference or content supports it. Information order within a card remains deliberate: identity, useful evidence, state, then action.

For full-bleed photography, use [atmospheric image cards](atmospheric-image-cards.md): choose a useful crop, integrate text with a predictable scrim, and reserve frost for local controls. Image colors are content, not additional UI action/status tokens. A subtle warm-to-cool background wash may support this selected direction; it should not become a page-wide decorative effect that competes with content.

Avoid cards that exist only to fill a grid. Keep repeated content on stable tracks. A form or table can live in a bounded surface without placing a second rounded panel around every field or row. Distinguish interactive cards from static content; if a card has multiple controls, avoid a giant nested interactive wrapper and preserve separate keyboard targets.

Use a related radius family, for example controls 8 px, standard cards 12 px, dialogs 16 px. These are starting relationships, not mandatory numbers. A compact expert tool may be sharper, and a touch-oriented consumer product softer. Round badges/avatars only when their role warrants it; ordinary navigation need not be pills.

Read [radius and elevation](radius-elevation.md) when defining corner scales, nested media/containers, shadows, or layered surfaces. Use a few shared radius roles, derive aligned nested corners from their effective inset, and distinguish physical depth from visual priority. Light layered shadows are a useful starting point; dark themes also need deliberate surface values and edges. Do not make every card appear to float.

## Density, layout, and spacing

Choose **focused**, **standard**, or **dense** according to task frequency, audience, and comparison needs. Use a small spacing system, commonly based on 4 px steps. Proximity should express relationships; hierarchy should survive removing borders.

Use [spacing and grids](spacing-grid.md) for the detailed contract: shared scale and relationship roles, distinct padding/gap/margin responsibilities, usable container width, 12-track alignment versus visible card columns, and narrow-container fallback. Keep related gaps smaller than group separation where that expresses the actual relationship; do not make every gap equal or maximize whitespace indiscriminately.

- Form/reading content uses controlled width; do not stretch prose across a wide monitor.
- Desktop comparison can use columns and secondary panels; mobile reorganizes priority instead of shrinking those columns.
- Place filters next to their evidence. Keep a primary action visible and related to the object it affects.
- Use content-driven heights, min-width constraints, and intentional wrapping. Test long translated labels and realistic values before finalizing widths.

## Typography across scripts

Use [typography and hierarchy](typography-hierarchy.md) as the detailed type reference. Choose semantic roles and coordinated size, weight, line-height, tracking, measure, and spacing from the project's reading context. Do not copy compact demo type into a production app or replace hierarchy with excessive bold/color.

Keep ordinary UI and CJK tracking near zero unless the chosen font and context justify adjustment. Test the actual language/font fallback, numeric columns, long text, zoom, and user spacing overrides. Maintain readable secondary text on its actual surface. The type system should work with neutral structure before glass, images, or shadow are added.

## Icons, materials, states

Use [button design](button-design.md) for a related family of compact, standard and prominent actions, with solid/soft/outline/text surfaces and context-appropriate corners. Size, priority and semantic tone are independent choices. Keep grouped controls aligned, preserve readable labels, and judge buttons within the whole page rather than rewarding isolated decoration.

Use [icons and controls](icons-and-controls.md) for semantic icon/label mapping, coherent size/stroke/roundness, accessible names and the complete open-dropdown experience. Use meaningful icons more often where they aid scanning and actions; replace an incoherent existing family instead of preserving poor icon styling. Prefer one consistent family and avoid unrelated decorative glyphs. Check popup corners, borders, state icons and focus as carefully as the trigger.

Opaque surfaces are the reliable baseline for dense reading and data. Glass can also be a deliberate direction for cards, navigation, floating controls, and overlays when suited to the project. Show matched opaque, lightly frosted, gradient-frosted, and transparent alternatives using [glass materials](glass-materials.md); let the user select its intensity and placement. Keep the three color roles intact. See [Apple interaction](apple-interaction.md) for motion and spatial behavior.

Define hover, focus, pressed, selected, disabled, loading, error, and success where reachable. Use visible focus on every surface. State changes should not shift neighboring controls. Avoid `transition: all`, heavy glows, decorative gradient blobs, and repeated visual effects that compete with the task.
