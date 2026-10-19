# Selectable Interface and Monospace Fonts

The user requested the seven interface pairings and five monospace choices shown in their font-settings reference. That photograph's unrelated settings, business text, and device chrome are not part of this requirement. Keep the options available in design comparison, while recommending a suitable starting pair from the project and respecting an explicit favorite.

## Supported interface choices

| Choice | Preferred roles | Availability and fallback |
|---|---|---|
| Inter + 微软雅黑 | Inter for Latin/UI; Microsoft YaHei for Chinese | Inter is bundled; YaHei uses the device, then Noto Sans SC fallback |
| Segoe UI + 微软雅黑 | Native Windows-oriented UI and Chinese | Local availability varies; retain system and bundled CJK fallbacks |
| Noto Sans SC | A consistent simplified-Chinese-capable family | Bundled; the reference called it 思源黑体, but use its real family name |
| IBM Plex Sans + 思源黑体 | Plex Latin UI plus Source Han Sans Chinese | Both bundled; actual Adobe Source Han Sans SC VF, no Noto fallback in this pairing |
| Geist + 思源黑体 | Geist Latin UI plus Source Han Sans Chinese | Both bundled; the same genuine Source Han Sans asset is shared |
| Plus Jakarta Sans + 微软雅黑 | Jakarta Latin UI plus YaHei Chinese | Jakarta is bundled; local YaHei or explicit Noto fallback |
| Segoe UI + 等线 | Windows UI plus DengXian Chinese | Local Segoe UI/DengXian; fall back to YaHei/Noto as available |

Noto Sans SC and Source Han Sans are distinct family choices. The two Source Han pairings load the bundled `Source Han Sans SC VF` face directly without depending on a desktop installation or substituting Noto. If the asset fails to load, report the failure and the available emergency fallback; preserve the requested preference. Do not rename Noto files and claim they are Source Han Sans. Noto remains a separate selectable preset and a fallback for other pairings where declared.

Recommend from deployment and reading needs: a consistent cross-platform Chinese interface can start with Noto Sans SC; an established Windows environment may favor Segoe UI with YaHei or DengXian; Inter, IBM Plex Sans, Geist, and Plus Jakarta Sans offer different Latin UI character to compare on the actual product. Preserve an existing brand or the user's favorite. Do not present subjective font personality as a universal ranking, and do not force a Latin display choice onto Chinese body text without a suitable companion.

## Supported monospace choices

IBM Plex Mono, Cascadia Mono, JetBrains Mono, Geist Mono, and Consolas. The first four have open-font assets in this bundle. Consolas is device-dependent. Keep this selection separate from the interface pairing. Apply it to code, identifiers, durations, and technical values where useful; ordinary body text need not become monospace. Numerical UI can instead keep the interface family with tabular digits and proper alignment.

The authoritative identifiers and stacks are in [font-catalog.json](../assets/font-catalog.json). Variable-font CSS uses explicit family aliases such as `Inter Variable`; the user-facing name can remain Inter. Keep aliases, file declarations, and selectors consistent.

## Show a real comparison

Use the [font selector](../examples/font-selection.html) with matched content and sizes: a Chinese heading/paragraph, Latin sentence, a small table with aligned numbers, ambiguous glyphs (`Il1`, `O0`), and a short code sample. Offer an independent UI and mono selector, and make the selected item explicit. Show loading, confirmed availability, or fallback near the preview rather than presenting unavailable names as distinct rendered results.

Do not infer favorite fonts from the default selection. Preserve the user's chosen identifiers through theme/locale changes and subsequent edits. In a design tool or requested product preference page, save UI and mono choices independently with a versioned, whitelisted schema. In an ordinary app without a customization requirement, apply the chosen design-time fonts without adding an unsolicited settings panel.

## Loading and evidence

- A CSS family list expresses preference; it does not prove which font rendered a given glyph. Character coverage can cause per-glyph fallback even after a family loads.
- For bundled web fonts, wait for the relevant declared faces through `document.fonts.load()` and confirm a non-empty result with loaded faces. Test required weights and representative script samples. Do not use `document.fonts.check()` alone as proof that an arbitrary named family is installed.
- For named device fonts, a narrowly scoped `FontFace` with `local()` can test resolution without enumerating all device fonts. Failure means the current browser/device could not resolve it; do not equate it with a definitive OS installation inventory.
- Keep requested preference separate from resolved fallback. A temporary network error or unavailable local font must not permanently overwrite the saved choice.
- Handle load failures and storage restrictions gracefully; keep content readable and prevent stale async results from overwriting a newer selection. A local preview should not require external font requests after its assets are present.

The [helper](../assets/font-preferences.js) implements catalog normalization, CSS-variable application, guarded storage, and availability checks for the demonstration. Adapt its lifecycle/SSR integration to the selected framework; it is not mandatory application architecture. [CSS selectors](../assets/font-presets.css) are sufficient when application state already handles preferences.

Load the preset selectors after base typography tokens, or apply scoped variables through the helper. When editing the catalog, run [the local generator](../scripts/build-font-preferences.py) against the skill directory to keep the JS/CSS synchronized; its [runtime template](../scripts/font-runtime-body.js.txt) is bundled and requires no network.

## Delivery and licenses

The [font-face file](../assets/font-faces.css) references ten open-font families: nine from integrity-checked Fontsource npm archives, plus genuine Adobe Source Han Sans SC. [The manifest](../assets/fonts/manifest.json) records versions, archive integrity, asset hashes, included weights, and each family's license file. Preserve those licenses with redistributed font assets. The demonstration includes normal styles; static mono families include 400/500/600, while variable families use their declared ranges.

Source Han Sans uses Adobe's unmodified [2.005R WOFF2](https://github.com/adobe-fonts/source-han-sans/blob/2.005R/Variable/WOFF2/TTF/SourceHanSansSC-VF.ttf.woff2), obtained from the integrity-checked `@fontpkg/source-han-sans-sc-vf@2.5.3` npm archive and verified byte-for-byte against the official Git blob SHA. Its embedded family is `Source Han Sans SC VF`, the `wght` axis is 250–900, and its [official OFL license](../assets/fonts/source-han-sans-sc/LICENSE.txt) is bundled. The complete upstream WOFF2 is about 14.1 MB and loads only when needed; do not preload it for every design option. No conversion, renaming of the font binary, or demonstration-only character subset is used.

Segoe UI, Microsoft YaHei, DengXian, and Consolas are not copied from the user's system or silently installed. Use local resolution or separately provided deployment assets with appropriate rights. Bundled open web fonts, including Source Han Sans, do not install anything into the OS. Do not assume that an installed desktop font can be copied into a website.

For production, ship only the selected families, styles, and needed language coverage, with usable fallbacks and suitable caching. Avoid preloading the entire font gallery; segmented CJK fonts can load only the subsets needed for displayed text. Do not fabricate a glyph coverage guarantee or remove license notices when reducing assets.

## Integration and verification

Use `--font-ui` and `--font-mono` as independent roles. Reuse React providers, Vue composables, plain CSS/JS, or the existing app preference layer. Ensure buttons, inputs, dialogs, tables, code, SVG/canvas charts, and exports use the intended role where their APIs require explicit configuration.

Validate every preset identifier, actual load/fallback reporting, independence of the two choices, persistence and reset behavior, 400/500/600 samples, long mixed-script text, numeric alignment, narrow screens, and both themes. Do not claim all system-font options render identically across operating systems. For exact deployment fidelity, verify the actual font files/weights and the supported platform matrix.
