const mainWebpack = require('./webpack.main.prod.config');
const rendererWebpack = require('./webpack.renderer.prod.config');
module.exports = [mainWebpack, rendererWebpack];
