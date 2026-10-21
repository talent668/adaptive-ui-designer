const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {parseHTML}=require('linkedom');
const {root,model:M,catalog}=require('./helpers.cjs'),S=require('../assets/design-scenes.js'),P=require('../assets/design-prompt.js');

// Actual chooser controller with an in-memory DOM. No native layout/focus claim.
async function harness(){
 const {document,window}=parseHTML(fs.readFileSync(path.join(root,'examples/design-studio.html'),'utf8'));
 const $=s=>document.querySelector(s),listeners={},storage=new Map(),requests=[],clipboard=[];let focused=null,pending=null;
 window.HTMLElement.prototype.focus=function(){focused=this;};
 for(const select of document.querySelectorAll('select')){
  Object.defineProperty(select,'value',{get(){return this._value??this.querySelector('option[selected]')?.value??this.querySelector('option')?.value??'';},set(v){this._value=v;}});
  select.add=function(option){this.append(option);};
 }
 for(const dialog of document.querySelectorAll('dialog')){dialog.showModal=()=>{dialog.open=true;};dialog.close=()=>{dialog.open=false;};}
 const hostWindow={addEventListener:(key,fn)=>listeners[key]=fn,AdaptiveStudioModel:M,AdaptiveScenes:S,AdaptiveDesignPrompt:P,
  AdaptiveUIFontKit:{catalog,apply(){},status:async()=>{throw Error('Font loading is not covered by this DOM fixture');}},
  AUISelect:{enhanceAll(){},refreshAll(){}},
  AdaptivePageGenerator:{generate:input=>{requests.push(input);return new Promise(resolve=>{pending=()=>resolve({stack:input.design.selected.stack,design:input.design,files:[{path:'index.html',content:'<main>fixture</main>'},{path:'DESIGN-PROMPT.md',content:input.designPrompt}],mainFile:'index.html',archive:new Uint8Array()});});}}
 };
 vm.runInNewContext(fs.readFileSync(path.join(root,'assets/design-studio.js'),'utf8'),{document,window:hostWindow,matchMedia:()=>({matches:false,addEventListener(){}}),CSS:{supports:()=>true},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Option:function(label,value){const e=document.createElement('option');e.textContent=label;e.value=value;return e;},ResizeObserver:class{observe(){}},URL:{createObjectURL:()=> 'blob:test-fixture',revokeObjectURL(){}},Blob,Uint8Array,setTimeout:()=>0,navigator:{clipboard:{writeText:async value=>clipboard.push(value)}}});
 listeners.DOMContentLoaded();await Promise.resolve();await Promise.resolve();
 const event=(selector,type='click')=>$(selector).dispatchEvent(new window.Event(type,{bubbles:true,cancelable:true}));
 const change=(selector,value,type='change')=>{$(selector).value=value;event(selector,type);};
 const flush=async()=>{await Promise.resolve();await Promise.resolve();};
 const resolve=async()=>{assert(pending);pending();pending=null;await flush();};
 return {$,event,change,requests,clipboard,storage,resolve,flush,focus:()=>focused};
}

test('choose-first mode gates source behind a matching immutable prompt; stale settings require reconfirmation',async()=>{
 const h=await harness();assert.equal(h.$('#confirmGenerate').disabled,true);
 h.change('#projectNameInput','Atlas / 图集','input');h.change('#taskInput','Compare records','input');h.change('#composition','split');h.change('#tone','warm');
 h.event('#confirmGenerate');assert.equal(h.requests.length,0);
 h.event('#confirmPrompt');assert.equal(h.$('#promptDialog').open,true);const prompt=h.$('#promptCode').textContent;
 assert(prompt.includes('Atlas / 图集'));assert.equal(h.$('#confirmGenerate').disabled,false);
 h.event('[data-close="promptDialog"]');h.change('#spacing','airy');
 assert.equal(h.$('#confirmGenerate').disabled,true);h.event('#viewPrompt');assert.equal(h.$('#promptCode').textContent,prompt);assert.match(h.$('#promptSnapshotStatus').textContent,/上次快照/);
 h.event('[data-close="promptDialog"]');h.event('#confirmPrompt');assert.notEqual(h.$('#promptCode').textContent,prompt);
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
 const h=await harness();h.event('[data-scheme="soft"]');h.change('#composition','ledger');h.change('#spacing','tight');
 h.event('#compareBaseline');assert.equal(h.$('#previewRoot .p-direction').dataset.composition,'split');assert.equal(h.$('#composition').value,'ledger');assert.equal(h.$('#confirmPrompt').disabled,true);
 h.event('#confirmPrompt');assert(!h.$('#promptDialog').open);
 h.event('#compareBaseline');assert.equal(h.$('#previewRoot .p-direction').dataset.composition,'ledger');
 h.event('#resetTweaks');assert.equal(h.$('#composition').value,'split');assert.equal(h.$('#spacing').value,'airy');
 h.event('#previewRoot [data-toggle]');h.change('#desktopWidth','3840');assert.equal(h.$('#previewRoot [data-toggle]').getAttribute('aria-pressed'),'true');
 h.change('#appearance','dark');assert.equal(h.$('#previewRoot [data-toggle]').getAttribute('aria-pressed'),'true');
 h.event('#save');const saved=JSON.parse(h.storage.get('adaptive-ui-design-studio-v1'));assert.equal(saved.composition,'split');assert.equal(saved.appearance,'dark');assert.equal(saved.workflowMode,'choose');
});
