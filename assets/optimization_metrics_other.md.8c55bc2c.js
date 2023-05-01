import{_ as t,c as e,o as a,V as r}from"./chunks/framework.25288a50.js";const o="/performance/optimization/15.png",f=JSON.parse('{"title":"其他性能指标","description":"","frontmatter":{},"headers":[],"relativePath":"optimization/metrics/other.md","filePath":"optimization/metrics/other.md","lastUpdated":1681882472000}'),i={name:"optimization/metrics/other.md"},d=r('<h1 id="其他性能指标" tabindex="-1">其他性能指标 <a class="header-anchor" href="#其他性能指标" aria-label="Permalink to &quot;其他性能指标&quot;">​</a></h1><ul><li><a href="https://blog.csdn.net/lyj0629/article/details/80207732" target="_blank" rel="noreferrer">https://blog.csdn.net/lyj0629/article/details/80207732</a></li><li>重定向次数：performance.navigation.redirectCount</li><li>重定向耗时: redirectEnd - redirectStart</li><li>DNS 解析耗时: domainLookupEnd - domainLookupStart</li><li>TCP 连接耗时: connectEnd - connectStart</li><li>SSL 安全连接耗时: connectEnd - secureConnectionStart</li><li>网络请求耗时 (TTFB): responseStart - requestStart</li><li>数据传输耗时: responseEnd - responseStart</li><li>DOM 解析耗时: domInteractive - responseEnd</li><li>资源加载耗时: loadEventStart - domContentLoadedEventEnd</li><li>首包时间: responseStart - domainLookupStart</li><li>白屏时间: responseEnd - fetchStart</li><li>首次可交互时间: domInteractive - fetchStart</li><li>DOM Ready 时间: domContentLoadEventEnd - fetchStart</li><li>页面完全加载时间: loadEventStart - fetchStart</li><li>http 头部大小： transferSize - encodedBodySize</li></ul><h2 id="speed-index-si" tabindex="-1">Speed Index (SI) <a class="header-anchor" href="#speed-index-si" aria-label="Permalink to &quot;Speed Index (SI)&quot;">​</a></h2><p>Speed Index（速度指数）是一个表示页面可视区域中内容的填充速度的指标，可以通过计算页面可见区域内容显示的平均时间来衡量。</p><h3 id="测量方式" tabindex="-1">测量方式 <a class="header-anchor" href="#测量方式" aria-label="Permalink to &quot;测量方式&quot;">​</a></h3><p>捕获浏览器加载页面过程的视频，然后对每 100ms 间隔的页面截图计算页面内容填充的百分比，可以得到这样一个曲线。 <img src="'+o+'" alt=""></p><p>图中的 Example 1 和 Example 2 都是在 10s 时页面填充完成，但 Example 1 在 2s 时就已经填充了 80% 的内容，而 Example 2 在 8s 时才填充 80%。</p><p>图中阴影部分的面积（即时间-内容填充百分比曲线以上部分）的大小即可表示可视区域内页面内容的填充速度，面积越小，填充速度越快。</p><h3 id="速度指标" tabindex="-1">速度指标 <a class="header-anchor" href="#速度指标" aria-label="Permalink to &quot;速度指标&quot;">​</a></h3><table><thead><tr><th>速度指数 （以秒为单位）</th><th>颜色编码</th><th>速度指数得分</th></tr></thead><tbody><tr><td>0–4.3</td><td>绿色（快速）</td><td>75–100</td></tr><tr><td>4.4–5.8</td><td>橙色（中等）</td><td>50–74</td></tr><tr><td>5.8以上</td><td>红色（慢）</td><td>0–49</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">优化方案</p><p><a href="https://web.dev/speed-index/#how-to-improve-your-speed-index-score" target="_blank" rel="noreferrer">https://web.dev/speed-index/#how-to-improve-your-speed-index-score</a></p></div><h2 id="frames-per-second-fps" tabindex="-1">Frames Per Second（FPS） <a class="header-anchor" href="#frames-per-second-fps" aria-label="Permalink to &quot;Frames Per Second（FPS）&quot;">​</a></h2><p>帧率是视频设备产生图像（或帧）的速率，用每秒可以重新绘制的帧数（Frames Per Second，FPS）表示。 重新绘制可能需要重新计算样式、布局和绘制，如果每帧绘制到屏幕的时间在 16.7 ms 以上，每秒绘制的帧数就会小于 60 帧，人眼就能感受到页面出现卡顿，所以 FPS 是衡量应用流畅度的一个非常重要的指标，60fps 是页面流畅的目标，可以为每次绘制提供 16.7ms 的时间预算。</p><p>既然帧率与页面重新绘制有关，那我们可以思考两个问题：</p><ol><li>哪些情况下会触发重新绘制？</li></ol><p>FPS 在电影和游戏中最为常见，但现在被广泛用作衡量网站和网络应用程序性能的指标。</p><p>在 Web 性能中，FPS 最常用于衡量动画的性能：如果 FPS 太低，动画会卡顿。 FPS 也可以作为用户与页面交互时页面响应性的一般度量。例如，如果将鼠标移到某个页面元素上会触发执行 JavaScript 来更新页面，这可能会触发回流和重绘，这需要在帧中完成，如果浏览器处理帧的时间过长，将会出现卡顿现象。</p><p>再例如，如果在滚动页面时会触发很多复杂的页面更新，并且浏览器无法保持可接受的帧率，那么滚动页面时会显得迟缓或卡顿。</p><ol start="2"><li>如何降低重新绘制的时间？</li></ol><p>重新绘制到屏幕可能需要从构建 DOM 树开始、重新计算样式、布局、绘制等，我们需要尽可能的避免触发这些流程，例如使用 CSS 修改 opacity 属性就不会触发重新布局，可以减少绘制时间。</p><p>所以在实现动画时，建议使用性能成本低的 CSS 属性，而不要使用 JavaScript 设置元素。</p>',21),n=[d];function l(s,p,c,h,m,S){return a(),e("div",null,n)}const u=t(i,[["render",l]]);export{f as __pageData,u as default};
