# Existing-site Audit and Redesign

Use this when the user wants an existing website analyzed, improved or redesigned. Inspect the whole relevant experience before choosing the size of the change. Start with desktop hierarchy and check representative smaller screens as well: every web project is responsive by default. For a narrow fix, assess the affected area instead of inventing a full-site score. A new site has no baseline: do not fabricate one.

## Inspect before prescribing

Read the user's criticism and goals first. Inspect the actual site or supplied screenshots, representative content, main tasks, and available source/stack. Capture a desktop baseline at a known viewport; inspect relevant open menus, forms, empty/error states and keyboard behavior when accessible. Record what was actually observed. If only an image is available, evaluate its visual evidence and mark interaction, accessibility behavior and performance as unverified.

Map the main route or task, shared navigation and reused components. Sample a content-heavy screen, a primary edit/action and one relevant exceptional state rather than assuming the homepage represents the whole product. Inspect source structure, component reuse, global tokens, real font assets and any fixed widths before recommending a rewrite. Include phone/medium/desktop observations for the affected experience; a single screenshot cannot establish responsive quality. Do not make an inexperienced user inventory these implementation details.

## Look at the whole interface, explain the causes

Use this inspection map to avoid an audit that only discusses color or font size. It is a coverage guide, not a requirement to invent a problem in every row. Record `retain` when a pattern works and `unverified` when evidence is unavailable.

| Lens | Inspect and diagnose | Constructive direction |
|---|---|---|
| Product task and information order | Who uses it, what happens most often, first meaningful action, route labels and repeated searching | Put actual priorities first; preserve useful terms and efficient task paths |
| Layout and proportions | Sidebar/content balance, header-to-navigation joins, surface/border/corner continuity, gutters, scan path, column use and reading versus comparison | Choose a coherent shell and composition from the content; explain what moves and why instead of styling the sidebar and cards independently |
| Cards and grouping | Whether cards represent meaningful objects, needless nesting, equal-height versus natural-height rows, short-copy voids | Remove unnecessary boxes, group related content, keep deliberate comparison alignment |
| Spacing and density | Label-to-control distance, sibling versus section gaps, padding/gutters, toolbar wrapping | Use relational spacing roles; fit real labels instead of shrinking every control |
| Typography | Loaded versus fallback fonts, heading/body/meta roles, weight, leading, line measure, CJK/Latin and numbers | Establish a readable hierarchy and matched scripts; keep essential supporting text legible |
| Color and identity | Neutral/action/status roles, competing emphasis, chart series, composed contrast, genuine brand assets | Build a coordinated palette and memorable domain-specific visual idea, with semantic colors stable |
| Buttons and actions | Primary/secondary/row hierarchy, contextual size, fill/outline/text treatment, shape, label/icon balance and all states | Make the next action obvious; keep peer controls consistent without making every button identical |
| Icons and imagery | Meaning/label match, family, optical size, stroke/corners, accessible names, crop and image relevance | Use meaningful, consistent symbols and task-relevant imagery; remove decorative noise |
| Forms and complete controls | Input grouping, validation, open select/menu appearance, keyboard navigation, focus, busy/disabled/error states | Design the open and failure states as carefully as the resting screen; keep recovery in context |
| Materials and motion | Surface separation, shadow strength, nested radius, glass placement, reduced-motion/transparency behavior | Give depth a job; keep reading/data surfaces stable and animation informative |
| Responsive behavior | Screen/container pressure, nav reorganization, card reflow, filters, tables/charts, overlays, long labels and zoom | Recompose before compressing; keep essential actions reachable and necessary scrolling local |
| Implementation and performance evidence | Repeated style overrides, component boundaries, asset failures and measured runtime issues | Reuse sound behavior, unify fragile styling and measure before claiming speed or technical failure |

Keep buttons, icons, cards and spacing as explicit observations even when they share a scorecard category. A screenshot-only audit may cover their visible design while leaving interaction or performance unverified. A high aggregate score does not cancel a blocking task problem.

