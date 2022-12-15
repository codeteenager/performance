# 性能监控

页面性能直接影响用户的实际体验。研究表明：用户最满意的打开网页时间是2～5s，如果等待时间超过10s，那么多数用户会关闭这个网页。性能是影响用户体验至关重要的因素，也是开发人员重点关注的部分。

开发人员在开发环境下访问页面时，打开速度通常很快，但用户的访问速度却远远不及预期，这是因为开发环境下的硬件设备和网络情况通常远远优于用户的。性能往往是由多方面因素共同决定的，页面打开的速度只是最终呈现的结果。如果开发人员想衡量页面的性能，就必须建立一套能够客观衡量的指标，并基于这些指标完善监控系统。 

## Performance API
浏览器及其底层引擎提供的功能越来越强大，开发人员可以构建更复杂的页面应用。页面的性能变得越来越重要，开发人员迫切希望有一套标准能够用来评估和了解应用程序的性能特征。因此，W3C在2010年8月成立了Web Performance Working Group，其目的是提供可以衡量页面性能的API，这个API就是window.performance。

window.performance会返回一个Performance类型的对象，其中，performance.timing包含了各种与浏览器性能有关的时间数据，提供浏览器各处理阶段的耗时，
![](/monitor/2.png)
浏览器加载页面的过程被区分成了9个阶段，performance.timing将每个阶段的关键节点发生变更时的毫秒时间戳都进行了标记，每个节点的时间戳的含义如下。

|       字段               | 含义     |
| -------------------------- | ---------------------- |
| navigationStart            | 在同一个浏览器上下文中，前一个页面卸载结束时的时间戳。如果没有前一个页面，这个值会和fetchStart相同 |
| redirectStart              | 第一个HTTP开始重定向时的时间戳。如果没有重定向，或者重定向过程中的某一个域名不同源，则返回值为0   |
| redirectEnd                | 第一个HTTP重定向结束时的时间戳。如果没有重定向，或者重定向过程中的某一个域名不同源，则返回值为0      |
| fetchStart                 | 浏览器准备好使用HTTP请求获取文档时的时间戳,这发生在检查缓存之前       |
| domainLookupStart          | 域名查询开始时的时间戳。如果使用了持久连接，或者域名查询的信息已经存储到了缓存或者本地资源上，则这个值将和fetchStart相同     |
| domainLookupEnd            |域名查询结束时的时间戳。如果使用了持久连接，或者域名查询的信息已经存储到了缓存或者本地资源上，则这个值将和fetchStart相同          |
| connectStart               | HTTP开始向服务器发送请求时的时间戳。如果使用了持久连接，或者域名查询的信息已经存储到了缓存或者本地资源上，则这个值将和fetchStart相同      |
| secureConnectionStart      |浏览器与服务器开始安全连接的握手时的时间戳。如果当前网页不需要建立安全连接，则返回值为0            |
| connectEnd                 | 浏览器与服务器之间建立连接时的时间戳。如果使用了持久连接，或者域名查询的信息已经存储到了缓存或者本地资源上，则这个值将和fetchStart相同。连接建立指所有握手和认证过程全部结束          |
| requestStart               | HTTP请求读取真实文档开始的时间,包括从本地缓存读取         |
| requestEnd                 | HTTP请求读取真实文档结束的时间,包括从本地缓存读取         |
| responseStart              | 浏览器从服务器收到（或从本地缓存读取）第一字节时的时间戳。如果传输层在开始请求之后失败并且连接被重新发起，则该属性将被重置为新请求的发起时间 |
| responseEnd                | 浏览器从服务器收到（或从本地缓存/资源读取）最后一字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳      |
| unloadEventStart           | unload事件发生时的时间戳。如果没有前一个页面，或者前一个页面的域名或重定向过程中的某个域名与当前域名不同源，则返回值为0       |
| unloadEventEnd             | unload事件结束时的时间戳。如果没有前一个页面，或者前一个页面的域名或重定向过程中的某个域名与当前域名不同源，则返回值为0   |
| domLoading                 | 当前网页DOM结构开始解析时，即document.readyState属性变为loading，相对应的readystatechange事件触发时的时间戳  |
| domInteractive             | 当前网页DOM结构解析结束，开始加载内嵌资源时，即document.readyState属性变为interactive，相应的readystatechange事件触发时的时间戳|
| domContentLoadedEventStart | 网页domContentLoaded事件发生的时间     |
| domContentLoadedEventEnd   | 网页domContentLoaded事件脚本执行完毕的时间,domReady的时间       |
| domComplete                | 当前文档解析完成时，即document.readyState变为complete时，相对应的readystatechange事件触发时的时间戳 |
| loadEventStart             | load事件被发送时的时间戳。如果这个事件还未被发送，则返回值为0          |
| loadEventEnd               | ：load事件结束，即加载事件完成时的时间戳。如果load事件还未被发送，或者尚未完成，则返回值为0 |

通过对以上指标取差值，可以得到每个阶段耗费的时间，从而建立更加直观的指标，示例如下。

