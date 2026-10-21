---
name: adaptive-ui-designer
description: Design or redesign desktop-first web UIs through Demo selection, explicit direct generation, or a reusable design-prompt handoff. Analyze the project and stack; score existing sites with evidence, diagnose weaknesses and keep useful parts; show project-specific previews, implement the selected Vue, React, HTML or existing-stack page, and independently review the result when supported. Includes real fonts, contextual button design, meaningful icons, rounded controls, three-role color, gradient frosted glass, and light/dark modes. Tablet/mobile work is opt-in. Not for native app code or illustration-only work.
metadata:
  version: "v0.1.0"
---

# Adaptive UI Designer

Create project-specific, usable interfaces with deliberate visual hierarchy and interaction. This is a standalone Agent Skills package for compatible coding agents, including Codex, Claude Code, Kilo Code and OpenCode. Its core instructions, references and browser assets do not require a specific model provider, another skill, an external account, or a named proprietary tool. `agents/openai.yaml` is optional Codex UI metadata; other hosts can use the same `SKILL.md` and supporting files without it.

Use the host's available file, shell, browser and conversation capabilities. Resolve supporting paths relative to this skill directory and work in the user's project. Read [agent compatibility](references/agent-compatibility.md) when adapting the workflow to another CLI or a host without visual tools. Use the user's requested language; the English-default README does not determine the project's content language.

**Default for new pages and substantial redesigns:** inspect enough project context, then ask once whether to use an adjustable HTML Demo first, generate directly, or only export a design prompt. Use [design modes](references/design-modes.md). An explicit request to skip the Demo bypasses preview within the requested deliverable scope; prompt-only still produces no app; a confirmed design/prompt can be reused. Do not infer an opt-out from an ambiguous “you design it”. In Demo routes, show project-specific compositions, let the user tune and confirm, then continue implementing directly in the current project and conversation. Capture the adjusted design internally; prompt export is optional for a different CLI or handoff, not a prerequisite for implementation. Implement only in choose-then-design or direct mode; prompt-only stops at the design handoff. Verify/review the selected deliverable, resolve relevant defects and report evidence. Desktop is the default; tablet/mobile remain opt-in. Scoped fixes and skill maintenance do not restart a route/style questionnaire.

## Working principles

