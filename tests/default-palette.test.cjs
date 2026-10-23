const test=require('node:test'),assert=require('node:assert/strict');
const {model:M,catalog,snapshot}=require('./helpers.cjs'),G=require('../assets/design-guidance.js'),P=require('../assets/design-prompt.js'),examples=require('../assets/project-examples.js');
test('unspecified projects default to blue-white across actual composition recommendations',()=>{
 const compositions=new Set();
 for(const project of M.choices.project)for(const priority of M.choices.priority)for(const brief of ['', '密集表格与后台管理','阅读课程和长文','visual portfolio']){
  const s=M.normalize({project,priority,brief},catalog),r=M.recommend(s);
  assert.equal(r.values.palette,'blue');compositions.add(r.values.composition);
  for(const values of Object.values(r.variants)){assert.equal(values.palette,'blue');const t=M.tokens({...s,...values},'light',catalog);assert.equal(t['--p-surface'],'#ffffff');assert.equal(t['--p-companion'],'#e7efff');}
 }
 assert(compositions.size>=3);
 for(const scheme of Object.keys(M.schemes))assert.equal(M.normalize({scheme},catalog).palette,'blue');
});
test('explicit, saved and prepared palettes override the fallback without resetting the selection',()=>{
 for(const palette of M.choices.palette){const s=M.normalize({...M.defaults,palette,stack:'vue',appearance:'dark'},catalog),r=M.recommend(s);assert.equal(r.values.palette,palette);for(const id of r.ids)assert.equal(M.applyScheme(s,id,r).palette,palette);const handoff=P.build(snapshot(s).design,{locale:'en'});assert.equal(handoff.snapshot.selected.palette,palette);assert.equal(s.palette,palette);}
 const p=G.profile({id:'explicit-brand',context:{project:'product',palette:'violet'},recommended:'soft',directions:{soft:{values:{composition:'split'}},clear:{values:{palette:'sage'}}}},catalog),r=G.recommend(p.initial,p);
 assert.equal(r.primary,'soft');assert.equal(r.values.palette,'violet');assert.equal(G.values('clear',r,p).palette,'sage');
});
test('default project examples remain blue-white and explicitly named color comparisons remain available',()=>{
 for(const name of ['architecture','learning','operations']){const p=G.profile(examples[name],catalog),r=G.recommend(p.initial,p);for(const id of G.candidates(r,p))assert.equal(G.values(id,r,p).palette,'blue',name+'/'+id);}
 for(const name of ['learning-studio','operations-bold']){const p=G.profile(examples[name],catalog),r=G.recommend(p.initial,p);assert.notEqual(r.values.palette,'blue');}
});
