# Project-led Theme Selection

A scheme includes layout, density, surface treatment, type, interaction, and responsive behavior. A palette is only one part.

## Decision precedence

1. Explicit user choices and exclusions.
2. Explicit brand constraints and required technical/business contracts; retain existing visual patterns after evaluating their quality.
3. Product evidence: audience, core task, content, frequency, input method, environment, and accessibility.
4. Refined blue-white with restrained cards as the fallback when evidence does not favor another direction.

For existing-site redesigns, use the [baseline audit](redesign-audit.md) to distinguish useful elements from visual weaknesses. The old palette, font or composition is not mandatory; recommend a fresh layout when the old structure is a root cause. Proposals target desktop by default, with additional devices only when requested.

Preserve the three-role color system in every option. Do not choose by industry stereotype: finance education and a trading console need different density and interaction.

## Candidate directions

Use these as a vocabulary, not an exhaustive menu. Derive a custom scheme when needed.

For a light enterprise homepage, use the [enterprise workbench](enterprise-workbench.md) pattern to adapt the blue-white or branded-neutral direction around actual business questions. It is an information-architecture option, not a requirement to turn every backend page into a dashboard.

| Direction | Strong fit | Layout and visual treatment | Motion and mobile adaptation | Main tradeoff |
|---|---|---|---|---|
| Refined blue-white / 清爽蓝白 | SaaS, management tools, education, service portals | White content surfaces, neutral canvas, restrained blue actions, tables and selected bounded cards | Short feedback; sidebar becomes task navigation or drawer on small screens | Can feel generic without project-specific hierarchy and content |
| Soft cards / 柔和卡片 | Personal tools, learning, wellness, consumer services | Comparable content cards, generous grouping, moderate rounding, one accent, comfortable type | Tactile press feedback; desktop grid becomes an ordered mobile list | Too many cards fragment workflows; tables can be better for comparison |
| Atmospheric image cards / 轻盈氛围 · 影像卡片 | Photo-led discovery, lifestyle, travel, events, catalogs, and portfolios when meaningful imagery exists | Warm/cool pale canvas, restrained scenic illustration, full-bleed image cards, integrated text over a stable scrim, local frosted controls | Quiet feedback; ordered mobile cards and deliberate desktop grid, with independent dark mappings | Depends on image quality/cropping; variable photos require robust contrast and loading/error fallbacks |
| Apple-inspired layered / 苹果式层次 | Creative tools, media, guided consumer flows | Strong type, simple surfaces, optional translucent toolbar/sheet over moving content | Interruptible direct manipulation when useful; touch sheet and desktop popover can serve the same task | Blur/springs cost performance and can reduce readability |
| Glass and frosted layers / 玻璃与磨砂 | Portfolio/brand showcases, media, creative canvases, contextual controls | Lightly frosted or more transparent cards/chrome over meaningful content; readable opaque regions for dense text | Static material plus restrained feedback; mobile can reduce blur area and raise opacity | Variable backgrounds and devices require contrast/performance testing; avoid stacked transparent reading surfaces |
| Precise graphite / 专业石墨 | Developer tools, infrastructure, dense expert work | Neutral chrome, tight alignment, restrained accent, lists and panels | Immediate feedback, keyboard paths; mobile prioritizes essential actions | Density needs mobile recomposition and legible secondary text |
| Content-led editorial / 内容优先 | Publications, portfolios, product stories, catalogs | Typographic rhythm and imagery lead; sparse chrome, unframed sections, cards for discrete items | Quiet transitions; readable single-column mobile flow | Less suited to constant dense multi-object comparison |

Dark mode is a mode of each scheme, not a separate scheme. Map surfaces and status pairs explicitly; do not invert light colors. Blue-white becomes a neutral dark canvas with readable blue accents at night. Card geometry and roles remain stable.

Radius and elevation are adjustable dimensions of every scheme, not additional full-page themes. Use [radius and elevation](radius-elevation.md) to tune compact, balanced, or softer geometry to project density and preference. Compare the same component with a coherent radius family; compare shadow strength separately. Keep role hierarchy stable when switching to dark mode, even if shadows are replaced by surface contrast and borders. No extra preference question is needed when the user already selected a coherent design.

Choose a typography profile from the actual task using [typography and hierarchy](typography-hierarchy.md). A compact operational screen, standard product flow, and long reading page need different measure, leading, and type scale. Include those differences in relevant visual comparisons, but do not add a separate typography questionnaire after the user has already selected a coherent direction.