- **Project before aesthetic.** Fit the audience, core job, content, explicit brand constraints and user preference. Keep useful capabilities and technical contracts. During redesign, old styling is evidence to assess, not a visual boundary: replace weak fonts, palettes, composition and component styling rather than polishing the same flawed template.
- **Choice with a visible recommendation.** When no direction is selected, recommend one and compare one or two credible alternatives using representative visual previews when tools permit. Explain differences in structure, density, cards, typography, materials, and interaction, not just hue. Let the user choose after seeing the options.
- **Three color roles.** Neutrals build structure; accent guides action, selection, and focus; semantic colors convey stable states. These are roles, not a limit of three swatches. Pair status color with text/icons.
- **Typography establishes hierarchy.** Coordinate semantic type roles, size, weight, line height, measure, spacing, and alignment. Fit the language, font, density, and device instead of applying a fixed scale everywhere. Keep headings semantic and essential secondary text readable. Offer the supported interface and monospace font choices in the design preview, preserve user preferences, and distinguish confirmed font availability from fallback.
- **Spacing expresses relationships.** Use shared spacing roles to keep related elements close and groups distinct. Choose container width, gutters, and grid behavior from actual content and available space; more whitespace or more columns is not automatically better.
- **Geometry and depth have roles.** Keep a small coherent radius family and distinguish flat, raised, floating, and modal surfaces. Coordinate nested corners with their actual inset. Shadows communicate depth, not importance alone; dark mode may rely more on surface values and borders.
- **Blue-white and cards are supported directions.** Use refined blue-white as the fallback when evidence offers no stronger direction. Cards are useful for discrete content and grouped tasks; they need not surround every element.
- **Atmospheric image cards are a distinct direction.** When photography, discovery, and emotional tone are central, consider a light atmospheric canvas, full-bleed image cards, soft geometry, and local frost. Keep text contrast and task hierarchy stable; do not confuse this direction with applying transparency to every container.
- **Apple-inspired craft is behavior as well as appearance.** Immediate feedback, continuity, clear exits, comfortable typography, and restraint apply broadly. Glass, springs, large radii, and gestures are conditional choices.
- **Glass is a selectable material.** Assess solid, light frost, gradient frost and more transparent treatments by scene. Adapt soft tint, feathered color transitions, edge highlights and local backdrop blur from references without copying their content or page structure. Keep reading surfaces dependable and effects bounded; a gradient on every card is not refinement.
- **Meaningful icons and complete controls.** Use a coherent icon family to support actions and navigation, with semantic label matches, related sizes/strokes/roundness and accessible names. Inspect open dropdowns as well as triggers; use a theme-matched rounded popup when the native menu is visually incompatible.
- **Buttons express action hierarchy.** Choose compact, standard or prominent sizes by context, then select solid, soft, outline or text treatment by priority. Coordinate type, padding, icon proportions, corners and full interaction states. Different sizes and shapes should have a reason; peers remain coherent. Show representative button combinations in the project preview and include their visual quality in review.
- **Desktop is the default.** Prioritize desktop composition, keyboard/pointer use and realistic window widths. For 2K/4K or high-density monitors, use [large-desktop guidance](references/large-desktop.md): measure the CSS viewport, choose task-based width limits, and preserve readable control proportions through zoom. Do not automatically add a separate tablet/mobile design or QA matrix. If requested, design those layouts deliberately. Preserve existing responsive behavior and basic resize/zoom usability. Chinese/English scope follows the audience; new builds normally include light/dark/system modes unless excluded.
- **Avoid a generic template look.** Let actual tasks, content and project identity drive composition. Remove decorative KPI rows, interchangeable cards, arbitrary gradient blobs, unrelated icon tiles and repeated glow/blur when they lack purpose. Do not confuse “less AI-looking” with intentionally inconsistent styling.
- **Scope stays bounded.** A small edit does not authorize a redesign, framework migration, localization rollout, data integration, or deployment. Explicit user choices override defaults.
- **Evidence before completion.** Check the rendered result and real user tasks after implementation. For new pages or substantial UI changes, prefer a separate review subagent when the host provides delegation and its rules permit it. Give the reviewer the user requirements and runnable artifacts rather than the implementer's success claims. Resolve reproducible defects and retest the affected paths; distinguish taste and unverified areas from failures.

## Resource routing

Read the relevant resource when its decisions arise; do not load every reference for a narrow edit.

Use the [integrated design studio](examples/design-studio.html) as the comparison surface when the user selects a Demo route. It joins project recommendations, color, UI/monospace fonts, material scope, radius/elevation, density, button size/fill/corners, Chinese/English, light/dark/system, and actual-width device previews. Read [studio integration and selection handoff](references/design-studio.md) to adapt it to the actual project and carry the chosen settings into implementation. Existing individual laboratories supplement a focused comparison; do not send the user through separate labs for every design dimension.

