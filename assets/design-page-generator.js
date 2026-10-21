/* Browser-local source generation. No remote generation service or framework CDN. */
(function(root){
'use strict';
const versions={vue:'3.5.44',react:'19.3.1','react-dom':'19.3.1',vite:'8.3.4','@vitejs/plugin-vue':'6.0.10'};
const assetBase=typeof document!=='undefined'&&document.currentScript?new URL('.',document.currentScript.src):null;
const enc=new TextEncoder(),safeJSON=value=>JSON.stringify(value,null,2).replace(/</g,'\\u003c');
const htmlEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let resourcesPromise;
async function resources(){
 if(!assetBase||assetBase.protocol==='file:')throw new Error('LOCAL_HTTP_REQUIRED');
 if(!resourcesPromise)resourcesPromise=(async()=>{
  async function read(path,binary=false){const response=await fetch(new URL(path,assetBase));if(!response.ok)throw new Error('ASSET_UNAVAILABLE: '+path);return binary?new Uint8Array(await response.arrayBuffer()):response.text();}
  const [css,buttonCSS,contentCSS,desktopCSS,directionCSS,fontCss,manifest,selectJS,selectCSS,reactSelect,vueSelect]=await Promise.all([read('project-preview.css'),read('button-system.css'),read('content-layout.css'),read('desktop-layout.css'),read('design-directions.css'),read('font-faces.css'),read('fonts/manifest.json'),read('rounded-select.js'),read('rounded-select.css'),read('rounded-select.react.txt'),read('rounded-select.vue.txt')]);
  return {css:css+'\n'+buttonCSS+'\n'+contentCSS+'\n'+desktopCSS+'\n'+directionCSS,fontCss,manifest:JSON.parse(manifest),selectJS,selectCSS,reactSelect,vueSelect,readBytes:path=>read(path,true)};
 })().catch(error=>{resourcesPromise=null;throw error;});
 return resourcesPromise;
}
function crc32(bytes){let c=0xffffffff;for(const byte of bytes){c^=byte;for(let bit=0;bit<8;bit++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function zip(files){
 const chunks=[],central=[];let offset=0,centralSize=0;
 for(const file of files){
  if(!/^[\w./-]+$/.test(file.path)||file.path.includes('..')||file.path.startsWith('/'))throw new Error('Invalid archive path');
  const name=enc.encode(file.path),bytes=typeof file.content==='string'?enc.encode(file.content):file.content,crc=crc32(bytes);
  const head=new Uint8Array(30+name.length),v=new DataView(head.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint16(12,33,true);v.setUint32(14,crc,true);v.setUint32(18,bytes.length,true);v.setUint32(22,bytes.length,true);v.setUint16(26,name.length,true);head.set(name,30);
  const entry=new Uint8Array(46+name.length),e=new DataView(entry.buffer);e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint16(8,0x800,true);e.setUint16(14,33,true);e.setUint32(16,crc,true);e.setUint32(20,bytes.length,true);e.setUint32(24,bytes.length,true);e.setUint16(28,name.length,true);e.setUint32(42,offset,true);entry.set(name,46);
  chunks.push(head,bytes);central.push(entry);offset+=head.length+bytes.length;centralSize+=entry.length;
 }
 const end=new Uint8Array(22),v=new DataView(end.buffer);v.setUint32(0,0x06054b50,true);v.setUint16(8,files.length,true);v.setUint16(10,files.length,true);v.setUint32(12,centralSize,true);v.setUint32(16,offset,true);
 const result=new Uint8Array(offset+centralSize+end.length);let pos=0;for(const part of [...chunks,...central,end]){result.set(part,pos);pos+=part.length;}return result;
}
function dom(html){
 const doc=new DOMParser().parseFromString('<!doctype html><html><body>'+html+'</body></html>','text/html').body,seen=new Set();
 // Explicit IDs survive locale reordering. Ordinal IDs preserve legacy single-toggle scenes.
 Array.from(doc.querySelectorAll('[data-toggle]')).forEach((node,index)=>{
  const id=node.getAttribute('data-toggle')||'toggle-'+(index+1);
  if(seen.has(id))throw new Error('Duplicate toggle identifier: '+id);
  seen.add(id);node.setAttribute('data-toggle',id);if(!node.hasAttribute('aria-pressed'))node.setAttribute('aria-pressed','false');
 });return doc;
}
function toggleDefaults(scenes,language){return Object.fromEntries(Array.from(dom(scenes[language]).querySelectorAll('[data-toggle]'),node=>[node.getAttribute('data-toggle'),node.getAttribute('aria-pressed')==='true']));}
function reactMarkup(html){
 const voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
 function emit(node){
  if(node.nodeType===3)return '{'+JSON.stringify(node.textContent).replace(/</g,'\\u003c')+'}';
  if(node.nodeType!==1)return '';
  const tag=node.tagName.toLowerCase();if(['script','iframe','object','style'].includes(tag))throw new Error('Unsupported preview element: '+tag);
  const attrs=[];for(const a of node.attributes){
   if(/^on/i.test(a.name))continue;
   if(a.name==='data-detail'){attrs.push('onClick={onDetails}');continue;}
   if(a.name==='data-toggle'){const key=JSON.stringify(a.value).replace(/</g,'\\u003c');attrs.push('data-toggle={'+key+'}','onClick={()=>setPressed(value=>({...value,['+key+']:value['+key+']!==true}))}');continue;}
   if(a.name==='aria-pressed'&&node.hasAttribute('data-toggle')){attrs.push('aria-pressed={pressed['+JSON.stringify(node.getAttribute('data-toggle')).replace(/</g,'\\u003c')+']===true}');continue;}
   if(['disabled','hidden','required','multiple','autoFocus','autofocus'].includes(a.name)){attrs.push((a.name==='autofocus'?'autoFocus':a.name)+'={true}');continue;}
   if(a.name==='style'){const style={};for(const declaration of a.value.split(';')){const i=declaration.indexOf(':');if(i<0)continue;const raw=declaration.slice(0,i).trim(),key=raw.startsWith('--')?raw:raw.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());style[key]=declaration.slice(i+1).trim();}attrs.push('style={'+JSON.stringify(style)+'}');continue;}
   const name=({class:'className',for:'htmlFor',tabindex:'tabIndex',colspan:'colSpan',rowspan:'rowSpan','stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','fill-rule':'fillRule'})[a.name]||a.name;
   attrs.push(name+'={'+JSON.stringify(a.value).replace(/</g,'\\u003c')+'}');
  }
  const start='<'+tag+(attrs.length?' '+attrs.join(' '):'');
  return voids.has(tag)?start+' />':start+'>'+Array.from(node.childNodes).map(emit).join('')+'</'+tag+'>';
 }
 return Array.from(dom(html).childNodes).map(emit).join('');
}
function vueMarkup(html){
 const doc=dom(html);for(const node of doc.querySelectorAll('*')){
  if(['SCRIPT','IFRAME','OBJECT','STYLE'].includes(node.tagName))throw new Error('Unsupported preview element');
  for(const attr of Array.from(node.attributes))if(/^on/i.test(attr.name))node.removeAttribute(attr.name);
 }
 // Encode literal braces so content can never become a Vue template expression.
 for(const node of doc.querySelectorAll('[data-toggle]')){const key=JSON.stringify(node.getAttribute('data-toggle'));node.setAttribute('@click','togglePressed('+key+')');node.removeAttribute('aria-pressed');node.setAttribute(':aria-pressed','pressed['+key+'] === true');}
 return doc.innerHTML.replace(/data-detail(?:="")?/g,'@click="openDetails"').replace(/\{/g,'&#123;').replace(/\}/g,'&#125;');
}
function pageCss(source,design){
 if(!source.trim())throw new Error('Preview styles unavailable');
 const decl=mode=>Object.entries(design.tokens[mode]).map(([key,value])=>key+':'+value+';').join('');
 return `/* Generated from the confirmed design; colors and font stacks stay editable. */
:root{${decl('light')}color-scheme:light;background:var(--p-canvas)}html[data-theme="dark"]{${decl('dark')}color-scheme:dark}
*{box-sizing:border-box}body{margin:0;background:var(--p-canvas);color:var(--p-text);font:14px/1.6 var(--font-ui)}h1,h2,h3,h4,p{margin:0}button,input,select{font:inherit}button{cursor:pointer}button,input,select{color:inherit}button:focus-visible,select:focus-visible,input:focus-visible,a:focus-visible{outline:3px solid var(--p-accent);outline-offset:3px}[hidden]{display:none!important}
body{min-height:100vh;min-height:100dvh;container:desktop-viewport/inline-size}.page-shell{margin:auto}.page-tools{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:18px}.page-title{font-size:15px;font-weight:600}.page-options{display:flex;gap:10px;align-items:center}.page-options label{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--p-muted)}.page-options select{min-height:40px;padding:0 10px;border:1px solid var(--p-border);border-radius:var(--p-control-radius);background:var(--p-surface);color:var(--p-text)}.page-frame{container:canvas/inline-size}.page-footer{font-size:11px;color:var(--p-muted);margin-top:18px}
${source}
.p-layout.p-editorial{grid-template-columns:1fr}.project-preview{min-height:0}.page-dialog{font-family:var(--font-ui);width:440px;max-width:calc(100vw - 32px);max-height:calc(100dvh - 32px);overflow:auto;padding:24px;border:1px solid var(--p-border);border-radius:var(--p-dialog-radius);background:var(--p-surface);color:var(--p-text);box-shadow:var(--p-shadow)}.page-dialog::backdrop{background:rgb(15 23 42 / .5)}.page-dialog h2{font-size:21px}.page-dialog p{font-size:13px;color:var(--p-muted);margin:14px 0}.page-dialog label{display:flex;flex-direction:column;gap:8px;font-size:12px}.page-dialog input{border:1px solid var(--p-border);border-radius:var(--p-control-radius);padding:10px;background:var(--p-subtle);color:var(--p-text)}.page-dialog .p-action{margin-top:20px;float:right;min-height:44px}.page-dialog:after{content:'';display:block;clear:both}
@media(max-width:600px){.page-shell{padding:12px}.page-tools{align-items:flex-start;flex-direction:column}.page-options{width:100%;justify-content:space-between;flex-wrap:wrap}.page-options label{flex:1;min-width:120px}.page-options select{flex:1;min-width:0}.p-action{min-height:44px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
@media(prefers-reduced-transparency:reduce),(prefers-contrast:more){.project-preview .p-header,.project-preview .p-material-card{background:var(--p-surface)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}}
`;
}
const pageMessages={
 'zh-CN':{language:'语言',appearance:'外观',light:'日间',dark:'夜间',system:'跟随系统',details:'项目详情',description:'这是当前设计的示例页面，可将内容和交互接入实际业务。',name:'项目名称',done:'完成',sample:'示例内容 · 自适应桌面与移动端'},
 en:{language:'Language',appearance:'Appearance',light:'Light',dark:'Dark',system:'System',details:'Project details',description:'This page uses the selected design. Connect its content and interactions to your own product.',name:'Project name',done:'Done',sample:'Sample content · Responsive desktop and mobile layout'}
};
function messagesFor(design){const messages=JSON.parse(JSON.stringify(pageMessages));if(!design.selected.responsive){messages['zh-CN'].sample='示例内容 · 桌面版';messages.en.sample='Sample content · Desktop design';}return messages;}
function baseHead(design,titles,css,script,body){
 const s=design.selected,key='adaptive-page-'+s.project;
 const boot=`(()=>{let p={};try{p=JSON.parse(localStorage.getItem(${JSON.stringify(key)})||'{}')||{}}catch{}const lang=['zh-CN','en'].includes(p.language)?p.language:${JSON.stringify(s.language)};const appearance=['light','dark','system'].includes(p.appearance)?p.appearance:${JSON.stringify(s.appearance)};document.documentElement.lang=lang;document.documentElement.dataset.theme=appearance==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):appearance;})();`;
 return `<!doctype html>\n<html lang="${s.language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${htmlEscape(titles[s.language])}</title><link rel="stylesheet" href="${css?'./assets/':'/assets/'}font-faces.css">${css?'<link rel="stylesheet" href="./styles.css">':''}<script>${boot}</script>${script}</head><body>${body}</body></html>\n`;
}
function htmlFiles(design,scenes,titles){
 const s=design.selected;
 const toolbar=`<div class="page-tools"><strong class="page-title" id="pageTitle"></strong><div class="page-options"><label><span data-msg="language"></span><select id="pageLanguage"><option value="zh-CN">中文</option><option value="en">English</option></select></label><label><span data-msg="appearance"></span><select id="pageAppearance"><option value="light" data-msg="light"></option><option value="dark" data-msg="dark"></option><option value="system" data-msg="system"></option></select></label></div></div>`;
 const attrs=`class="project-preview" data-material="${s.material}" data-scope="${s.scope}" data-solid="${s.solidFallback}"`;
 const body=`<div class="page-shell aui-desktop-shell">${toolbar}<div class="page-frame aui-desktop-frame"><main ${attrs}><div data-locale="zh-CN"${s.language==='zh-CN'?'':' hidden'}>${scenes['zh-CN']}</div><div data-locale="en"${s.language==='en'?'':' hidden'}>${scenes.en}</div></main></div><p class="page-footer" data-msg="sample"></p></div><dialog class="page-dialog" id="pageDialog" aria-labelledby="dialogHeading"><h2 id="dialogHeading" data-msg="details"></h2><p data-msg="description"></p><label><span data-msg="name"></span><input id="projectName" maxlength="80"></label><button class="p-action" id="closeDialog" data-msg="done"></button></dialog>`;
 const js=`/* Current confirmed design; no studio controls or external runtime. */
const initial=${safeJSON(s)},titles=${safeJSON(titles)},messages=${safeJSON(messagesFor(design))},pressed=${safeJSON(toggleDefaults(scenes,s.language))};
let stored={};try{stored=JSON.parse(localStorage.getItem('adaptive-page-'+initial.project)||'{}')||{}}catch{}
let locale=['zh-CN','en'].includes(stored.language)?stored.language:initial.language,appearance=['light','dark','system'].includes(stored.appearance)?stored.appearance:initial.appearance;
const media=matchMedia('(prefers-color-scheme: dark)'),dialog=document.querySelector('#pageDialog');
function update(){const m=messages[locale];document.documentElement.lang=locale;document.documentElement.dataset.theme=appearance==='system'?(media.matches?'dark':'light'):appearance;document.title=titles[locale];document.querySelector('#pageTitle').textContent=titles[locale];document.querySelector('#pageLanguage').value=locale;document.querySelector('#pageAppearance').value=appearance;document.querySelectorAll('[data-msg]').forEach(el=>el.textContent=m[el.dataset.msg]);document.querySelectorAll('[data-locale]').forEach(el=>el.hidden=el.dataset.locale!==locale);try{localStorage.setItem('adaptive-page-'+initial.project,JSON.stringify({language:locale,appearance}))}catch{}window.AUISelect?.refreshAll();}
document.querySelector('#projectName').value=titles[locale];document.querySelector('#pageLanguage').addEventListener('change',e=>{locale=e.target.value;update()});document.querySelector('#pageAppearance').addEventListener('change',e=>{appearance=e.target.value;update()});document.querySelectorAll('[data-detail]').forEach(el=>el.addEventListener('click',()=>dialog.showModal()));document.querySelectorAll('[data-toggle]').forEach(el=>el.addEventListener('click',()=>{const key=el.getAttribute('data-toggle');Object.defineProperty(pressed,key,{value:pressed[key]!==true,writable:true,enumerable:true,configurable:true});syncToggles();}));function syncToggles(){document.querySelectorAll('[data-toggle]').forEach(toggle=>toggle.setAttribute('aria-pressed',String(pressed[toggle.getAttribute('data-toggle')]===true)));}syncToggles();document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());media.addEventListener('change',update);update();window.AUISelect.enhanceAll(document);window.AUISelect.refreshAll();\n`;
 return [{path:'index.html',content:baseHead(design,titles,true,'<script src="./assets/rounded-select.js" defer></script><script src="./app.js" defer></script>',body)},{path:'app.js',content:js}];
}
function reactFiles(design,scenes,titles){
 const s=design.selected;
 const app=`import React, { useEffect, useRef, useState } from 'react';
import design from '../design.json';
import './styles.css';
import RoundedSelect from './RoundedSelect.jsx';
const messages=${safeJSON(messagesFor(design))},titles=${safeJSON(titles)};
const key='adaptive-page-'+design.selected.project;
function initialPreferences(){let value={};try{value=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{}return {language:['zh-CN','en'].includes(value.language)?value.language:design.selected.language,appearance:['light','dark','system'].includes(value.appearance)?value.appearance:design.selected.appearance};}
function ProjectContent({locale,onDetails}){const [pressed,setPressed]=useState(()=>(${safeJSON(toggleDefaults(scenes,s.language))}));return locale==='zh-CN'?<>${reactMarkup(scenes['zh-CN'])}</>:<>${reactMarkup(scenes.en)}</>;}
export default function App(){
 const [preferences,setPreferences]=useState(initialPreferences),[name,setName]=useState(titles[design.selected.language]),dialog=useRef(null);
 const locale=preferences.language,m=messages[locale],s=design.selected;
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const sync=()=>{document.documentElement.dataset.theme=preferences.appearance==='system'?(media.matches?'dark':'light'):preferences.appearance;document.documentElement.lang=locale;document.title=titles[locale];};sync();media.addEventListener('change',sync);try{localStorage.setItem(key,JSON.stringify(preferences))}catch{}return ()=>media.removeEventListener('change',sync);},[preferences,locale]);
 return <><div className="page-shell aui-desktop-shell"><div className="page-tools"><strong className="page-title">{titles[locale]}</strong><div className="page-options"><RoundedSelect id="pageLanguage" label={m.language} value={locale} options={[{value:"zh-CN",label:"中文"},{value:"en",label:"English"}]} onChange={language=>setPreferences(p=>({...p,language}))}/><RoundedSelect id="pageAppearance" label={m.appearance} value={preferences.appearance} options={[{value:"light",label:m.light},{value:"dark",label:m.dark},{value:"system",label:m.system}]} onChange={appearance=>setPreferences(p=>({...p,appearance}))}/></div></div><div className="page-frame aui-desktop-frame"><main className="project-preview" data-material={s.material} data-scope={s.scope} data-solid={String(s.solidFallback)}><ProjectContent locale={locale} onDetails={()=>dialog.current.showModal()}/></main></div><p className="page-footer">{m.sample}</p></div><dialog className="page-dialog" ref={dialog} aria-labelledby="dialogHeading"><h2 id="dialogHeading">{m.details}</h2><p>{m.description}</p><label>{m.name}<input value={name} onChange={e=>setName(e.target.value)} maxLength={80}/></label><button className="p-action" onClick={()=>dialog.current.close()}>{m.done}</button></dialog></>;
}\n`;
 return [{path:'src/App.jsx',content:app},{path:'src/main.jsx',content:"import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\ncreateRoot(document.getElementById('root')).render(<App />);\n"},{path:'index.html',content:baseHead(design,titles,false,'','<div id="root"></div><script type="module" src="/src/main.jsx"></script>')},{path:'vite.config.js',content:"import { defineConfig } from 'vite';\nexport default defineConfig({ base: './' });\n"}];
}
function vueFiles(design,scenes,titles){
 const app=`<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import design from '../design.json';
import './styles.css';
import RoundedSelect from './RoundedSelect.vue';
const messages=${safeJSON(messagesFor(design))},titles=${safeJSON(titles)};
const s=design.selected,key='adaptive-page-'+s.project;
let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{}
const locale=ref(['zh-CN','en'].includes(saved.language)?saved.language:s.language),appearance=ref(['light','dark','system'].includes(saved.appearance)?saved.appearance:s.appearance),name=ref(titles[locale.value]),dialog=ref(null),m=computed(()=>messages[locale.value]);
const pressed=ref(${safeJSON(toggleDefaults(scenes,design.selected.language))});
function togglePressed(key){pressed.value={...pressed.value,[key]:pressed.value[key]!==true};}
let media;
function sync(){document.documentElement.lang=locale.value;document.title=titles[locale.value];document.documentElement.dataset.theme=appearance.value==='system'?(media?.matches?'dark':'light'):appearance.value;try{localStorage.setItem(key,JSON.stringify({language:locale.value,appearance:appearance.value}))}catch{}}
function openDetails(){dialog.value.showModal();}
watch([locale,appearance],sync);onMounted(()=>{media=matchMedia('(prefers-color-scheme: dark)');media.addEventListener('change',sync);sync();});onUnmounted(()=>media?.removeEventListener('change',sync));
</script>
<template><div class="page-shell aui-desktop-shell"><div class="page-tools"><strong class="page-title">{{ titles[locale] }}</strong><div class="page-options"><RoundedSelect id="pageLanguage" :label="m.language" v-model="locale" :options="[{value:'zh-CN',label:'中文'},{value:'en',label:'English'}]"/><RoundedSelect id="pageAppearance" :label="m.appearance" v-model="appearance" :options="[{value:'light',label:m.light},{value:'dark',label:m.dark},{value:'system',label:m.system}]"/></div></div><div class="page-frame aui-desktop-frame"><main class="project-preview" :data-material="s.material" :data-scope="s.scope" :data-solid="String(s.solidFallback)"><template v-if="locale==='zh-CN'">${vueMarkup(scenes['zh-CN'])}</template><template v-else>${vueMarkup(scenes.en)}</template></main></div><p class="page-footer">{{ m.sample }}</p></div><dialog ref="dialog" class="page-dialog" aria-labelledby="dialogHeading"><h2 id="dialogHeading">{{ m.details }}</h2><p>{{ m.description }}</p><label>{{ m.name }}<input v-model="name" maxlength="80"></label><button class="p-action" @click="dialog.close()">{{ m.done }}</button></dialog></template>\n`;
 return [{path:'src/App.vue',content:app},{path:'src/main.js',content:"import { createApp } from 'vue';\nimport App from './App.vue';\ncreateApp(App).mount('#app');\n"},{path:'index.html',content:baseHead(design,titles,false,'','<div id="app"></div><script type="module" src="/src/main.js"></script>')},{path:'vite.config.js',content:"import { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\nexport default defineConfig({ base: './', plugins: [vue()] });\n"}];
}
async function fontFiles(design,r,prefix){
 const needed=new Set([...design.tokens.light['--font-ui'].split(','),...design.tokens.light['--font-mono'].split(',')].map(x=>x.trim().replace(/^['"]|['"]$/g,'')));
 const blocks=(r.fontCss.match(/@font-face\s*\{[^}]*\}/g)||[]).filter(block=>{const m=block.match(/font-family:\s*['"]([^'"]+)['"]/);return m&&needed.has(m[1]);});
 if(!blocks.length)throw new Error('No bundled font declarations');
 const paths=[...new Set(blocks.flatMap(block=>Array.from(block.matchAll(/url\(['"]?(?:\.\/)?([^)'"\s]+)['"]?\)/g),m=>m[1])))];
 const fonts=r.manifest.packages.filter(p=>p.families.some(f=>needed.has(f)));
 const checks=new Map();for(const p of fonts)for(const [name,info] of Object.entries(p.files))checks.set('fonts/'+p.slug+'/'+name,info);
 const jobs=[...paths,...fonts.map(p=>'fonts/'+p.license_file)],results=new Array(jobs.length);let cursor=0;
 await Promise.all(Array.from({length:Math.min(6,jobs.length)},async()=>{while(cursor<jobs.length){const i=cursor++,path=jobs[i];if(!/^fonts\/[\w./-]+$/.test(path)||path.includes('..'))throw new Error('Invalid font path');const bytes=await r.readBytes(path);if(checks.has(path)){const info=checks.get(path);if(bytes.length!==info.bytes||String.fromCharCode(...bytes.slice(0,4))!=='wOF2')throw new Error('Invalid font asset: '+path);if(root.crypto?.subtle){const hash=Array.from(new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==info.sha256)throw new Error('Font hash mismatch: '+path);}}results[i]={path:prefix+path,content:bytes};}}));
 return [{path:prefix+'font-faces.css',content:'/* Selected font families and their declared fallbacks. Retain the included licenses. */\n'+blocks.join('\n')+'\n'},{path:prefix+'fonts/manifest.json',content:safeJSON({scope:'Selected preview fonts and declared fallbacks',packages:fonts})},...results];
}
async function generate(input,r){
 const design=JSON.parse(JSON.stringify(input.design)),s=design.selected,stack=s.stack;
 if(!['vue','react','html'].includes(stack))throw new Error('Choose a supported stack');
 design.confirmation={...design.confirmation,confirmedAt:design.confirmation?.confirmedAt||new Date().toISOString(),generatedAt:new Date().toISOString(),targetStack:stack,source:input.designPrompt?'confirmed-design-prompt':'studio-confirm-button'};
 const resourcesValue=r||await resources();
 if(!resourcesValue.selectJS||!resourcesValue.selectCSS||!resourcesValue.reactSelect||!resourcesValue.vueSelect)throw new Error('Rounded control resources unavailable');
 const scenes=Object.fromEntries(Object.entries(input.scenes).map(([locale,markup])=>[locale,dom(markup).innerHTML]));
 const files=stack==='html'?htmlFiles(design,scenes,input.titles):stack==='vue'?vueFiles(design,scenes,input.titles):reactFiles(design,scenes,input.titles);
 files.push({path:stack==='html'?'styles.css':'src/styles.css',content:pageCss(resourcesValue.css,design).replace(/\.page-options label/g,'.page-options :is(label,.aui-field)')+'\n'+resourcesValue.selectCSS},{path:'design.json',content:safeJSON(design)});
 if(stack==='html')files.push({path:'assets/rounded-select.js',content:resourcesValue.selectJS});
 else files.push({path:'src/rounded-select.js',content:resourcesValue.selectJS},{path:stack==='vue'?'src/RoundedSelect.vue':'src/RoundedSelect.jsx',content:stack==='vue'?resourcesValue.vueSelect:resourcesValue.reactSelect});
 if(stack!=='html'){
  const dependencies=stack==='vue'?{vue:versions.vue}:{react:versions.react,'react-dom':versions['react-dom']};
  const devDependencies=stack==='vue'?{vite:versions.vite,'@vitejs/plugin-vue':versions['@vitejs/plugin-vue']}:{vite:versions.vite};
  files.push({path:'package.json',content:safeJSON({name:'adaptive-'+s.project+'-'+stack,version:'1.0.0',private:true,type:'module',scripts:{dev:'vite --host 127.0.0.1',build:'vite build',preview:'vite preview --host 127.0.0.1'},engines:{node:'>=22.12.0'},dependencies,devDependencies})});
 }
 const readme=`# ${input.titles[s.language]} / ${stack.toUpperCase()}\n\nGenerated from the current confirmed Adaptive Studio selection.\n基于确认时的当前搭配生成，design.json 保留完整配置与确认时间。\n\n## Run / 运行\n\n${stack==='html'?'No framework installation required. Open index.html, or serve this folder with:\n无需框架依赖，可打开 index.html；推荐本地预览：\n\n    python -m http.server 8000 --bind 127.0.0.1\n\nOpen http://127.0.0.1:8000/':'Requires Node.js 22.12+ and npm. The first install needs registry access.\n需要 Node.js 22.12+ 与 npm，首次安装依赖需要联网。\n\n    npm install\n    npm run dev\n\nProduction build / 构建：\n\n    npm run build\n    npm run preview'}\n\n${s.responsive?'Selected scope: desktop, tablet and mobile.':'Selected scope: desktop. Existing fluid sizing remains a fallback; dedicated tablet/mobile design was not selected.'} The preview width does not lock the output width.\n${s.responsive?'已选择桌面、平板与手机适配。':'本次按桌面版交付，保留基本流式缩放；未额外选择平板或手机设计。'}预览宽度不限制生成页宽度。\n\nIncludes Chinese/English, light/dark/system, a native detail dialog, and local font assets.\n含中英文、日夜/系统模式、详情弹层与本地字体。Sample product data remains illustrative; connect real APIs as needed. 示例数据请替换为业务内容。\n\n## Fonts / 字体\n\nKeep assets/fonts licenses (under public/ for Vue/React). Only selected families and declared fallbacks are packaged. Proprietary local fonts such as Microsoft YaHei, Segoe UI and Consolas remain device-dependent.\n保留字体许可证；仅打包所选字体及声明的回退字体。本机专有字体仍依赖设备，不会安装到系统。\n\nConfirmation creates these local files only; it does not publish a site, change a repository, or trigger an agent in another chat.\n确认只生成当前源码，不发布网站、不修改现有仓库，也不会唤醒其他聊天。\n`;
 files.push({path:'README.md',content:readme});
 if(typeof input.designPrompt==='string')files.push({path:'DESIGN-PROMPT.md',content:input.designPrompt});
 files.push(...await fontFiles(design,resourcesValue,stack==='html'?'assets/':'public/assets/'));
 return {stack,design,files,mainFile:stack==='html'?'index.html':stack==='vue'?'src/App.vue':'src/App.jsx',archive:zip(files)};
}
const api={generate,zip,reactMarkup,vueMarkup,pageCss,versions};root.AdaptivePageGenerator=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
