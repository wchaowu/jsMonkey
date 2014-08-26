var fs = require('fs');
var ejs = require('ejs');
var config = require('./../config/jsLintConfig.js');
var hinter = require('./hinter.js');
var fileUtils =require("../utils/fileUtils.js");
var path = require('path');
exports.jsHint = function (opt) {
    var options = {
        curly: true,
        eqeqeq: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        node: true
    };
    if(opt.jsLintOption){
        options = opt.jsLintOption;
    }

    function injectString(string, inject, where) {
        return string.substr(0, where) + inject + string.substr(where);
    }
    function checkError (originalSource){
     try{
          return hinter(originalSource, config);
      }catch(err){
        return null;
      }

    }
    function formatError(result){
           var source = result.source,
            errors = [],
            sourceLines,
            numLines,
            errorContext = 2;
        sourceLines = source.split("\n");
        numLines = sourceLines.length;
        result.errors.forEach(function (error) {
            if (!error) {
                return;
            }
            var startIndex = error.line - (errorContext + 1) > 0 ? error.line - (errorContext + 1) : 0,
                endIndex = error.line + errorContext > numLines ? numLines : error.line + errorContext,
                errorLineContents;
            // Generate a source except
            error.excerpt = {};
            sourceLines.slice(startIndex, endIndex).forEach(function (line, lineOffset) {
                error.excerpt[startIndex + 1 + lineOffset] = line;
            });
            // Insert a span to highlight the error itself
            errorLineContents = injectString(error.excerpt[error.line], '<span>', error.character - 2);
            errorLineContents = injectString(errorLineContents, '</span>', error.character + 6);
            error.excerpt[error.line] = errorLineContents;
            errors.push(error);
        });
        return errors;
    }

  function haddleCheckResult(filename,outputFile){
      var extName = path.extname(filename);
      if(extName != ".js"){
          return ;
      }

      var data = fs.readFileSync(filename, "utf8"),
          result = checkError(data);
    if (result && !result.passed && result.errors[1]) {
        var fileText = fs.readFileSync(opt.jsHintTemplate, "utf8");
          var errors = formatError(result);
      var html=  ejs.render(fileText, {errors:errors});
        fileUtils.writeReplaceFile(outputFile,html);
    }
  }
    function haddleJsFile(jsPath) {
        var files = fs.readdirSync(jsPath);
        for (var item in files) {
            var fName = path.join(jsPath , path.sep , files[item]);
            var outputFile =  path.join(opt.jsHintResultPath,path.sep,files[item]+".html");
            var stat = fs.lstatSync(fName);
            if (stat.isDirectory() == true) {
                haddleJsFile(fName);
            } else {
                haddleCheckResult(fName,outputFile);
            }
        }
    }
    /*
    要进行检查的js目录
     */
    if(path.existsSync(opt.targetResourcePath)) {
       // haddleJsFile(opt.targetResourcePath);
    }

};