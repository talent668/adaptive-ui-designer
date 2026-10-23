/* Prepare isolated project-local skills. Does not install CLIs, log in or invoke a model. */
const fs = require('node:fs/promises'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const targets = { codex: '.agents/skills', claude: '.claude/skills', kilo: '.kilo/skills', opencode: '.opencode/skills' };
const skip = new Set(['node_modules', '.git', '.validation']);
async function copyTree(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    if (entry.isSymbolicLink()) throw new Error('Symlinks are not copied into CLI fixtures');
    if (entry.isDirectory()) await copyTree(path.join(from, entry.name), path.join(to, entry.name));
    else if (!entry.name.endsWith('.log')) await fs.copyFile(path.join(from, entry.name), path.join(to, entry.name));
  }
}
(async () => {
  const digest = crypto.createHash('sha256').update(await fs.readFile(path.join(root, 'SKILL.md'))).digest('hex');
  for (const [client, directory] of Object.entries(targets)) {
    const project = path.join(root, '.validation', 'cli', client);
    const skill = path.join(project, directory, 'adaptive-ui-designer');
    await copyTree(root, skill);
    await fs.writeFile(path.join(project, 'index.html'), '<!doctype html><html lang="en"><title>Order desk</title><style>body{font:12px serif;background:#dff}button{border-radius:0}table{width:100%}</style><h1>Orders</h1><button>Delete all</button><button>Review exception</button><table><tr><th>Order</th><th>Status</th><th>Owner</th></tr><tr><td>ORD-81</td><td>Address check needed</td><td>Lee</td></tr></table></html>');
    await fs.writeFile(path.join(project, 'smoke-prompt.txt'), 'Use the project-local adaptive-ui-designer skill. Inspect index.html for this desktop order-operations tool. Only produce a short read-only assessment, no file edits or network calls. State the loaded skill path, inferred stack, provisional source-only score with limitations, two important problems, one thing to retain, and two concrete alternative layout/button/material directions. State what should be shown and confirmed before implementation. Do not claim to have seen a rendered screenshot. End with the exact relative path of the skill reference you used for button decisions.');
    await fs.writeFile(path.join(project, 'fixture.json'), JSON.stringify({ client, skill: directory + '/adaptive-ui-designer', entrySha256: digest, scope: 'isolated source-only design assessment' }, null, 2));
    console.log(`${client}: ${path.relative(root, project)}`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
