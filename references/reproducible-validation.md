# Reproducible validation

Use this when maintaining the package's preview/generator or verifying a downloaded package. An ordinary customer task uses that project's relevant checks, not necessarily this entire suite.

## Clean-copy validation

Requires Node.js 22.12+ and npm. Run from the package root:

```sh
npm ci
npm run verify
npm run cases
```

`npm test` uses Node's test runner and portable fixtures. It covers normalized/preserved preferences, recommendation conflicts, 60 opaque text/color contrast pairs, solid fallback, every bundled font's SHA-256/size/signature and license, ZIP round trips using an independent decoder, literal content conversion, and React's actual server-rendered button semantics. Contrast checks do not certify arbitrary transparent or photographic backgrounds.

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
