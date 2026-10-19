const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {root,resources,generator,snapshot}=require('./helpers.cjs');
test('documentation relative links resolve from the portable package',async()=>{
 const files=['SKILL.md','README.md','README.zh-CN.md',...(await fs.readdir(path.join(root,'references'))).filter(n=>n.endsWith('.md')).map(n=>'references/'+n)];
 for(const file of files){const content=await fs.readFile(path.join(root,file),'utf8');for(const m of content.matchAll(/\]\(([^)]+)\)/g)){
  const target=m[1].split('#')[0];if(!target||/^[a-z]+:/i.test(target)||target.includes(' '))continue;
  await fs.access(path.resolve(root,path.dirname(file),decodeURIComponent(target)));
 }}
 const pkg=require('../package.json');for(const version of Object.values(pkg.devDependencies))assert(/^\d+\.\d+\.\d+$/.test(version));
});
test('generator consumes the entire product resource regardless of studio CSS formatting',async()=>{
 const r=await resources();
 // Deliberately only vary harmless whitespace between ordinary rules, not nested syntax.
 r.css=r.css.replaceAll('}\n','}\n\n')+'\n.p-verification-sentinel { color: inherit; }';
 const result=await generator.generate(snapshot(),r),css=result.files.find(f=>f.path==='styles.css').content;
 assert(css.includes('.p-verification-sentinel'));assert(!css.includes('.studio-dialog{'));
});
