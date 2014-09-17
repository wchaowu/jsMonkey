/**
 * Created by wuchaowu on 14-4-11.
 */
var fs = require("fs");
var path = require("path");

exports.writeReplaceFile = function (fileName, text) {

    var fd = fs.openSync(fileName, "w");
    fs.writeSync(fd, text, 0, 'utf8');
    fs.closeSync(fd);
};
exports.rmdir = function (dir) {
    var rmDirectory = function (path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    rmDirectory(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    rmDirectory(dir);
};

exports.copyFileSync = function (srcFile, destFile) {
    var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
    BUF_LENGTH = 64 * 1024;
    buff = new Buffer(BUF_LENGTH);
    fdr = fs.openSync(srcFile, 'r');
    fdw = fs.openSync(destFile, 'w');
    bytesRead = 1;
    pos = 0;
    while (bytesRead > 0) {
        bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, buff, 0, bytesRead);
        pos += bytesRead;
    }
    fs.closeSync(fdr);
    return fs.closeSync(fdw);
};
exports.mkdirSync = function(url,mode,cb){

    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            if(cb){
              cb();
            }
        }
    }
    arr.length && inner(arr.shift());
};

