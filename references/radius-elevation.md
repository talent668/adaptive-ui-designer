# Radius, Elevation, and Nested Geometry

Source inspiration: [圆角与阴影，让UI更有层次, by 风和梦](https://xhslink.cn/o/5mx2LLPnAYs), seven illustrated panels reviewed on 2026-10-19. This module adapts the design principles; it is not a transcript. Numeric examples are starting points. The geometry, accessibility, and implementation conditions below make them usable across projects.

## Establish surface roles first

| Role | Relationship | Light-theme starting treatment | Typical use |
|---|---|---|---|
| Flat / 平铺 | Part of the page plane | Surface value or fine divider/border; no necessary shadow | In-flow content, grouped rows |
| Raised / 微浮 | Slightly separated bounded object | Fine edge and small, faint shadow if needed | Comparable cards or compact tools |
| Floating / 浮起 | Temporarily above related content | Wider soft shadow and clear boundary | Popovers, menus, contextual controls |
| Overlay / 覆盖 | A separate modal task | Stronger relative separation and an appropriate scrim | Dialogs and modal sheets |

Not every page needs all four roles. Elevation is a relationship, not an instruction to apply shadows to every container. A critical in-flow action can remain flat; importance is not a reason to turn it into a floating panel. A visual shadow does not create `z-index`, focus containment, or modality.

For press feedback, a small reduction in shadow or a restrained inward/downward visual response can suggest contact. Do not shift layout, hide focus, or rely on hover/press animation to explain the action. Keep keyboard use and reduced-motion behavior complete.

## Tune the whole shadow

For a quiet light interface, the note's black alpha around 6–12% is a useful calibration, not a compulsory range for every layer or theme. A small contact shadow may be lighter. Test against the actual page surface; multiple low-opacity layers can still combine into a heavy halo.

Use a short, tight layer to define contact and a broader softer layer to imply distance. A third layer is optional, not a quality requirement. Keep the implied light direction coherent. Larger offset/blur usually suggests greater distance; tune opacity and spread with the result rather than increasing every parameter automatically.

The normal `box-shadow` order is horizontal offset, vertical offset, blur, optional spread, then color; comma-separated shadows combine. Set alpha in the shadow color, not on the whole component. Dense permanent panels often work better with a border or surface difference than a large cast shadow.

The [CSS starter](../assets/radius-elevation.css) provides conservative role-based examples. Its values are illustrative adaptations, not mandatory copies of the source note. Reuse the project's existing tokens if they already form a coherent system.

## Keep radius families small and meaningful

Choose control, card, and dialog roles rather than assigning a new radius to every element. The note illustrates 6/12/16 px; the existing blue-white seed uses 8/12/16 px. Both can be coherent. Preserve the project's chosen family instead of mixing the two arbitrarily.

About three common radii in a related component family is a useful restraint, not a global ban on other values. Avatars, true pills, edge-attached sheets, distinctive brand shapes, and derived nested corners may need deliberate exceptions. Larger elements often use larger radii, but geometry also depends on density and brand; rounding does not mechanically encode elevation.

When offering a choice, a compact, balanced, and softer family can help explain the tradeoff. Compare the same content/layout and retain a stable role relationship. Avoid changing radius, shadow, color, and typography at once when the user's decision is specifically about shape.

## Derive aligned nested corners

For a uniformly inset inner shape whose corner should track the outer arc, start with:

```text
inner radius = max(0, outer radius - effective edge-to-edge inset)
```

The inset is the actual distance from the outer visible edge to the corresponding inner edge. Include border thickness, padding, or other spacing once according to the box model; do not assume a CSS `padding` value alone measures it or double-count the border. For example, a 16 px outer radius and 8 px effective inset yield an 8 px inner radius.

If the inset exceeds the outer radius, use zero as the geometric starting point; negative radii are invalid. Inspect the result optically and preserve intentional brand geometry. Non-uniform insets or elliptical corners need per-corner/axis treatment rather than one global subtraction.

Apply this relation to concentric image wrappers, framed previews, or tightly nested surfaces. An independently positioned button inside a roomy card still uses its control radius; it need not inherit a computed corner just because it has a parent. Avoid inventing nested cards solely to demonstrate the formula.

Use actual project tokens and computed styles. Utility names such as `rounded-xl` or spacing aliases can be customized; do not assume their pixel values or a universal Tailwind mapping.

## Preserve depth in dark mode

Dark shadows may become difficult to distinguish on dark canvases. Use independent surface values, fine readable edges, and the correct modal scrim to retain separation. The source demonstrates replacing a shadow with a lighter border; this is a good fallback, not a requirement to remove every dark-mode shadow.

Do not invert a light shadow into a white glow or brighten every card equally. Preserve the object's role across themes. A border used as an essential control boundary needs adequate contrast; a decorative hairline alone is not proof of accessibility. Glass and image-card styles also need stable edges and actual composite contrast, as described in [glass materials](glass-materials.md) and [atmospheric image cards](atmospheric-image-cards.md).

## Show and verify the relationship

The [interactive laboratory](../examples/radius-elevation-lab.html) compares four surface roles, three coherent shape families, and adjustable nested geometry with light/dark views. It also includes a real non-modal floating panel and a native modal so geometry is not confused with behavior. These controls belong in a design preview, not every delivered product.

For project work, adapt the examples to its real card, menu, or dialog. Inspect flat and elevated surfaces together, an open overlay, pressed/focus behavior, the darkest/brightest supported theme, and the tightest inset. Check that blur/spread is not clipped by a parent and that rounded media clipping does not cut off focus rings or floating content. Refine excessive shadow, irregular radii, or crowded insets before adding new effects.
