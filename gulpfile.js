"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./source"
        }
    });
});

gulp.task("sass", function() {
    return gulp.src("source/sass/style.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "IE 11", 'Firefox ESR'],
            cascade: false
        }))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
    gulp.watch("source/*.html").on("change", browserSync.reload);
    gulp.watch("source/js/*.js").on("change", browserSync.reload);
});

gulp.task('default', gulp.series(
    gulp.parallel('sass'),
    gulp.parallel('watch', 'serve')
));