# 骨架屏
骨架屏(Skeleton Screen)其实就是在页面加载内容之前，先给用户展示出页面的大致结构，再等拿到接口数据后在将内容替换，较传统的菊花 loading 效果会给用户一种"已经渲染一部分出来了"的错觉，在效果上可以一定程度的提升用户体验。Skeleton Screen 是近两年开始流行的加载控件，本质上是界面加载过程中的过渡效果。Skeleton Screen 给用户一种资源是逐渐加载呈现出来的感觉，使得加载过程变得流畅。

![](/optimization/82.png)
## 技术方案
骨架屏技术方案上从实现上来说大致可以三类：
* 手动维护骨架屏的代码（HTML、css or vue 、React）
* 使用图片作为骨架屏
* 自动生成骨架屏

对于前两种方案有一定的维护成本比较费人力，这里主要介绍下自动生成骨架屏的方案。

目前市面上主要使用的是饿了么开源的 webpack 插件：[page-skeleton-webpack-plugin](https://github.com/ElemeFE/page-skeleton-webpack-plugin/blob/master/docs/i18n/zh_cn.md)。它根据项目中不同的路由页面生成相应的骨架屏页面，并将骨架屏页面通过 webpack 打包到对应的静态路由页面中。这种方式将骨架屏代码与业务代码隔离，通过 webpack 注入的方式骨架屏代码（图片）注入到项目中。优势非常明显但是缺点也显而易见：webpack配置成本（还依赖html-webpack-plugin）。

## 相关文章
* [一种自动化生成骨架屏的方案](https://github.com/Jocs/jocs.github.io/issues/22)
* [自动化生成骨架屏的技术方案设计与落地](https://mdnice.com/writing/bb3aaf5c613d4e0a9cc86ee2244754df)
* [考拉前端骨架屏生成技术揭秘](https://zdk.f2er.net/wx/detail/5e8a7cfc66b63b1e6c10a5d7)
* [前端骨架屏方案与实践](https://blog.csdn.net/qq_42415326/article/details/125244964)


