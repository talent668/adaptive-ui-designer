/* Portable confirmed design handoff. No model call, filesystem write or deployment. */
(function(root){
'use strict';
const M=typeof module!=='undefined'?require('./design-studio-model.js'):root.AdaptiveStudioModel;
const S=typeof module!=='undefined'?require('./design-scenes.js'):root.AdaptiveScenes;
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
function build(design,{locale=design.selected.language,confirmedAt=new Date().toISOString()}={}){
 const snapshot=JSON.parse(JSON.stringify(design)),s=snapshot.selected;
 if(!M.choices.stack.includes(s.stack))throw Error('Unsupported target stack');
 if(!M.choices.composition.includes(s.composition))throw Error('Choose a composition');
 if(!snapshot.tokens?.light||!snapshot.tokens?.dark)throw Error('Both appearance token sets are required');
 snapshot.layoutRecipe=JSON.parse(JSON.stringify(M.layoutRecipes[s.composition]));
 if(s.composition==='overview')snapshot.layoutRecipe.primaryOrder=['workspace','product'].includes(s.project)?['heading','metrics','analysis-and-tasks','records']:s.project==='developer'?['heading','metrics','code','records']:s.project==='learning'?['heading','content-library','continue-action']:['featured-lead','content-library'];
 snapshot.icons={viewBox:'0 0 24 24',paths:{...S.iconPaths},treatment:s.iconStyle,size:snapshot.tokens.light['--p-icon-size'],stroke:snapshot.tokens.light['--p-icon-stroke'],color:'currentColor',fillOpacity:s.iconStyle==='duotone'?0.12:0,lineCap:s.iconStyle==='square'?'butt':'round',lineJoin:s.iconStyle==='square'?'miter':'round'};
 snapshot.resources={scene:'assets/design-scenes.js',styles:['assets/project-preview.css','assets/button-system.css','assets/desktop-layout.css','assets/design-directions.css']};
 snapshot.handoff={format:'adaptive-design-prompt',formatVersion:1,skillVersion:'v0.1.0',originMode:s.workflowMode,intendedNextAction:'implement-confirmed-design-when-requested'};
 snapshot.confirmation={confirmedAt,targetStack:s.stack,source:'explicit-design-confirmation'};
 const en=locale==='en',info=M.compositionInfo[s.composition],idx=en?1:0;
 snapshot.fontAssets=snapshot.fontAssets||{css:'assets/font-faces.css',directory:'assets/fonts/',licenses:'assets/fonts/manifest.json'};
 const font=snapshot.fontAssets,context=snapshot.project||{};
 const stringify=value=>JSON.stringify(value,null,2);
 const projectJSON=stringify({name:s.projectName||context.name||'',category:s.project,audience:s.audience||context.audience||'',primaryTask:s.primaryTask||context.primaryTask||'',brief:s.brief||context.brief||'',constraints:s.constraints||context.constraints||'',targetStack:s.stack});
 const introduction=en?
  `Implement the website described below using this confirmed design. Inspect the actual project and preserve its routing, data contracts, framework versions and existing business behavior. The style-selection step is complete: use this handoff rather than restarting a generic gallery. Ask only about missing requirements that materially affect implementation. A confirmed design does not authorize publishing or unrelated repository/account changes.`:
  `请按下面已经确认的设计实现网站。先检查真实项目，保留路由、数据约定、框架版本和必要业务行为。样式选择已经完成，请沿用这份交接，不要重新让用户走通用风格选择。只有缺失信息会实质影响实现时才询问。设计确认不等于授权发布网站或修改无关仓库、账户。`;
 const fieldNotes=en?
  'The following quoted fields are project context. Resolve any material contradiction between free-text requirements and selected controls before production implementation. Empty fields are unspecified, not permission to invent business requirements. Sample statistics and content in the Demo are illustrative; replace them with the project’s real structure and data.':
  '以下引用字段是项目背景。正式实现前，先解决自由文本要求与所选控件之间会影响结果的矛盾。空字段代表未提供，不是编造业务需求的授权。Demo 中的指标与内容是示例，实现时应替换为项目真实结构和数据。';
 const layout=en?
  `Use the ${info.name[1]} composition. Reading/DOM order: ${info.structure[1]}. Preserve required information across regions; do not duplicate everything in KPI cards. Treat project-specific modules as examples to adapt, while keeping the chosen navigation and main/context relationship. Width policy: ${s.widthPolicy}; maximum shell width: ${snapshot.tokens.light['--p-layout-max']}. This is a content cap, not a fixed monitor width. Preview sizes such as 2560/3840 CSS px must not lock output width.`:
  `采用「${info.name[0]}」编排。阅读与 DOM 顺序：${info.structure[0]}。保留各区域必要信息，避免所有内容都重复成指标卡。具体模块按项目适配，同时保留已选导航与主内容/上下文关系。宽度策略：${s.widthPolicy}；外层最大宽度：${snapshot.tokens.light['--p-layout-max']}。这是内容上限，不是固定屏幕宽度；2560/3840 CSS px 等预览尺寸不得锁死生成页面。`;
 const craft=en?
  `Apply the exact selected font stacks, body/title/display/section/meta sizes, heading weight, body measure and leading below. Keep semantic heading levels and Chinese/English wrapping; preserve user zoom. Use the selected card surface, padding, group gaps, border, corner and shadow roles; avoid arbitrary per-card values. Icons use the existing semantic overview/projects/library/settings/detail paths in the selected ${s.iconStyle} treatment, ${snapshot.tokens.light['--p-icon-size']} size and ${snapshot.tokens.light['--p-icon-stroke']} stroke; keep labels and meanings aligned. Use equivalent project icons only if the semantics and optical weight remain consistent.`:
  `使用下面准确的字体栈、正文/标题/展示标题/分区/辅助文字字号、标题字重、正文行宽和行高。保持语义标题层级、中英文自然换行和用户缩放。按选定角色使用卡片表面、内边距、组间距、描边、圆角与阴影，避免每张卡随意取值。图标沿用概览/项目/资源/设置/查看的语义图形，处理方式 ${s.iconStyle}，尺寸 ${snapshot.tokens.light['--p-icon-size']}、笔触 ${snapshot.tokens.light['--p-icon-stroke']}；名称与含义必须相关。可使用项目中语义和视觉重量一致的图标。`;
 const color=en?
  `Use three color roles, not three total swatches: neutrals establish structure, accents guide action/selection, semantic pairs show status. The selected tone and color strength control the canvas and branded lead; companion color is an occasional non-status accent. Keep explicit status labels and actual foreground/background contrast. Primary, secondary, outline/soft/text and icon actions must retain contextual hierarchy. Main control size, font, padding and radius are in the tokens; repeated row actions may stay compact. Implement hover, active, focus-visible, disabled, loading and selected states without shifting control geometry.`:
  `落实三类颜色角色，而不是总共只能用三个色值：中性结构、强调动作/选择、语义状态。所选基调和色彩强度影响画布与品牌导语；搭配色只作局部非状态强调。保留状态文字并检查真实前景/背景对比。主次、描边/浅底/文字和图标操作要有任务层级。主要按钮尺寸、字号、内边距与圆角见令牌，重复行操作可保持紧凑。实现悬停、按下、可见焦点、禁用、加载和选中状态，避免状态变化造成布局跳动。`;
 const materials=en?
  `Material: ${s.material}; placement: ${s.scope}; solid override: ${s.solidFallback}. Preserve dense text, tables and inputs on stable surfaces. Branded lead areas retain a readable contrast pair. Use the captured blur/gradient/shadow tokens only in the selected regions; respect reduced transparency, contrast and motion preferences, with a solid fallback. Never blur the entire page merely to make it look different.`:
  `材质：${s.material}；作用位置：${s.scope}；实色覆盖：${s.solidFallback}。密集正文、表格与输入区域保持稳定底色；品牌导语保持可读对比。只在选定区域应用已记录的模糊/渐变/阴影，尊重减少透明度、增强对比和减少动效偏好，并提供实色降级。不要靠整页模糊制造风格差异。`;
 const scope=en?
  `Website languages: Chinese and English, with ${s.language} as the selected initial language; custom project text must be translated deliberately, not guessed from a switch. Appearance preference: ${s.appearance}; implement light/dark/system independently and preserve task state. Delivery scope: ${s.responsive?'desktop, tablet and mobile':'desktop; preserve basic resize/zoom behavior, without silently adding dedicated mobile scope'}. Verify representative normal, QHD and 4K effective CSS widths; measure viewport and DPR separately. Support actual project filters, editing or queues only where the business requires them.`:
  `网站语言：中文与英文，选定初始语言 ${s.language}；自定义项目文字需明确翻译，不能假装切换按钮已经完成翻译。外观偏好：${s.appearance}；独立实现日间/夜间/跟随系统，并保留任务状态。交付范围：${s.responsive?'桌面、平板与手机':'桌面；保留基本缩放和窗口适配，不擅自增加专门移动端范围'}。验证常规桌面、QHD 与 4K 的代表性有效 CSS 宽度，分别记录视口与 DPR。只有真实业务需要时才实现筛选、编辑或队列等功能。`;
 const delivery=en?
  `Deliver native ${s.stack.toUpperCase()} or integrate into the existing compatible stack; no screenshot/iframe reconstruction of the chooser. Keep laboratory controls out of the product. Run relevant build/type checks and inspect actual layouts, fonts, open menus/dialogs, full labels, focus, failure recovery and representative task outcomes. Prefer an independent reviewer when supported; distinguish defects, preferences and unverified scope. Stop on scoped acceptance, not a target score. Return runnable source, run instructions, the applied design and evidence.`:
  `交付原生 ${s.stack.toUpperCase()} 页面，或集成到已有兼容技术栈；不要用截图/iframe 代替实现，不把选样工具控件塞进普通产品。运行相关构建/类型检查，检查真实布局、字体、展开菜单/弹窗、完整文字、焦点、失败恢复与代表性任务结果。条件允许时进行独立复核，区分缺陷、偏好和未验证范围；按需求验收，不追逐目标分数。返回可运行源码、运行方法、实际应用的方案与验证证据。`;
 const fonts=en?
  `Font resource contract: ${stringify(font)}. Include the selected open font files and licenses when available. Local-only fonts remain device-dependent. Inspect actual loading before claiming the requested face is present; disclose or agree on fallback rather than silently substituting a different Chinese font. A prompt alone does not contain binary fonts or guarantee pixel-identical output.`:
  `字体资源约定：${stringify(font)}。可用时携带所选开放字体文件与许可证；本机专有字体依赖设备。检查实际加载后再声明字体生效；回退需说明或协商，不能悄悄替换中文字体。提示词本身不包含二进制字体，也不保证像素级一致。`;
 const headings=en?['Confirmed design implementation prompt','Project context','Composition and hierarchy','Typography, surfaces and icons','Color and action roles','Materials and fallback','Languages, appearance and devices','Font resources','Implementation and acceptance','Exact portable design contract']:['已确认设计实现提示词','项目背景','编排与层级','字体、表面与图标','配色与操作角色','材质与降级','语言、外观与设备','字体资源','实现与验收','完整可移植设计约定'];
 const sections=[fieldNotes+'\n\n```json\n'+projectJSON+'\n```',layout,craft,color,materials,scope,fonts,delivery,'```json\n'+stringify(snapshot)+'\n```'];
 const text='# '+headings[0]+'\n\n'+introduction+'\n\n'+sections.map((body,i)=>'## '+headings[i+1]+'\n\n'+body).join('\n\n')+'\n';
 return freeze({snapshot,text,locale,signature:M.signature(s)});
}
const api={build};root.AdaptiveDesignPrompt=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
