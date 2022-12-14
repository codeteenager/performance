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

## 合理使用缓存
* 合理缓存DOM对象，浏览器每次查询DOM对象很消耗时间
* 缓存列表长度，把列表下li的长度缓存起来，不需要每次查询列表长度
* 使用可缓存的ajax