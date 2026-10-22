# Reproducible validation

Use this when maintaining the package's preview/generator or verifying a downloaded package. An ordinary customer task uses that project's relevant checks, not necessarily this entire suite.

## Clean-copy validation

Requires Node.js 22.12+ and npm. Run from the package root:

```sh
npm ci
npm run verify
npm run cases
```

`npm test` uses Node's test runner and portable fixtures. It covers normalized/preserved preferences, recommendation conflicts, all shipped opaque text/color contrast pairs, solid fallback, every bundled font's SHA-256/size/signature and license, ZIP round trips using an independent decoder, literal content conversion, and React's actual server-rendered button semantics. Contrast checks do not certify arbitrary transparent or photographic backgrounds.

`npm run test:build` generates all three targets. Vue and React undergo Vite production builds; HTML is checked as a static delivery, including its local entry scripts and styles. It is not sent through Vite, which would omit its classic scripts. These builds use root dev dependencies; installing every generated package from scratch is a separate check.

`npm run cases` exports four synthetic domains to all three stacks and applies the same checks. Artifacts/reports go to ignored `.validation/`. Never package that directory, `node_modules`, credentials or CLI transcripts. CI schedules Linux/Windows with Node 22/24; configured jobs are not evidence of completed runs.

## Domain and visual acceptance

The [versioned briefs](../tests/fixtures/domain-cases.json) cover operations, learning, creative portfolios and developer consoles, with different structures and manual button/material choices. These are synthetic regression cases, not independent customer deployments or proof of universal design quality. The studio still has six categories and four seeds; adapt actual projects after inspection.

After generation, serve the package root temporarily and inspect:

- `.validation/builds/operations/html/index.html`
- `.validation/builds/learning/react/dist/index.html`
- `.validation/builds/creative/vue/dist/index.html`
- `.validation/builds/developer/html/index.html`

Record the actual desktop viewport. Check both languages/themes, loaded fonts, main/secondary/row actions, dialogs, focus return, rounded open menus and overflow. For glass, inspect real composition and opaque/reduced-transparency fallbacks. Captured browser views are observed evidence, not an automated visual-regression suite.

The [button study](../examples/button-system.html) adds working local save/loading, reversible sample deletion with confirmation, toggles, disabled and icon actions. It supplements the studio; do not insert laboratory controls into a customer's product.

## Native CLI fixtures

```sh
npm run cli:prepare
```

This only creates isolated projects in `.validation/cli/{codex,claude,kilo,opencode}`, with the complete skill at each native project path. It does not install CLIs, log in, invoke models or change global settings. Each fixture includes `index.html`, `smoke-prompt.txt` and an entrypoint digest.

From the corresponding fixture, use the installed host's documented commands. Examples checked during the historical 0.3.0 validation:

```sh
codex exec --ephemeral --sandbox read-only --skip-git-repo-check "Use the project-local adaptive-ui-designer skill and follow smoke-prompt.txt."
claude -p --permission-mode plan --tools "Read,Glob,Grep,Skill" --allowedTools "Read,Glob,Grep,Skill" --strict-mcp-config --output-format stream-json --verbose "Use the project-local adaptive-ui-designer skill and follow smoke-prompt.txt."
kilo debug skill
kilo run --agent plan --pure --format json "Use the project-local adaptive-ui-designer skill and follow smoke-prompt.txt."
opencode debug skill
```

Check the installed version's help. Model calls use the configured provider and may consume usage. Do not copy credentials between clients, expose authentication files, bypass permissions or silently change configuration. Record any per-run model override and preceding failure.

Report separately: executable startup; native project skill discovery; model read/application; generated builds; actual visual/interaction checks. Authentication/provider failures remain pending. The smoke prompt requests source-only analysis: a truthful partial score and explicit lack of screenshots are required. Keep sanitized versions, scope and outcomes in the [validation record](../validation/2026-10-19.md), not private raw transcripts.

## Content and task regression lab (v0.1.0)

Serve [examples/content-task-lab.html](../examples/content-task-lab.html) from the package root. It covers synthetic support, stock replenishment and editorial records. Change the embedded panel to 420/560/760 px independently of the desktop viewport; these are test samples, not design standards. Check English/Chinese and light/dark appearances, longest actual selected options, open menus, short/short and mixed card rows. Notes and completion are kept in session storage for this tab; filters and selection are deliberately not restored after reload.

Run `npm test` for immutable edit transactions, failure/retry, combined filters, explicit hidden-selected batches, non-target preservation, invalid/cross-scenario rejection, field limits and three-stack structural CSS/full-copy export checks. The [DOM tests](../tests/content-task-dom.test.cjs) execute the actual lab script with an in-memory DOM to check action identity, cancel/retry, in-context errors, duplicate prevention and next-item focus decisions. Dialog/focus APIs are mocked there; native focus, rendering and accessibility still require browser inspection. These tests exercise the synthetic demo and export boundary, not universal business behavior.

