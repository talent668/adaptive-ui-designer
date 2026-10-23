# Maintenance and lightweight packaging

The runtime consists of instructions, a local-font catalog and buildless preview/generator resources. Font binaries and historical screenshots/reports do not belong in the runtime package.

## Change according to use

Keep workflow decisions in the entrypoint, detailed mechanisms in their one reference, and code contracts in maintained scripts. Do not accumulate another universal rule or Markdown file for every past defect. Consolidate repeated advice instead of duplicating it across topics.

A maintainer checkout retains tests and locked development dependencies; the runtime ZIP omits that toolchain. Run these commands only where package.json and tests are present. `npm ci` followed by `npm test` runs the versioned unit/DOM suite. `npm run test:build` checks generated targets; `npm run cases` adds domain fixtures when generator behavior changes. These commands may need development packages and registry access; an ordinary page task does not need the full maintenance suite.

After changes check:

1. Frontmatter and local documentation links.
2. JavaScript syntax and relevant unit/DOM tests.
3. Actual integrated studio behavior: default preview, prepared directions, local font/fallback status, themes, locale, feedback and immutable confirmation.
4. HTML/React/Vue exports when generation changes, including a ZIP round trip and retained design values.
5. Archive contents: no font binaries, `node_modules`, credentials, historical screenshots or copied unused galleries.

Regenerate `font-preferences.js` and `font-presets.css` with `python scripts/build-font-preferences.py .` after changing the catalog. Its entries are local names and descriptions; keep generated files aligned with the JSON.

Use [package-project.py](../scripts/package-project.py) to gather project HTML entries and their local dependencies. It resolves paths within the selected root and excludes known development/history/font-binary artifacts. Inspect its report and verify the extracted page; computed size alone is not functional evidence.

Discovery handles HTML attributes, inline/external CSS and literal JavaScript imports, fetches, module-relative URLs and resource assignments. It is not a JavaScript evaluator: declare computed paths and other dynamic dependencies with `--include`. Packager regression tests use the local `python` command (or `PYTHON` environment variable).

Original development examples, tests and source history may be retained in a backup or maintainer checkout. They are useful for specific maintenance, not mandatory resources to load into every design task. Native CLI authentication/discovery checks are separate from browser and generated-build checks and need not run during a documentation cleanup.
