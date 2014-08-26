'use strict';

var pageReferenceUrl = require('./pageReferenceUrl.js');
var hasFile = require("./hashFile.js");
var fs = require('fs');
var util = require('util');
var path = require("path");
var fileUtils = require("../utils/fileUtils");

exports.replaceHashFilesInDir = function (src,jsPath) {
    function replaceUrl(fname,fileText,arrScriptUrl){
        if(!arrScriptUrl||arrScriptUrl.length<1){
            return null;
        }
        for(var i = 0;i<arrScriptUrl.length;i++){
         var filePath  =path.join(path.resolve(jsPath),arrScriptUrl[i])
         var hashValue = hasFile(filePath);
            if(hashValue){
             var fileName =  path.basename(filePath);
              var parentUrl=  arrScriptUrl[i].replace(fileName,"");
               var newUrl = parentUrl+"__"+hashValue+path.extname(filePath);
                global.log.info( fileText.indexOf(arrScriptUrl[i]));
                fileText =  fileText.replace(arrScriptUrl[i],newUrl);

            }else{
                return null;
            }

        }
        fileUtils.writeReplaceFile(fname,fileText);
    }

    function traverseFile(fileDirectory) {
        var files = fs.readdirSync(fileDirectory);

        for (var fn in files) {
            var fName = path.resolve(fileDirectory) + path.sep + files[fn];
            var stat = fs.lstatSync(fName);
            if (stat.isDirectory() == true) {
                traverseFile(fName);
            } else {
                global.log.info("文件后缀名" + path.extname(files[fn]));
                var fileText = fs.readFileSync(fName, "utf8");
                var arrScriptUrl = pageReferenceUrl.pageReferenceUrl(fName,fileText);
                replaceUrl(fName,fileText,arrScriptUrl);


            }
        }
    }
    traverseFile(src);
 };