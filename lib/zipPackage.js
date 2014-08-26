/**
 * Created by wuchaowu on 14-4-11.
 */
var AdmZip = require('adm-zip');

var zip = new AdmZip();
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
    zip.addFile("说明文件.txt", new Buffer("压缩日期："+currentDate), "一号店前端自动化打包工具"+currentDate);
    zip.writeZip(targetFile);
}