| 字段        | 描述              | 计算方式         | 意义              |
| --------- | ----------------- | ---------------- | -------------------- |
| unload    | 前一个页面卸载耗时          | unloadEventEnd – unloadEventStart         | -             |
| redirect  | 重定向耗时                  | redirectEnd – redirectStart         | 重定向的时间       |
| appCache  | 缓存耗时                    | domainLookupStart – fetchStart         | 读取缓存的时间     |
| dns       | DNS 解析耗时       | domainLookupEnd – domainLookupStart      | 可观察域名解析服务是否正常    |
| tcp       | TCP 连接耗时         | connectEnd – connectStart       | 建立连接的耗时     |
| ssl       | SSL 安全连接耗时      | connectEnd – secureConnectionStart      | 反映数据安全连接建立耗时   |
| ttfb      | Time to First Byte(TTFB)网络请求耗时 | responseStart – requestStart      | TTFB是发出页面请求到接收到应答数据第一个字节所花费的毫秒数    |
| response  | 响应数据传输耗时        | responseEnd – responseStart        | 观察网络是否正常      |
| dom       | DOM解析耗时             | domInteractive – responseEnd        | 观察DOM结构是否合理，是否有JS阻塞页面解析    |
| dcl       | DOMContentLoaded 事件耗时          | domContentLoadedEventEnd – domContentLoadedEventStart | 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
| resources | 资源加载耗时            | domComplete – domContentLoadedEventEnd     | 可观察文档流是否过大     |
| domReady  | DOM阶段渲染耗时         | domContentLoadedEventEnd – fetchStart        | DOM树和页面资源加载完成时间，会触发`domContentLoaded`事件                |
| 首次渲染耗时    | 首次渲染耗时      | responseEnd-fetchStart         | 加载文档到看到第一帧非空图像的时间，也叫白屏时间 |
| 首次可交互时间   | 首次可交互时间     | domInteractive-fetchStart      | DOM树解析完成时间，此时document.readyState为interactive   |
| 首包时间耗时    | 首包时间          | responseStart-domainLookupStart     | DNS解析到响应返回给浏览器第一个字节的时间 |
| 页面完全加载时间  | 页面完全加载时间     | loadEventStart - fetchStart      | -          |
| onLoad    | onLoad事件耗时              | loadEventEnd – loadEventStart   | -   |

除此之外，performance还提供了getEntries方法，它会返回一个PerformanceEntry对象数组，用于记录浏览器的绘制、资源加载等行为，可以借助它获取一些更复杂的指标

## 核心性能指标
用户体验是所有网站都关注的问题之一，优化用户体验的前提是能评估当前的性能状况，找到短板。Google提供了许多性能测量和性能报告工具，但对于刚接触开发的人员而言，大量的工具和指标令人应接不暇。部分开发人员只想评估网站的性能、判断用户体验的好坏，不需要成为性能专家。因此，Google启动了Web Vitals计划，和W3C的Web Performance Working Group协作，致力于打造一组新的标准化API和指标，从而更准确地测量用户的网页性能体验。Web Vitals计划的目的是简化性能评估的手段，帮助开发人员专注于最重要的指标，即核心Web指标。

核心Web指标的构成会随着时间的推移而发展。2020年的指标构成侧重于用户体验方面的加载性能、交互性和视觉稳定性，核心性能指标（及各指标相应的阈值）。
![](/monitor/5.jpg)
最大内容绘制（Largest Contentful Paint，LCP）测量加载性能。为了提供良好的用户体验，LCP应在页面首次开始加载后的2.5s内发生。

首次输入延迟（First Input Delay，FID）测量交互性。为了提供良好的用户体验，页面的FID应为100ms或更短。

累积布局偏移（Cumulative Layout Shift，CLS）测量视觉稳定性。为了提供良好的用户体验，页面的CLS值应保持在0.1或更少。

