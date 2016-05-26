var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css'
//Styles here
gulp.task('styles', function (){
	console.log("style here");
   return gulp.src(['public/css/reset.css',CSS_PATH])
   .pipe(concat('styles.css'))
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
});
//Images Compressed