| Resource | Purpose |
|---|---|
| [Same-conversation implementation](references/same-conversation-implementation.md) | Read the confirmed Demo directly, integrate existing source and keep prompt export optional |
| [Design modes and prompt handoff](references/design-modes.md) | Ask about Demo first, respect direct/prompt-only routes, compare real compositions and export the exact confirmed contract |
| [Agent compatibility](references/agent-compatibility.md) | Portable skill loading, host capability mapping, terminal-only previews and honest validation limits |
| [Existing-site audit](references/redesign-audit.md) | Evidence-based scorecard, root causes, retain/change inventory, redesign proposals and matched effect images |
| [Icons and controls](references/icons-and-controls.md) | Semantic icon selection, size/stroke/roundness, coherent open dropdowns and accessible select behavior |
| [Button design](references/button-design.md) | Contextual size, emphasis, fill, corner families, grouped actions and complete states |
| [Theme selection](references/theme-selection.md) | Project fit, visual directions, user choice, and style combinations |
| [Visual system](references/visual-system.md) | Three-role color, blue-white, cards, geometry, type, icons, and hierarchy |
| [Typography and hierarchy](references/typography-hierarchy.md) | Project-based type scales, weight, tracking, leading, line width, numeric alignment, and font fallback |
| [Font selection](references/font-selection.md) | Seven interface pairings, five monospace choices, real loading, local availability, preference storage, and font delivery |
| [Enterprise workbench](references/enterprise-workbench.md) | Light card-based workbenches, business priorities, meaningful charts, evidence tables, and restrained color |
| [Content fit and task validation](references/content-and-task-validation.md) | Panel-aware wrapping, natural card height, contextual focus and committed workflow outcomes |
| [Spacing and grids](references/spacing-grid.md) | Spacing scales, proximity, padding/gap/margin, container widths, logical grids, and responsive card columns |
| [Radius and elevation](references/radius-elevation.md) | Corner families, nested geometry, subtle layered shadows, surface roles, and dark-mode separation |
| [Large desktops](references/large-desktop.md) | QHD/2K and 4K, CSS viewport versus display scaling, bounded/fluid content policies and high-density assets |
| [Adaptive experience](references/adaptive-experience.md) | Desktop/mobile, Chinese/English localization, and light/dark/system behavior |
| [Apple interaction](references/apple-interaction.md) | Feedback, gestures, springs, materials, and accessibility |
| [Glass materials](references/glass-materials.md) | Scene-based glass recommendations, visual comparison, intensity/placement choices, and fallbacks |
| [Atmospheric image cards](references/atmospheric-image-cards.md) | Image-led consumer experiences, soft background atmosphere, integrated cards, and restrained glass |
| [Implementation](references/implementation.md) | Vue, React, HTML, and other stacks without unnecessary migrations |
| [Verification](references/verification.md) | Visual refinement, realistic states, device/theme/locale checks |
| [Independent implementation review](references/post-implementation-review.md) | Reviewer brief, evidence-based findings, severity, fixes and focused rechecks before handoff |

Use [blue-white token seeds](assets/blue-white.tokens.css) when a project lacks a palette. Adapt them to the chosen design; do not replace an existing brand automatically. The [interactive color example](examples/three-role-color-studio.html) demonstrates the three roles, gray comparison, accent variants, and dark mode. Its demo task data, Chinese-only copy, and compact type are not a universal production template. Do not embed its laboratory controls in ordinary product pages.

Use the [material comparison example](examples/glass-material-comparison.html) to demonstrate opaque, frosted, and transparent UI, scene recommendations, light/dark modes, component details, and explicit selection. Adapt its content to the user's project when presenting options. Optional [glass tokens and classes](assets/glass-materials.css) provide a portable starting point. The [gradient material and controls lab](examples/material-controls-lab.html) compares workspaces, reading and creative contexts with meaningful icons and rounded open dropdowns.

For shape/depth decisions, use the [radius and elevation example](examples/radius-elevation-lab.html) and optional [CSS seeds](assets/radius-elevation.css). Compare geometry on matched content rather than changing color, typography, and shadow simultaneously. Treat sample values as calibration, not a new brand requirement.

For text hierarchy, use the [typography example](examples/typography-lab.html) and optional [type tokens](assets/typography.css). The example compares identical content, supports Chinese/English text, and adjusts leading and measure. Its compact, product, and reading profiles are starting points to adapt, not fixed standards for every project.

Use the [font selector](examples/font-selection.html) to let users compare the supported interface/monospace pairs on identical Chinese, English, numeric, and code samples. Its [catalog](assets/font-catalog.json), [preference helper](assets/font-preferences.js), and [CSS presets](assets/font-presets.css) are portable; the [font-face declarations](assets/font-faces.css) reference bundled open fonts with [provenance and licenses](assets/fonts/manifest.json). Local-only fonts remain device-dependent and must not be labeled as successfully loaded without evidence.

For grouping and layout, use the [spacing/grid example](examples/spacing-grid-lab.html) and optional [spacing seeds](assets/spacing-grid.css). The example separates group spacing from card columns and 12-track alignment; it can shrink the actual preview container to expose overflow and reflow behavior.

## Workflow

### 0. Resolve the route once

