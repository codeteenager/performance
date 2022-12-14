# 页面布局与重绘优化
页面布局也叫作重排和回流，指的是浏览器对页面元素的几何属性进行计算并将最终结果绘制出来的过程。凡是元素的宽高尺寸、在页面中的位置及隐藏或显示等信息发生改变时，都会触发页面的重新布局。 

重绘：当渲染树中的一些元素需要更新属性，而这些属性只影响元素的外观、风格，而不会影响布局的就称为重绘，比如background-color。

回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建，这就称为回流（reflow）。即当页面布局和几何属性改变时就需要回流。

通常页面布局的作用范围会涉及整个文档，所以这个环节会带来大量的性能开销，我们在开发过程中，应当从代码层面出发，尽量避免页面布局或最小化其处理次数。如果仅修改了 DOM 元素的样式，而未影响其几何属性时，则浏览器会跳过页面布局的计算环节，直接进入重绘阶段。
 
虽然重绘的性能开销不及页面布局高，但为了更高的性能体验，也应当降低重绘发生的频率和复杂度。

## 触发页面布局与重绘的操作
要想避免或减少页面布局与重绘的发生，首先就是需要知道有哪些操作能够触发浏览器的页面布局与重绘的操作，然后在开发过程中尽量去避免。 

这些操作大致可以分为三类： 
* 首先就是对 DOM 元素几何属性的修改，这些属性包括 width、height、padding、margin、left、top 等，某元素的这些属性发生变化时，便会波及与它相关的所有节点元素进行几何属性的重新计算，这会带来巨大的计算量； 
* 其次是更改 DOM 树的结构，浏览器进行页面布局时的计算顺序，可类比树的前序遍历，即从上向下、从左向右。这里对 DOM 树节点的增、删、移动等操作，只会影响当前节点后的所有节点元素，而不会再次影响前面已经遍历过的元素； 
* 最后一类是获取某些特定的属性值操作，比如页面可见区域宽高 offsetWidth、offsetHeight，页面视窗中元素与视窗边界的距离 offsetTop、offsetLeft，类似的属性值还有 scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientWidth、clientHeight及调用 window.getComputedStyle 方法。 

这些属性和方法有一个共性，就是需要通过即时计算得到，所以浏览器就需要重新进行页面布局计算。

触发回流的方式有：

* 当你增加、删除、修改dom节点时，会触发Reflow或Repaint
* 当你移动dom的位置，或是搞个动画的时候
* 当你修改css样式的时候
* 当你Resize窗口的时候，或者滚动的时候
* 当你修改网页默认字体时

触发重绘的方式有：dom修改和css修改

### 触发页面重新布局的属性有哪些？

* 盒子模型相关属性：width、height、padding、margin、display、border-width、border、min-height。
* 定位属性及浮动：top、botton、left、right、position、float、clear。
* 改变节点内部文字结构：text-align、overflow-y、font-weight、overflow、font-family、line-height、vertival-align、white-space、font-size。

### 只触发重绘的属性有哪些？
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

## 新建Dom的过程
、获取dom后分割为多个图层2、对每个图层的节点计算样式结果（Recalculate style--样式重计算）3、为每个节点生成图形和位置（Layout -- 回流和重布局）4、将每个节点绘制填充到图层位图中（Paint Setup和Paint -- 重绘）5、图层作为纹理上传至GPU6、符合多个图层到页面上生成最终屏幕图像（Composite Layers -- 图层重组）

将频繁重绘回流的dom元素单独作为一个独立图层，那么这个dom元素的重绘和回流的影响只会在这个图层中。

### 如何将dom元素变成新的独立图层？

chrome创建图层的条件

1. 3D或透视变换CSS属性（perspective transform）
2. 使用加速视频解码的`<video>`节点
3. 拥有3D（WebGL）上下文或加速的2D上下文的`<canvas>`节点 
4. 混合插件（如Flash）
5. 对自己的opacity做css动画或使用一个动画webkit变换的元素
6. 拥有加速css过滤器的元素
7. 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
8. 元素有一个z-index较低且包含一个复合层的兄弟元素

我们希望：1、避免使用触发重绘、回流的CSS属性。2、将重绘、回流的影响范围限制在单独的图层之内。

优化点：

* 用translate替代top改变，因为top会触发重绘和回流，而translate不会
* 用opacity替代visibility
* 不要一条一条的修改DOM样式，预先定义好class，然后修改DOM的className
* 把DOM离线后修改，比如：先把DOM给display：none（有一次Reflow），然后你修改100次，然后再把它显示出来
* 不要把DOM节点的属性值放在一个循环里当成循环里的变量
* 不要使用table布局，可能很小的一个小改动会造成整个table的重新布局
* 动画实现的速度的选择
* 对于动画新建图层
* 启用GPU硬件加速

## 避免对样式的频繁改动
在通常情况下，页面的一帧内容被渲染到屏幕上会按照如下顺序依次进行，首先执行JavaScript代码，然后依次是样式计算、页面布局、绘制与合成。如果在JavaScript运行阶段涉及上述三类操作，浏览器就会强制提前页面布局的执行，为了尽量降低页面布局计算带来的性能损耗，我们应当避免使用JavaScript对样式进行频繁的修改。如果一定要修改样式，则可通过以下几种方式来降低触发重排或回流的频次。 

### 使用类名对样式逐条修改 
在 JavaScript 代码中逐行执行对元素样式的修改，是一种糟糕的编码方式，对未形成编码规范的前端初学者来说经常会出现这类的问题。错误代码示范如下：

