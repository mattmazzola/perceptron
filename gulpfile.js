var gulp = require('gulp-help')(require('gulp')),
  del = require('del'),
  karma = require('karma'),
  rollup = require('rollup').rollup,
	rollupTypescript  = require('rollup-plugin-typescript'),
  runSequence = require('run-sequence'),
  argv = require('yargs').argv
  ;


gulp.task('build', 'Build for release', function (done) {
    return runSequence(
        'clean:dist',
        'compile:src',
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