const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {parseHTML}=require('linkedom');
const {root,model:M,catalog}=require('./helpers.cjs'),S=require('../assets/design-scenes.js'),P=require('../assets/design-prompt.js'),G=require('../assets/design-guidance.js');

test('prepared visual identity and manual color placement are retained by actual confirmation',async()=>{
 const brief=require('../assets/project-examples.js')['operations-bold'],h=await harness({brief});
 assert.equal(h.$('html').dataset.details,'closed');assert.equal(h.$('#colorPlacement').querySelectorAll('option').length,3);
 h.change('#colorPlacement','contained');h.event('#confirmPrompt');
 const captured=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;
 assert.equal(captured.selected.colorPlacement,'contained');assert.equal(captured.designIntent.applied.colorPlacement,'contained');assert(captured.designIntent.signature.length>=2);assert(captured.designIntent.concept.includes('working instrument'));
});

test('project-authored composition reaches the preview and source request without generic substitution',async()=>{
 const h=await harness({brief:{id:'custom-story',context:{project:'showcase'},designIntent:{concept:'A film contact sheet',signature:['Frame sequence','Large frame indexes']},sceneResources:['project-scenes.js'],sceneRenderer:s=>`<main data-project-story="film"><h2>${s.language==='en'?'Frame sequence':'镜头序列'}</h2><button data-detail>Inspect</button></main>`}});
 assert(h.$('.project-preview [data-project-story="film"]'));h.event('[data-mode="direct"]');h.event('#confirmGenerate');await h.flush();assert.equal(h.requests.length,1);
 for(const language of ['zh-CN','en'])assert(h.requests[0].scenes[language].includes('data-project-story="film"'));
 assert.equal(h.requests[0].design.customScene,true);assert.deepEqual(h.requests[0].design.resources.project,['project-scenes.js']);await h.resolve();
});

test('candidate thumbnails use the actual candidate palette and material instead of the legacy scheme identity',async()=>{
 const h=await harness({brief:require('../assets/project-examples.js')['learning-studio']}),mini=h.$('[data-scheme="glass"] .mini-ui');
 assert.equal(mini.dataset.material,'solid');assert.equal(mini.dataset.colorPlacement,'duotone');assert(mini.getAttribute('style').includes('--mini-anchor:#482d62'));assert(mini.getAttribute('style').includes('--mini-companion:#f1c4a6'));
 h.event('[data-scheme="soft"]');h.event('#confirmPrompt');const current=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;
 assert.equal(current.selected.palette,'sage');assert.doesNotMatch(current.designIntent.colorPlan,/plum|apricot/i);
});

// Actual chooser controller with an in-memory DOM. No native layout/focus claim.
async function harness(options={}){
 const {document,window}=parseHTML(fs.readFileSync(path.join(root,'examples/design-studio.html'),'utf8'));
 const $=s=>document.querySelector(s),listeners={},storage=new Map(options.storage||[]),requests=[],clipboard=[];let focused=null,pending=null;
 window.HTMLElement.prototype.focus=function(){focused=this;};
 for(const select of document.querySelectorAll('select')){
  Object.defineProperty(select,'value',{get(){return this._value??this.querySelector('option[selected]')?.value??this.querySelector('option')?.value??'';},set(v){this._value=v;}});
  select.add=function(option){this.append(option);};
 }
 for(const dialog of document.querySelectorAll('dialog')){dialog.showModal=()=>{dialog.open=true;};dialog.close=()=>{dialog.open=false;};}
 const hostWindow={addEventListener:(key,fn)=>listeners[key]=fn,AdaptiveStudioModel:M,AdaptiveScenes:S,AdaptiveDesignPrompt:P,AdaptiveDesignGuidance:G,AdaptiveProjectBrief:options.brief,
  AdaptiveUIFontKit:{catalog,apply(){},status:async()=>{throw Error('Font loading is not covered by this DOM fixture');}},
  AUISelect:{enhanceAll(){},refreshAll(){}},
  AdaptivePageGenerator:{generate:input=>{requests.push(input);return new Promise(resolve=>{pending=()=>resolve({stack:input.design.selected.stack,design:input.design,files:[{path:'index.html',content:'<main>fixture</main>'},{path:'DESIGN-PROMPT.md',content:input.designPrompt}],mainFile:'index.html',archive:new Uint8Array()});});}}
 };
 vm.runInNewContext(fs.readFileSync(path.join(root,'assets/design-studio.js'),'utf8'),{document,window:hostWindow,matchMedia:()=>({matches:false,addEventListener(){}}),CSS:{supports:()=>true},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(options.failSet?.(k,v))throw Error('Storage unavailable');storage.set(k,v);},removeItem:k=>storage.delete(k)},Option:function(label,value){const e=document.createElement('option');e.textContent=label;e.value=value;return e;},ResizeObserver:class{observe(){}},URL:{createObjectURL:()=> 'blob:test-fixture',revokeObjectURL(){}},Blob,Uint8Array,setTimeout:()=>0,navigator:{clipboard:{writeText:async value=>clipboard.push(value)}}});
 listeners.DOMContentLoaded();await Promise.resolve();await Promise.resolve();
 const event=(selector,type='click')=>$(selector).dispatchEvent(new window.Event(type,{bubbles:true,cancelable:true}));
 const change=(selector,value,type='change')=>{$(selector).value=value;event(selector,type);};
 const flush=async()=>{await Promise.resolve();await Promise.resolve();};
 const resolve=async()=>{assert(pending);pending();pending=null;await flush();};
 return {$,event,change,requests,clipboard,storage,resolve,flush,focus:()=>focused};
}

