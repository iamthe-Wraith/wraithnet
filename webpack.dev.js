const mainWebpack = require('./webpack.main.dev.config');
const rendererWebpack = require('./webpack.renderer.dev.config');
module.exports = [mainWebpack, rendererWebpack];
