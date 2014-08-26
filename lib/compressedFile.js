
var fs = require( 'fs' );
var uglifyJS = require("uglify-js");
var uglifycss = require('uglifycss');
exports.compressFile = function (filePath,fileType) {
    function compressCode(orig_code){
        var ast = jsp.parse(orig_code); // parse code and get the initial AST
        ast = pro.ast_mangle(ast); // get a new AST with mangled names
        ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
        return pro.gen_code(ast); // compressed code here
    }

    //fs.js
    function writeReplaceFile(fileName,text){
        fs.writeFileSync(fileName,text,null, function (err) {
            if (err) throw err;
            console.log('压缩文件写入错误 file!');
        });
    }
    (function (){
        var compressedText = null;
        var fileText = fs.readFileSync(filePath, "utf8");
            if(fileType==".css"){
              compressedText = uglifycss.processFiles([filePath]);
          //   var   options = { maxLineLen: 0,expandVars: false,cuteComments: true };
            //    compressedText = uglifycss.processString(fileText, options)
            }else{

                compressedText = uglifyJS.minify(filePath).code;
            }
      writeReplaceFile(filePath,compressedText);

   })();
}