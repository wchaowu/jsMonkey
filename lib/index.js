'use strict';
var crypto = require('crypto');
var mergeFile = require("./mergeFile.js");
var hashFilesInDir = require('./HashFileInDir');
var replaceScriptReference = require('./replaceScriptReference.js');
var copyDirectory = require('./copyDirectory.js');
var zipPackage = require('./zipPackage.js');
var jsHintFile = require("./jsHintFile.js");
var dateUtils = require("../utils/dateUtils");
var log = require('../utils/log')

/**
 * [run description]
 * @param  {[type]} opt
 * var opt = {
    resourcePath: "", //资源文件目录，js和css
    targetResourcePath: "", //打包压缩，的目录
    appPath: "",          //应用站点目录
    targetAppPath: "",  //生成目标地址的路径
    resourcePackZipName: "", // 生产压缩包之后的文件名
    appPackZipName: ""     //应用站点生成压缩包的名字
};
 * @return {[type]}     [description]
 */

exports.runPackage = function (opt) {


    var fs = require('fs'), path=require('path');

    if (!opt.logFileName) {
        opt.logFileName = logFileName;
    }
//    jsHintFile.jsHint(opt);

    log.setLogConfig({logFileName:opt.logFileName});
    if(opt.attrFile) {
    	  mergeFile.mergeDirectory(opt.resourcePath);        
    }
    setTimeout(function () {
        if (opt.resourcePath && opt.targetResourcePath) {
            /**
             * 复制静态资源,采用的是同步复制
             */
            copyDirectory.copyDirectory(opt.resourcePath, opt.targetResourcePath);
        }
        if (opt.appPath && opt.targetAppPath) {
            /*
             复制应用程序，采用的是同步复制
             */
            //   copyDirectory.copyDirectory(opt.appPath, opt.targetAppPath);
        }
        if (opt.targetResourcePath) {
            /*
             资源文件，压缩之后文件名，
             */
           hashFilesInDir.hashFilesInDir(opt.targetResourcePath);
        }
        if (opt.targetAppPath && opt.targetResourcePath) {
            /*
             app 资源应用替换资源到hash文件名的路径
             */
            //  replaceScriptReference.replaceHashFilesInDir(opt.targetAppPath, opt.targetResourcePath);
        }
        setTimeout(function (){
        if (opt.resourcePackZipName) {
            zipPackage.createZipPackage(opt.targetResourcePath, opt.resourcePackZipName);
        }},10000)
        
    },3000);
    /*
    if (opt.appPackZipName) {
     zipPackage.createZipPackage(opt.targetAppPath, opt.appPackZipName);
    }
    */



};
