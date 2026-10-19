/* Local project rules, not a network AI service. IDs are stable across locales. */
(function(root){
const choices={
 project:['workspace','product','learning','showcase','travel','developer'],
 priority:['balanced','clarity','expressive'],palette:['blue','sage','violet','amber','graphite'],
 material:['solid','frost','glass'],scope:['navigation','cards','both'],radius:['compact','balanced','soft'],
 elevation:['flat','subtle','floating'],density:['compact','standard','relaxed'],device:['desktop','tablet','mobile'],
 language:['zh-CN','en'],appearance:['light','dark','system'],stack:['vue','react','html']
};
const palettes={
 blue:{light:['#3159d9','#edf2ff','#3159d9','#ffffff'],dark:['#a8bcff','#26324e','#c0ceff','#152149']},
 sage:{light:['#24745a','#eaf6ef','#246448','#ffffff'],dark:['#96d7b3','#223b30','#b0e7c8','#153725']},
 violet:{light:['#7047c4','#f3efff','#6840b7','#ffffff'],dark:['#c9b3ff','#362b4d','#d7c5ff','#2c194e']},
 amber:{light:['#966018','#fcf2df','#855315','#ffffff'],dark:['#eec783','#3b3224','#f3d9a6','#382604']},
 graphite:{light:['#414955','#edf0f4','#414955','#ffffff'],dark:['#c3cfdf','#303743','#dae3ef','#202933']}
};
const schemes={
 clear:{palette:'blue',ui:'plex-source-han',mono:'jetbrains-mono',material:'solid',scope:'navigation',radius:'balanced',elevation:'subtle',density:'standard'},
 soft:{palette:'sage',ui:'noto-sc',mono:'cascadia-mono',material:'solid',scope:'cards',radius:'soft',elevation:'subtle',density:'relaxed'},
 glass:{palette:'violet',ui:'geist-source-han',mono:'geist-mono',material:'frost',scope:'both',radius:'soft',elevation:'floating',density:'relaxed'},
 precise:{palette:'graphite',ui:'plex-source-han',mono:'plex-mono',material:'solid',scope:'navigation',radius:'compact',elevation:'flat',density:'compact'}
};
const defaults={version:1,project:'workspace',priority:'balanced',brief:'',scheme:'clear',...schemes.clear,device:'desktop',language:'zh-CN',appearance:'light',solidFallback:false,stack:'html'};
function normalize(value,fontCatalog){
 const input=value&&typeof value==='object'?value:{},out={...defaults};
 for(const [key,list] of Object.entries(choices))if(list.includes(input[key]))out[key]=input[key];
 if(Object.hasOwn(schemes,input.scheme))out.scheme=input.scheme;
 for(const role of ['ui','mono']){
  const list=fontCatalog?.[role==='ui'?'uiPresets':'monoPresets'];
  if(list?.some(p=>p.id===input[role]))out[role]=input[role];
 }
 if(typeof input.brief==='string')out.brief=input.brief.slice(0,240);
 out.solidFallback=input.solidFallback===true;
 return out;
}
function recommend(context){
 const text=(context.brief||'').toLowerCase();
 const dense=/密集|数据|表格|运维|后台|管理|dashboard|table|data.dense|admin|operations/.test(text);
 const reading=/阅读|长文|文档|课程|reading|article|documentation|course/.test(text);
 const visual=/作品|影像|展示|品牌|摄影|portfolio|photograph|showcase|visual/.test(text);
 let primary={workspace:'clear',product:'clear',learning:'soft',showcase:'glass',travel:'soft',developer:'precise'}[context.project]||'clear';
 let reason='project';
 if(dense||reading||context.priority==='clarity'){primary=context.project==='developer'?'precise':reading?'soft':'clear';reason=dense?'dense':reading?'reading':'clarity';}
 else if(context.priority==='expressive'||visual){primary='glass';reason='expressive';}
 const all=[primary,...({workspace:['clear','precise','glass'],product:['clear','soft','glass'],learning:['soft','clear','glass'],showcase:['glass','clear','soft'],travel:['soft','glass','clear'],developer:['precise','clear','glass']}[context.project]||['clear','soft','glass'])];
 const ids=[...new Set(all)].slice(0,3);
 const values={...schemes[primary]};
 if(primary==='clear'&&dense)values.density='compact';
 return {ids,primary,reason,values};
}
function applyScheme(state,id,rec){return {...state,scheme:id,...(id===rec.primary?rec.values:schemes[id]),solidFallback:false};}
function isCustom(state,rec){const baseline=state.scheme===rec.primary?rec.values:schemes[state.scheme];return state.solidFallback||Object.keys(baseline).some(k=>state[k]!==baseline[k]);}
function tokens(state,theme,fontCatalog){
 const [accent,soft,accentText,onAccent]=palettes[state.palette][theme];
 const dark=theme==='dark',r={compact:[6,10,14],balanced:[10,16,22],soft:[14,24,30]}[state.radius];
 const strength=state.elevation;
 const shadows=dark?{flat:'none',subtle:'0 2px 6px rgb(0 0 0 / .16)',floating:'0 4px 12px rgb(0 0 0 / .2), 0 18px 40px -18px rgb(0 0 0 / .45)'}:{flat:'none',subtle:'0 1px 3px rgb(24 39 75 / .04), 0 6px 16px -10px rgb(24 39 75 / .10)',floating:'0 3px 8px rgb(24 39 75 / .06), 0 16px 32px -16px rgb(24 39 75 / .18)'};
 const material=state.solidFallback?'solid':state.material;
 return {'--p-accent':accent,'--p-soft':soft,'--p-accent-text':accentText,'--p-on-accent':onAccent,
 '--p-canvas':dark?'#131920':'#f1f4f8','--p-surface':dark?'#202731':'#ffffff','--p-subtle':dark?'#28313c':'#f7f9fc',
 '--p-text':dark?'#edf2f8':'#202c3d','--p-muted':dark?'#b1bdce':'#566579','--p-border':dark?'#3f4c5e':'#dce3ec',
 '--p-success':dark?'#a4dfba':'#267348','--p-success-bg':dark?'#253c30':'#eaf6ee',
 '--p-warning':dark?'#f4d18e':'#875b18','--p-warning-bg':dark?'#3c3222':'#fcf2df',
 '--p-control-radius':r[0]+'px','--p-card-radius':r[1]+'px','--p-dialog-radius':r[2]+'px',
 '--p-pad':({compact:16,standard:22,relaxed:28}[state.density])+'px',
 '--p-gap':({compact:12,standard:16,relaxed:20}[state.density])+'px',
 '--p-shadow':shadows[strength],
 '--p-glass':material==='solid'?(dark?'#202731':'#ffffff'):`rgb(${dark?'32 39 49':'255 255 255'} / ${material==='frost'?'.90':'.78'})`,
 '--p-blur':material==='solid'?'0px':material==='frost'?'12px':'20px',
 '--font-ui':fontCatalog.uiPresets.find(p=>p.id===state.ui).stack,'--font-mono':fontCatalog.monoPresets.find(p=>p.id===state.mono).stack};
}
const api={choices,palettes,schemes,defaults,normalize,recommend,applyScheme,isCustom,tokens};
root.AdaptiveStudioModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
