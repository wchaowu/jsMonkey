/**
 * Created by wuchaowu on 14-4-12.
 */
var assert = require("assert");
var hashFilesInDir = require('../lib/HashFileInDir.js');
var  testConfig = require('./jsConfig.js');

describe('生成hash文件  ', function(){
    var opt = testConfig.options();
    it('根据文件的内容生成sha1值', function(){

        hashFilesInDir.hashFilesInDir(opt.targetResourcePath);
    });
});
