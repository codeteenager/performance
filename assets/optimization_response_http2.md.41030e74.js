import{_ as e,c as a,o as l,a as n}from"./app.75d52317.js";const s="/performance/optimization/83.png",P=JSON.parse('{"title":"HTTP 2","description":"","frontmatter":{},"headers":[{"level":2,"title":"二进制协议","slug":"二进制协议","link":"#二进制协议","children":[]},{"level":2,"title":"多工","slug":"多工","link":"#多工","children":[]},{"level":2,"title":"数据流","slug":"数据流","link":"#数据流","children":[]},{"level":2,"title":"头信息压缩","slug":"头信息压缩","link":"#头信息压缩","children":[]},{"level":2,"title":"服务器推送","slug":"服务器推送","link":"#服务器推送","children":[]},{"level":2,"title":"在Nginx上启用HTTP/2","slug":"在nginx上启用http-2","link":"#在nginx上启用http-2","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"relativePath":"optimization/response/http2.md","lastUpdated":1672845424000}'),t={name:"optimization/response/http2.md"},p=n(`<h1 id="http-2" tabindex="-1">HTTP 2 <a class="header-anchor" href="#http-2" aria-hidden="true">#</a></h1><p>HTTP/2(超文本传输协议第2版，最初命名为HTTP2.0)，简称为h2(基于TLS/1.2或以上版本的加密连接) 或h2c(非加密连接)，是HTTP协议的第二个版本。</p><p>2009 年，谷歌公开了自行研发的 SPDY 协议，主要解决 HTTP/1.1 效率不高的问题。 这个协议在 Chrome 浏览器上证明可行以后，就被当作 HTTP/2 的基础，主要特性都在 HTTP/2 之中得到继承。</p><p>2015年，HTTP/2 发布。它不叫 HTTP/2.0，是因为标准委员会不打算再发布子版本了，下一个新版本将是 HTTP/3。</p><p>它的优点主要有：</p><ul><li>采用二进制格式传输数据</li><li>多路复用，允许通过一个HTTP/2连接发起多个请求</li><li>对Header头压缩(Header Compressior)，传输体积小</li><li>服务端推送(Server Push)，服务端能够更快的把资源推送给客户端</li></ul><p>开启HTTP/2站点的优势：</p><ul><li>可以降低服务器压力，通过对header头的压缩、二进制传输，这样服务器的压力会变小。</li><li>提升网站的访问速度，header头变小，页面传输速度有提升。</li><li>保护网站安全，HTTP/2开启是要开启HTTPS的，相对保障网站的安全。</li></ul><h2 id="二进制协议" tabindex="-1">二进制协议 <a class="header-anchor" href="#二进制协议" aria-hidden="true">#</a></h2><p>HTTP/1.1 版的头信息肯定是文本（ASCII 编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为&quot;帧&quot;（frame）：头信息帧和数据帧。</p><p>二进制协议的一个好处是，可以定义额外的帧。HTTP/2 定义了近十种帧，为将来的高级应用打好了基础。如果使用文本实现这种功能，解析数据将会变得非常麻烦，二进制解析则方便得多。</p><h2 id="多工" tabindex="-1">多工 <a class="header-anchor" href="#多工" aria-hidden="true">#</a></h2><p>HTTP/2 复用 TCP 连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了&quot;队头堵塞&quot;。</p><p>举例来说，在一个 TCP 连接里面，服务器同时收到了 A 请求和 B 请求，于是先回应 A 请求，结果发现处理过程非常耗时，于是就发送 A 请求已经处理好的部分， 接着回应 B 请求，完成后，再发送 A 请求剩下的部分。</p><p>这样双向的、实时的通信，就叫做多工（Multiplexing）。</p><p>这是一个对比 HTTP1 和 HTTP2 资源加载的在线示例：<a href="https://http2.akamai.com/demo" target="_blank" rel="noreferrer">https://http2.akamai.com/demo</a></p><h2 id="数据流" tabindex="-1">数据流 <a class="header-anchor" href="#数据流" aria-hidden="true">#</a></h2><p>因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应。</p><p>HTTP/2 将每个请求或回应的所有数据包，称为一个数据流（stream）。每个数据流都有一个独一无二的编号。数据包发送的时候，都必须标记数据流 ID，用来区分它属于哪个数据流。另外还规定，客户端发出的数据流，ID 一律为奇数，服务器发出的，ID 为偶数。</p><p>数据流发送到一半的时候，客户端和服务器都可以发送信号（RST_STREAM帧），取消这个数据流。1.1 版取消数据流的唯一方法，就是关闭 TCP 连接。这就是说，HTTP/2 可以取消某一次请求，同时保证 TCP 连接还打开着，可以被其他请求使用。</p><p>客户端还可以指定数据流的优先级。优先级越高，服务器就会越早回应。</p><h2 id="头信息压缩" tabindex="-1">头信息压缩 <a class="header-anchor" href="#头信息压缩" aria-hidden="true">#</a></h2><p>HTTP 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。</p><p>HTTP/2 对这一点做了优化，引入了头信息压缩机制（header compression）。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。</p><h2 id="服务器推送" tabindex="-1">服务器推送 <a class="header-anchor" href="#服务器推送" aria-hidden="true">#</a></h2><p>HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送（server push）。</p><p>常见场景是客户端请求一个网页，这个网页里面包含很多静态资源。正常情况下，客户端必须收到网页后，解析 HTML 源码，发现有静态资源，再发出静态资源请求。其实，服务器可以预期到客户端请求网页后，很可能会再请求静态资源，所以就主动把这些静态资源随着网页一起发给客户端了。</p><h2 id="在nginx上启用http-2" tabindex="-1">在Nginx上启用HTTP/2 <a class="header-anchor" href="#在nginx上启用http-2" aria-hidden="true">#</a></h2><ol><li>升级OpenSSL</li><li>重新编译Nginx</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx-xxx</span></span>
<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#FFCB6B;">/configure</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--with-http_ssl_module</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--with-http_v2_module</span></span>
<span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3"><li>验证HTTP/2，浏览器下查看有没有小绿锁</li><li>浏览器请求截图，查看protocol是否是h2 <img src="`+s+'" alt=""></li></ol><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h2><ul><li><a href="https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn" target="_blank" rel="noreferrer">https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn</a></li></ul>',33),r=[p];function i(o,h,c,d,T,u){return l(),a("div",null,r)}const _=e(t,[["render",i]]);export{P as __pageData,_ as default};
