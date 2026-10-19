---
name: adaptive-ui-designer
description: Analyze web projects and their technology stacks, recommend and display adjustable design options in a unified preview, then generate the user's confirmed choice in Vue, React, HTML/CSS/JS, or the existing stack. Covers responsive layouts, three-role color, real font selection, glass, radius/shadows, Chinese/English, and light/dark/system modes. Also use for scoped UI redesigns and reviews; not native app code or illustration-only work.
---

# Adaptive UI Designer

Create project-specific, usable interfaces with deliberate visual hierarchy and interaction. This is a standalone skill with its own references and examples. Its core workflow does not require another skill, an external account, or a named proprietary tool.

**Default for new pages and substantial redesigns:** analyze the project and stack → adapt the integrated preview with a recommendation and alternatives → let the user adjust and choose → implement the confirmed design in the selected stack → verify the resulting page. Prepare preview code before selection; generate the final target page after selection. Reuse an already confirmed design, and honor an explicit request to delegate or skip the choice. A scoped fix or review does not restart design discovery.

## Working principles

- **Project before aesthetic.** Fit the audience, core job, content, brand, device context, and user preference. Reuse a coherent existing system.
- **Choice with a visible recommendation.** When no direction is selected, recommend one and compare one or two credible alternatives using representative visual previews when tools permit. Explain differences in structure, density, cards, typography, materials, and interaction, not just hue. Let the user choose after seeing the options.
- **Three color roles.** Neutrals build structure; accent guides action, selection, and focus; semantic colors convey stable states. These are roles, not a limit of three swatches. Pair status color with text/icons.
- **Typography establishes hierarchy.** Coordinate semantic type roles, size, weight, line height, measure, spacing, and alignment. Fit the language, font, density, and device instead of applying a fixed scale everywhere. Keep headings semantic and essential secondary text readable. Offer the supported interface and monospace font choices in the design preview, preserve user preferences, and distinguish confirmed font availability from fallback.
- **Spacing expresses relationships.** Use shared spacing roles to keep related elements close and groups distinct. Choose container width, gutters, and grid behavior from actual content and available space; more whitespace or more columns is not automatically better.
- **Geometry and depth have roles.** Keep a small coherent radius family and distinguish flat, raised, floating, and modal surfaces. Coordinate nested corners with their actual inset. Shadows communicate depth, not importance alone; dark mode may rely more on surface values and borders.
- **Blue-white and cards are supported directions.** Use refined blue-white as the fallback when evidence offers no stronger direction. Cards are useful for discrete content and grouped tasks; they need not surround every element.
- **Atmospheric image cards are a distinct direction.** When photography, discovery, and emotional tone are central, consider a light atmospheric canvas, full-bleed image cards, soft geometry, and local frost. Keep text contrast and task hierarchy stable; do not confuse this direction with applying transparency to every container.
- **Apple-inspired craft is behavior as well as appearance.** Immediate feedback, continuity, clear exits, comfortable typography, and restraint apply broadly. Glass, springs, large radii, and gestures are conditional choices.
- **Glass is a selectable material.** Assess glass for the project instead of omitting it or applying it everywhere. When plausible or requested, show matched opaque, lightly frosted, and more transparent components over representative content. Recommend the appropriate intensity and placement; the user may choose another feasible option.
- **Adapt rather than shrink.** Design mobile and desktop from their actual tasks and input methods. Support Chinese-only, English-only, and bilingual sites. New builds normally include light/dark/system modes unless excluded.
- **Scope stays bounded.** A small edit does not authorize a redesign, framework migration, localization rollout, data integration, or deployment. Explicit user choices override defaults.

## Resource routing

Read the relevant resource when its decisions arise; do not load every reference for a narrow edit.

Use the [integrated design studio](examples/design-studio.html) as the default comparison surface in this workflow. It joins project recommendations, color, UI/monospace fonts, material scope, radius/elevation, density, Chinese/English, light/dark/system, and actual-width device previews. Read [studio integration and selection handoff](references/design-studio.md) to adapt it to the actual project and carry the chosen settings into implementation. Existing individual laboratories supplement a focused comparison; do not send the user through separate labs for every design dimension.

