##jsMonkey 是一个前端自动化打包工具## 
###description
jsmonkey是一个用node.js对Javascript、和css的压缩合并工具，Javascript代码检查，支持脚本应用替换和hash版本控制自动化版本、手动版本控制，并且支持控制台调用和可视化调用配置，

###install 安装到全局，建议采用默认
> npm install jsmonkey -g

##自动化描述

自动代码合并、压缩，amd依赖分析、hash版本控制，代码规范检测


### 功能描述 ##

-  1、资源文件（js、css文件）查找是否符合规范 采用jshint核心


   2、资源（js、css）文件进行压缩,合并功能

   3、生成sha1文件版本
   
   4、将压缩好的资源文件和引用替换好的文件生成zip文件
 
##命令行工具

压缩
 
   

##其他功能
替换page页面（jsp和html页面）中的<script src="" />路径

> 例如
> 
    <script type="text/javascript" src="<%=pathurl %>/js/zepto.js"></script>

> 替换成
> 
    <script type="text/javascript" src="<%=pathurl %>/js/__d523016f80c7d1e13a728b0cdc760d55aae80788zepto.min.js"></script>





  
