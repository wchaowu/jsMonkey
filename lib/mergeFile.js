var fs = require('fs');
var path =require("path");
function mergeAllFiles (filePath,mergejs, savefile, callback) {

    var appendFile = path.join(filePath,savefile);
    if( fs.existsSync(path) ) {
        fs.unlinkSync(appendFile);
    }
    for(var i=0;i<mergejs.length;i++) {


        var currentFile = mergejs[i].replace(/^\s+/g, "").replace(/^\r\n$/mg, '').replace("\r", "");
        var mergeFile = path.join(filePath, currentFile);
        if (fs.existsSync(mergeFile)) {
               console.log('合并文件：%s', mergeFile);
                var data = fs.readFile(mergeFile, 'utf-8');
                fs.appendFileSync(appendFile, data);
        }else{
            console.log("不存在合并的文件："+mergeFile);
        }
    }

}
function readLines(input, func) {
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        console.log("index"+data);
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });
    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}
exports.mergeFile= function (attrFile) {
    var input = fs.createReadStream(attrFile);
    readLines(input, function (line){
        if(line && line.trim()&&line.trim().indexOf("#")<0) {
            var arr = line.split("=");
            var toFile = arr[0].replace(/^\s+/g,"");
            var fromFiles = arr[1].split(",");
            var parentDir =path.dirname(attrFile);
            mergeAllFiles(parentDir,fromFiles, toFile);
        }

    });

}
exports.mergeDirectory = function(directory){
	var paths = fs.readdirSync(directory);
    paths.forEach(function( fileName ){

        // 判断是否为文件
        var filePath = path.join(directory,fileName);
        var st = fs.statSync(filePath);
        if( st.isFile() &&fileName =="merge.properties" ){

                exports.mergeFile(filePath);
        }
        // 如果是目录则递归调用自身
        else if( st.isDirectory() ){
            exports.mergeDirectory(filePath);
        }
    });
}