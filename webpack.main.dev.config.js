const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main/electron.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'electron.js',
    },
    target: 'electron-main',
    externals: {
        fsevents: "require('fsevents')",
        'electron-reload': "require('electron-reload')",
    },
    module: {
        rules: [
            {
            test: /\.ts(x?)$/,
            include: /src/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                                targets: {
                                    browsers: 'last 2 versions, ie 11',
                                    node: 'current',
                                },
                            },
                        ],
                        '@babel/preset-typescript',
                        ],
                    },
                },
            ],
            },
            {
                test: /\.node$/,
                use: ['node-loader'],
            },
        ],
    },
    resolve: {
    extensions: ['.ts', '.js', '.json'],
    },
}