| Resource | Purpose |
|---|---|
| [Theme selection](references/theme-selection.md) | Project fit, visual directions, user choice, and style combinations |
| [Visual system](references/visual-system.md) | Three-role color, blue-white, cards, geometry, type, icons, and hierarchy |
| [Typography and hierarchy](references/typography-hierarchy.md) | Project-based type scales, weight, tracking, leading, line width, numeric alignment, and font fallback |
| [Font selection](references/font-selection.md) | Seven interface pairings, five monospace choices, real loading, local availability, preference storage, and font delivery |
| [Enterprise workbench](references/enterprise-workbench.md) | Light card-based workbenches, business priorities, meaningful charts, evidence tables, and restrained color |
| [Spacing and grids](references/spacing-grid.md) | Spacing scales, proximity, padding/gap/margin, container widths, logical grids, and responsive card columns |
| [Radius and elevation](references/radius-elevation.md) | Corner families, nested geometry, subtle layered shadows, surface roles, and dark-mode separation |
| [Adaptive experience](references/adaptive-experience.md) | Desktop/mobile, Chinese/English localization, and light/dark/system behavior |
| [Apple interaction](references/apple-interaction.md) | Feedback, gestures, springs, materials, and accessibility |
| [Glass materials](references/glass-materials.md) | Scene-based glass recommendations, visual comparison, intensity/placement choices, and fallbacks |
| [Atmospheric image cards](references/atmospheric-image-cards.md) | Image-led consumer experiences, soft background atmosphere, integrated cards, and restrained glass |
| [Implementation](references/implementation.md) | Vue, React, HTML, and other stacks without unnecessary migrations |
| [Verification](references/verification.md) | Visual refinement, realistic states, device/theme/locale checks |

Use [blue-white token seeds](assets/blue-white.tokens.css) when a project lacks a palette. Adapt them to the chosen design; do not replace an existing brand automatically. The [interactive color example](examples/three-role-color-studio.html) demonstrates the three roles, gray comparison, accent variants, and dark mode. Its demo task data, Chinese-only copy, and compact type are not a universal production template. Do not embed its laboratory controls in ordinary product pages.

Use the [material comparison example](examples/glass-material-comparison.html) to demonstrate opaque, frosted, and transparent UI, scene recommendations, light/dark modes, component details, and explicit selection. Adapt its content to the user's project when presenting options. Optional [glass tokens and classes](assets/glass-materials.css) provide a portable starting point.

For shape/depth decisions, use the [radius and elevation example](examples/radius-elevation-lab.html) and optional [CSS seeds](assets/radius-elevation.css). Compare geometry on matched content rather than changing color, typography, and shadow simultaneously. Treat sample values as calibration, not a new brand requirement.

For text hierarchy, use the [typography example](examples/typography-lab.html) and optional [type tokens](assets/typography.css). The example compares identical content, supports Chinese/English text, and adjusts leading and measure. Its compact, product, and reading profiles are starting points to adapt, not fixed standards for every project.

Use the [font selector](examples/font-selection.html) to let users compare the supported interface/monospace pairs on identical Chinese, English, numeric, and code samples. Its [catalog](assets/font-catalog.json), [preference helper](assets/font-preferences.js), and [CSS presets](assets/font-presets.css) are portable; the [font-face declarations](assets/font-faces.css) reference bundled open fonts with [provenance and licenses](assets/fonts/manifest.json). Local-only fonts remain device-dependent and must not be labeled as successfully loaded without evidence.

For grouping and layout, use the [spacing/grid example](examples/spacing-grid-lab.html) and optional [spacing seeds](assets/spacing-grid.css). The example separates group spacing from card columns and 12-track alignment; it can shrink the actual preview container to expose overflow and reflow behavior.

## Workflow

### 1. Analyze the project and resolve its stack

Inspect available source before choosing a framework: package manifests/lockfiles, framework versions, entry points, routes, component/style conventions, tokens, fonts, representative screens, and relevant build commands. Establish the audience, core task and action, content/density, existing brand, user preferences, devices, languages, and appearance needs. Summarize the few findings that affect the design, distinguishing evidence from assumptions.

Keep the existing stack unless the user requests a migration. For a new project, follow the requested Vue, React, or HTML choice; if unspecified, recommend a fit from the required interactions and deployment context and resolve a material ambiguity during design selection. Do not choose the production stack merely because the preview is buildless HTML. Ask only about information that cannot be inferred and would change the result.

### 2. Build and show project-specific options

Use a project-local copy of the [integrated studio](examples/design-studio.html), following [studio integration](references/design-studio.md). Adapt its sample content, hierarchy, candidate settings, and layouts to the analysis; do not modify the installed skill for an ordinary project. Open or render a working preview using available tools. An unchanged generic gallery or a prose-only list is not the completed preview step.

