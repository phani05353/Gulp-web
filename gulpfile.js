var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css'
//Styles here
// gulp.task('styles', function (){
// 	console.log("style here");
//    return gulp.src(['public/css/reset.css',CSS_PATH])
//    .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//    }))
//    .pipe(sourcemaps.init())
//    .pipe(autoprefixer())
//    .pipe(concat('styles.css'))
//    .pipe(minifyCss())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest(DIST_PATH))
//    .pipe(livereload());
// });

//scss styles
gulp.task('styles', function (){
   console.log("style here");
   return gulp.src('public/scss/styles.scss')
   .pipe(plumber(function (err) {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
   }))
   .pipe(sourcemaps.init())
   .pipe(autoprefixer())
   .pipe(sass({
      outputStyle: 'compressed'
   }))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(DIST_PATH))
   .pipe(livereload());
});

//Scripts
gulp.task('default' , function(){
   console.log("default here ");
});

//file paths



gulp.task('scripts' , function(){
   console.log("Scripts here ");

   return gulp.src(SCRIPTS_PATH)
   .pipe(uglify())
   .pipe(gulp.dest(DIST_PATH))
   .pipe(livereload());
});

gulp.task('images' , function(){
   console.log("images here ");
});

gulp.task('watch' , function() {
	console.log('chnge here');
	require('./server.js');
   livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
   //gulp.watch(CSS_PATH, ['styles']);
   gulp.watch('public/scss/**/*.scss',['styles']);
});
//Images Compressed