/**
 * Created by wuchaowu on 14-4-12.
 */
var assert = require("assert");
var arryUtils  = require("../utils/arrayUtils.js");

describe('Array utils', function(){
    var arr = ["11","22","33"];
    before(function(){
      console.log("before\n");
    });
    beforeEach(function(){
        console.log('before every test')
    })
    it("测试beforeEach",function (){
         console.log("it");
    });
    describe('测试判断数组重复', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(false,arr.isRepeat() );
            arr.push("11")
            assert.equal(true, arr.isRepeat());
        })
    })
})
