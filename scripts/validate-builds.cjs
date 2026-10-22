const fs = require('node:fs/promises'), path = require('node:path');
const { root, generator, resources, snapshot, writeProject } = require('../tests/helpers.cjs');
(async () => {
  const { build } = await import('vite');
  const r = await resources(), rows = [];
  const desktop = process.argv.includes('--desktop'),directions=process.argv.includes('--directions'),visual=process.argv.includes('--visual');
  const cases = visual?[{id:'operations-bold'},{id:'learning'},{id:'learning-studio'}]:directions?require('../tests/fixtures/direction-cases.json'):desktop ? require('../tests/fixtures/desktop-cases.json') : process.argv.includes('--cases') ? require('../tests/fixtures/domain-cases.json') : [{id:'baseline'}];
  for (const fixture of cases) for (const stack of ['html', 'react', 'vue']) {
    const directory = path.join(root, '.validation', 'builds', fixture.id, stack);
    let input;
    if(visual){
      const M=require('../assets/design-studio-model.js'),G=require('../assets/design-guidance.js'),E=require('../assets/project-examples.js'),C=require('../assets/font-catalog.json');
      const p=G.profile(E[fixture.id],C),rec=G.recommend(p.initial,p),state=M.normalize({...p.initial,...rec.values,scheme:rec.primary,stack},C);
      input=snapshot(state,Object.fromEntries(['zh-CN','en'].map(language=>[language,G.scene({...state,language},p)])));
      input.titles={'zh-CN':state.projectName+' · 视觉验证',en:state.projectName+' · Visual study'};
      input.design.projectContent=p.sceneText;input.design.designIntent=G.intent(state,p);input.design.projectResources=['assets/project-examples.js'];
      const prompt=require('../assets/design-prompt.js').build(input.design);input.design=prompt.snapshot;input.designPrompt=prompt.text;
    }else if(directions){
      const M=require('../assets/design-studio-model.js'),S=require('../assets/design-scenes.js'),catalog=require('../assets/font-catalog.json');
      const base=M.normalize({project:fixture.project,stack,projectName:'北岸工作室 / Northline',audience:'设计与产品团队 / Design and product teams',primaryTask:'让每个项目，都有下一步。',brief:'集中管理项目、评审与交付记录。',constraints:'Representative synthetic studio comparison; same records across directions.'},catalog),state=M.applyScheme(base,fixture.scheme,M.recommend(base));
      input=snapshot(state,Object.fromEntries(['zh-CN','en'].map(language=>[language,S.render({...state,language})])));
      input.titles={'zh-CN':'北岸工作室 · 编排对照',en:'Northline · Composition comparison'};
      const prompt=require('../assets/design-prompt.js').build(input.design);input.design=prompt.snapshot;input.designPrompt=prompt.text;
    }else input = desktop ? snapshot({stack,project:fixture.project,widthPolicy:fixture.widthPolicy},Object.fromEntries(['zh-CN','en'].map(language=>[language,require('../assets/design-scenes.js').render({...require('../assets/design-studio-model.js').defaults,project:fixture.project,language})]))) : fixture.id === 'baseline' ? snapshot({ stack }) : require('../tests/case-input.cjs')(fixture,stack).input;
    if (desktop) {
      const names = require('../assets/design-scenes.js').scenarios[fixture.project].name;
      input.titles = { 'zh-CN': names[0] + ' · 桌面示例', en: names[1] + ' · Desktop example' };
    }
    const generated = await generator.generate(input, r);
    await writeProject(generated, directory);
    if (stack === 'html') {
      // HTML is a static delivery, not a Vite app. Bundling it would drop classic scripts.
      const doc = new DOMParser().parseFromString(await fs.readFile(path.join(directory, 'index.html'), 'utf8'), 'text/html');
      for (const el of doc.querySelectorAll('script[src],link[href]')) {
        const relative = el.getAttribute('src') || el.getAttribute('href');
        await fs.access(path.join(directory, relative));
      }
    } else await build({ root: directory, logLevel: 'warn', build: { emptyOutDir: true } });
    rows.push({ case: fixture.id, stack, files: generated.files.length, check: stack === 'html' ? 'static resource closure passed' : 'production build passed' });
  }
  await fs.writeFile(path.join(root, '.validation', visual?'visual-report.json':directions?'direction-report.json':desktop?'desktop-report.json':process.argv.includes('--cases')?'case-report.json':'build-report.json'), JSON.stringify({ node: process.version, platform: process.platform, results: rows }, null, 2));
  console.log(JSON.stringify(rows));
})().catch(error => { console.error(error); process.exitCode = 1; });
