module.exports = function(gulp, plugins) {

    var argv = require('yargs').argv,
        chalk = require('chalk'),
        browserSync = require('browser-sync'),
        reload = browserSync.reload,
        log = console.log;
    
    var win32 = process.platform === 'win32';

    var that = this;
    that.port = +argv.p || 3000;
    var pkg = require('../package.json');
    
    gulp.task('dev_conn', function() {
        browserSync({
            ui:false,
            server: {
                baseDir: "src",
                directory: true
            },
            notify: false,
            ghostMode:false,
            port: that.port,
            open: "external",
            browser: "/Applications/Google\ Chrome.app/"
        },function(err, arg){
            if (argv.q) {
                var url = arg.options.get('urls').get('external')
                var qrcode = require('qrcode-terminal')
                qrcode.generate(url);
            }

        })
    })
    gulp.task('dev_sass', function() {
        function sassCompile(){
            function handler(){
                return plugins.notify.onError({
                    title:'sass编译错误', 
                    message:'<%=error.message%>'
                })
            }
            return plugins.sass().on('error', handler()) 
        }
        return gulp.src('src/sass/*.scss')
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(sassCompile())
            .pipe(plugins.sourcemaps.write({includeContent: false, sourceRoot: '../sass/'}))
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.autoprefixer( {browsers: ['> 0%']} ))
            .pipe(plugins.sourcemaps.write({includeContent: false, sourceRoot: '../sass/'}))
            .pipe(gulp.dest('src/css'))
            .pipe(reload({stream:true}))
    })

    gulp.task('default', ['dev_conn'], function(){
        gulp.watch('src/sass/**', ['dev_sass'])
        gulp.watch('src/img/**', reload)
        gulp.watch('src/js/**', reload)
        gulp.watch('src/*.html', reload)
    })

}