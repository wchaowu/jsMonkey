/**
 * Created by wuchaowu on 14-4-12.
 */

var assert = require("assert");
var compressedFile = require('../lib/compressedFile.js');
var  testConfig = require('./jsConfig.js');
describe('根据目录生成压缩文件 ', function(){
    var opt = testConfig.options();
    var testJs = "test/mock/testFile.js";
    it('压缩资源文件，包含js、css', function(){
        compressedFile.compressFile(testJs);
    });
});
