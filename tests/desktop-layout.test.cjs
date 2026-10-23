const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path');
const {root,model:M,catalog,generator:G,resources,snapshot}=require('./helpers.cjs');

test('legacy designs gain auto width; explicit width policy survives project recommendations',()=>{
 assert.equal(M.normalize({},catalog).widthPolicy,'auto');
 assert.equal(M.normalize({widthPolicy:'3840px'},catalog).widthPolicy,'auto');
 for(const widthPolicy of M.choices.widthPolicy){
  const s=M.normalize({project:'learning',widthPolicy,language:'en',appearance:'dark'},catalog);
  const next=M.applyScheme(s,'glass',M.recommend(s));
  assert.equal(next.widthPolicy,widthPolicy);assert.equal(next.language,'en');assert.equal(next.appearance,'dark');
 }
});

test('content policy chooses a bounded or explicitly fluid shell without rescaling type or buttons',()=>{
 const seed=M.tokens(M.defaults,'light',catalog);
 assert.equal(seed['--p-layout-max'],'112rem');
 assert.equal(M.tokens({...M.defaults,project:'learning'},'light',catalog)['--p-layout-max'],'90rem');
 for(const [widthPolicy,expected] of [['focused','80rem'],['wide','120rem'],['fluid','none']])for(const theme of ['light','dark']){
  const tokens=M.tokens({...M.defaults,widthPolicy},theme,catalog);
  assert.equal(tokens['--p-layout-max'],expected);
  for(const key of ['--font-ui','--font-mono','--p-button-height','--p-button-font','--p-control-radius','--p-gap'])assert.equal(tokens[key],seed[key]);
 }
});

test('all native exports carry the selected shell and portable CSS, without freezing a preview width',async()=>{
 const r=await resources(),shared=await fs.readFile(path.join(root,'assets/desktop-layout.css'),'utf8');
 for(const stack of ['html','react','vue']){
  const input=snapshot({stack,widthPolicy:'wide'}),before=JSON.stringify(input);
  const result=await G.generate(input,r),css=result.files.find(f=>f.path.endsWith('styles.css')).content;
  const main=result.files.find(f=>f.path===result.mainFile).content;
  assert.equal(JSON.stringify(input),before);assert.equal(result.design.selected.widthPolicy,'wide');
  assert(css.includes(shared));assert(css.includes('--p-layout-max:120rem;'));assert(!css.includes('max-width:1440px'));
  assert(main.includes('aui-desktop-shell'));assert(main.includes('aui-desktop-frame'));
  assert(!main.includes('desktopWidth'));assert(!css.includes('width:3840px'));
  assert(css.includes('max-height:calc(100dvh - 32px)'));
  assert(css.includes('min-height:100vh;min-height:100dvh'));
 }
});
