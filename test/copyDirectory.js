/**
 * Created by wuchaowu on 14-4-12.
 */

var assert = require("assert");

var fs = require("fs");
var path = require("path");
var  testConfig = require('./jsConfig.js');
var copyDirectory = require('../lib/copyDirectory.js');

describe('copy Directory ', function(){
    var opt = testConfig.options();
    it('复制目录信息 info', function(){
        copyDirectory.copyDirectory(opt.resourcePath, opt.targetResourcePath);
    });
});
