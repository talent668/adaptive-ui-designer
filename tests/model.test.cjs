const test = require('node:test'), assert = require('node:assert/strict');
const { model: M, catalog } = require('./helpers.cjs');
test('invalid persisted values are normalized; desktop is the initial preview', () => {
  for (const value of [null, 42, [], { scheme: '__proto__', palette: 'pink', ui: 'missing', language: 'fr', stack: 'x', brief: 'x'.repeat(900), device: 'unknown' }]) {
    const s = M.normalize(value, catalog);
    assert(M.choices.palette.includes(s.palette)); assert(Object.hasOwn(M.schemes, s.scheme));
    assert(s.brief.length <= 240); assert(catalog.uiPresets.some(p => p.id === s.ui)); assert.equal(s.device, 'desktop');
  }
  assert.equal(M.normalize({}, catalog).responsive, true);
  assert.equal(M.normalize({ device: 'mobile' }, catalog).device, 'mobile');
  assert.equal(M.normalize({ responsive: false, device: 'mobile' }, catalog).device, 'desktop');
});
test('recommendations preserve unrelated choices and manual changes are detected', () => {
  for (const project of M.choices.project) for (const stack of M.choices.stack) {
    const s = M.normalize({ project, stack, appearance: 'dark', language: 'en', responsive: true, device: 'mobile' }, catalog), r = M.recommend(s);
    assert.equal(new Set(r.ids).size, 3); assert.equal(r.ids[0], r.primary);
    const picked = M.applyScheme(s, r.ids[1], r);
    for (const key of ['stack', 'appearance', 'language', 'device', 'project', 'responsive']) assert.equal(picked[key], s[key]);
    assert(!M.isCustom(picked, r)); assert(M.isCustom({ ...picked, solidFallback: true }, r));
  }
  assert.equal(M.recommend({ project: 'showcase', priority: 'expressive', brief: 'dense tables and admin data' }).primary, 'clear');
  assert.equal(M.recommend({ project: 'product', brief: '长文阅读与课程内容' }).primary, 'soft');
  assert.equal(M.recommend({ project: 'showcase', brief: 'Stable visual portfolio with comfortable controls' }).primary, 'glass');
  const mixed=M.recommend({project:'workspace',priority:'clarity',brief:'Dense tables and short documentation'});
  assert.equal(mixed.primary,'clear');assert.equal(mixed.reason,'dense');assert.equal(mixed.values.density,'compact');
});
function luminance(hex) { const c = hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return c[0] * .2126 + c[1] * .7152 + c[2] * .0722; }
function contrast(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
test('all shipped opaque text/color pairs meet 4.5:1; this does not certify glass over arbitrary images', () => {
  for (const palette of M.choices.palette) for (const theme of ['light', 'dark']) {
    const t = M.tokens({ ...M.defaults, palette }, theme, catalog);
    for (const [fg, bg] of [['--p-on-accent','--p-accent'], ['--p-accent-text','--p-soft'], ['--p-text','--p-surface'], ['--p-muted','--p-surface'], ['--p-success','--p-success-bg'], ['--p-warning','--p-warning-bg']]) assert(contrast(t[fg], t[bg]) >= 4.5, `${palette} ${theme} ${fg}`);
  }
});
test('solid fallback survives material/radius/elevation combinations in both modes', () => {
  for (const radius of M.choices.radius) for (const elevation of M.choices.elevation) for (const material of M.choices.material) for (const theme of ['light', 'dark']) {
    const t = M.tokens({ ...M.defaults, radius, elevation, material, solidFallback: true }, theme, catalog);
    assert.equal(t['--p-blur'], '0px'); assert.equal(t['--p-glass'], t['--p-surface']);
  }
});
