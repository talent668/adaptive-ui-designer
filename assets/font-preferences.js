/* Generated from font-catalog.json. No network API or OS font installation. */
window.AdaptiveUIFontKit=(()=>{
const catalog={"version":1,"defaults":{"ui":"inter-yahei","mono":"jetbrains-mono"},"fonts":{"inter":{"label":"Inter","family":"Inter Variable","kind":"bundled","sample":"Interface 0123456789"},"segoe":{"label":"Segoe UI","family":"Segoe UI","kind":"local","localNames":["Segoe UI"],"sample":"Interface 0123456789"},"yahei":{"label":"微软雅黑","family":"Microsoft YaHei","kind":"local","localNames":["Microsoft YaHei","微软雅黑"],"sample":"界面设计中文数字"},"dengxian":{"label":"等线","family":"DengXian","kind":"local","localNames":["DengXian","等线"],"sample":"界面设计中文数字"},"source-han":{"label":"Source Han Sans（思源黑体）","family":"Source Han Sans SC VF","kind":"bundled","sample":"界面设计任务项目审核工作台中文样本，。0123456789"},"noto-sc":{"label":"Noto Sans SC","family":"Noto Sans SC Variable","kind":"bundled","sample":"界面设计任务项目审核工作台中文样本，。0123456789"},"plex-sans":{"label":"IBM Plex Sans","family":"IBM Plex Sans Variable","kind":"bundled","sample":"Interface 0123456789"},"geist":{"label":"Geist","family":"Geist Variable","kind":"bundled","sample":"Interface 0123456789"},"jakarta":{"label":"Plus Jakarta Sans","family":"Plus Jakarta Sans Variable","kind":"bundled","sample":"Interface 0123456789"},"plex-mono":{"label":"IBM Plex Mono","family":"IBM Plex Mono","kind":"bundled","sample":"Il1 O0 0123456789 {} =>"},"cascadia-mono":{"label":"Cascadia Mono","family":"Cascadia Mono","kind":"bundled","sample":"Il1 O0 0123456789 {} =>"},"jetbrains-mono":{"label":"JetBrains Mono","family":"JetBrains Mono Variable","kind":"bundled","sample":"Il1 O0 0123456789 {} =>"},"geist-mono":{"label":"Geist Mono","family":"Geist Mono Variable","kind":"bundled","sample":"Il1 O0 0123456789 {} =>"},"consolas":{"label":"Consolas","family":"Consolas","kind":"local","localNames":["Consolas"],"sample":"Il1 O0 0123456789 {} =>"}},"uiPresets":[{"id":"inter-yahei","label":"Inter + 微软雅黑","latin":"inter","cjk":"yahei","cjkFallback":["noto-sc"],"stack":"\"Inter Variable\", \"Inter\", \"Microsoft YaHei\", \"Noto Sans SC Variable\", system-ui, sans-serif"},{"id":"segoe-yahei","label":"Segoe UI + 微软雅黑","latin":"segoe","cjk":"yahei","cjkFallback":["noto-sc"],"stack":"\"Segoe UI\", \"Microsoft YaHei\", \"Noto Sans SC Variable\", system-ui, sans-serif"},{"id":"noto-sc","label":"Noto Sans SC","latin":"noto-sc","cjk":"noto-sc","cjkFallback":[],"stack":"\"Noto Sans SC Variable\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"},{"id":"plex-source-han","label":"IBM Plex Sans + 思源黑体","latin":"plex-sans","cjk":"source-han","cjkFallback":["yahei"],"stack":"\"IBM Plex Sans Variable\", \"Source Han Sans SC VF\", \"Microsoft YaHei\", system-ui, sans-serif"},{"id":"geist-source-han","label":"Geist + 思源黑体","latin":"geist","cjk":"source-han","cjkFallback":["yahei"],"stack":"\"Geist Variable\", \"Source Han Sans SC VF\", \"Microsoft YaHei\", system-ui, sans-serif"},{"id":"jakarta-yahei","label":"Plus Jakarta Sans + 微软雅黑","latin":"jakarta","cjk":"yahei","cjkFallback":["noto-sc"],"stack":"\"Plus Jakarta Sans Variable\", \"Plus Jakarta Sans\", \"Microsoft YaHei\", \"Noto Sans SC Variable\", system-ui, sans-serif"},{"id":"segoe-dengxian","label":"Segoe UI + 等线","latin":"segoe","cjk":"dengxian","cjkFallback":["yahei","noto-sc"],"stack":"\"Segoe UI\", \"DengXian\", \"等线\", \"Microsoft YaHei\", \"Noto Sans SC Variable\", system-ui, sans-serif"}],"monoPresets":[{"id":"plex-mono","label":"IBM Plex Mono","primary":"plex-mono","stack":"\"IBM Plex Mono\", \"JetBrains Mono Variable\", \"Consolas\", \"Noto Sans SC Variable\", ui-monospace, monospace"},{"id":"cascadia-mono","label":"Cascadia Mono","primary":"cascadia-mono","stack":"\"Cascadia Mono\", \"JetBrains Mono Variable\", \"Consolas\", \"Noto Sans SC Variable\", ui-monospace, monospace"},{"id":"jetbrains-mono","label":"JetBrains Mono","primary":"jetbrains-mono","stack":"\"JetBrains Mono Variable\", \"JetBrains Mono\", \"Consolas\", \"Noto Sans SC Variable\", ui-monospace, monospace"},{"id":"geist-mono","label":"Geist Mono","primary":"geist-mono","stack":"\"Geist Mono Variable\", \"Geist Mono\", \"JetBrains Mono Variable\", \"Consolas\", \"Noto Sans SC Variable\", ui-monospace, monospace"},{"id":"consolas","label":"Consolas","primary":"consolas","stack":"\"Consolas\", \"JetBrains Mono Variable\", \"Noto Sans SC Variable\", ui-monospace, monospace"}]};
const cache=new Map();
function normalize(value){return {version:1,ui:catalog.uiPresets.some(p=>p.id===value?.ui)?value.ui:catalog.defaults.ui,mono:catalog.monoPresets.some(p=>p.id===value?.mono)?value.mono:catalog.defaults.mono};}
function stack(value){const p=normalize(value);return {ui:catalog.uiPresets.find(x=>x.id===p.ui).stack,mono:catalog.monoPresets.find(x=>x.id===p.mono).stack};}
function apply(element,value){const p=normalize(value),s=stack(p);element.style.setProperty('--font-ui',s.ui);element.style.setProperty('--font-mono',s.mono);element.dataset.uiFont=p.ui;element.dataset.monoFont=p.mono;return p;}
function read(storageKey){try{return normalize(JSON.parse(localStorage.getItem(storageKey)||'null'));}catch{return normalize(null);}}
function save(storageKey,value){try{localStorage.setItem(storageKey,JSON.stringify(normalize(value)));return true;}catch{return false;}}
function resolveFont(id){
 if(cache.has(id))return cache.get(id);
 const font=catalog.fonts[id];
 const promise=(async()=>{
  if(!font)return {id,available:false,reason:'未知字体'};
  if(!document.fonts||!window.FontFace)return {id,...font,available:false,reason:'当前环境无法确认字体状态'};
  try{
   if(font.kind==='local'){
    for(const name of font.localNames){
     try{const probe=new FontFace('AUI-Probe-'+id,'local('+JSON.stringify(name)+')',{style:'normal',weight:'400'});await probe.load();return {id,...font,available:true,resolvedLocalName:name,reason:'本机可用'};}catch{}
    }
    return {id,...font,available:false,reason:'本机或浏览器未能解析'};
   }
   const loaded=await Promise.all([400,500,600].map(w=>document.fonts.load(w+' 16px '+JSON.stringify(font.family),font.sample)));
   const available=loaded.every(faces=>faces.length>0&&faces.every(f=>f.status==='loaded'));
   return {id,...font,available,reason:available?'随包字体已加载':'未找到可加载字体声明'};
  }catch{return {id,...font,available:false,reason:'字体加载失败，使用回退'};}
 })();cache.set(id,promise);return promise;
}
async function status(value){
 const p=normalize(value),ui=catalog.uiPresets.find(x=>x.id===p.ui),mono=catalog.monoPresets.find(x=>x.id===p.mono);
 const [latin,cjk,code]=await Promise.all([resolveFont(ui.latin),resolveFont(ui.cjk),resolveFont(mono.primary)]);
 let cjkFallback=null,monoFallback=null;
 if(!cjk.available){for(const id of ui.cjkFallback){const found=await resolveFont(id);if(found.available){cjkFallback=found;break;}}}
 if(!code.available&&mono.primary!=='jetbrains-mono'){const found=await resolveFont('jetbrains-mono');if(found.available)monoFallback=found;}
 return {preference:p,latin,cjk,cjkFallback,code,monoFallback};
}
return Object.freeze({catalog,normalize,stack,apply,read,save,status,resolveFont});

})();
