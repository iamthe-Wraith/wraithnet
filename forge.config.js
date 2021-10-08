const path = require('path');

const config = {
    packagerConfig: {
        name: 'wraithnet',
        executableName: 'wraithnet',
        asar: true,
        icon: path.resolve(__dirname, 'src', 'assets', 'wraithnet-logo.icns'),
        appBundleId: 'com.electron.wraithnet',
        osxSign: {
            identity: 'Apple Development: allhailthewraith@protonmail.com (3X4XYG8SH3)',
            'hardened-runtime': true,
            'signature-flags': 'library',
            'gatekeeper-assess': false,
            entitlements: 'static/entitlements.plist',
            'entitlements-inherit': 'static/entitlements.plist',
            'signature-flags': 'library',
        },
    },
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'wraithnet'
            }
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: [
                'darwin'
            ]
        },
        {
            name: '@electron-forge/maker-deb',
            config: {}
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {}
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'iamthe-Wraith',
                    name: 'wraithnet'
                },
                draft: true,
                prerelease: false
            }
        }
    ]
};

function notarizeMaybe() {
    // if not on macos, do not notarize
    if (process.platform !== 'darwin') {
        return;
    }
  
    if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
        console.warn(
            'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!',
        );
        return;
    }

    config.packagerConfig.osxNotarize = {
        appBundleId: 'com.electron.wraithnet',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_ID_PASSWORD,
        ascProvider: '3X4XYG8SH3',
    };
}
  
notarizeMaybe();

module.exports = config;