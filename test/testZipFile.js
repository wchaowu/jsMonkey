/**
 * Created by wuchaowu on 14-4-12.
 */

var assert = require("assert");
var zipPackage = require('../lib/zipPackage.js');
var  testConfig = require('./jsConfig.js');
describe('根据目录生成压缩文件 ', function(){
    var opt = testConfig.options();
    it('整个应用站点文件生成zip压缩包', function(){
        zipPackage.createZipPackage(opt.targetAppPath, opt.appPackZipName);
    });
    it('资源文件生成zip压缩包', function(){
        zipPackage.createZipPackage(opt.targetResourcePath, opt.resourcePackZipName);
    });
});
