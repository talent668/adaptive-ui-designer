# Adaptive UI Designer

[English](README.md) | **简体中文**

一个独立、默认面向桌面 Web 的 UI 设计技能，适用于 **Codex、Claude Code、Kilo Code、OpenCode 及其他兼容的 AI 编程代理**。先分析项目与技术栈；已有网站先评分、诊断并展示可调整的改版方案；用户选择后，再生成 Vue、React、HTML 页面或集成到已有项目。

本项目采用开放的 [Agent Skills 格式](https://agentskills.io/specification)。核心流程和浏览器资源不依赖特定模型提供商或桌面应用。`agents/openai.yaml` 仅是可选的 Codex 界面元数据，通用技能正文位于 `SKILL.md`。

## 默认流程

1. 分析使用者、核心任务、内容、代码结构、现有技术栈与明确的品牌约束。
2. 对已有网站按实际证据多维评分，说明问题、原因和可保留部分；新项目不虚构旧站评分。
3. 推荐适合项目的设计方向，展示效果图或交互预览。改版优先使用相同桌面尺寸的前后对照。
4. 让用户调整布局、配色、界面/等宽字体、材质、圆角、阴影和密度，再选择方案。
5. 按确认后的搭配生成 Vue、React、HTML/CSS/JS 页面，或按已有项目约定集成。
6. 验证实际渲染与关键操作；改版使用相同范围及维度检查改进。

保留必要业务能力、数据接口和技术栈，同时允许重新设计不合适的原样式。局部修复按实际范围处理，已确认的选择不反复要求确认；用户明确委托选择时，按委托推进。

## 包含的能力

- **三类颜色角色**：中性结构、强调动作与选择、语义状态。
- **符合项目的方向**：蓝白、柔和卡片、石墨，以及按真实任务设计的信息布局。
- **真实字体**：7 组界面字体搭配、5 种等宽字体；IBM Plex Sans 和 Geist 可搭配随包的真实思源黑体。
- **四种材质**：实色、轻磨砂、渐变磨砂、通透玻璃，支持使用位置选择与实色降级。
- **按场景使用玻璃**：工作台与阅读内容保持稳定底色，可在导航、短工具条使用局部磨砂；柔色与高光用于表达层次，不覆盖所有卡片。
- **有含义的图标与完整控件**：统一语义、尺寸、笔触及圆润程度，检查圆角下拉展开后的菜单、键盘选择与焦点行为。
- **默认桌面**：平板和移动端按需设计，保留基本缩放及已有响应式行为。
- **中英文与日夜模式**：支持中文/英文、日间/夜间/跟随系统，切换时保留当前选择。README 的默认语言不决定生成网站的语言。
- **源码交付**：Vue SFC、React JSX 或独立 HTML，包含所选字体、许可证、确认快照、源码查看及 ZIP 下载。

减少模板化的“AI 味”，从真实任务、内容与层级入手，去除没有用途的指标、重复卡片嵌套、随意渐变和不相关图标。网页毛玻璃是 CSS 材质表达，不宣称与原生 Apple Liquid Glass 的光学效果等同。

预览台的分类与关键词规则只辅助推荐，不会自动读取任意仓库。代理先检查真实项目，再调整预览。生成器打包当前预览页面和示例内容；业务数据与接口需要另行按项目要求接入。

## 已有网站评估

评分覆盖核心任务、布局间距、字体层级、配色对比度、组件图标与状态、内容特征、材质动效及桌面可用性。每项都需要具体证据，也要说明值得保留的部分。未观察到的行为标为未验证，局部评分说明覆盖范围。

先展示问题、优先修改建议及效果方案，再进行重新实现。仅凭截图不能确认交互、性能或无障碍行为。详见 [旧站评估与改版规则](references/redesign-audit.md)。

## 安装到不同编程代理

下载仓库的 **`dev` 分支**，将**完整仓库内容**放入一个名为 `adaptive-ui-designer` 的目录。`SKILL.md` 应直接位于该目录下，并保留 `assets/`、`examples/`、`references/`、`scripts/`。只复制 `SKILL.md` 会缺少预览和字体。

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

如需平板、移动端、特定网站语言或其他约束，请在需求中说明。默认英文指的是 **README 文档**；技能仍按用户语言与项目要求工作。

## 单独运行预览

技能本身不需要常驻服务，也不需要另装预览技能。运行统一预览台和源码 ZIP 生成时，在技能或仓库根目录启动临时本地 HTTP 服务：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

如果系统用 `python3` 表示 Python 3，可替换命令；也可以使用已有的静态服务。8000 端口被占用时，选择可用端口并调整访问地址。

- [统一设计预览台](http://127.0.0.1:8000/examples/design-studio.html)：方案、字体、配色、材质、设备范围及源码生成。
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

技能格式和安装路径面向上表工具。统一预览和生成结果已在当前 Codex 环境中使用过，包括 Vue/React 构建及 HTML 的语言、主题、下拉操作。**尚未在 Claude Code、Kilo Code、OpenCode 的原生 CLI 中逐一独立运行测试。** 格式兼容不表示所有模型输出、工具能力或权限完全相同。

## 目录

| 路径 | 内容 |
|---|---|
| [SKILL.md](SKILL.md) | 通用工作流程与资源入口 |
| [references/agent-compatibility.md](references/agent-compatibility.md) | 宿主能力适配与降级流程 |
| [references/redesign-audit.md](references/redesign-audit.md) | 旧站评分及效果方案 |
| [references/icons-and-controls.md](references/icons-and-controls.md) | 图标语义与完整控件规范 |
| [references/glass-materials.md](references/glass-materials.md) | 材质选择与降级 |
| [examples/design-studio.html](examples/design-studio.html) | 统一交互预览台 |
| [examples/material-controls-lab.html](examples/material-controls-lab.html) | 渐变磨砂与圆角控件示例 |
| [assets/design-page-generator.js](assets/design-page-generator.js) | Vue / React / HTML 生成器 |
| [assets/fonts/manifest.json](assets/fonts/manifest.json) | 字体来源、哈希与许可证 |
| [agents/openai.yaml](agents/openai.yaml) | 可选 Codex 界面适配元数据 |

## 许可证

项目代码与说明采用 [MIT License](LICENSE)。随包字体保留各自的 SIL Open Font License，详见 [字体清单](assets/fonts/manifest.json) 和各字体目录内的 `LICENSE.txt`。Apple 风格交互参考保留了 [原始 MIT 许可](references/apple-design-LICENSE.txt)。

微软雅黑、Segoe UI、等线和 Consolas 等本机字体未打包，可用性取决于运行设备；预览会区分实际字体加载与回退状态。
