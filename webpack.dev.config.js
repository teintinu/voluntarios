var base = require('./webpack.base.config.js');
var config = base.config;
var deployPath = base.deployPath;

config.devtool = 'source-map';
config.cache = true;
config.debug = true;
config.devServer.contentBase = deployPath;
config.devServer.port = 7000;
config.devServer.hot = true;
config.devServer.inline = true;

module.exports = config;