test('size previews are available by default; hiding them retains the responsive handoff',async()=>{
 const h=await harness();
 for(const device of ['desktop','tablet','mobile'])assert.equal(h.$(`[data-control="device"][data-value="${device}"]`).hidden,false);
 h.event('[data-control="device"][data-value="mobile"]');
 h.event('#confirmPrompt');let contract=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;
 assert.equal(contract.selected.device,'mobile');assert.equal(contract.selected.responsive,true);
 const palette=contract.selected.palette;
 h.$('#responsiveScope').checked=false;h.event('#responsiveScope','change');h.event('#confirmPrompt');
 contract=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;
 assert.equal(contract.selected.device,'desktop');assert.equal(contract.selected.responsive,false);assert.equal(contract.selected.palette,palette);
 assert.match(P.build(contract,{locale:'en'}).text,/Responsive behavior is required across phone, tablet and desktop/);
});

test('the initial surface hides details without changing the chosen design or removing expert controls',async()=>{
 const h=await harness();assert.equal(h.$('html').dataset.details,'closed');assert.equal(h.$('#showAdvanced').getAttribute('aria-expanded'),'false');assert(!h.$('#projectSettings').hasAttribute('open'));
 assert(h.$('#uiFont'));assert(h.$('#headingWeight'));assert(h.$('#buttonShapeOptions'));
 h.event('#confirmPrompt');const before=JSON.parse(h.$('#confirmedDesignRecord').textContent).design.selected;
 h.event('#showAdvanced');assert.equal(h.$('html').dataset.details,'open');assert.equal(h.$('#showAdvanced').getAttribute('aria-expanded'),'true');
 h.event('#showAdvanced');assert.equal(h.$('html').dataset.details,'closed');assert.deepEqual(JSON.parse(h.$('#confirmedDesignRecord').textContent).design.selected,before);
});

test('a natural-language request is visible to the agent, never silently changes style, and can be withdrawn',async()=>{
 const h=await harness();h.event('#confirmPrompt');const accepted=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;
 h.change('#adjustmentInput','不要改蓝色。换成杂志感排版。','input');h.event('#submitAdjustment');
 const record=JSON.parse(h.$('#designFeedbackRecord').textContent);assert.equal(record.request.message,'不要改蓝色。换成杂志感排版。');assert.equal(record.request.design.selected.palette,accepted.selected.palette);assert.equal(record.currentDesign.selected.composition,accepted.selected.composition);
 assert.equal(h.$('#confirmPrompt').disabled,true);h.event('#confirmGenerate');assert.equal(h.requests.length,0);assert.equal(JSON.parse(h.$('#confirmedDesignRecord').textContent).implementationEligible,false);
 h.event('#cancelAdjustment');assert.equal(h.$('#confirmPrompt').disabled,false);assert.equal(JSON.parse(h.$('#confirmedDesignRecord').textContent).implementationEligible,true);
});

