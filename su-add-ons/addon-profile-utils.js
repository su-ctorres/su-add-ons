const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envFilePath = path.resolve(__dirname, 'build-settings.env');
const profilesPath = path.resolve(__dirname, 'addon-profiles.json');

function readEnvFile() {
  if (!fs.existsSync(envFilePath)) {
    return {};
  }

  return dotenv.parse(fs.readFileSync(envFilePath, 'utf8'));
}

function readMergedEnv(overrides = {}) {
  return {
    ...readEnvFile(),
    ...Object.fromEntries(
      Object.entries(process.env).filter(([, value]) => value !== undefined)
    ),
    ...overrides
  };
}

function loadProfiles() {
  if (!fs.existsSync(profilesPath)) {
    throw new Error('addon-profiles.json file not found.');
  }

  return JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
}

function getDefaultAddonKey(profileConfig) {
  return Object.keys(profileConfig.addons || {})[0];
}

function getLocalFallbackAddon(env) {
  return {
    env,
    addonKey: '',
    buildName: 'custom-module',
    remoteName: 'customModule',
    exposedModule: './custom-module',
    packageName: 'custom-module'
  };
}

function sanitizeRemoteName(value) {
  const cleaned = `${value || ''}`.replace(/[^a-zA-Z0-9]/g, ' ');
  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return 'customModule';
  }

  return parts
    .map((part, index) =>
      index === 0
        ? part.charAt(0).toLowerCase() + part.slice(1)
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
}

function resolveAddon(addonKey, overrides = {}) {
  const env = readMergedEnv(overrides);
  const profileConfig = loadProfiles();
  const resolvedAddonKey = addonKey || env.ADDON_KEY || getDefaultAddonKey(profileConfig);
  const profile = profileConfig.addons?.[resolvedAddonKey];

  if (!profile) {
    if (!resolvedAddonKey && env.BUILD_ADDON_MAPPING !== 'true') {
      return getLocalFallbackAddon(env);
    }

    throw new Error(`Unknown add-on key "${resolvedAddonKey}" in build-settings.env.`);
  }

  const buildName = env.BUILD_NAME || profile.buildName || resolvedAddonKey;
  const remoteName = sanitizeRemoteName(env.REMOTE_NAME || profile.remoteName || buildName);
  const exposedModule = profile.exposedModule || `./${resolvedAddonKey}`;
  const packageName = env.PACKAGE_NAME || buildName;

  return {
    env,
    addonKey: resolvedAddonKey,
    buildName,
    remoteName,
    exposedModule,
    packageName
  };
}

function resolveActiveAddon(overrides = {}) {
  return resolveAddon(undefined, overrides);
}

function resolveAllAddons() {
  const profileConfig = loadProfiles();
  return Object.entries(profileConfig.addons || {})
    .filter(([, profile]) => profile.buildable !== false)
    .map(([addonKey]) => resolveAddon(addonKey));
}

module.exports = {
  loadProfiles,
  readEnvFile,
  readMergedEnv,
  resolveAddon,
  resolveAllAddons,
  resolveActiveAddon,
  sanitizeRemoteName
};
