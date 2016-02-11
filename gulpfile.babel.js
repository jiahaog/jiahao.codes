import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import runSequence from 'run-sequence';
import less from 'gulp-less';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import minifyCss from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import responsive from 'gulp-responsive';

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

gulp.task('js', () => {
    return compileJs();
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
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

gulp.task('img', function () {
    return gulp.src('src/img/photos/**/*.jpg')
        .pipe(responsive({
            '*.jpg': [{
                width: 480,
                rename: { suffix: '-480px' }
            }, {
                width: 960,
                rename: { suffix: '-960px' }
            },{
                width: 1440,
                rename: { suffix: '-1440px' }
            },{
                width: 1920,
                rename: { suffix: '-1920px'}
            }]
        }, {
            quality: 70,
            progressive: true,
            withMetadata: false
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', callback => {
    runSequence('clean', ['useref', 'js', 'img', 'fonts'], callback);
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        browser: "google chrome"
    })
});

gulp.task('watch', ['browserSync', 'useref', 'img', 'fonts'], () => {
    watchJs();
    gulp.watch('src/less/**/*.less', ['useref']);
    gulp.watch('src/**/*.html', ['useref']);
});

gulp.task('deploy', () => {
    // todo figure out bug why can't I do deploy with ['build'] as a prerequisite
    return gulp.src(['./dist/**/*', './CNAME'])
        .pipe(ghPages({
            branch: 'master'
        }));
});

gulp.task('default', ['watch']);
