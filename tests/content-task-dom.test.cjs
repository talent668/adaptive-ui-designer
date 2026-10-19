const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const { parseHTML } = require('linkedom');
const D = require('../assets/content-task-demo.js');
const { model, catalog, root } = require('./helpers.cjs');

// In-memory DOM wiring tests, not native focus, layout or browser accessibility tests.
async function harness() {
  const { document, window } = parseHTML(fs.readFileSync(path.join(root, 'examples/content-task-lab.html'), 'utf8'));
  const $ = s => document.querySelector(s), storage = new Map(), frames = [];
  let focused = null, writes = 0;
  for (const el of document.querySelectorAll('select')) Object.defineProperty(el, 'value', {
    get() { return this._value ?? this.querySelector('option[selected]')?.value ?? this.querySelector('option')?.value ?? ''; },
    set(value) { this._value = value; }
  });
  window.HTMLElement.prototype.focus = function() { focused = this; };
  for (const dialog of document.querySelectorAll('dialog')) {
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { if (!dialog.open) return; dialog.open = false; dialog.dispatchEvent(new window.Event('close')); };
  }
  const errors = [];
  await vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/content-task-lab.js'), 'utf8'), {
    document, window: { AdaptiveContentTaskDemo: D, AdaptiveStudioModel: model, AUISelect: { enhanceAll(){}, refreshAll(){} } },
    fetch: async () => ({ json: async () => catalog }),
    Option: function(label, value) { const el = document.createElement('option'); el.textContent = label; el.value = value; return el; },
    sessionStorage: { getItem: k => storage.get(k) || null, setItem(k, v) { storage.set(k, v); writes++; }, removeItem: k => storage.delete(k) },
    ResizeObserver: class { observe() {} },
    requestAnimationFrame: callback => frames.push(callback),
    console: { error: e => errors.push(e) }
  });
  assert.deepEqual(errors, []);
  const event = (selector, type = 'click') => $(selector).dispatchEvent(new window.Event(type, { bubbles: true, cancelable: true }));
  const change = (selector, value, type = 'change') => { $(selector).value = value; event(selector, type); };
  const flush = async () => { while (frames.length) { frames.shift()(); await Promise.resolve(); } await Promise.resolve(); };
  return { $, event, change, flush, focus: () => focused, writes: () => writes, storage };
}

test('lab DOM: each record entrance restores its own action; failure/retry preserves the filter and exact input', async () => {
  const h = await harness();
  for (const origin of ['#records .record-title', '#records .card-actions [data-open]']) {
    const before = h.$(origin); h.event(origin); h.event('[data-close="detailsDialog"]'); assert.equal(h.focus(), before);
  }
  h.change('#search', 'SUP-101', 'input'); h.event('#records [data-edit]');
  const value = 'A reviewed note / 已核对备注.';
  h.change('#noteInput', value, 'input'); h.$('#failNext').checked = true;
  h.event('#editForm', 'submit'); await h.flush();
  assert.equal(h.$('#editDialog').open, true); assert.equal(h.$('#noteInput').value, value);
  assert.equal(h.$('#records .aui-content-copy').textContent, 'Issue confirmed.');
  assert.equal(h.$('#saveNote').disabled, false); assert.equal(h.writes(), 0);
  h.event('#editForm', 'submit'); await h.flush();
  assert.equal(h.$('#editDialog').open, false); assert.equal(h.$('#editError').textContent, '');
  assert.equal(h.$('#search').value, 'SUP-101'); assert.equal(h.$('#records .aui-content-copy').textContent, value);
  assert.equal(h.focus().dataset.edit, 'SUP-101'); assert.equal(h.writes(), 1);
});