Separate three kinds of constraint:

- **Retain unless the user changes scope:** business capabilities, data/API contracts, required routes, truthful content, technical stack and explicit brand/accessibility requirements.
- **Keep because it works:** recognizable domain labels, useful navigation, efficient workflows, genuine brand assets, helpful content groupings. Cite evidence for keeping them.
- **Open to redesign:** weak typography, palette, spacing, card structure, navigation placement, hierarchy, icons, controls and decorative effects. Existing CSS is not an aesthetic requirement. A technically useful component can keep its behavior while changing its appearance completely.

Treat an explicit request for a fresh design as permission to rethink composition, not as a framework/backend migration. Do not let the old site's color or layout quietly determine every new option. Conversely, do not discard an effective pattern solely to make the redesign look different.

## Evidence-based scorecard

Score each dimension on a 0–5 anchored scale, then convert by its weight. These are design-review judgments, not an objective quality detector or certification. Use whole-number ratings rather than false decimal precision.

| Dimension | Weight | Evidence and boundaries |
|---|---:|---|
| Information architecture and core task | 20 | Main action, finding the next step, navigation labels, workflow friction |
| Layout, cards, alignment and spacing | 15 | Grid, proportions, meaningful cards, nesting, natural/equal height, density, scan path and relational whitespace |
| Typography and hierarchy | 15 | Real font loading, hierarchy, size/weight/leading, mixed-script fit, reading measure |
| Color and contrast | 12 | Neutral/accent/status roles, actual composed contrast, competing accents |
| Buttons, controls, icons and states | 12 | Action hierarchy and size, semantic icon/label match, coherent geometry, open dropdowns and complete states |
| Content and project identity | 10 | Relevant content/imagery, specific vocabulary, credible data, fit to audience |
| Materials, depth and motion | 6 | Purposeful glass/shadows, readable layers, restrained feedback, effects fallback |
| Responsive usability and accessible operation | 10 | Small/medium/large layouts, keyboard/focus, target sizes, zoom, navigation, overlays and recovery; color contrast belongs above |

Anchors: **0** blocks the task; **1** has severe problems; **2** is weak or inconsistent; **3** is usable but uneven; **4** is coherent with minor defects; **5** is well resolved in the inspected states.

Every rating needs at least one concrete observation and its effect on the user, plus what can be retained. Do not call an unseen state good or bad. Use `unverified` for insufficient evidence, not zero. With incomplete coverage, label any normalized score as a **provisional score for the inspected scope** and show covered weight; do not present it as the full site's score. Compute a full score out of 100 only when all dimensions have adequate evidence. Separate subjective taste from functional defects.

## Diagnose causes, then propose changes

Explain why the page feels weak: e.g. headings and body share visual weight, labels use a mismatched fallback font, unrelated groups have identical gaps, every section is boxed, the accent competes with status, a native popup breaks the geometry, or icons suggest the wrong action. “Looks outdated” alone is not a diagnosis.

Give a short ranked list of high-value changes. Connect **observation → user impact → proposed change → visible benefit/tradeoff**. Prioritize task-blocking issues first, then hierarchy and consistency, then optional polish. Include a retain/change list so the redesign has continuity without inheriting poor styling.

## Choose the smallest effective intervention

Recommend a level and explain it with observed causes, expected benefit, affected pages/components and migration risk. Do not infer the level from a numerical score, a fashionable style, or the desire to make a dramatic comparison. Separate an overall **UI restructure** from a framework/backend rewrite: visual redesign alone does not authorize the latter.

