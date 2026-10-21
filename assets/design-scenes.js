/* Shared project scenes for the studio and repeatable case validation. Sample content only. */
(function(root){
const messages={
  "zh-CN": {
    "workspace": "工作台",
    "overview": "概览",
    "projects": "项目",
    "resources": "资源库",
    "settings": "设置",
    "today": "周一，10 月 19 日",
    "detail": "查看详情",
    "build": "构建成功",
    "completed": "已完成",
    "change": "+12% 较上周",
    "request": "请求耗时",
    "review": "待评审",
    "stable": "本周保持稳定",
    "reviewNote": "需要你的关注",
    "usage": "资源占用",
    "members": "协作成员",
    "chartHeading": "每周交付",
    "chartUnit": "任务数",
    "chartNote": "周一至周日，共完成 112 项任务。",
    "tasksHeading": "接下来，专注这些",
    "task1": "更新视觉规范",
    "task2": "评审交互原型",
    "task3": "整理交付资源",
    "time1": "今天 · 14:00",
    "time2": "明天 · 10:30",
    "time3": "周三 · 16:00",
    "deployment": "部署记录",
    "recent": "最近项目",
    "name": "项目",
    "identifier": "编号",
    "status": "状态",
    "budget": "预算",
    "item1": "品牌网站改版",
    "item2": "移动端体验升级",
    "item3": "组件规范整理",
    "pending": "待确认",
    "ready": "进行中",
    "illustration": "示意图形",
    "collection": "精选系列",
    "available": "可查看",
    "chapter": "个章节",
    "continueTitle": "下一步，从最重要的事情开始",
    "continueCopy": "保留清晰的主行动，让复杂信息更容易理解。",
    "continue": "继续探索",
    "sampleCode": "构建状态",
    "healthy": "运行正常",
    "buildNote": "示例日志 · 仅演示排版",
    "latest": "最新发布",
    "week": "最近 7 天",
    "demo": "示例",
    "readMore": "查看内容",
    "follow": "关注",
    "action": "操作"
  },
  "en": {
    "workspace": "Workspace",
    "overview": "Overview",
    "projects": "Projects",
    "resources": "Library",
    "settings": "Settings",
    "today": "Monday, October 19",
    "detail": "View details",
    "build": "Build passed",
    "completed": "Completed",
    "change": "+12% from last week",
    "request": "Request duration",
    "review": "In review",
    "stable": "Steady this week",
    "reviewNote": "Needs your attention",
    "usage": "Resource usage",
    "members": "Team members",
    "chartHeading": "Weekly delivery",
    "chartUnit": "Tasks",
    "chartNote": "112 tasks completed from Monday through Sunday.",
    "tasksHeading": "Focus on what is next",
    "task1": "Update visual guidelines",
    "task2": "Review interaction prototype",
    "task3": "Prepare delivery assets",
    "time1": "Today · 14:00",
    "time2": "Tomorrow · 10:30",
    "time3": "Wednesday · 16:00",
    "deployment": "Deployment history",
    "recent": "Recent projects",
    "name": "Project",
    "identifier": "ID",
    "status": "Status",
    "budget": "Budget",
    "item1": "Brand website refresh",
    "item2": "Mobile experience update",
    "item3": "Component documentation",
    "pending": "Pending",
    "ready": "In progress",
    "illustration": "Illustrative artwork",
    "collection": "Selected collection",
    "available": "Available",
    "chapter": "chapters",
    "continueTitle": "Start with what matters most",
    "continueCopy": "Keep the primary action clear and make complex information easier to understand.",
    "continue": "Keep exploring",
    "sampleCode": "Build status",
    "healthy": "All systems operational",
    "buildNote": "Sample log · Typography demonstration",
    "latest": "Latest release",
    "week": "Last 7 days",
    "demo": "Demo",
    "readMore": "View content",
    "follow": "Follow",
    "action": "Action"
  }
},scenarios={
  "workspace": {
    "name": [
      "协作空间",
      "Collab space"
    ],
    "title": [
      "让团队，专注重要的事。",
      "Focus on what matters."
    ],
    "subtitle": [
      "项目、协作与进度，一目了然。",
      "Projects, people and progress in one place."
    ]
  },
  "product": {
    "name": [
      "Flow 产品空间",
      "Flow workspace"
    ],
    "title": [
      "从想法，到下一次发布。",
      "From an idea to your next release."
    ],
    "subtitle": [
      "每一个细节，都推动产品向前。",
      "Every detail moves your product forward."
    ]
  },
  "learning": {
    "name": [
      "知序学习",
      "Forma learning"
    ],
    "title": [
      "好奇心，是最好的开始。",
      "A little curiosity goes a long way."
    ],
    "subtitle": [
      "按自己的节奏，积累新的知识。",
      "Build new knowledge at your own pace."
    ],
    "cards": [
      [
        "设计中的秩序",
        "Order in design"
      ],
      [
        "把想法变成作品",
        "From ideas to outcomes"
      ],
      [
        "用数据讲清楚故事",
        "Tell a story with data"
      ]
    ]
  },
  "showcase": {
    "name": [
      "North 创意工作室",
      "North creative studio"
    ],
    "title": [
      "给好想法，一个清晰的形状。",
      "Good ideas deserve a clear form."
    ],
    "subtitle": [
      "连接策略、设计与真实体验。探索我们近期的三个创意方向。",
      "Connecting strategy, design and real experiences. Explore three recent creative directions."
    ],
    "cards": [
      [
        "日常的另一种可能",
        "A different kind of everyday"
      ],
      [
        "让品牌有自己的声音",
        "A voice of its own"
      ],
      [
        "数字空间的新秩序",
        "A new digital rhythm"
      ]
    ]
  },
  "travel": {
    "name": [
      "漫行指南",
      "Roam journal"
    ],
    "title": [
      "走慢一点，发现更多。",
      "Slow down. Discover more."
    ],
    "subtitle": [
      "收集有趣的目的地，把下一段旅程留给自己。",
      "Collect places worth exploring and make room for your next journey."
    ],
    "cards": [
      [
        "沿海的一日漫游",
        "A day along the coast"
      ],
      [
        "山间的安静时刻",
        "A quiet mountain escape"
      ],
      [
        "城市里的周末灵感",
        "A weekend in the city"
      ]
    ]
  },
  "developer": {
    "name": [
      "Orbit 开发控制台",
      "Orbit developer console"
    ],
    "title": [
      "每一次构建，都有迹可循。",
      "Every build, in focus."
    ],
    "subtitle": [
      "清楚了解服务状态与下一次交付。",
      "A clear view of your services and next delivery."
    ]
  }
};
const iconPaths={detail:'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z M9 12a3 3 0 106 0 3 3 0 10-6 0',overview:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',projects:'M3 6h7l2 3h9v11H3z M3 6V4h7l2 2',resources:'M4 4h6c2 0 2 2 2 2s0-2 2-2h6v15h-6c-2 0-2 1-2 1s0-1-2-1H4z M12 6v14',settings:'M12 8a4 4 0 110 8 4 4 0 010-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z'};
function render(state){
const t=k=>messages[state.language][k]||k,local=v=>Array.isArray(v)?v[state.language==='en'?1:0]:v;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const navPaths=iconPaths;
 const navIcon=key=>`<svg class="p-semantic-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${navPaths[key]}"/></svg>`;
 function nav(){return `<aside class="p-sidebar"><p>${esc(t('workspace'))}</p>${[['overview','▦'],['projects','□'],['resources','◈'],['settings','⊙']].map(([key,icon],i)=>`<div class="p-nav ${i===0?'active':''}"><span class="p-nav-icon" aria-hidden="true">${navIcon(key)}</span>${esc(t(key))}</div>`).join('')}</aside>`;}
 function heading(scene){return `<div class="p-heading"><div><div class="p-kicker">${esc(t('today'))}</div><h2>${esc(local(scene.title))}</h2><p>${esc(local(scene.subtitle))}</p></div><div class="p-actions"><button type="button" class="p-action p-action--secondary" data-toggle="follow-project" aria-pressed="false">${esc(t('follow'))}</button><button type="button" class="p-action" data-detail>${navIcon('detail')}${esc(t('detail'))}</button></div></div>`;}
 function metrics(dev=false){return `<div class="p-metrics">${[[dev?'build':'completed',dev?'128':'24','change'],[dev?'request':'review',dev?'42 ms':'06',dev?'stable':'reviewNote'],[dev?'usage':'members',dev?'32%':'12','stable']].map(([key,value,note])=>`<div class="p-card p-material-card p-metric"><div class="p-metric-label">${esc(t(key))}</div><div class="p-value">${value}</div><div class="p-trend ${note==='reviewNote'?'neutral':''}">${esc(t(note))}</div></div>`).join('')}</div>`;}
 function chart(){const days=state.language==='en'?['M','T','W','T','F','S','S']:['一','二','三','四','五','六','日'];return `<section class="p-card p-panel"><div class="p-panel-title"><h3>${esc(t('chartHeading'))}</h3><span>${esc(t('chartUnit'))}</span></div><div class="p-chart" role="img" aria-label="${esc(t('chartNote'))} 12, 18, 15, 24, 20, 13, 10">${[12,18,15,24,20,13,10].map((v,i)=>`<div class="p-bar-group"><span>${v}</span><div class="p-bar ${i===3?'emphasis':''}" style="--bar-height:${v*3}px"></div></div>`).join('')}</div><div class="p-chart-labels" aria-hidden="true">${days.map(d=>'<span>'+d+'</span>').join('')}</div><p class="p-note">${esc(t('chartNote'))}</p></section>`;}
 function tasks(){return `<section class="p-card p-panel"><div class="p-panel-title"><h3>${esc(t('tasksHeading'))}</h3></div>${[1,2,3].map(i=>`<div class="p-task" data-task-id="${i}"><span class="p-task-icon" aria-hidden="true">${i===1?'✓':'·'}</span><div><h4>${esc(t('task'+i))}</h4><p>${esc(t('time'+i))}</p></div></div>`).join('')}</section>`;}
 function table(dev=false,showTitle=true){const fmt=new Intl.NumberFormat(state.language,{style:'currency',currency:'CNY',maximumFractionDigits:0});return `<section class="p-card p-table-card">${showTitle?`<h3 class="p-table-title">${esc(t(dev?'deployment':'recent'))}</h3>`:''}<table class="p-table" aria-label="${esc(t(dev?'deployment':'recent'))}"><thead><tr><th>${esc(t('name'))}</th><th class="p-id">${esc(t('identifier'))}</th><th>${esc(t('status'))}</th><th class="p-numeric">${esc(t(dev?'request':'budget'))}</th><th>${esc(t('action'))}</th></tr></thead><tbody>${[1,2,3].map((i)=>`<tr><td>${dev?['api-gateway','web-client','worker-queue'][i-1]:esc(t('item'+i))}</td><td class="p-id">${dev?'DEP':'PRJ'}-0${i+13}</td><td><span class="p-status ${i===2?'pending':''}">${esc(t(i===2?'pending':dev?'build':'ready'))}</span></td><td class="p-numeric">${dev?[42,58,36][i-1]+' ms':fmt.format([12000,8600,4200][i-1])}</td><td><button type="button" class="p-action p-action--text" data-size="small" data-detail>${esc(t('detail'))}</button></td></tr>`).join('')}</tbody></table></section>`;}
 function library(scene){return `<div class="p-library">${scene.cards.map((title,i)=>`<article class="p-card p-material-card p-content-card"><div class="p-cover ${['one','two','three'][i]}" role="img" aria-label="${esc(t('illustration'))}"><span class="p-cover-label">0${i+1} / ${esc(t('collection'))}</span><span class="p-art-ring"></span><span class="p-art-square"></span></div><div class="p-content-body"><span class="p-status">${esc(t('available'))}</span><h3>${esc(local(title))}</h3><p>${esc(state.project==='learning'?local(['在真实案例中学习，让理解变得具体。','Learn through real examples and make ideas tangible.']):state.project==='travel'?local(['留一点时间，体验目的地的另一面。','Make time to discover a different side of the destination.']):local(['让视觉与体验，一起表达项目的个性。','A visual language built around the experience.']))}</p>${state.project==='learning'?`<div class="p-progress" style="--progress:${[65,30,10][i]}%"><span></span></div>`:''}<div class="p-content-meta"><span>${state.project==='learning'?[8,6,12][i]+' '+esc(t('chapter')):'2026 / 0'+(i+1)}</span><span>${state.project==='learning'?[65,30,10][i]+'%':'↗'}</span></div><button type="button" class="p-action p-action--secondary" data-size="small" data-detail>${esc(t('readMore'))}</button></div></article>`).join('')}</div>`;}
 function readingStrip(){return `<div class="p-card p-reading-strip"><div><h3>${esc(t('continueTitle'))}</h3><p>${esc(t('continueCopy'))}</p></div><button class="p-action" data-detail>${esc(t('continue'))} →</button></div>`;}
 function projectScene(){
  const base=scenarios[state.project]||scenarios.workspace;
  return {...base,name:state.projectName||base.name,title:state.primaryTask||base.title,subtitle:state.brief||base.subtitle};
 }
 function topNav(){return `<nav class="p-top-nav" aria-label="${esc(t('projects'))}">${['overview','projects','resources','settings'].map((key,i)=>`<span class="p-top-item ${i===0?'active':''}">${navIcon(key)}${esc(t(key))}</span>`).join('')}</nav>`;}
 function header(scene){return `<header class="p-header"><div class="p-brand"><span class="p-brand-icon" aria-hidden="true">${navIcon('overview')}</span>${esc(local(scene.name))}</div><div class="p-header-right"><span>${esc(t('demo'))}</span><span class="p-header-caption">${esc(t('week'))}</span></div></header>`;}
 function context(scene){return `<section class="p-card p-panel p-context-note"><p class="p-kicker">${esc(local(['项目背景','PROJECT CONTEXT']))}</p><h3>${esc(state.audience||local(scene.name))}</h3><p>${esc(local(scene.subtitle))}</p><button type="button" class="p-action p-action--secondary" data-detail>${navIcon('detail')}${esc(t('detail'))}</button></section>`;}
 function codePanel(){return `<section class="p-card p-panel"><div class="p-panel-title"><h3>${esc(t('sampleCode'))}</h3><span class="p-status">${esc(t('healthy'))}</span></div><pre class="p-code"><span class="code-accent">const</span> deployment = {
  environment: 'production',
  status: 'healthy',
  duration: 42
};

<span class="code-accent">await</span> deploy(deployment);</pre><p class="p-note">${esc(t('buildNote'))}</p></section>`;}
 function alternatives(layout){
  const scene=projectScene(),records=['workspace','product','developer'].includes(state.project),dev=state.project==='developer';
  const primary=records?table(dev,layout!=='editorial'):library(scene),stats=records?metrics(dev):'',support=dev?codePanel():records?chart():state.project==='learning'?readingStrip():'',rail=records&&!dev?tasks():context(scene);
  if(layout==='split')return header(scene)+topNav()+`<div class="p-main p-split-content">${heading(scene)}<div class="p-split-layout"><div class="p-primary-region" data-region="primary">${primary}${support}</div><aside class="p-context-region" data-region="context">${rail}${stats}</aside></div></div>`;
  if(layout==='ledger')return header(scene)+`<div class="p-ledger-navigation">${topNav()}</div><div class="p-main p-ledger-content">${heading(scene)}<div class="p-primary-region" data-region="primary">${primary}</div><div class="p-ledger-summary" data-region="summary">${stats}</div>${support?`<div class="p-ledger-layout"><div class="p-primary-region" data-region="support">${support}</div><aside class="p-context-region" data-region="context">${rail}</aside></div>`:`<div class="p-context-footer" data-region="context">${rail}</div>`}</div>`;
  return header(scene)+topNav()+`<div class="p-editorial p-edition"><section class="p-feature p-brand-lead p-material-card" data-region="lead"><div><p class="p-kicker">${esc(local(scene.name))} / ${esc(t('latest'))}</p><h2>${esc(local(scene.title))}</h2><p>${esc(local(scene.subtitle))}</p><div class="p-actions"><button type="button" class="p-action p-action--secondary" data-toggle="follow-project" aria-pressed="false">${esc(t('follow'))}</button><button type="button" class="p-action" data-detail>${navIcon('detail')}${esc(t('detail'))}</button></div></div><div class="p-editorial-note"><span class="p-edition-number" aria-hidden="true">01</span><p>${esc(state.audience||local(['内容决定形式。','Content shapes the form.']))}</p><span class="p-kicker">${esc(t('demo'))} / ${esc(t('collection'))}</span></div></section><div class="p-main"><div class="p-edition-heading"><span>02</span><h3>${esc(t(records?'recent':'collection'))}</h3></div><div data-region="primary">${primary}</div><div class="p-edition-metrics">${stats}</div>${support?`<div class="p-editorial-support" data-region="support">${support}<div>${rail}</div></div>`:`<div class="p-context-footer" data-region="context">${rail}</div>`}</div></div>`;
 }
 function markup(){
  const scene=projectScene();let body='';
  if(['workspace','product'].includes(state.project))body=heading(scene)+metrics()+`<div class="p-content-grid">${chart()}${tasks()}</div>`+table();
  else if(state.project==='developer')body=heading(scene)+metrics(true)+`<section class="p-card p-panel"><div class="p-panel-title"><h3>${esc(t('sampleCode'))}</h3><span class="p-status">${esc(t('healthy'))}</span></div><pre class="p-code"><span class="code-accent">const</span> deployment = {\n  environment: <span class="code-accent">'production'</span>,\n  status: <span class="code-accent">'healthy'</span>,\n  duration: <span class="code-accent">42</span>\n};\n\n<span class="code-accent">await</span> deploy(deployment);</pre><p class="p-note">${esc(t('buildNote'))}</p></section>`+table(true);
  else if(state.project==='learning')body=heading(scene)+library(scene)+readingStrip();
  else body=`<div class="p-feature p-card p-material-card"><div><div class="p-kicker">${esc(t('latest'))} / 2026</div><h2>${esc(local(scene.title))}</h2><p>${esc(local(scene.subtitle))}</p><button class="p-action" data-detail>${esc(t('detail'))} ↗</button></div><div class="p-feature-art" role="img" aria-label="${esc(t('illustration'))}"><span class="p-art-orbit"></span><span class="p-art-caption">FORM / SPACE / EXPERIENCE</span></div></div>`+library(scene);
  const editorial=false;
  return `<header class="p-header"><div class="p-brand"><span class="p-brand-icon" aria-hidden="true">◈</span>${esc(local(scene.name))}</div><div class="p-header-right"><span class="p-header-caption">${esc(t(editorial?'collection':'week'))}</span><span>${esc(t('demo'))}</span>${editorial?'': '<span class="p-avatar" aria-hidden="true">L</span>'}</div></header><div class="p-layout ${editorial?'p-editorial':''}">${editorial?'':nav()}<div class="p-main">${body}</div></div>${editorial?'':`<div class="p-mobile-nav" aria-hidden="true"><span>▦ ${esc(t('overview'))}</span><span>□ ${esc(t('projects'))}</span><span>◈ ${esc(t('resources'))}</span></div>`}`;
 }

const layout=state.composition||({clear:'overview',soft:'split',glass:'editorial',precise:'ledger'}[state.scheme]||'overview');
return `<div class="p-direction" data-composition="${esc(layout)}" data-card-style="${esc(state.cardStyle||'raised')}" data-icon-style="${esc(state.iconStyle||'rounded')}" data-color-strength="${esc(state.colorStrength||'balanced')}">${layout==='overview'?markup():alternatives(layout)}</div>`;
}
const api={render,scenarios,iconPaths};root.AdaptiveScenes=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

