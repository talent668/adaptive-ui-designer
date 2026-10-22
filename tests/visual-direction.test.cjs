const test=require('node:test'),assert=require('node:assert/strict');
const {model:M,catalog,generator,resources,snapshot}=require('./helpers.cjs'),G=require('../assets/design-guidance.js'),P=require('../assets/design-prompt.js'),S=require('../assets/design-scenes.js'),examples=require('../assets/project-examples.js');
function contrast(a,b){const lum=x=>{const c=x.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};return (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);}
test('expressive intent survives dense management and reading needs without sacrificing those tasks',()=>{
 for(const brief of ['项目管理、密集表格、后台运行','课程与长文阅读']){
  const input=M.normalize({project:'workspace',brief,priority:'expressive'},catalog),r=M.recommend(input),picked=M.applyScheme(input,r.primary,r);
  assert.equal(picked.colorStrength,'bold');assert.equal(picked.colorPlacement,'duotone');assert.equal(picked.material,'solid');
  if(brief.includes('表格'))assert.equal(picked.density,'compact');
 }
});
test('prepared branded directions also retain an explicit request for expressive styling',()=>{
 const p=G.profile(examples.operations,catalog),r=G.recommend({...p.initial,priority:'expressive'},p);
 assert.equal(r.values.palette,'blue');assert.equal(r.values.colorStrength,'bold');assert.equal(r.values.colorPlacement,'duotone');
});
test('prepared direction constraints outrank a general expressive preference',()=>{
 const p=G.profile({id:'typographic-brand',context:{project:'showcase',priority:'expressive'},recommended:'glass',directions:{glass:{values:{colorPlacement:'contained',colorStrength:'balanced',headingWeight:'bold',material:'solid'}}}},catalog),r=G.recommend(p.initial,p);
 assert.equal(r.values.colorPlacement,'contained');assert.equal(r.values.colorStrength,'balanced');assert.equal(r.values.headingWeight,'bold');
});
test('alternative and manual choices never retain another direction’s active identity',()=>{
 for(const [sample,id,forbidden]of [['learning-studio','soft',/plum|apricot|editorial/i],['learning-studio','clear',/plum|apricot|geist|topic-led/i],['operations-bold','clear',/forest|lime|records first/i]]){
  const p=G.profile(examples[sample],catalog),r=G.recommend(p.initial,p),s={...p.initial,scheme:id,...G.values(id,r,p)},intent=G.intent(s,p);
  assert.doesNotMatch(JSON.stringify([intent.signature,intent.colorPlan,intent.typePlan,intent.layout]),forbidden);
 }
 const p=G.profile(examples['learning-studio'],catalog),r=G.recommend(p.initial,p),s={...p.initial,...r.values,scheme:r.primary,composition:'ledger',ui:'plex-source-han',palette:'blue',colorPlacement:'contained'},intent=G.intent(s,p);
 assert(intent.layout.includes('records')||intent.layout.includes('清单'));assert(intent.typePlan.includes('plex-source-han'));assert(intent.colorPlan.includes('cobalt'));assert.equal(intent.applied.colorPlacement,'contained');assert(!('preparedBaseline' in intent));
});
test('brand families define distinct anchors, canvases and companions with readable pairs in both modes',()=>{
 const anchors=new Set(),companions=new Set(),canvases=new Set();
 for(const palette of M.choices.palette)for(const theme of ['light','dark']){
  const t=M.tokens({...M.defaults,palette,colorPlacement:'duotone'},theme,catalog);
  for(const [fg,bg]of [['--p-on-anchor','--p-anchor'],['--p-companion-text','--p-companion'],['--p-brand-fg','--p-brand-bg']])assert(contrast(t[fg],t[bg])>=4.5,`${palette}/${theme}/${fg}`);
  if(theme==='light'){anchors.add(t['--p-anchor']);companions.add(t['--p-companion']);canvases.add(t['--p-canvas']);}
 }
 assert.equal(anchors.size,6);assert.equal(companions.size,6);assert.equal(canvases.size,6);
});
test('old saved designs retain contained colors and manual placement survives all schemes',()=>{
 assert.equal(M.normalize({...M.defaults,version:3,colorPlacement:undefined},catalog).colorPlacement,'contained');
 const state=M.normalize({colorPlacement:'contained',palette:'blue'},catalog);assert.equal(M.tokens(state,'light',catalog)['--p-canvas'],'#f1f4f8');
});
test('same learning content supports two identities and the expressive dense example preserves records',()=>{
 const prepared=id=>{const p=G.profile(examples[id],catalog),r=G.recommend(p.initial,p);return {p,r,s:M.normalize({...p.initial,scheme:r.primary,...G.values(r.primary,r,p)},catalog)};};
 const calm=prepared('learning'),edition=prepared('learning-studio'),ops=prepared('operations-bold');
 assert.equal(calm.s.project,edition.s.project);assert.notEqual(calm.s.composition,edition.s.composition);assert.notEqual(calm.s.palette,edition.s.palette);
 for(const v of [calm,edition]){const doc=new DOMParser().parseFromString(G.scene(v.s,v.p),'text/html');assert(doc.querySelector('.p-library'));assert.equal(doc.querySelectorAll('.p-content-card').length,3);}
 const doc=new DOMParser().parseFromString(G.scene(ops.s,ops.p),'text/html');assert(doc.querySelector('.p-table'));assert.equal(ops.s.density,'compact');assert.equal(ops.s.colorStrength,'bold');assert.equal(ops.s.colorPlacement,'duotone');
});
test('project-authored scenes are preserved instead of silently becoming a generic dashboard',()=>{
 const p=G.profile({id:'film-archive',context:{project:'showcase'},designIntent:{concept:'Film contact sheet',signature:['Large index numbers','Image sequence']},sceneResources:['project-scenes.js'],sceneRenderer:state=>'<main data-project-scene="film"><h2>Film contact sheet</h2><button data-detail>Inspect a frame</button></main>'},catalog);
 const html=G.scene(p.initial,p);assert(html.includes('data-project-scene="film"'));assert(!html.includes('p-metrics'));assert(!html.includes('p-table'));assert.equal(p.sceneResources[0],'project-scenes.js');
});
test('custom handoff contains actual markup without imposing a preset sidebar; incomplete media export fails explicitly',async()=>{
 const base=snapshot({project:'showcase'}),markup='<main><h2>Frame sequence</h2><button data-detail>Inspect</button></main>';
 base.design.customScene=true;base.design.projectMarkup={'zh-CN':markup,en:markup};base.design.designIntent={concept:'Film archive',layout:'Image sequence then frame metadata',signature:['Frame order','Large indexes']};base.design.projectResources=['project-scenes.js'];
 const handoff=P.build(base.design,{locale:'en'});assert.equal(handoff.snapshot.layoutRecipe.source,'project-markup');assert(!('primaryOrder' in handoff.snapshot.layoutRecipe));assert(handoff.snapshot.projectMarkup.en.includes('Frame sequence'));
 const result=await generator.generate({...base,design:handoff.snapshot,scenes:{'zh-CN':markup,en:markup},designPrompt:handoff.text},await resources());assert(result.files.length>0);
 const missing='<main><h2>Frames</h2><img src="./frames.webp"></main>';
 await assert.rejects(generator.generate({...base,scenes:{'zh-CN':missing,en:missing}},await resources()),/assets are not bundled/);
});
test('prepared hero text actually changes language while later manual copy remains authoritative',()=>{
 const p=G.profile(examples['learning-studio'],catalog),r=G.recommend(p.initial,p),s={...p.initial,...r.values,scheme:r.primary,language:'en'};
 const html=G.scene(s,p);assert(html.includes('Build understanding, one practice at a time.'));assert(!html.includes('让理解，在一次次练习里生长。'));
 const manual=G.scene({...s,primaryTask:'My own heading'},p);assert(manual.includes('My own heading'));assert(!manual.includes('Build understanding, one practice at a time.'));
});
test('confirmed intent, customized colors and prepared markup pass through prompt and every native stack',async()=>{
 const p=G.profile(examples['operations-bold'],catalog),r=G.recommend(p.initial,p),state=M.normalize({...p.initial,...r.values,scheme:r.primary,palette:'coral'},catalog),base=snapshot(state);
 base.design.designIntent=G.intent(state,p);base.design.projectResources=['project-brief.js'];
 const handoff=P.build(base.design,{locale:'en'});assert.equal(handoff.snapshot.designIntent.applied.palette,'coral');assert(handoff.snapshot.designIntent.signature.length>=2);assert(handoff.snapshot.designIntent.colorPlan.includes('wine / mint'));assert(handoff.snapshot.designIntent.adjustments.some(x=>x.field==='palette'));assert(handoff.text.includes('manual choices'));
 const scenes=Object.fromEntries(['zh-CN','en'].map(language=>[language,G.scene({...state,language},p)])),rsc=await resources();
 for(const stack of M.choices.stack){const design={...handoff.snapshot,selected:{...handoff.snapshot.selected,stack}},result=await generator.generate({...base,design,scenes,designPrompt:handoff.text},rsc);assert.equal(result.design.designIntent.applied.palette,'coral');const json=result.files.find(f=>f.path.endsWith('design.json'));assert(json);assert(JSON.parse(json.content).designIntent.concept);assert(result.files.some(f=>f.path==='DESIGN-PROMPT.md'&&f.content.includes('wine / mint')));}
});
