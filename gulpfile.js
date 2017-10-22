'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

gulp.task('browser-sync', () => {
    browserSync.init(null,{
        proxy: "http://localhost:5555",
        port: 3333
    });
});

gulp.task('sass', () => {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('javascript', () => {
    return gulp.src('./assets/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copy', () => {
    return gulp.src('./bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
})
gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', ['sass', reload]);
    gulp.watch('./assets/js/**/*.js', ['javascript', reload]);
    gulp.watch('./views/**/*.handlebars', reload);
});


gulp.task('default', ['browser-sync','sass','javascript', 'copy', 'watch']);