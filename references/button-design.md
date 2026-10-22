# Buttons: Role, Size, Surface and Shape

Design buttons as part of the page's action hierarchy. Decide what an action means and where it lives before choosing dimensions or decoration. Support different sizes, fills and corner treatments while retaining one coherent family. Do not make every action equally prominent or vary shapes randomly for visual interest.

## Choose a role before a style

The integrated studio now persists `buttonSize` (compact/standard/prominent), `buttonShape` (crisp/rounded/pill) and `buttonStyle` (solid/soft/outline). The shared [button CSS](../assets/button-system.css) implements role variants, 32/40/48px starting heights, 13/14/15px primary labels, explicit 32px row controls, focus, pressed, disabled, busy, reduced motion and forced colors. These are adaptable seeds, not universal size rules. The [interactive button study](../examples/button-system.html) demonstrates real state transitions. Vue/React/HTML generation preserves the current selection and native button semantics.

| Context / role | Starting treatment | Size and shape judgment |
|---|---|---|
| Main page action, such as creating a record | Solid accent with a readable foreground; optional restrained elevation | Standard product size, or large when the composition warrants it; rounded rectangle matching the theme |
| Supporting action, such as export or cancel | Neutral outline, quiet surface or text treatment | Usually the same height as neighboring primary controls, with lower visual weight |
| Frequent card action, such as writing feedback | Soft tinted surface or restrained outline | Small/standard, with comfortable padding and a clear label; avoid a strong solid CTA on every card |
| Table-row or contextual action, such as details or edit | Text/ghost treatment, or a meaningful icon for an unambiguous task | Compact visual footprint with an adequate target; do not save space by making essential type tiny |
| View switch, toolbar tool or toggle | Quiet icon button or related segmented control with clear selection | Consistent square target and related corners; circles are optional for standalone icon controls |
| Destructive action | Semantic danger text/outline or filled danger according to consequence and priority | Separate from routine actions where accidental activation is likely; avoid making every row's destructive action dominant |
| Expressive consumer action or introductory CTA | Larger soft rectangle or pill when the identity supports it | More generous padding and type; avoid importing this scale into a dense operational toolbar |

Emphasis, size, shape and semantic tone are separate decisions. A small button can be the main action inside its component; a large button need not have the strongest color. Normally give one action clear precedence within a related action group, while considering the whole page's balance. Independent sections can have their own local actions.

