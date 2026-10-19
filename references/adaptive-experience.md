# Devices, Languages, and Appearance

These are independent dimensions of the selected scheme. Preserve objects, terminology, and task progress while adapting composition and tokens. **Desktop is the default delivery target.** Add dedicated tablet/mobile composition and testing only when explicitly requested. Mobile examples below describe that opt-in scope, not extra requirements on every task.

## Scenario determines the starting point

| Context | Emphasis | Desktop | Mobile |
|---|---|---|---|
| Frequent management/comparison | Density, evidence, keyboard actions | Table, sidebar, contextual inspector | Priority fields and task list; details and bounded tabular scrolling when comparison needs it |
| Forms, booking, onboarding | Focus and recovery | Constrained readable form | Single-column flow, reachable actions, keyboard-safe footer |
| Reading, learning, discovery | Reading and finding the next item | Content column plus related material | Comfortable type, ordered content cards |
| Creative/media workspace | Content and manipulation | Canvas plus tools/inspector | Essential controls and contextual sheet; no tiny desktop toolbar |
| Landing page or portfolio | Offer, proof, exploration | Content-led composition and real media | Reordered narrative and useful actions; no shrunken desktop hero |

For an unspecified new web project, design the desktop experience first: monitor widths, keyboard/pointer paths, density and deliberate panel relationships. Do not automatically create a phone/tablet version. Add those layouts when requested. Preserve responsive behavior already present in an existing project and keep basic window resizing, zoom, wrapping and bounded overflow usable.

## Responsive behavior

- Apply [spacing and grids](spacing-grid.md) to actual available content width, including gutters and padding. A 12-track design system does not imply 12 visible cards. Reflow and preserve reading/focus order before compressing content; use a container query for components whose layout depends on their parent rather than the viewport.
- Breakpoints follow content pressure, not device brands. Use flexible tracks, intentional wrapping, and stable reading order.
- Recompose navigation and secondary panels before shrinking text. Sidebars may become drawers or task navigation; bottom tabs are not mandatory.
- Aim for touch targets around 44 CSS px where practical; compact icons may have larger hit areas. Separate adjacent actions and support coarse pointers.
- Do not depend on hover for actions or essential detail. Preserve visible focus and keyboard equivalents.
- Check dynamic viewport height, relevant safe-area insets, landscape, scrolling, and the on-screen keyboard. Sticky actions must not hide the form or become obscured.
- Preserve native scrolling. Necessary horizontal overflow belongs inside a table/chart region, not the page.
- Inspect relevant desktop widths such as 1280/1440 and the actual application window; include a wider monitor when material to the task. Add phone/tablet breakpoints only for requested device support.

## Chinese and English

Determine Chinese-only, English-only, or bilingual from the actual audience and request. Do not add a switch to every site. A requested bilingual site needs complete translated content and working switching, not just a translated header.

Use [typography and hierarchy](typography-hierarchy.md) for script-specific tracking, leading, measure, and font fallback. Latin `ch` widths are not literal Chinese character counts. Preserve heading roles and readable metadata across translations rather than forcing identical line breaks or fixed box heights.

- Separate messages from components using existing i18n. A small HTML demo can use a dictionary; production framework work follows the established locale/router mechanism.
- Set `lang` to the actual locale (`zh-CN`, `zh-TW`, `en`, etc.). Chinese audiences are not automatically simplified Chinese audiences.
- Translate actions, navigation, status, validation, errors, empty/loading states, accessibility labels, tooltips, dialogs, and metadata. Avoid sentence-fragment concatenation.
- Use `Intl` or the existing formatter with locale, explicit currency and appropriate timezone. Language must not silently change business currency or date meaning.
- Allow English expansion and natural Chinese wrapping. Do not fix widths around short Chinese labels. Test long names and mixed-script content.
- Use system fonts with CJK fallbacks, for example `system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`, adapted to locale. Do not bundle proprietary Apple fonts or assume identical metrics across OSes.
- Preserve route, filters, entered values, and focus on locale change. Use language names, not flags alone.
- For public localized routes, follow existing SSR/SSG, canonical, alternate-language and metadata conventions. Do not change routing just for a prototype.

## Light, dark, and system

New builds normally offer light/dark/system preference unless excluded by the request. Bounded existing-app edits retain the app's theme architecture and scope.

Separate the user's **preference** (`system`, `light`, `dark`) from **resolved appearance** (`light`, `dark`). Use existing preference storage; guarded local storage suffices for a small browser-only page. Storage failure must not break rendering.

- System follows `prefers-color-scheme` changes while selected. Explicit preferences override system and persist when feasible. Clean up listeners.
- Map canvas, surface levels, text, borders, actions, selected/focus, disabled, status pairs, scrims, and optional materials in both modes. Keep chart semantics separate.
- Do not invert colors. Default dark surfaces are near-neutral, with visible elevation and readable accents. Retain deliberate pure-black branding when requested.
- Check actual foreground/background pairs, including hover, selected, placeholder, validation, charts, and overlays. Token names do not prove contrast.
- Resolve the initial mode before first paint using the framework's CSP/SSR-safe approach. Avoid hydration mismatch and unsolicited inline scripts in CSP-constrained apps.
- Set CSS `color-scheme` for native controls; update theme metadata when used.
- Keep mode controls labeled and preserve task state. Theme and locale are independent preferences.

## Verification matrix

Exercise each required locale and appearance on the selected desktop scope, adding phone/tablet coverage only when requested and using representative states rather than every permutation. Include long translated labels, an open overlay and focus return, form validation, empty/error feedback, long content and enlarged text, system preference changes and stored overrides, reduced motion, and an opaque material fallback when relevant.

Use observations and screenshots rather than only CSS assertions. Report unsupported or unverified combinations precisely.