Let users choose interface and monospace families with the [font selection](font-selection.md) preview alongside relevant design options. Keep the same content, size, weight, and layout for a font-only comparison. Retain an accepted font choice rather than reopening it for every screen. Runtime font settings belong in the delivered product only when that customization is requested or part of the product requirements.

Coordinate spacing density with that type profile using [spacing and grids](spacing-grid.md). Compact, standard, and relaxed spacing are adjustable dimensions, not additional mandatory style menus. Compare matched content when the user is choosing density. An accepted design direction should already guide group gaps, card padding, gutters, and breakpoints without asking again for every value.

For image-led choices, read [atmospheric image cards](atmospheric-image-cards.md). Its main character comes from image composition, soft neutral atmosphere, and integrated cards; glass is a local supporting material. Do not recommend it solely because a project is categorized as travel or consumer-facing. Confirm imagery is useful and available and that visual discovery matters more than dense comparison.

## Offering a useful choice

Resolve [the design mode](design-modes.md) first. In a Demo route, use the [integrated studio](design-studio.md) to present a recommendation and credible alternatives after project/stack analysis. Direct mode proceeds with a justified project-specific choice without requiring a Demo. Adapt the sample to the project and compare the same representative content, without requiring the user to separately request a visual preview. If only one fits the constraints, explain why instead of fabricating options.

Each option states project fit, desktop composition and requested additional devices, density/card/type/material treatment, primary action, light/dark and language behavior, and one concrete compromise. Mark the recommendation. For a new design choice, show representative visual previews when tools permit, then let the user choose. Keep the comparison small and use matched content rather than building complete alternatives. If the project plausibly benefits from glass or the user requests it, include the material comparison described in [glass materials](glass-materials.md). State a real visual-tooling limitation instead of substituting names alone while claiming a visual comparison.

Example for a bilingual learning dashboard:

| Option | Why it fits | What the user would see | Compromise |
|---|---|---|---|
| Blue-white learning workspace (recommended) | Progress and next action need fast scanning | Course cards + compact progress summary; focused mobile course list; opaque surfaces in both themes | Less expressive than an editorial direction |
| Soft-card learning companion | Occasional, touch-first use and relaxed reading | Larger course previews and spacing; sheet-based mobile detail | Fewer courses visible at once |
| Content-led course library | Discovery and reading outweigh progress management | Search, topics, previews, generous text hierarchy | More navigation to detailed progress |

For a new unselected scheme, show options and let the user choose before final visual implementation. Proceed with a stated recommendation when they explicitly skip the Demo/selection step; an ambiguous "choose for me" alone does not waive the initial mode question. Do not repeatedly ask after selection. A small branded-page edit does not need a style menu.

## Combining preferences

Support coherent combinations such as blue-white + soft cards + lightly frosted navigation, or a content-led portfolio + selected glass cards. Match density to the task, glass placement to readable context, and springs to direct manipulation. Do not mix competing accents or unrelated radii/icons. Record the chosen material intensity and scope (navigation, cards, floating tools, or overlays), not only the scheme name.

An atmospheric image-card direction can use mostly opaque page chrome with frosted badges or menus. When comparing it with a neutral layout, keep the content and image set comparable so users can judge composition and material rather than being persuaded by a better photograph. For a material-only comparison, also keep layout and typography fixed.

A user can prefer expressive cards while needing a comparison table. Preserve the preference in surrounding hierarchy and bounded summaries; explain why tabular evidence remains a table.

## Audit

Inspect raw colors, action/status tokens, charts, icons, borders/shadows, overlays, focus, type, modes, and locales. Remove unintended remnants from the prior scheme. Reuse coherent brand tokens instead of replacing them with house defaults.

The comparison belongs in the design discussion or a requested selector. Do not ship an ordinary product with an unsolicited style gallery, design commentary, or density control.

## Structural and visual diversity

The bundled presets now pair different DOM compositions with type, tone, card and icon choices: task workbench (sidebar and overview), content split (primary records/collection plus context rail), brand editorial (top navigation, branded lead and numbered content), and compact ledger (records before supporting metrics). Inspect the same project content in multiple directions; changes limited to hue or blur do not satisfy this comparison. Every implemented dimension remains adjustable independently. Use the [mode and prompt contract](design-modes.md) to retain those adjustments.
