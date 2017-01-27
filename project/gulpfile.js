var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');

gulp.task('sass', function () {
    gulp.src('./gulp/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%', 'last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('todo', function () {
    var compile = gulp.src('./gulp/js/todo.jsx')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch',function() {
    gulp.watch('./gulp/sass/**/*.scss',['sass']);
    gulp.watch('./gulp/js/todo.jsx',['todo']);
});

gulp.task('default', ['watch']);
