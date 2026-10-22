# Verify the Selected Design

Scale verification to the actual change. A visual patch should not require rebuilding the whole product or implementing unrelated states. A new multilingual, dual-theme application needs more than one desktop screenshot.

For new pages and substantial implementations, follow [independent implementation review](post-implementation-review.md) after the implementer's initial checks. Prefer a separate subagent when available and permitted; evaluate its evidence, fix confirmed issues and recheck the affected user paths. If only self-review was possible, identify it honestly. The checklist below supports a review; checking boxes or a reviewer saying “looks good” is not proof of task completion.

## Design and scope

- The chosen direction fits the project's evidence and the user's preference; explicit brand/style decisions are preserved.
- The default new-design flow used project/stack evidence and a representative unified preview before target-page generation, unless the user had already chosen or explicitly delegated. A highlighted recommendation or saved preference was not mistaken for a final selection.
- The generated page uses the selected stack and preserves the latest adjusted preview values. JSON/CSS exports and the design selector itself are not reported as a completed Vue, React, or HTML implementation. Review-only and bounded edit requests remain scoped to their actual task.
- When maintaining the page generator, check stack normalization, capture of manual adjustments instead of preset defaults, stale-generation feedback, ZIP validity and licensed assets, then compile representative Vue/React outputs and exercise the independent HTML output. Verify native events, translated content, appearance, input/focus preservation and responsive layout in the actual generated pages.
- When options were requested, they differ meaningfully in layout, density, type, materials, or interaction, not just color.
- For an unselected new scheme, the user receives representative visual options when tools permit. A glass recommendation includes matched opaque/frosted/transparent previews, relevant placement, a reason for the recommendation, and a way to select an alternative. Do not imply a recommendation was accepted merely because its preview is highlighted.
- The primary action and content order are clear before decorative effects.
- Cards represent useful objects/groups rather than an arbitrary wall of rounded boxes.
- An atmospheric image-card recommendation is supported by useful available imagery and a discovery-oriented task. Its preview uses project-representative images; it does not copy business text, identity, device chrome, or data from a reference screenshot.
- Every control works or is explicitly disabled. Data and claims are real or labeled illustrative.

For an existing-site redesign, first provide an evidence-based baseline score and retain/change inventory using [the audit rubric](redesign-audit.md). Compare the final result on the same dimensions; unavailable evidence stays unverified. Effect images should show what the proposed advice changes.

## Visual craft

- Neutral, accent, and semantic roles stay consistent across components and modes. Status includes words/icons.
- Test actual text, action, focus, and status contrast; gradients/materials need testing over real backgrounds.
- For text over photography, inspect bright, dark, and busy images, focal crops at supported widths, long labels, and loading/missing-image states. Scrims or opaque backing must preserve readability without relying on blur alone. Image corners and rounded clipping must not hide focus rings or controls.
- Borders, radii, type, spacing, icons, and elevation form a coherent family.
- Inspect the whole app shell: sidebar, top toolbar, canvas and content must have deliberate joins, compatible border weights, radius roles and gutters. Check selected/focus states, translated menu labels, scrolling and short heights; rounded containers must not clip controls or focus, and overflow ownership must not silently break sticky navigation. An attached square rail and an inset rounded panel are alternatives, not universal mandates.
- Apply [button design](button-design.md): inspect contextual size, label/padding/icon balance, primary versus supporting emphasis, solid/soft/outline/text surfaces, corner choices and action-group alignment. Inspect the actual hover, press, focus, disabled, loading and toggle states where present. Successful activation alone does not establish a well-designed button.
- Related content has clear proximity; label/input pairs, sibling groups, and page sections do not accidentally use one uniform gap. Shared spacing tokens remain coherent across padding, gaps, and margins, with deliberate optical/accessibility exceptions.
- Check actual inner container width after padding and gutters. Card grids must survive widths below their preferred minimum, and logical 12-track spans must recompose at narrow sizes. Test long titles/identifiers, focus order, the last item in a stack, and both parent-width and viewport changes where applicable; do not hide overflow to conceal an undersized grid.
- Type sizes and weights map to meaningful roles and fit the actual script/font. Check hierarchy without relying only on color; compact secondary text must remain readable. Confirm the chosen scale is appropriate for operational, general-product, or reading work rather than blindly applying a ratio.
- Inspect real paragraphs, mixed CJK/Latin content, long translations, numeric columns, font fallback, and measure at narrow/wide widths. Tabular digits do not replace right alignment or consistent decimal formatting. `ch` is not a literal character count, especially for CJK.
- For font selection, test all supported identifiers, independent UI/mono changes, requested weights, mixed-script wrapping, saved-choice restoration, and a real missing-local-font path. Preserve the requested choice while reporting fallback. A computed `font-family` string or `document.fonts.check()` alone does not prove the named font rendered. Keep bundled font licenses/provenance and avoid redistributing unprovided system font files.
- For workbenches, connect summary values and charts to evidence, keep units/time scopes consistent, and let urgent work outrank a decorative KPI row. Font/theme changes must not obscure chart labels, identifiers, or numeric alignment.
- Corner values map to shared roles; aligned nested elements follow the effective inset without negative radii. Check a tight-spacing case, large inset, changed size, and focus clipping. Circles/pills or independently positioned controls may use their own intentional geometry.
- Flat, raised, floating, and modal surfaces remain distinguishable without making every panel float. Inspect the combined shadow rather than each alpha value alone. Dark-mode boundaries and surface values preserve the hierarchy; shadow strength does not substitute for correct stacking, modal focus, or a scrim when appropriate.
- Long text and localized controls do not overlap, clip, or cause accidental page-wide horizontal scrolling.
- Inspect at least one actual screenshot and refine visible weaknesses after the first complete render. Do not infer visual quality from DOM assertions alone.
- Inspect repeated row density and the full neighboring composition after a local change: ordinary/long rows, readable identifiers, usable action targets, peer panel top/bottom edges, header/footer alignment and chart-axis labels. Compaction must not introduce clipping, broken baselines or a new empty block. Use [content-fit and alignment decisions](content-and-task-validation.md) rather than a universal row height or equal-height rule.

