/**
 * Created by wuchaowu on 14-4-12.
 */
var assert = require("assert");
var fileUtils  = require("../utils/fileUtils.js");
var fs = require("fs");
var path = require("path");

describe('file utils', function(){
        it('测试同步复制文件', function(){
            //同步复制文件
            fileUtils.copyFileSync("test/mock/testFile.js","test/mock/target/testFile.js");
            //测试复制的结果
         var flag =  fs.existsSync("test/mock/target/testFile.js");
            assert.equal(true,flag);
        });

})
