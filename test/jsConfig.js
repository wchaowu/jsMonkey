/**
 * Created by wuchaowu on 14-4-12.
 */

exports.options = function () {
    return { resourcePath: "../../testsrc/resource", //资源文件目录，js和css
        targetResourcePath: "../../build/js", //打包压缩，的目录
        appPath: "../../testsrc/page",          //应用站点目录
        targetAppPath: "../../build/page",  //生成目标地址的路径
        resourcePackZipName: "../../package/resourcePage.zip", // 生产压缩包之后的文件名
        appPackZipName: "../../package/appSite.zip",    //应用站点生成压缩包的名字
        jsLintPath: "../../testSrc/resource/js/logger.js"
    };
}
