/* Project presentation and agent-mediated feedback. No model calls or keyword-based style edits. */
(function(root){
'use strict';
const M=root.AdaptiveStudioModel||(typeof require==='function'?require('./design-studio-model.js'):null);
const clone=x=>JSON.parse(JSON.stringify(x));
function freeze(x){if(x&&typeof x==='object'){Object.freeze(x);Object.values(x).forEach(freeze);}return x;}
const text=(x,max=600)=>typeof x==='string'?x.trim().slice(0,max):'';
const localText=x=>Array.isArray(x)?[text(x[0])||text(x[1]),text(x[1])||text(x[0])]:[text(x),text(x)];
const projectStories={
 workspace:{purpose:['让团队先看清下一步要处理什么。','Help the team see what needs attention next.'],signature:['行动与记录分层，强调色集中在下一步操作。','Separate actions from evidence; reserve emphasis for the next step.'],tradeoff:['概况更清楚；逐项比较可选清单布局。','Clearer overview; choose the ledger for row-by-row comparison.']},
 product:{purpose:['把产品价值和用户下一步放在一起。','Connect the product’s value with the next useful action.'],signature:['先说明用途，再用真实内容展示体验。','Explain the purpose, then demonstrate it with real content.'],tradeoff:['适合引导使用；密集管理任务应选更紧凑的结构。','Good for onboarding; dense operations need a more compact structure.']},
 learning:{purpose:['让阅读与继续学习成为页面的主线。','Make reading and continuing the lesson the main path.'],signature:['稳定阅读面、内容先行、进度作为辅助。','Stable reading surfaces, content first, progress in support.'],tradeoff:['阅读更从容；一屏展示的项目较少。','More comfortable reading, fewer items per screen.']},
 showcase:{purpose:['让作品建立第一印象，再让访客了解你。','Let the work make the first impression, then introduce its maker.'],signature:['建筑线稿、编辑式标题与项目序列，形成一致的作品语言。','Architectural drawings, editorial type and a project sequence build a coherent identity.'],tradeoff:['强调作品与叙事；不适合需要高频数据操作的页面。','Favors work and narrative over frequent data operations.']},
 travel:{purpose:['先唤起探索兴趣，再帮助用户选择行程。','Invite exploration, then help people choose a journey.'],signature:['地形插画、目的地卡片与轻量行程信息相互配合。','Landscape illustrations, destination cards and concise journey details work together.'],tradeoff:['依赖真实目的地素材，正式项目需替换示意插画。','Real destination assets matter; replace illustrative samples for production.']},
 developer:{purpose:['先看到服务状态，再定位需要处理的记录。','See service health first, then locate the records that need action.'],signature:['紧凑证据、等宽数字、明确状态，减少装饰。','Compact evidence, monospace numbers and explicit status, with restrained decoration.'],tradeoff:['扫描效率优先；展示型品牌页面可选更舒展的方案。','Optimized for scanning; brand pages may need a more expressive direction.']}
};
const directionStories={
 clear:{name:['清晰有序','Clear and organized'],benefit:['概况、任务与记录分区，适合频繁使用。','Separate overview, tasks and records for frequent use.'],tradeoff:['结构稳定，视觉表达更克制。','A dependable structure with restrained expression.']},
 soft:{name:['舒展阅读','Comfortable reading'],benefit:['内容与上下文分栏，留出自然的阅读节奏。','Content and context sit side by side with a calmer reading rhythm.'],tradeoff:['更重视逐条阅读，一屏容量较低。','Prioritizes individual reading over screen density.']},
 glass:{name:['鲜明表达','Distinctive expression'],benefit:['作品或主内容先行，用标题和留白建立辨识度。','Lead with the work or key content; use type and space to establish identity.'],tradeoff:['适合展示与发现，核心数据出现得更晚。','Good for discovery; operational data appears later.']},
 precise:{name:['快速处理','Fast to scan'],benefit:['记录清单靠前，便于比较和连续处理。','Put records first for comparison and repeated actions.'],tradeoff:['信息更密集，情绪表达较少。','Higher density with less expressive presentation.']}
};
function cleanIntent(value){
 const input=value&&typeof value==='object'?value:{},out={};
 for(const key of ['concept','colorPlan','typePlan','layout','imagery'])if(text(input[key],1000))out[key]=text(input[key],1000);
 for(const key of ['signature','avoid'])if(Array.isArray(input[key]))out[key]=input[key].map(v=>text(v,300)).filter(Boolean).slice(0,8);
 return out;
}
function intent(state,project){
 const rootIntent=project?.designIntent||{},specific=project?.directions[state.scheme]?.designIntent||{},isRecommended=state.scheme===project?.recommended;
 const authored={...(isRecommended?rootIntent:{concept:rootIntent.concept,avoid:rootIntent.avoid}),...specific};
 const preparedState={...state,palette:project?.initial?.palette||M.defaults.palette};
 const baseline=values(state.scheme,recommend(preparedState,project),project),changed=Object.keys(baseline).filter(k=>state[k]!==baseline[k]);
 if(state.solidFallback)changed.push('solidFallback');
 const idx=state.language==='en'?1:0,story=projectStories[state.project]||projectStories.workspace;
 const colorChanged=changed.some(k=>['palette','tone','colorPlacement','colorStrength'].includes(k)),typeChanged=changed.some(k=>['ui','typeScale','headingWeight','lineHeight','textMeasure'].includes(k));
 const compositionChanged=changed.includes('composition'),placement=state.colorPlacement||'contained';
 const paletteNames={blue:'cobalt / ice-white',sage:'forest / lime',violet:'plum / apricot',amber:'clay / oat',graphite:'graphite / ice',coral:'wine / mint'};
 const layout=authored.layout&&!compositionChanged?authored.layout:project?.sceneRenderer?'Use the project-authored markup and its actual region order.':M.compositionInfo[state.composition].structure[idx];
 const effective={concept:authored.concept||project?.identity?.[idx]||story.signature[idx],
  signature:authored.signature?.length&&!changed.length?authored.signature:[project?.sceneRenderer?'Project-authored composition':M.compositionInfo[state.composition].name[idx],`${paletteNames[state.palette]} / ${placement}`,`${state.ui} / ${state.typeScale}`],
  colorPlan:authored.colorPlan&&!colorChanged?authored.colorPlan:`Selected relationship: ${paletteNames[state.palette]}; placement: ${placement}; tone: ${state.tone}. Apply the exact contrast pairs to regions shown in the confirmed preview.`,
  typePlan:authored.typePlan&&!typeChanged?authored.typePlan:`UI font ${state.ui}; ${state.typeScale} scale; ${state.headingWeight} headings; ${state.lineHeight} leading; ${state.textMeasure} measure. Exact stacks and sizes are captured in tokens.`,
  layout,imagery:authored.imagery||'Use the confirmed preview media with its provenance and fallbacks; do not invent replacement assets.',avoid:authored.avoid||[],
  applied:{palette:state.palette,colorPlacement:placement,tone:state.tone,composition:state.composition,uiFont:state.ui,typeScale:state.typeScale,material:state.solidFallback?'solid-fallback':state.material},
  basis:changed.length?'current-adjusted-selection':'prepared-direction',adjustments:changed.map(k=>({field:k,prepared:baseline[k]??false,selected:state[k]})),
  precedence:'Current effective intent, confirmed manual choices and exact tokens are authoritative; earlier descriptions for adjusted fields have been reconciled.'};
 return effective;
}
function scene(state,project){
 const translated=project?.sceneText?.[state.language]||{},localized={...state};
 for(const [key,value] of Object.entries(translated))if(state[key]===project.initial[key])localized[key]=value;
 state=localized;
 if(project?.sceneRenderer){const html=project.sceneRenderer({...state});if(typeof html!=='string'||!html.trim()||html.length>250000)throw Error('Project scene must return bounded HTML');return `<div class="p-direction" data-composition="${state.composition}" data-card-style="${state.cardStyle}" data-icon-style="${state.iconStyle}" data-color-strength="${state.colorStrength}" data-color-placement="${state.colorPlacement||'contained'}">${html}</div>`;}
 const renderer=root.AdaptiveScenes||(typeof require==='function'?require('./design-scenes.js'):null);return renderer.render(state);
}
function profile(raw,catalog){
 const input=raw&&typeof raw==='object'?raw:{},id=text(input.id,80).replace(/[^\w-]/g,'');
 const configured=Boolean(id&&input.context&&typeof input.context==='object');
 const initial=M.normalize(configured?{...input.context,projectKey:id,projectRevision:text(input.revision,80)||'1'}:{},catalog);
 const sceneText={};
 for(const locale of ['zh-CN','en']){sceneText[locale]={};for(const [key,max]of Object.entries({projectName:80,primaryTask:160,brief:240}))if(typeof input.sceneText?.[locale]?.[key]==='string')sceneText[locale][key]=text(input.sceneText[locale][key],max);}
 const directions={};
 for(const [key,value]of Object.entries(input.directions||{}))if(Object.hasOwn(M.schemes,key)&&value&&typeof value==='object'){
  const values={};for(const field of M.styleFields)if(Object.hasOwn(value.values||{},field)){const candidate=M.normalize({...initial,...value.values},catalog);if(candidate[field]===value.values[field])values[field]=candidate[field];}
  directions[key]={name:localText(value.name),benefit:localText(value.benefit),tradeoff:localText(value.tradeoff),identity:localText(value.identity),values,designIntent:cleanIntent(value.designIntent)};
 }
 return {sceneText,designIntent:cleanIntent(input.designIntent),sceneRenderer:typeof input.sceneRenderer==='function'?input.sceneRenderer:null,sceneResources:Array.isArray(input.sceneResources)?input.sceneResources.filter(v=>typeof v==='string'&&v.length<200).slice(0,12):[],configured,isExample:!configured||input.example===true,id:configured?id:'sample',revision:text(input.revision,80)||'1',initial,directions,recommended:Object.hasOwn(M.schemes,input.recommended)?input.recommended:null,reason:localText(input.reason),identity:localText(input.identity),response:input.response&&typeof input.response==='object'?input.response:null};
}
function recommend(state,project){
 const result=M.recommend(state),prepared=Object.keys(project?.directions||{});
 const primary=prepared.length?(prepared.includes(project.recommended)?project.recommended:prepared.includes(result.primary)?result.primary:prepared[0]):project?.recommended||result.primary;
 const values={...(result.variants[primary]||M.recipe(state.project,primary)),...(primary===result.primary?result.values:{})};
 if(state.priority==='expressive'){values.colorStrength='bold';values.colorPlacement='duotone';}
 Object.assign(values,project?.directions[primary]?.values||{});
 return {...result,variants:result.variants,primary,ids:[primary,...(prepared.length?prepared:result.ids)].filter((id,index,array)=>array.indexOf(id)===index).slice(0,3),values};
}
function candidates(rec,project,all=false){const prepared=Object.keys(project?.directions||{});return [...new Set([rec.primary,...(prepared.length?prepared:all?[...rec.ids,...Object.keys(M.schemes)]:rec.ids)])].slice(0,all?4:3);}
function direction(id,state,project){const story=directionStories[id],custom=project?.directions[id];return {name:custom?.name.some(Boolean)?custom.name:story.name,benefit:custom?.benefit.some(Boolean)?custom.benefit:story.benefit,tradeoff:custom?.tradeoff.some(Boolean)?custom.tradeoff:story.tradeoff};}
function values(id,rec,project){return id===rec.primary?rec.values:{...(rec.variants?.[id]||M.schemes[id]),...(project?.directions[id]?.values||{})};}
function isCustom(state,rec,project){const base=values(state.scheme,rec,project);return state.solidFallback||state.widthPolicy!=='auto'||Object.keys(base).some(key=>state[key]!==base[key]);}
function rationale(state,project){const story=projectStories[state.project]||projectStories.workspace;return {purpose:story.purpose,identity:project?.directions[state.scheme]?.identity?.some(Boolean)?project.directions[state.scheme].identity:project?.directions[state.scheme]?.benefit?.some(Boolean)?project.directions[state.scheme].benefit:project?.identity.some(Boolean)?project.identity:story.signature,reason:project?.reason.some(Boolean)?project.reason:story.tradeoff};}
function request(value,design,{id,createdAt}={}){
 const message=text(value,1200);if(!message)return null;
 const captured=clone(design);
 return freeze({format:'adaptive-ui-feedback',version:1,id:id||'feedback-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),createdAt:createdAt||new Date().toISOString(),status:'pending',message,projectKey:captured.selected.projectKey||'sample',baseSignature:M.signature(captured.selected),design:captured});
}
function restoreRequest(value){try{if(value?.format!=='adaptive-ui-feedback'||value.version!==1||!['pending','applied','cancelled'].includes(value.status)||!value.id||!value.message||!value.design?.selected||value.baseSignature!==M.signature(value.design.selected))return null;return freeze(clone(value));}catch{return null;}}
function draft(request,state){return {format:'adaptive-ui-feedback-draft',version:1,requestId:request.id,projectKey:request.projectKey,signature:M.signature(state),selected:clone(state)};}
function restoreDraft(value,request,catalog){
 try{
  if(value?.format!=='adaptive-ui-feedback-draft'||value.version!==1||value.requestId!==request?.id||value.projectKey!==request.projectKey||value.selected?.projectKey!==request.projectKey)return null;
  const state=M.normalize(value.selected,catalog);
  if(value.signature!==M.signature(state)||value.signature!==M.signature(value.selected))return null;
  return state;
 }catch{return null;}
}
function resolve(pending,response,current,catalog){
 const unchanged=()=>({...current});
 if(!pending||!response||response.requestId!==pending.id)return {status:'unmatched',state:unchanged()};
 if(response.baseSignature!==pending.baseSignature||M.signature(current)!==pending.baseSignature||current.projectKey!==pending.projectKey)return {status:'stale',state:unchanged()};
 const summary=localText(response.summary);if(!summary.some(Boolean))return {status:'invalid',state:unchanged()};
 if(response.status==='needs-clarification')return {status:'needs-clarification',state:unchanged(),summary};
 if(response.status!=='apply')return {status:'invalid',state:unchanged()};
 const patch=response.patch&&typeof response.patch==='object'?response.patch:{},allowed=new Set([...M.styleFields,'appearance']);
 if(Object.keys(patch).some(key=>!allowed.has(key)))return {status:'invalid',state:unchanged()};
 const next=M.normalize({...current,...patch},catalog);
 if(Object.keys(patch).some(key=>next[key]!==patch[key]))return {status:'invalid',state:unchanged()};
 const revision=text(response.resultRevision,80)||current.projectRevision;
 if(!Object.keys(patch).some(key=>current[key]!==next[key])&&revision===current.projectRevision)return {status:'invalid',state:unchanged()};
 next.projectRevision=revision;
 return {status:'applied',state:next,summary,changed:Object.keys(patch).filter(key=>current[key]!==next[key])};
}
const api={cleanIntent,intent,scene,profile,recommend,candidates,direction,values,isCustom,rationale,request,restoreRequest,draft,restoreDraft,resolve};root.AdaptiveDesignGuidance=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
