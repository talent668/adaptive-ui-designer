# Spacing, Grouping, and Responsive Grids

Source inspiration: [间距与栅格 对你的UI有什么用？, by 风和梦](https://www.xiaohongshu.com/explore/6ad220b70000000015008f05), seven illustrated panels reviewed on 2026-10-19. This module adapts the principles rather than transcribing the note. Values and framework examples are calibration, not universal requirements.

## Use a scale, then assign relationships

Start from the project's coherent spacing system. When none exists, a 4 px-equivalent base and a short sequence such as 4, 8, 12, 16, 24, 32, 48, 64, and 96 can establish rhythm. The [optional seed](../assets/spacing-grid.css) expresses a similar scale in `rem`; its physical pixel values change with the root font size. An established 8 px system or another deliberate brand scale remains valid.

Map scale values to roles: related gap, group gap, section gap, content inset, page gutter, and grid gutter. This is more useful than independently choosing a new number for every component. Keep exceptions intentional: thin borders, optical alignment corrections, text-related `em` spacing, and accessible hit areas need not be forced onto the base grid.

Use proximity to express association. A label should be closer to its own field than the next unrelated field group. Inline icon/label pairs, metadata belonging to one object, sibling cards, and separate page sections have different relationships. The note's internal 4–12, component 16–24, and section 48–96 px ranges are illustrative starting bands, not a rule to assign every outer gap the maximum.

Whitespace supports comprehension; it is not a score to maximize. Expert work may need compact grouping, while reading and consumer discovery may need more breathing room. Preserve useful first-screen content and nearby actions. Coordinate density with [typography](typography-hierarchy.md), device context, and the user's chosen direction.

Budget area by information and task value. A short metric summary should not consume the same area as a chart, editable record or rich content card. Try a compact summary strip before a row of large metric cards; inspect natural content height and unintended grid stretch. Expand when additional meaning warrants it, not because the screen has spare space. See [content-sized containers](content-and-task-validation.md#choose-what-a-card-aligns).

Make alignment a group-level decision. Peer panels forming one overview band need coherent outer edges, header insets and footer anchors; compacting one panel should not casually break the band's baseline. Allocate useful plot/body space before stretching or adding gaps. Independent feeds can remain different heights. For dense record sections, derive row inset from actual text and action targets rather than reusing content-card padding. See [row density and composition checks](content-and-task-validation.md#match-repeated-row-density-to-the-information).

## Give each spacing mechanism a job

| Mechanism | Responsibility | Typical use |
|---|---|---|
| Padding | Space inside a box, between its edge and content | Card inset, input padding, page gutter |
| Gap | Separation between items/tracks controlled by a layout parent | Field stacks, button clusters, flex/grid siblings |
| Margin | External relationship between separate boxes or flow regions | Container centering, independent section separation |

For repeated flex/grid siblings, parent-owned `gap` usually avoids a spare trailing margin after the final item. It does not automatically remove margins already on headings/paragraphs or compensate for distributed alignment. Inspect combined styles instead of assuming the visible interval always equals the declared gap. Ordinary block-flow margins may also collapse; use the layout mechanism appropriate to the relationship. See [MDN gap](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap).

Keep a stack's last-item behavior and parent padding deliberate. Avoid combining child bottom margins and parent gaps unintentionally. Do not add invisible spacer elements solely to repair inconsistent values, and do not ban useful margins everywhere.

## Container width is a content decision

Separate outer container width, page gutters, grid gutters, and usable content width. A maximum-width container with `border-box` includes its padding; the remaining inner width is smaller. A narrow panel embedded in a wide page must still behave correctly.

For equal visible columns, the approximate usable width of one column is:

```text
(inner content width - total inter-column gaps) / number of columns
```

Let CSS perform the actual sizing. Use this relationship to diagnose crowded content, not to hardcode every pixel. Reading/forms usually need a smaller measure than a comparison table or canvas. Center a constrained container when appropriate, retain meaningful gutters, and avoid stretching content across an ultrawide monitor without a task reason.

The note's 1152 px container and 24 px side padding are one example. Utility names such as `max-w-6xl`, `px-6`, or `gap-6` depend on framework version, configuration, and root sizing. Do not universally multiply utility suffixes by four or introduce Tailwind just to reproduce a reference.

## Distinguish tracks from visible cards

A 12-track grid is an alignment framework. Regions may span 8+4, 6+6, or 4+4+4 tracks; it is not a requirement to show twelve cards. Related rows can share those alignment lines without turning every region into a rounded card.

Visible card columns instead depend on the space each object needs. One phone column, two intermediate columns, and three or four desktop columns are common examples, not device-based mandates. A wide monitor with a narrow side panel still needs a narrow-panel layout.

For repeated comparable cards, a shrink-safe starting pattern is:

```css
.cards {
  display: grid;
  gap: var(--space-group);
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, var(--layout-card-min)), 1fr));
}
.cards > * { min-inline-size: 0; }
```

The container-bounded minimum prevents a preferred card width from forcing page overflow when less room exists. Allow long identifiers and titles to wrap appropriately. Do not hide overflow to conceal a layout failure. `auto-fit` can expand populated tracks; use explicit spans or a different auto-repeat strategy if the actual design needs stable empty positions. For implementation patterns see [MDN grid layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts).

For structured 12-track regions, collapse or change spans when content becomes crowded. Preserve DOM reading/focus order; do not use visual reordering that makes keyboard navigation jump unpredictably. Use container queries when a reusable component depends on parent width, and viewport queries when the page shell depends on viewport width. Provide a readable fallback for unsupported target environments; see [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).

## Present choices without adding another gate

Use the [spacing and grid laboratory](../examples/spacing-grid-lab.html) to compare grouping, density, card auto-layout, and logical grid spans. It can change the actual preview width, reveal grid guides, and test long content. These controls belong in design discussion or a requested design tool, not every production product.

For a new design, include the relevant density and layout differences in the existing visual comparison. Let the user choose at the scheme level; do not separately ask them to approve every gap. For an already selected design, use its conventions and inspect the result. Keep text, colors, and content matched when the specific question is spacing.

## Verify with content and interaction

Check label/field association, group separation, gutters, alignment, last-item spacing, and content insets together. Test tight embedded containers as well as phone, tablet, desktop, and enlarged-text conditions. Include long translated labels, long unbroken identifiers, variable item counts, form errors, and reachable controls where the product uses them.

Do not reduce font size or touch targets merely to retain columns. Check focus outlines, rounded clipping, stable DOM order, and meaningful scrolling. Report the observed widths and states; a grid that works at one screenshot size is not proof of complete responsiveness.

## Content-driven workspace checks

Use [content fit and task validation](content-and-task-validation.md) when a sidebar or inspector reduces the usable panel. Separate page-shell breakpoints from intrinsic control wrapping. Check short/short and mixed-length records before choosing equal-row or independent heights. The optional [structural CSS](../assets/content-layout.css) and [three-domain lab](../examples/content-task-lab.html) demonstrate these decisions with configurable seeds; neither requires cards or filters in unrelated projects.

## Large-monitor content policies

Use [large-desktop guidance](large-desktop.md) for 2K/4K and scaled monitors. Choose a constrained reading/form shell, a wider comparison workspace or an explicitly fluid canvas from the task. Extra columns need enough content and readable items; do not stretch every card or enlarge every gap by screen width. The [shared shell CSS](../assets/desktop-layout.css) is used by the live studio and all three native exports.
