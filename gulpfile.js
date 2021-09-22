var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('sass', function () {
    console.log('sass updated');
    return gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/stylesheets/'));
    });
    
// gulp.task('scripts', function () {
//     console.log('scripts updates');
//     return gulp.src('./public/javascripts/perfectly/src/*.js')
//     .pipe(concat('perfectly.js'))
//     .pipe(gulp.dest('./public/javascripts/perfectly/dist/'))    
//     .pipe(uglify())
//     .pipe(rename('perfectly.min.js'))    
//     .pipe(gulp.dest('./public/javascripts/perfectly/dist/'));    
// });

gulp.task('browserSync', function () {
    browserSync.init({
        notify: false,
        proxy: "localhost:3000",
        port: 3000,
        reloadDelay: 50,
        injectChanges: true
    });
});

gulp.task('watch',  function () {
    console.log('watch');
    gulp.watch('./sass/*.scss').on('change', gulp.series('sass', browserSync.reload));        
    gulp.watch('./public/javascripts/hyperdata/*.js').on('change', gulp.series(browserSync.reload));        
    gulp.watch('./routes/*.js').on('change', gulp.series(browserSync.reload));
    gulp.watch('./views/*.pug').on('change', gulp.series(browserSync.reload));
    gulp.watch('./views/**/*.pug').on('change', gulp.series(browserSync.reload));
});

gulp.task('default', gulp.parallel('browserSync', 'watch', 'sass'));
