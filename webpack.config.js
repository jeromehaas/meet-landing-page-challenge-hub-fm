const path = require('path');

module.exports = {
	entry: './src/js/main.js',
	resolve: {
		extensions: ['.webpack.js', '.js']
	},
	mode: 'production',
	performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
	output: {
		filename: '[name].build.js',
		path: path.join(__dirname, 'js'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					}
				}
			}
		]
	}
}