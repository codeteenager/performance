# 异常监控

## 错误采集
代码异常监控的目的是发现已经存在的代码隐患，根据报错信息对线上问题进行定位和修复。如果开发人员要发现线上错误，那么首先需要对线上发生的错误进行采集。

JavaScript提供了try catch函数用于捕获函数异常，被捕获的错误不会影响后续代码的执行，但是需要依赖开发人员手动对可能出现异常的代码块进行包裹。
```js
try{
    document.getElementById('main'.innterText) = 'test';
}catch(error){
    console.error(error);//TypeError:Cannot set properties of null (setting 'innerText')
}
```

try catch函数只能捕获当前执行的上下文中抛出的错误。如果被包裹的代码块脱离了当前执行的上下文，则try catch函数没有办法捕获错误。
```js
try{
    setTimeout(()=>{
        document.getElementById('main').innerText = 'test';
    },1000)
}catch(error){
    console.error('捕获成功');//不会被执行
}
```
在实际开发中，开发人员只会针对一些特殊的案例使用try catch函数。如果大量使用try catch函数，那么不仅会增加开发人员的负担，也会降低代码的可读性，因此需要一种对工程低侵入的错误采集方案。如果需要进行全局JavaScript异常监控，就需要用到window.onerror和window.addEventListener（'error'）。

window.onerror是一个全局变量，默认值为null，接受一个函数用于处理错误，可以通过自定义全局的error事件处理函数来自动收集错误信息。
```js
window.onerror = (message,source,lineno,colno,error)=>{
    console.log('报错信息：',message);
    console.log('错误文件地址：',source);
    console.log('错误文件行数：',lineno);
    console.log('错误文件列数：',colno);
    console.log('错武器Error对象的堆栈：',error);
    //返回true，阻止执行默认事件处理函数，控制台不会再默认打印错误信息
    return true;
}
function throwError(){
    throw new Error('错误');
}
throwError();
```
若该函数返回true，则阻止执行默认事件处理函数，控制台不会再默认打印错误信息。当JavaScript执行发生错误时，window会触发一个ErrorEvent接口的error事件。如果此时window.onerror不为null，就会执行window.onerror。

window.onerror的缺陷在于它没有办法捕获资源加载的错误，以img标签为例。
```html
<img src="./404.png" onerror="console.log('错误')" />
```
404.png是一个不存在的资源，当浏览器加载时会报错，加载资源的元素标签会触发一个Event接口的error事件，该事件不会在window上“冒泡”，所以此时window.onerror无法捕获到该事件，会默认执行img标签上的onerror函数。

window.addEventListener（'error'）具备window.onerror的多数功能，但它不能通过返回true的形式来阻止默认事件处理函数的执行，可以通过调用e.preventDefault()方法来阻止默认行为。在错误捕获的时机上，它比onerror更早被触发。
```js
window.addEventListener('error',(e)=>{
    const { message, filename,lineno, colno,error} = e;
    console.log('报错信息：',message);
    console.log('错误文件地址：',filename);
    console.log('错误文件行数：',lineno);
    console.log('错误文件列数：',colno);
    console.log('错武器Error对象的堆栈：',error);
});
```

虽然资源加载的事件不会在window上“冒泡”，但是开发人员可以在事件捕获阶段采集错误，将addEventListener的第三个参数设置为true，即可在事件捕获阶段采集到错误，从而实现对资源加载错误的监听。
```html
<img src="./404.png" />
<script>
    window.addEventListener('error',(e)=>{
        const { target } = e;
        console.log('资源加载失败标签：',target.nodeName);
        console.log('资源地址：',target.src);
    },true);
</script>
```
开发人员在使用window.addEventListener（'error'）采集错误时，需要区分JavaScript错误和资源加载错误，可以利用lineno和colno字段实现。当资源加载失败时，回调参数中的两个字段的值为undefined。同时，也可以利用instanceof来判断，JavaScript错误抛出的事件类型为ErrorEvent，资源加载失败抛出的事件类型为Event，ErrorEvent为Event的子类型。优化后的代码如下。
```html
<img src="./404.png" />
<script>
    window.addEventListener('error',(e)=>{
        if(e instanceof ErrorEvent){
            const { message, filename,lineno, colno,error} = e;
            console.log('报错信息：',message);
            console.log('错误文件地址：',filename);
            console.log('错误文件行数：',lineno);
            console.log('错误文件列数：',colno);
            console.log('错武器Error对象的堆栈：',error);
        }else{
            const { target } = e;
            console.log('资源加载失败标签：',target.nodeName);
            console.log('资源地址：',target.src);
        }
    },true);
</script>
```
JavaScript代码中还存在异步错误，这种错误没办法被上述三种方法捕获，需要使用addEventListener监听unhandledrejection。
```js
new Promise((resolve,reject)=>{
    referenceError
});
window.addEventListener('unhandledrejection',(e)=>{
    console.log('错误信息：',e.reason.message);
    console.log('错误堆栈：',e.reason.stack);
},true);
```
通过unhandledrejection事件采集到的错误信息不包括抛出错误的文件地址、代码行列，这些信息全部存储在e.reason.stack中。
```js
 ReferenceError: referenceError is not defined
    at parseStack (file:///C:/Users/18307/Desktop/index.html:15:13)
    at new Promise (<anonymous>)
    at file:///C:/Users/18307/Desktop/index.html:14:9
```
以上述错误堆栈为例，开发人员可以通过正则表达式将结果提取出来，从而得到相应的信息，下面是一个简单的示例。
```js
const parseStack = (stack)=>{
    const results = stack.split('\n');
    const topFile = results[1].trim().split(' ')[2];
    const regResults = topFile.match(/\((.*)?\:(\d+)\:(\d+)\)$/);
    const [,filename,lineno,colno] = regResults;
    return {filename,lineno:+lineno,colno:+colno};
}
window.addEventListener('unhandledrejection',(e)=>{
    console.log('报错信息：'，e.reason.message);
    const {filename,lineno,colno} = parseStack(e.reason.stack);
    console.log('错误文件地址：',filename);
    console.log('错误文件行数：',lineno);
    console.log('错误文件列数：',colno);
    console.log('错误堆栈：',e.reason.stack);

});
```
部分代码中的JavaScript异常会使用try catch函数进行处理，然后通过console.error打印。由于错误被catch捕获了，所以不会被全局监听的方法捕获。针对这种情况，开发人员可以通过劫持console.error的方式来采集打印的错误信息。
```js
const _consoleError = window.console.error;
window.console.error = (...args)=>{
    //自定义内容部分
    _consoleError.apply(window.console,args);//执行原方法，保证劫持前后运行逻辑一致
}
```

