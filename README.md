# Adaptive UI Designer

**English** | [简体中文](README.zh-CN.md)

A standalone, desktop-first UI design skill for **Codex, Claude Code, Kilo Code, OpenCode, and other compatible coding agents**. Analyze the project, audit an existing site, show adjustable design proposals, and implement the user's selected Vue, React, HTML, or existing-stack page.

The package uses the open [Agent Skills format](https://agentskills.io/specification). Its core workflow and browser assets do not depend on a particular AI provider or desktop application. `agents/openai.yaml` is optional Codex UI metadata; the shared instructions live in `SKILL.md`.

## Workflow

1. Inspect the audience, primary tasks, content, source code, technology stack and explicit brand constraints.
2. For an existing site, score observed dimensions, explain weaknesses and identify useful parts to retain. Do not invent a baseline for a new project.
3. Recommend project-specific directions and show rendered concepts or interactive previews. Prefer matched desktop before/after views for redesigns.
4. Let the user adjust layout, colors, fonts, material, radius, shadows and density, then choose a direction.
5. Generate the confirmed page in Vue, React, HTML/CSS/JS, or integrate it into the existing stack.
6. Verify the actual render and key interactions. Compare redesigns using the same inspected scope and rubric.

Preserve required business behavior, data contracts and the stack while remaining free to replace weak visual styling. Scoped fixes stay scoped. Reuse confirmed decisions and honor explicit delegation without another selection round.

## What is included

- **Three color roles:** neutral structure, action/selection accents and semantic states.
- **Project-specific directions:** blue-white, soft cards, graphite and other compositions suited to the actual task.
- **Real fonts:** seven interface pairings and five monospace choices; IBM Plex Sans and Geist can use the bundled Source Han Sans SC for Chinese.
- **Four materials:** solid, light frost, gradient frost and expressive glass, with placement controls and opaque fallbacks.
- **Scene-based glass:** stable data/reading surfaces, optional translucent navigation and short floating tools. Soft tint and highlights communicate depth without covering every card.
- **Meaningful icons and complete controls:** coherent semantics, sizing, strokes and corners, including rounded open dropdown menus with keyboard and focus behavior.
- **Desktop by default:** tablet/mobile design is opt-in; preserve basic resizing and existing responsive behavior.
- **Chinese/English and light/dark/system appearances:** retain current choices across switches. README language does not force the language of generated sites.
- **Source delivery:** native Vue SFCs, React JSX or standalone HTML, selected fonts and licenses, a confirmation snapshot, source viewer and ZIP export.

Avoid generic template styling by grounding composition in actual tasks and content. Remove decorative metrics, excessive card nesting, arbitrary gradients and unrelated icons when they serve no purpose. Web glass is a CSS material treatment, not a claim of native Apple Liquid Glass optical parity.

The studio's categories and keyword rules assist recommendations; they do not automatically inspect repositories. The agent adapts the preview after examining the project. The generator packages the current sample page; real business APIs and data are integrated separately.

## Existing-site reviews

The audit covers task flow, layout/spacing, typography, color/contrast, components/icons/states, content identity, materials/motion and desktop usability. Ratings require concrete evidence, including what is worth retaining. Unobserved behavior is marked unverified, and partial scores describe their coverage.

Show findings, prioritized changes and visual proposals before reimplementation. A screenshot alone does not establish interaction, performance or accessibility behavior. See the [redesign audit](references/redesign-audit.md).

## Install in your coding agent

Download the repository's **`dev` branch**, then copy the **complete repository contents** into one directory named `adaptive-ui-designer`. Keep `SKILL.md` directly inside it, alongside `assets/`, `examples/`, `references/` and `scripts/`. Copying only `SKILL.md` omits the previews and fonts.

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

The package format and installation paths support the hosts listed above. The studio and generated outputs have been exercised in the current Codex environment, including Vue/React builds and HTML language/theme/dropdown behavior. **Independent native CLI runs in Claude Code, Kilo Code and OpenCode have not been performed.** Format compatibility is not a guarantee of identical model output, tool availability or permissions across hosts.

## Package map

| Path | Purpose |
|---|---|
| [SKILL.md](SKILL.md) | Shared workflow and resource routing |
| [references/agent-compatibility.md](references/agent-compatibility.md) | Host capability mapping and fallback behavior |
| [references/redesign-audit.md](references/redesign-audit.md) | Existing-site scoring and visual proposals |
| [references/icons-and-controls.md](references/icons-and-controls.md) | Semantic icons and complete control styling |
| [references/glass-materials.md](references/glass-materials.md) | Material selection and fallbacks |
| [examples/design-studio.html](examples/design-studio.html) | Unified interactive studio |
| [examples/material-controls-lab.html](examples/material-controls-lab.html) | Gradient frost and rounded control examples |
| [assets/design-page-generator.js](assets/design-page-generator.js) | Vue / React / HTML generator |
| [assets/fonts/manifest.json](assets/fonts/manifest.json) | Font provenance, hashes and licenses |
| [agents/openai.yaml](agents/openai.yaml) | Optional Codex UI adapter |

## License

Project code and documentation use the [MIT License](LICENSE). Bundled fonts retain their own SIL Open Font Licenses; see the [font manifest](assets/fonts/manifest.json) and each font directory's `LICENSE.txt`. Adapted Apple interaction references retain the [original MIT notice](references/apple-design-LICENSE.txt).

Microsoft YaHei, Segoe UI, DengXian and Consolas are device fonts and are not bundled. Their availability depends on the user's device; previews distinguish loaded fonts from fallbacks.
