# Adaptive UI Designer

**English** | [简体中文](README.zh-CN.md)

| Field | Value |
|---|---|
| Name | `adaptive-ui-designer` |
| Description | Desktop-first web UI design and redesign for compatible coding agents. |
| Version | `v0.1.0` |

A standalone, desktop-first UI design skill for **Codex, Claude Code, Kilo Code, OpenCode, and other compatible coding agents**. Analyze the project, audit an existing site, offer a project-specific HTML Demo, direct generation or prompt-only handoff, then deliver the selected design in Vue, React, HTML or the existing stack.

The package uses the open [Agent Skills format](https://agentskills.io/specification). Its core workflow and browser assets do not depend on a particular AI provider or desktop application. `agents/openai.yaml` is optional Codex UI metadata; the shared instructions live in `SKILL.md`.

## Three modes

For a new unspecified design request, the agent first asks whether you want an adjustable HTML Demo. A clear request to skip it bypasses the Demo within the requested delivery scope: implement when source is requested, or deliver only the prompt when prompt-only is requested. Existing confirmed choices and scoped fixes do not trigger another style questionnaire.

| Mode | Flow |
|---|---|
| **Choose, then design — recommended** | Analyze the project → HTML Demo → adjust and confirm → implement directly in the current project and conversation |
| **Generate directly** | Inspect the project → choose a suitable direction → implement and review, without a Demo gate |
| **Design prompt only** | Adapt and adjust the Demo → export the confirmed prompt/configuration; no application source |

Existing sites receive an evidence-based audit before reimplementation. In Demo routes, compare meaningful structures, not just colors; retain a default recommendation and real alternatives. Confirmed choices carry into Vue, React, HTML or the existing stack. Verify the selected deliverable, independently review when supported, resolve reproducible defects and disclose limits. See [mode rules and handoff](references/design-modes.md).

Prompt export is **optional for changing CLI or handing off**. The chooser exports a **complete implementation prompt** with project/audience/task/constraints, composition and reading order, every selected style, exact light/dark tokens, font and license references, icon/button/state rules and acceptance requirements. Copy it, download Markdown or download the confirmed JSON. Changes mark older artifacts stale; prompt language is independent of website language. Native source ZIPs include the matching `DESIGN-PROMPT.md`. No prompt automatically invokes another agent or publishes a site.

## What is included

- **Three color roles:** neutral structure, action/selection accents and semantic states.
- **Distinct compositions:** sidebar task workbench, content/context split, branded editorial lead and records-first ledger. Four real structures, six accent families and independent neutral/warm/tinted/ink tones; adapt them to the project rather than treating them as every possible style.
- **Detailed customization:** composition, UI/mono fonts, type scale, heading weight, body leading/measure, spacing, card structure, color expression, meaningful icon treatment/size, button roles, glass, corners, shadows and desktop width policy. Baseline comparison/reset and a component-state study are included.
- **Real fonts:** seven interface pairings and five monospace choices; IBM Plex Sans and Geist can use the bundled Source Han Sans SC for Chinese.
- **Four materials:** solid, light frost, gradient frost and expressive glass, with placement controls and opaque fallbacks.
- **Scene-based glass:** stable data/reading surfaces, optional translucent navigation and short floating tools. Soft tint and highlights communicate depth without covering every card.
- **Meaningful icons and complete controls:** coherent semantics, sizing, strokes and corners, including rounded open dropdown menus with keyboard and focus behavior.
- **Contextual button design:** choose size, solid/soft/outline/text surfaces and rounded/pill/icon-control shapes by task and placement; compare them in project previews and review their full states and visual hierarchy.
- **2K / 4K desktops:** actual 1920/2048/2560/3840 CSS-width previews and project-based focused/wide/fluid content policies; selected policies carry into Vue/React/HTML. Physical resolution, DPR and zoom are treated separately. See [large-desktop rules](references/large-desktop.md) and [validation scope](validation/2026-10-21.md).
- **Desktop by default:** tablet/mobile design is opt-in; preserve basic resizing and existing responsive behavior.
- **Chinese/English and light/dark/system appearances:** retain current choices across switches. README language does not force the language of generated sites.
- **Source delivery:** native Vue SFCs, React JSX or standalone HTML, selected fonts and licenses, a confirmation snapshot, source viewer and ZIP export.
- **Content-aware layout and task outcomes:** fit filters to the available panel and actual labels, choose natural card height versus deliberate row alignment, preserve entity focus and verify committed results. See the [conditional rules](references/content-and-task-validation.md).
- **Evidence-led acceptance:** review actual layouts and user tasks after implementation; use an independent subagent where supported, fix confirmed defects and verify the affected paths again.

Avoid generic template styling by grounding composition in actual tasks and content. Remove decorative metrics, excessive card nesting, arbitrary gradients and unrelated icons when they serve no purpose. Web glass is a CSS material treatment, not a claim of native Apple Liquid Glass optical parity.

The studio's categories and keyword rules assist recommendations; they do not automatically inspect repositories. The agent adapts the preview after examining the project. The generator packages the current sample page; real business APIs and data are integrated separately.

## Existing-site reviews

The audit covers task flow, layout/spacing, typography, color/contrast, components/icons/states, content identity, materials/motion and desktop usability. Ratings require concrete evidence, including what is worth retaining. Unobserved behavior is marked unverified, and partial scores describe their coverage.

Show findings, prioritized changes and visual proposals before reimplementation. A screenshot alone does not establish interaction, performance or accessibility behavior. See the [redesign audit](references/redesign-audit.md).

## Review after implementation

For a new page or substantial UI change, the implementer runs relevant checks and makes the actual page available. A separate reviewer should receive the user requirements, selected design, current source and runnable artifacts, then inspect the render and exercise representative tasks without being prompted to endorse the implementer's assessment.

Findings distinguish reproducible defects, subjective suggestions and unverified areas. Confirmed issues are fixed within scope and the affected operations are rechecked, preferably by the reviewer. The handoff reports what was reviewed, what was fixed and what remains unverified; it does not chase a predetermined score.

Subagent support depends on the host and its permissions. When unavailable, perform a separate self-review and identify it as such. A narrow styling fix needs proportionate checks rather than a full agent review. See [independent implementation review](references/post-implementation-review.md).

## Install in your coding agent

Download the repository's **`dev` branch**, then copy the **complete repository contents** into one directory named `adaptive-ui-designer`. Keep `SKILL.md` directly inside it, alongside `assets/`, `examples/`, `references/` and `scripts/`. Copying only `SKILL.md` omits the previews and fonts. Exclude local `node_modules/`, `.validation/` and CLI logs when installing from a development checkout; they are not part of the skill.

Choose the project or personal location supported by your host:

| Host | Project installation | Personal installation |
|---|---|---|
| [Codex](https://learn.chatgpt.com/docs/build-skills) | `.agents/skills/adaptive-ui-designer/` | `~/.agents/skills/adaptive-ui-designer/` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/adaptive-ui-designer/` | `~/.claude/skills/adaptive-ui-designer/` |
| [Kilo Code CLI](https://kilo.ai/docs/customize/skills) | `.kilo/skills/adaptive-ui-designer/` | `~/.kilo/skills/adaptive-ui-designer/` |
| [OpenCode](https://opencode.ai/docs/skills) | `.opencode/skills/adaptive-ui-designer/` | `~/.config/opencode/skills/adaptive-ui-designer/` |

Paths were checked against the linked official documentation on **2026-10-19**. `~` means your user home directory, including on Windows. Start a new agent session or use the host's documented skill reload action. Update an already discovered installation instead of adding duplicates in overlapping locations.

For another Agent Skills-compatible CLI, use its documented skill directory. Without native skill discovery, keep the folder accessible and explicitly ask the agent to read its `SKILL.md` and linked resources. This provides a manual workflow, not native integration.

## Use it

A portable prompt:

```text
Use the adaptive-ui-designer skill to analyze this project and its stack.
For an existing site, first score it, explain problems and useful parts to retain,
then show desktop redesign proposals. Let me adjust and choose before implementation.
```

In Codex, you can reference `$adaptive-ui-designer`; in Claude Code, use `/adaptive-ui-designer`. Kilo Code and OpenCode can load the named skill through their native skill mechanism. Invocation syntax is host-specific; the plain-language prompt above avoids assuming a universal command.

Specify tablet/mobile work, a particular website language, or other constraints when needed. English is the default **README** language; the skill follows the user's language and project requirements.

## Run the previews

The skill needs no persistent service or separate preview skill. To serve the bundled studio and generate source ZIPs, run a temporary local HTTP server from the skill/repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Use `python3` where that is the Python 3 executable, or another available static server. If port 8000 is occupied, choose an available port and adjust the URL.

- [Integrated design studio](http://127.0.0.1:8000/examples/design-studio.html): proposals, fonts, colors, materials, device scope and source generation.
- [Content and task lab](http://127.0.0.1:8000/examples/content-task-lab.html): three synthetic domains, independent panel widths, long labels, natural-height cards and editable queue/batch flows.
- [Button states study](http://127.0.0.1:8000/examples/button-system.html): action hierarchy, sizes, busy/disabled/pressed states and confirmation.
- [Material and controls lab](http://127.0.0.1:8000/examples/material-controls-lab.html): workspace, reading and creative scenes with gradient frost and rounded dropdowns.

Stop the server with `Ctrl+C` after use. Generation runs in the browser using bundled assets; it does not call a provider API, publish a site or modify another repository. Opening the studio with `file:` displays an instruction to use HTTP for source generation.

A terminal-only agent can provide the preview files and URL for you to open. Browser automation and screenshots depend on the host's available tools; missing visual QA must be reported. See [agent compatibility](references/agent-compatibility.md).

## Run generated pages

| Target | Entry | Run |
|---|---|---|
| HTML | `index.html` | Open locally or serve over HTTP |
| Vue | `src/App.vue` | Node.js 22.12+, `npm install`, then `npm run dev` |
| React | `src/App.jsx` | Node.js 22.12+, `npm install`, then `npm run dev` |

For Vue/React, use `npm run build` for a production build. Initial dependency installation requires registry access; fonts are included. Existing projects keep their own framework versions, router and component conventions.

## Compatibility and validation

Version **v0.1.0** now includes three delivery modes, four distinct compositions, detailed style controls and an immutable design-prompt handoff. The [current validation record](validation/2026-10-21-integration.md) covers confirmation followed by same-conversation implementation, with 44 passing tests and 36 build/static-closure instances. The earlier [mode review](validation/2026-10-21-modes.md) retains its original scope. Earlier content/task rules and their [three-domain lab](validation/2026-10-20.md) remain available; the lab demonstrates local state transitions, not a production API layer.

For an existing project, the agent in the same conversation reads the confirmed Demo directly and continues implementation in the actual routes/components, preserving business logic and APIs. You do not need to copy a prompt or download a starter. The browser confirmation records the design; it cannot wake an idle CLI session by itself. Resume the conversation normally when needed. See [same-conversation implementation](references/same-conversation-implementation.md). Exported Vue/React/HTML source is a standalone starting point; it does not automatically integrate an existing application. Prompt-only is useful for design handoff or continuing in another compatible CLI. Implementation modes still finish with working source and validation evidence.

Historical **0.3.0** native project skill discovery passed in Codex, Claude Code, Kilo Code and OpenCode. Read-only model application passed in Codex and Kilo. **Claude model execution is pending login (deferred by the user); OpenCode model execution is pending provider credentials.** Kilo used a recorded per-run model override after its configured default was rejected. See [versions, commands, evidence and limits](validation/2026-10-19.md).

From a clean package copy, with Node.js 22.12+:

```sh
npm ci
npm run verify
npm run cases
```

The suite validates mode routing, immutable prompt/source agreement, structural variety, preferences, recommendation regressions, color contrast, real font hashes/licenses, ZIP integrity and native button semantics. Transaction and in-memory DOM checks cover failure/retry, focus decisions, duplicate prevention and explicit batch scope; these do not replace native browser checks. React/Vue are production-built; HTML is checked as a static package. `npm run verify` covers 44 tests and 24 targets: three baseline, nine desktop-policy and twelve composition exports. `npm run cases` adds twelve targets from four versioned **synthetic** domains. These 36 instances test different structures and choices, not independent customer deployments. A Linux/Windows × Node 22/24 workflow is included; check actual workflow status before calling CI passed.

`npm run cli:prepare` creates isolated native CLI fixture projects without logging in, invoking a model or changing global configuration. Native discovery, model execution, build checks and visual review are distinct results. Browser checks currently cover representative Chromium desktop renders, not a complete automated visual regression or every CLI's end-to-end workflow. See [reproduction instructions](references/reproducible-validation.md).

The integrated studio now exports **32/40/48px button scale, solid/soft/outline primary fill, and crisp/rounded/pill corners**, with independent secondary/text row roles. The [button study](examples/button-system.html) demonstrates focus, toggles, busy/disabled states and reversible sample deletion. CSS and native Vue/React/HTML exports share the same button tokens. Existing saved designs receive backward-compatible defaults.

## Package map

The confirmation-to-project update is recorded in [its validation record](validation/2026-10-21-integration.md). Earlier mode/prompt checks remain in [the mode validation record](validation/2026-10-21-modes.md), with their original scope.

The [large-desktop independent review](validation/2026-10-21.md#independent-review) found no actionable P0–P2 issue in its inspected scope; 34 tests and 24 build/static-closure instances passed. CSS viewport checks do not certify physical high-DPR displays, OS scaling or real browser zoom. The prior content/task review's fixed P2 remains in the [2026-10-20 record](validation/2026-10-20.md#independent-review-and-correction), with earlier reviews in the [historical record](validation/2026-10-19.md#independent-review). Acceptance follows evidence and limits, not a target score.

| Path | Purpose |
|---|---|
| [references/design-modes.md](references/design-modes.md) | Default Demo question, direct/prompt-only routes and complete confirmed handoff |
| [assets/design-prompt.js](assets/design-prompt.js) | Immutable bilingual prompt and exact design contract |
| [validation/2026-10-21-modes.md](validation/2026-10-21-modes.md) | Mode, composition and prompt verification |
| [references/large-desktop.md](references/large-desktop.md) | Large-desktop composition, effective CSS widths and high-density rendering limits |
| [validation/2026-10-21.md](validation/2026-10-21.md) | 2K/4K preview/export checks and independent review |
| [references/content-and-task-validation.md](references/content-and-task-validation.md) | Conditional content-fit, contextual action and task acceptance rules |
| [examples/content-task-lab.html](examples/content-task-lab.html) | Synthetic support, inventory and editorial workflow lab |
| [validation/2026-10-20.md](validation/2026-10-20.md) | v0.1.0 checks, independent review and limits |
| [references/reproducible-validation.md](references/reproducible-validation.md) | Reproduction commands, domain briefs and CLI fixture workflow |
| [validation/2026-10-19.md](validation/2026-10-19.md) | Observed versions, results and honest limits |
| [assets/button-system.css](assets/button-system.css) | Shared button role, scale and state implementation |
| [SKILL.md](SKILL.md) | Shared workflow and resource routing |
| [references/agent-compatibility.md](references/agent-compatibility.md) | Host capability mapping and fallback behavior |
| [references/redesign-audit.md](references/redesign-audit.md) | Existing-site scoring and visual proposals |
| [references/post-implementation-review.md](references/post-implementation-review.md) | Independent reviewer workflow, findings, fixes and focused rechecks |
| [references/icons-and-controls.md](references/icons-and-controls.md) | Semantic icons and complete control styling |
| [references/button-design.md](references/button-design.md) | Button sizes, emphasis, surfaces, corners, grouping and states |
| [references/glass-materials.md](references/glass-materials.md) | Material selection and fallbacks |
| [examples/design-studio.html](examples/design-studio.html) | Unified interactive studio |
| [examples/material-controls-lab.html](examples/material-controls-lab.html) | Gradient frost and rounded control examples |
| [assets/design-page-generator.js](assets/design-page-generator.js) | Vue / React / HTML generator |
| [assets/fonts/manifest.json](assets/fonts/manifest.json) | Font provenance, hashes and licenses |
| [agents/openai.yaml](agents/openai.yaml) | Optional Codex UI adapter |

## License

Project code and documentation use the [MIT License](LICENSE). Bundled fonts retain their own SIL Open Font Licenses; see the [font manifest](assets/fonts/manifest.json) and each font directory's `LICENSE.txt`. Adapted Apple interaction references retain the [original MIT notice](references/apple-design-LICENSE.txt).

Microsoft YaHei, Segoe UI, DengXian and Consolas are device fonts and are not bundled. Their availability depends on the user's device; previews distinguish loaded fonts from fallbacks.


