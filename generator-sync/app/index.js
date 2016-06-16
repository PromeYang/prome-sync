"use strict";
var yeoman = require('yeoman-generator'),
	glob = require('yeoman-generator/node_modules/glob'),
	_ = require('yeoman-generator/node_modules/lodash'),
	chalk = require('yeoman-generator/node_modules/chalk'),
	mkdirp = require('yeoman-generator/node_modules/mkdirp'),
	path = require('path'),
	exec = require('child_process').exec,
	fs = require('fs'),
	del = require('del'),
	log = console.log;

var win32 = process.platform === 'win32'
var homeDir = process.env[ win32? 'USERPROFILE' : 'HOME']
var cfgRoot =  path.join(homeDir, '.generator-sync')
var libPath = path.join(cfgRoot, 'node_modules')

var SyncGenerator = yeoman.Base.extend({

	// 1. 提问前的准备工作
	constructor: function (){
		yeoman.Base.apply(this, arguments)
		this.conflicter.force = true

		// 初始环境检测
		// 若当前目录没有node_modules文件夹，则建立软连接；否则继续
		// 若当前存在src文件夹，则退出；否则继续
		var dirs = glob.sync('+(src|node_modules)')
		if(!_.contains(dirs, 'node_modules')){
			if(win32){
				require('child_process').exec('mklink /d .\\node_modules '+ libPath )
			}else{
	        	this.spawnCommand('ln', ['-s', libPath, 'node_modules'])
			}
			log(chalk.bold.green('node_modules 软连接创建完毕!'))
		}
		if(_.contains(dirs, 'src')){
			log(chalk.bold.green('资源已初始化，退出...'))
			setTimeout(function(){
				process.exit(1)
			}, 200)
		}

	},

	// 2. 提问
	prompting: function(){
		var done = this.async()
		this.projectAuthor = process.env.USER
		var timestamp = +new Date()
		var questions = [
			{
				name: 'projectAssets',
				type: 'list',
				message: '初始的静态资源:',
				choices: [
					{
						name: 'h5模板',
						value: 'h5',
						checked: true
					},{
						name: 'apicloud模板',
						value: 'apicloud'
					}
				]
			}
		]
		this.prompt(questions, function(answers){
			for(var item in answers){
				answers.hasOwnProperty(item) && (this[item] = answers[item])
			}
			done()
		}.bind(this))
	},

	// 3. 资源文件拷贝
	writing: function(){
		// 拷贝资源文件，资源文件可以通过`<%= %>`读取当前实例的数据
		this.directory('tasks4'+this.projectAssets, 'tasks')
		this.directory('src4'+this.projectAssets, 'src')
		this.directory('conf', 'conf')
		this.copy('prome-sync', 'prome-sync')
		this.copy('prome-sync.bat', 'prome-sync.bat')
		this.copy('gulpfile.js', 'gulpfile.js')
		this.pkgGulpSassVersion = (win32?'2.3.1':'~2.0.1')
		this.copy('package.json', 'package.json')
	},

	// 4. 拷贝后执行命令 如建立软链接等
	end: function(){
		// 文件转移后，删除不需要的文件
		del(['src/**/.gitignore','src/**/.npmignore', 'src/README.md'])

		// 安装包依赖，然后执行`gulp`
		// https://github.com/yeoman/generator/blob/45258c0a48edfb917ecf915e842b091a26d17f3e/lib/actions/install.js#L67-69
	    this.installDependencies({
	    	bower: false,
 			npm: true,
	    	skipInstall: false,
	    	callback: execAfterInstall.bind(this)
	    })

        function execAfterInstall(){
        	this.spawnCommand('gulp')
            log('资源初始化完毕! 现在可以 coding...')
        }
	}

});


module.exports = SyncGenerator;
