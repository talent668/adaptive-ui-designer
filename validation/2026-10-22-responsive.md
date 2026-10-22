# Whole-interface audit and responsive defaults — 2026-10-22

Version **v0.1.0**. This update changes audit guidance, intervention-level decisions, default size-preview visibility and exported responsive requirements. It updates the reusable skill and its sample output, not the previously delivered Flowline or class-learning application. Earlier dated records retain their original scope.

## Behavior and rules

The audit now explicitly inspects task order, layout/proportions, cards/grouping, spacing/density, typography, colors/identity, button hierarchy/states, icons/imagery, complete forms/controls, materials/motion, responsive behavior and implementation evidence. It records causes, useful patterns and evidence limits, then recommends polish, a regional redesign or an overall UI restructure. A score does not automatically choose the intervention; UI restructuring is distinct from framework/backend migration. Ordinary users see a short constructive recommendation and reviewable effects, with detailed parameters still optional.

Every web deliverable now has a responsive baseline. Desktop-first selects the starting composition. Phone/tablet previews are exposed by default, but project settings and advanced controls remain closed. The legacy `selected.responsive` Boolean now controls preview-choice visibility only: explicit false is preserved without removing phone/tablet requirements from prompts, generated README or shared output styles. Documentation was updated in both languages, including button/material guidance and reviewer scope.

## Reproducible checks

From a clean dependency install using the existing lockfile:

```sh
npm ci
npm run verify
npm run cases
```

- **56 tests passed, 0 failed.** Two new regressions exercise default device choices and the old false flag through chooser confirmation and HTML/React/Vue prompt/source delivery. Existing normalization coverage was updated for the new default.
- **36 build/static-closure instances passed:** 3 baseline, 9 desktop-policy, 12 same-project composition and 12 synthetic domain targets. Vue/React are production-built; HTML resource closure is checked. These are sample outputs, not customer deployments.
- The portable skill structure validator and all 3 focused documentation/package checks passed after the final documentation edits.

Tests do not establish visual correctness: the independent browser review found a CSS conflict even though logic/export tests passed.

## Browser observations and corrective work

The workbench sample's old rules hid its original sidebar below 800 px and introduced a separate decorative bottom navigation only below 560 px. The revised sample retains its original four navigation labels and reflows them into a horizontal/wrapped region at small/medium canvas widths. These sample labels remain illustrative; this is not a claim that the sample contains a real application's routes. The skill requires actual product destinations and actions to remain reachable during integration.

A first attempt at bounded table scrolling conflicted with an old narrow card-row rule. The reviewer independently reproduced a 576 px-wide card row with hidden headers. The implementation now uses a single explicit narrow-table strategy: native table header/body/row/cell display, full columns, a keyboard-focusable local scroll region and a brief localized scroll hint. It no longer combines card-row display with table minimum width.

The implementer observed the generated HTML at the following actual CSS viewports (DPR about 1.42):

| Viewport | Observed result |
|---|---|
| 390 × 780 | Document client/scroll width 379/379. Four original navigation labels visible. Table region client width 317 and scroll width 576; header/row/cell display retained. A horizontally revealed row action opened the detail dialog; closing returned focus to that action. Dialog bounds stayed inside the viewport. |
| 768 × 900 | Document client/scroll width 758/758. Four navigation labels remained in the reflowed navigation region. Content groups and table stayed inside the page. |
| 1440 × 1000 | Document client/scroll width 1429/1429. Sidebar composition restored, with 132 px navigation and flexible content. |

The actual studio default exposed desktop/tablet/phone choices, selected desktop, and kept project settings and the detail inspector closed. Local browser geometry, images and reviewer findings are retained outside the portable package.

## Review and limits