Browser procedure: reset one scenario; search by ID and edit, deliberately fail one write using the labeled lab switch, retry and inspect the saved content/focus; open the pending queue, complete two consecutive items and inspect the next target; reset, select items from two categories, narrow to one category, inspect the hidden-selection count and complete the batch, then check selected and unselected records. Reload to verify the stated storage boundary. Repeat representative flows in the other scenarios; log precise coverage rather than claiming every combination.

Keep any new evidence in [the v0.1.0 validation record](../validation/2026-10-20.md). Native CLI discovery/model results in [the 0.3.0 record](../validation/2026-10-19.md) remain historical until rerun; fixture preparation alone does not refresh that evidence. Screenshot inspection and measured browser geometry remain manual/agent-assisted checks, not a full automated visual-regression suite.

## Large desktop regression coverage

`npm run verify` additionally runs `npm run test:desktop`. The [desktop fixtures](../tests/fixtures/desktop-cases.json) produce workspace/auto, learning/focused and developer/fluid scenes in all three stacks: nine outputs under `.validation/builds/desktop-*/`. These are additional synthetic layout fixtures, not nine new applications. See [observed checks and limits](../validation/2026-10-21.md).

`tests/desktop-layout.test.cjs` checks legacy normalization, preserved policies, bounded versus fluid tokens, stable button/font proportions, shared CSS and native shell exports. CSS assertions/builds do not establish real viewport behavior. Serve the outputs for browser checks at 1280/1440, 1920/2048, 2560 and 3840 CSS px as appropriate, including required locales/themes, open menu/dialog bounds and focus. Viewport-only emulation is not proof of physical DPR or OS scaling.

## Design-mode and prompt validation

`npm test` additionally exercises distinct DOM compositions on identical content, immutable complete prompts in both languages, exact prompt inclusion in all three targets, additional opaque tone/brand contrast pairs, and the real chooser controller in an in-memory DOM. Mode tests cover a missing/stale confirmation, prompt-only source blocking, direct generation, language independence, baseline comparison/reset, saved preferences and changes during asynchronous packaging. DOM mocks do not replace native browser focus/layout checks.

`npm run verify` includes `npm run test:directions`: four [same-project direction fixtures](../tests/fixtures/direction-cases.json) × HTML/React/Vue, twelve additional outputs under `.validation/builds/direction-*/`. This compares structure without changing the underlying records. `npm run cases` now packages the matching design prompt in its domain outputs. Builds are not visual scores. See [the dated mode validation record](../validation/2026-10-21-modes.md) for observed checks and boundaries.

## Same-conversation confirmation checks

The chooser DOM tests also assert that confirming a design opens no prompt dialog, copies nothing and requests no application generation. Parse `#confirmedDesignRecord` to verify exact project/stack/style values, current/stale state, retained earlier parameters, comparison blocking and prompt-only scope. The optional prompt action must still open the matching immutable contract; standalone export remains separate. See [the integration record](../validation/2026-10-21-integration.md).

In a real browser, confirm an adjusted project, inspect its design parameters without copying a prompt, then change an option and compare the retained snapshot. Exercise the optional handoff separately. A semantic DOM record is not an automatic CLI trigger or proof that an existing customer repository was modified. Forward exercises and real project integration must be reported separately.

## Low-friction first drafts and feedback

The guidance and chooser DOM tests cover default-closed details, preserved advanced controls, explicit project candidate sets (including a single prepared direction), exact feedback requests, constrained agent responses and confirmation blocking. They run the actual chooser controller through submit → unsaved manual change → reload → old response, covering palette, appearance, language and scheme changes. Additional paths cover withdrawal, a matching response and unavailable/failed working-draft persistence. These in-memory checks do not certify native storage behavior in every browser.

For browser acceptance, open [project directions](../examples/project-directions.html) and inspect architecture, learning and operations. Check that the default view explains the recommended whole design before exposing parameters, that alternatives differ structurally, and that opening/closing details keeps the current choices. In an isolated project-local copy, submit a plain-language request, change a style without pressing Save, and have the agent prepare a response against the earlier request. Reload: the latest draft must survive and the old response must remain unapplied. Withdraw or submit a new request against the current state, prepare a matching response, reload and inspect both `#designFeedbackRecord` and `#confirmedDesignRecord`. Preserve the user's exact wording and record who interpreted it; the static page does not call a model.

Review actual domain copy, typography, composition and visual identity as well as the state records. Record the measured CSS viewport, screenshot limitations and operator identity. If an independent reviewer cannot operate the browser, label any implementer-operated relay and keep the reviewer's evidence assessment separate. The [dated guided validation record](../validation/2026-10-22-guided.md) distinguishes direct checks, relayed browser evidence and unverified scope.
