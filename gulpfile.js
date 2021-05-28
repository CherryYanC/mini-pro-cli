// TODO: buid和watch，任务配置


const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('./tsconfig.json')
const del = require('del')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename'); // 重命名插件
const sass = require('gulp-sass');
const composer = require('gulp-uglify/composer')
const uglifyJs = require('uglify-js')
// 便于debug时找到映射到源码进行调试
const sourcemaps = require('gulp-sourcemaps')

const minify = composer(uglifyJs, console)
const output = './dist'

/**
 * 通过gulp.lastRun()实现增量编译，减少每次修改或者移动的编译时间
 * @param task gulp任务
 * @returns 
 */
const since = task => file => gulp.lastRun(task) > file.stat.ctime ? gulp.lastRun(task) : 0

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

// 复制不相关文件
function copy() {
  return gulp.src([
    './src/**/*',
    '!./src/**/*.scss',
    '!./src/**/*.ts',
  ]).pipe(gulp.dest(output))
}

// 编译Ts
function compileTs() {
  return gulp.src('src/**/*.ts', {since: since(compileTs)}) // 增量编译
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.toString())
        this.emit('end')
      }
    }))
    .pipe(tsProject())
    .pipe(minify({}))
    .pipe(sourcemaps.write('.'))    // 以.map文件形式导出至同级目录
    .pipe(gulp.dest(output))
}

// 编译sass
function compileScss() {
  return gulp.src('./src/**/*.scss', {since: since(compileScss)}) // 增量编译
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ extname: '.wxss' }))
    .pipe(sourcemaps.write('.'))    // 以.map文件形式导出至同级目录
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
gulp.task('build', gulp.series(copy, gulp.parallel(compileScss, compileTs)))
gulp.task('watch', debounce(gulp.series(copy, gulp.parallel(compileScss, compileTs), watchTask), 2500))

