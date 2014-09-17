/**
 * Created by wuchaowu on 14-4-12.
 */
var assert = require("assert");
var log  = require("../utils/log.js");
var fs = require("fs");
var path = require("path");

describe('write log  ', function(){


    it('log Info', function(){
        log("info","info log")
    });
    it('log ERROR', function(){
        log("error","ERROR log")
    });
});
