const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs/promises'), path = require('node:path'), crypto = require('node:crypto');
const { unzipSync } = require('fflate');
const { generator: G, resources, snapshot, assets } = require('./helpers.cjs');
test('local font catalog keeps names and descriptions without font binaries', async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(assets, 'fonts/manifest.json'), 'utf8'));
  const catalog = JSON.parse(await fs.readFile(path.join(assets, 'font-catalog.json'), 'utf8'));
  assert.equal(manifest.policy, 'local-system-fonts-only'); assert.deepEqual(manifest.packages, []);
  assert(manifest.localFonts.length >= 14);
  for (const font of Object.values(catalog.fonts)) { assert.equal(font.kind,'local'); assert(font.localNames.length); assert(font.description['zh-CN']); assert(font.description.en); }
  assert.equal(catalog.uiPresets.length,7);assert.equal(catalog.monoPresets.length,5);
  assert(!(await fs.readFile(path.join(assets,'font-faces.css'),'utf8')).includes('url('));
});
test('HTML/React/Vue preserve local font preferences and immutable input; font-free ZIPs round trip independently', async () => {
  const r = await resources();
  for (const stack of ['html', 'react', 'vue']) {
    const input = snapshot({ stack, ui: 'geist-source-han', material: 'gradient', palette: 'sage', appearance: 'dark', language: 'en' }), before = JSON.stringify(input);
    const result = await G.generate(input, r), archive = unzipSync(result.archive);
    assert.equal(JSON.stringify(input), before);
    assert.deepEqual(result.design.selected, input.design.selected);
    assert.equal(Object.keys(archive).length, result.files.length);
    for (const file of result.files) assert.deepEqual(Buffer.from(archive[file.path]), Buffer.from(file.content));
    assert(!result.files.some(f => /\.(woff2?|ttf|otf|eot)$/.test(f.path))); assert(result.design.tokens.light['--font-ui'].includes('Source Han Sans SC'));
    assert(result.files.some(f => f.path.endsWith('fonts/manifest.json') && JSON.parse(f.content).policy==='local-system-fonts-only'));
    const main = result.files.find(f => f.path === result.mainFile).content;
    assert(main.includes('Students needing follow-up')); assert(main.includes('需要跟进的学生'));
    assert(!main.includes('dangerouslySetInnerHTML')); assert(!main.includes('v-html'));
    assert(main.includes(stack === 'react' ? 'onClick={onDetails}' : stack === 'vue' ? '@click="openDetails"' : 'data-detail'));
  }
});
test('JSX and Vue keep literal template text; unsupported preview elements fail explicitly', () => {
  assert(G.reactMarkup('<p>{{ x }} &lt;/script&gt;</p>').includes('{{ x }}'));
  assert(!G.vueMarkup('<p>{{ x }}</p>').includes('{{'));
  for (const emit of [G.reactMarkup, G.vueMarkup]) {
    assert(!emit('<button onclick="throw 1">Open</button>').includes('onclick'));
    assert.throws(() => emit('<iframe src="x"></iframe>'));
  }
  assert.throws(() => G.zip([{ path: '../escape.txt', content: 'x' }]));
});
