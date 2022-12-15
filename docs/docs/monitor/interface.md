# 接口监控
接口请求的性能和稳定性是前端页面中至关重要的一个环节。用户的所有操作都是在页面上进行的，而页面上展示和提交的数据都依赖接口。

通过建立前端接口监控系统，可以监控并记录所有接口请求的返回状态和返回结果。当接口报错时，能够及时定位线上问题产生的原因。开发人员还能通过分析接口的平均耗时、成功率等信息对应用进行优化，提升系统的质量。

## 请求采集
### 请求信息
开发人员如果要进行接口监控，就必须先明确需要采集的信息。可以直接参考HTTP请求的发起方式，对接口请求的路径、方法、入参及响应结果等信息进行采集。为了方便追溯请求的发起页面地址，还可以使用window.location API来获取页面的URL信息。可以定义出如下数据结构来记录每个请求的信息。

```js
type TypeMap<T> = {
    [i:string]:T;
}
type HttpRecord = {
    method: string; //请求方法
    url: string; //请求路径
    query?:TypeMap<any>; //请求参数
    body?:TypeMap<any>; //请求主体
    status: number: //HTTP状态码
    caceled: boolean; //请求是否被取消
    requestHeaders: TypeMap<string>; //请求报头
    responseHeaders: TypeMap<string>; //响应报头
    requestStamp:number; //请求发起时间
    responseStamp: number; //请求响应时间
    costTime:number; //请求耗费时间
    responseData:any; //请求响应结果
    pageUrl: string; //发起请求时的页面地址
}
```
* method代表请求方法，常见的有GET、POST、PUT、DELETE 4种。
* url代表请求路径，例如，/api/v1/person/list代表用于查找人物列表的接口。
* query代表请求路径中的请求参数，当url中不存在请求参数时，query为undefined；当url中存在请求参数时，可以从url中提取出对应的query对象。例如，/api/v1/person/info？career=worker&gender=male，代表查询男性并且职业为工人的人物类别，从url中提取出来的query对象如下。
```js
{
    "career": "worker",
    "gender": "male"
}
```
* body代表请求体，它的数据格式和HTTP请求头报文中的Content-Type有关。当Content-Type的值为application/json时，代表请求体中的数据是JSON格式的，它是开发中使用最多的数据类型。
* status代表请求响应的HTTP状态码，用于标记请求的状态。
* canceled代表请求是否被取消，用于判断请求被取消的异常情况。
* requestHeaders代表请求报头的信息，可以排查接口请求的自定义报头等信息。
* responseHeaders代表响应报头的信息，可以排查接口响应的信息。
* requestStamp代表请求发起的时间戳，可以统计同一时间段内请求发起的数量，用于分析高频请求、重复请求等。
* responseStamp代表请求响应的时间戳，可以和requestStamp结合使用，计算出costTime。
* costTime代表请求从发起到结束耗费的时间，单位是毫秒，可以统计请求平均耗时、慢请求等信息。
* responseData代表请求响应的结果，可以判断该请求是否属于正常的业务逻辑返回，从而监控业务异常。
* pageUrl代表请求发起时的页面地址，可以判断当前请求是从哪个页面发起的，帮助开发人员快速定位异常接口。

按照以上定义的数据结构，开发人员可以有效地采集接口中的数据，并基于采集到的数据制定监控措施。

## XMLHttpRequest拦截器
现代浏览器都提供了XMLHttpRequest API，用于与服务器端进行数据交互。通过XMLHttpRequest，浏览器可以在不刷新页面的情况下，对页面的数据进行更新和提交。只需要对XMLHttpRequest方法进行复写，就能够有效捕获所有接口的请求信息。

首先定义一个类，取名为XhrInterceptor，用于实现复写XMLHttpRequest的逻辑，其构造函数会接受一个apiCallback函数作为回调参数，用于回调捕获到的请求信息。

在复写XMLHttpRequest函数之前，开发人员需要先把原来的XMLHttpRequest保存在类上，例如，命名为XHR。同时，用新实现的函数覆盖window上的XMLHttpRequest函数。当页面调用XMLHttpRequest发起请求时，所有的信息都能被XhrInterceptor捕获。

