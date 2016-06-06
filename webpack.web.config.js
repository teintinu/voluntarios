/* global __dirname */

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: "./client/index.imba",
	output: { 
      path: __dirname + '/server/static',
      filename: "bundle.js" 
    },
	module: {
	  loaders: [
	    { test: /\.imba$/, "loader": 'imba-loader'},
	    { test: /\.css$/, "loader": 'style-loader!css-loader!postcss-loader'},
      { test: /\.js$/, exclude: /(node_modules)|(third)/, loader: "babel-loader", query: { presets:['es2015'] } }
	  ],
	},
	resolve: {extensions: ['', '.imba', '.js', '.css']},
	resolveLoader: { root: path.join(__dirname, "node_modules") },
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({"Imba.SERVER": false,"Imba.CLIENT": true}),
		new HtmlPlugin({
		    template: path.resolve(__dirname + '/server/static', 'feio.html'),
		    filename: 'feio.html',
		    inject: 'body'
		}),
		new HtmlPlugin({
		    template: path.resolve(__dirname + '/server/static', 'index.html'),
		    filename: 'index.html',
		    inject: 'body'
		})
		// new WriteFilePlugin()
	],
	postcss: function () {
        return [precss, autoprefixer];
    },

    stats: {
      colors: true,
      reasons: true
    }
}
