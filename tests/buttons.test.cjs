const test=require('node:test'),assert=require('node:assert/strict'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {generator:G,model:M,catalog,snapshot,resources}=require('./helpers.cjs');
test('old preferences get defaults; button choices remain custom and survive each export',async()=>{
 const legacy=M.normalize({version:1,palette:'sage'},catalog);assert.equal(legacy.buttonSize,'standard');
 const r=await resources();
 for(const stack of M.choices.stack){
  const input=snapshot({stack,buttonSize:'prominent',buttonShape:'pill',buttonStyle:'outline'});
  assert(M.isCustom(input.design.selected,M.recommend(input.design.selected)));
  const result=await G.generate(input,r),t=result.design.tokens;
  assert.equal(t.light['--p-button-height'],'48px');assert.equal(t.dark['--p-button-radius'],'999px');
  assert.equal(t.light['--p-button-bg'],t.light['--p-surface']);assert.equal(result.design.selected.buttonStyle,'outline');
 }
});
test('disabled, busy and toggle semantics survive actual React server rendering',async()=>{
 const {transform}=await import('esbuild');
 const input='<button disabled aria-busy="true">Saving</button><button data-toggle aria-pressed="false">Follow</button>';
 const jsx=G.reactMarkup(input),source='module.exports=function(){const pressed={"toggle-1":true};return <>'+jsx+'</>}';
 const compiled=await transform(source,{loader:'jsx',format:'cjs'}),moduleObject={exports:{}};
 new Function('module','React',compiled.code)(moduleObject,React);
 const html=renderToStaticMarkup(React.createElement(moduleObject.exports));
 const doc=new DOMParser().parseFromString(html,'text/html'),buttons=doc.querySelectorAll('button');
 assert(buttons[0].hasAttribute('disabled'));assert.equal(buttons[0].getAttribute('aria-busy'),'true');assert.equal(buttons[1].getAttribute('aria-pressed'),'true');
 assert(G.vueMarkup(input).includes(':aria-pressed='));
});
test('multiple toggles are independent and matched by stable ID across reordered locales',async()=>{
 const scenes={
  'zh-CN':'<button data-toggle="step-free" aria-pressed="false">无障碍空间</button><button data-toggle="available" aria-pressed="false">只看可预约</button>',
  en:'<button data-toggle="available" aria-pressed="false">Available rooms only</button><button data-toggle="step-free" aria-pressed="false">Step-free rooms only</button>'
 };
 const result=await G.generate(snapshot({stack:'html'},scenes),await resources());
 const doc=new DOMParser().parseFromString(result.files.find(f=>f.path==='index.html').content,'text/html');
 require('node:vm').runInNewContext(result.files.find(f=>f.path==='app.js').content,{document:doc,window:{AUISelect:{enhanceAll(){},refreshAll(){}}},localStorage:{getItem(){return null},setItem(){}},matchMedia(){return {matches:false,addEventListener(){}}}});
 doc.querySelector('[data-locale="zh-CN"] [data-toggle="step-free"]').dispatchEvent(new doc.defaultView.Event('click'));
 for(const locale of ['zh-CN','en']){
  assert.equal(doc.querySelector(`[data-locale="${locale}"] [data-toggle="step-free"]`).getAttribute('aria-pressed'),'true');
  assert.equal(doc.querySelector(`[data-locale="${locale}"] [data-toggle="available"]`).getAttribute('aria-pressed'),'false');
 }
 const {transform}=await import('esbuild');
 const source='module.exports=({pressed,setPressed})=><>'+G.reactMarkup(scenes.en)+'</>';
 const code=(await transform(source,{loader:'jsx',format:'cjs'})).code,holder={exports:{}};
 new Function('module','React',code)(holder,React);
 let pressed={};const render=()=>holder.exports({pressed,setPressed:fn=>pressed=fn(pressed)});
 React.Children.toArray(render().props.children)[1].props.onClick();
 const buttons=React.Children.toArray(render().props.children);
 assert.equal(buttons[0].props['aria-pressed'],false);assert.equal(buttons[1].props['aria-pressed'],true);
 assert.throws(()=>G.reactMarkup('<button data-toggle="same"></button><button data-toggle="same"></button>'),/Duplicate toggle/);
});
test('all sizes, fills and shapes produce distinct usable tokens in both appearances',()=>{
 for(const buttonSize of M.choices.buttonSize)for(const buttonShape of M.choices.buttonShape)for(const buttonStyle of M.choices.buttonStyle)for(const theme of ['light','dark']){
  const t=M.tokens({...M.defaults,buttonSize,buttonShape,buttonStyle},theme,catalog);
  assert(parseInt(t['--p-button-height'])>=32);assert(parseInt(t['--p-button-font'])>=13);
  assert(t['--p-button-bg']);assert(t['--p-button-fg']);assert(t['--p-button-radius']);
 }
});
