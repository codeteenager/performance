# 重绘和回流
## 什么是重绘和回流？
重绘：当渲染树中的一些元素需要更新属性，而这些属性只影响元素的外观、风格，而不会影响布局的就称为重绘，比如background-color。

回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建，这就称为回流（reflow）。即当页面布局和几何属性改变时就需要回流。

触发回流的方式有：

* 当你增加、删除、修改dom节点时，会触发Reflow或Repaint
* 当你移动dom的位置，或是搞个动画的时候
* 当你修改css样式的时候
* 当你Resize窗口的时候，或者滚动的时候
* 当你修改网页默认字体时

触发重绘的方式有：dom修改和css修改

## 触发页面重新布局的属性有哪些？

* 盒子模型相关属性：width、height、padding、margin、display、border-width、border、min-height。
* 定位属性及浮动：top、botton、left、right、position、float、clear。
* 改变节点内部文字结构：text-align、overflow-y、font-weight、overflow、font-family、line-height、vertival-align、white-space、font-size。

## 只触发重绘的属性有哪些？
* color
* border-style
* border-radius
* visibility
* text-decoration
* background
* background-image
* background-position
* background-repeat
* background-size
* outline-color
* outline-style
* outline-width
* box-shadow

新建Dom的过程。

1、获取dom后分割为多个图层2、对每个图层的节点计算样式结果（Recalculate style--样式重计算）3、为每个节点生成图形和位置（Layout -- 回流和重布局）4、将每个节点绘制填充到图层位图中（Paint Setup和Paint -- 重绘）5、图层作为纹理上传至GPU6、符合多个图层到页面上生成最终屏幕图像（Composite Layers -- 图层重组）

将频繁重绘回流的dom元素单独作为一个独立图层，那么这个dom元素的重绘和回流的影响只会在这个图层中。

如何将dom元素变成新的独立图层？

chrome创建图层的条件

1、3D或透视变换CSS属性（perspective transform）2、使用加速视频解码的`<video>`节点3、拥有3D（WebGL）上下文或加速的2D上下文的`<canvas>`节点 4、混合插件（如Flash）5、对自己的opacity做css动画或使用一个动画webkit变换的元素6、拥有加速css过滤器的元素7、元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）8、元素有一个z-index较低且包含一个复合层的兄弟元素

我们希望：1、避免使用触发重绘、回流的CSS属性。2、将重绘、回流的影响范围限制在单独的图层之内。

优化点：

* 用translate替代top改变
* 用opacity替代visibility
* 不要一条一条的修改DOM样式，预先定义好class，然后修改DOM的className
* 把DOM离线后修改，比如：先把DOM给display：none（有一次Reflow），然后你修改100次，然后再把它显示出来
* 不要把DOM节点的属性值放在一个循环里当成循环里的变量
* 不要使用table布局，可能很小的一个小改动会造成整个table的重新布局
* 动画实现的速度的选择
* 对于动画新建图层
* 启用GPU硬件加速