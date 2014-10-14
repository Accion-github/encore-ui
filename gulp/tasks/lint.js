var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// JSHint and jscs
gulp.task('lint', function () {
    return gulp.src(['./app/scripts/**/*.js', '!./app/scripts/templates.js'])
        .pipe(plumber())
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish)); // Console output
});

gulp.task('lint:strict', function () {
    return gulp.src(['./app/scripts/**/*.js', '!./app/scripts/templates.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish)) // Console output
        .pipe(jshint.reporter('fail')); // Fail on error
});