# Content Fit and Task Validation

Use this for workspaces with filters, repeated records, queues or edit/save flows. It complements [spacing and grids](spacing-grid.md), [typography](typography-hierarchy.md) and [independent review](post-implementation-review.md). A landing page or reading surface may need different structures; do not add a filter bar, cards or batch actions just to use this reference.

## Fit controls to the available panel

The viewport, usable content region and a control's text measure are different constraints. A sidebar, inspector or long translated selection can make a panel narrow inside a wide desktop window. Use content-aware wrapping or container queries for a reusable toolbar; use viewport rules for the page shell.

For a search field and related filters, let the search grow while retaining useful input space. Keep related filters together when practical; move the group to another row when it genuinely does not fit. Account for label, padding, icon, border and gaps. A minimum based on the default label alone can fail on another real option or font. Do not shrink essential type, hide overflow or show two indistinguishable ellipses merely to preserve one row.

Inspect the closed selected value and the open menu, including the longest actual options, both locales, font loading/fallback and widths on both sides of a layout transition. Concise localized wording can help if it preserves the task, units and distinguishing meaning. Identical line breaks across languages are not a goal. Intentional truncation is appropriate only when the task permits it and the full value remains accessible.

The optional [content layout CSS](../assets/content-layout.css) supplies an intrinsic-width search/filter group and a natural-height card grid. Its dimensions are configurable calibration seeds, not universal breakpoints. The [content and task lab](../examples/content-task-lab.html) changes the embedded panel width independently of the browser window and uses actual short/long options.

## Choose what a card aligns

First choose whether the content needs a card at all. A few short label/value pairs with a period or denominator usually fit an inline summary, compact strip or small definition list. Reserve large metric cards for meaningful additional content such as a trend, target, explanation or contextual action. Do not enlarge a simple count to fill a grid slot or use a large bordered box as a substitute for hierarchy. Compactness and card styling are separate decisions: short metrics can remain individual small cards with natural height, modest padding, a coherent radius and a quiet border. When the chosen direction uses cards, a request to remove empty space does not imply removing those card boundaries; preserve the accepted visual language unless the user changes it.

Let real content establish natural height before adding padding. Keep useful reading and interaction space, but remove decorative minimum heights, excessive repeated insets and large gaps between a value and its supporting label. Density and alignment must be decided together: a chart and attention panel intentionally presented as one overview band normally share their outer top/bottom edges. Allocate their plot/body space and footer anchors deliberately so alignment serves the composition. Independent reading/feed blocks may use natural, unequal heights. Neither global `align-items:start` nor global stretching is a universal fix. If equal height would create a large empty region, reconsider the plot dimensions, column spans or grouping instead of adding arbitrary spacers. Do not make essential text too small, hide existing fields or invent more metrics to occupy a box.

Assess first-screen value with matched content and viewport: how high is the summary, where does the first actionable record begin, are supporting labels still complete, and is the remaining whitespace serving grouping or comprehension? Keep sizes conditional on content and language rather than treating one project's compact height as a universal target.

| Need | Suitable choice | Cost to inspect |
|---|---|---|
| Compare similar records and locate repeated actions | Equal height within a grid row; push comparable metadata/actions to the row end | A short record beside a long one retains alignment space |
| Present peer overview modules as one band | Align their outer top/bottom edges, coordinate header insets and anchor footer actions | Allocate useful chart/body space first; if the content mismatch is large, revise the grouping rather than add a large empty block |
| Read independent, varied content | Natural independent blocks, a list, or an explicitly chosen editorial layout | Endpoints differ; visual order must still match keyboard/reading order |
| Compare many fields quickly | Consider the existing table/list mode | Less room for prose; details must remain reachable |
| Reserve media, skeletons or predictable interactive space | A justified aspect ratio or minimum dimension | Verify the reservation serves stability or content rather than empty decoration |

Remove an unconditional two-line text minimum when it only pads short feedback or descriptions. Preserve readable type and natural growth for longer content. A row-aligned grid cannot simultaneously eliminate all mixed-length whitespace; explain that tradeoff instead of claiming all cards became shorter. Repetition can support comparison and is not automatically an aesthetic defect. Excerpts with a clear expansion action may fit a product, but do not silently introduce clipping to improve a screenshot.

Test short/short, long/long, mixed, empty and translated content with the real field limits. When comparing a change, keep content, font, locale, theme and viewport matched. Record something observable: toolbar height, first useful record position, full labels, feedback height or reachable actions. Do not count fewer words, smaller type, hidden fields or a scrolled screenshot as a layout improvement.

## Match repeated row density to the information

Treat records as records rather than miniature content cards. For a short name/identifier, state, a few numbers and one action, start with a compact row whose vertical inset and control target are proportionate to the actual content. The identifier can sit beside the name when that improves scanning and there is room; use a second line when language or length needs it. Do not reserve two text lines, a large avatar block or generous card padding for every simple record.

Keep the information and interaction intact: preserve readable body/meta text, complete identifiers or a clear accessible detail path, column alignment, consistent numeric formatting and visible focus. Row actions retain usable hit areas; coarse pointers may require larger targets and more separation. A long title or validation message must be able to grow the row naturally. Do not force a fixed project-specific pixel height on all domains, clip content, or shrink text merely to fit more rows.

Check the full repeated group, not only a single sample: ordinary rows, the longest actual record, mixed-height rows, translated labels, empty results, repeated action targets and focus after opening/closing details. Record the measured ordinary/long row heights and the actual first-screen record count where useful. Compare total section height and reading ease, not just the numeric row-height reduction.

## Review the composition after a local adjustment

After tightening a card or list, inspect the surrounding row and section: shared panel edges, title and separator alignment, chart-axis labels, footer/action anchors, gutter rhythm and which useful records enter the first screen. A locally smaller component can leave a misaligned neighboring panel or a new empty gap. Resolve this at the group level while preserving the selected card language and the user task. When a paired row becomes a vertical stack, natural content heights usually apply again.

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
