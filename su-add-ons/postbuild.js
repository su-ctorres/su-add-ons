const fs = require('fs');
const path = require('path');
const { resolveActiveAddon } = require('./addon-profile-utils');

const distPath = path.join(__dirname, 'dist', 'custom-module');
const activeAddon = resolveActiveAddon();
const addonsDistPath = path.join(__dirname, 'dist', 'addons');
const targetPath = path.join(addonsDistPath, activeAddon.packageName);

function removeDirectory(directory, callback) {
    fs.rm(directory, { recursive: true, force: true }, callback);
}

function moveBuildOutput() {
    fs.mkdirSync(addonsDistPath, { recursive: true });

    fs.rename(distPath, targetPath, (err) => {
        if (err) throw err;
        console.log(`Renamed directory to ${targetPath}`);
        console.log(`Add-on build is ready for static hosting at /${path.basename(targetPath)}/`);
    });
}

// Check if target directory exists and remove it if it does
if (fs.existsSync(targetPath)) {
    removeDirectory(targetPath, (err) => {
        if (err) throw err;
        moveBuildOutput();
    });
} else {
    moveBuildOutput();
}
