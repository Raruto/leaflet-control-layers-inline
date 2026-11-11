const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { copyFileSync, mkdtempSync, mkdirSync, rmSync, writeFileSync, readFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { Then } = require('@cucumber/cucumber');

Then('release preparation updates scoped package references', function () {
  const root = mkdtempSync(path.join(tmpdir(), 'leaflet-release-'));
  try {
    mkdirSync(path.join(root, 'build'));
    copyFileSync(path.join(__dirname, '..', '..', 'build', 'version.js'), path.join(root, 'build', 'version.js'));
    const manifest = path.join(root, 'package.json');
    const example = path.join(root, 'example.txt');
    const npm = path.join(root, 'npm.js');
    writeFileSync(manifest, JSON.stringify({ name: '@raruto/test-plugin' }));
    writeFileSync(example, '@raruto/test-plugin@1.0.0 @raruto/test-plugin@next');
    writeFileSync(npm, 'process.exit(0)');
    execFileSync('git', ['init', '-q', root]);
    execFileSync('git', ['add', '--', 'package.json', 'example.txt'], { cwd: root });
    const env = { ...process.env, npm_new_version: '1.1.0-beta.1', npm_execpath: npm };
    execFileSync(process.execPath, ['build/version.js'], { cwd: root, env });
    assert.equal(readFileSync(example, 'utf8'), '@raruto/test-plugin@1.1.0-beta.1 @raruto/test-plugin@next');
    writeFileSync(manifest, JSON.stringify({ name: '@raruto/no-references' }));
    execFileSync(process.execPath, ['build/version.js'], { cwd: root, env });
    writeFileSync(npm, 'process.exit(1)');
    assert.throws(() => execFileSync(process.execPath, ['build/version.js'], { cwd: root, env, stdio: 'pipe' }));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
