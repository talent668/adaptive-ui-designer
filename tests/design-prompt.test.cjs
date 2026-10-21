const test=require('node:test'),assert=require('node:assert/strict');
const {model:M,catalog,snapshot,generator:G,resources}=require('./helpers.cjs');
const P=require('../assets/design-prompt.js'),S=require('../assets/design-scenes.js');

test('modes default to selection; explicit direct/prompt and legacy style intent survive normalization',()=>{
 assert.equal(M.normalize({},catalog).workflowMode,'choose');
 for(const workflowMode of M.choices.workflowMode){const s=M.normalize({workflowMode,scheme:'soft',project:'learning',projectName:'Study / 学习'},catalog);assert.equal(s.workflowMode,workflowMode);assert.equal(s.composition,'split');assert.equal(s.projectName,'Study / 学习');}
 assert.equal(M.normalize({workflowMode:'auto-publish'},catalog).workflowMode,'choose');
 const s=M.normalize({composition:'ledger',tone:'warm',cardStyle:'flat',iconSize:'large'},catalog);
 assert(M.isCustom(s,M.recommend(s)));
 assert.equal(M.signature(s),M.signature({...s,workflowMode:'prompt'}));
 assert.notEqual(M.signature(s),M.signature({...s,spacing:'airy'}));
});

test('four compositions change actual structure while retaining comparable project content',()=>{
 for(const project of M.choices.project)for(const language of ['zh-CN','en']){
  const structures=[];
  for(const composition of M.choices.composition){
   const state=M.normalize({project,language,composition,palette:'blue',tone:'neutral',material:'solid'},catalog);
   const doc=new DOMParser().parseFromString(S.render(state),'text/html');
   structures.push([...doc.querySelectorAll('*')].map(el=>el.tagName).join('/'));
   assert(doc.querySelector('h2'));
   if(['workspace','product'].includes(project))assert.equal(doc.querySelectorAll('[data-task-id]').length,3,'Keep the same task records across directions');
   if(project==='developer')assert(doc.querySelector('.p-code'));
   for(const button of doc.querySelectorAll('button'))assert(button.textContent.trim()||button.getAttribute('aria-label'));
   const text=doc.querySelector('.p-direction').textContent;
   if(S.scenarios[project].cards)for(const title of S.scenarios[project].cards)assert(text.includes(title[language==='en'?1:0]));
   else for(const id of project==='developer'?['DEP-014','DEP-015','DEP-016']:['PRJ-014','PRJ-015','PRJ-016'])assert(text.includes(id));
  }
  assert.equal(new Set(structures).size,4,project+' needs distinct DOM compositions, not palette variants');
 }
 const hostile=M.normalize({projectName:'<script>not markup</script>',primaryTask:'<img src=x onerror=alert(1)>',brief:'& " < >'},catalog);
 for(const composition of M.choices.composition){const doc=new DOMParser().parseFromString(S.render({...hostile,composition}),'text/html');assert(!doc.querySelector('script'));assert(!doc.querySelector('img'));assert(doc.querySelector('.p-direction').textContent.includes(hostile.projectName));}
});

