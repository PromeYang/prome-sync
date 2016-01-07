#!/usr/bin/env node
var mkdirp = require('yeoman-generator/node_modules/mkdirp')
var path = require('path')
var del = require('del')

var win32 = process.platform === 'win32'
var homeDir = process.env[ win32? 'USERPROFILE' : 'HOME']

// USERPROFILE 文件销毁
// del([path.join(homeDir, '.generator-lego')], {force:true})