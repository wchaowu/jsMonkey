##jsMonkey 是一个前端自动化打包工具
###description
jsmonkey是一个用node.js对Javascript、和css的压缩合并工具，Javascript代码检查，支持脚本应用替换和hash版本控制自动化版本、手动版本控制，并且支持控制台调用和可视化调用配置，


- 与grunt和gulp相比使用根据简单，（设计原则是预定大于配置）   


- 能和jenkins很好的集成，自动化打包


- 支持依赖amd（requirejs）和cmd（node.js、sea.js）的规范依赖分析

- 支持script的应用替换，在发布是自动替换当前的hash版本


###install
> npm install jsmonkey -g

##工具使用描述
###代码压缩

----------

>//压缩当前目录的js  
>    
>jsmonkey min
>  

>压缩指定目录的js 如 E:\javascript  
>  
>jsmonkey min E:\javascript
  
----------
###代码合并

----------



-  方法1 在命令行中指定当前目录下的a.js,b.js和c.js合并成index.js
   >jsmoneky merge index.js=a.js,b.js,c.js
 
- 方法2，采用配置合并多个js
  >在当前目录下新建一个"merge.properties"文件,merge.properties，符合java属性文件的规范  
   如果要合并 a.js,b.js和c.js合并成index.js 并且样 a.js 和 b.js合并到home.js，那么配置文件的内容是
  <pre>
    index.js=a.js,b.js,c.js
    home.js=a.js,b.js
  </pre>
  如果要添加注释
  <pre>
    # 合并a.js、b.js、c.js到 index.js
    index.js=a.js,b.js,c.js
   # 合并a.js、b.js到 home.js
    home.js=a.js,b.js
  </pre>


----------

###依赖分析
----------

>//分析当前目录js的依赖  
>    
>jsmonkey dep
>  

>分析指定目录的js的依赖 如 E:\javascript  
>  
>jsmonkey dep E:\javascript
  
----------

##自动化描述

自动代码合并、压缩，amd依赖分析、hash版本控制，代码规范检测


### 功能描述 ##

查找打包目录的合并文件“merge.properties”，将要合并的文件进行合并
将要打包文件复制一份到target目录下
资源文件（js、css文件）查找是否符合规范 采用jshint核心
资源（js、css）文件进行压缩(过滤.min.js或者 min.css不进行压缩）
将target目录压缩生成zip文件

其他功能描述
 替换page页面（jsp和html页面）中的script src="/js/zepto.js" 路径或者 src="<%=pathurl %>/js/zepto.js"

> 例如
> 
    <script type="text/javascript" src="<%=pathurl %>/js/zepto.js"></script>

> 替换成
> 
    <script type="text/javascript" src="<%=pathurl %>/js/__d523016f80c7d1e13a728b0cdc760d55aae80788zepto.min.js"></script>


将当期文件生成sha1文件版本的文件名

  
