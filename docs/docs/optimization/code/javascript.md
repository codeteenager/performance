# JavaScript优化
JS优化的原则是当需要时才优化，没有必要每次项目开发时都要优化，而是当项目有大的改版，代码无法维护时去考虑做优化。优化完后考虑其维护性。

## 提升JS文件加载性能
* 加载元素的顺序CSS文件放在`<head>`里，JS文件放在`<body>`里

## JS变量和函数优化
* 尽量使用id选择器，id选择器查询是最快的
* 尽量避免使用eval，eval非常损耗性能
* JS函数尽可能保持简洁
* 使用事件节流函数
* 使用事件委托，当我们ul下有li、a等标签，设置点击事件的时候可以设置在父元素ul中。

## JS动画优化
* 避免添加大量JS动画
* 尽量使用CSS3动画
* 尽量使用Canvas动画
* 合理使用requestAnimationFrame动画代替setTimeout、setInterval，requestAnimationFrame可以在正确时间进行渲染，setTimeout和setInterval无法保证callback回调函数的执行时机

## DOM编程优化
### 控制DOM大小
众所周知，页面交互卡顿和流畅度很大一部分原因就是页面有大量DOM元素。想象一下，从一个上万节点的DOM树上，使用querySelectorAll或getElementByTagName方法查找一个节点，是非常耗时的。另外元素绑定事件，事件冒泡和事件捕获的执行也会相对耗时。

通常控制DOM大小的技巧包括：
* 合理的业务逻辑
* 延迟加载即将呈现的内容

### 简化DOM操作
* 对DOM节点的操作统一处理后，再统一插入到DOM Tree中。
* 可以使用fragment，尽量不在页面DOM Tree里直接操作。
* 现在流行的框架Angular、React、Vue都在使用虚拟DOM技术，通过diff算法简化和减少DOM操作。



## 合理使用缓存
* 合理缓存DOM对象，浏览器每次查询DOM对象很消耗时间
* 缓存列表长度，把列表下li的长度缓存起来，不需要每次查询列表长度
* 使用可缓存的ajax

## JavaScript的开销和如何缩短解析时间
我们加载的资源有很多种，例如JCSS、图片、字体等，这些资源大小也有可能非常大，但是JavaScript仍然是这里面非常昂贵的。因为JavaScript除了加载过程中有开销，它在后面还需要经历解析和编译的过程，解析和编译之后才执行，后面这两步也非常耗时。