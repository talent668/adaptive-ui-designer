# Adaptive UI Designer

一个独立的 Codex UI 设计技能：先分析项目与技术栈，在统一预览台展示推荐和备选方案，让用户调整并确认，再生成对应的 Vue、React 或 HTML 页面。

## 默认流程

1. 分析项目需求、代码结构、现有技术栈与品牌约束。
2. 展示适合项目的推荐方案和备选方案。
3. 调整配色、界面/等宽字体、玻璃质感、圆角、阴影和信息密度。
4. 选择 Vue、React 或 HTML，点击“确认方案并生成”。
5. 查看源码、下载项目 ZIP，并根据实际项目继续集成与验证。

已有技术栈和已确认的选择会保留；局部修改不重新走完整选型流程。

## 包含的能力

- 三类颜色角色：中性结构、强调动作、语义状态。
- 蓝白、柔和卡片、磨砂玻璃、石墨等方向；材质与配色独立调整。
- 7 组界面字体搭配、5 种等宽字体；IBM Plex Sans 和 Geist 可直接搭配随包的真实思源黑体。
- 实色、轻磨砂、通透玻璃，支持应用范围选择与实色降级。
- 中英文、日间/夜间/系统模式、桌面/平板/手机布局预览。
- Vue SFC、React JSX 或独立 HTML/CSS/JS 源码生成，包含所选字体、许可证和运行说明。
- 当前搭配的快照、源码查看及 ZIP 下载；修改方案后提示重新生成。

预览台的项目分类和关键词规则用于辅助推荐，不会自动读取任意仓库。技能使用时由代理先分析实际项目并调整预览内容。页面生成器生成当前预览对应的页面与示例内容，业务数据和接口需在项目中接入。

## 安装与使用

只需要安装这个技能。仓库已经包含预览台、生成器和字体，无需另外安装一个预览技能。

下载仓库的 `dev` 分支，将仓库内容放入：

```text
~/.codex/skills/adaptive-ui-designer/
```

确保 `SKILL.md` 直接位于该目录下。Windows 对应 `%USERPROFILE%\.codex\skills\adaptive-ui-designer\`。

在 Codex 中使用：

```text
使用 $adaptive-ui-designer 分析我的项目和技术栈，展示几套适合的方案，
让我调整并选择，确定后再生成对应页面。
```

## 单独运行预览台

技能本身不需要常驻服务。交互预览及源码 ZIP 打包需要临时本地 HTTP 服务，以读取随包字体和样式资源。

在仓库根目录运行：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

打开 [本地设计预览台](http://127.0.0.1:8000/examples/design-studio.html)。使用结束后可用 `Ctrl+C` 停止服务。

生成操作在本机浏览器完成，不调用远程 AI 服务，不发布网站，也不会修改其他仓库。直接以 `file:` 打开预览台时，源码生成会提示改用本地 HTTP 服务。

## 运行生成的页面

| 技术栈 | 入口 | 运行方式 |
|---|---|---|
| HTML | `index.html` | 可直接打开，或通过本地 HTTP 服务预览 |
| Vue | `src/App.vue` | Node.js 22.12+，先 `npm install`，再 `npm run dev` |
| React | `src/App.jsx` | Node.js 22.12+，先 `npm install`，再 `npm run dev` |

Vue/React 的生产构建使用 `npm run build`。首次安装依赖需要访问 npm；字体文件已在生成包内。已有项目应保留自己的框架版本、路由与组件约定，再集成生成的页面。

## 目录

| 路径 | 内容 |
|---|---|
| [SKILL.md](SKILL.md) | 技能入口与默认工作流程 |
| [examples/design-studio.html](examples/design-studio.html) | 统一设计预览台 |
| [assets/design-page-generator.js](assets/design-page-generator.js) | Vue / React / HTML 源码生成器 |
| [assets/fonts/manifest.json](assets/fonts/manifest.json) | 字体版本、来源、哈希与许可证记录 |
| [references/](references/) | 配色、字体、材质、响应式与实现指导 |
| [scripts/](scripts/) | 字体配置生成等维护工具 |

## 许可证

项目代码与说明遵循仓库的 [MIT License](LICENSE)。随包字体分别遵循各自的 SIL Open Font License，详见 [字体清单](assets/fonts/manifest.json) 和各字体目录内的 `LICENSE.txt`；它们不会因为仓库采用 MIT 而改变许可。Apple 风格交互参考保留了 [原始 MIT 许可](references/apple-design-LICENSE.txt)。

微软雅黑、Segoe UI、等线和 Consolas 等本机字体未打包；可用性取决于运行设备，预览会显示实际解析情况及回退状态。
