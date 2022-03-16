const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');

const filePaths = {
	scss: {
		src: ['./src/scss/configs/reset.scss', './src/scss/configs/variables.scss', './src/scss/configs/fonts.scss', './src/scss/configs/typography.scss', './src/scss/configs/global.scss', './src/scss/sections/**/*.scss'],
		dist: ['./css']
	},
	js: {
		src: ['./src/**/*.js'],
		dist: ['./js']
	},
	assets: {
		src: ['./src/assets/**/*'],
		dist: ['./assets']
	}
};

const scssTask = (done) => {
	gulp.src(filePaths.scss.src)
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(dest(filePaths.scss.dist[0]));
	done();
};

const jsTask = (done) => {
	gulp.src(filePaths.js.src)
		.pipe(webpackStream(webpackConfig))
		.pipe(dest(filePaths.js.dist[0]));
	done();
};

const assetsTask = (done) => {
	gulp.src(filePaths.assets.src)
	.pipe(gulp.dest(filePaths.assets.dist[0]));
	done();
};

const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' }, 
		open: false,
		port: 3005, 
		ui: { port: 3006 }
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filePaths.scss.src, scssTask).on('change', browserSync.reload);
	gulp.watch(filePaths.js.src, jsTask).on('change', browserSync.reload);
};

exports.build = parallel(scssTask, jsTask, assetsTask);
exports.default = series(exports.build, watchTask);