test('a matching agent response applies on resume; advanced choices and project identity survive',async()=>{
 const brief={id:'fieldwork',revision:'1',context:{project:'showcase',stack:'vue',projectName:'Fieldwork'}};
 const h=await harness({brief});h.change('#adjustmentInput','更舒展，保留作品优先','input');h.event('#submitAdjustment');const record=JSON.parse(h.$('#designFeedbackRecord').textContent);
 const resumed=await harness({storage:[...h.storage],brief:{...brief,response:{status:'apply',requestId:record.request.id,baseSignature:record.request.baseSignature,patch:{spacing:'airy',lineHeight:'loose',radius:'soft'},summary:['增加阅读间距，保留作品优先。','More reading space; work remains first.']}}});
 const after=JSON.parse(resumed.$('#designFeedbackRecord').textContent);assert.equal(after.request.status,'applied');assert.equal(after.currentDesign.selected.stack,'vue');assert.equal(after.currentDesign.selected.lineHeight,'loose');assert.equal(after.currentDesign.selected.projectKey,'fieldwork');assert.equal(resumed.$('html').dataset.details,'closed');assert.equal(resumed.$('#confirmPrompt').disabled,false);
 assert(!resumed.$('#promptDialog').open);assert.equal(resumed.requests.length,0);
});

test('blue-white defaults do not erase a hand-selected color on a later composition selection',async()=>{
 const h=await harness();assert.equal(JSON.parse(h.$('#designFeedbackRecord').textContent).currentDesign.selected.palette,'blue');
 h.event('#paletteOptions [data-value="sage"]');h.event('#confirmPrompt');assert.equal(JSON.parse(h.$('#confirmedDesignRecord').textContent).design.selected.palette,'sage');
 h.event('[data-scheme="precise"]');h.event('#confirmPrompt');const confirmed=JSON.parse(h.$('#confirmedDesignRecord').textContent).design;assert.equal(confirmed.selected.palette,'sage');assert.equal(confirmed.selected.composition,'ledger');assert(confirmed.designIntent.adjustments.some(a=>a.field==='palette'));
 h.event('#restore');h.event('[data-scheme="precise"]');h.event('#confirmPrompt');assert.equal(JSON.parse(h.$('#confirmedDesignRecord').textContent).design.selected.palette,'blue');
 const prepared=await harness({brief:{id:'explicit-colors',context:{project:'workspace'},recommended:'clear',directions:{clear:{values:{palette:'blue'}},precise:{values:{palette:'violet'}}}}});prepared.event('#paletteOptions [data-value="sage"]');prepared.event('[data-scheme="precise"]');prepared.event('#confirmPrompt');assert.equal(JSON.parse(prepared.$('#confirmedDesignRecord').textContent).design.selected.palette,'violet');
});

test('pending drafts preserve later manual choices across reload and reject the earlier response',async()=>{
 const brief={id:'concurrent-notes',revision:'1',context:{project:'learning',stack:'vue'},recommended:'soft'};
 for(const change of [h=>h.event('#paletteOptions [data-value="violet"]'),h=>h.change('#appearance','dark'),h=>h.change('#language','en'),h=>h.event('[data-scheme="clear"]')]){
  const h=await harness({brief});h.change('#adjustmentInput','把正文行宽稍微放宽一点，其他先保持。','input');h.event('#submitAdjustment');const request=JSON.parse(h.$('#designFeedbackRecord').textContent).request;
  change(h);const edited=JSON.parse(h.$('#designFeedbackRecord').textContent).currentDesign.selected;
  const resumed=await harness({storage:[...h.storage],brief:{...brief,response:{status:'apply',requestId:request.id,baseSignature:request.baseSignature,patch:{textMeasure:'wide'},summary:['只放宽行宽','Only widen the reading measure']}}});
  const record=JSON.parse(resumed.$('#designFeedbackRecord').textContent);assert.equal(record.request.status,'pending');assert.deepEqual(record.currentDesign.selected,edited);assert.equal(record.requestMatchesCurrent,false);assert.equal(resumed.$('#confirmPrompt').disabled,true);
  resumed.event('#cancelAdjustment');assert.equal(resumed.$('#confirmPrompt').disabled,false);const reopened=await harness({storage:[...resumed.storage],brief});assert.deepEqual(JSON.parse(reopened.$('#designFeedbackRecord').textContent).currentDesign.selected,edited);
 }
});

