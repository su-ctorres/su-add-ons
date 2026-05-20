const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { resolveAllAddons } = require('./addon-profile-utils');

const repoRoot = __dirname;
const ngExecutable = path.join(
  repoRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'ng.cmd' : 'ng'
);
const distAddonsPath = path.join(repoRoot, 'dist', 'addons');
const buildOutputPath = path.join(repoRoot, 'dist', 'custom-module');

function runCommand(command, args, env) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: {
      ...process.env,
      ...env
    },
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function ensureNgExists() {
  if (!fs.existsSync(ngExecutable)) {
    console.error(`Angular CLI executable not found at ${ngExecutable}`);
    process.exit(1);
  }
}

function cleanDistAddons() {
  fs.rmSync(distAddonsPath, { recursive: true, force: true });
  fs.mkdirSync(distAddonsPath, { recursive: true });
}

function cleanBuildOutput() {
  fs.rmSync(buildOutputPath, { recursive: true, force: true });
}

function buildAddon(addon) {
  const env = {
    ADDON_KEY: addon.addonKey,
    BUILD_NAME: addon.buildName,
    BUILD_ADDON_MAPPING: 'true',
    REMOTE_NAME: addon.remoteName,
    PACKAGE_NAME: addon.packageName
  };

  console.log(`\n=== Building add-on: ${addon.addonKey} ===`);
  cleanBuildOutput();
  runCommand(process.execPath, ['prebuild.js'], env);
  runCommand(
    ngExecutable,
    ['build', '--configuration', 'production', '--delete-output-path=false'],
    env
  );
  runCommand(process.execPath, ['postbuild.js'], env);
}

ensureNgExists();
cleanDistAddons();

for (const addon of resolveAllAddons()) {
  buildAddon(addon);
}

console.log('\nAll add-ons built successfully.');
