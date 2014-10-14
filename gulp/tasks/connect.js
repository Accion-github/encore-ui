var concat = require('gulp-concat');
var connect = require('connect');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var livereload = require('connect-livereload');
var prism = require('connect-prism');
var prismInit = require('./prism');
var refresh  = require('gulp-livereload');
var serveStatic = require('serve-static');
var shell = require('gulp-shell');
var yaml = require('gulp-yaml');

// Run Connect server
var lrport = 35729;
var server = connect();

// Prism proxies
server.use(prism.middleware);

// Add live reload
server.use(livereload({ port: lrport }));

// HTML5 pushState fallback
server.use(historyApiFallback);

// Routes
server.use(serveStatic('./app'));

gulp.task('connect', function () {
    // Start webserver
    require('http').createServer(server)
        .listen(9000)
        .on('listening', function () {
            console.warn('Started connect web server on http://localhost:9000');
        });
    // Start live reload
    refresh.listen();
});

// Watch for changes
var watch = function () {
    gulp.watch(['./app/scripts/**/*.js', './app/index.html'], ['lint', 'karma:single']);
    gulp.watch(['./app/styles/**/*.less'], ['styles']);
    gulp.watch(['./app/views/**/*.html'], ['templates']);
    gulp.watch('./app/**/*').on('change', refresh.changed);
    gulp.watch('bower.json', ['wiredep']);
};

gulp.task('server', ['open'], function () {
    prismInit();
    watch();
});

gulp.task('server:stubbed:watch', ['templates', 'styles', 'connect'], function () {

    gulp.src('test/api-mocks/**/*.yaml')
        .pipe(concat('mocks.yaml'))
        .pipe(yaml({ space: 2 }))
        .pipe(gulp.dest('.'))
        .pipe(shell(['node_modules/stubby/bin/stubby -md mocks.json -l localhost -s 3000']));

    prismInit('stubbed');
    watch();
});

gulp.task('server:mock', ['open'], function () {
    prismInit('mock');
    watch();
});

gulp.task('server:record', ['open'], function () {
    prismInit('record');
    watch();
});