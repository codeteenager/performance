# 懒加载和预加载
## 懒加载
懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

### 优势

* 图片进入可视区域之后请求图片资源
* 对于电商等图片很多，页面很长的业务场景适用
* 减少无效资源的加载
* 并发加载的资源过多会阻塞js的加载，影响网站的正常使用

### 原理
首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。

```html
// 图片懒加载
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Lazyload</title>
    <style>
        .image-item {
            display: block;
            margin-bottom: 50px;
            height: 200px; // 一定记得设置图片高度
        }
    </style>
</head>

<body>
    <img src="" class="image-item" lazyload="true" data-original="images/1.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/2.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/3.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/4.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/5.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/6.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/7.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/8.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/9.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/10.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/11.png" />
    <img src="" class="image-item" lazyload="true" data-original="images/12.png" />
    <script>
        var viewHeight = document.documentElement.clientHeight // 获取可视区高度
        function lazyload() {
            var eles = document.querySelectorAll（'img[data-original][lazyload]'）
            Array.prototype.forEach.call(eles, function (item, index) {
                var rect
                if (item.dataset.original === "")
                    return
                rect = item.getBoundingClientRect() // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
                if (rect.bottom >= 0 && rect.top < viewHeight) {
                    !function () {
                        var img = new Image()
                        img.src = item.dataset.original
                        img.onload = function () {
                            item.src = img.src
                        }
                        item.removeAttribute（"data-original"）// 移除属性，下次不再遍历
                        item.removeAttribute（"lazyload"）
                    }()
                }
            })
        }
        lazyload() // 刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
        document.addEventListener（"scroll"，lazyload)
    </script>
</body>

</html>
```

## 预加载
预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源，进而提升用户体验。

### 实现原理
让img 标签先显示其他的图片，当其指向的真实图片缓存完成后，再显示为实际的图片。

```js
function preLoadImg(url, callback) {
    var img = new Image();
    img.src = url;
    //兼容ie、opera刷新页面时，不触发onload事件
    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function() { //图片下载完毕时异步调用callback函数。
        callback(img);
    };
}
window.onload = function() {
    var arr = ["img/11.jpg", "img/12.jpg", "img/13.jpg"],
        imgs = document.getElementsByTagName("img"),
        len = imgs.length;
    preLoadImg(arr[0], function(data) {
        imgs[0].src = data.src;
    });
    preLoadImg(arr[1], function(data) {
        imgs[1].src = data.src;
    });
};
```

首先实例化一个Image对象赋值给img，然后设置img.src为参数url指定的图片地址,接着判断img的complete属性，如果本地有这张图片的缓存，则该值为true，此时我们可以直接操作这张图片，如果本地没有缓存，则该值为false，此时我们需要监听img的onload事件。