## jsLint 代码检测规范描述
jsLint官方文档：[http://www.jshint.com/docs/ ](http://www.jshint.com/docs/  "jshint 官方文档")   
配置文件在config/jsLintconfig.js
jshint.option *// 代码规范选项配置*
jshint.global *//全局配置*
在要检测的js文件中可以定义
>全局变量定义
> /*global require, module,  __dirname */  
>node环境定义  
> /* jslint node: true */  
>/* jshint undef: true, unused: true */