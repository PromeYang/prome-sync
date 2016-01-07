#!/usr/bin/env node
var mkdirp = require('yeoman-generator/node_modules/mkdirp')
var path = require('path')
var fs = require('fs')

var win32 = process.platform === 'win32'
var homeDir = process.env[ win32? 'USERPROFILE' : 'HOME']
var libPath = path.join(homeDir, '.generator-sync', 'node_modules')

// USERPROFILE 文件夹创建
mkdirp.sync(libPath)