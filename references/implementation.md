# Framework Implementation

Preserve the user's stack and repository conventions. The skill defines design decisions, not a mandatory component library, CSS framework, runtime, or hosting service. Verify version-sensitive APIs against installed packages and current primary documentation when needed.

## From the confirmed preview to a page

For a new design, enter implementation after the [default workflow](../SKILL.md#workflow) has produced a user-confirmed selection or explicit delegation. Use the adjusted preview state from [the studio handoff](design-studio.md#project-preparation-and-selection-handoff), not merely the recommended preset ID. Establish the target framework from project evidence or the user's choice; the HTML preview does not authorize a stack change.

| Target | Deliverable |
|---|---|
| Vue | Project-native page/components in `.vue` SFCs with the established script/style conventions, routing and assets |
| React | Project-native JSX/TSX page/components with the existing router, state and styling architecture |
| HTML | A runnable semantic HTML page with CSS, necessary JavaScript and local assets; no framework is required |

Produce only the requested target. The exported CSS variables and font references can seed its styles, but the final page needs real structure, content and working behavior. Do not wrap the preview in an iframe, deliver only a theme JSON file, or include the studio's selector as a substitute for generating the selected project UI. When no project exists, provide the minimal runnable structure and startup instructions appropriate to the agreed stack.

After Demo confirmation, read the exact design with [same-conversation implementation](same-conversation-implementation.md) and modify the existing project directly. Do not ask the user to copy a prompt or download an intermediate starter. The studio's optional standalone source action can supply a Vue/React/HTML example with `design.json` when a starter is actually useful; inspect it before reuse. Preserve the existing project's dependency versions, router and conventions; the standalone Vite starter is not an instruction to overwrite the repository. Its sample content and detail dialog do not replace requested business workflows or data integrations.

Keep a traceable mapping from the final choices to the implementation's layout, tokens, fonts, glass placement, radius/elevation, responsive composition, locales and modes. Every delivered web interface must adapt to screen and container size; never impose a page-wide desktop min-width or scale the entire application to fit a phone. Bound unavoidable table/canvas overflow locally and preserve a usable path to every essential action. Preserve hand-tuned values when translating into the project's tokens instead of resetting to framework/library defaults. A materially infeasible selection should be explained with a feasible adjustment; do not silently substitute a different design.

## Shared architecture

Keep semantic tokens, preference resolution, locale messages, and domain state separate. Components consume roles instead of duplicating raw colors or translation logic. Theme and language changes must preserve entered values, filters, routes, and focus.

Use [spacing and grids](spacing-grid.md) for layout tokens. In flex/grid groups, let the parent own repeated gaps instead of appending margins to every child. Account for existing child margins and distributed alignment; `gap` is not a universal replacement for padding or outer margins. Use shrinkable tracks/items and bound a card's minimum to its container so narrow embedded layouts remain usable.

Use [typography and hierarchy](typography-hierarchy.md) for type-role tokens and semantic headings. Prefer unitless line-height, scalable type, intentional wrapping, locale-aware formatting, and verified font fallback. Do not infer exact CSS values from utility names in a customized framework or introduce Tailwind merely because a reference uses it.

Map corner and shadow roles to the existing CSS/token system using [radius and elevation](radius-elevation.md). CSS shadow strength does not establish stacking order or modal behavior; use the project's layer scale and accessible overlay primitive separately. Measure the actual edge-to-edge inset before deriving nested corners, clamp negative radii, and protect focus rings from rounded clipping.

Reuse established accessible primitives for dialogs, menus, selects, tabs, and drag interactions when they fit the selected design. Inspect open menus: if a platform-native popup cannot match the theme, use the project's accessible custom select or [rounded-control pattern](icons-and-controls.md). Do not assume rounding a native trigger changes its popup. Retain behavior while replacing incoherent styling. Prefer native semantics for small tasks. A styled inert div is not a select; a clickable div is not a complete button. Add a dependency only for a demonstrated benefit, not because a reference names it.

## React

- Retain the existing router/framework, component conventions, styling, and state ownership. Do not migrate Next, Remix, Vite, or another setup for design work.
- Use the project's token/theme and i18n providers. Keep browser preference APIs in a client-safe layer; coordinate initial appearance with SSR to prevent hydration mismatch or a theme flash.
- Keep simple state local; use shared state only where needed. Clean up media-query and pointer listeners, including development remount behavior.
- Use the existing motion primitive; add a spring-capable library only when direct manipulation needs interruption/velocity. CSS remains suitable for normal feedback.

## Vue

- Preserve the Vue version, router, Nuxt/Vite environment, SFC organization, and styling approach.
- Centralize theme/locale behavior in the existing composables/plugins. Respect SSR boundaries and deterministic initial rendering in Nuxt.
- Use the established i18n package for production localization. Keep translations out of ad hoc template conditionals.
- Use `<Transition>` for ordinary changes; use a compatible gesture/motion primitive only when required. Clean up watchers, media queries, and pointer listeners.

## HTML, CSS, and JavaScript

- Use semantic HTML, custom properties, Grid/Flexbox, and small modules. A self-contained page is appropriate for a portable demo; a production site may separate files.
- Store locale messages in a clear dictionary when no i18n framework is warranted. Update actual text and accessible attributes, not just the visible menu.
- Separate appearance preference from its resolved mode. Use guarded storage and `matchMedia`, preserving functionality when storage is unavailable.
- Native `<dialog>` can provide modal semantics; implement correct labeling, close behavior, and focus restoration. Custom widgets must cover their keyboard and selected-state requirements.
- Clean up listeners and respect native browser behaviors. Never install a framework only to implement a few CSS variables or a simple switch.

## Other stacks

Apply the same contracts in Svelte, Solid, Astro, Web Components, or server-rendered templates using their native patterns. Do not mechanically translate React hooks into other ecosystems. Avoid a client runtime for content that can remain server-rendered; add interaction where it serves the requested experience.

## Preference contract

Recommended state model:

```text
locale: the site's supported locale identifier
appearancePreference: system | light | dark
resolvedAppearance: light | dark
designDirection: the chosen project design, normally fixed in source
uiFontId: the selected interface pairing, when font choice is requested
monoFontId: the independently selected monospace family
```

Do not add a runtime design-direction gallery to ordinary products. The user chooses a design during creation; only ship a style selector when requested as a product feature.

Use [font selection](font-selection.md) for the font catalog, verified loading, and versioned preference storage. Apply `--font-ui` to navigation, forms, tables, overlays, and the chart configuration where necessary; apply `--font-mono` to code/identifiers and selected technical data. Support form controls and canvas/chart labels explicitly when they do not inherit fonts. Preserve preferences and user data across locale/theme changes. SSR apps should use their existing preference mechanism rather than reading browser storage during server rendering.

Initialize theme in the framework's supported CSP-safe way. Use CSS `color-scheme` for native controls and update `lang` for actual locale. Reuse stable message keys and locale-aware formatting rather than interpolating fragments. Use the current app's persistence layer for preferences; this skill does not require a backend.

## Completion

Run relevant existing build/type checks. Exercise implemented behavior rather than writing tests that only mirror markup. Verify responsive composition, actual translated labels, appearance states, overlay focus, and reduced motion using [verification](verification.md). Report any unsupported environment rather than claiming parity across frameworks that were not implemented.
