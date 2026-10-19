# Typography and Information Hierarchy

Source inspiration: [改善 排版层级和ui设计, by 风和梦](https://xhslink.cn/o/4tVf4rONJ89), seven illustrated panels reviewed on 2026-10-19. This is an adaptation, not a transcript. Keep the source's role-based hierarchy while treating numeric examples as calibration and accounting for language, fonts, devices, and accessibility.

## Define the roles before the numbers

Distinguish page context, section/card title, body, controls, supporting metadata, and important numeric data. A promotional display heading is optional; do not import a landing-page scale into every product panel. Most interfaces need only a small set of repeated sizes and weights, not every possible tier.

Choose the baseline from the audience, reading distance, script, content pressure, and frequency of use. Useful starting contexts:

| Context | Type behavior | What to prioritize |
|---|---|---|
| Compact expert workspace | Smaller, controlled title/body differences; tight but readable grouping | Scanning, alignment, accessible secondary text, stable numeric columns |
| Standard product | Clear page/section/body roles, comfortable paragraphs, restrained metadata | Task order, recognizable actions, ordinary touch/keyboard use |
| Reading or guided flow | Larger body, more leading, constrained measure, fewer simultaneous columns | Sustained reading, comprehension, text enlargement |

The [optional CSS profiles](../assets/typography.css) offer compact, product, and reading starting points. Adapt them to the actual font and project. Do not shrink essential text merely to preserve the desktop column count on mobile.

## Scale and weight work together

The source uses a modular-ratio idea around 1.25 and a practical rounded sequence. Do not claim every illustrated step follows an exact multiplier. A ratio can establish a starting rhythm; round or adjust values to fit real content and retain clear differences between roles. Existing coherent project type tokens take precedence.

Use two or three purposeful weights where sufficient, often regular body, medium controls/subheads, and semibold headings. Check which weights the actual font supplies; do not assume synthesized weights look like designed ones. Avoid making every heading, label, and number equally bold.

Define semantic tokens instead of scattered sizes. Distinguish document structure from appearance: choose heading elements according to the content hierarchy, then style them. Do not pick an `h4` solely because its default size happens to fit.

Hierarchy also uses proximity, paragraph rhythm, alignment, whitespace, and color contrast. Labels belong near their values; a heading should visually connect with the section it introduces. Keep essential secondary text readable rather than fading it until it disappears. Color is supportive, not the sole hierarchy cue.

## Tracking is script- and font-dependent

Begin ordinary UI and Chinese body text with neutral tracking. For a large Latin display heading, slightly tighter tracking may improve the selected font's appearance. Small uppercase Latin labels can sometimes use modest extra tracking. Neither treatment is a rule for all headings or all small text.

Check actual glyphs, diacritics, mixed scripts, and the font's optical-size support. Do not apply English uppercase/tracking conventions to Chinese labels or globally compress all headings. A value in `em` scales with that element's font size; a percentage-like visual judgment should not become one fixed pixel correction across every size.

## Leading and measure

The note's body leading around 1.6–1.75 is a useful long-paragraph starting point. Tune it for script, size, line length, font metrics, and density; headings and single-line controls have different needs. Prefer unitless line-height so it scales predictably with text. Paragraph spacing should separate thoughts without making every line feel like a different group.

A Latin reading measure around 60–75 characters can be a starting heuristic, not a guarantee or hard limit. CSS `ch` measures the advance of the font's zero glyph, so `65ch` does not mean exactly 65 characters. Do not apply it as a 65-Han-character rule. CJK text often needs a different, visually tested measure; `em` provides a fallback and `ic` can express an ideographic measure where supported. Both are font metrics, not a guarantee of literal character count. See [MDN's length units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length).

Constrain paragraphs with a maximum inline size and allow them to shrink to the container. Preserve natural Chinese wrapping and normal English word breaks. Use emergency wrapping for long identifiers/URLs rather than `break-all` everywhere. Do not justify every narrow paragraph or force one-line headings with hidden overflow. Use deliberate truncation only where the full text remains available and the task permits it.

## Numbers and font fallback

For the requested user-selectable pairings and monospace families, use [font selection](font-selection.md) and its machine-readable catalog. Keep `--font-ui` and `--font-mono` independent; record preferred identifiers separately from temporary fallback or availability results.

`font-variant-numeric: tabular-nums` requests equal-width digits when supported by the font. It helps changing values and numerical comparison, but it does not align columns by itself. Right-align numerical columns, use the correct locale, and apply consistent fractional precision where the data warrants it. Preserve signs, separators, units, and meaning; do not invent padding or decimal places purely for visual symmetry.

A font fallback list is an ordered request, not proof of the rendered font. Reuse installed/project fonts and appropriate CJK fallbacks. Do not silently depend on an unavailable Inter or proprietary Apple font; include a usable system/sans fallback and inspect the actual render. Loading, fallback, and language changes may alter wrapping. Avoid rigid text heights that only fit one font.

Use monospaced type for code or a justified numeric need, not as a replacement for all UI text. Do not promise tabular-digit differences will be visible if the selected font already uses equal-width digits or lacks the requested feature.

## Framework integration and accessibility

Keep type roles independent of React, Vue, HTML, or any utility framework. Apply the existing project's CSS/token conventions. A Tailwind example is not a reason to install or migrate to Tailwind; utility values and theme syntax depend on the installed version and customization.

Use scalable units and preserve browser text enlargement. Test increased line, paragraph, letter, and word spacing without losing content or controls. These user overrides are a robustness requirement, not a mandate to use those spacing settings as the site's defaults; consult [WCAG text-spacing guidance](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html). Do not hide overflow or impose fixed card heights to make a type specimen look tidy.

For bilingual products, update `lang`, translations, accessible labels, and formatting while preserving task state. Type hierarchy should remain coherent in both languages, but identical line breaks are not required. Dark mode changes color roles and contrast; it should not need a wholesale type-size change.

## Compare and verify

Use the [interactive typography laboratory](../examples/typography-lab.html) for matched-content hierarchy, language, density, leading, and measure comparisons. It includes numeric formatting and a spacing-stress view; these are design-preview controls, not mandatory product settings.

For the user's project, show real headings, a realistic paragraph, metadata, one action, and representative numbers where relevant. Compare design alternatives on the same content. Keep a selected project direction; do not open a new typography preference gate for every small edit.

Inspect scanning order, paragraph readability, narrow and wide measures, long translated labels, actual font fallback, numeric alignment, focus, zoom, and spacing overrides. State which scripts, sizes, and interactions were verified rather than claiming a universal scale or complete accessibility certification.

## Real options, real labels

Check every relevant selected value, not just placeholder text. A font change, translated option or number unit can alter intrinsic width. Shorten only when meaning survives; do not shrink text to disguise an undersized control. Inspect closed controls and open menus on both sides of actual wrapping transitions; see [content and task validation](content-and-task-validation.md).
