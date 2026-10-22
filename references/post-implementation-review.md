# Independent Review After Implementation

Run an evidence-led review before declaring a new page or substantial UI change complete. Prefer one separate review subagent when the host supports delegation and its rules permit it. Keep the review proportional: a preview is assessed as a preview, a narrow fix is checked in its affected area, and a production claim needs production-relevant evidence. Do not add a backend, a separate mobile/native product or publishing merely to satisfy the review. Responsive behavior remains part of every web deliverable; verify affected small/medium/large layouts proportionately.

## Prepare a reviewable artifact

The implementer first completes the scoped change and relevant build/type checks, then makes the actual page available. Supply:

- The user's task, audience, chosen direction and constraints, including the target stack and desktop/device scope.
- The source directory and current revision or relevant file hashes when useful, a working URL or run command, and the accepted preview/baseline if comparison is required.
- Which data and actions are illustrative, what is intentionally out of scope, and how to exercise representative states without affecting real user data.

Keep the artifact stable during the initial pass where practical. If code changes while review is underway, identify the changed files/state and recheck affected findings against the current version. Never reuse a stale pass as proof for later changes.

## Keep the reviewer independent

Give the reviewer raw requirements, the accepted design and artifacts. Do not prime it with the implementer's positive assessment, expected score or a preferred list of findings. Ask it to investigate, not to confirm that the work is good. A second role-play message in the same agent is self-review, not a separate reviewer.

Start with one reviewer rather than an unbounded agent tree. Add specialized review only when actual complexity justifies it. Use the host's native delegation mechanism; do not create a separate user-owned chat or require a particular vendor's tool names. If delegation is unavailable or prohibited, perform a separate self-review pass and say that no independent agent review occurred.

Reviewers inspect and report by default. They should not silently rewrite source, change global configuration, deploy, or mutate real records. Isolate test data and restore temporary viewport/theme/filter changes where possible. An interactive preview with sample records can be tested according to its scope, with any persistent test changes disclosed.

## What to inspect

Use the relevant parts of [verification](verification.md), then exercise concrete user goals rather than checking only static elements:

1. **Visual fidelity:** compare the actual render to the selected proposal at a stated viewport. Inspect task priority, readable type, grouping, semantic icons, open menus, real fonts, material restraint and theme contrast. Review [buttons](button-design.md) for contextual size, visual emphasis, surfaces, corners, icon/label balance and grouped alignment, not only whether clicking works.
2. **Task completion:** perform representative end-to-end actions such as search → select a record → edit → save → verify the displayed result. A dialog opening does not prove saving works; a toast does not prove the data changed.
3. **State integrity:** check selection, filters, form values and persistence after relevant theme, locale, layout, route or reload changes. Confirm labels, units, counts and warnings describe the actual state.
4. **Keyboard and recovery:** focus visibility, modal containment and return, Escape, dropdown navigation, required-field errors, empty results, long labels and actual window resizing. Add the explicitly requested device matrix only.
5. **Technical evidence:** relevant builds/tests, browser errors, missing assets and runtime behavior. A passing build cannot substitute for visual or interaction evidence.

Use permitted tools. If the reviewer lacks a browser, distinguish source findings from rendered behavior and report the unverified visual/interaction scope. Do not invent screenshots, accessibility certification, cross-browser coverage or runtime results.

## Findings format and severity

Each actionable finding includes the affected scope/revision, reproducible steps, expected versus observed behavior, evidence (source location, screenshot, DOM measurement or test output), user impact and confidence. A suspected issue without reproduction or sufficient source evidence remains a hypothesis.

| Priority | Meaning |
|---|---|
| P0 | Severe broadly destructive or unsafe behavior requiring an immediate stop; use only with clear evidence. |
| P1 | A core task is blocked or data/state is lost or materially wrong in a common supported path. |
| P2 | A reproducible local functional, readability, accessibility or consistency defect with a meaningful user impact. |
| P3 / suggestion | Lower-impact polish or an alternative aesthetic preference; identify subjective judgments explicitly. |

