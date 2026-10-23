# Adaptive UI Designer

`v0.2.0` · Project-specific, responsive web design for HTML, React, Vue and existing web stacks.

Start with the product, its content and the user's next action. Prepare a coherent direction across layout, color, typography, icons and interaction, then inspect the actual result. Blue-white is the default when no color preference exists; confirmed brand choices take precedence.

[中文说明](README.zh-CN.md) · [Agent instructions](SKILL.md) · [Font guide](references/fonts.md)

## Use it

```text
Use $adaptive-ui-designer to design an AI operations workspace with
pipelines, token analytics and team management. Show an adjustable HTML Demo first.
```

Three routes are supported:

| Route | Outcome |
| --- | --- |
| Demo first | A project-specific recommendation and useful alternatives; adjust, confirm, then continue implementation in the same conversation. |
| Direct implementation | Apply an explicit brief directly in the requested or existing stack. |
| Design handoff | Deliver the reviewed preview, parameters and optional prompt without building an application. |

Describe revisions naturally: “more compact”, “less like a dashboard”, or “keep the blue, change the layout”. Detailed controls remain available without making every design decision a questionnaire.

## Optimized structure

```text
adaptive-ui-designer/
├── SKILL.md                         Agent entrypoint and essential workflow
├── README.md / README.zh-CN.md       Human-facing overview and usage
├── agents/openai.yaml               Optional host UI metadata
├── references/                      Eight focused, on-demand guides
│   ├── workflow.md                  Routes and implementation
│   ├── art-direction.md             Project identity and composition
│   ├── visual-system.md             Color, type, spacing and components
│   ├── responsive.md                Devices, languages and appearances
│   ├── studio.md                    Preview, feedback and confirmation
│   ├── fonts.md                     Font names, character and fallbacks
│   ├── verification.md              Visual and task-based checks
│   ├── maintenance.md               Maintenance and packaging
│   └── apple-design-LICENSE.txt      Interaction guidance attribution
├── examples/
│   ├── design-studio.html           Integrated design comparison surface
│   ├── project-directions.html      Synthetic project-specific examples
│   └── button-system.html           Button behavior and state study
├── assets/                          Shared preview/generator runtime
│   ├── project-brief.js             Project context and prepared directions
│   ├── design-scenes.js             Shared scene renderer
│   ├── design-studio*.js / *.css     Studio state, tokens and presentation
│   ├── font-catalog.json            Font names and style descriptions
│   ├── font-preferences.js          Local availability and fallback helper
│   ├── font-faces.css               System font preferences; no binaries
│   ├── fonts/manifest.json          Font metadata only
│   └── …                            Controls, scene art and native exports
├── scripts/
│   ├── package-project.py           Package entries and local dependencies
│   ├── build-font-preferences.py    Regenerate helpers from the catalog
│   └── font-runtime-body.js.txt     Font helper source template
├── package.json                     Maintainer metadata; not needed to preview
└── LICENSE
```

Repeated guidance is consolidated into these eight references. Historical validation reports, screenshots, separate laboratories and the development toolchain are outside the runtime package. Use the integrated studio for ordinary comparison; read only the guide relevant to the current decision.

## Run the previews

No frontend dependency installation is required. From the skill directory:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Under `http://127.0.0.1:8000/`, open [the design studio](examples/design-studio.html), [prepared project scenes](examples/project-directions.html), or [the button study](examples/button-system.html). Standalone source export requires HTTP; direct file opening is sufficient for basic preview.

For a real project, adapt a local copy of `project-brief.js` and the scene to its actual content. Confirmation records the selected design; the active agent continues implementation. A snapshot is not an automatic backend integration or deployment.

## Fonts and lightweight delivery

The catalog describes **14 font families**, with **seven UI pairings** and **five monospace choices**. It records names, general character and local fallbacks. There are no WOFF, WOFF2, TTF or OTF assets, automatic downloads, or font installations. An unavailable family falls back to the declared system stack and is reported honestly.

Package project entries and their dependencies rather than copying the entire skill:

```sh
python scripts/package-project.py /path/to/project /path/to/project.zip --entry index.html
```

Use repeated `--entry` or explicit `--include` arguments for additional files. The helper rejects missing required dependencies and paths outside the root, excludes development/history folders, and rejects font binaries by default. Framework projects should use their normal build output. Keep screenshots separate unless the handoff needs them.

Dependency discovery covers HTML attributes, inline/external CSS, and literal JavaScript imports, `fetch`, `new URL(..., import.meta.url)` and resource assignments. Computed paths, runtime-loaded content and other dynamic dependencies need explicit `--include` arguments. Inspect and test the extracted archive before delivery.

## Verification and maintenance

Check actual renders, main tasks, overlays, focus, language/theme changes and responsive transitions. Report the observed scope and any remaining limits. See [verification](references/verification.md).

The runtime ZIP contains no test toolchain. Run the unit/DOM and generated-build suites only in a complete maintainer checkout containing `tests/` and development dependencies. See [maintenance](references/maintenance.md). Runtime checks, historical evidence and validation of a new customer page are separate.
