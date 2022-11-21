# 介绍

## 为什么做前端监控?
1. 更快发现问题和解决问题，在用户反馈之前自己发现问题并解决。
2. 做产品的决策依据，产品发布之后有没有人用，pv、uv多少可以知道。
3. 提升前端工程师的技术深度和广度，打造简历亮点，什么是亮点？就是有技术难度，推进产品的改进。
4. 为业务扩展提供了更多可能性，有了数据之后提供更多的业务功能。

## 前端监控目标
前端监控要监控哪些内容呢？目标主要有三类：
### 稳定性(stability)  
|   错误名称    |   备注   |
|    ---    |    ---     |
|   JS错误   |    JS执行错误或者promise异常 |
|  资源异常  |   script、link等资源加载异常|
|  接口错误  |   ajax或fetch请求接口异常|
|  白屏     |    页面空白                  |

### 用户体验(experience)
|  错误名称  |  备注   |
|   ---    |  ---    |
| 加载时间  |  各个阶段的加载时间  |
| TTFB(time to first byte)(首字节时间) | 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个事件包含了网络请求时间、后端处理事件  |
|  FP(First Paint)(首次绘制)  |  首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时间 |
| FCP(First Content Paint)(首次内容绘制) | 首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间 |
| FMP(First Meaningful paint)(首次有意义绘制) | 首次有意义绘制是页面可用性的度量标准 |
| FID(First Input Delay)(首次输入延迟) |  用户首次和页面交互到页面响应交互的时间  |
|  卡顿                 | 超过50ms的长任务  |

### 业务(business)

|  错误名称  | 备注  |
| PV   | page view 即页面浏览量或点击量  |
| UV  | 指访问某个站点的不同IP地址的人数 |
| 页面的停留时间  |  用户的每一个页面的停留时间  |

## 前端监控流程
1. 前端埋点
2. 数据上报
3. 分析和计算 将采集到的数据进行加工汇总
4. 可视化展示 将数据按各种维度进行展示
5. 监控报警   发现问题后按一定的条件触发报警

![](/monitor/1.png)

### 常见的埋点方案
1. 代码埋点
    * 代码埋点：就是以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务器端。
    * 优点是可以在任意时刻，精确的发送或保存所需要的数据信息
    * 缺点是工作量大

2. 可视化埋点
    * 通过可视化交互的手段，代替代码埋点
    * 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。
    * 可视化埋点就是用系统来代替手工插入埋点代码

3. 无痕埋点
    * 前端的任意一个事件绑定一个标识，所有的事件都被记录下来
    * 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
    * 无痕埋点的优点是采集全量数据，不会出现漏埋和误埋等现象
    * 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

## 前端采集脚本
### 错误采集
* JS错误
    + JS错误
    + Promise异常
* 资源异常
    + 监听error

#### 数据结构设计

1.  jsError
```js
{
    "title": "前端监控系统", //页面标题
    "url": "http://localhost:8080", //页面地址
    "timestamp": "1590815288710", //访问时间戳
    "userAgent": "Chrome", //用户浏览器类型
    "kind": "stability", //大类
    "type": "error", //小类
    "errorType": "jsError",//错误类型 
    "message": "Uncaught TypeError: Cannot set property 'error' of Undefined", //类型详情
    "filename": "http://localhost:8080", //访问的文件名
    "position": "0:0",//行列信息
    "stack": "btnClick(http://localhost:8080/:20:39)^HTMLInputElement.onclick(http://localhost:8080/:14:72)",//堆栈信息
    "selector": "HTML BODY #container .content INPUT" //选择器
}
```
2.  promiseError