test('confirmed prompt captures exact configuration, both themes and context without mutating its input',()=>{
 const input=snapshot({workflowMode:'prompt',project:'showcase',projectName:'Atlas / 图集',audience:'研究者',primaryTask:'Compare documents',constraints:'Use the existing Vue router. Keep keyboard navigation.',composition:'editorial',tone:'warm',palette:'coral',typeScale:'editorial',headingWeight:'bold',lineHeight:'loose',textMeasure:'narrow',iconStyle:'duotone',iconSize:'large',cardStyle:'outlined',widthPolicy:'focused',stack:'vue'}).design;
 input.project={name:'Atlas',brief:'Project context'};input.fontAssets={css:'assets/font-faces.css',licenses:'assets/fonts/manifest.json'};
 const before=JSON.stringify(input),confirmedAt='2026-10-21T12:00:00.000Z';
 for(const locale of ['zh-CN','en']){
  const result=P.build(input,{locale,confirmedAt});
  assert.equal(JSON.stringify(input),before);assert(Object.isFrozen(result.snapshot.tokens.light));
  assert.equal(result.snapshot.selected.projectName,'Atlas / 图集');assert.equal(result.snapshot.confirmation.confirmedAt,confirmedAt);
  assert.deepEqual(result.snapshot.tokens,input.tokens);assert(result.text.includes('assets/fonts/manifest.json'));
  assert.equal(result.snapshot.tokens.light['--p-heading-weight'],'700');assert.equal(result.snapshot.tokens.light['--p-leading'],'1.95');assert.equal(result.snapshot.tokens.light['--p-text-measure'],'56ch');
  assert.deepEqual(result.snapshot.icons.paths,S.iconPaths);assert.equal(result.snapshot.layoutRecipe.navigation,'top navigation');
  const blocks=[...result.text.matchAll(/```json\n([\s\S]*?)\n```/g)].map(m=>JSON.parse(m[1]));
  assert.equal(blocks.length,2);assert.deepEqual(blocks[1],result.snapshot);
  assert.equal(blocks[1].selected.stack,'vue');assert.equal(blocks[1].selected.iconStyle,'duotone');
 }
 const captured=P.build(input);input.selected.palette='blue';assert.equal(captured.snapshot.selected.palette,'coral');
 assert.throws(()=>P.build({selected:{...M.defaults,composition:'missing',stack:'html'},tokens:input.tokens}),/composition/);
});

test('all source targets carry the identical confirmed prompt and preserve real layout/icon state',async()=>{
 const r=await resources();
 for(const stack of ['html','react','vue']){
  const input=snapshot({stack,composition:'split',tone:'warm',iconStyle:'square',cardStyle:'flat'});
  input.scenes=Object.fromEntries(['zh-CN','en'].map(language=>[language,S.render({...input.design.selected,language})]));
  const prompt=P.build(input.design,{confirmedAt:'2026-10-21T12:00:00.000Z'});
  const result=await G.generate({...input,design:prompt.snapshot,designPrompt:prompt.text},r);
  assert.equal(result.files.find(f=>f.path==='DESIGN-PROMPT.md').content,prompt.text);
  assert.equal(result.design.confirmation.confirmedAt,prompt.snapshot.confirmation.confirmedAt);
  assert.deepEqual(result.design.selected,prompt.snapshot.selected);assert.deepEqual(result.design.tokens,prompt.snapshot.tokens);
  const code=result.files.find(f=>f.path===result.mainFile).content;assert(code.includes('p-split-layout'));assert(code.includes('p-semantic-icon'));
  if(stack==='react'){
   const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{transform}=await import('esbuild');
   const compiled=await transform('module.exports=()=>{const pressed={};const setPressed=()=>{};const onDetails=()=>{};return <>'+G.reactMarkup(input.scenes.en)+'</>}',{loader:'jsx',format:'cjs'}),holder={exports:{}};
   new Function('module','React',compiled.code)(holder,React);
   const doc=new DOMParser().parseFromString(renderToStaticMarkup(React.createElement(holder.exports)),'text/html');
   assert.equal(doc.querySelector('.p-direction').getAttribute('data-icon-style'),'square');
  }else assert(code.includes('data-icon-style="square"'));
 }
});

function luminance(hex){return hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);}
function ratio(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('new tones and brand bands retain opaque text contrast in both appearances',()=>{
 for(const palette of M.choices.palette)for(const tone of M.choices.tone)for(const colorStrength of M.choices.colorStrength)for(const theme of ['light','dark']){
  const t=M.tokens({...M.defaults,palette,tone,colorStrength},theme,catalog);
  for(const [fg,bg] of [['--p-text','--p-surface'],['--p-muted','--p-surface'],['--p-brand-fg','--p-brand-bg'],['--p-brand-subtle','--p-brand-bg'],['--p-companion-text','--p-companion']])assert(ratio(t[fg],t[bg])>=4.5,[palette,tone,colorStrength,theme,fg].join('/'));
 }
});
