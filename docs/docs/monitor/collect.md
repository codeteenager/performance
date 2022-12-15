# 前端采集脚本

## 白屏
白屏就是页面上什么都没有

### 数据结构设计
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
### 实现
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

## 卡顿
响应用户交互的响应时间如果大于100ms,用户就会感觉卡顿
### 数据设计
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

### 实现
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

## PV、UV、用户停留时间
### 数据结构设计
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

### PV、UV、用户停留时间
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