```js
{
    "title": "前端监控系统", //页面标题
    "url": "http://localhost:8080", //页面地址
    "timestamp": "1590815288710", //访问时间戳
    "userAgent": "Chrome", //用户浏览器类型
    "kind": "stability", //大类
    "type": "error", //小类
    "errorType": "promiseError",//错误类型 
    "message": "someVar is not defined", //类型详情
    "filename": "http://localhost:8080", //访问的文件名
    "position": "0:0",//行列信息
    "stack": "btnClick(http://localhost:8080/:20:39)^HTMLInputElement.onclick(http://localhost:8080/:14:72)",//堆栈信息
    "selector": "HTML BODY #container .content INPUT" //选择器
}
```
3. resourceError
```js
{
    "title": "前端监控系统", //页面标题
    "url": "http://localhost:8080", //页面地址
    "timestamp": "1590815288710", //访问时间戳
    "userAgent": "Chrome", //用户浏览器类型
    "kind": "stability", //大类
    "type": "error", //小类
    "errorType": "resourceError",//错误类型
    "filename": "http://localhost:8080/error.js",//访问的文件名
    "tagName": "SCRIPT",//标签名
    "timeStamp": "76",//时间 
}
```

#### 实现
1. js异常和资源加载
```js
//一般JS运行时错误使用window.onerror捕获处理
window.addEventListener(
  "error",
  function (event) {
    let lastEvent = getLastEvent();
    // 有 e.target.src(href) 的认定为资源加载错误
    if (event.target && (event.target.src || event.target.href)) {
      tracker.send({
        //资源加载错误
        kind: "stability", //稳定性指标
        type: "error", //resource
        errorType: "resourceError",
        filename: event.target.src || event.target.href, //加载失败的资源
        tagName: event.target.tagName, //标签名
        timeStamp: formatTime(event.timeStamp), //时间
        selector: getSelector(event.path || event.target), //选择器
      });
    } else {
      tracker.send({
        kind: "stability", //稳定性指标
        type: "error", //error
        errorType: "jsError", //jsError
        message: event.message, //报错信息
        filename: event.filename, //报错链接
        position: (event.lineNo || 0) + ":" + (event.columnNo || 0), //行列号
        stack: getLines(event.error.stack), //错误堆栈
        selector: lastEvent
          ? getSelector(lastEvent.path || lastEvent.target)
          : "", //CSS选择器
      });
    }
  },
  true
); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
```
2. promise
```js
//当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
window.addEventListener(
  "unhandledrejection",
  function (event) {
    let lastEvent = getLastEvent();
    let message = "";
    let line = 0;
    let column = 0;
    let file = "";
    let stack = "";
    if (typeof event.reason === "string") {
      message = event.reason;
    } else if (typeof event.reason === "object") {
      message = event.reason.message;
    }
    let reason = event.reason;
    if (typeof reason === "object") {
      if (reason.stack) {
        var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        if (matchResult) {
          file = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = getLines(reason.stack);
      }
    }
    tracker.send({
      //未捕获的promise错误
      kind: "stability", //稳定性指标
      type: "error", //jsError
      errorType: "promiseError", //unhandledrejection
      message: message, //标签名
      filename: file,
      position: line + ":" + column, //行列
      stack,
      selector: lastEvent
        ? getSelector(lastEvent.path || lastEvent.target)
        : "",
    });
  },
  true
); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
```

#### 上传方式
业内主流用gif图片上传方式，图片速度快，且没有跨域问题。

### 接口异常采集

#### 数据结构设计
```js
{
    "title": "前端监控系统", //标题
    "url": "http://localhost:8080//", //url
    "timestamp": "1590817024490",  //时间戳
    "userAgent": "Chrome", //浏览器版本
    "kind": "stability",   //大类
    "type": "xhr",       //小类
    "eventType": "load", //事件类型
    "pathname": "/success", //路径
    "status": "200-OK", //状态码
    "duration": "7",  //持续时间
    "response": "{\"id\":1}", //响应内容
    "params": "name=ceshi"  //参数
}
```
#### 实现
```js
import tracker from "../util/tracker";
export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    method,
    url,
    async,
    username,
    password
  ) {
    // 上报的接口不用处理
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = {
        method,
        url,
        async,
        username,
        password,
      };
    }
    return oldOpen.apply(this, arguments);
  };
  let oldSend = XMLHttpRequest.prototype.send;
  let start;
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      start = Date.now();
      let handler = (type) => (event) => {
        let duration = Date.now() - start;
        let status = this.status;
        let statusText = this.statusText;
        tracker.send({
          //未捕获的promise错误
          kind: "stability", //稳定性指标
          type: "xhr", //xhr
          eventType: type, //load error abort
          pathname: this.logData.url, //接口的url地址
          status: status + "-" + statusText,
          duration: "" + duration, //接口耗时
          response: this.response ? JSON.stringify(this.response) : "",
          params: body || "",
        });
      };
      this.addEventListener("load", handler("load"), false);
      this.addEventListener("error", handler("error"), false);
      this.addEventListener("abort", handler("abort"), false);
    }
    oldSend.apply(this, arguments);
  };
}
```

