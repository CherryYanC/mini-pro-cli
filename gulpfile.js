const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('./tsconfig.json')
const del = require('del')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename'); // 重命名插件
const sass = require('gulp-sass');

const output = './dist'

// 编译节流
let timer = undefined
function debounce(task, delay) {
  return function (done) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      task.call(undefined)
      timer = undefined
      done()
    }, delay)
  }
}

// clean dist
function clean(done) {
  return del(['dist'], done)
}

// 编译Ts
function compileTs() {
  return tsProject.src()
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.toString())
        this.emit('end')
      }
    }))
    .pipe(tsProject())
    .pipe(gulp.dest(output))
}

// 复制不相关文件
function copy() {
  return gulp.src([
    './src/**/*',
    '!./src/**/*.scss',
    '!./src/**/*.ts',
  ]).pipe(gulp.dest(output))
}

// 编译sass
function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(output))
}

// 监听任务
function watchTask(done) {
  gulp.watch(['src/**/*.ts'], compileTs)
  gulp.watch(['src/**/*.scss'], compileScss)
  gulp.watch(['src/**/*.wxml', 'src/**/*.json'], copy)
  done()
}

gulp.task('clean:dist', clean)
gulp.task('build', gulp.series(copy, compileScss, compileTs))
gulp.task('watch', debounce(gulp.series(copy, compileScss, compileTs, watchTask), 2500))