A deliberate preference is not a defect simply because the reviewer likes a different style. Do not pad the report with a finding quota. A clean report says “no actionable findings in the tested scope,” with its limits; it does not claim universal correctness. If scoring is useful, apply the same [audit rubric](redesign-audit.md) and inspected scope. Never target a predetermined high score or assign an improved total from proposed code alone.

## Resolve and recheck

The implementer evaluates each finding against the evidence and user requirements. Fix confirmed defects within scope, and record a reason when a finding is rejected, intentionally deferred, or needs user input. Do not redesign unrelated parts based on taste during this step.

Recheck the exact reproduction after the fix and relevant neighboring paths. When an independent reviewer is available, send the concrete fixes back for a focused verification pass; avoid rerunning the whole site unless the change or a new failure warrants it. Add a regression test when it protects meaningful behavior, not merely to mirror an implementation detail.

Do not mark a confirmed defect resolved on code inspection alone when runtime behavior is what failed. Disclose any unverified fix. If a blocking supported task still fails, report that limitation instead of saying the implementation is complete. Continue until the scoped work is actually handled or a concrete external constraint prevents it; do not loop reviews just to obtain a desired score.

## Handoff

Return a concise review summary: who reviewed (independent subagent or self-review), inspected version/scope, relevant checks, confirmed findings fixed, unresolved items and verification limits. Attach a current screenshot when visual changes matter. Keep proposal evaluation distinct from final implementation acceptance and deployment status. A subagent report is evidence for the main agent to assess, not an automatic approval stamp.

## Scope and score discipline

For workspaces with filters and repeated content, include [content fit and task validation](content-and-task-validation.md) in the reviewer brief. Ask for actual task results, not merely working click handlers. Compare matched content and check long localized values, short/mixed card content, focus after redraw, and relevant failure paths. Select workflows from the product; do not demand queues or batch actions everywhere.

Scores depend on rubric, evidence and reviewer judgment. An unchanged total can coexist with a useful defect fix, and different reviewers are not a controlled before/after measurement. Keep a site's visual score separate from skill completeness. End on scoped acceptance and resolved relevant defects, not a target grade or repeated sampling until the score rises.

## Reviewing the review

When the user asks for separate development, suggestion review and adjudication, use three roles where the host supports them. A implements; B inspects the actual artifact and proposes changes; C judges B's proposals against the user's requirements and raw evidence, then independently accepts or returns the revised result. This does not require three agents for every small task or hosts without delegation.

B supplies a concrete observation, impact, proposed remedy and verification method for each finding. C classifies each as **accept**, **adapt**, **reject** or **needs evidence**, explaining whether it fixes a real problem, respects the selected style and scope, and justifies the extra work. A records its own implementation decision and may disagree with a rationale; it does not implement suggestions simply because B produced them. Taste, added controls and extra animations are not inherently improvements.

After accepted changes, C inspects the result against the original request and agreed criteria, including ease of use and visual quality. Confirm the fixes, remaining tradeoffs and whether focused rework is needed. Do not repeatedly sample reviewers until a desired score appears. Additional rework requires a reproducible defect or an unmet requirement, not a demand for a higher grade. Keep the suggestion log, adjudication and final acceptance distinct; a self-review must not be presented as a separate reviewer.

## Identity and composition acceptance

Use the [art-direction gate](art-direction.md#acceptance). Independently inspect the actual first screen: identify the project concept and at least two visible traits; check color across real regions, type contrast, meaningful media and the primary task. A neat, accessible generic scaffold still needs revision when the accepted brief calls for distinctive expression. Do not reward added decoration or prescribe personal taste. Report evidence and concrete changes rather than a target score.

For intended peer rows, record actual rendered top/bottom and footer/action anchors (approximately one CSS pixel tolerance) at a normal desktop and a content-pressure width. If equal height creates a large empty region, revise grouping/proportion instead of padding. Natural independent feeds do not need universal equal heights. Check the whole neighboring composition after changing a local panel.
