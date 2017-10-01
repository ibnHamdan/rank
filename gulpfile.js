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
    return gulp.src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('copy', () => {
    return gulp.src('./bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
})
gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', ['sass', reload]);
    gulp.watch('./views/**/*.handlebars', reload);
});


gulp.task('default', ['browser-sync','sass','copy', 'watch']);