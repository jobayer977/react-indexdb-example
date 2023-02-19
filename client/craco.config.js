const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
	webpack: {
		alias: {
			'@application': path.resolve(__dirname, './src/@application'),
			'@features': path.resolve(__dirname, './src/features'),
		},
	},
	style: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
