# Integrated Project Design Studio

Use [design-studio.html](../examples/design-studio.html) as the default comparison surface after analyzing a new page or substantial redesign. The independent color, material, font, typography, and geometry examples supplement focused decisions. Follow the [main workflow](../SKILL.md#workflow) for when a confirmed design or scoped edit lets discovery be skipped. Do not insert this selector into an ordinary product unless requested.

## Project preparation and selection handoff

Button size, fill and corner controls apply to the current selection and survive saving/export/generation. Row actions keep explicit compact sizing and secondary/text roles. `assets/design-scenes.js` provides the shared scene renderer; `assets/project-preview.css` and `assets/button-system.css` are explicit output resources, separate from studio chrome. Do not extract production CSS by string offsets in the studio stylesheet. See [reproducible validation](reproducible-validation.md) when changing these resources.

For stateful preview toggles, use stable IDs such as `data-toggle="available-only"` with `aria-pressed="false"`. Use the same ID for the corresponding action in each language; separate actions need separate IDs. The generator keeps a per-ID state map in all three stacks and rejects duplicate IDs within one locale. Empty legacy markers receive ordinal IDs; explicitly name them before changing localized action order.

Inspect the actual repository and resolve the target stack before treating a sample as a project recommendation. Copy the preview into the task workspace with the relative assets it needs. Keep the installed skill reusable; do not rewrite its defaults for each customer's project or rely on a previous task's localhost port or absolute path.

Adapt representative content, actions, navigation and candidate values to the project's real job. Display the recommended option and alternatives with their reasons and tradeoffs. The six built-in categories and four schemes are starting examples; add or replace a candidate when the project needs a different composition. Keep one working comparison page rather than separate unrelated color/font/material galleries.

The final handoff contains both design and implementation intent:

| Decision | Evidence to carry forward |
|---|---|
| Target stack | Existing project framework/version and conventions, or the user's greenfield Vue/React/HTML choice |
| Current design | The adjusted selection, layout and content priorities, font IDs, material scope, geometry, density, and appearance mappings |
| User choice | The user's explicit selection/instruction, including any final adjustments or delegation to choose |
| Delivery scope | The requested page/routes and supported languages/devices/modes, preserving existing project boundaries |

The preview's **Save design** button stores preferences; **Export design** downloads ordinary JSON/CSS configuration. **Confirm & generate** is a separate explicit action: it captures the adjusted settings and selected Vue/React/HTML stack, then creates the corresponding page source in the browser. Accept that generation snapshot or a clear chat instruction as the design selection; no additional confirmation round is needed for the same scoped implementation. Read the visible state or supplied JSON with available tools; if it cannot be read, request only missing selection details. Do not assume an earlier saved preset still matches the latest edits.

The exported object uses `schemaVersion`, `project`, `recommended`, `selected`, `fontAssets`, and `tokens`; `selected.stack` is `vue`, `react`, or `html`. Generated projects also include `confirmation` with the capture time and target stack. `selected` is the adjusted state; `recommended` is advisory. Normalize identifiers against the catalog, treat supplied configuration as data, and preserve the requested choice separately from a temporary font/material fallback. Set the project-local initial stack from repository evidence when available. Older saved states without `stack` normalize to HTML; that fallback is not a reason to migrate an existing project. `selected.responsive` is false by default; explicitly enable it for tablet/mobile design. Basic fluid fallback CSS is retained, but it is not evidence of completed device-specific design or QA.

After selection, use [framework implementation](implementation.md) to generate the actual runnable page. JSON and CSS help transfer design decisions; they do not replace Vue SFCs, React components, or a complete HTML page. Keep the studio out of the final product unless the user requested a design tool.

## What the preview combines

- Six illustrative contexts: enterprise workspace, SaaS/product, learning/content, portfolio/brand, travel/lifestyle, and developer tools. Workspaces show tasks and tabular evidence, learning shows content/progress, portfolios show an editorial composition, and developer tools include code. Example data and abstract artwork are marked as illustrative.
- A recommendation and two alternative directions. The selected direction and recommendation are distinct; manual edits show a custom state. Project or brief changes update suggestions while preserving the current styling until a scheme is explicitly applied.
- Independent accent palette, seven UI-font pairs, five mono fonts, solid/frost/gradient-frost/glass material, navigation/featured-card scope, radius, elevation, density, and solid fallback. Reuse the bundled real Source Han Sans faces for the Plex and Geist pairings.
- Complete Chinese and English controls, feedback, dialogs and sample content; independent light/dark/system preference. CNY sample amounts retain their business currency when language changes.
- Desktop is the default preview and delivery scope. Tablet/phone previews appear after opting into additional device design; their targets are 768 px and 390 px, constrained by available space. The displayed width is the real content width. Container queries recompose the page rather than scaling a desktop screenshot; narrow tables become readable project rows. This is a responsive layout preview, not device hardware emulation.
- Theme-matched rounded single-select triggers and popup menus, with keyboard operation, disabled options and real selection state. The HTML helper and React/Vue adapters preserve framework ownership.
- Explicit guarded local saving, a detail dialog to inspect floating geometry, and ordinary JSON/CSS downloads. The separate stack selector and confirmation action generate native Vue SFCs, React JSX components, or an independent HTML/CSS/JS page, with a file viewer and downloadable source ZIP.

## Confirmed page generation

The [local generator](../assets/design-page-generator.js) captures the current design and both locale versions of the actual preview, then creates native markup/components and matching styles. It does not embed an iframe, inject the entire studio into the result, or infer new business functionality from the brief. The generated sample contains the selected layout, tokens, font stacks, material scope, geometry, responsive behavior, language/appearance controls, and a native detail dialog. Replace illustrative content and connect business APIs during project integration.

The ZIP includes `design.json`, a bilingual run guide, selected open-font families plus declared fallbacks and their original licenses, and the target files:

| Stack | Main files | Running the output |
|---|---|---|
| HTML | `index.html`, `app.js`, `styles.css`, `assets/` | Open locally or serve over local HTTP; no framework install |
| Vue | `src/App.vue`, `src/main.js`, `src/styles.css`, `public/assets/`, Vite config and package manifest | Node.js 22.12+, `npm install`, `npm run dev`; `npm run build` for production output |
| React | `src/App.jsx`, `src/main.jsx`, `src/styles.css`, `public/assets/`, Vite config and package manifest | Same Node/npm workflow |

Generation uses local asset requests and must run from an HTTP preview, including localhost; a `file:` studio shows a specific instruction to start a local server. All font assets are bundled, so generation needs no font CDN or remote AI service. Installing Vue/React dependencies initially needs package-registry access. Dependency versions are pinned in the generator and should be checked against the target environment when maintained; generated starter versions do not replace an existing project's versions.

Capture settings before asynchronous font packaging. Changes during or after generation must not silently alter the existing artifact: mark it stale and require a new confirmation to update the download. Do not restore a recommended preset when confirming. The current in-memory artifact is available through **View generated source**; ordinary preference saving does not persist an entire ZIP. Confirmation creates local source only, with no deployment, repository mutation, or automatic message to another chat.

## Recommendations are examples to adapt

The [model](../assets/design-studio-model.js) uses transparent local rules from the chosen context, reading/clarity/expression priority, and recognized Chinese/English brief keywords. It does not call a remote AI service or inspect an arbitrary repository. Project content and constraints take precedence over this illustrative classifier. For real work, inspect the actual project, explain the fit, then adapt candidate values and representative content; do not present the sample rules as a comprehensive design assessment.

The four presets are starting points: clear blue, soft cards, frosted layers, and precise graphite. Materials are independent of accent color, and semantic status colors retain their meaning across all presets. Do not infer that selecting a category is permission to override an established brand or a user's saved preference.

## Integration

Copy the example with its relative assets. The [controller](../assets/design-studio.js) and [stylesheet](../assets/design-studio.css) are buildless; all fonts load from local bundled paths. Keep font licenses and the [manifest](../assets/fonts/manifest.json). For production, include only the chosen families and necessary assets, with truthful fallback reporting; do not preload the whole gallery.

Use semantic CSS variables in the project's existing React, Vue, HTML, or other styling architecture. Preserve separate UI and mono roles. The optional exported CSS references `./assets/font-faces.css` relative to the exported file and expects `.project-ui`, `.ui-card`, `.ui-nav`, `.ui-code`, and `.ui-action` classes. Adapt these to the app; keep data-dense reading surfaces solid even when selected short cards use glass.

The studio uses the storage key `adaptive-ui-design-studio-v1`; it does not alter the older font preview's saved preference. Normalize loaded identifiers and guard storage failure. Avoid putting private project details in shared screenshots or exported configuration unless that is intended.

Verify project recommendation versus manual selection, real font availability, locale/theme independence, actual-width reflow, dialog focus, storage restoration, and JSON/CSS output for the modified scope. Check glass over the displayed composition and use the explicit solid toggle to compare a readable baseline. CSS blur is a web material approximation, not a native platform material implementation.
