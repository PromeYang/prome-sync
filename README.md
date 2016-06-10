# prome-sync

移动端混合式开发利器,定向监听页面自动同步编辑刷新

## 开始之前

前端技术发展飞快,移动设备硬件性能飞跃式提高,导致了移动端混合开发真正成为了可能,那就是利用html的特性作为跨平台技术解决方案.

技术的推动,社区的发展,萌发了许多优秀的框架,如:react-native等,然而混合式的开发都离不开一样东西,那就是webview.

混合式开发中,使用多个webview浏览器容器作为载体,共同构成了app应用的视觉呈现.

那么问题来了,在开发过程中,往往在静态页面中调试好的页面(这方面的工具很多也很成熟),需要打包到安装包中并安装到设备上进行真机测试,
才能够完成数据对接以及业务流程和交互操作方面的工作,这时候开发就进入了无限修改打包模式(原生开发其实也是一个不断build的过程,因此每次要调试的时候都是需要编译的).

接触了混合式开发的跨平台解决方案已经接近两年多了,趟过无数坑之后,终于在最近想到了一套比较满意的开发工作流.

## prome-sync是什么?

prome-sync是适合任何基于webview进行混合式开发的开发工作流,主要为了解决混合式开发中调试效率低下的痛点.

## prome-sync能做什么?

* 提供web服务器

* 脚手架初始化项目文件结构
 
* 自动编译SASS
 
* 自动补全CSS3浏览器前缀

* **定向监听指定页面, 匹配文件的变化并自动刷新该浏览器(webview)**

## prome-sync怎么使用?

### 安装开发环境

**######安装之前先给[npm换源](http://www.jianshu.com/p/0deb70e6f395)######**

1.[Node 环境](https://nodejs.org/) : 选择合适自己的方式进行安装(小草同学用的是v4.2.4)

* Win64 -- [https://nodejs.org/dist/v4.2.4/node-v4.2.4-x64.msi](https://nodejs.org/dist/v4.2.4/node-v4.2.4-x64.msi)

* Mac -- brew install -v4.2.4 node (建议使用 [Brew](http://brew.sh/index_zh-cn.html) 安装)

2.Yeoman 环境：npm install -g yo

3.Gulp 环境：npm install -g gulp

4.Nginx 环境：

* Win -- [http://nginx.org/download/nginx-1.8.0.zip](http://nginx.org/download/nginx-1.8.0.zip)

```
解压之后为了方便使用,可以配置到系统全局的Path变量中,配置后可以直接在命令行使用相关命令

a.复制解压之后的文件目录路径,如:(C:\Users\PromeYang\Downloads\nginx-1.8.0)

b.我的电脑 -> 属性 -> 高级 -> 环境变量，编辑<系统变量> - Path

c.在变量值输入框的最后面<输入> `;` ,然后<粘贴>步骤1复制的路径,一直按<确定>保存修改

配置完成后,可以同时按下 win+r ,输入 cmd 启动命令行工具, 现在已经可以直接使用以下常用命令
```

* Mac -- [http://nginx.org/download/nginx-1.8.0.tar.gz](http://nginx.org/download/nginx-1.8.0.tar.gz)

```
$ cd <下载安装包的文件目录路径>
$ tar xvzf nginx-1.8.0.tar.gz
$ cd nginx-1.8.0
$ sudo ./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-cc-opt="-Wno-deprecated-declarations"
$ sudo make
$ sudo make install

编译完成后,添加到环境变量中
$ vim ~/.bashrc
export PATH="/usr/local/nginx/sbin:$PATH"
保存修改之后,让以上配置生效
$ source ~/.bash_profile
```

* 配置成功后, 启动命令行工具, 现在已经可以直接使用以下常用命令

```
nginx -v -- 查看Nginx版本,确定是否配置成功

nginx -c <配置文件路径> -- 用于启动指定配置文件的nginx服务(win系统不能使用默认的方式,会报找不到相关路径的报错)

nginx -s stop -- 不保存相关信息直接停止nginx服务

nginx -s quit -- 保存相关信息,完整有序的停止nginx服务

nginx -s reload -- 当配置信息修改，需要重新载入这些配置时使用此命令。
```

*注意 : Mac本如果编译报错找不到 PCRE, 请到[官网下载安装](http://www.pcre.org/)*

5.获取脚手架

*注意: 有些同学npm获取脚手架失败, 尝试升级node到v4.4.5, npm到v2.15.5*

```
npm install -g generator-sync
```

*如果是直接从 `github` 上克隆的, 进入克隆目录*

```
$ cd generator-sync
$ npm link
```

### 脚手架初始化项目

* 在空目录执行 `yo sync` 初始化项目

* 项目初始化之后的文件结构 -- h5模板

```
yourProj/
│
├── package.json                // 项目依赖定义
├── gulp.js                     // gulp配置任务入口
├── prome-sync                  // 启动服务脚本
├── tasks/ 						// gulp任务流，开发等
├── conf/ 						// nginx配置
│
├── node_modules    			// `npm install` 拉取依赖包
│
└── src/                        // 开发目录
     ├── css/
     ├── sass/
     ├── img/
     ├── js/
     └── index.html
            
```
* 项目初始化之后的文件结构 -- APICloud模板

```
yourProj/
│
├── package.json                // 项目依赖定义
├── gulp.js                     // gulp配置任务入口
├── prome-sync                  // 启动服务脚本
├── tasks/ 						// gulp任务流，开发等
├── conf/ 						// nginx配置
│
├── node_modules    			// `npm install` 拉取依赖包
│
└── src/                        // 开发目录
     ├── css/
     ├── feature/
     ├── html/
     ├── icon/
     ├── image/
     ├── launch/
     ├── res/
     ├── sass/
     ├── script/
     ├── wgt/
     └── index.html
```

### 开始使用

* 如果是初始化项目, 在执行完 `yo sync` 命令之后, 会弹出一个新的命令行终端

* 如果是再次启动项目, 在命令行终端进入到当前项目的目录, 执行 `gulp` 命令, 弹出终端

* 在终端输入以下命令, 根据指示完成操作

```
$ ./prome-sync
>> 请输入IP地址:
>> 127.0.0.1(手动输入当前IP)
>> 请输入查看端口号:(默认3377)
>> 3377(直接回车默认3377端口)
>> 启动nginx需要权限:
>> ******
>> 所有服务成功开启,现在可以 coding...
```

* 访问 `webserver` 进行开发, 如 : `127.0.0.1:3377` 

* 需要定向监听页面时, 访问的路径加上参数 `mod=dev` 如 : `127.0.0.1:3377/index.html?mod=dev` , 可同时监听多个页面

### 案例展示

### 更新日志

* 1.0.0 -- 初始化版本
* 1.1.0 -- 同时开启多个监听服务, 精心编写的执行脚本, 最精简的命令

### License

Released under [MIT](http://rem.mit-license.org/) LICENSE


