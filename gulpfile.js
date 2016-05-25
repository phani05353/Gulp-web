var gulp = require('gulp');
var uglify = require('gulp-uglify');


//Styles here
gulp.task('styles', function (){
	console.log("style here");
});

//Scripts
gulp.task('default' , function(){
   console.log("default here ");
});


gulp.task('scripts' , function(){
   console.log("Scripts here ");

   return gulp.src('public/scripts/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('public/dist'));
});

gulp.task('images' , function(){
   console.log("images here ");
});


//Images Compressed