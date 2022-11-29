# 懒加载和预加载
## 懒加载
懒加载是延迟加载，在静态资源使用之后再加载。
* 图片进入可视区域之后请求图片资源
* 对于电商等图片很多，页面很长的业务场景适用
* 减少无效资源的加载
* 并发加载的资源过多会阻塞js的加载，影响网站的正常使用

```js
<img id="img1" src="preview.png" data-realsrc="abc.png"/>
<script type="text/javascript">
    var img1 = document.getElementById('img1');
    img1.src = img1.getAttribute('data-realsrc');
</script>
```

## 预加载
* 图片等静态资源在使用之前的提前请求
* 资源使用到时能从缓存中加载，提升用户体验
* 页面展示的依赖关系维护