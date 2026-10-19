# Glass as a Project-specific Choice

Glass is a material dimension that can combine with blue-white, cards, editorial, or Apple-inspired layouts. Assess it when recommending a new design; show it when it is plausible or requested. The user chooses after seeing representative UI, not just a label such as "glassmorphism."

## Match the project

| Project evidence | Starting recommendation | Suitable glass placement | What to show |
|---|---|---|---|
| Dense administration, finance, operational comparisons | Opaque content; optional light frost | Floating toolbar, compact navigation, non-blocking inspector | Same data slice with solid reading surface and local glass chrome |
| Long-form reading, documentation, complex forms | Opaque reading/form surface | Sticky navigation or ancillary controls only if useful | Real paragraphs/form errors, including the opaque baseline |
| Portfolio, brand story, product showcase | Compare light frost and expressive glass | Selected project/product cards, navigation, short hero overlay | Same content over actual or clearly illustrative media, with solid alternative |
| Atmospheric image-card experience | Image-led composition with restrained frost | Small status chips, image-corner controls, navigation; optional bottom material behind text | Same bright/dark/busy images with stable scrim, opaque alternative, and representative mobile/desktop crops |
| Creative canvas, media editor, map | Context-preserving light frost | Floating tools, contextual panel, short overlay | Content visible behind tools; busy background and mobile layout |
| Touch-first companion, learning, personal tool | Light frost when useful; clear cards as baseline | Navigation, short summaries, selected cards | Coarse-pointer controls, larger text, dark mode, restrained effect |
| Older browser, low-power device, strong contrast needs | Readable solid or high-opacity treatment | Small optional material areas only | Actual fallback retaining hierarchy and functionality |

These are starting judgments, not bans or industry stereotypes. Honor a user's expressive preference with feasible scope. Explain a concrete readability or performance conflict and show a stronger tint, smaller coverage, or opaque content region rather than silently discarding the preference.

For [atmospheric image cards](atmospheric-image-cards.md), preserve the sharp focal image and crisp text. Blur may reduce background texture, but a separate controlled scrim or opaque surface provides dependable text contrast. Do not frost the whole photograph or treat warm decorative text as a status color.

## A fair visual comparison

When glass is relevant, normally show three material levels on the **same content, layout, typography, status colors, and action**:

1. **Clear solid / 清晰实色:** stable reading and data comparison.
2. **Light frost / 轻磨砂:** high-opacity tinted surface, modest blur, visible separation.
3. **Expressive glass / 通透玻璃:** stronger background visibility and edge/light treatment, with text kept on a readable composite.

Show a page slice plus a useful component (card, navbar, toolbar, menu, dialog, or sheet); an empty translucent rectangle is not enough. Use representative background content, not only an empty gradient where every option appears readable. Include light/dark and mobile behavior when relevant, and provide a reduced-transparency/solid fallback view if the material depends on backdrop filtering.

The [interactive comparison](../examples/glass-material-comparison.html) is a portable demonstration of this flow. Adapt its sample content and placements to the project; it is not a universal production page.

Mark the recommendation separately from the current user selection. Explain fit, cost, and proposed locations. Let the user choose both **intensity** and **scope**, such as "light frost on navigation and menus, opaque task cards." Choosing a sample selects a design preference; it does not publish or authorize unrelated changes. If the user explicitly delegates choice or asks to skip selection, proceed with the stated recommendation rather than adding an approval gate.

Keep design controls in the comparison, not in the delivered product unless requested. Do not reopen the choice on every minor follow-up. With no visual tooling, give the closest reviewable local preview and state the limitation; do not claim a preview was displayed.

## Construct the material

Use a semantic set of tokens for surface tint, foreground, muted foreground, edge, highlight, shadow, and blur. Set these separately in light and dark modes and at each intensity. Keep the existing accent/status roles. Glass is not permission to recolor every control or weaken state contrast.

- Keep element opacity at 1; use alpha on the background so text, borders, and controls remain crisp.
- Blur the **backdrop**, not the element containing text. Background content must exist behind the surface for the effect to be visible.
- Use edge highlights and modest shadow to communicate separation; avoid glow and multiple nested glass layers.
- Keep inputs and dense text areas sufficiently opaque. A material can be used on the container without making every child transparent.
- Limit the number and area of blur layers, especially on mobile. Prefer static material and transform/opacity feedback over animating large blur areas.
- Ordinary CSS blur/tint is a glass-inspired approximation, not physical refraction or a claim of native Apple Liquid Glass parity.

The [optional CSS starter](../assets/glass-materials.css) uses resolved `data-theme` and a `data-material` choice. It is a starting point, not a contrast guarantee over arbitrary media. Reuse classes in Vue/React/HTML through each project's styling conventions; no framework-specific glass library is required.

## Fallback and verification

Begin with a readable solid surface. Add backdrop filtering only in `@supports`, with a prefixed declaration when the target browser matrix needs it. Honor reduced transparency and increased contrast where supported; retain a usable base when a preference query is unavailable. Keep a manual reduced-effects option if the actual product calls for it. Do not detect low power or claim browser coverage without evidence.

Check text, borders, focus, status, and overlays over the actual composed background in both themes. Test the brightest/darkest and busiest realistic media, scrolling, focus, open menus/dialogs, mobile performance, reduced motion, reduced transparency, and unsupported-filter fallback. Use an opaque fill or scrim when measured contrast needs it; no fixed blur amount ensures readability.

Implementation reference: MDN's [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) explains background transparency and backdrop-root behavior. Inspect stacking contexts and ancestor effects when the visible blur does not match expectations.