For an unspecified new design, ask: “Would you like an adjustable HTML style Demo first, direct generation, or only a reusable design prompt?” Recommend the Demo route and wait for this preference while continuing independent project inspection. Use the host's question tool or ordinary chat. Explicit “no Demo / generate directly” needs no extra confirmation. Do not repeat the question for accepted designs, supplied confirmed prompts, scoped edits or an already selected route. See [design modes](references/design-modes.md) for precise boundaries.

### 1. Analyze the project and resolve its stack

Inspect available source before choosing a framework: package manifests/lockfiles, framework versions, entry points, routes, component/style conventions, tokens, fonts, representative screens, and relevant build commands. Establish the audience, core task and action, content/density, existing brand, user preferences, devices, languages, and appearance needs. Summarize the few findings that affect the design, distinguishing evidence from assumptions.

For an existing site being reimplemented, use [the redesign audit](references/redesign-audit.md) before implementation: inspect the user's complaints, capture the current desktop view/states, score observed dimensions, explain root causes and useful parts to retain, and rank the proposed changes. Do not infer behavior from a screenshot or fabricate a baseline for a new project. Preserve the stack, data and required business behavior while remaining free to rethink the visual system and information layout.

Keep the existing stack unless the user requests a migration. For a new project, follow the requested Vue, React, or HTML choice; if unspecified, recommend a fit from the required interactions and deployment context and resolve a material ambiguity during design selection. Do not choose the production stack merely because the preview is buildless HTML. Ask only about information that cannot be inferred and would change the result.

### 2. Build and show project-specific options in Demo routes

In choose-then-design and prompt-only modes, use a project-local copy of the [integrated studio](examples/design-studio.html), following [studio integration](references/design-studio.md). Adapt its sample content, hierarchy, candidate settings, and layouts to the analysis; do not modify the installed skill for an ordinary project. Open or render a working preview using available tools. An unchanged generic gallery or a prose-only list is not the completed preview step.

Normally show one recommended direction and one or two credible alternatives using [theme selection](references/theme-selection.md). Explain project fit and one practical tradeoff per option. Preserve explicit brand/font preferences across candidates. Vary meaningful layout, density, type, material and depth decisions; keep representative content comparable. If only one option fits hard constraints, explain why instead of inventing alternatives.

For redesigns, return the scorecard, prioritized advice and rendered effect images with the proposal. Prefer matched before/after desktop views and an interactive slice of the new design; the user should be able to judge what the advice changes. Include a fresh composition when the old layout is a root cause, rather than offering only different colors on it. Clearly label static concepts and rendering limitations.

Offer combined controls for color roles, UI/mono fonts, glass intensity and placement, radius, shadow and density, with the supported locales, appearances and device widths. Use [glass materials](references/glass-materials.md) and, when imagery serves the task, [atmospheric image cards](references/atmospheric-image-cards.md). Do not force every project into the bundled dashboard example. A representative page slice is enough for selection; do not build several complete production apps.

Include [button design](references/button-design.md) in those representative contexts: the main page action, a card/row action and a dialog or toolbar where relevant. Let the user compare suitable emphasis, size and shape combinations without turning every button into the same large filled pill.

The studio's local keyword rules are suggestions, not a substitute for inspecting the user's project. If interactive rendering is unavailable, provide the closest reviewable artifact and state the limitation; do not claim a preview was displayed.

### 3. Confirm the design and continue in the same conversation

After the user confirms the Demo, proceed with the already requested implementation in this conversation. Read the exact adjusted design from the preview with available browser tools, or use an explicit chat selection. Do not require copying a prompt, downloading a starter, reopening a style questionnaire or approving the same design again. Follow [same-conversation implementation](references/same-conversation-implementation.md) for snapshot access, stale state and limited-capability hosts.

The studio's **Confirm design** captures an immutable design and keeps the user on the preview. Its visible **Confirmed design parameters** expose a machine-readable record for the active agent; the optional **Export prompt / hand off** action opens the portable prompt. Prompt-only still stops at the selected design deliverable; direct mode still skips the Demo gate. A saved preference, draft JSON/CSS export, highlighted default or silence is not confirmation.

