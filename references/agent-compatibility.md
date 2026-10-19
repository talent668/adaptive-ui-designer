# Agent and CLI Compatibility

The reusable unit is the complete `adaptive-ui-designer/` folder: a standard `SKILL.md` with `name` and `description`, plus its relative references, examples, scripts and assets. The same design workflow can run in Codex, Claude Code, Kilo Code, OpenCode, or another host that can load these instructions. Host support for a skill format does not imply that every host/model/version has been tested end to end.

## Keep the core portable

- Keep the folder name and frontmatter name `adaptive-ui-designer` aligned. Preserve resource subdirectories when copying or installing; copying only `SKILL.md` breaks preview and font delivery.
- Resolve links from the directory containing the loaded skill. Do not substitute a previous session's absolute path, user home directory, local port or proprietary environment variable.
- `agents/openai.yaml` is an optional Codex adapter. It is not a requirement for other agents and is not the source of core workflow instructions. Do not introduce dependencies on a specific provider SDK, desktop app, browser MCP or hosting service.
- Treat `$adaptive-ui-designer` and `/adaptive-ui-designer` as host-specific invocation examples, not universal syntax. A plain request to read and use this skill is the portable fallback.
- Match the conversation and website language to the user's request. The default English repository README is a documentation choice, not an English-only output policy.

## Adapt by available capability

| Workflow need | Portable behavior |
|---|---|
| Inspect the project | Use the host's permitted file/search tools to read manifests, source, styles, routes and relevant project instructions. |
| Build a preview | Copy the bundled studio into the project workspace and adapt its content/layout. Use the project's dev command or an available loopback HTTP server. Do not modify the installed skill for a customer's site. |
| Inspect the actual render | Use the host's supported browser or screenshot tools when available. Check real fonts, layouts, menus, focus and states. |
| Terminal-only host | Produce the working preview files and an actionable local URL/run command for the user to open. State that visual QA has not been performed; do not invent screenshots or a visually verified score. A remote machine's loopback URL is not automatically accessible on the user's computer. |
| Present alternatives | Link or attach rendered images/local artifacts using the host's supported format. With no rendering capability, provide the closest reviewable HTML artifact and explain the limit. |
| Obtain a design choice | Use a host-native question tool if available, otherwise ask in ordinary chat after showing the proposal. Honor an already confirmed design or explicit delegation; do not require a Codex-specific UI control. |
| Read confirmation | Use the user's explicit instruction, visible selection, or supplied confirmation JSON. Keep adjustments intact. A saved preference or highlighted default alone is not confirmation. |
| Generate and verify | Use the existing project stack and its build/test commands. For the standalone generator, a modern browser packages the selected Vue/React/HTML files locally; it does not need a provider API. |
| Independent implementation review | Prefer the host's native review subagent when available and permitted. Give it the requirements and actual artifacts, then resolve and recheck findings. Without delegation, identify the review as self-review; without browser access, identify visual/runtime checks as unverified. See [the review workflow](post-implementation-review.md). |

The skill itself has no background service. A local HTTP service is used only while serving the preview/generator. Initial installation of Vue/React dependencies may require package-registry access; font assets are bundled. Select a port available in the current environment, respect the host's execution permissions, and manage the preview process according to the user's requested handoff.

## Installation and validation boundaries

The English [README](../README.md) and [Chinese README](../README.zh-CN.md) document installation directories and common invocation examples for each host, with links to official guidance. Use a directory supported by the installed host version. Avoid duplicate copies with the same skill name in overlapping discovery locations.

For hosts without native skill discovery, explicitly read `SKILL.md` and the relevant linked resources from an accessible local folder. This is a manual instruction workflow, not a claim of native skill integration.

Validate packaging separately from runtime behavior: frontmatter, relative resources, bundled fonts, preview rendering, generated builds, and native CLI skill discovery are distinct checks. Report which were actually run. Do not describe a successful browser preview in one environment as a passing native CLI test in all other tools.
