'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('browser-sync', () => {
    browserSync.init(null,{
        proxy: "http://localhost:5555",
        port: 4444,
        //notify: true
    });
});

gulp.task('sass', () => {
    return gulp.src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', ['sass', reload]);
    gulp.watch('./views/**/*.handlebars', reload);
});


gulp.task('default', ['browser-sync','sass', 'watch']);