test('lab DOM: canceled edit and filtered-out save choose useful focus targets without changing unrelated data', async () => {
  const h = await harness();
  h.event('#records [data-edit]'); h.change('#noteInput', 'Discard me', 'input'); h.event('[data-close="editDialog"]');
  assert.equal(h.writes(), 0); assert.equal(h.$('#records .aui-content-copy').textContent, 'Issue confirmed.');
  assert.equal(h.focus().dataset.edit, 'SUP-101');
  h.change('#search', 'Issue confirmed.', 'input'); h.event('#records [data-edit]');
  h.change('#noteInput', 'Ready for follow-up.', 'input'); h.event('#editForm', 'submit'); await h.flush();
  assert.equal(h.$('#records article'), null); assert.equal(h.focus().id, 'search');
  h.event('#clearFilters'); assert.equal(h.$('[data-record="SUP-101"] .aui-content-copy').textContent, 'Ready for follow-up.');
  assert.equal(h.$('[data-record="SUP-102"] .aui-content-copy').textContent, 'Waiting for details.');
});

test('lab DOM: queue completion prevents duplicate writes and advances to the next record', async () => {
  const h = await harness();
  for (const [id, next] of [['SUP-101', 'SUP-102'], ['SUP-102', 'SUP-103'], ['SUP-103', 'SUP-104'], ['SUP-104', null]]) {
    h.event(`#queue [data-open="${id}"]`);
    h.event('#detailActions [data-complete]'); h.event('#detailActions [data-complete]'); await h.flush();
    if (next) assert.equal(h.focus().dataset.open, next); else assert.equal(h.focus().id, 'search');
  }
  assert.equal(h.writes(), 4); assert.equal(h.$('#pendingCount').textContent, '0');
});

test('lab DOM: hidden-selected batch preserves scope through locale changes and isolates scenarios', async () => {
  const h = await harness(); h.change('#scenario', 'inventory');
  for (const id of ['SKU-41', 'SKU-42']) { h.$(`[data-select="${id}"]`).checked = true; h.event(`[data-select="${id}"]`, 'change'); }
  h.change('#category', 'north'); assert.match(h.$('#selectionCount').textContent, /1 outside this filter/);
  h.change('#language', 'zh-CN'); assert.match(h.$('#selectionCount').textContent, /1 项不在当前筛选内/);
  h.event('#completeSelected'); await h.flush();
  assert.equal(h.$('#category').value, 'north'); assert.equal(h.$('#pendingCount').textContent, '2');
  h.event('#clearFilters');
  for (const id of ['SKU-41', 'SKU-42']) assert.equal(h.$(`[data-record="${id}"] .state-label`).textContent, '已复核');
  for (const id of ['SKU-43', 'SKU-44']) assert.equal(h.$(`[data-record="${id}"] .state-label`).textContent, '等待库存复核');
  h.change('#scenario', 'support'); assert.equal(h.$('#pendingCount').textContent, '4');
  h.change('#scenario', 'inventory'); assert.equal(h.$('#pendingCount').textContent, '2');
  assert.equal(h.$('#batchBar').hidden, true); assert.equal(h.$('#category').value, 'all');
});

test('lab DOM: failed queue and batch writes show an in-context alert and restore the retry target', async () => {
  const h = await harness();
  h.$('#failNext').checked = true; h.event('#queue [data-open="SUP-101"]');
  h.event('#detailActions [data-complete]'); await h.flush();
  assert.equal(h.$('#detailsDialog').open, true); assert.equal(h.$('#pendingCount').textContent, '4');
  assert.equal(h.$('#detailError').hidden, false); assert.match(h.$('#detailError').textContent, /write failed/);
  assert.equal(h.focus().dataset.complete, 'SUP-101'); assert.equal(h.focus().disabled, false);
  h.event('#detailActions [data-complete]'); await h.flush();
  assert.equal(h.$('#pendingCount').textContent, '3'); assert.equal(h.focus().dataset.open, 'SUP-102');
  h.$('[data-select="SUP-102"]').checked = true; h.event('[data-select="SUP-102"]', 'change');
  h.$('#failNext').checked = true; h.event('#completeSelected'); await h.flush();
  assert.equal(h.$('#batchError').hidden, false); assert.match(h.$('#batchError').textContent, /write failed/);
  assert.equal(h.$('#pendingCount').textContent, '3'); assert.match(h.$('#selectionCount').textContent, /1 selected/);
  assert.equal(h.focus().id, 'completeSelected'); assert.equal(h.focus().disabled, false);
  h.event('#completeSelected'); await h.flush(); assert.equal(h.$('#pendingCount').textContent, '2');
  assert.equal(h.writes(), 2);
});
