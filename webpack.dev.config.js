/* global __dirname */

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');

// var WriteFilePlugin = require('write-file-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

var clientPath = path.join(__dirname, 'client');
var deployPath = path.join(__dirname, 'server/static');

module.exports = {
	entry: clientPath + "/index.imba",
	output: { 
      path: deployPath,
      filename: "bundle.js" 
    },
	module: {
	  loaders: [
        //{ test: /\.html$/, loader: 'html' },
        { test: /\.imba$/, loader: 'imba-loader'},
	    { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
        { test: /\.js$/, 
        	exclude: /(node_modules)|(third)/, 
        	loader: "babel-loader", 
        	query: { presets:['es2015'] } 
        },
        {
            test: [/MaterialIcons-Regular.eot/, /MaterialIcons-Regular.woff2/, /MaterialIcons-Regular.woff/, /MaterialIcons-Regular.ttf/],
            loader: 'file?name=fonts/[name].[ext]'
        }        
	  ],
	},
	resolve: {extensions: ['', '.imba', '.js', '.css']},
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
		    template: path.resolve(clientPath, 'index.html'),
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
    },

    devtool: 'source-map',
    cache: true,
    debug: true,
    devServer: {
      contentBase: deployPath,
      port: 7000,
      hot: true,
      inline: true
    }
}
