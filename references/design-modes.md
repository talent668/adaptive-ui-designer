# Design Modes and Confirmed Prompt Handoff

Use this for new page design, substantial redesign, or a reusable design prompt. It does not restart discovery for a scoped styling fix, an already accepted design or maintenance of this skill package.

## Ask once before choosing the route

When the user asks for a design without specifying a route, briefly inspect enough project context to make the question useful, then ask whether to see an adjustable HTML style Demo first. Offer these three choices in the user's language:

| Mode | Outcome |
|---|---|
| Choose, then design — recommended | Project analysis → HTML Demo → confirm → implement in the current project and conversation; prompt export is optional |
| Generate directly | Inspect the project → choose a justified direction → implement and review; skip the Demo/selection gate |
| Design prompt only | Project-specific HTML Demo → adjust and confirm → portable prompt/configuration; stop before application source |

Example question: “Would you like a project-specific HTML style Demo before implementation, direct generation, or only a reusable design prompt?” / “要先看一个结合项目的 HTML 样式 Demo，还是直接生成？也可以只选择样式并导出设计提示词。”

Wait for the route when it is genuinely unspecified. Continue independent source inspection/audit while waiting. Do not treat silence or the chooser's highlighted default as selection. An explicit “no Demo”, “generate directly”, or “don't ask, just implement” selects direct mode; do not ask again. A vague “you design it” delegates design judgment but does not by itself waive the Demo question. A previously confirmed design/prompt or an explicit continuation of it needs no repeated route/style question. Existing sites still receive an evidence-led audit proportional to the requested redesign, but direct mode does not require a separate proposal approval before authorized implementation.

The requested deliverable still controls scope: “no Demo, prompt only” remains prompt-only and skips the preview, without generating an app. Use supplied design decisions or the user's explicit delegation to choose, state assumptions, and deliver the prompt. An opt-out from a preview is not permission to expand the output type.

A saved browser mode is a preference, not authorization for a different project or request. The current user's route takes precedence; a stored mode does not waive an otherwise required initial question.

## Make the Demo belong to the project

Inspect source, audience, core tasks, content shape, brand, technology stack and constraints. Adapt a project-local copy of [the HTML studio](../examples/design-studio.html), not the installed skill. Populate project name, audience, primary task and constraints; replace representative scene data/modules with the actual domain. The local keyword recommender and metadata form cannot inspect a repository or infer business APIs. Free-form text is preserved literally when the interface language changes; supply real translations when a bilingual project needs them.

Recommend one direction with credible alternatives. Each must change composition, navigation, information order, density or visual hierarchy as well as its surface treatment. The bundled workbench, content split, brand editorial and ledger use different DOM structures while retaining comparable content. Do not rename one dashboard or simply recolor it four times. Custom composition is appropriate when none fits. A constrained reading site, portfolio and operations desk should not receive interchangeable KPI-card layouts.

Show representative content, not several complete applications. Expose all implemented controls in labeled groups: composition; type hierarchy, UI/mono fonts and spacing; canvas tone, accent and color expression; card structure, corner family, shadow and glass scope; contextual buttons and coherent semantic icon treatment/size; width policy, locale, appearance and opt-in device previews. The studio also includes baseline comparison/reset and a component-state study. Advanced controls may be collapsed but remain discoverable. These choices are supported capabilities, not an exhaustive catalog of every possible UI style or an instruction to add every feature to the final product.

Judge aesthetics separately from function: whether the arrangement helps the actual task, the type establishes hierarchy, the color treatment has identity and legibility, and the composition avoids arbitrary repetition. More color or blur is not automatically better, but a restrained template must not become the only recommendation.

## Confirm the design and continue implementation

In choose mode, **Confirm design** captures the adjusted design without opening a prompt dialog or generating a standalone application. The active agent reads the confirmed record and continues the requested implementation in the current repository, without asking the user to copy/export anything. Use [same-conversation implementation](same-conversation-implementation.md) for the data contract and fallback. Chat confirmation of the current design also suffices.

Prompt export remains a separate optional action for changing CLI, resuming elsewhere or handing work to another person. Prompt-only confirms and opens the prompt, but does not generate or implement an app. Direct mode skips the Demo gate; agent implementation uses the real project, while the standalone browser tool can only create a separate example. Its source-export tools are labeled accordingly.

**View before adjustments** temporarily displays a baseline; return to the current design before confirmation. Saving preferences or exporting draft JSON/CSS is not confirmation. Changes after confirmation retain the old snapshot and mark it stale. Read the actual current selection; do not silently adopt later edits or restore the recommendation. A mode change is not a visual change, but current prompt-only scope still prevents implementation.

The browser does not invoke an AI provider, message another chat or write repository files. An active agent can read its DOM record. If the conversation is idle, resume it normally; copying a design prompt is unnecessary when the same preview remains accessible.

## A prompt another agent can use

The [prompt builder](../assets/design-prompt.js) captures an immutable contract: project context and constraints, target stack, selected composition and reading order, concrete layout recipe, every chosen setting, full light/dark token maps, semantic SVG paths and icon treatment, font/resource/license references, material placement/fallback, button roles and states, effective width policy, language/appearance/device scope, implementation requirements and evidence-led acceptance. The human-readable prompt includes the complete JSON so numeric values are recoverable rather than reduced to adjectives such as “premium”. Its origin mode describes how it was produced; a later user request to implement the confirmed design controls the next action.

Before handing it off, reconcile free-text requirements with selected controls. Missing project fields are unspecified; do not invent requirements. Read the exact selected state rather than reconstructing the original recommendation. The receiving agent inspects the actual project and integrates the confirmed design into its existing stack; it does not restart the style menu or claim sample data is a real integration. A prompt does not contain binary fonts, guarantee pixel-identical rendering or authorize deployment.

For the existing generator, target stacks are Vue/React/HTML. Another compatible CLI can read the same prompt and configuration; other existing stacks use their native conventions through agent implementation, not an unsupported starter export. Confirmation does not automatically send a message to any CLI/chat. The same active conversation reads the snapshot directly; copying/downloading a prompt is only an optional handoff route.

## Acceptance follows the selected mode

Verify the chooser's real render, project copy, control effects, changed structure, state preservation, baseline comparison, stale snapshots and exact exported contract. Confirm prompt-only produces no application source and direct mode works without the Demo gate. Use a separate reviewer where available; a fresh forward exercise should test ambiguous, explicit-direct and prompt-only requests without telling the reviewer which answer is expected.

For implementation modes, also run target builds and inspect actual user tasks. For prompt-only, review the Demo and prompt completeness/consistency; do not claim unbuilt Vue/React pages or real customer deployment have passed. Report visual judgments, reproducible defects and unverified scope separately, without a target score.