通过以上措施，开发人员基本能够采集到JavaScript中的错误。在实际开发中，静态资源文件常常被托管到CDN服务器上，而在一般情况下，CDN域名和网站域名是不一致的，出于安全性考虑，浏览器只允许同域的脚本捕获具体错误信息，会对抛出的错误进行脱敏处理，以防止敏感信息泄露，此时捕获错误的JavaScript代码就无法有效获取错误信息。解决以上问题的方法是为跨域脚本添加crossorigin="anonymous"配置，同时CDN服务器需要为HTTP响应报头Access-Control-Allow-Origin配置合理的值，此时就能正常地捕获JavaScript错误。

## 错误处理
错误可以分为3类：
* JS错误
* Promise异常
* 资源异常

为了方便后续错误的监控、排查定位等工作，开发人员应该为每种错误类型都定义一个固定的数据结构。同步错误和异步错误都属于JavaScript逻辑错误，它们关注的信息在于错误的文件地址和错误堆栈，所以应该具有相同的数据结构。资源加载错误和JavaScript逻辑无关，常常是文件地址错误或者网络状况不佳等原因导致的，所以只需要关注资源的加载标签和地址。

### 数据结构设计

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
### 采集脚本
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
## 错误排查
开发人员在完成监控的错误采集和处理工作，并对收集到的JavaScript错误信息进行分析后，发现很难进行问题定位。
```js
Uncaught TypeError: Cannot read properties of undefined (reading '2')
    at Module../b.js (<anonymous>:11:132878)
    at e (<anonymous:1:110>)
    at <anonymous>:1:902
    at <anonymous>:1:918
```
错误信息显示出错的代码位于第11行的第132878列，不仅代码列数十分夸张，变量的名称也可能是混淆的，这是因为生产环境中的代码通常是经过压缩的。

基于对减少请求次数、缩减代码的体积、防止代码泄露及兼容性处理等因素的考量，生产环境的JavaScript文件经过了文件合并、代码压缩及polyfill操作。代码在打包时会删除无意义的换行符和空格，并对变量名进行混淆替换，仅通过上述报错信息，开发人员很难排查错误逻辑。以上问题可以通过Source Map解决。

Source Map是一个源代码映射工具，它可以将压缩后的代码映射回构建前的状态。其原理是通过保存代码处理前后在行、列上的对应关系，形成类似“映射”的结构，生成对应的Source Map文件。如果处理后的代码在运行时抛出异常，就可以借助它快速查找到对应的原始代码。Source Map文件结构示例如下。
```js
{
   version : 3,
   file :  bundle.js ,
   mappings :  AACAA,QAAQC,IADM ,
   sources : [
     webpack://studysourcemap/./test.js 
  ],
   sourcesContent : [
     const value = 123;\nconsole.log(value); 
  ],
   names : [
     console ,
     log 
  ],
   sourceRoot : ""
}
```
主要包括7个字段，每个字段的作用如下。
* version：用于解析代码映射的Source Map版本。
* sources：代码合并前的所有文件的路径。
* names：代码中的所有变量和方法的名称。
* mappings：记录代码在压缩处理前后的映射位置。
* file：压缩处理后的代码生成的文件名。
* sourcesContent：压缩处理前的源代码。
* sourceRoot：压缩处理前的源文件所在的根路径目录。

因为Source Map文件可以逆向生成处理前的源代码，所以Source Map文件不允许被暴露在生产环境中。为了便于排查问题，开发人员一般会将Source Map文件上传到内网服务器中，只有内部员工才能访问，这样就不会导致代码泄露。