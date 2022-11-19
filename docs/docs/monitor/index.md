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

## 错误采集
* JS错误
    + JS错误
    + Promise异常
* 资源异常
    + 监听error

### 数据结构设计

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



### 上传方式
业内主流用gif图片上传方式，图片速度快，且没有跨域问题。

## 接口异常采集

### 数据结构设计
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