Contextual size, emphasis and grouped controls are also illustrated by [Carbon's button guidance](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines). Adapt the principle; do not copy that system's brand geometry, alignment conventions or component API as universal rules.

## Calibrate sizes and corners

These are desktop starting ranges, not mandatory standards or a requirement to offer every size:

| Size role | Typical minimum height | Typical label / icon | Useful placement |
|---|---|---|---|
| Compact | 28–32 px | 12–13 px label / 14–16 px icon | Card actions, rows and compact toolbars |
| Standard | 36–40 px | 13–14 px label / 16–18 px icon | Page actions, forms, dialogs and filters |
| Prominent | 44–48 px | 14–16 px label / 18–20 px icon | Focused onboarding, a strong CTA or requested touch-oriented layout |

Choose type for the actual script, font, audience and reading distance. Use height as a minimum with line-height and padding, not a clipping box. Start with roughly 10–16 px horizontal padding and 6–8 px icon/label gaps, then calibrate optically. A compact size should reduce padding before making an important label unreadable.

Coordinate peers in an action group: share height, text baseline, icon family and corner logic. Allow content-driven widths; use equal widths when the design meaningfully calls for them. Match adjacent input heights when they form one toolbar. Wrap or rearrange groups at narrower widths rather than clipping translated labels.

Use a small radius family related to theme and size: compact controls might use 6–8 px, standard controls 8–12 px and expressive large controls 12–16 px. These are calibration values. Pills suit some filters and expressive actions; circles suit standalone icon-only controls. Dense professional interfaces can use firmer corners when that is the chosen identity. Do not turn every button into a pill or blindly inherit a card's large radius.

Distinguish visible glyph size from the interactive target. Increase the hit area or spacing without enlarging every icon. Check applicable [WCAG target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), including its exceptions; a small glyph does not establish a usable target. Adapt target spacing and action groups to smaller/coarse-pointer screens by default; preserve clear priority and text enlargement without inflating every desktop button.

## Fill, border, shadow and material

- Use solid accent for the relevant primary action, soft tint for frequent lower-emphasis actions, outline/neutral for supporting actions, and text/ghost for contextual actions. Judge their combined visual weight in the actual page.
- Keep semantic danger separate from branding. Routine buttons should not acquire unrelated status colors just to make the page colorful.
- Coordinate border thickness, foreground contrast and shadows in both themes. A visible border is optional; clear affordance and focus are not. Hover, disabled and selected states should remain distinguishable.
- Keep ordinary button shadows small and purposeful. Stronger elevation belongs to genuinely floating controls; avoid repeated glow across cards.
- Gradient frost can suit a short floating control or expressive action when selected for the scene. Keep text/icons sharp, with sufficient tint, edge definition and an opaque fallback. Verify priority over the actual background. See [glass materials](glass-materials.md).
- Use the same semantic tokens in Vue, React, HTML or the existing stack. Map decisions into a suitable existing component primitive instead of installing a new library solely for rounded buttons.

## Content and complete states

Use a clear verb/object label where helpful. Avoid unexplained icons, truncated essential labels and widths that fit only one language. Icon-only actions need meaningful accessible names; keep visible text when the action is ambiguous.

Inspect rest, hover, pressed, keyboard focus, disabled, loading and toggle/selected states where relevant. Pressed feedback is temporary; a toggle's selection persists. Loading should prevent duplicate activation, keep dimensions stable where practical and explain progress without relying only on a spinner. Completion feedback must reflect the actual result.

Prefer native `<button>` for actions and links for navigation. Use the appropriate form `type`, support keyboard activation and preserve a sensible focus destination after dialogs or list updates. Use `aria-pressed` for a true toggle. If `aria-disabled` keeps an unavailable control discoverable/focusable, also guard activation: the attribute alone does not prevent a click. These behaviors follow the [WAI-ARIA button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

## Show and review in context

Present the button family inside representative page, card/row and dialog contexts. Let users compare combinations suited to the project: size, solid/soft/outline/text treatment, corners and optional material. A gallery of identical labels alone does not establish hierarchy. Preserve the accepted choice during implementation.

Review visually as well as functionally:

- Is the next action clear without every button competing for attention?
- Are sizes justified by context, while peers stay aligned and coherent?
- Are label size, padding, icon proportions and corners balanced in the actual render?
- Are surface variants distinguishable in both themes, including focus and loading?
- Are localized labels complete and targets usable without hiding layout problems?

Map findings into the chosen rubric: labels under typography, dimensions/alignment under layout, surfaces under color, action priority under hierarchy and geometry under overall aesthetics. Successful clicking alone does not demonstrate visual quality. Do not double-count the same defect to manipulate the score.

For a teacher workspace, one sensible combination is a standard solid “Add record,” matching-height neutral “Export,” compact soft “Feedback,” compact text “Details,” and quiet square view-switch controls. This is an example to adapt, not a fixed template for every project.

## Entry context and operation outcomes

The same record can need a different primary action when entered from a queue versus ordinary details. Base emphasis and focus return on the user's current task and available capabilities. Preserve the originating entity through redraws; use an equivalent current-view target, the next relevant queue item or a useful empty-state control when necessary. Verify failed-write recovery and committed results rather than a success toast alone. For explicit hidden selections, disclose batch scope and check unaffected records. See the conditional examples in [content and task validation](content-and-task-validation.md).
