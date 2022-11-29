# 缓存
## 文件缓存
通过连接名称控制缓存，例如第一个版本用abc_1名字来做名称,名字不会变那就不需要重新下载直接使用缓存。
```js
<script src="abc_1.js"></script>
```
当内容改变的时候，链接名称才会去改变

```js
<script src="abc_2.js"></script>
```

## DOM查询缓存
将DOM查询缓存到变量中，这样下次循环就不需要重新获取。
```js
//未缓存DOM查询
var i
for(i=0;i<document.getElementsByTagName('p').length;i++){
    //todo
}

//缓存了DOM查询
var pList = document.getElementsByTagName('p');
var i
for(i=0;i<pList.length;i++){
    //todo
}
```
