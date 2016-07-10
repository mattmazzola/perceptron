var gulp = require('gulp-help')(require('gulp')),
  del = require('del'),
  karma = require('karma'),
  flatten = require('gulp-flatten'),
  ghPages = require('gulp-gh-pages'),
  rollup = require('rollup').rollup,
	rollupTypescript  = require('rollup-plugin-typescript'),
  runSequence = require('run-sequence'),
  ts = require('gulp-typescript'),
  typedoc = require('gulp-typedoc'),
  argv = require('yargs').argv
  ;




gulp.task('build', 'Build for release', function (done) {
    return runSequence(
        'clean:dist',
        'compile:src',
        'compile:dts',
        // 'min',
        // 'header',
        done
    );
});

gulp.task('test', 'Run all tests', function (done) {
    return runSequence(
        'clean:tmp',
        'compile:spec',
        'test:spec',
        done
    );
});


gulp.task('clean:dist', 'Clean dist directory', function () {
    return del([
        './dist/**/*'
    ]);
});

gulp.task('clean:docs', 'Clean docs directory', function () {
    return del([
        './docs/**/*'
    ]);
});

gulp.task('clean:tmp', 'Clean tmp directory', function () {
    return del([
        './tmp/**/*'
    ]);
});

gulp.task('compile:src', function () {
  return rollup({
    entry: 'src/perceptron.ts',
    plugins: [
      rollupTypescript()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'umd',
      moduleName: 'perceptron',
      dest: 'dist/perceptron.js',
      sourceMap: true
    });
  });
});

gulp.task('compile:dts', 'Generate dts files from modules', function () {
    var tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        sourceMap: false
    });
    
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    
    return tsResult.dts
        .pipe(flatten())
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile:spec', 'Compile typescript for tests', function () {
  return rollup({
    entry: 'test/perceptron.spec.ts',
    plugins: [
      rollupTypescript()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: 'tmp/perceptron.spec.js',
      sourceMap: true
    });
  });
});

gulp.task('test:spec', 'Runs spec tests', function (done) {
    new karma.Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: argv.watch ? false : true,
        captureTimeout: argv.timeout || 20000
    }, done);
});

gulp.task('docs', 'Generate documentation', function () {
  return gulp.src(["src/*.ts"])
    .pipe(typedoc({
      mode: "modules",

      // Output options (see typedoc docs) 
      out: "./docs",

      // TypeDoc options (see typedoc docs) 
      name: "Perceptron"
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('ghpages', 'Update ghpages', function ()  {
  return gulp.src(['docs/**/*'])
    .pipe(ghPages({
      force: true
    }));
});