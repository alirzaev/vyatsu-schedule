const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
		schedule: './src/schedule.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
}