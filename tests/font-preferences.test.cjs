const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function fontKit(installed){
 class FontFace{constructor(alias,source){this.name=JSON.parse(source.slice(6,-1));}async load(){if(!installed.includes(this.name))throw Error('Unavailable');return this;}}
 const context={window:{FontFace},FontFace,document:{fonts:{}}};
 vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../assets/font-preferences.js'),'utf8'),context);
 return context.window.AdaptiveUIFontKit;
}
test('font availability never reports a monospace fallback absent from its declared CSS stack',async()=>{
 const kit=fontKit(['JetBrains Mono']);
 for(const mono of ['plex-mono','geist-mono']){
  const state=await kit.status({mono});assert.equal(state.code.available,false);assert.equal(state.monoFallback,null);
  assert(!kit.stack({mono}).mono.includes('JetBrains Mono'));
 }
});
test('font availability reports the first available monospace and Chinese fallback in CSS order',async()=>{
 const kit=fontKit(['JetBrains Mono','Cascadia Mono','Consolas','Microsoft YaHei']);
 const state=await kit.status({ui:'noto-sc',mono:'geist-mono'});
 assert.equal(state.monoFallback.family,'Cascadia Mono');assert.equal(state.cjkFallback.family,'Microsoft YaHei');
 const onlyConsolas=await fontKit(['Consolas']).status({mono:'jetbrains-mono'});
 assert.equal(onlyConsolas.monoFallback.family,'Consolas');
});
test('the accepted Noto CJK local alias is actually present in every applicable CSS stack',async()=>{
 const kit=fontKit(['Noto Sans CJK SC']);
 for(const preset of kit.catalog.uiPresets){
  if(!preset.stack.includes('"Noto Sans SC"'))continue;
  assert(preset.stack.includes('"Noto Sans CJK SC"'));
 }
 const state=await kit.status({ui:'noto-sc'});
 assert.equal(state.cjk.available,true);assert.equal(state.cjk.resolvedLocalName,'Noto Sans CJK SC');
 assert(kit.stack({ui:'noto-sc'}).ui.includes('"'+state.cjk.resolvedLocalName+'"'));
});
