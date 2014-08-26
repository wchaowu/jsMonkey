/**
 * Created by wuchaowu on 14-4-10.
 * 主要文件操作不用采用异步
 */

var fs = require( 'fs' );
var fileUtils = require('../utils/fileUtils.js')
exports.copyDirectory = function (src,build){
    /*
     * 复制目录中的所有文件包括子目录
     * @param{ String } 需要复制的目录
     * @param{ String } 复制到指定的目录
     */
var copyDirectoryAndFile = function( src, dst ){
    // 读取目录中的所有文件/目录
    var paths = fs.readdirSync(src);
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path;
          //文件句柄
           var st = fs.statSync(_src);
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    // 创建写入流
                    // 通过管道来传输流
                   // fs.createReadStream(_src).pipe(fs.createWriteStream(_dst));
                    fileUtils.copyFileSync(_src,_dst);
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copyDirectoryAndFile );
                }
            });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    //同步判断（避免用exists操作）
   var flag = fs.existsSync( dst);
        // 已存在
        if( flag ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdirSync( dst);
            callback( src, dst );

        }
    };


    //复制前清理目录
    if(fs.existsSync(build)){
      fileUtils.rmdir(build);
    }

    // 复制目录
//exists( './src', './build', copy );
    exists( src, build, copyDirectoryAndFile );
}