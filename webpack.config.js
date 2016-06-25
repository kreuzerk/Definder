var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Webpack Config
var webpackConfig = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor':    './src/vendor.ts',
		'app':       './src/bootstrap.ts',
	},

	output: {
		path: 'app/build',
	},

	plugins: [
		new ExtractTextPlugin("style.css"),
		new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
	],

	module: {
		loaders: [
			{ test: /\.ts$/,   loader: 'awesome-typescript-loader' },
			{ test: /\.html$/, loader: 'html-loader' },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')},
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader'},
			{ test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
			{ test: /\.ttf$/, loader: 'file-loader'},
			{ test: /\.eot$/, loader: 'file-loader'}
		]
	},

	devServer: {
		contentBase: 'app',
		publicPath: '/build',
	},

};


// Our Webpack Defaults
var defaultConfig = {
	devtool: 'source-map',
	cache: true,
	debug: true,
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					// these packages have problems with their sourcemaps
					path.join(__dirname, 'node_modules', 'rxjs'),
					path.join(__dirname, 'node_modules', '@angular2-material'),
				]
			}
		],
		noParse: [
			path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
			path.join(__dirname, 'node_modules', 'angular2', 'bundles')
		]
	},

	resolve: {
		root: [ path.join(__dirname, 'src') ],
		extensions: ['', '.ts', '.js', '.json', '.png']
	},

	devServer: {
		historyApiFallback: true,
		watchOptions: { aggregateTimeout: 300, poll: 1000 }
	},

	node: {
		global: 1,
		crypto: 'empty',
		module: 0,
		Buffer: 0,
		clearImmediate: 0,
		setImmediate: 0
	},
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
