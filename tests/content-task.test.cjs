const test = require('node:test'), assert = require('node:assert/strict');
const D = require('../assets/content-task-demo.js');
const { generator, resources, snapshot } = require('./helpers.cjs');

for (const caseId of Object.keys(D.cases)) {
  test(`${caseId}: failed edit retains original data; retry commits only the target and round-trips`, () => {
    const state = D.create(caseId), before = structuredClone(state), id = state.records[0].id;
    const operation = { type: 'edit', id, note: '  Reviewed / 已复核\nFollow up next week.  ' };
    const failed = D.commit(state, operation, () => { throw Error('storage unavailable'); });
    assert.equal(failed.ok, false); assert.equal(failed.state, state); assert.deepEqual(state, before);
    let stored;
    const result = D.commit(state, operation, next => stored = JSON.stringify(next));
    assert.equal(result.ok, true); assert.deepEqual(result.affected, [id]);
    assert.deepEqual(JSON.parse(stored), result.state);
    assert.equal(result.state.records[0].note, operation.note.trim());
    assert.equal(result.state.records[0].pending, true);
    assert.deepEqual(result.state.records.slice(1), before.records.slice(1));
    assert.deepEqual(state, before);
  });

  test(`${caseId}: filters compose; batch retains explicit hidden selection and leaves other records alone`, () => {
    const state = D.create(caseId), rows = state.records, category = rows[0].category;
    assert.deepEqual(D.visible(state, { category }).map(r => r.id), [rows[0].id, rows[2].id]);
    for (const locale of ['en', 'zh-CN']) {
      assert.equal(D.visible(state, { category, query: rows[0].title[locale === 'en' ? 1 : 0] }, locale)[0].id, rows[0].id);
      assert.equal(D.visible(state, { category, query: rows[1].id }, locale).length, 0);
    }
    // The UI explicitly reports the second selected item as outside this filter.
    const result = D.commit(state, { type: 'complete', ids: [rows[0].id, rows[1].id, rows[0].id] }, () => {});
    assert.equal(result.ok, true); assert.deepEqual(result.affected, [rows[0].id, rows[1].id]);
    assert.deepEqual(D.visible(result.state, { category, status: 'done' }).map(r => r.id), [rows[0].id]);
    assert.deepEqual(D.visible(result.state, { status: 'pending' }).map(r => r.id), [rows[2].id, rows[3].id]);
    assert.deepEqual(result.state.records.slice(2), rows.slice(2));
    assert.equal(D.commit(result.state, { type: 'complete', ids: [rows[0].id] }, () => { throw Error('must not write'); }).error, 'nothing');
    assert.deepEqual(D.create(caseId), state);
  });
}

test('invalid, oversized and cross-scenario operations never reach storage', () => {
  const state = D.create('support'), id = state.records[0].id;
  for (const op of [
    { type: 'edit', id, note: ' ' }, { type: 'edit', id, note: 'x'.repeat(321) },
    { type: 'edit', id: 'SKU-41', note: 'Wrong workspace' },
    { type: 'complete', ids: [] }, { type: 'complete', ids: [id, 'SKU-41'] }
  ]) {
    let calls = 0; const result = D.commit(state, op, () => calls++);
    assert.equal(result.ok, false); assert.equal(result.state, state); assert.equal(calls, 0);
  }
  assert.equal(D.commit(state, { type: 'edit', id, note: 'x'.repeat(320) }, () => {}).ok, true);
  const failed = D.commit(state, { type: 'complete', ids: [id] }, () => { throw Error('quota'); });
  assert.equal(failed.state, state); assert(state.records.every(r => r.pending));
});

test('all stack exports retain optional content layout and full bilingual descriptions', async () => {
  const r = await resources(), contentCSS = require('node:fs').readFileSync(require('node:path').join(__dirname, '../assets/content-layout.css'), 'utf8');
  const scene = locale => `<section class="aui-content-grid">${D.create('editorial').records.map(row => `<article class="aui-content-card"><p class="aui-content-copy">${row.description[locale]}</p><footer class="aui-content-tail"><button data-detail="true">Details</button></footer></article>`).join('')}</section>`;
  for (const stack of ['html', 'react', 'vue']) {
    const result = await generator.generate(snapshot({ stack }, { 'zh-CN': scene(0), en: scene(1) }), r);
    const css = result.files.find(f => f.path.endsWith('styles.css')).content;
    const main = result.files.find(f => f.path === result.mainFile).content;
    assert(css.includes(contentCSS));
    for (const locale of [0, 1]) assert(main.includes(D.cases.editorial.records[2][3][locale]));
    assert(main.includes('aui-content-tail'));
  }
});
