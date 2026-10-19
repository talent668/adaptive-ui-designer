# Atmospheric Image Cards / 轻盈氛围 · 影像卡片

A visual direction distilled from a user-provided mobile reference: a light warm/cool atmosphere, scenic imagery integrated with the page, rounded image cards, clear type, and small frosted controls. Reuse the visual grammar, not the reference's business domain, copy, names, avatars, numbers, device status bar, or platform chrome. The screenshot is not bundled or required by this skill.

## Recommend from evidence

Strong candidates are experiences where images help users recognize, explore, or choose: lifestyle collections, destinations, events, product catalogs, portfolios, and other image-led consumer interfaces. Confirm the task actually benefits from imagery and that suitable assets are available; a domain label alone is insufficient.

Use a more neutral/table-oriented scheme for prolonged numeric comparison, operational queues, long documents, or complex forms. The atmospheric direction may still appear in a discovery section while the work area remains opaque and precise. If imagery is missing, show an honestly labeled provisional composition or use an image-independent option; do not claim colored placeholders prove the photo treatment.

## Visual grammar

| Element | Intended treatment | Restraint |
|---|---|---|
| Page atmosphere | Mostly neutral canvas with a subtle warm-white to pale-blue shift or localized soft light | Support the content; no large colorful blobs or constant animated background |
| Scenic illustration | One relevant scene/object with soft edges that relates to the page background | Keep behind text, avoid clipping key content, and do not imitate a travel object in an unrelated project |
| Type | Dark, confident headline; quieter section and metadata levels | Avoid multiple equally bold oversized headings competing in one viewport |
| Primary action | Clearly bounded accent fill, optionally a subtle internal gradient | Keep text crisp; reduce external glow so the control remains a defined target |
| Secondary action | Quiet solid/tinted surface or light border | Distinguish from the main action without turning it into another focal point |
| Image card | Full-bleed photo, controlled rounded clipping, integrated identity and metadata | Preserve useful image subjects and consistent rhythm; do not make every card a different height accidentally |
| Local glass | Small corner actions, status chips, navigation, or a restrained bottom material | Do not blur the whole image, lower text opacity, or layer transparent panels inside each other |
| Warm accent | Optional restrained editorial detail or highlight | Keep action and status meanings explicit; gold must remain readable and must not compete with every blue control |

Blue-white, neutral, accent, and semantic roles still apply. Photography can introduce many colors without turning them into UI tokens. Keep component styling consistent across photographs instead of automatically sampling every image into a new action color.

## Build an image card as layers

Use this conceptual order in React, Vue, HTML, or the project's own component system:

1. A stable media box with a deliberate aspect ratio or responsive height.
2. An image with an intentional focal position and appropriate crop.
3. A contrast scrim or opaque backing behind the text region.
4. Optional local backdrop material where it adds useful separation.
5. Crisp foreground text and independently operable controls.

Keep the media, scrim, and text in separate layers. Blur softens texture; it does not guarantee text contrast. Use a sufficiently dark/light controlled scrim or opaque surface for the actual foreground. Test the brightest and busiest realistic images. The lower text region can become more opaque while the upper photograph stays clear.

Do not let image corners clip keyboard focus. A card-wide link and menu button need valid independent interaction rather than nested buttons/links. Decorative imagery has empty alt text; meaningful imagery has a concise alternative without repeating nearby text unnecessarily. Reserve image dimensions and provide a readable missing-image state; a failed image should not leave light text on an unintended light background.

## Devices, modes, and languages

- **Mobile:** prioritize a deliberate single-column sequence, reachable controls, and a visible continuation of content. Keep important image subjects within the chosen crop. Action labels and card text may wrap; avoid forcing long English titles into a Chinese-sized box.
- **Desktop:** use a bounded grid, editorial composition, or detail/collection split based on the task. Do not simply enlarge the mobile card until the photograph dominates all useful information.
- **Dark:** remap the page to near-neutral dark surfaces and adjust overlays, frost, borders, and foregrounds independently. Preserve intentional photographs; do not apply a blanket inversion or dim every image indiscriminately.
- **Reduced effects:** keep hierarchy and complete controls when frost or motion is disabled. Prefer a readable solid badge and stable scrim over transparency that cannot maintain contrast.

For technical locale/theme behavior, use [adaptive experience](adaptive-experience.md). For glass intensity and fallback, use [glass materials](glass-materials.md). For type and color roles, use the [visual system](visual-system.md).

## Present it as a choice

When this direction is a credible option, include it in the project's visual recommendations rather than merely listing its name. Show a representative page slice: a short header/action group and one or two actual image cards. Use the same content and image set when comparing layouts so better imagery does not unfairly determine the user's preference.

Offer at least one quieter option when useful, such as a neutral canvas with a photo above an opaque text area. For material-only comparisons, keep composition and type fixed and compare opaque, light frost, and controlled glass. Include the relevant phone/desktop and light/dark views rather than presenting a single idealized crop as proof of the whole design.

State why the project fits, where imagery and frost would appear, and the main tradeoff: stronger atmosphere and recognition versus image dependence, vertical space, and contrast maintenance. Let the user choose the composition and effect level. Do not automatically apply this direction to future projects just because it was added to the skill.

## Review details

Inspect image crops, text/scrim contrast, loading and missing assets, localized long text, primary/secondary action hierarchy, consistent radius and material treatment, focus, touch targets, and reduced effects. Keep shadows and glows restrained. A static reference establishes appearance only; it does not establish hover, gesture, responsiveness, or accessibility behavior.
