# Existing-site Audit and Redesign

Use this before reimplementing or substantially redesigning an existing website. Default to desktop evidence and proposals; add tablet/mobile work only when requested. For a narrow fix, assess the affected area instead of inventing a full-site score. A new site has no baseline: do not fabricate one.

## Inspect before prescribing

Read the user's criticism and goals first. Inspect the actual site or supplied screenshots, representative content, main tasks, and available source/stack. Capture a desktop baseline at a known viewport; inspect relevant open menus, forms, empty/error states and keyboard behavior when accessible. Record what was actually observed. If only an image is available, evaluate its visual evidence and mark interaction, accessibility behavior and performance as unverified.

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
| Layout, alignment and spacing | 15 | Grid, proportions, grouping, density, scan path, useful whitespace |
| Typography and hierarchy | 15 | Real font loading, hierarchy, size/weight/leading, mixed-script fit, reading measure |
| Color and contrast | 12 | Neutral/accent/status roles, actual composed contrast, competing accents |
| Components, icons and states | 12 | Semantic icon/label match, coherent geometry, open dropdowns, visible states |
| Content and project identity | 10 | Relevant content/imagery, specific vocabulary, credible data, fit to audience |
| Materials, depth and motion | 6 | Purposeful glass/shadows, readable layers, restrained feedback, effects fallback |
| Desktop usability and accessible operation | 10 | Keyboard/focus, target sizes, zoom, window resizing, overlays and recovery; color contrast belongs above |

Anchors: **0** blocks the task; **1** has severe problems; **2** is weak or inconsistent; **3** is usable but uneven; **4** is coherent with minor defects; **5** is well resolved in the inspected states.

Every rating needs at least one concrete observation and its effect on the user, plus what can be retained. Do not call an unseen state good or bad. Use `unverified` for insufficient evidence, not zero. With incomplete coverage, label any normalized score as a **provisional score for the inspected scope** and show covered weight; do not present it as the full site's score. Compute a full score out of 100 only when all dimensions have adequate evidence. Separate subjective taste from functional defects.

## Diagnose causes, then propose changes

Explain why the page feels weak: e.g. headings and body share visual weight, labels use a mismatched fallback font, unrelated groups have identical gaps, every section is boxed, the accent competes with status, a native popup breaks the geometry, or icons suggest the wrong action. “Looks outdated” alone is not a diagnosis.

Give a short ranked list of high-value changes. Connect **observation → user impact → proposed change → visible benefit/tradeoff**. Prioritize task-blocking issues first, then hierarchy and consistency, then optional polish. Include a retain/change list so the redesign has continuity without inheriting poor styling.

To reduce a generic template feel, look for repeated dashboard cards without analytical purpose, oversized marketing heroes in operational tools, arbitrary gradient blobs/orbits, colored icon tiles with no semantics, pill shapes on unrelated components, identical spacing for different relationships, invented metrics, and glass/glow everywhere. Replace these with project-specific information order, credible content, deliberate type, meaningful icons and bounded materials. Do not deliberately introduce inconsistency or poor accessibility to look “less AI-generated.”

## Show the proposal before final implementation

Present the baseline scorecard, main problems, useful parts to retain, and recommended changes **before** reimplementing the target site. Then show a project-specific interactive preview and rendered effect images, preferably a matched before/after desktop view. Keep representative content and viewport comparable. Normally compare one recommended redesign with one or two credible alternatives; a different layout is more informative than recoloring the old template.

Use actual browser renders of the proposed UI for effect images. A static mockup must be labeled as a concept, not as implemented behavior. A supplied inspiration image can inform material/geometry, but its business content and mobile composition need not be copied. If rendering is unavailable, state the limitation and provide the closest reviewable local artifact without pretending an image was produced.

Let the user select or adjust the concrete proposal, following the main workflow. Do not reopen a decision already made. An audit-only request ends with findings/proposals and does not authorize rewriting the site.

## Deliverable shape

Use a compact report in the conversation or existing project documentation:

1. Goal, inspected pages/states, viewport, stack, and evidence limits.
2. Dimension scores with evidence, retain/change notes, and a qualified total.
3. Three to five prioritized changes, each tied to a user-facing benefit.
4. Before view plus proposed effect images/interactive preview, with recommendation and tradeoffs.
5. After implementation, compare the same scope and rubric using new evidence; do not invent an improved score before inspecting the result.