在拦截XMLHttpRequest后，开发人员需要通过overwrite对XMLHttpRequest实例_xhr上的方法的属性进行复写，以便收集相关信息。

当实例_xhr上的键值类型为函数时，调用overwriteMethod方法对函数进行复写。当实例_xhr上的键值类型为非函数时，调用overwriteAttributes方法对属性进行复写。

当开发人员完成对_xhr实例上的函数和属性的复写后，还需要实现请求信息中的采集函数setRecord。setRecord中会使用query-string获取url中的参数，将url和query隔离开。HTTP报文中的响应结果response只解析了响应体为字符串或者JSON格式的情况，其余情况需要开发人员根据项目情况进行一定程度的改造。HTTP报文中的请求报头和响应报头都是以字符串的形式描述的，setRecord将其转换成了JSON格式，以requestHeaders和responseHeaders字段存储。

在所有功能实现完毕后，还需要提供一个unset函数用于取消对XMLHttpRequest的拦截。此时，只需要将之前备份的XMLHttpRequest重新覆盖window上的XMLHttpRequest。
```js
import queryString from 'query-string';
class XhrInterceptor{
    options;
    XHR;
    constructor(p){
        this.options = p;
        this.init();
    }
    //初始化，重写XMLHttpRequest对象
    init(){
        this.XHR = window.XMLHttpRequest;
        const _this = this;
        window.XMLHttpRequest = function(){
            this._xhr=new _this.XHR();
            //用于记录请求的整个链路路径
            this._xhr._record = {
                canceled: false
            };
            this._xhr.__ = false;
            //对XMLHttpRequest实例上的属性进行复写
            _this.overwrite(this);
        }
    }
    overwrite(proxyXHR){
        for(let key in proxyXHR._xhr){
            if(typeof proxyXHR._xhr[key]=== 'function'){
                this.overwriteMethod(key,proxyXHR);
                continue;
            }
            this.overwriteAttributes(key,proxyXHR);
        }
    }

    //重写方法
    overwriteMethod(key,proxyXHR){
        proxyXHR[key] = (...args)=>{
            //abort需要优先上报，因为内部会触发xhrState
            if(key === 'abort'){
                this.setRecord(proxyXHR,key,args);
            }
            //执行方法本体
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr,args);
            this.setRecord(proxyXHR,key,args);
            return res;
        }
    }
    //对请求进行记录
    setRecord(proxyXHR,key,args){
        let record = proxyXHR._xhr.__record;
        const hasCallback = proxyXHR._xhr.__hasCallback;
        if(hasCallback){
            return;
        }
        if(key === 'open'){
            const result = queryString.parseUrl(args[1]);
            Object.assign(record,{
                method:args[0],
                url:result.url,
                params:result.query,
                pageUrl:window.location.href
            });
        }else if(key === 'send'){
            let body = args[0];
            try{
                body=JSON.parse(body);
            }catch{}
            Object.assign(record,{
                body,
                requestStamp: Date.now()
            });
        }else if(key === 'abort'){
            Object.assign(record,{
                canceled:true
            });
            this.options.apiCallback(record);
        }else if(key === 'onreadystatechange'){
            //记录返回参数
            //readyState === 4 响应已完成
            if(proxyXHR.readyState === 4){
                const responseHeadersString = proxyXHR.getAllResponseHeaders() || '';
                const responseHeaders = {};
                responseHeadersString.split('\r\n').filter(Boolean).forEach((_)=>{
                    const [k,v] = _.split(': ');
                    responseHeaders[k] = v;
                });
                let responseData;
                try{
                    //在http code 204时会暴多
                    //只解析了响应体为字符串或者JSON格式的情况，其余情况需根据项目情况进行适配
                    responseData = proxyXHR.response || proxyXHR.responseText || '{}';
                }catch(error){
                    responseData = '{}';
                }
                try{
                    if(typeof responseData === 'string'){
                        responseData = JSON.parse(responseData);
                    }
                }catch(){}
                const responseStamp = Date.now();
                Object.assign(record,{
                    responseData,
                    responseHeaders,
                    responseStamp,
                    costTime: responseStamp - record.requestStamp,
                    status:proxyXHR.status
                });
                this.options.apiCallback(record);
            }
        }else if(key === 'setRequestHeader'){
            if(!record.requestHeaders){
                record.requestHeaders={};
            }
            record.requestHeaders[args[0]]=args[1];
        }
    }
    //重写属性
    overwriteAttributes(key,proxyXHR){
        Object.defineProperty(proxyXHR,key,this.setPropertyDescriptor(key,proxyXHR));
    }
    //设置属性的属性描述
    setPropertyDescriptor(key,proxyXHR){
        const obj = Object.create(null);
        const _this = this;
        obj.set = function(val){
            if(!key.startsWith('on')){
                proxyXHR['__'+key]=val;
                this._xhr[key] =val;
                return;
            }
            const fn = function(...args){
                _this.setRecord(proxyXHR,key,args);
                val.apply(proxyXHR,args);
            }
            this._xhr[key] = fn;
        };
        obj.get=function(){
            return proxyXHR['__'+key] || this._xhr[key];
        };
        return obj;
    }
    //复原XMLHttpRequest
    unset(){
        window.XMLHttpRequest = this.XHR;
    }
}

```
将XhrInterceptor实例化，并传入自定义的apiCallback函数即可完成请求信息的采集。
```js
const instance = new XhrInterceptor({
    apiCallback: console.log
});
```
XhrInterceptor虽然可以实现对XMLHttpRequest请求的信息采集，但是它无法对Fetch请求进行采集
## Fetch拦截器
相比XMLHttpRequest方法，Fetch方法在使用性和阅读性上更加友好，它是基于XMLHttpRequest实现的。既然Fetch是基于XMLHttpRequest实现的，那么为什么XhrInterceptor不能采集Fetch请求呢？

