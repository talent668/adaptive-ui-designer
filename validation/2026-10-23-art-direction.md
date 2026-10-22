# Art-direction redesign verification · 2026-10-23

Version remains **v0.1.0**. The internal chooser state is version 4; old saved selections retain contained color placement rather than being silently restyled. This update concerns the skill, its supporting guidance, chooser and exports. Work on the Gongji application was paused at the user's request.

## What changed

- Replaced the cross-project blue-white fallback with a project-specific art-direction contract and aesthetic acceptance gate.
- Complete anchor/companion/canvas/foreground relationships and explicit contained/anchor/paired color distribution. Information density and expression are independent; prepared project constraints override generic expressive defaults.
- Project-specific recommendations and a controlled comparison of the same learning content under two identities. Existing compatible composition IDs and advanced customization remain.
- Current design intent and localized copy pass through confirmation, optional prompt and native output. Alternatives carry their own intention; manual changes reconcile the affected active descriptions rather than restoring old colors, fonts or reading order.
- Prepared custom markup is preserved in the handoff instead of forcing a generic sidebar recipe. Unresolved local media/styles stop standalone export. Same-conversation project integration remains the main workflow.
- Faithful candidate thumbnails, hidden advanced controls, natural-language refinement and honest Demo/source boundaries.

## Reproducible checks

- `npm test`: **70/70 passed**. Includes actual chooser DOM/controller behavior, prepared-value precedence, current alternative/manual intent, precise confirmation, custom markup handoff, missing local-media rejection, bilingual prepared text, stale feedback, font/resource integrity and generated source.
- `npm run test:visual`: **9/9 passed**: expressive operations, calm learning and editorial learning, each in HTML, Vue and React. HTML resource closure checked; Vue and React production builds compiled.
- Skill Creator `quick_validate.py`: passed. Documentation links checked by the package tests; query-string example links resolve to their packaged HTML document.

Builds and tests do not establish universal aesthetic quality or actual behavior in every CLI/model. No paid model calls or real-user study was performed for this revision. The earlier CLI evidence remains scoped to its recorded versions and environments.

## Rendered evidence

The browser was inspected at actual **1440×900** and **390×840 CSS viewports**, with DPR approximately **1.42**. Correct raw viewport JPEG captures were used; the browser tool's full-page capture had a scale/crop defect and those earlier images were discarded from this evidence set. The captured pixel dimensions differ slightly from CSS viewport dimensions because of the browser capture/scaling surface; there was no image post-processing.

- [Record-first operations, desktop](art-direction-review/operations-desktop-viewport.jpg)
- [Operations, narrow screen](art-direction-review/operations-mobile-viewport.jpg)
- [Same lessons, reading layout](art-direction-review/reading-light-desktop-viewport.jpg)
- [Same lessons, editorial layout](art-direction-review/edition-light-desktop-viewport.jpg)
- [English/dark editorial layout, narrow screen](art-direction-review/edition-mobile-viewport.jpg)
- [Narrow-screen lesson content](art-direction-review/edition-mobile-content-viewport.jpg)

Observed: no page-wide horizontal overflow at the inspected widths; the narrow operations table owns its necessary horizontal scroll. Prepared English headings actually change language. Light/dark region colors remain readable. The active controls and generated scenes retain the selected composition.

## Independent judgment

B reviewed the implementation, beginner interaction cost and visual screenshots; C judged B's suggestions and separately rechecked the result. Both requested bounded fixes for prepared-value precedence and stale alternative/manual intent; C also required a custom-markup handoff without a forced generic recipe. Those findings were repaired and received focused regression coverage. B accepted the final visual direction and C independently reran all 70 tests and accepted the scope. They did not claim that build success proves aesthetic quality or that every CLI/provider has been revalidated.

A non-blocking usability limit remains: unresolved custom assets stop source export, but the chooser currently shows a generic incomplete-resource error rather than listing every missing asset. Its guidance and underlying generator report the boundary. This is not an automatic media packager; a project agent must include or embed the real resources when integrating source. The synthetic styles are reusable examples, not a guarantee that every future first draft will be distinctive or production-ready.
