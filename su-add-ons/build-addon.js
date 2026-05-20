const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = __dirname;
const ngExecutable = path.join(
  repoRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'ng.cmd' : 'ng'
);

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: {
      ...process.env,
      BUILD_ADDON_MAPPING: 'true'
    },
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

runCommand(process.execPath, ['prebuild.js']);
runCommand(ngExecutable, ['build']);
runCommand(process.execPath, ['postbuild.js']);