test('a missing or failed working draft blocks automatic response application and keeps visible state',async()=>{
 const brief={id:'storage-notes',revision:'1',context:{project:'learning',stack:'vue'},recommended:'soft'};
 const h=await harness({brief,failSet:key=>key.endsWith(':feedback-draft')});h.change('#adjustmentInput','让行宽宽一些','input');h.event('#submitAdjustment');h.event('#paletteOptions [data-value="violet"]');
 const record=JSON.parse(h.$('#designFeedbackRecord').textContent);assert.equal(record.currentDesign.selected.palette,'violet');assert.equal(record.draftDurable,false);assert.match(h.$('#adjustmentStatus').textContent,/草稿无法保存/);
 const resumed=await harness({storage:[...h.storage],brief:{...brief,response:{status:'apply',requestId:record.request.id,baseSignature:record.request.baseSignature,patch:{textMeasure:'wide'},summary:['放宽行宽','Wider measure']}}});
 const after=JSON.parse(resumed.$('#designFeedbackRecord').textContent);assert.equal(after.request.status,'pending');assert.notEqual(after.currentDesign.selected.textMeasure,'wide');assert.match(resumed.$('#adjustmentStatus').textContent,/无法恢复/);assert.equal(resumed.$('#confirmPrompt').disabled,true);
});

test('choose-first confirms without a prompt dialog or source request; stale settings require reconfirmation',async()=>{
 const h=await harness();assert.equal(h.$('#confirmGenerate').disabled,true);
 h.change('#projectNameInput','Atlas / 图集','input');h.change('#taskInput','Compare records','input');h.change('#composition','split');h.change('#tone','warm');
 h.event('#confirmGenerate');assert.equal(h.requests.length,0);
 h.event('#confirmPrompt');assert(!h.$('#promptDialog').open);assert.equal(h.requests.length,0);assert.equal(h.clipboard.length,0);h.event('#viewPrompt');const prompt=h.$('#promptCode').textContent;
 assert(prompt.includes('Atlas / 图集'));assert.equal(h.$('#confirmGenerate').disabled,false);
 h.event('[data-close="promptDialog"]');h.change('#spacing','airy');
 assert.equal(h.$('#confirmGenerate').disabled,true);h.event('#viewPrompt');assert.equal(h.$('#promptCode').textContent,prompt);assert.match(h.$('#promptSnapshotStatus').textContent,/上次快照/);
 h.event('[data-close="promptDialog"]');h.event('#confirmPrompt');assert(!h.$('#promptDialog').open);h.event('#viewPrompt');assert.notEqual(h.$('#promptCode').textContent,prompt);
 h.event('[data-close="promptDialog"]');h.event('#confirmGenerate');h.event('#confirmGenerate');assert.equal(h.requests.length,1);
 const captured=h.requests[0];
 h.event('#paletteOptions [data-value="coral"]');await h.resolve();
 assert.equal(captured.design.selected.composition,'split');assert.equal(captured.design.selected.tone,'warm');assert.equal(captured.design.selected.palette,'blue');
 assert.match(h.$('#generationStatus').textContent,/上次确认/);
});