An independent subagent inspected rules, bilingual documentation, current source and the running studio, and independently ran the 21 targeted model/prompt/controller tests. It identified the narrow-table conflict and residual wording that still implied opt-in mobile support. The implementation accepted these bounded fixes rather than changing the selected design or adding unrelated functionality. The reviewer reloaded the revised studio and directly verified native table display, preserved columns, local keyboard scrolling, detail actions and focus return. It separately inspected the implementer's native viewport images. Its final disposition was **accepted within the reviewed scope; no further rework required**. Direct studio/container checks and independently viewed implementer screenshots are distinguished; the reviewer did not claim to perform the entire native viewport matrix or the full 56-test/36-target run itself.

This update did not rerun native CLI/model integrations, remote CI or physical-device/high-DPR certification. Browser observations cover representative sample behavior, not all template/locale/theme combinations. Real project audits still require that project's evidence; a guideline, scorecard or build cannot guarantee an impressive design or correct behavior in every domain. An audit-only request remains a recommendation task and does not authorize rewriting a user's site.

## Follow-up: content-proportional density

A later scoped feedback round strengthened guidance for sparse metric containers: choose compact summaries before large cards, let meaningful content set natural height, and inspect unintended grid stretch. English/Chinese README and first-draft/spacing/content-fit references were synchronized. This follow-up changes skill guidance only; it does not alter the generator or add a universal metric-height limit. Its package/document checks and structure validation are separate from the earlier 56-test/36-target run above.

The corresponding Flowline application was separately tightened with a compact summary and content-height panels. A matched 1440×1000 CSS comparison retained all four metric labels, values and notes while reducing the summary from about 140 to 76 px and moving recent records upward about 105 px. This is evidence for that page, not a universal target or proof of every future project. The scoped change received visual self-review, not a new independent full-product review.

A subsequent user clarification retained four individual metric cards while keeping their natural, compact height. The guidance now explicitly separates density from card styling: spacing feedback alone does not remove the chosen card boundaries. The final Flowline card row measured about 78 px at 1440 CSS px, with all metric text retained. This was a scoped visual self-check and build, not another full-product review.

## Follow-up: record rows and grouped alignment

Guidance now explicitly covers content-driven record rows and whole-page alignment after local adjustments. Short records use proportionate insets; long names can grow without truncation; action targets remain usable. Peer overview panels align as one band with deliberate body/footer allocation, while independent reading content may keep natural heights. No universal 49 px row or mandatory equal-card-height rule was added.

The Flowline case separately reduced ordinary rows from about 73 to 49 px, retained names/IDs/status/usage/actions, and aligned the trend/attention panel bottoms. An independent reviewer directly checked an isolated 901×507 CSS browser, including a long mixed-language record (naturally about 72 px), detail mouse/keyboard activation, focus return, bilingual alignment and 7/30-day/single-point charts. It reported no further scoped rework. The implementer separately measured matching panel bottoms at 950 and 1440 CSS widths. These application observations calibrate the general rules; they do not certify all domains or rerun the earlier whole-package/device matrix. Package/structure checks remain proportionate to the guidance-only skill changes.

## Follow-up: navigation and content coherence

The audit, visual-system guidance, verification checklist and bilingual README now treat sidebar, toolbar and content as one shell. Attached rails and inset panels remain project-dependent alternatives; no universal floating sidebar or corner size was mandated. Checks include border/surface continuity, gutter rhythm, selected/focus states, sticky/scroll ownership and short-window access.

The corresponding Flowline refinement used an inset panel with the same radius/surface/border roles as its cards. Actual narrow-window checks exposed the application's old page-wide minimum width and overflow ancestor, which displaced the sidebar and defeated sticky positioning. The application separately removed page-wide horizontal overflow, reorganized smaller layouts, kept the four navigation destinations and budget, and bounded table/modal scrolling. The implementer checked 748px English layout and scrolling, 950×500 sidebar internal scrolling, and 390×700 navigation, form and table bounds. These are representative CSS viewport checks, not physical-device or full workflow certification.

The independent reviewer could not access a browser in this follow-up. It independently read source, original images and measured JSON from implementer-operated steps, including the initial failure and correction, and accepted the scoped result. The review does not claim independent browser execution. Only skill guidance changed in this follow-up; earlier full-suite/build counts above retain their original scope.
