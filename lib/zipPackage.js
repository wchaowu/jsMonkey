/**
 * Created by wuchaowu on 14-4-11.
 */
var AdmZip = require('adm-zip');

var zip = new AdmZip();
var hashFile = require("../lib/hashFile.js");
var fs = require('fs');
exports.createZipPackage = function (src,targetFile){
    var now= new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var day=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    var currentDate = year+"-"+month+"-"+day+" "+hour+":"+":"+minute+":"+second;
    zip.addLocalFolder(src);    
    zip.writeZip(targetFile);
	var fileHashValue = hashFile(targetFile);
	fs.writeFile(targetFile+'.MD5', fileHashValue, function (err) {
	    if (err) throw err;
	     console.log(targetFile); //文件被保存
	});
  
}