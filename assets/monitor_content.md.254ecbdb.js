import{_ as t,c as e,o as i,a as d}from"./app.b59564c6.js";const r="/performance/monitor/1.png",m=JSON.parse('{"title":"前端监控内容","description":"","frontmatter":{},"headers":[{"level":3,"title":"稳定性(stability)","slug":"稳定性-stability","link":"#稳定性-stability","children":[]},{"level":3,"title":"用户体验(experience)","slug":"用户体验-experience","link":"#用户体验-experience","children":[]},{"level":3,"title":"业务(business)","slug":"业务-business","link":"#业务-business","children":[]},{"level":3,"title":"常见的埋点方案","slug":"常见的埋点方案","link":"#常见的埋点方案","children":[]}],"relativePath":"monitor/content.md","lastUpdated":1670927597000}'),a={name:"monitor/content.md"},l=d('<h1 id="前端监控内容" tabindex="-1">前端监控内容 <a class="header-anchor" href="#前端监控内容" aria-hidden="true">#</a></h1><p>前端监控要监控哪些内容呢？目标主要有三类：</p><h3 id="稳定性-stability" tabindex="-1">稳定性(stability) <a class="header-anchor" href="#稳定性-stability" aria-hidden="true">#</a></h3><table><thead><tr><th>错误名称</th><th>备注</th></tr></thead><tbody><tr><td>JS错误</td><td>JS执行错误或者promise异常</td></tr><tr><td>资源异常</td><td>script、link等资源加载异常</td></tr><tr><td>接口错误</td><td>ajax或fetch请求接口异常</td></tr><tr><td>白屏</td><td>页面空白</td></tr></tbody></table><h3 id="用户体验-experience" tabindex="-1">用户体验(experience) <a class="header-anchor" href="#用户体验-experience" aria-hidden="true">#</a></h3><table><thead><tr><th>错误名称</th><th>备注</th></tr></thead><tbody><tr><td>加载时间</td><td>各个阶段的加载时间</td></tr><tr><td>TTFB(time to first byte)(首字节时间)</td><td>是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个事件包含了网络请求时间、后端处理事件</td></tr><tr><td>FP(First Paint)(首次绘制)</td><td>首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时间</td></tr><tr><td>FCP(First Content Paint)(首次内容绘制)</td><td>首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间</td></tr><tr><td>FMP(First Meaningful paint)(首次有意义绘制)</td><td>首次有意义绘制是页面可用性的度量标准</td></tr><tr><td>FID(First Input Delay)(首次输入延迟)</td><td>用户首次和页面交互到页面响应交互的时间</td></tr><tr><td>卡顿</td><td>超过50ms的长任务</td></tr></tbody></table><h3 id="业务-business" tabindex="-1">业务(business) <a class="header-anchor" href="#业务-business" aria-hidden="true">#</a></h3><table><thead><tr><th>错误名称</th><th>备注</th></tr></thead><tbody><tr><td>PV</td><td>page view 即页面浏览量或点击量</td></tr><tr><td>UV</td><td>指访问某个站点的不同IP地址的人数</td></tr><tr><td>页面的停留时间</td><td>用户的每一个页面的停留时间</td></tr></tbody></table><p><img src="'+r+'" alt=""></p><h3 id="常见的埋点方案" tabindex="-1">常见的埋点方案 <a class="header-anchor" href="#常见的埋点方案" aria-hidden="true">#</a></h3><ol><li><p>代码埋点</p><ul><li>代码埋点：就是以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务器端。</li><li>优点是可以在任意时刻，精确的发送或保存所需要的数据信息</li><li>缺点是工作量大</li></ul></li><li><p>可视化埋点</p><ul><li>通过可视化交互的手段，代替代码埋点</li><li>将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。</li><li>可视化埋点就是用系统来代替手工插入埋点代码</li></ul></li><li><p>无痕埋点</p><ul><li>前端的任意一个事件绑定一个标识，所有的事件都被记录下来</li><li>通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析</li><li>无痕埋点的优点是采集全量数据，不会出现漏埋和误埋等现象</li><li>缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构</li></ul></li></ol>',11),n=[l];function s(h,o,c,p,b,_){return i(),e("div",null,n)}const f=t(a,[["render",s]]);export{m as __pageData,f as default};
