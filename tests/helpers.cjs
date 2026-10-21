const fs = require('node:fs/promises'), path = require('node:path');
const root = path.resolve(__dirname, '..'), assets = path.join(root, 'assets');
global.DOMParser = require('linkedom').DOMParser;
const model = require('../assets/design-studio-model.js');
const generator = require('../assets/design-page-generator.js');
const catalog = require('../assets/font-catalog.json');
async function resources() {
  const read = f => fs.readFile(path.join(assets, f), 'utf8');
  return { css: (await read('project-preview.css')) + '\n' + (await read('button-system.css')) + '\n' + (await read('content-layout.css')) + '\n' + (await read('desktop-layout.css')), fontCss: await read('font-faces.css'),
    manifest: JSON.parse(await read('fonts/manifest.json')),
    selectJS: await read('rounded-select.js'), selectCSS: await read('rounded-select.css'),
    reactSelect: await read('rounded-select.react.txt'), vueSelect: await read('rounded-select.vue.txt'),
    readBytes: async f => new Uint8Array(await fs.readFile(path.join(assets, f))) };
}
function snapshot(overrides = {}, scenes) {
  const selected = model.normalize({ ...model.defaults, ...overrides }, catalog);
  return { design: { schemaVersion: 1, selected, tokens: { light: model.tokens(selected, 'light', catalog), dark: model.tokens(selected, 'dark', catalog) } },
    scenes: scenes || require('./fixtures/scenes.json'), titles: { 'zh-CN': '学习记录 · 示例', en: 'Learning journal · Example' } };
}
async function writeProject(result, directory) {
  await fs.mkdir(directory, { recursive: true });
  for (const f of result.files) {
    const target = path.join(directory, f.path);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, f.content);
  }
}
module.exports = { root, assets, model, generator, catalog, resources, snapshot, writeProject };
