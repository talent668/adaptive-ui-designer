# Integrated studio and scene contract

Use a project-local copy of [design-studio.html](../examples/design-studio.html) and its runtime dependencies. Do not copy every skill asset into each deliverable. The studio combines comparison, typography, color roles, material, geometry, density, controls, devices, language and appearance; separate laboratories are optional maintenance examples.

## Project configuration

Fill `assets/project-brief.js` with a stable `id`, `revision`, context, recommendation, rationale and prepared directions. Set the real stack. Mark synthetic briefs `example:true`.

```js
window.AdaptiveProjectBrief = {
  id:'project-id', revision:'1', example:true,
  context:{project:'workspace',projectName:'Product',stack:'html'},
  recommended:'clear',
  reason:['推荐理由','Reason'], identity:['视觉想法','Visual idea'],
  designIntent:{concept:'...',signature:['...','...']},
  directions:{clear:{name:['工作台','Workbench'],
    benefit:['适合的任务','Task benefit'],tradeoff:['取舍','Tradeoff'],
    values:{composition:'overview',palette:'blue'}}},
  sceneRenderer:state => renderProjectScene(state),
  sceneResources:['assets/project.css']
};
```

Keep detailed controls closed by default. Prepared directions are the candidate set; do not fill gaps with unrelated templates. Preserve a selected design while editing project metadata. A local keyword classifier is a seed, not source inspection or an aesthetic decision.

## Renderer boundaries

The controller calls a scene renderer for visible content **and both hidden locale snapshots**. Rendering must not mutate business state, current locale, filters or committed design. Use a pure renderer, or restore temporary values in `finally`; adopt runtime settings only when hydrating the actual displayed DOM.

Scope project CSS and explicitly set control orientation so studio `label`/`.aui-field` styles do not leak. Reapply select enhancement consistently after scene replacement. Keep per-entity actions and focus identity stable across redraws.

## Feedback

Conversation is the primary refinement path. The optional note stores exact wording and a captured design in `#designFeedbackRecord`; it does not invoke a model. Pending feedback blocks confirming the unrevised design.

Read current and captured state before revising. A matching response can apply `{status:'apply',requestId,baseSignature,patch,summary}` in the project brief. Only whitelisted style fields are patched. Preserve newer drafts; stale/missing drafts or mismatched signatures must not silently restore old selections. `needs-clarification` is for genuine unresolved ambiguity, not routine design choices.

## Confirmation and implementation

`#confirmedDesignRecord` exposes `status`, `design.selected`, `implementationEligible`, pending adjustment and baseline state. Confirm captures an immutable snapshot without opening a prompt. Manual changes mark it stale. A saved preference is not consent to implement or deploy.

Read this record and continue in the current project. Prompt export and standalone source generation are optional. If a custom preview promises that confirmation also saves settings for another page, explicitly write the confirmed `design.selected` to the shared project storage key and test the round trip; the base snapshot record alone does not provide that persistence.

## Generator boundaries

The generator emits native HTML/React/Vue markup from the selected preview. It includes exact tokens, prompt and necessary resources. Fonts remain local family names and fallback descriptions; it must not collect a font library. Custom scene business handlers must be implemented and tested separately. Do not present a static export as a complete backend or replace an existing router with a starter.

Read and normalize stored settings, guard storage failure, preserve earlier immutable snapshots, and capture current settings before asynchronous work. Language for exported prose is independent from page locale. Never claim that confirmation published a site or automatically messaged another agent.
