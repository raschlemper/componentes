var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var install = require('gulp-install');
var ngHtml2Js = require("gulp-ng-html2js");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglifyjs');
var filesize = require('gulp-filesize');
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');

var htmlminConfig = function() {
	return htmlmin({
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true
    });
}

gulp.task('table-clean', function () {
	return gulp.src('table/dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('table-install', function () {
	gulp.src(['table/bower.json'])
		.pipe(install());
});

gulp.task('table-css', function () {
  return gulp.src('table/src/css/*.css')
  .pipe(concat('app-table.css'))
  .pipe(gulp.dest('table/dist/css/'));
});

gulp.task('table-template', function() {
  	gulp.src('table/src/templates/*.html')
        .pipe(htmlminConfig())
        .pipe(ngHtml2Js({
	        moduleName: "appTable.templates"
	    }))
    	.pipe(concat('app-table-tpls.js'))
        .pipe(gulp.dest('table/dist/js/'));
});

gulp.task('table-js', function() {
  	gulp.src(['table/src/*.js'])
		.pipe(concat('app-table.js'))
		.pipe(gulp.dest('table/dist/js/'));
});

// gulp.task('table-js-min', function () {
//   	gulp.src(['table/dist/app-table.js'])
// 		.pipe(uglify())
// 		.pipe(filesize())
// 		.pipe(concat('app-table.min.js'))
// 		.pipe(gulp.dest('table/dist/js/'));
// });

// gulp.task('table-js-template-min', function () {
//   	gulp.src(['table/dist/app-table-tpls.js'])
// 		.pipe(uglify())
// 		.pipe(filesize())
// 		.pipe(concat('app-table-tpls.min.js'))
// 		.pipe(gulp.dest('table/dist/js/'));
// });

// var minifyVisionCss = function (sources, fileName) {
//   return gulp.src(sources)
//   .pipe(sass({'sourcemap=none': true}))
//   .pipe(autoprefixer())
//   .pipe(filesize())
//   .pipe(minifyCss())
//   .pipe(concat(fileName))
//   .pipe(filesize())
//   .pipe(gulp.dest('client/dist/css/'))
//   .on('error', gutil.log);
// };

// gulp.task('sass-access:min', function () {
//   minifyVisionCss([
//     'client/sass/bootstrap-override.scss',
//     'client/sass/access.scss'
//   ], 'access.min.css');
// });

gulp.task('table', ['table-clean'], function () {
	runSequence('table-install','table-css', 'table-template','table-js');
});