const fs = require('node:fs/promises'), path = require('node:path');
const { root, generator, resources, snapshot, writeProject } = require('../tests/helpers.cjs');
(async () => {
  const { build } = await import('vite');
  const r = await resources(), rows = [];
  const desktop = process.argv.includes('--desktop');
  const cases = desktop ? require('../tests/fixtures/desktop-cases.json') : process.argv.includes('--cases') ? require('../tests/fixtures/domain-cases.json') : [{id:'baseline'}];
  for (const fixture of cases) for (const stack of ['html', 'react', 'vue']) {
    const directory = path.join(root, '.validation', 'builds', fixture.id, stack);
    const input = desktop ? snapshot({stack,project:fixture.project,widthPolicy:fixture.widthPolicy},Object.fromEntries(['zh-CN','en'].map(language=>[language,require('../assets/design-scenes.js').render({...require('../assets/design-studio-model.js').defaults,project:fixture.project,language})]))) : fixture.id === 'baseline' ? snapshot({ stack }) : require('../tests/case-input.cjs')(fixture,stack).input;
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
  await fs.writeFile(path.join(root, '.validation', desktop?'desktop-report.json':process.argv.includes('--cases')?'case-report.json':'build-report.json'), JSON.stringify({ node: process.version, platform: process.platform, results: rows }, null, 2));
  console.log(JSON.stringify(rows));
})().catch(error => { console.error(error); process.exitCode = 1; });
