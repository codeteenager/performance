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