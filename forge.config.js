module.exports = {
    plugins: [
        ['@electron-forge/plugin-webpack', {
            mainConfig: './webpack.main.prod.config.js',
            renderer: {
                config: './webpack.renderer.prod.config.js',
                entryPoints: [{
                    name: 'Wraithnet',
                    js: './dist/electron.js'
                }]
            }
        }]
    ]
}