test('prompt-only never requests application source; prompt language changes leave the website contract intact',async()=>{
 const h=await harness();h.event('[data-mode="prompt"]');assert.equal(h.$('#confirmGenerate').hidden,true);
 h.event('#confirmPrompt');const original=h.$('#promptCode').textContent;h.change('#promptLanguage','en');
 assert.match(h.$('#promptCode').textContent,/# Confirmed design implementation prompt/);assert.notEqual(h.$('#promptCode').textContent,original);
 const blocks=[...h.$('#promptCode').textContent.matchAll(/```json\n([\s\S]*?)\n```/g)];const contract=JSON.parse(blocks[1][1]);assert.equal(contract.selected.language,'zh-CN');
 h.event('#copyPrompt');await h.flush();assert.equal(h.clipboard[0],h.$('#promptCode').textContent);
 h.event('#confirmGenerate');assert.equal(h.requests.length,0);
 h.event('[data-close="promptDialog"]');h.change('#spacing','airy');h.event('#confirmPrompt');assert.match(h.$('#promptCode').textContent,/# Confirmed design implementation prompt/);
});

test('direct mode skips the prompt gate, preserves chosen styling and packages a matching prompt',async()=>{
 const h=await harness();h.event('[data-scheme="glass"]');h.change('#iconStyle','square');h.event('[data-mode="direct"]');
 assert.equal(h.$('#confirmGenerate').disabled,false);assert.equal(h.$('#confirmPrompt').hidden,true);
 h.event('#confirmGenerate');assert.equal(h.requests.length,1);
 assert.equal(h.requests[0].design.selected.composition,'editorial');assert.equal(h.requests[0].design.selected.iconStyle,'square');assert(h.requests[0].designPrompt.includes('editorial'));
 await h.resolve();assert.equal(h.$('#generatedDialog').open,true);
});

test('comparison is view-only, reset restores the selected baseline, and canvas resizing preserves sample selection',async()=>{
 const h=await harness();h.event('#showAdvanced');h.event('[data-scheme="soft"]');h.change('#composition','ledger');h.change('#spacing','tight');
 h.event('#compareBaseline');assert.equal(h.$('#previewRoot .p-direction').dataset.composition,'split');assert.equal(h.$('#composition').value,'ledger');assert.equal(h.$('#confirmPrompt').disabled,true);
 h.event('#confirmPrompt');assert(!h.$('#promptDialog').open);
 h.event('#compareBaseline');assert.equal(h.$('#previewRoot .p-direction').dataset.composition,'ledger');
 h.event('#resetTweaks');assert.equal(h.$('#composition').value,'split');assert.equal(h.$('#spacing').value,'airy');
 h.event('#previewRoot [data-toggle]');h.change('#desktopWidth','3840');assert.equal(h.$('#previewRoot [data-toggle]').getAttribute('aria-pressed'),'true');
 h.change('#appearance','dark');assert.equal(h.$('#previewRoot [data-toggle]').getAttribute('aria-pressed'),'true');
 h.event('#save');const saved=JSON.parse(h.storage.get('adaptive-ui-design-studio-v1'));assert.equal(saved.composition,'split');assert.equal(saved.appearance,'dark');assert.equal(saved.workflowMode,'choose');
});

test('current conversation reads exact confirmed parameters without prompt copying or starter generation',async()=>{
 const h=await harness(),record=()=>JSON.parse(h.$('#confirmedDesignRecord').textContent);
 assert.equal(record().status,'unconfirmed');assert.equal(record().design,null);assert.equal(record().implementationEligible,false);
 h.change('#projectNameInput','Existing inventory','input');h.change('#constraintsInput','React router and real inventory API','input');h.event('#stackOptions [data-value="react"]');h.change('#composition','ledger');h.change('#headingWeight','bold');h.event('#confirmPrompt');
 const confirmed=record();assert.equal(confirmed.status,'current');assert.equal(confirmed.implementationEligible,true);assert.equal(confirmed.design.selected.stack,'react');assert.equal(confirmed.design.selected.composition,'ledger');assert.equal(confirmed.design.project.constraints,'React router and real inventory API');assert.equal(confirmed.design.tokens.light['--p-heading-weight'],'700');
 assert(!h.$('#promptDialog').open);assert(!h.$('#starterTools').open);assert.equal(h.requests.length,0);assert.equal(h.clipboard.length,0);
 h.change('#spacing','airy');assert.equal(record().status,'stale');assert.equal(record().implementationEligible,false);assert.deepEqual(record().design,confirmed.design);
 h.event('#confirmPrompt');const updated=record();assert.equal(updated.status,'current');assert.equal(updated.design.selected.spacing,'airy');
 h.event('#compareBaseline');assert.equal(record().implementationEligible,false);assert.equal(record().viewingBaseline,true);
 h.event('#compareBaseline');assert.equal(record().implementationEligible,true);
 h.event('[data-mode="prompt"]');assert.equal(record().implementationEligible,false);assert.equal(h.$('#starterTools').hidden,true);
 h.event('#viewPrompt');assert.match(h.$('#promptSnapshotStatus').textContent,/不会生成应用源码/);h.event('#confirmGenerate');assert.equal(h.requests.length,0);
});