### 白屏
白屏就是页面上什么都没有

#### 数据结构设计
```js
{
    "title": "前端监控系统",
    "url": "http://localhost:8080",
    "timestamp": "1590822618759",
    "userAgent": "Chrome",
    "kind": "stability",
    "type": "blank",
    "emptyPoints": "0",     //空白点
    "screen": "2049x1152",  //分辨率
    "viewPoint": "2048x994", //视口
    "selector": "HTML BODY #container"  //选择器
}
```
#### 实现
* screen：返回当前window的screen对象，返回当前渲染窗口中和屏幕有关的属性
* innerWidth：只读的window属性innerWidth返回以像素为单位的窗口的内部宽度
* innerHeight：窗口的内部高度(布局视口)的高度
* layout_viewport
* elementsFromPoint方法可以获取当前视口内指定坐标处，由里到外排列的所有元素

```js
import tracker from "../util/tracker";
import onload from "../util/onload";
function getSelector(element) {
  var selector;
  if (element.id) {
    selector = `#${element.id}`;
  } else if (element.className && typeof element.className === "string") {
    selector =
      "." +
      element.className
        .split(" ")
        .filter(function (item) {
          return !!item;
        })
        .join(".");
  } else {
    selector = element.nodeName.toLowerCase();
  }
  return selector;
}
export function blankScreen() {
  const wrapperSelectors = ["body", "html", "#container", ".content"];
  let emptyPoints = 0;
  function isWrapper(element) {
    let selector = getSelector(element);
    if (wrapperSelectors.indexOf(selector) >= 0) {
      emptyPoints++;
    }
  }
  onload(function () {
    let xElements, yElements;
    debugger;
    for (let i = 1; i <= 9; i++) {
      xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      );
      yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      );
      isWrapper(xElements[0]);
      isWrapper(yElements[0]);
    }
    if (emptyPoints >= 0) {
      let centerElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      tracker.send({
        kind: "stability",
        type: "blank",
        emptyPoints: "" + emptyPoints,
        screen: window.screen.width + "x" + window.screen.height,
        viewPoint: window.innerWidth + "x" + window.innerHeight,
        selector: getSelector(centerElements[0]),
      });
    }
  });
}
//screen.width  屏幕的宽度   screen.height 屏幕的高度
//window.innerWidth 去除工具条与滚动条的窗口宽度 window.innerHeight 去除工具条与滚动条的窗口高度
```

### 加载时间 
* [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
* [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
* [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#)

#### 阶段含义
![](/monitor/2.png)

|       字段               | 含义     |
| -------------------------- | ---------------------- |
| navigationStart            | 初始化页面，在同一个浏览器上下文中前一个页面unload的时间戳，如果没有前一个页面的unload,则与fetchStart值相等 |
| redirectStart              | 第一个HTTP重定向发生的时间,有跳转且是同域的重定向,否则为0    |
| redirectEnd                | 最后一个重定向完成时的时间,否则为0       |
| fetchStart                 | 浏览器准备好使用http请求获取文档的时间,这发生在检查缓存之前       |
| domainLookupStart          | DNS域名开始查询的时间,如果有本地的缓存或keep-alive则时间为0     |
| domainLookupEnd            | DNS域名结束查询的时间            |
| connectStart               | TCP开始建立连接的时间,如果是持久连接,则与`fetchStart`值相等       |
| secureConnectionStart      | https 连接开始的时间,如果不是安全连接则为0             |
| connectEnd                 | TCP完成握手的时间，如果是持久连接则与`fetchStart`值相等          |
| requestStart               | HTTP请求读取真实文档开始的时间,包括从本地缓存读取         |
| requestEnd                 | HTTP请求读取真实文档结束的时间,包括从本地缓存读取         |
| responseStart              | 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳     |
| responseEnd                | 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳          |
| unloadEventStart           | 前一个页面的unload的时间戳 如果没有则为0        |
| unloadEventEnd             | 与`unloadEventStart`相对应，返回的是`unload`函数执行完成的时间戳       |
| domLoading                 | 返回当前网页DOM结构开始解析时的时间戳,此时`document.readyState`变成loading,并将抛出`readyStateChange`事件                                             |
| domInteractive             | 返回当前网页DOM结构结束解析、开始加载内嵌资源时时间戳,`document.readyState` 变成`interactive`，并将抛出`readyStateChange`事件(注意只是DOM树解析完成,这时候并没有开始加载网页内的资源) |
| domContentLoadedEventStart | 网页domContentLoaded事件发生的时间     |
| domContentLoadedEventEnd   | 网页domContentLoaded事件脚本执行完毕的时间,domReady的时间       |
| domComplete                | DOM树解析完成,且资源也准备就绪的时间,`document.readyState`变成`complete`.并将抛出`readystatechange`事件                                            |
| loadEventStart             | load 事件发送给文档，也即load回调函数开始执行的时间            |
| loadEventEnd               | load回调函数执行完成的时间     |

#### 阶段计算

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

#### Dom解析过程
![](/monitor/3.png)

#### 数据结构
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

#### 实现
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

### 性能指标
+ [PerformanceObserver.observe](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)方法用于观察传入的参数中指定的性能条目类型的集合。当记录一个指定类型的性能条目时，性能监测对象的回调函数将会被调用
+ [entryType](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType)
+ [paint-timing](https://w3c.github.io/paint-timing/)
+ [event-timing](https://wicg.github.io/event-timing/)
+ [LCP](https://wicg.github.io/largest-contentful-paint/)
+ [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)
+ [time-to-interactive](https://github.com/WICG/time-to-interactive)

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

#### 数据结构设计
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

#### 实现
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

### 卡顿
响应用户交互的响应时间如果大于100ms,用户就会感觉卡顿
#### 数据设计
```js
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828656781",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "longTask",
  "eventType": "mouseover",
  "startTime": "9331",
  "duration": "200",
  "selector": "HTML BODY #container .content"
}
```

#### 实现
```js
import tracker from "../util/tracker";
import formatTime from "../util/formatTime";
import getLastEvent from "../util/getLastEvent";
import getSelector from "../util/getSelector";
export function longTask() {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent();
        requestIdleCallback(() => {
          tracker.send({
            kind: "experience",
            type: "longTask",
            eventType: lastEvent.type,
            startTime: formatTime(entry.startTime), // 开始时间
            duration: formatTime(entry.duration), // 持续时间
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : "",
          });
        });
      }
    });
  }).observe({ entryTypes: ["longtask"] });
}
```

### PV、UV、用户停留时间
#### 数据结构设计
```js
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590829304423",
  "userAgent": "chrome",
  "kind": "business",
  "type": "pv",
  "effectiveType": "4g",
  "rtt": "50",
  "screen": "2049x1152"
}
```

#### PV、UV、用户停留时间
PV(page view) 是页面浏览量，UV(Unique visitor)用户访问量。PV 只要访问一次页面就算一次，UV 同一天内多次访问只算一次。

对于前端来说，只要每次进入页面上报一次 PV 就行，UV 的统计放在服务端来做，主要是分析上报的数据来统计得出 UV。

```js
import tracker from "../util/tracker";
export function pv() {
  tracker.send({
    kind: "business",
    type: "pv",
    startTime: performance.now(),
    pageURL: getPageURL(),
    referrer: document.referrer,
    uuid: getUUID(),
  });
  let startTime = Date.now();
  window.addEventListener(
    "beforeunload",
    () => {
      let stayTime = Date.now() - startTime;
      tracker.send({
        kind: "business",
        type: "stayTime",
        stayTime,
        pageURL: getPageURL(),
        uuid: getUUID(),
      });
    },
    false
  );
}
```