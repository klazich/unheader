const { resolve } = require('path')

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const del = require('del')
const Browser = require('browser-sync')

// create browser-sync object
const browser = Browser.create()

const buildDir = process.env.NODE_ENV === 'development' ? 'dist' : 'docs'

/**
 * Gulp tasks
 * Use npm or yarn to run tasks:
 *   $ npm run start
 *   $ yarn run start
 */

const clean = () => del([buildDir])
const build = gulp.series(clean, gulp.parallel(content, scripts, styles))
const start = gulp.series(build, gulp.parallel(server, watchers))

module.exports = { build, start }

/**
 * Development Server with BrowserSync
 */

function server() {
  browser.init({
    server: { baseDir: 'dist' },
  })
}

function watchers() {
  gulp.watch('src/index.html', content)
  gulp.watch('src/js/*.js', scripts)
  gulp.watch('src/css/*.css', styles)
  gulp.watch('dist/index.html').on('change', () => browser.reload())
  gulp.watch('dist/js/main.js').on('change', () => browser.reload())
}

/**
 * HTML content - copy
 */

function content() {
  return gulp.src('src/index.html').pipe(gulp.dest(buildDir))
}

/**
 * Javascript scripts - copy
 */

function scripts() {
  return gulp.src('src/js/main.js').pipe(gulp.dest(resolve(buildDir, 'js')))
}

/**
 * CSS styles - postcss/copy
 */
function styles() {
  let processors = [
    require('postcss-import'),
    require('immutable-css'),
    require('postcss-cssnext'),
    require('postcss-reporter')({ clearMessages: true, throwError: false }),
    require('postcss-browser-reporter'),
  ]
  return gulp
    .src('src/css/styles.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(resolve(buildDir, 'css')))
    .pipe(browser.stream()) // inject css changes w/o reload
}
