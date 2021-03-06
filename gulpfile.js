/**
 * Created by imacovei on 12/26/2016.
 */
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('build', function() {
    return gulp.src('app/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(livereload())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', [ 'build']);
    livereload.listen();
});

// Default Task
gulp.task('default', [ 'build', 'watch']);