因为Fetch的初始化是由浏览器内核进行的，它比XhrInterceptor更早执行，所以提前访问了XMLHttpRequest。即Fetch使用的是浏览器原生的XMLHttpRequest，并不是XhrInterceptor复写了以后的XMLHttpRequest。如果要采集Fetch请求，那么有两种方法。一种是以Fetch为对象实现FetchInterceptor，另一种是使用fetch polyfill函数对Fetch函数重新初始化。

FetchInterceptor方案的实现成本与XhrInterceptor相当，并且会导致项目中存在两个拦截器，对以后的扩展维护极不友好，因此并不推荐。

fetch polyfill的成本接近于零，GitHub官方提供了该方案，访问相关网站即可查看。同时，fetch polyfill能够确保项目中仅有一套拦截器方案，维护成本更低。

综合来说，建议使用fetch polyfill完成对Fetch请求的采集。在使用该方案时，需要注意对[github/fetch](https://github.com/github/fetch)的代码进行修改，将尾部判断是否进行polyfill的条件移除。
```js
//if(!global.fetch){
    global.fetch = fetch
    global.Headers = Headers
    global.Request = Request
    global.Response = Response
//}
```
让fetch polyfill的代码强制执行，从而确保Fetch中使用的是XhrInterceptor复写后的XMLHttpRequest。
```js
const instance = new XhrInterceptor({
    apiCallback:console.log
});
//强制覆盖Fetch
fetchPolyfill();
fetch('/foo').then(function(response){
    return response.text();
}).then(function(body){
    document.body.innerHTML = body;
})
```
## 请求过滤
通过XhrInterceptor复写XMLHttpRequest方法，可以采集到页面中发起的所有请求。实际上，并不是所有被采集到的请求都需要被分析。因此，在对请求进行分析前应该先过滤无意义的需求，例如，数据埋点上报、心跳检测等。请求过滤的方式非常简单。在apiCallback回调函数中添加判断条件，将不满足条件的请求直接剔除。
```js
type BlackApiItem = {
    method: RegExp;
    url: RegExp;
}
const blackApiList: BlackApiItem[] = [];
const shouldFilter = (method:string,url:string)=>{
    return blackApiList.find((_)=>{
        method.match(_.method)&&url.match(_.url)
    });
}
const instance = new XhrInterceptor({
    apiCallback:(r)=>{
        if(shouldFilter(r.method,r.url)){
            return;
        }
    }
});
```
开发人员只需要使用blackApiList数组维护一套与请求相关的method、url的对象数组，使用shouldFilter函数对apiCallback回调函数中的请求进行过滤，丢弃不需要分析的请求。如果满足条件，则终止函数的后续处理逻辑。
