# Adaptive UI Designer

`v0.2.0` · 面向具体项目的响应式网页设计技能，支持 HTML、React、Vue 与既有 Web 技术栈。

从产品、真实内容和用户下一步操作出发，统一规划布局、配色、字体、图标与交互，再检查实际效果。没有配色偏好时默认蓝白，已有品牌与确认方案优先。

[English](README.md) · [代理执行入口](SKILL.md) · [字体名称与风格](references/fonts.md)

## 如何使用

```text
使用 $adaptive-ui-designer，设计一个 AI 运行工作台，
包含流水线、Token 统计和用户管理，先看可调整的 HTML Demo。
```

支持三条路线：

| 路线 | 交付内容 |
| --- | --- |
| 先看 Demo | 准备项目专属推荐与有意义的备选；调整、确认后，在同一对话继续实现。 |
| 直接实现 | 根据明确需求，直接使用指定或现有技术栈完成页面。 |
| 设计交接 | 提供已检查的预览、参数与可选提示词，不生成应用。 |

可以直接说“更紧凑”“少一点后台感”“保留蓝色，换一种布局”。详细控件随时可用，无需先填写一套设计参数。

## 优化后的目录结构

```text
adaptive-ui-designer/
├── SKILL.md                         代理入口与核心工作流
├── README.md / README.zh-CN.md       面向使用者的说明
├── agents/openai.yaml               可选的宿主界面元数据
├── references/                      8 篇按需读取的专题指南
│   ├── workflow.md                  路线选择与项目实现
│   ├── art-direction.md             场景、视觉身份与构图
│   ├── visual-system.md             配色、排版、间距与组件
│   ├── responsive.md                设备、语言与明暗适配
│   ├── studio.md                    预览、反馈、确认与交接
│   ├── fonts.md                     字体名称、特性与回退
│   ├── verification.md              视觉与真实任务检查
│   ├── maintenance.md               维护验证与轻量打包
│   └── apple-design-LICENSE.txt      交互参考的许可说明
├── examples/
│   ├── design-studio.html           集成设计比较工作台
│   ├── project-directions.html      项目专属方向的合成示例
│   └── button-system.html           按钮行为与状态示例
├── assets/                          共用预览与生成器运行资源
│   ├── project-brief.js             项目背景与预设方向
│   ├── design-scenes.js             共用场景渲染器
│   ├── design-studio*.js / *.css     工作台状态、参数与样式
│   ├── font-catalog.json            字体名称与风格描述
│   ├── font-preferences.js          本机可用性与回退处理
│   ├── font-faces.css               系统字体偏好，不含字体文件
│   ├── fonts/manifest.json          仅保留字体元数据
│   └── …                            控件、场景图形与原生代码导出
├── scripts/
│   ├── package-project.py           按入口及本地依赖打包
│   ├── build-font-preferences.py    从目录生成字体辅助代码
│   └── font-runtime-body.js.txt     字体辅助代码模板
├── package.json                     维护元数据，预览无需安装依赖
└── LICENSE
```

重复规则已合并到这 8 篇参考文档。历史验证记录、截图、独立实验室和开发工具链移出运行包。日常比较使用集成工作台；遇到具体决策时，再读取对应指南。

## 本地预览

无需安装前端依赖，在技能目录运行：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

在 `http://127.0.0.1:8000/` 下打开 [设计工作台](examples/design-studio.html)、[项目方向示例](examples/project-directions.html) 或 [按钮状态示例](examples/button-system.html)。导出独立源码需要 HTTP；基础预览也可直接打开 HTML。

用于真实项目时，在项目副本中调整 `project-brief.js` 与场景内容。确认会记录所选设计，由当前代理继续实现；参数快照不会自动完成后端接入或发布。

## 字体与轻量交付

字体目录记录 **14 个字体家族、7 组界面搭配、5 组等宽选择**，包含名称、大致气质和系统回退。不附带 WOFF、WOFF2、TTF、OTF 文件，也不自动下载或安装字体。字体未安装时，使用声明的系统后备并如实显示状态。

交付按项目入口收集实际依赖，避免复制整套技能：

```sh
python scripts/package-project.py /path/to/project /path/to/project.zip --entry index.html
```

多个入口可重复传入 `--entry`，额外文件用 `--include`。脚本会检查必需资源缺失与路径越界，排除开发/历史目录，默认拒绝字体二进制。框架项目使用正常构建产物；截图按交付需要单独提供。

依赖发现覆盖 HTML 属性、内联与外部 CSS，以及字面量 JavaScript 导入、`fetch`、`new URL(..., import.meta.url)` 和资源属性赋值。计算路径、运行时加载内容等动态依赖需显式传入 `--include`。交付前检查并测试解压后的页面。

## 验证与维护

检查实际渲染、主要任务、浮层、焦点返回、语言/主题切换和响应式转折，并说明已验证范围与限制。详见 [验证指南](references/verification.md)。

运行包不包含测试工具链。单元/DOM 与生成构建测试仅在具备 `tests/` 和开发依赖的完整维护副本中运行，详见 [维护说明](references/maintenance.md)。运行包检查、历史证据和新项目验收分别记录。