| Level | Evidence that supports it | Scope and continuity | What the user should see |
|---|---|---|---|
| Polish | Main task, information order and reusable structure already work; problems are isolated type, spacing, color, corners, icons or states | Tune the affected tokens/components; preserve effective composition and behavior | Matched before/after detail or one coherent improved page, with the specific benefit |
| Regional redesign | A screen or region has poor grouping, too many nested cards, misplaced actions, broken filters or an ineffective split; other areas work | Recompose the weak regions and related shared elements without replacing unrelated flows | A representative page showing the improved hierarchy and a useful alternative when there is a real tradeoff |
| Overall UI restructure | Core tasks repeatedly fight navigation/reading order, inconsistent patterns span routes, or the current composition fails across sizes | Rethink information architecture and page families while retaining data/API contracts, business capabilities and useful technical components | One recommended project-wide direction and one or two credible alternatives, with representative linked screens and responsive behavior |

Hybrid plans are valid: retain the efficient records table, redesign the discovery area, and unify global buttons/type. If evidence is insufficient, propose a limited diagnostic sample rather than declaring a full rewrite necessary. Assess CSS/component repair separately from a technology migration, which requires its own reason and scope.

Calibration examples: a working CRM with uneven buttons and spacing usually needs polish; a learning site burying course continuation under identical cards may need a regional recomposition; a portal with duplicated navigation and broken task paths across key routes may need an overall UI restructure. These are examples, not domain-based rules. An icon-only request remains an icon fix, even if a larger redesign could be attractive.

## Make the recommendation concrete for a non-designer

Lead with three to five improvements the user can recognize: for example, “put the next action beside the record”, “turn the card wall into a useful reading order”, or “give primary actions one consistent emphasis”. State what already works. Keep the full audit available without making the user fill in design parameters or digest every token value.

Prepare a coherent project-specific first draft, following [first-draft guidance](first-draft-and-feedback.md). Pick a memorable visual idea through task structure, typography, content/art direction or restrained material; novelty does not require saturated color, gradients or glass. Explain each option's benefit and cost in ordinary language. When genuine alternatives are useful, vary composition, hierarchy, density and visual language on comparable content. Do not force three redesigned applications for a small correction.

For each recommendation, include a visible acceptance condition: readable long labels at a tight panel width, one identifiable primary action, preserved access after the sidebar collapses, short cards without arbitrary padding, or a clearer first-screen task order. A before/after illustration should show the recommended change rather than hide a defect with shorter text, different data or a larger viewport.

To reduce a generic template feel, look for repeated dashboard cards without analytical purpose, oversized marketing heroes in operational tools, arbitrary gradient blobs/orbits, colored icon tiles with no semantics, pill shapes on unrelated components, identical spacing for different relationships, invented metrics, and glass/glow everywhere. Replace these with project-specific information order, credible content, deliberate type, meaningful icons and bounded materials. Do not deliberately introduce inconsistency or poor accessibility to look “less AI-generated.”

## Show the proposal before final implementation

Present the baseline scorecard, main problems, useful parts to retain, and recommended changes **before** reimplementing the target site. Then show a project-specific interactive preview and rendered effect images, preferably a matched before/after desktop view. Keep representative content and viewport comparable. Normally compare one recommended redesign with one or two credible alternatives; a different layout is more informative than recoloring the old template.

Use actual browser renders of the proposed UI for effect images. A static mockup must be labeled as a concept, not as implemented behavior. A supplied inspiration image can inform material/geometry, but its business content and mobile composition need not be copied. If rendering is unavailable, state the limitation and provide the closest reviewable local artifact without pretending an image was produced.

Let the user select or adjust the concrete proposal, following the main workflow. Do not reopen a decision already made. An audit-only request ends with findings/proposals and does not authorize rewriting the site.

## Deliverable shape

Use a compact report in the conversation or existing project documentation:

1. Goal, inspected pages/states and representative widths, stack, and evidence limits.
2. Dimension scores with evidence, retain/change notes, and a qualified total.
3. Recommended intervention level, what to retain, and three to five prioritized changes tied to causes and user-facing benefits.
4. Before view plus proposed effect images/interactive preview, including a representative narrow arrangement, recommendation and tradeoffs.
5. After implementation, compare the same scope and rubric using new evidence; do not invent an improved score before inspecting the result.
