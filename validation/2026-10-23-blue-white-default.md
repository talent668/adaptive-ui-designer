# Blue-white defaults and preserved selections

The reusable skill starts with blue-white unless a user explicitly requests another palette, required brand constraints apply, or a design has already been confirmed. This policy does not recolor existing accepted projects. Project analysis still determines composition, typography, density, media and material treatment; alternative layouts can share the default palette.

Generic recipes and the ordinary architecture, learning and operations gallery now follow that policy. Deliberately named color-comparison examples remain explicit exceptions. The blue family uses an ice-white companion; semantic success, warning and danger pairs are unchanged. English/Chinese READMEs and optional agent UI metadata agree with the runtime behavior. Version remains v0.1.0.

## Observed local checks

- **74/74 tests passed**, including default recommendations across all domains and priorities, explicit/saved palette preservation, prepared candidate overrides, prompt/source contracts and DOM controller state.
- HTML resource closure, React production build and Vue production build passed for the baseline generated project.
- Skill frontmatter and relative documentation links passed their validators.
- An independent reviewer reproduced a stale recommendation path: manually selecting sage, confirming, then changing composition reverted the choice to blue. The fix preserves the current palette unless the destination candidate explicitly supplies one. A separate adjudicator selected this bounded fix over rebuilding the recommendation baseline.
- The actual DOM regression checks sage remains selected after a composition change and its adjustment remains recorded; restoring defaults returns to blue; an explicitly prepared violet candidate still takes precedence. The effective intent compares against the prepared/default color rather than treating a manual choice as its own baseline.
- Independent focused rechecks passed. Existing Gongji A assets remain separate from this reusable package and retain their confirmed green palette.

These checks cover the local package and controller behavior, not every browser, native device or aesthetic outcome. Earlier art-direction screenshots document the earlier explicit example palettes; they are historical evidence rather than screenshots of the new default. GitHub CI is checked against the published commit, with the outcome reported in the task.