```js
const div = document.getElementById('mydiv') 
div.style.height = '100px' 
div.style.width = '100px' 
div.style.border = '1px solid blue'
```
上述代码对样式逐行修改，每行都会触发一次对渲染树的更改，于是会导致页面布局重新计算而带来巨大的性能开销。合理的做法是，将多行的样式修改合并到一个类名中，仅在 JavaScript 脚本中添加或更改类名即可。CSS 类名可预先定义：

```css
.my-div { 
    height: 100px; 
    width: 100px; 
    border: 1px solid blue; 
}
```

然后统一在 JavaScript 中通过给指定元素添加类的方式一次完成，这样便可避免触发多次对页面布局的重新计算：
```js
const div = document.getElementById('mydiv') 
div.classList.add('mydiv')
```

### 缓存对敏感属性值的计算 
有些场景我们想要通过多次计算来获得某个元素在页面中的布局位置，比如： 
```js
const list = document.getElementById('list') 
for (let i = 0; i < 10; i++) { 
    list.style.top = `${list.offsetTop + 10}px` 
    list.style.left = `${list.offsetLeft + 10}px` 
}
```

这不但在赋值环节会触发页面布局的重新计算，而且取值涉及即时敏感属性的获取，如 offsetTop 和 offsetLeft，也会触发页面布局的重新计算。这样的性能是非常糟糕的，作为优化我们可以将敏感属性通过变量的形式缓存起来，等计算完成后再统一进行赋值触发布局重排。 
```js
const list = document.getElementById('list') 
let { offsetTop, offsetLeft } = list 
for (let i = 0; i < 10; i++) { 
    offsetTop += 10 offsetLeft += 10 
} 
// 计算完成后统一赋值触发重排 
list.style.left = offsetLeft 
list.style.top = offsetTop 
```
### 使用 requestAnimationFrame 方法控制渲染帧 
前面讲 JavaScript 动画时，提到了 requestAnimationFrame 方法可以控制回调在两个渲染帧之间仅触发一次，如果在其回调函数中一开始就取值到即时敏感属性，其实获取的是上一帧旧布局的值，并不会触发页面布局的重新计算。 
```js
requestAnimationFrame(queryDivHeight) 
function queryDivHeight () { 
    const div = document.getElementById('div') 
    console.log(div.offsetHeight) 
} 
```
如果在请求此元素高度之前更改其样式，浏览器就无法直接使用上一帧的旧有属性值，而需要先应用更改的样式，再运行页面布局计算后，才能返回所需的正确高度值。这样多余的开销显然是没有必要的。因此考虑到性能因素，在 requestAnimationFrame 方法的回调函数中，应始终优先样式的读取，然后再执行相应的写操作： 
```js
requestAnimationFrame(queryDivHeight) 
function queryDivHeight () { 
    const div = document.getElementById('div') 
    console.log(div.offsetHeight) 
    // 样式的写操作应该放在读操作后进行 
    div.classList.add('my-div') 
}
```
## 通过工具对绘制进行评估 
除了通过经验去绕过一些明显的性能缺陷，使用工具对网站页面性能进行评估和实时分析也是发现问题的有效手段。这里介绍一些基于 Chrome 开发者工具的分析方法，来辅助我们发现渲染阶段可能存在的性能问题。 

### 监控渲染信息 
打开 Chrome 的开发者工具，可以在“设置”→“更多工具”中，发现许多很实用的性能辅助小工具，比如监控渲染的 Rendering 工具，如图所示。
![](/optimization/49.png)
打开 Rendering 的工具面板后，会发现许多功能开关与选择器，下面举例介绍其中若干常用功能项。 

首先是 Paint flashing，当我们开启该功能后，操作页面发生重新渲染，Chrome 会让重绘区域进行一次绿色闪动。 这样就可以通过观察闪动区域来判断是否存在多余的绘制开销，比如若仅单击 Select 组件弹出下拉列表框，却发现整个屏幕区域都发生了闪动，或与此操作组件的无关区域发生了闪动，这都意味着有多余的绘制开销存在，需要进一步研究和优化。

## 降低绘制复杂度
如前所述，绘制是在页面布局确定后，将元素的可视内容绘制到屏幕上的过程。虽然不同的 CSS 绘制样式看不出性能上明显的不同，但并非所有属性都有同样的性能开销。例如，绘制带有阴影效果的元素内容，就会比仅绘制单色边框所耗费的时间要长，因为涉及模糊就意味着更高的复杂度。CSS 属性如下： 
```CSS 
// 绘制时间相对较短的边框颜色 
border-color: red; 
// 绘制时间较长的阴影内容
box-shadow: 0, 8px, rgba(255, 0, 0, 0.5); 
```
当我们使用之前介绍过的渲染性能分析工具，发现了有明显性能瓶颈需要优化时，需要确认是否存在高复杂度的绘制内容，可以使用其他实现方式来替换以降低绘制的复杂度。比如位图的阴影效果，可以考虑使用 Photoshop 等图像处理工具直接为图片本身添加阴影效果，而非全交给 CSS 样式去处理。 

除此之外，还要注意对绘制区域的控制，对不需要重新绘制的区域应尽量避免重绘。例如，页面的顶部有一个固定区域的 header 标头，若它与页面其他位置的某个区域位于同一图层，当后者发生重绘时，就有可能触发包括固定标头区域在内的整个页面的重绘。对于固定不变不期望发生重绘的区域，建议可将其提升为独立的绘图层，避免被其他区域的重绘连带着触发重绘。