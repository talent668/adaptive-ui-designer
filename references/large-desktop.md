# Large Desktop and High-Density Displays

Use this when designing for QHD/2K, 4K, wide monitors or desktop zoom. Keep the project's stack and accepted visual style. A large display does not by itself justify bigger text, additional features or a wallboard layout.

## Measure the browser, not just the monitor

Clarify dimensions when a label matters: this studio's **QHD / 2K** preset means 2560 px wide, while **4K UHD** means 3840 px wide. Cinema 2K can mean 2048 px; the numeric CSS-width preset is also available. Do not infer a user's display dimensions from the label alone.

Layout uses CSS pixels. Record `innerWidth × innerHeight`, the actual content container and `devicePixelRatio`; also note any known OS scaling and browser zoom. DPR is not a reliable standalone detector of OS scaling. A browser window can be maximized, split or reduced independently of display resolution.

These are illustrative full-screen equivalents before browser chrome/window constraints, not runtime detection rules:

| Display and effective scaling | Approximate CSS workspace |
|---|---|
| 2560 × 1440 at 100% | 2560 × 1440 |
| 2560 × 1440 at 125% | 2048 × 1152 |
| 3840 × 2160 at 100% | 3840 × 2160 |
| 3840 × 2160 at 150% | 2560 × 1440 |
| 3840 × 2160 at 200% | 1920 × 1080 |

Measure the resulting browser viewport instead of multiplying assumed OS and zoom factors. [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) distinguishes physical/CSS pixels and notes that page zoom changes DPR. [CSS length units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) explain relative versus absolute measures.

## Give the extra space a task

| Content | Useful policy | Avoid |
|---|---|---|
| Forms, documents, focused decisions | Center a constrained shell and keep prose/forms narrower within it | Long full-screen text lines or buttons stretched across the monitor |
| Frequent comparison and workspaces | Widen the working area within a deliberate cap; preserve navigation and task proximity | A tiny dashboard island or adding decorative cards to fill space |
| Catalogs and portfolios | Add columns only when item count and readable card width justify them | One short row stretched into giant cards or a fixed universal column count |
| Maps, timelines, code/canvas tools | Explicitly fluid canvas with bounded tools and readable side panels | Applying full-width canvas rules to every reading surface |

The studio offers `widthPolicy: auto | focused | wide | fluid`. Auto follows the current project: workspace 112rem, product/showcase/travel 100rem, learning 90rem, developer 120rem. Focused uses 80rem; wide uses 120rem; fluid removes the outer maximum. These are adjustable starter caps including shell padding, not universal design standards. Prose remains constrained independently. User-selected policies survive scheme recommendations and are exported in native Vue/React/HTML.

Keep font roles, button sizes, radius and icon strokes in readable CSS units; do not multiply them by DPR or viewport width. Preserve root text sizing and user zoom. Increase density or font size only to serve the audience, task and viewing distance. A presentation wallboard viewed from meters away is a separate brief. Prefer vector icons and appropriate `srcset`/`sizes` for images; if a project uses canvas, size its backing store for the observed DPR while keeping its CSS size unchanged and preserving the drawing state on resize. Do not add canvas or oversized images just for this rule.

Use existing meaningful columns/panels before inventing content. Keep actions next to their entity. Bound dialog width and height to the usable viewport, allow internal scrolling when needed, and keep menus, focus rings and sticky controls reachable at reduced window sizes. Do not globally scale the entire page with `transform` or `zoom` to fit a mockup. For filters and cards inside a wide shell, keep using [content-fit rules](content-and-task-validation.md).

## Preview and acceptance

The integrated studio's desktop width selector sets a real **CSS-width canvas** at 1920, 2048, 2560 or 3840 px. It scrolls inside a smaller window without shrinking the UI. It is a layout preview, not a 4K monitor, OS-scaling or DPR emulator. The width selector is temporary preview state; the selected content policy is saved/exported. Open generated pages at actual viewport sizes to validate viewport-dependent menus/dialogs and browser zoom.

Choose representative checks for the project: a common desktop window (1280/1440), QHD width (2560), 4K width (3840), and narrower effective widths such as 1920/2048 for scaled displays. Include available height and a resized/zoomed window, not width alone. Inspect actual container width, line measure, useful columns, readable text, unchanged control proportions, long localized labels, scroll ownership, open menu/dialog bounds and focus return. Test required languages/appearances and relevant material fallbacks. Check real images/canvas sharpness where used; a layout-only viewport override does not prove physical monitor rendering quality.

Use the same content, typography and theme when comparing widths. Report CSS viewport, DPR and any untested physical scaling explicitly. Do not claim 4K validation merely because an option is labeled “4K” or a small screenshot was enlarged.
