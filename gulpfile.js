const TerserPlugin = require("terser-webpack-plugin");
const pluginLessList = require('less-plugin-lists');
const parallel = require("concurrent-transform");

const ESLintPlugin = require('eslint-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const gulp = require('gulp');
const header = require('gulp-header');
const rename = require('gulp-rename');
// const cache = require('gulp-memory-cache');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const WebpackBar = require('webpackbar');
const refresh = require('gulp-refresh');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const fileinclude = require("gulp-file-include");
const imageResize = require('gulp-image-resize');
const inlineimg = require('gulp-inline-image-html');

const path = require('path');
const del = require('del');
const os = require('os');
const argv = require('yargs-parser')(process.argv.slice(2));

const comments = {
	
};

let watching = false;

const pubFolder = './public';

function isDev(){
	let config = require('./config_build.js');
	return watching ? config.__DEV__ : false;
}

let tasks = {
	build(cb){
		delete require.cache[require.resolve('./config_build.js')];
		let config = require('./config_build.js');
		
		return gulp.src(['src/**/*.{js,jsx}', '!src/**/_ignore/**'])
			.pipe(plumber())
			// .pipe(cache('js'))
			.pipe(webpack({
				devtool: 'source-map',
				mode: isDev() ? 'development' : 'production',
				// cache: {
				// 	type: 'memory',
				// 	cacheDirectory: `${pubFolder}/.babel_cache`,
				// },
				
				// snapshot: {
				// 	managedPaths: [path.resolve(__dirname, './node_modules')],
				// 	immutablePaths: [],
				// 	buildDependencies: {
				// 		hash: true,
				// 		timestamp: true,
				// 	},
				// 	module: {
				// 		timestamp: true,
				// 	},
				// 	resolve: {
				// 		timestamp: true,
				// 	},
				// 	resolveBuildDependencies: {
				// 		hash: true,
				// 		timestamp: true,
				// 	},
				// },
				
				experiments: {
					// asset: true,
					// topLevelAwait: true
				},
				output: {
					filename: '[name].js',
					chunkFilename: '[id].[chunkhash].js',
				},
				plugins: [
					new compiler.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
					new ESLintPlugin({
						fix: argv.fix ?? false,
					}),
					new NodePolyfillPlugin(),
					// new compiler.debug.ProfilingPlugin({
					// 	outputPath: path.join(__dirname, 'profiling/profileEvents.json'),
					// }),
					new WebpackBar({
						profile: true
					}),
				],
				resolve: {
					fallback: {
						"fs": false,
					},
				},
				module: {
					rules: [
						{
							test: /.+\.jsx?$/,
							loader: 'babel-loader',
							exclude: /node_modules/,
							options: {
								presets: [['@babel/env', { targets: "chrome 80" }], '@babel/react'],
								sourceMaps: true,
								plugins: ['source-map-support'],
							},
						},
						{
							test: /.+\.jsx?$/,
							exclude: /node_modules/,
							use: [
								{
									loader: 'ifdef-loader',
									options: config,
								},
							],
						},
						{
							test: /\.css$/i,
							use: ['style-loader', 'css-loader'],
						},
						{
							test: /\.less$/i,
							use: [
								{ loader: "style-loader" },
								{ loader: "css-loader" },
								{
									loader: "less-loader",
									options: {
										lessOptions: {
											// strictMath: true,
											plugins: [
												new pluginLessList(),
											],
										},
									},
								},
							],
						},
					],
				},
				optimization: {
					// splitChunks: {
					// 	name: 'vendor',
					// 	chunks: 'all',
					// },
					
					// minimize: !isDev(),
					// minimizer: [new TerserPlugin()],
				},
			}, compiler))
			.pipe(gulpIf(function(file) { return /^main\.js$/g.exec(file.basename) && isDev(); },
				header(`document.write('<script async src=\\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\\"></' + 'script>'); `)
			))
			// .pipe(gulpIf(function(file) { return /^main\.js$/g.exec(file.basename) && isDev(); },
			// 	gulp.dest(`${pubFolder}/assets/`)
			// ))
			.pipe(gulp.dest(`${pubFolder}/assets/`))
			.pipe(refresh())
	},
	
	serverRefresh(cb){
		try{
			require.cache[require.resolve('./server.js')].exports();
		}catch(e){
			console.log(e);
		}
		
		delete require.cache[require.resolve('./server.js')];
		require('./server.js')(pubFolder);
		
		gulp.watch(['server.js'], tasks.serverRefresh);
	},
	
	minimazeImg(cb){
		return gulp.src(`${pubFolder}/assets/img/*.*`)
			.pipe(
				parallel(
					imageResize({
						// width: 100,
						percentage: 10,
						format: 'webp',
						// crop: true,
						// upscale: false,
						// imageMagick: true,
					}),
					os.cpus().length
				),
			)
			.pipe(gulp.dest(`${pubFolder}/assets/img/min`))
			.pipe(refresh())
	},
	
	htmlCompile(cb){
		return gulp.src('src/html/**/*.html')
			.pipe(gulpIf(!isDev(), inlineimg()))
			.pipe(fileinclude({
				prefix: "@@",
				basepath: "@root",
				context: {
					__DEV__: isDev(),
				},
			}))
			.pipe(gulp.dest(`${pubFolder}/`))
			.pipe(refresh())
	},
	
	refresh(cb){
		return gulp.src('src/html/**/*.html')
			.pipe(refresh())
	},
	
	watch(cb){
		watching = true;
		refresh.listen();
		
		gulp.series(tasks.build, tasks.htmlCompile)();
		
		gulp.watch([
			`${pubFolder}/assets/img/src/**/*`,
			`!${pubFolder}/assets/img/src/**/_ignore/**`,
		], gulp.series(tasks.minimazeImg, tasks.htmlCompile));
		gulp.watch(['src/**/*.{js,jsx,less}', '!src/**/_ignore/**', 'config_build.js'], gulp.series(tasks.build, tasks.htmlCompile));
		gulp.watch(['src/html/**/*.html'], tasks.htmlCompile);
		gulp.watch(['server.js'], tasks.serverRefresh);
		
		require('./server')(pubFolder);
	}
}

exports.default	= gulp.series(tasks.minimazeImg, tasks.build, tasks.htmlCompile);

exports.build		= tasks.build;
exports.watch		= tasks.watch;
