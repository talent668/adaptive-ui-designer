"""Regenerate font preference JS/CSS from the bundled catalog; no network access."""
from pathlib import Path
import json
import sys

root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
if not (root / 'SKILL.md').is_file():
    raise SystemExit('Provide the adaptive-ui-designer skill directory.')
catalog = json.loads((root / 'assets/font-catalog.json').read_text(encoding='utf-8'))
body = (root / 'scripts/font-runtime-body.js.txt').read_text(encoding='utf-8')
js = '/* Generated from font-catalog.json. No network API or OS font installation. */\nwindow.AdaptiveUIFontKit=(()=>{\nconst catalog='
js += json.dumps(catalog, ensure_ascii=False, separators=(',', ':')) + ';\n' + body + '\n})();\n'
(root / 'assets/font-preferences.js').write_text(js, encoding='utf-8')
css = ['/* Font preference selectors. Load font-faces.css for bundled families. */']
for p in catalog['uiPresets']:
    css.append('[data-ui-font="' + p['id'] + '"] { --font-ui: ' + p['stack'] + '; }')
for p in catalog['monoPresets']:
    css.append('[data-mono-font="' + p['id'] + '"] { --font-mono: ' + p['stack'] + '; }')
css += ['.selected-ui-font { font-family: var(--font-ui, system-ui, sans-serif); }', '.selected-mono-font { font-family: var(--font-mono, ui-monospace, monospace); font-variant-numeric: tabular-nums; }']
(root / 'assets/font-presets.css').write_text('\n'.join(css) + '\n', encoding='utf-8')
print('Font preference JS/CSS regenerated from the local catalog.')