Google提供开源工具库web-vitals，开发人员可以在项目中引入、调用相应方法，获取对应的性能指标数据。
```js
import {getLCP,getFID,getCLS} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### Dom解析过程
![](/monitor/3.png)

### 数据结构
```js
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364183",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "timing",
  "connectTime": "0",
  "ttfbTime": "1",
  "responseTime": "1",
  "parseDOMTime": "80",
  "domContentLoadedTime": "0",
  "timeToInteractive": "88",
  "loadTime": "89"
}
```

### 实现
```js
import onload from "../util/onload";
import tracker from "../util/tracker";
import formatTime from "../util/formatTime";
import getLastEvent from "../util/getLastEvent";
import getSelector from "../util/getSelector";
export function timing() {
  onload(function () {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = performance.timing;
      tracker.send({
        kind: "experience",
        type: "timing",
        connectTime: connectEnd - connectStart, //TCP连接耗时
        ttfbTime: responseStart - requestStart, //ttfb
        responseTime: responseEnd - responseStart, //Response响应耗时
        parseDOMTime: loadEventStart - domLoading, //DOM解析渲染耗时
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart, //DOMContentLoaded事件回调耗时
        timeToInteractive: domInteractive - fetchStart, //首次可交互时间
        loadTime: loadEventStart - fetchStart, //完整的加载时间
      });
    }, 3000);
  });
}
```

## 其他指标

| 字段  | 描述             | 备注                 |
| --- | ----------------- | ---------------------- | 
| FP  | First Paint(首次绘制)   | 包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻    |    
| FCP | First Content Paint(首次内容绘制)        | 是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG等,这其实就是白屏时间     |     
| FMP | First Meaningful Paint(首次有意义绘制)    | 页面有意义的内容渲染的时间  |     
| LCP | (Largest Contentful Paint)(最大内容渲染) | 代表在viewport中最大的页面元素加载的时间   |    
| DCL | (DomContentLoaded)(DOM加载完成)        | 当 HTML 文档被完全加载和解析完成之后, DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |    
| L   | (onLoad)    | 当依赖的资源全部加载完毕之后才会触发           |    
| TTI | (Time to Interactive) 可交互时间        | 用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点   |    
| FID | First Input Delay(首次输入延迟)      | 用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间  |  

### 数据结构设计
1. paint
```js
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364186",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "paint",
  "firstPaint": "102",
  "firstContentPaint": "2130",
  "firstMeaningfulPaint": "2130",
  "largestContentfulPaint": "2130"
}
```

2. firstInputDelay
```js
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828477284",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "firstInputDelay",
  "inputDelay": "3",
  "duration": "8",
  "startTime": "4812.344999983907",
  "selector": "HTML BODY #container .content H1"
}
```

### 实现
关键时间节点通过window.performance.timing获取

```js
import tracker from "../utils/tracker";
import onload from "../utils/onload";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";

export function timing() {
  let FMP, LCP;
  // 增加一个性能条目的观察者
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect(); // 不再观察了
  }).observe({ entryTypes: ["element"] }); // 观察页面中有意义的元素
  // 增加一个性能条目的观察者
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries();
    const lastEntry = perfEntries[perfEntries.length - 1];
    LCP = lastEntry;
    observer.disconnect(); // 不再观察了
  }).observe({ entryTypes: ["largest-contentful-paint"] }); // 观察页面中最大的元素
  // 增加一个性能条目的观察者
  new PerformanceObserver((entryList, observer) => {
    const lastEvent = getLastEvent();
    const firstInput = entryList.getEntries()[0];
    if (firstInput) {
      // 开始处理的时间 - 开始点击的时间，差值就是处理的延迟
      let inputDelay = firstInput.processingStart - firstInput.startTime;
      let duration = firstInput.duration; // 处理的耗时
      if (inputDelay > 0 || duration > 0) {
        tracker.send({
          kind: "experience", // 用户体验指标
          type: "firstInputDelay", // 首次输入延迟
          inputDelay: inputDelay ? formatTime(inputDelay) : 0, // 延迟的时间
          duration: duration ? formatTime(duration) : 0,
          startTime: firstInput.startTime, // 开始处理的时间
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : "",
        });
      }
    }
    observer.disconnect(); // 不再观察了
  }).observe({ type: "first-input", buffered: true }); // 第一次交互

  // 刚开始页面内容为空，等页面渲染完成，再去做判断
  onload(function () {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = window.performance.timing;
      // 发送时间指标
      tracker.send({
        kind: "experience", // 用户体验指标
        type: "timing", // 统计每个阶段的时间
        connectTime: connectEnd - connectStart, // TCP连接耗时
        ttfbTime: responseStart - requestStart, // 首字节到达时间
        responseTime: responseEnd - responseStart, // response响应耗时
        parseDOMTime: loadEventStart - domLoading, // DOM解析渲染的时间
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart, // DOMContentLoaded事件回调耗时
        timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
        loadTime: loadEventStart - fetchStart, // 完整的加载时间
      });
      // 发送性能指标
      let FP = performance.getEntriesByName("first-paint")[0];
      let FCP = performance.getEntriesByName("first-contentful-paint")[0];
      console.log("FP", FP);
      console.log("FCP", FCP);
      console.log("FMP", FMP);
      console.log("LCP", LCP);
      tracker.send({
        kind: "experience",
        type: "paint",
        firstPaint: FP ? formatTime(FP.startTime) : 0,
        firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
        firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
        largestContentfulPaint: LCP
          ? formatTime(LCP.renderTime || LCP.loadTime)
          : 0,
      });
    }, 3000);
  });
}
```

## 相关文章
+ [PerformanceObserver.observe](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)方法用于观察传入的参数中指定的性能条目类型的集合。当记录一个指定类型的性能条目时，性能监测对象的回调函数将会被调用
+ [entryType](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType)
+ [paint-timing](https://w3c.github.io/paint-timing/)
+ [event-timing](https://wicg.github.io/event-timing/)
+ [LCP](https://wicg.github.io/largest-contentful-paint/)
+ [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)
+ [time-to-interactive](https://github.com/WICG/time-to-interactive)
+ [MDN上网站性能数据衡量](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API)
* [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
* [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
* [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#)