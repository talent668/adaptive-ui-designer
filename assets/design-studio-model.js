/* Local project rules, not a network AI service. IDs are stable across locales. */
(function(root){
const choices={
 headingWeight:['medium','semibold','bold'],lineHeight:['compact','comfortable','loose'],textMeasure:['narrow','balanced','wide'],
 workflowMode:['choose','direct','prompt'],composition:['overview','split','editorial','ledger'],tone:['neutral','warm','tinted','ink'],cardStyle:['raised','outlined','flat'],typeScale:['compact','comfortable','editorial'],spacing:['tight','standard','airy'],iconStyle:['rounded','square','duotone'],iconSize:['small','medium','large'],colorStrength:['quiet','balanced','bold'],
 widthPolicy:['auto','focused','wide','fluid'],
 project:['workspace','product','learning','showcase','travel','developer'],
 priority:['balanced','clarity','expressive'],palette:['blue','sage','violet','amber','graphite','coral'],
 material:['solid','frost','gradient','glass'],scope:['navigation','cards','both'],radius:['compact','balanced','soft'],
 elevation:['flat','subtle','floating'],density:['compact','standard','relaxed'],device:['desktop','tablet','mobile'],
 language:['zh-CN','en'],appearance:['light','dark','system'],stack:['vue','react','html'],buttonSize:['compact','standard','prominent'],buttonShape:['crisp','rounded','pill'],buttonStyle:['solid','soft','outline']
};
const palettes={
 coral:{light:['#b7432b','#fff0eb','#9f321d','#ffffff'],dark:['#ffb69b','#402b25','#ffcab8','#3a1d13']},
 blue:{light:['#3159d9','#edf2ff','#3159d9','#ffffff'],dark:['#a8bcff','#26324e','#c0ceff','#152149']},
 sage:{light:['#24745a','#eaf6ef','#246448','#ffffff'],dark:['#96d7b3','#223b30','#b0e7c8','#153725']},
 violet:{light:['#7047c4','#f3efff','#6840b7','#ffffff'],dark:['#c9b3ff','#362b4d','#d7c5ff','#2c194e']},
 amber:{light:['#966018','#fcf2df','#855315','#ffffff'],dark:['#eec783','#3b3224','#f3d9a6','#382604']},
 graphite:{light:['#414955','#edf0f4','#414955','#ffffff'],dark:['#c3cfdf','#303743','#dae3ef','#202933']}
};
const schemes={
 clear:{headingWeight:'semibold',lineHeight:'comfortable',textMeasure:'balanced',composition:'overview',tone:'neutral',cardStyle:'raised',typeScale:'comfortable',spacing:'standard',iconStyle:'rounded',iconSize:'medium',colorStrength:'balanced',palette:'blue',ui:'plex-source-han',mono:'jetbrains-mono',material:'solid',scope:'navigation',radius:'balanced',elevation:'subtle',density:'standard',buttonSize:'standard',buttonShape:'rounded',buttonStyle:'solid'},
 soft:{headingWeight:'medium',lineHeight:'loose',textMeasure:'narrow',composition:'split',tone:'warm',cardStyle:'flat',typeScale:'comfortable',spacing:'airy',iconStyle:'rounded',iconSize:'medium',colorStrength:'quiet',palette:'sage',ui:'noto-sc',mono:'cascadia-mono',material:'solid',scope:'cards',radius:'soft',elevation:'subtle',density:'relaxed',buttonSize:'standard',buttonShape:'rounded',buttonStyle:'soft'},
 glass:{headingWeight:'bold',lineHeight:'comfortable',textMeasure:'balanced',composition:'editorial',tone:'tinted',cardStyle:'raised',typeScale:'editorial',spacing:'airy',iconStyle:'duotone',iconSize:'large',colorStrength:'bold',palette:'coral',ui:'geist-source-han',mono:'geist-mono',material:'gradient',scope:'both',radius:'soft',elevation:'floating',density:'relaxed',buttonSize:'prominent',buttonShape:'pill',buttonStyle:'solid'},
 precise:{headingWeight:'semibold',lineHeight:'compact',textMeasure:'wide',composition:'ledger',tone:'ink',cardStyle:'outlined',typeScale:'compact',spacing:'tight',iconStyle:'square',iconSize:'small',colorStrength:'balanced',palette:'graphite',ui:'plex-source-han',mono:'plex-mono',material:'solid',scope:'navigation',radius:'compact',elevation:'flat',density:'compact',buttonSize:'compact',buttonShape:'crisp',buttonStyle:'solid'}
};
const defaults={version:3,workflowMode:'choose',projectName:'',audience:'',primaryTask:'',constraints:'',widthPolicy:'auto',project:'workspace',priority:'balanced',brief:'',scheme:'clear',...schemes.clear,device:'desktop',language:'zh-CN',appearance:'light',solidFallback:false,stack:'html',responsive:false};
function normalize(value,fontCatalog){
 const input=value&&typeof value==='object'?value:{},out={...defaults,...(Object.hasOwn(schemes,input.scheme)?schemes[input.scheme]:{})};
 for(const [key,list] of Object.entries(choices))if(list.includes(input[key]))out[key]=input[key];
 if(Object.hasOwn(schemes,input.scheme))out.scheme=input.scheme;
 for(const role of ['ui','mono']){
  const list=fontCatalog?.[role==='ui'?'uiPresets':'monoPresets'];
  if(list?.some(p=>p.id===input[role]))out[role]=input[role];
 }
 for(const [key,max] of Object.entries({brief:240,projectName:80,audience:160,primaryTask:160,constraints:400}))if(typeof input[key]==='string')out[key]=input[key].slice(0,max);
 out.solidFallback=input.solidFallback===true;
 out.responsive=input.responsive===true;if(!out.responsive)out.device='desktop';
 return out;
}
function recommend(context){
 const text=(context.brief||'').toLowerCase();
 const dense=/密集|数据|表格|运维|后台|管理|\b(?:dashboards?|tables?|data[- ]dense|admin|operations)\b/.test(text);
 const reading=/阅读|长文|文档|课程|\b(?:reading|articles?|documentation|courses?)\b/.test(text);
 const visual=/作品|影像|展示|品牌|摄影|\b(?:portfolio|photography?|showcase|visual)\b/.test(text);
 let primary={workspace:'clear',product:'clear',learning:'soft',showcase:'glass',travel:'soft',developer:'precise'}[context.project]||'clear';
 let reason='project';
 if(dense||reading||context.priority==='clarity'){primary=context.project==='developer'?'precise':dense?'clear':reading?'soft':'clear';reason=dense?'dense':reading?'reading':'clarity';}
 else if(context.priority==='expressive'||visual){primary='glass';reason='expressive';}
 const all=[primary,...({workspace:['clear','precise','glass'],product:['clear','soft','glass'],learning:['soft','clear','glass'],showcase:['glass','clear','soft'],travel:['soft','glass','clear'],developer:['precise','clear','glass']}[context.project]||['clear','soft','glass'])];
 const ids=[...new Set(all)].slice(0,3);
 const values={...schemes[primary]};
 if(primary==='clear'&&dense)values.density='compact';
 return {ids,primary,reason,values};
}
function applyScheme(state,id,rec){return {...state,scheme:id,...(id===rec.primary?rec.values:schemes[id]),solidFallback:false};}
function isCustom(state,rec){const baseline=state.scheme===rec.primary?rec.values:schemes[state.scheme];return state.solidFallback||(state.widthPolicy&&state.widthPolicy!=='auto')||Object.keys(baseline).some(k=>state[k]!==baseline[k]);}
function tokens(state,theme,fontCatalog){
 const [accent,soft,accentText,onAccent]=palettes[state.palette][theme];
 const dark=theme==='dark',r={compact:[6,10,14],balanced:[10,16,22],soft:[14,24,30]}[state.radius];
 const strength=state.elevation;
 const shadows=dark?{flat:'none',subtle:'0 2px 6px rgb(0 0 0 / .16)',floating:'0 4px 12px rgb(0 0 0 / .2), 0 18px 40px -18px rgb(0 0 0 / .45)'}:{flat:'none',subtle:'0 1px 3px rgb(24 39 75 / .04), 0 6px 16px -10px rgb(24 39 75 / .10)',floating:'0 3px 8px rgb(24 39 75 / .06), 0 16px 32px -16px rgb(24 39 75 / .18)'};
 const preset=schemes[state.scheme]||schemes.clear,tone=state.tone||preset.tone,scale=state.typeScale||preset.typeScale;
 const type={compact:[13,21,36,14,11,1.55],comfortable:[15,28,48,17,12,1.75],editorial:[16,36,64,20,12,1.8]}[scale];
 const surface=tone==='warm'?(dark?'#29221c':'#fffdf9'):dark?'#202731':'#ffffff';
 const roles={
  '--p-canvas':tone==='warm'?(dark?'#1e1a16':'#f5f0e8'):tone==='tinted'?soft:tone==='ink'?(dark?'#111820':'#e8edf4'):dark?'#131920':'#f1f4f8',
  '--p-surface':surface,'--p-subtle':tone==='warm'?(dark?'#322b23':'#f7f0e4'):dark?'#28313c':'#f7f9fc',
  '--p-text':tone==='warm'?(dark?'#f6f0e8':'#2c2e2b'):dark?'#edf2f8':'#202c3d',
  '--p-muted':tone==='warm'?(dark?'#c4b7a5':'#655f56'):dark?'#b1bdce':'#566579',
  '--p-border':tone==='warm'?(dark?'#51483e':'#ddd5c8'):dark?'#3f4c5e':'#dce3ec',
  '--p-body-size':type[0]+'px','--p-title-size':type[1]+'px','--p-display-size':type[2]+'px','--p-section-size':type[3]+'px','--p-meta-size':type[4]+'px','--p-leading':String({compact:1.55,comfortable:1.75,loose:1.95}[state.lineHeight||preset.lineHeight]),'--p-heading-weight':String({medium:500,semibold:600,bold:700}[state.headingWeight||preset.headingWeight]),'--p-text-measure':({narrow:'56ch',balanced:'70ch',wide:'84ch'}[state.textMeasure||preset.textMeasure]),
  '--p-gap':({tight:12,standard:20,airy:28}[state.spacing||preset.spacing])+'px',
  '--p-icon-size':({small:16,medium:20,large:24}[state.iconSize||preset.iconSize])+'px','--p-icon-stroke':(state.iconStyle||preset.iconStyle)==='square'?'1.5':'1.8',
  '--p-brand-bg':(state.colorStrength||preset.colorStrength)==='bold'?accent:tone==='ink'?'#182536':soft,
  '--p-brand-fg':(state.colorStrength||preset.colorStrength)==='bold'?onAccent:tone==='ink'?'#f5f8fc':accentText,
  '--p-brand-subtle':(state.colorStrength||preset.colorStrength)==='bold'?onAccent:tone==='ink'?'#d2ddec':accentText,
  '--p-companion':dark?'#e7c992':'#f3d69c','--p-companion-text':dark?'#34260f':'#493713',
  '--p-card-shadow':(state.cardStyle||preset.cardStyle)==='raised'?shadows[strength]:'none',
  '--p-card-border':(state.cardStyle||preset.cardStyle)==='flat'?'transparent':tone==='warm'?(dark?'#51483e':'#ddd5c8'):dark?'#3f4c5e':'#dce3ec'
 };
 const material=state.solidFallback?'solid':state.material;
 const gradient=dark?`linear-gradient(125deg, ${accent}26, rgb(32 39 49 / .84) 48%, ${soft}dd), rgb(32 39 49 / .80)`:`linear-gradient(125deg, ${accent}38, rgb(255 255 255 / .82) 48%, ${soft}dd), rgb(255 255 255 / .76)`;
 const widthPolicy=state.widthPolicy||'auto';
 const layoutMax=widthPolicy==='focused'?'80rem':widthPolicy==='wide'?'120rem':widthPolicy==='fluid'?'none':({workspace:'112rem',product:'100rem',learning:'90rem',showcase:'100rem',travel:'100rem',developer:'120rem'}[state.project]||'90rem');
 return {'--p-layout-max':layoutMax,'--p-accent':accent,'--p-soft':soft,'--p-accent-text':accentText,'--p-on-accent':onAccent,
 '--p-canvas':dark?'#131920':'#f1f4f8','--p-surface':dark?'#202731':'#ffffff','--p-subtle':dark?'#28313c':'#f7f9fc',
 '--p-text':dark?'#edf2f8':'#202c3d','--p-muted':dark?'#b1bdce':'#566579','--p-border':dark?'#3f4c5e':'#dce3ec',
 '--p-success':dark?'#a4dfba':'#267348','--p-success-bg':dark?'#253c30':'#eaf6ee',
 '--p-warning':dark?'#f4d18e':'#875b18','--p-warning-bg':dark?'#3c3222':'#fcf2df',
 '--p-button-height':({compact:32,standard:40,prominent:48}[state.buttonSize||'standard'])+'px',
 '--p-button-font':({compact:13,standard:14,prominent:15}[state.buttonSize||'standard'])+'px',
 '--p-button-pad':({compact:10,standard:16,prominent:20}[state.buttonSize||'standard'])+'px',
 '--p-button-radius':({crisp:6,rounded:12,pill:999}[state.buttonShape||'rounded'])+'px',
 '--p-button-bg':state.buttonStyle==='soft'?soft:state.buttonStyle==='outline'?(dark?'#202731':'#ffffff'):accent,
 '--p-button-fg':state.buttonStyle==='solid'||!state.buttonStyle?onAccent:accentText,
 '--p-button-border':state.buttonStyle==='soft'?'transparent':accent,
 '--p-danger':dark?'#ffb4b4':'#b32332',
 '--p-control-radius':r[0]+'px','--p-card-radius':r[1]+'px','--p-dialog-radius':r[2]+'px',
 '--p-pad':({compact:16,standard:22,relaxed:28}[state.density])+'px',
 '--p-gap':({compact:12,standard:16,relaxed:20}[state.density])+'px',
 '--p-shadow':shadows[strength],
 '--p-glass':material==='solid'?surface:material==='gradient'?gradient:`rgb(${dark?'32 39 49':'255 255 255'} / ${material==='frost'?'.90':'.78'})`,
 '--p-blur':material==='solid'?'0px':material==='frost'?'12px':material==='gradient'?'18px':'20px',
 '--font-ui':fontCatalog.uiPresets.find(p=>p.id===state.ui).stack,'--font-mono':fontCatalog.monoPresets.find(p=>p.id===state.mono).stack,...roles};
}
const styleFields=[...new Set(Object.values(schemes).flatMap(s=>Object.keys(s))), 'widthPolicy','solidFallback'];
function styleSelection(state){return Object.fromEntries(styleFields.map(k=>[k,state[k]]));}
function signature(state){const copy={...state};delete copy.workflowMode;return JSON.stringify(copy);}
const compositionInfo={
 overview:{name:['任务工作台','Task workbench'],structure:['侧栏导航 → 任务标题 → 项目主内容 → 辅助信息','Sidebar → task heading → project-specific primary content → supporting information']},
 split:{name:['内容分栏','Content split'],structure:['顶部导航 → 标题 → 主内容列表 + 上下文侧栏','Top navigation → heading → primary collection + context rail']},
 editorial:{name:['品牌编排','Brand editorial'],structure:['顶部导航 → 品牌主视觉与导语 → 编号主内容 → 相关信息','Top navigation → branded lead and introduction → numbered primary content → supporting information']},
 ledger:{name:['紧凑清单','Compact ledger'],structure:['紧凑顶部导航 → 标题与操作 → 数据清单优先 → 辅助指标与上下文','Compact top navigation → title/actions → records first → supporting metrics and context']}
};
const layoutRecipes={
 overview:{navigation:'132px sidebar',primaryOrder:['heading','metrics','analysis-and-tasks','records'],mainInset:'var(--p-pad)',collapseAt:'800px content container'},
 split:{navigation:'top navigation',columns:'minmax(0,1fr) minmax(200px,.38fr)',primaryOrder:['heading','records-or-content-list','support'],contextOrder:['context-or-tasks','metrics-if-present'],listCardColumns:'minmax(100px,.36fr) 1fr',railAt1000:'220px',stackAt:'740px content container'},
 editorial:{navigation:'top navigation',primaryOrder:['branded lead','numbered primary content','support'],leadColumns:'minmax(0,1.5fr) minmax(200px,.6fr)',leadInset:'clamp(24px,4cqw,64px)',leadTitle:'clamp(28px,4cqw,var(--p-display-size))',supportColumns:'1fr .65fr; align-items:start',stackAt:'740px content container'},
 ledger:{navigation:'compact top navigation',primaryOrder:['heading-and-actions','full-width records','compact metrics','support-and-context'],supportColumns:'minmax(0,1fr) minmax(200px,.32fr)',listCardColumns:'92px 1fr; 64px 1fr below 480px',railAt1000:'220px',stackAt:'740px content container'}
};
const api={choices,palettes,schemes,defaults,normalize,recommend,applyScheme,isCustom,tokens,styleFields,styleSelection,signature,compositionInfo,layoutRecipes};
root.AdaptiveStudioModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
