'use strict';

var hashFile = require('./hashFile');
var compressedFile = require('./compressedFile.js')
var fs = require('fs');
var util = require('util');
var fileUtils = require('../utils/fileUtils');
exports.hashFilesInDir = function (src) {
   var path = require("path");
	var fs = require("fs");
	var rootPath = path.resolve(src);
	function changeFileName(filepath){

            var stats = fs.lstatSync(filepath);
			if(stats.isFile()){
				//global.log.info("isFile,chaning filename...");
                var extName = path.extname(filepath);
               if(extName != ".js" && extName != ".css"){
                    return ;
                }
				var filename = path.basename(filepath);
				var parentDir =path.dirname(filepath);
				//这个if就是进行更改文件名的逻辑,可以自行定义,这里定义为将文件命名为当前文件夹的名字加"-文件自身名"
				if(filename.indexOf("__")<0&& filename.indexOf('.min.')<0){
			    	var fileHashValue = hashFile(filepath);
                   var splitName =  filename.split(".");
                    splitName[splitName.length - 1] =  "min";
					var newName = splitName.join(".")+extName;
					var newPath =  path.join(parentDir,newName);
					global.log.info("going to rename from "+filepath+" to "+newPath);
                    //同步复制文件
                    fileUtils.copyFileSync(filepath,newPath);
                    //压缩文件
                    compressedFile.compressFile(newPath,extName);

				}
			}else if(stats.isDirectory()){
                global.log.info("============["+filepath+"] isDir===========");
				renameFilesInDir(filepath);
			}else{
                global.log.info("unknow type of file");
			}

	}
	function renameFilesInDir(dir){
       var fileNames = fs.readdirSync(dir);
        global.log.info("_______________________________________"+fileNames)
            if(!fileNames&& fileNames.length>0){
                global.log.info("not found Resource file");
                return null;
            }
			var len = fileNames.length;
			var file = null;
			for(var i=0;i<len;i++){
				file = fileNames[i];
                 var fileUrl  = path.join(dir,file);
				changeFileName(fileUrl);
			}
	}
    renameFilesInDir(rootPath);
};
