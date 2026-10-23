---
name: adaptive-ui-designer
description: Design and refine responsive web interfaces with a project-specific visual direction, an adjustable HTML preview when useful, and implementation in HTML, React, Vue or the existing stack. Covers composition, typography, color, components, icons, motion and visual review; not native apps or illustration-only work.
metadata:
  version: "v0.2.0"
---

# Adaptive UI Designer

Design around the actual product and task. Preserve explicit brand choices and the existing stack. Blue-white is the default when no color direction is given; composition and typography must still belong to the project.

## Work from a concrete brief

Inspect the available source, content and constraints before selecting a layout. Infer routine choices; ask only for a missing preference that would change the result. For a new, unspecified design, ask once whether to show an adjustable Demo first while continuing independent inspection. Reuse the answer during follow-up work. Direct implementation and prompt-only requests need no Demo gate. See [workflow](references/workflow.md).

Before rendering, capture a short `designIntent`: audience/task, concept, at least two visible signatures, color and type roles, composition, imagery, and regressions to avoid. Recommend one complete direction and, when useful, one or two real alternatives. Differences should include reading order, density, type or surface structure, not just hue. See [art direction](references/art-direction.md).

## Build a coherent interface

- Choose color roles, type hierarchy, spacing, geometry and components together. Keep semantic status meaning distinct from decoration.
- Fit regions to their content and task value. A short metric does not need a large empty card. Align peer panels deliberately; let unrelated content use natural heights.
- Treat navigation and content as one shell. Use a consistent icon family, action hierarchy and complete focus/hover/selected/disabled states.
- Use photographs, diagrams or illustration only when they support the scene. Restrict glass to surfaces that remain readable; include a solid fallback.

Use [visual system](references/visual-system.md) for these decisions. Use [responsive behavior](references/responsive.md) for phones through wide desktops, bilingual content and light/dark/system appearances. Do not infer usability from media queries alone.

## Preview and implement

The optional comparison surface is [examples/design-studio.html](examples/design-studio.html). Adapt its project brief and actual scene in a project-local copy; keep the installed skill unchanged during ordinary design work. Detailed controls start closed. [Studio integration](references/studio.md) describes the renderer, feedback, confirmation and export contracts.

Honor natural-language feedback as a coordinated revision. After confirmation, read the exact current design and implement it in the same conversation. Edit the real project when one exists; do not replace it with a generic exported starter. Prompt export is optional. A saved preference or highlighted default is not confirmation.

**Fonts are names and local preferences, not bundled binaries.** Record family, general style and fallback. Do not download, install or copy a full font library by default. Report unavailable fonts honestly and keep the requested preference. See the [font guide](references/fonts.md) and [catalog](assets/font-catalog.json).

**Deliver only what the page uses.** Do not recursively copy the skill's entire `assets`, tests, galleries or historical evidence into a project. Package project entries and their dependencies with [scripts/package-project.py](scripts/package-project.py), or an equivalent dependency-aware process. Screenshots can remain separate from runnable source.

## Review and hand off

Inspect actual renders at representative small, medium and desktop widths. Exercise the main task, including committed results, empty/error states, overlays and focus return. Fix observed defects and recheck the affected path. Use an independent review for substantial implementations when delegation is available and permitted; a focused change needs proportionate checks. See [verification](references/verification.md).

Report the deliverable location, chosen design, actual checks, and remaining limits. Keep demo data and simulated actions identifiable. Do not add publishing, accounts or external messages solely because this skill is active.

For skill/runtime maintenance, read [maintenance](references/maintenance.md). Retain [LICENSE](LICENSE) and the [Apple interaction attribution](references/apple-design-LICENSE.txt) when adapting that material. The core works with the host's existing file, shell and browser capabilities and does not require a particular provider.
