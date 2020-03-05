const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	// 基本路径
	publicPath: '/',
	// 输出文件目录
	outputDir: 'dist',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: (config) => {
		config.module.rules.delete("svg");
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include
			.add(resolve('src/icons')) //处理svg目录
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置
			config.plugins.push(
				//生产环境自动删除console
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false,
							drop_debugger: true,
							drop_console: true,
						},
					},
					sourceMap: false,
					parallel: true,
				})
			);
		} else {
			// 为开发环境修改配置
		}
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: true,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		// extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: '@import "~@/assets/css/var.scss";',
			},
		},
		// 启用 CSS modules for all css / pre-processor files.
		// requireModuleExtension: false
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	// 是否启用dll
	// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: null, // 设置代理
		overlay: {
		  warnings: true,
		  errors: true
		},
		before: app => {},
	},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
}