Carry the user's actual layout, typography, colors, geometry, materials, buttons, content priorities and device/language scope into the project. Match the preview to the current project and requested routes; preserve the existing framework, dependencies, APIs, domain state and business behavior. A confirmed design authorizes the requested implementation, not deployment, migration or unrelated changes. If no selection is confirmed, show the concrete preview and wait while continuing independent inspection.

### 4. Generate the confirmed page in the target stack

Prompt-only mode ends with the reviewed HTML Demo, copyable/downloadable prompt and configuration. In implementation modes, use [implementation](references/implementation.md): Vue pages/components follow the project's SFC conventions; React pages/components follow its JSX/TSX and router conventions; HTML output uses semantic HTML, CSS and JavaScript. Integrate into the real project when one exists; otherwise deliver a runnable page/project and concise run instructions. Generate the selected stack, not three separate implementations unless requested.

Translate the confirmed design into reusable tokens and appropriate native components, not a screenshot or an iframe of the studio. For existing projects, edit their native page/components directly from the confirmed contract; generating or downloading a separate starter is not a required intermediate step. The studio's optional standalone source export creates a runnable example from its preview content, useful for a new page or explicit source request. Do not replace an existing stack/router or business behavior with that example. Reuse verified font assets with licenses, preserve the selected three-role colors and geometry, and identify remaining demonstration data. Keep the studio's design controls out of the final product unless they are a requested feature.

Use [adaptive experience](references/adaptive-experience.md) for desktop by default and explicitly requested tablet/mobile scope, together with the selected locales and appearance modes. Preserve input and task context during changes. Read [Apple interaction](references/apple-interaction.md) for motion/materials and [icons and controls](references/icons-and-controls.md) for semantic icons and open dropdown treatment. Refine the actual render against the accepted preview without silently resetting choices.

### 5. Verify, independently review and hand off

Run the target project's relevant build/type checks and use [verification](references/verification.md) for the changed scope. Compare the actual page with the final selected settings, then check representative device/locale/theme combinations, real font loads, material fallbacks, key interactions, focus, and console errors. Fix implementation drift before calling the selected design complete. For filter/record/edit workspaces, use [content fit and task validation](references/content-and-task-validation.md): test actual long labels at panel transitions, choose deliberate card alignment, and verify committed task results and focus in representative flows. Do not turn a previous project’s pixel dimensions into universal rules.

For a completed new page or substantial UI implementation, use [independent implementation review](references/post-implementation-review.md). Prefer a separate subagent with the brief, accepted design, current source and runnable page, when delegation is available and permitted. It should inspect the current render and exercise representative user tasks, returning reproducible findings and verification limits. The implementer reviews the evidence, fixes confirmed defects within scope, then has the affected paths rechecked. A reviewable preview receives proportionate checks and remains labeled as a proposal.

Do not call self-review an independent agent review. If the host cannot delegate, perform a distinct evidence-led self-review and disclose that limit. A small reversible styling fix can use focused checks without creating another agent. No arbitrary target score, finding quota or repeated full audit is required.

For a redesign, compare before and after using the same rubric, inspected scope and viewport. Ground any improved score in the rendered result and tested behavior, not in the proposed CSS or an assumed aesthetic improvement.

Report the implemented stack, chosen design, runnable result location, review method, observed checks, confirmed findings and their disposition, and concrete limits. Do not present an unverified fix or an unresolved blocking defect as passed. A valid skill or exported CSS does not prove a generated Vue/React/HTML page has been built or visually tested; report only the implementation actually delivered.

## Boundaries and attribution

When maintaining this package's preview or generator, use [reproducible validation](references/reproducible-validation.md): locked dependencies, portable tests, native CLI fixtures and domain cases. Separate build checks from visual QA and native discovery from authenticated model execution. These maintenance checks do not replace a customer's project tests or require a CLI account for ordinary design work.

Keep all internal references relative and the skill usable across compatible coding agents. Use equivalent available file, browser, and test tools; no automatic network dependency is needed for design reasoning. Follow current official framework docs when an implementation API is uncertain.

Do not add authentication, publishing, account changes, audio, vibration, or persistent data services solely because this skill is active. Preserve the [Apple Design MIT license](references/apple-design-LICENSE.txt) with adapted interaction material.

