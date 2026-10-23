# Font names and style guide

The skill records preferences and descriptions; it ships **no font binaries** and performs no automatic font downloads. These are approximate design characteristics, not a guarantee that the family is installed or will render every glyph.

| Family | General character and useful role |
| --- | --- |
| Inter | 中性、清晰，数字与控件协调；适合通用产品和工作台。Neutral sans, useful for product UI and metrics. |
| Segoe UI | Windows 系统界面气质，较柔和；适合桌面业务工具。Familiar Windows UI sans. |
| Microsoft YaHei / 微软雅黑 | 中文无衬线，字面饱满、屏幕阅读熟悉；适合中文控件和正文。Familiar, full-bodied Chinese screen sans. |
| DengXian / 等线 | 中文线条相对轻巧、舒展；适合较克制的系统界面。Lighter-feeling Chinese UI sans. |
| Noto Sans SC | 中文无衬线，气质中性、字重选择丰富；适合需要一致中文风格的界面。Neutral Chinese sans; availability is device-dependent here. |
| Source Han Sans SC / 思源黑体 | 中文黑体，结构规整，层级和字重体系完整；适合产品、内容和企业界面。Structured Chinese sans, useful for UI and reading. |
| IBM Plex Sans | 带一点技术与编辑气质，字形辨识度较强；适合工具与内容并重的产品。Technical/editorial sans with distinct shapes. |
| Geist | 简洁、紧凑、现代；适合开发者产品和简约工具。Compact modern product sans. |
| Plus Jakarta Sans | 几何感较明显，圆润、略有品牌感；适合友好的消费与品牌界面。Geometric, friendly sans. |
| IBM Plex Mono | 技术、终端和编辑感较强；用于代码与标识。Technical monospace. |
| Cascadia Mono | 字形较开放，代码阅读气质明显；用于终端与代码。Open-feeling coding monospace. |
| JetBrains Mono | 强调代码字符辨识和阅读节奏；用于代码、路径、技术值。Code-oriented monospace. |
| Geist Mono | 简洁、紧凑；与现代工具界面协调。Compact product monospace. |
| Consolas | Windows 常见代码字体，熟悉、稳定；用于代码和日志。Familiar Windows coding monospace. |
| Georgia | 衬线、对比鲜明，斜体有编辑气质；适合标题或短引文。Editorial serif; use for display or quotations. |

The [catalog](../assets/font-catalog.json) retains seven UI pairings and five independent monospace choices. Each family has local names, a short style description and fallback stacks. Preserve a user's choice across theme/locale changes even if unavailable.

Use installed faces when available. UI fallback should include platform UI and Chinese families; monospace fallback should include `ui-monospace`/`monospace`. Do not rename a different Chinese font as Source Han or imply that choosing a name installed it.

The helper probes only selected named local faces through `FontFace(local(...))`; it does not enumerate the machine. Failure means the current browser could not resolve that face. Report local availability or fallback. Do not use `document.fonts.check()` alone as proof of installation.

An explicit request for exact cross-device typography can justify licensed project assets or approved font hosting. That is a project choice, not the skill default. Record license and real glyph coverage when such assets are supplied. Keep UI and mono roles independent in forms, charts, dialogs and exports.
