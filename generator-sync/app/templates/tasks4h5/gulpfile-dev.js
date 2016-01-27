module.exports = function(gulp, plugins) {

    var argv = require('yargs').argv,
        chalk = require('chalk'),
        browserSync = require('prome-sync'),
        reload = browserSync.reload,
        spawn = require('child_process').spawn,
        log = console.log;

    var bs1 = browserSync.create('Server 1');
    var bs2 = browserSync.create('Server 2');
    
    var win32 = process.platform === 'win32';

    var that = this;
    that.port = +argv.p || 3000;
    var pkg = require('../package.json');

    gulp.task('dev_conn', function() {
        
        var newTerminal = spawn('open', ['-a', 'Terminal', '.']);

        bs1.init({
            ui:false,
            server: {
                baseDir: "src",
                directory: true
            },
            notify: false,
            ghostMode:false,
            port: 3388||that.port,
            // open: "external",
            open: false,
            browser: "/Applications/Google\ Chrome.app/"
        }, function(err,bs){
            // log(bs.options)
            // if (argv.q) {
            //     var url = arg.options.get('urls').get('external')
            //     var qrcode = require('qrcode-terminal')
            //     qrcode.generate(url);
            // }
        })

        bs2.init({
            ui:false,
            server: {
                baseDir: "src",
                directory: true
            },
            notify: false,
            ghostMode:false,
            port: 3399||that.port,
            open: false,
            browser: "/Applications/Google\ Chrome.app/"
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
            .pipe(bs1.reload({stream:true}))
    })

    gulp.task('default', ['dev_conn'], function(){
        gulp.watch('src/sass/**', ['dev_sass'])
        gulp.watch('src/img/**', bs1.reload)
        gulp.watch('src/js/**', bs1.reload)
        gulp.watch('src/*.html', bs1.reload)
    })

}