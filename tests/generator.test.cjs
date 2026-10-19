const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs/promises'), path = require('node:path'), crypto = require('node:crypto');
const { unzipSync } = require('fflate');
const { generator: G, resources, snapshot, assets } = require('./helpers.cjs');
test('all bundled fonts match their recorded hashes and keep license files', async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(assets, 'fonts/manifest.json'), 'utf8'));
  for (const pkg of manifest.packages) {
    assert((await fs.readFile(path.join(assets, 'fonts', pkg.license_file))).length > 100);
    for (const [file, info] of Object.entries(pkg.files)) {
      const bytes = await fs.readFile(path.join(assets, 'fonts', pkg.slug, file));
      assert.equal(bytes.length, info.bytes); assert.equal(bytes.subarray(0, 4).toString(), 'wOF2');
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), info.sha256);
    }
  }
});
test('HTML/React/Vue preserve selections, true Source Han, licenses and immutable input; ZIP round trips independently', async () => {
  const r = await resources();
  for (const stack of ['html', 'react', 'vue']) {
    const input = snapshot({ stack, ui: 'geist-source-han', material: 'gradient', palette: 'sage', appearance: 'dark', language: 'en' }), before = JSON.stringify(input);
    const result = await G.generate(input, r), archive = unzipSync(result.archive);
    assert.equal(JSON.stringify(input), before);
    assert.deepEqual(result.design.selected, input.design.selected);
    assert.equal(Object.keys(archive).length, result.files.length);
    for (const file of result.files) assert.deepEqual(Buffer.from(archive[file.path]), Buffer.from(file.content));
    assert(result.files.some(f => f.path.endsWith('source-han-sans-sc/SourceHanSansSC-VF.ttf.woff2')));
    assert(result.files.some(f => f.path.endsWith('source-han-sans-sc/LICENSE.txt')));
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
