# CSS优化

## 提升CSS渲染性能
* 谨慎使用expensive属性：例如：nth-child伪类，position:fixed定位
* 尽量减少样式层级数：如：`div ul li span i{color:blue}`层级太多了，使用class即可，减少浏览器对CSS的查询
* 尽量避免使用占用过多CPU和内存的属性：如text-indent:-99999px
* 尽量避免使用耗电量大的属性：如CSS3 3D transforms、CSS3 transitions、Opacity

## 合理使用CSS选择器
* 尽量避免使用CSS表达式：`background-color:expression((new Date()).getHours()%2?"#FFF":"#000");`
* 尽量避免使用通配选择器：`body>a{font-weight:bold}`
* 尽量避免类正则的属性选择器：`*=,|=,^=,$=`

## 提升CSS文件加载性能
* 使用外链的CSS：内联的CSS是在HTML内容中写的，不如外链的好，外链CSS放在CDN上，用户每次访问的时候是有缓存的，减少页面体积大小。
* 尽量避免使用@import：@import是在CSS中，CSS加载完后会把@import的CSS文件全部加载完成，这样浏览器才能继续渲染，它会阻塞CSS文件加载过程，也会影响JS加载。
  
## 精简CSS代码
* 使用缩写语句，margin-top、margin-left统一放在margin中写
* 删除不必要的零，比如0.2em携程.2em
* 删除不必要的单位，例如px，margin-top:4px删除px
* 删除过多分号
* 删除空格和注释
* 尽量减少样式表的大小

## 合理使用Web Fonts
* 将字体部署在CDN上，加快用户下载字体的速度
* 将字体以base64形式保存在CSS中并通过localstorage进行缓存
* Google字体库因为某些不可抗拒原因，应该使用国内托管服务

## CSS动画优化
* 尽量避免同时动画：一个用户访问的页面区间中不要有过多的动画，动画太多打乱用户预览网站，同时影响浏览器的性能
* 延迟动画初始化：保证让其他css正常渲染，动画延迟一点，比如延迟1秒
* 结合SVG，把动画放在SVG中进行展示，其他样式放在CSS中