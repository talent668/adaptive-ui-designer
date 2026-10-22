# Adaptive UI Designer

[English](README.md) | **简体中文**

| 字段 | 内容 |
|---|---|
| 名称 | `adaptive-ui-designer` |
| 描述 | 适用于兼容编码代理的桌面优先 Web UI 设计与改版技能。 |
| 版本 | `v0.1.0` |

一个独立、默认面向桌面 Web 的 UI 设计技能，适用于 **Codex、Claude Code、Kilo Code、OpenCode 及其他兼容的 AI 编程代理**。先分析项目与技术栈，提供项目化 HTML Demo、直接生成或只导出提示词三种路线，再按选择交付 Vue、React、HTML 页面或集成到已有项目。

本项目采用开放的 [Agent Skills 格式](https://agentskills.io/specification)。核心流程和浏览器资源不依赖特定模型提供商或桌面应用。`agents/openai.yaml` 仅是可选的 Codex 界面元数据，通用技能正文位于 `SKILL.md`。

## 先看完整效果

默认直接展示**结合项目准备好的完整推荐方案**、最多两套有意义的备选和实际预览。项目设置与详细参数默认收起，点击**自定义细节**仍可使用所有原有控件；不显示用户能力等级标签，也不要求先选字体、圆角或参数才能看到设计。

直接对代理说“太像后台”“更有杂志感，但保留蓝色”或“文字太挤”，由代理理解意图、保留约束并调整整套设计。页面也可记录原话交给当前代理；**静态页面不会自行调用模型或即时完成改版**。已准备项目只展示其明确配置的候选，高级手动自定义仍可用。待处理反馈有独立的自动草稿，先恢复较新的手动选择，再核对回应。匹配的调整结果保留项目身份，旧状态或无效参数不会覆盖当前选择；缺少有效草稿时不会自动应用回应。提示词导出仍是交接时的可选项。

初稿必须先确定内容重点、属于项目的视觉想法，以及配套的字体/颜色/布局。[建筑、学习和协作示例](examples/project-directions.html)展示不同的合成项目与领域插画；它们是起点，不代表保证所有项目都好看。见[初稿与自然语言调整流程](references/first-draft-and-feedback.md)。

## 先确定视觉方向，再组合组件

**默认采用蓝白主题，除非用户明确要求其他配色。** 明确的用户/品牌要求和已经确认的方案优先；更新默认规则不会把已有选定项目重新染成蓝白。布局、字体、密度、卡片和材质仍结合项目设计，备选可保持蓝白，通过导航、编排与阅读顺序体现差异，不把默认配色等同于固定后台模板。高级参数继续默认收起。

[默认配色验证记录](validation/2026-10-23-blue-white-default.md)包含 74 项通过的本地测试，以及切换编排时保留手选配色的选择器回归验证。

选择器支持完整配色关系：品牌锚点、搭配色、画布及文字对比，并可选择局部点色、品牌锚点或双色区域。蓝白为默认；深松×麦芽绿、梅紫×杏桃、赤陶×米杏、墨灰×冰蓝、酒红×浅薄荷按明确需求或用户选择使用。通用推荐不会仅因学习项目就切成绿色，或因开发工具就切成石墨色。项目可提供自己的代表性布局，确认快照、可选提示词与生成源码保留视觉意图及最新手动调整。

新增[鲜明且高密度的工具案例](examples/project-directions.html?sample=operations-bold)和[同一份学习内容的另一种品牌表达](examples/project-directions.html?sample=learning-studio)。审美验收检查实际辨识度、区域配色、字体、内容比例、同排边缘和主要任务，不再把“整齐、可构建”视作设计完成。自动化不能保证所有项目都好看，仍需实际渲染与独立复核。详见[视觉策划规则](references/art-direction.md)。

## 三种模式

用户直接提出新设计需求但未指定路线时，先询问是否需要可调整的 HTML Demo。明确表示不需要 Demo 时，在用户所请求的交付范围内跳过 Demo：需要源码时实现，只要提示词时只交付提示词。已确认方案或局部修复不会反复进入选样问答。

| 模式 | 流程 |
|---|---|
| **先选后设计，默认推荐** | 分析项目 → HTML Demo → 调整并确认 → 在当前对话直接结合项目源码实现 |
| **直接生成** | 检查项目 → 选择合适方向 → 实现与复核，跳过 Demo 门槛 |
| **只导出设计方案** | 结合项目调整 Demo → 导出已确认提示词和配置，不生成应用源码 |

已有网站在改版前进行有证据的评估。Demo 路线比较真实编排差异，而非只换颜色；提供默认推荐和有意义的备选。确认后的选择用于 Vue、React、HTML 或现有技术栈。验证所选交付物，条件允许时独立复核，修复可复现问题并说明边界。详见[模式与交接规则](references/design-modes.md)。

提示词导出是**换 CLI 或交接时的可选项**。选择器导出**完整设计实现提示词**：项目、受众、任务与约束、编排和阅读顺序、全部样式选择、准确的日夜令牌、字体与许可证引用、图标/按钮/状态规则及验收要求。支持复制、下载 Markdown 和已确认 JSON；修改搭配会标记旧文件过期，提示词语言与网站语言独立。源码 ZIP 同时包含对应 `DESIGN-PROMPT.md`，不会自动唤醒其他代理或发布网站。

## 包含的能力

- **三类颜色角色**：中性结构、强调动作与选择、语义状态。
- **不同的真实编排**：侧栏任务工作台、内容与上下文分栏、品牌导语编排、记录优先清单。四种结构、六组强调色以及独立的中性/暖纸/带色/深墨基调，需按项目适配，不宣称覆盖所有可能的设计。
- **细节调整**：编排、界面/等宽字体、字号层级、标题字重、正文行高/行宽、间距、卡片结构、色彩表达、语义图标处理/尺寸、按钮角色、玻璃、圆角、阴影和桌面宽度策略；提供调整前对比/还原与组件状态对照。
- **真实字体**：7 组界面字体搭配、5 种等宽字体；IBM Plex Sans 和 Geist 可搭配随包的真实思源黑体。
- **四种材质**：实色、轻磨砂、渐变磨砂、通透玻璃，支持使用位置选择与实色降级。
- **按场景使用玻璃**：工作台与阅读内容保持稳定底色，可在导航、短工具条使用局部磨砂；柔色与高光用于表达层次，不覆盖所有卡片。
- **有含义的图标与完整控件**：统一语义、尺寸、笔触及圆润程度，检查圆角下拉展开后的菜单、键盘选择与焦点行为。
- **按场景设计按钮**：根据任务与位置选择大小、实心/浅底/描边/文字样式，以及圆润矩形、胶囊或图标控件形态；在项目预览中比较，并复核完整状态与视觉主次。
- **2K / 4K 桌面适配**：提供 1920/2048/2560/3840 CSS px 的真实宽度预览，以及按项目推荐、聚焦、宽幅和流式内容策略；所选策略同步到 Vue/React/HTML。区分物理分辨率、DPR 与缩放，见[大屏规则](references/large-desktop.md)和[验证范围](validation/2026-10-21.md)。
- **默认全尺寸自适应**：所有 Web 都要适应手机、平板、桌面与宽屏窗口；桌面优先只决定起始编排。尺寸预览默认可用，隐藏预览选项不会取消交付页面的自适应要求。
- **中英文与日夜模式**：支持中文/英文、日间/夜间/跟随系统，切换时保留当前选择。README 的默认语言不决定生成网站的语言。
- **源码交付**：Vue SFC、React JSX 或独立 HTML，包含所选字体、许可证、确认快照、源码查看及 ZIP 下载。
- **内容适配与任务结果**：根据可用面板和真实文案决定筛选换行，在卡片自然高度与同排对齐之间作出明确取舍；按实体恢复焦点，并验证实际保存结果。见[通用判断规则](references/content-and-task-validation.md)。
- **空间与信息量匹配**：简单指标优先使用紧凑摘要或小卡片，保留已选卡片风格；较大卡片应承载有意义的详情、趋势或操作。检查自然高度和意外的同排拉伸，避免用过多留白或虚构指标填满空盒子。
- **列表密度与整页对齐**：简单记录行保持紧凑，长内容自然增高，操作目标仍可用。同组概览面板统一边界并合理安排主体和底部操作，独立内容采用自然高度；局部调整后复查相邻区域，避免一处收紧、另一处失衡。
- **导航与内容整体协调**：侧栏、顶部栏和内容区共用协调的底色、边界、圆角与留白体系；根据项目选择贴边或独立面板导航，再检查整页、滚动、焦点和短窗口表现。
- **基于证据的验收**：实现后检查实际页面和用户任务，条件允许时由独立子 agent 复核，修复确认的问题后再次验证对应操作。

减少模板化的“AI 味”，从真实任务、内容与层级入手，去除没有用途的指标、重复卡片嵌套、随意渐变和不相关图标。网页毛玻璃是 CSS 材质表达，不宣称与原生 Apple Liquid Glass 的光学效果等同。

预览台的分类与关键词规则只辅助推荐，不会自动读取任意仓库。代理先检查真实项目，再调整预览。生成器打包当前预览页面和示例内容；业务数据与接口需要另行按项目要求接入。

## 已有网站改版

从任务路径、布局、卡片、间距、排版、配色、按钮、图标、完整控件、材质、自适应和实现证据等角度检查相关体验。指出原因及可以保留的优点，再推荐合适的修改范围：

| 推荐范围 | 适用情况 |
|---|---|
| 微调 | 结构和任务路径有效，主要改进字体、间距、操作主次或组件状态。 |
| 局部重做 | 重排薄弱区域，保留有效页面和业务行为。 |
| 整体界面重构 | 导航、层级或跨屏问题反复影响核心任务，需要重建页面关系；保留业务/API约定，技术迁移另行论证。 |

先给三到五条有建设性的建议及完整的项目化效果方案，详细参数保持可选。“有特色”来自合适的内容、结构与视觉语言，不等于增加装饰或强制推倒重做。见[完整评估与范围判断](references/redesign-audit.md)。

自适应底线包括：导航入口可达，文字可读，卡片和筛选合理换行，表格/图表局部滚动，表单与弹层受窗口约束。默认检查代表性小、中、桌面 CSS 宽度，按场景加入宽屏检查；不能靠一张图宣称所有设备都通过。见[自适应规则](references/adaptive-experience.md)及[本轮验证记录](validation/2026-10-22-responsive.md)。

评分覆盖核心任务、布局间距、字体层级、配色对比度、组件图标与状态、内容特征、材质动效及跨屏自适应可用性。每项都需要具体证据，也要说明值得保留的部分。未观察到的行为标为未验证，局部评分说明覆盖范围。

先展示问题、优先修改建议及效果方案，再进行重新实现。仅凭截图不能确认交互、性能或无障碍行为。详见 [旧站评估与改版规则](references/redesign-audit.md)。

## 实现后的独立复核

新页面或较大的 UI 改动完成后，实现者先运行相关检查，并提供实际可访问的页面。独立复核者接收用户要求、已选方案、当前源码和运行入口，查看真实渲染并操作代表性的用户流程；不预设它应该赞同实现者的判断。

复核意见区分可复现缺陷、主观设计建议和未验证项。确认的问题在范围内修复后，重新检查受影响的操作，优先由复核者定点复测。交付说明复核范围、修复内容和验证边界，不追求预设高分。

子 agent 能力取决于宿主及其权限。不可用时执行单独的自查并明确标注；局部样式小改使用相称的检查，不强制展开完整多代理评审。详见 [实现后独立复核流程](references/post-implementation-review.md)。

## 安装到不同编程代理

下载仓库的 **`dev` 分支**，将**完整仓库内容**放入一个名为 `adaptive-ui-designer` 的目录。`SKILL.md` 应直接位于该目录下，并保留 `assets/`、`examples/`、`references/`、`scripts/`。从开发目录安装时排除 `node_modules/`、`.validation/` 和 CLI 日志。只复制 `SKILL.md` 会缺少预览和字体。

根据使用的工具，选择项目级或用户级安装目录：

| 工具 | 项目级目录 | 用户级目录 |
|---|---|---|
| [Codex](https://learn.chatgpt.com/docs/build-skills) | `.agents/skills/adaptive-ui-designer/` | `~/.agents/skills/adaptive-ui-designer/` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/adaptive-ui-designer/` | `~/.claude/skills/adaptive-ui-designer/` |
| [Kilo Code CLI](https://kilo.ai/docs/customize/skills) | `.kilo/skills/adaptive-ui-designer/` | `~/.kilo/skills/adaptive-ui-designer/` |
| [OpenCode](https://opencode.ai/docs/skills) | `.opencode/skills/adaptive-ui-designer/` | `~/.config/opencode/skills/adaptive-ui-designer/` |

以上路径于 **2026-10-19** 按对应官方文档核对。`~` 表示用户主目录，Windows 也应替换为实际用户主目录。安装后开启新会话，或使用该工具提供的技能重载方式。已有能正常发现的安装目录时，直接更新该目录，避免在重叠的发现路径中重复安装。

其他支持 Agent Skills 的 CLI 使用其官方规定的技能目录；没有原生技能发现能力的代理，可将文件夹放在可访问的位置，并明确要求其读取 `SKILL.md` 及相关引用资源。这属于手动使用流程，不等于原生技能集成。

## 使用方式

通用提示词：

```text
使用 adaptive-ui-designer 技能分析这个项目及技术栈。
如果已有网站，先评分，分析不足与可保留部分，再展示桌面改版方案。
让我调整和选择后，再开始实现。
```

Codex 可通过 `$adaptive-ui-designer` 引用，Claude Code 可使用 `/adaptive-ui-designer`；Kilo Code 和 OpenCode 使用其原生技能加载机制。调用语法因工具而异，上面的自然语言提示词不依赖统一的命令格式。

如需特定设备交互、网站语言或其他约束，请在需求中说明；基本自适应已默认包含。默认英文指的是 **README 文档**；技能仍按用户语言与项目要求工作。

## 单独运行预览

技能本身不需要常驻服务，也不需要另装预览技能。运行统一预览台和源码 ZIP 生成时，在技能或仓库根目录启动临时本地 HTTP 服务：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

如果系统用 `python3` 表示 Python 3，可替换命令；也可以使用已有的静态服务。8000 端口被占用时，选择可用端口并调整访问地址。

- [统一设计预览台](http://127.0.0.1:8000/examples/design-studio.html)：方案、字体、配色、材质、设备范围及源码生成。
- [项目方案示例](http://127.0.0.1:8000/examples/project-directions.html)：建筑、学习、运营三个项目的整套推荐，详细设置默认收起。
- [内容与任务示例](http://127.0.0.1:8000/examples/content-task-lab.html)：三个合成领域、独立面板宽度、长选项、自然高度卡片和可操作的编辑/队列/批量流程。
- [按钮状态示例](http://127.0.0.1:8000/examples/button-system.html)：操作主次、尺寸、加载/禁用/选中状态及确认弹层。
- [材质与控件示例](http://127.0.0.1:8000/examples/material-controls-lab.html)：工作台、阅读、创作场景中的渐变磨砂与圆角下拉。

使用结束后按 `Ctrl+C` 停止服务。生成在浏览器中使用随包资源完成，不调用模型提供商 API，不发布网站，也不修改其他仓库。以 `file:` 打开预览台时，源码生成会提示改用 HTTP。

只有终端能力的代理可以提供预览文件、地址和运行命令，由用户在浏览器打开。自动浏览、截图能力取决于宿主工具，未完成视觉验证时应明确说明。详见 [代理兼容与能力适配](references/agent-compatibility.md)。

## 运行生成的页面

| 技术栈 | 入口 | 运行方式 |
|---|---|---|
| HTML | `index.html` | 直接打开，或通过 HTTP 服务预览 |
| Vue | `src/App.vue` | Node.js 22.12+，先 `npm install`，再 `npm run dev` |
| React | `src/App.jsx` | Node.js 22.12+，先 `npm install`，再 `npm run dev` |

Vue/React 使用 `npm run build` 进行生产构建。首次安装依赖需要访问软件包仓库，字体已包含。已有项目保留自己的框架版本、路由及组件约定。

## 兼容与验证范围

此前默认体验更新按要求采用开发 A、独立检查 B、评审 C 的流程：先判断 B 的建议是否有证据、符合需求并值得改，再实施并验收最终结果。C 直接执行源码和控制器检查；由于 C 无法访问浏览器，浏览器步骤由 A 按 C 的要求操作，C 独立审阅原始记录和画面。该流程依赖宿主支持子 agent，证据与边界见[本轮验证记录](validation/2026-10-22-guided.md)。

**v0.1.0** 现已包含三种交付模式、四种真实编排、详细样式控件和不可变的设计提示词交接。此前[同一对话集成记录](validation/2026-10-21-integration.md)保留其 44 项测试和 36 个构建检查的范围；本次默认体验与反馈检查另见[当前验证记录](validation/2026-10-22-guided.md)。此前[模式复核](validation/2026-10-21-modes.md)保留原有范围。此前的内容/任务规则与[三个领域交互示例](validation/2026-10-20.md)继续保留；示例演示本地状态变化，不是生产 API 层。

已有项目由同一对话中的代理直接读取已确认 Demo，继续修改真实路由和组件，保留业务逻辑与接口；无需用户复制提示词或下载中间模板。浏览器确认会记录设计，不能自行唤醒已结束的 CLI 会话；需要时正常继续当前对话即可。见[同一对话实现流程](references/same-conversation-implementation.md)。导出的 Vue/React/HTML 源码是独立起点，不会自动接入现有应用。只导出提示词适合设计交接或换用其他兼容 CLI；实现模式仍需交付可运行源码和验证证据。

以下为 **0.3.0 的历史 CLI 验证**：Codex、Claude Code、Kilo Code、OpenCode 均已通过原生项目技能发现；Codex 和 Kilo 已完成真实模型只读分析。**Claude 实际调用待登录，按用户选择暂缓；OpenCode 实际调用待配置凭据。** Kilo 默认模型被服务端拒绝后，使用记录在案的单次模型覆盖完成验证，未修改全局配置。详见[版本、证据与限制](validation/2026-10-19.md)。

在干净的完整副本中，使用 Node.js 22.12+：

```sh
npm ci
npm run verify
npm run cases
```

测试覆盖模式路由、提示词与源码快照一致性、结构差异、配置保留、推荐误判回归、配色对比度、真实字体哈希与许可证、ZIP 完整性及原生按钮状态。事务和内存 DOM 测试覆盖失败重试、焦点决策、重复提交防护与明确的批量范围，但不能替代真实浏览器检查。Vue/React 执行生产构建，HTML 检查静态资源完整性。`npm run verify` 包含 56 项测试和 24 个目标：3 个基线、9 个桌面宽度策略和 12 个编排导出；`npm run cases` 另检查四个有版本记录的**合成领域**的 12 个目标。这 36 个实例验证不同结构和选择，不代表真实客户部署。仓库包含 Linux/Windows × Node 22/24 工作流，是否通过以实际 CI 运行结果为准。

`npm run cli:prepare` 生成隔离的 CLI 项目副本，不登录、不调用模型、不改全局配置。技能发现、模型执行、构建和视觉复核分别记录。当前浏览器检查覆盖代表性的 Chromium 桌面页面，尚不等于完整的自动视觉回归或每个 CLI 的全流程验收。见[复现说明](references/reproducible-validation.md)。

统一预览台现已保存并导出 **32/40/48px 按钮尺寸、实色/浅填充/描边、利落/圆润/胶囊圆角**，次要和表格行操作保留独立权重。[按钮状态示例](examples/button-system.html) 展示焦点、选中、加载、禁用和可恢复的示例删除。Vue、React、HTML 共用按钮令牌；旧版保存的方案会补齐默认值。

## 目录

本次全面评估、改版范围判断和全尺寸自适应默认值见[当前验证记录](validation/2026-10-22-responsive.md)，此前验证沿用其原有范围。

本次默认入口、项目整套方案和自然语言反馈更新见[当前验证记录](validation/2026-10-22-guided.md)。此前确认后直接实现项目的更新见[集成验证记录](validation/2026-10-21-integration.md)；模式、编排和提示词的验证保留在[模式验证记录](validation/2026-10-21-modes.md)，沿用原有范围。

[大桌面独立复核](validation/2026-10-21.md#independent-review)在实测范围内未发现需要修复的 P0–P2 问题；34 项测试、24 个构建或静态资源闭包检查实例通过。CSS 视口测试不等于实体高 DPR 屏幕、系统缩放或真实浏览器缩放认证。此前内容与任务复核修复的 P2 保留在 [2026-10-20 记录](validation/2026-10-20.md#independent-review-and-correction)，更早复核见[历史记录](validation/2026-10-19.md#independent-review)。验收按证据与边界，不以目标分数驱动。

| 路径 | 内容 |
|---|---|
| [references/first-draft-and-feedback.md](references/first-draft-and-feedback.md) | 低操作负担的初稿、整套方向和对话调整 |
| [examples/project-directions.html](examples/project-directions.html) | 三个合成项目的整套视觉与布局方案 |
| [validation/2026-10-22-guided.md](validation/2026-10-22-guided.md) | 本轮测试、A/B/C 复核与验证边界 |
| [references/design-modes.md](references/design-modes.md) | 默认询问 Demo、直接/提示词路线与完整确认交接 |
| [assets/design-prompt.js](assets/design-prompt.js) | 不可变的中英文提示词与准确设计约定 |
| [validation/2026-10-21-modes.md](validation/2026-10-21-modes.md) | 模式、编排与提示词验证 |
| [references/large-desktop.md](references/large-desktop.md) | 大桌面布局、有效 CSS 宽度与高像素密度的边界 |
| [validation/2026-10-21.md](validation/2026-10-21.md) | 2K/4K 预览、导出验证与独立复核 |
| [references/content-and-task-validation.md](references/content-and-task-validation.md) | 内容适配、任务上下文与验收的通用判断规则 |
| [examples/content-task-lab.html](examples/content-task-lab.html) | 客服、库存、内容审核的合成流程示例 |
| [validation/2026-10-20.md](validation/2026-10-20.md) | v0.1.0 验证、独立复核与边界 |
| [references/reproducible-validation.md](references/reproducible-validation.md) | 可复现命令、领域案例和 CLI 测试副本 |
| [validation/2026-10-19.md](validation/2026-10-19.md) | 实际版本、结果与验证边界 |
| [assets/button-system.css](assets/button-system.css) | 共用按钮角色、尺寸与状态实现 |
| [SKILL.md](SKILL.md) | 通用工作流程与资源入口 |
| [references/agent-compatibility.md](references/agent-compatibility.md) | 宿主能力适配与降级流程 |
| [references/redesign-audit.md](references/redesign-audit.md) | 旧站评分及效果方案 |
| [references/post-implementation-review.md](references/post-implementation-review.md) | 独立复核、问题分级、修复与定点复测 |
| [references/icons-and-controls.md](references/icons-and-controls.md) | 图标语义与完整控件规范 |
| [references/button-design.md](references/button-design.md) | 按钮尺寸、主次、底色、圆角、组合与状态 |
| [references/glass-materials.md](references/glass-materials.md) | 材质选择与降级 |
| [examples/design-studio.html](examples/design-studio.html) | 统一交互预览台 |
| [examples/material-controls-lab.html](examples/material-controls-lab.html) | 渐变磨砂与圆角控件示例 |
| [assets/design-page-generator.js](assets/design-page-generator.js) | Vue / React / HTML 生成器 |
| [assets/fonts/manifest.json](assets/fonts/manifest.json) | 字体来源、哈希与许可证 |
| [agents/openai.yaml](agents/openai.yaml) | 可选 Codex 界面适配元数据 |

## 许可证

项目代码与说明采用 [MIT License](LICENSE)。随包字体保留各自的 SIL Open Font License，详见 [字体清单](assets/fonts/manifest.json) 和各字体目录内的 `LICENSE.txt`。Apple 风格交互参考保留了 [原始 MIT 许可](references/apple-design-LICENSE.txt)。

微软雅黑、Segoe UI、等线和 Consolas 等本机字体未打包，可用性取决于运行设备；预览会区分实际字体加载与回退状态。


本轮验证与独立复核边界：[视觉策划重构记录](validation/2026-10-23-art-direction.md)。
