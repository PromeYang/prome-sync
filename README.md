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

**定向监听指定页面,匹配文件的变化并自动刷新该浏览器(webview)

## prome-sync怎么使用?

### 安装开发环境

1.(Node 环境)[https://nodejs.org/]：选择合适自己的方式进行安装(小草同学用的是v4.2.4)
  Win64 -- (https://nodejs.org/dist/v4.2.4/node-v4.2.4-x64.msi)[https://nodejs.org/dist/v4.2.4/node-v4.2.4-x64.msi]
  Mac -- brew install -v4.2.4 node (建议使用 (Brew)[http://brew.sh/index_zh-cn.html] 安装)
  
2.Yeoman环境：npm install -g yo

3.Gulp 环境：npm install -g gulp

4.Subversion Command-Line : 

  Win -- (下载地址)[http://pan.baidu.com/s/1gdrQ7Px]
  Mac -- 系统自带
5.获取脚手架
### 脚手架初始化项目
在空目录执行 yo prome 初始化项目
项目初始化之后的文件结构 -- 基础模板
项目初始化之后的文件结构 -- APICloud模板
### 开始使用

