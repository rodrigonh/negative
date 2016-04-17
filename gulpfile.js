'use strict';

const changed       = require('gulp-changed');
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const watch         = require('gulp-watch');
const minifyCss     = require('gulp-minify-css');
const concat        = require('gulp-concat');
const wrap          = require('gulp-wrap');
const gulpUglify    = require('gulp-uglify/minifier');
const uglifyJs      = require('uglify-js');
const jsDest        = 'view';
const jsIndexSrc    = [
	'view/js/services/negative-undo.js',
	'view/js/controllers/negative-frame.js',
	'view/js/controllers/negative-tabs.js',
	'view/js/negative.js'
];
const jsSettingsSrc = [
	'view/js/controllers/settings-form.js',
	'view/js/settings.js'
];
const sassSrc       = 'view/**/*.scss';
const sassDest      = 'view';

function buildJs(src, dest, filename) {
	return gulp.src(src)
		.pipe(concat(filename))
		.pipe(wrap("(function (window, document, JSON) { 'use strict'; <%= contents %> })(window, document, JSON);"))
		.pipe(gulpUglify({}, uglifyJs).on('error', (err) => console.log(err)))
		.pipe(changed(jsDest, {
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest(dest));
}

gulp.task('sass', () => {
	return gulp.src(sassSrc)
		.pipe(sass())
		.pipe(minifyCss())
		.pipe(changed(sassDest, {
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest(sassDest));
});

gulp.task('js-index',    () => buildJs(jsIndexSrc, jsDest, 'index.js'));
gulp.task('js-settings', () => buildJs(jsSettingsSrc, jsDest, 'settings.js'));

gulp.task('watch', () => {
	watch(sassSrc,       () => gulp.start('sass'));
	watch(jsIndexSrc,    () => gulp.start('js-index'));
	watch(jsSettingsSrc, () => gulp.start('js-settings'));
});

gulp.task('default', [ 'js-index', 'js-settings', 'sass', 'watch' ]);
