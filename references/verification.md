# Evidence-led verification

Check the deliverable that was requested: a proposal, implemented page, redesign or narrow fix. A passing build is different from a working task or a good composition.

## Visual acceptance

- Can a viewer identify the product, next action and at least two project-specific visual traits?
- Do region scale, typography, color and media cooperate without generic scaffolding?
- Are card/row areas proportional to real content? Do peer panels share deliberate edges and action anchors?
- Are supporting copy, identifiers, axis labels and semantic states readable?
- Do buttons, icons and open menus belong to the same system?

For redesigns use matched content, viewport and scope. Separate taste from reproduced defects; do not force a numerical score or invent a baseline.

## Task checks

Choose a few representative flows. For a workspace, this may be search → select → edit → save → inspect the actual result, or filter → act → verify target and non-target records. A dialog opening or toast alone does not prove a save.

Keep filters, selected objects and input context through theme/language/layout changes. Validate real long labels, empty results, cancel and recoverable errors. Counts, totals, periods, units and exports should agree with the displayed scope. Format percentages and technical values deliberately.

Capture the originating entity/action before redraw. Restore focus to that item, its current equivalent or a relevant search/empty-state control if it disappears. Avoid capturing `body` after replacing the opener. Put errors inside the active modal and guard duplicate pending writes.

## Responsive and accessible behavior

Inspect actual small, medium, desktop and relevant wide widths. Verify local overflow ownership, readable charts, reflowed navigation and reachable actions. Test at least one open menu/dialog in both appearances. Keyboard traversal, modal naming/containment, Escape and focus return must work. Include reduced motion and content-pressure checks where they affect the implementation.

For bilingual pages inspect expanded labels and preserve locale during navigation. In custom studios, test hidden snapshot generation and confirmation → full-page preference round trips.

## Technical checks and review

Run relevant syntax/build checks and inspect console/resource failures. Check actual font fallback and dependencies. Do not add a framework build to a buildless page just to manufacture a check.

For substantial work, prefer one independent reviewer when available and permitted. Supply raw requirements, source and a runnable artifact; do not prime it with a desired verdict. The reviewer reports reproducible observations, expected/actual behavior, evidence and impact. The implementer evaluates findings, fixes accepted defects and rechecks affected paths. Do not repeat full audits merely to obtain a higher score.

Report who reviewed, tested scope, fixed findings and remaining limits. A preview does not imply real API integration, authentication, deployment or a human usability study. Historical tests are not evidence for a newly changed version.
