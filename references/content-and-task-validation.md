# Content Fit and Task Validation

Use this for workspaces with filters, repeated records, queues or edit/save flows. It complements [spacing and grids](spacing-grid.md), [typography](typography-hierarchy.md) and [independent review](post-implementation-review.md). A landing page or reading surface may need different structures; do not add a filter bar, cards or batch actions just to use this reference.

## Fit controls to the available panel

The viewport, usable content region and a control's text measure are different constraints. A sidebar, inspector or long translated selection can make a panel narrow inside a wide desktop window. Use content-aware wrapping or container queries for a reusable toolbar; use viewport rules for the page shell.

For a search field and related filters, let the search grow while retaining useful input space. Keep related filters together when practical; move the group to another row when it genuinely does not fit. Account for label, padding, icon, border and gaps. A minimum based on the default label alone can fail on another real option or font. Do not shrink essential type, hide overflow or show two indistinguishable ellipses merely to preserve one row.

Inspect the closed selected value and the open menu, including the longest actual options, both locales, font loading/fallback and widths on both sides of a layout transition. Concise localized wording can help if it preserves the task, units and distinguishing meaning. Identical line breaks across languages are not a goal. Intentional truncation is appropriate only when the task permits it and the full value remains accessible.

The optional [content layout CSS](../assets/content-layout.css) supplies an intrinsic-width search/filter group and a natural-height card grid. Its dimensions are configurable calibration seeds, not universal breakpoints. The [content and task lab](../examples/content-task-lab.html) changes the embedded panel width independently of the browser window and uses actual short/long options.

## Choose what a card aligns

| Need | Suitable choice | Cost to inspect |
|---|---|---|
| Compare similar records and locate repeated actions | Equal height within a grid row; push comparable metadata/actions to the row end | A short record beside a long one retains alignment space |
| Read independent, varied content | Natural independent blocks, a list, or an explicitly chosen editorial layout | Endpoints differ; visual order must still match keyboard/reading order |
| Compare many fields quickly | Consider the existing table/list mode | Less room for prose; details must remain reachable |
| Reserve media, skeletons or predictable interactive space | A justified aspect ratio or minimum dimension | Verify the reservation serves stability or content rather than empty decoration |

Remove an unconditional two-line text minimum when it only pads short feedback or descriptions. Preserve readable type and natural growth for longer content. A row-aligned grid cannot simultaneously eliminate all mixed-length whitespace; explain that tradeoff instead of claiming all cards became shorter. Repetition can support comparison and is not automatically an aesthetic defect. Excerpts with a clear expansion action may fit a product, but do not silently introduce clipping to improve a screenshot.

Test short/short, long/long, mixed, empty and translated content with the real field limits. When comparing a change, keep content, font, locale, theme and viewport matched. Record something observable: toolbar height, first useful record position, full labels, feedback height or reachable actions. Do not count fewer words, smaller type, hidden fields or a scrolled screenshot as a layout improvement.

## Connect hierarchy and focus to the task

An item's identity remains stable when its presentation changes. Record the originating entity and action before opening details or editing. After a redraw, return to an appropriate available target: the same entity/action, its equivalent in the current view, the next queue item after completion, or a relevant search/empty-state control when the entity disappears. The expected destination comes from the task, not a global fallback such as “Create”. Keep DOM focus order consistent with visual order.

Choose the primary action from the user's entry context and the available capabilities. A review queue may emphasize its completion action while ordinary record details emphasize editing; this is a decision pattern, not a universal queue=approve rule. Preserve the entity, current filters and intended selection scope while switching views, languages or themes according to the product contract.

A successful write needs evidence of the committed result, not only a toast. Prevent duplicate activation during real work, keep button dimensions stable where practical, retain input and enable recovery after failure. Put failure feedback inside the active interaction region: a message behind a modal is not accessible feedback for that modal. Restore a useful retry target when re-enabling a control has lost focus. Use actual pending work rather than a cosmetic delay. If a result is only held in memory, say so. For batch actions, make selected and hidden-selected scope explicit and check that non-target records and other workspaces are unaffected. Do not mandate a confirmation dialog for every reversible action.

## Verify a small set of representative workflows

Select workflows from the product, not a fixed checklist that expands every task. Examples include find → edit → save → inspect result; review successive queue items; and filter → select → batch update. Use real project data only within the user's authorization; isolated synthetic data is sufficient for demonstrating the mechanism.

For each selected flow, record starting filters/selection, target IDs, intended outcome, actual visible result and focus destination. Check appropriate failure/cancel paths and persistence boundaries. Distinguish state retained during editing from state retained across reload; do not add persistence solely because a test assumed it. In a batch test, inspect a relevant non-target sample as well as the target, and state the sample size.

UI task simulation is not a real-user study. Do not derive human time savings from automation latency or equate a successful build with completed tasks. If counting actions, define whether opening a dropdown, choosing an option and typing a field each count, and use the same definition for comparisons. A layout improvement does not need to reduce clicks.

## Stop on evidence, not a score

Keep reproducible defects, design preferences and untested areas separate. A weighted 0–5 scale is coarse and reviewer-dependent; unchanged or different totals are not a controlled measurement of progress. Report dimensions, weights and inspected scope, without inventing decimal precision or targeting a higher grade. The page's visual score is also separate from the skill package's completeness.

Finish when the scoped requirements and representative tasks pass and confirmed relevant defects have been resolved. Preserve justified tradeoffs and disclose them. An additional review should verify an actual change or unresolved concern, not keep sampling reviewers until one gives a desired score.

The lab and its [automated checks](../tests/content-task.test.cjs) are synthetic demonstrations. They do not install a universal business engine or implement the user's APIs. Use [reproducible validation](reproducible-validation.md) for package maintenance and the project's own checks for a customer implementation.
