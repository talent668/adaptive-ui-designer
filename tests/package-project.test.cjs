const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {spawnSync}=require('node:child_process');
const {unzipSync}=require('fflate');
const packager=path.resolve(__dirname,'../scripts/package-project.py');
async function project(files,check,options=[]){
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'aui-package-')),root=path.join(temp,'project'),archive=path.join(temp,'project.zip');
 try{
  for(const [name,content] of Object.entries(files)){const file=path.join(root,name);await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,content);}
  const result=spawnSync(process.env.PYTHON||'python',[packager,root,archive,...options],{encoding:'utf8'});
  if(result.error)throw result.error;
  let names=[];try{names=Object.keys(unzipSync(await fs.readFile(archive))).sort();}catch(error){if(error.code!=='ENOENT')throw error;}
  await check(result,names);
 }finally{await fs.rm(temp,{recursive:true,force:true});}
}
test('packager follows inline CSS and executable inline module dependencies',async()=>{
 await project({'index.html':`<style>body{background:url('./hero.svg')}</style><div style="background:url('./tile.png')"></div><script type="module">import './app.js'; const image=new Image();image.src='./cover.webp';</script>`,'hero.svg':'<svg/>','tile.png':'tile','cover.webp':'cover','app.js':'export const ready=true;'},(result,names)=>{
  assert.equal(result.status,0,result.stderr);assert.deepEqual(names,['app.js','cover.webp','hero.svg','index.html','tile.png']);
 });
});
test('packager rejects missing local module, fetch, URL and image dependencies before writing an archive',async()=>{
 for(const source of [`import './missing.js';`,`const escape=x=>x.replace(/["']/g,''); import './missing.js';`,`export {value} from './missing.js';`,`fetch('./missing.json');`,`new URL('./missing.png',import.meta.url);`,`image.src='./missing.png';`]){
  await project({'index.html':'<script type="module" src="./app.js"></script>','app.js':source},(result,names)=>{
   assert.notEqual(result.status,0,source);assert.match(result.stderr,/Missing local dependencies: missing\./);assert.deepEqual(names,[]);
  });
 }
});
test('packager resolves fetch and image paths from the document, module URLs from their source',async()=>{
 await project({'pages/index.html':'<script type="module" src="../js/app.js"></script>','js/app.js':`import './module.js';fetch('./config.json');image.src='./hero.png';const imageUrl=new URL('./icon.svg',import.meta.url);`,'js/module.js':'export const value=true;','pages/config.json':'{}','pages/hero.png':'hero','js/icon.svg':'<svg/>'},(result,names)=>{
  assert.equal(result.status,0,result.stderr);assert.deepEqual(names,['js/app.js','js/icon.svg','js/module.js','pages/config.json','pages/hero.png','pages/index.html']);
 },['--entry','pages/index.html']);
});
test('packager ignores future-app imports in strings, templates and comments',async()=>{
 await project({'index.html':'<script src="./generator.js"></script>','generator.js':`const example="import './not-an-import.js';";const template=\`import './future-app.js';\`;/* import './comment.js'; */ // import './comment2.js';\nconst artifact='available.png';`,'available.png':'image'},(result,names)=>{
  assert.equal(result.status,0,result.stderr);assert.deepEqual(names,['available.png','generator.js','index.html']);
 });
});
test('packager keeps the font-binary and root-boundary protections for inline and module resources',async()=>{
 await project({'index.html':'<style>@font-face{font-family:X;src:url("./font.woff2")}</style>','font.woff2':'font'},(result)=>{
  assert.notEqual(result.status,0);assert.match(result.stderr,/Font binary referenced/);
 });
 await project({'index.html':'<script type="module" src="./app.js"></script>','app.js':`import '../outside.js';`},(result)=>{
  assert.notEqual(result.status,0);assert.match(result.stderr,/Reference leaves project root/);
 });
});
test('packager includes explicitly declared computed dependencies',async()=>{
 await project({'index.html':'<script>fetch("./"+name+".json")</script>','dynamic.json':'{}'},(result,names)=>{
  assert.equal(result.status,0,result.stderr);assert.deepEqual(names,['dynamic.json','index.html']);
 },['--include','dynamic.json']);
});
