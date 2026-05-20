const fs = require('fs');
const path = require('path');
const { resolveActiveAddon } = require('./addon-profile-utils');

const assetBaseOutPath = path.resolve(__dirname, 'src/app/state/asset-base.generated.ts');
const activeAddonOutPath = path.resolve(__dirname, 'src/app/state/active-addon.generated.ts');

function writeGeneratedTs(filePath, source) {
    fs.writeFileSync(filePath, source.trimStart() + '\n');
    console.log(`Wrote generated file: ${path.relative(__dirname, filePath)}`);
}

try {
    const activeAddon = resolveActiveAddon();
    const assetBaseUrl = activeAddon.env.ASSET_BASE_URL || '';
    const useBuildAddonMapping = activeAddon.env.BUILD_ADDON_MAPPING === 'true';

    writeGeneratedTs(
        assetBaseOutPath,
        `export const assetBaseUrl = ${JSON.stringify(assetBaseUrl)};`
    );

    writeGeneratedTs(
        activeAddonOutPath,
        `
export const activeAddonKey = ${JSON.stringify(activeAddon.addonKey)};

export const activeAddonBuildConfig = {
  buildName: ${JSON.stringify(activeAddon.buildName)},
  remoteName: ${JSON.stringify(activeAddon.remoteName)},
  exposedModule: ${JSON.stringify(activeAddon.exposedModule)},
  packageName: ${JSON.stringify(activeAddon.packageName)}
} as const;

export const useBuildAddonMapping = ${JSON.stringify(useBuildAddonMapping)};
`
    );

    if (useBuildAddonMapping) {
        console.log(`Build add-on: ${activeAddon.addonKey}`);
    } else {
        console.log(`Local dev mode: using local selector map (build target default: ${activeAddon.addonKey})`);
    }
    console.log('Prebuild completed successfully.');
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