## Devices, languages, and themes

For every new web page or substantial redesign, inspect representative small (360/390), medium (768/1024), desktop (1280/1440) and actual-window CSS widths. Add a wide viewport when content or deployment makes it relevant. These samples guide verification rather than dictate breakpoints. Verify max width, navigation reorganization, card reflow, filter wrapping, touch targets, scroll ownership and keyboard-safe actions. Do not certify responsiveness from desktop screenshots or a CSS media query alone. A scoped edit checks affected responsive states rather than rebuilding unrelated pages.

For bilingual work, include Chinese and English across the responsive matrix, emphasizing expanded labels at narrow widths. Include long labels, real mixed-language content, validation, empty/error states, and accessible names. Confirm locale change preserves route and form state.

For light/dark/system, inspect every token family and one overlay in both appearances. Check initial render, system changes while selected, explicit stored overrides, storage-unavailable fallback where relevant, and unchanged task state. Do not call a dark theme complete after changing only the page background.

Use representative combinations instead of repeating every permutation after unchanged checks pass. Explain any deliberately unsupported or unverified combination.

## Interaction and accessibility

- Keyboard traversal follows task order; focus is visible, contained in modal dialogs, and restored on close.
- Check hover/press/selected/disabled/loading and recoverable errors where reachable. Keep controls stable during feedback.
- Inspect an open dropdown, menu, dialog, or sheet when present. Position, radius, surface, focus, Escape, and outside-close behavior should agree with its trigger and semantics.
- For gestures, verify slow movement, release, reversal, cancellation, mobile scrolling, and keyboard/button alternatives.
- Reduced motion removes unnecessary movement but preserves feedback. Materials have opaque/readable fallbacks.
- Glass is checked over plain and busy content in both themes; labels and status remain readable in the actual composite. Test reduced transparency/stronger contrast, unsupported-filter fallback, and touch scrolling. A numeric blur value alone does not validate appearance or performance. Avoid claiming a blur-only CSS imitation reproduces native optical refraction.
- User zoom/text enlargement remains usable, especially forms, navigation, and long translated labels.
- Increased line, paragraph, letter, and word spacing must not clip text, obscure controls, or lose content. Check this separately from default line-height; preserve normal wrapping and avoid fixed-height text containers. Visual heading size must not corrupt the semantic heading structure.

## Technical evidence and handoff

Run appropriate build and existing tests, inspect console errors, and verify assets. No new tests are required solely for a reversible low-impact visual edit unless a meaningful behavior warrants them.

State the chosen scheme and reason, the result path/URL, observed checks, and remaining limits. A screenshot does not prove spring physics; a successful build does not prove responsive layout; an instruction-only skill does not prove implementations in every framework. Be specific about what was actually exercised.

## Layout and task evidence

For filter/record workspaces, use [content and task validation](content-and-task-validation.md). Match content, font, locale, theme and viewport when comparing revisions; inspect the available panel as well as the browser width. Record full selected labels, content heights and reachable actions, including mixed-length cards and empty results. Test representative edit/queue/batch outcomes only where the product has those tasks, retaining input on failure and checking a non-target sample. Distinguish editing context from reload persistence. Browser task simulation is not a real-user study or evidence of human time savings.

## High-resolution desktop scope

When requested, check QHD/2K and 4K using [large-desktop guidance](large-desktop.md). Record actual CSS width/height, DPR, container bounds, overflow ownership and any untested physical scaling. Verify native exported page composition, open menus/dialogs and keyboard focus at large and reduced effective widths; a thumbnail or an embedded width option alone is insufficient evidence.

## Identity and composition acceptance

Use the [art-direction gate](art-direction.md#acceptance). Independently inspect the actual first screen: identify the project concept and at least two visible traits; check color across real regions, type contrast, meaningful media and the primary task. A neat, accessible generic scaffold still needs revision when the accepted brief calls for distinctive expression. Do not reward added decoration or prescribe personal taste. Report evidence and concrete changes rather than a target score.

For intended peer rows, record actual rendered top/bottom and footer/action anchors (approximately one CSS pixel tolerance) at a normal desktop and a content-pressure width. If equal height creates a large empty region, revise grouping/proportion instead of padding. Natural independent feeds do not need universal equal heights. Check the whole neighboring composition after changing a local panel.