Normally show one recommended direction and one or two credible alternatives using [theme selection](references/theme-selection.md). Explain project fit and one practical tradeoff per option. Preserve explicit brand/font preferences across candidates. Vary meaningful layout, density, type, material and depth decisions; keep representative content comparable. If only one option fits hard constraints, explain why instead of inventing alternatives.

Offer combined controls for color roles, UI/mono fonts, glass intensity and placement, radius, shadow and density, with the supported locales, appearances and device widths. Use [glass materials](references/glass-materials.md) and, when imagery serves the task, [atmospheric image cards](references/atmospheric-image-cards.md). Do not force every project into the bundled dashboard example. A representative page slice is enough for selection; do not build several complete production apps.

The studio's local keyword rules are suggestions, not a substitute for inspecting the user's project. If interactive rendering is unavailable, provide the closest reviewable artifact and state the limitation; do not claim a preview was displayed.

### 3. Let the user adjust and confirm the design

Let the user compare and tune the preview. Keep recommendation separate from current selection, and preserve manual edits across locale/device/theme changes. The studio offers Vue/React/HTML stack selection and **Confirm & generate**, which captures the current settings and produces the corresponding runnable page source ZIP. That explicit action confirms the captured design for local generation; it does not authorize deployment or unrelated repository changes. A saved preference, ordinary JSON/CSS export, highlighted default, or silence alone is not confirmation.

For a new design with no confirmed choice, show the concrete preview first, then let the user use the stack selector and confirmation button, or ask one concise question for the final direction and any unresolved stack. Wait for that choice before generating the final target page; continue independent source inspection or content modeling meanwhile. A statement such as “use this adjusted scheme and build it in Vue” or a matching confirmed generation snapshot is sufficient: do not add another confirmation round. An existing accepted design or explicit delegation to choose also lets implementation proceed.

Carry forward a concise design contract in existing project conventions or the handoff: layout/content priority, selected colors, exact UI/mono fonts and availability, glass intensity/scope/fallback, radius/elevation, spacing/density/type, supported device behavior, locales and appearance modes, and the target stack. Record the user's adjustments rather than reconstructing the untouched preset from its name. A fixed color preference narrows the design options; it does not automatically settle the whole layout.

### 4. Generate the confirmed page in the target stack

Use [implementation](references/implementation.md): Vue pages/components follow the project's SFC conventions; React pages/components follow its JSX/TSX and router conventions; HTML output uses semantic HTML, CSS and JavaScript. Integrate into the real project when one exists; otherwise deliver a runnable page/project and concise run instructions. Generate the selected stack, not three separate implementations unless requested.

Translate the confirmed design into reusable tokens and appropriate native components, not a screenshot or an iframe of the studio. The studio's ordinary JSON/CSS exports are handoff inputs; **Confirm & generate** additionally creates a runnable starter from its current preview content. Integrate that result into the existing project rather than replacing its stack/router, and implement the actual requested business behavior. Reuse verified font assets with licenses, preserve the selected three-role colors and geometry, and identify remaining demonstration data. Keep the studio's design controls out of the final product unless they are a requested feature.

Use [adaptive experience](references/adaptive-experience.md) for the selected desktop/mobile, Chinese/English and light/dark/system behavior, preserving input and task context during changes. Read [Apple interaction](references/apple-interaction.md) when motion or materials require it. Refine the actual render against the accepted preview, without silently resetting the user's choices.

### 5. Verify the generated result and hand off

Run the target project's relevant build/type checks and use [verification](references/verification.md) for the changed scope. Compare the actual page with the final selected settings, then check representative device/locale/theme combinations, real font loads, material fallbacks, key interactions, focus, and console errors. Fix implementation drift before calling the selected design complete.

Report the implemented stack, chosen design, runnable result location, observed checks, and concrete limits. A valid skill or exported CSS does not prove a generated Vue/React/HTML page has been built or visually tested; report only the implementation actually delivered.

## Boundaries and attribution

Keep all internal references relative and the skill usable across compatible coding agents. Use equivalent available file, browser, and test tools; no automatic network dependency is needed for design reasoning. Follow current official framework docs when an implementation API is uncertain.

Do not add authentication, publishing, account changes, audio, vibration, or persistent data services solely because this skill is active. Preserve the [Apple Design MIT license](references/apple-design-LICENSE.txt) with adapted interaction material.
