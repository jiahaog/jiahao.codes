import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import runSequence from 'run-sequence';
import mocha from 'gulp-mocha';
import less from 'gulp-less';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import minifyCss from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';

function compileJs(watch) {
    var bundler = browserify('./src/js/main.js', { debug: true }).transform(babel);

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(browserSync.reload({
                stream: true
            }));
    }

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', () => {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watchJs() {
    return compileJs(true);
}

gulp.task('test', () => {
    return gulp.src('./test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('js', ['test'], () => {
    return compileJs();
});

gulp.task('useref', () => {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', less())) // compile all .css with less() http://stackoverflow.com/questions/27627936/compiling-less-using-gulp-useref-and-gulp-less
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean', callback => {
    del('dist').then(() => {
        callback();
    });
});

gulp.task('build', callback => {
    runSequence('clean', ['useref', 'js'], callback);
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        browser: "google chrome"
    })
});

gulp.task('watch', ['browserSync', 'useref', 'test'], () => {
    watchJs();
    gulp.watch('src/less/**/*.less', ['useref']);
    gulp.watch('src/**/*.html', ['useref']);
});

gulp.task('deploy', () => {
    // todo figure out bug why can't I do deploy with ['build'] as a prerequisite
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['watch']);
