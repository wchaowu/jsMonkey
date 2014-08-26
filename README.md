##jsMonkey 是一个前端自动化打包工具## 
###description
jsmonkey是一个用node.js对Javascript、和css的压缩合并工具，Javascript代码检查，支持脚本应用替换和hash版本控制自动化版本、手动版本控制，并且支持控制台调用和可视化调用配置，

###install
> npm install jsmonkey


### 前端自动运行流程 ##

- 第一步、检测要打包的资源文件（js、css文件）查找是否符合规范

- 第二步、复制要打包的资源文件（js、css文件）和 复制应用站点文件，这样可以避免在源文件上进行修改

- 第三步、将资源文件进行压缩,并且根据文件的文本内容生成sha1文件名称

- 第四步，替换page页面（jsp和html页面）中的<script src="" />路径

> 例如
> 
    <script type="text/javascript" src="<%=pathurl %>/js/zepto.min.js"></script>

> 替换成
> 
    <script type="text/javascript" src="<%=pathurl %>/js/__d523016f80c7d1e13a728b0cdc760d55aae80788zepto.min.js"></script>

>合并加载文件

元素写法
<script type="text/javascript" src="<%=pathurl %>/js/a.js"></script>
<script type="text/javascript" src="<%=pathurl %>/js/b.js"></script>
<script type="text/javascript" src="<%=pathurl %>/js/c.js"></script>

要求写法

<script type="text/javascript" src="<%=pathurl %>/js/a-b-c.js"></script>

打包完成
a.js,b.js,c.js文件的合并

第五部、将压缩好的资源文件和引用替换好的文件生成zip文件  
