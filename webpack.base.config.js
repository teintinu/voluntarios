/* global __dirname */

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');

// var WriteFilePlugin = require('write-file-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

var clientPath = path.join(__dirname, 'client');
var deployPath = path.join(__dirname, 'server/static');

var config = {
	entry: clientPath + "/_index/index.imba",
	output: {
      path: deployPath,
      filename: "bundle.js"
    },
	module: {
	  loaders: [
      //{ test: /\.html$/, loader: 'html' },
      { test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file?name=[name].[ext]" },
	    { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.imba$/, loader: 'imba-loader'},
      { test: /\.ts$/, loader: 'ts-loader?configFileName=client/tsconfig.json' },
      { test: /\.js$/,
      	exclude: /(node_modules)|(third)/,
       	loader: "babel-loader",
       	query: { presets:['es2015'] }
       }
	  ],
	},
	resolve: {extensions: ['', '.imba', '.js', '.ts', '.css']},
	resolveLoader: { root: path.join(__dirname, "node_modules") },
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({"Imba.SERVER": false,"Imba.CLIENT": true}),
		// new HtmlPlugin({
		//     template: path.resolve(clientPath, 'feio.html'),
		//     filename: 'feio.html',
		//     inject: 'body'
		// }),
		new HtmlPlugin({
		    template: path.resolve(clientPath, '_index/client.html'),
		    filename: 'index.html',
		    inject: 'html'
		})
		// new WriteFilePlugin()
	],
	postcss: function () {
        return [precss, autoprefixer];
    },

    stats: {
      colors: true,
      reasons: true
    },

   devServer: {}
}

module.exports = {
  config: config,
  clientPath: clientPath,
  deployPath: deployPath
}
