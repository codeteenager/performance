import{_ as s,c as n,o as a,a as e}from"./app.29eff67c.js";const l="/performance/optimization/23.png",p="/performance/optimization/24.png",o="/performance/optimization/25.png",t="/performance/optimization/26.png",m=JSON.parse('{"title":"HTTP\u957F\u8FDE\u63A5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u77ED\u8FDE\u63A5","slug":"\u77ED\u8FDE\u63A5","link":"#\u77ED\u8FDE\u63A5","children":[]},{"level":2,"title":"\u957F\u8FDE\u63A5","slug":"\u957F\u8FDE\u63A5","link":"#\u957F\u8FDE\u63A5","children":[]},{"level":2,"title":"\u7BA1\u9053\u673A\u5236","slug":"\u7BA1\u9053\u673A\u5236","link":"#\u7BA1\u9053\u673A\u5236","children":[]},{"level":2,"title":"Content-Length \u5B57\u6BB5","slug":"content-length-\u5B57\u6BB5","link":"#content-length-\u5B57\u6BB5","children":[]},{"level":2,"title":"\u5206\u5757\u4F20\u8F93\u7F16\u7801","slug":"\u5206\u5757\u4F20\u8F93\u7F16\u7801","link":"#\u5206\u5757\u4F20\u8F93\u7F16\u7801","children":[]},{"level":2,"title":"\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9","slug":"\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9","link":"#\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9","children":[]}],"relativePath":"optimization/response/http.md","lastUpdated":1670172988000}'),c={name:"optimization/response/http.md"},r=e('<h1 id="http\u957F\u8FDE\u63A5" tabindex="-1">HTTP\u957F\u8FDE\u63A5 <a class="header-anchor" href="#http\u957F\u8FDE\u63A5" aria-hidden="true">#</a></h1><h2 id="\u77ED\u8FDE\u63A5" tabindex="-1">\u77ED\u8FDE\u63A5 <a class="header-anchor" href="#\u77ED\u8FDE\u63A5" aria-hidden="true">#</a></h2><p>HTTP \u534F\u8BAE\u7684\u521D\u59CB\u7248\u672C\u4E2D\uFF0C\u6BCF\u8FDB\u884C\u4E00\u6B21 HTTP \u901A\u4FE1\u5C31\u8981\u65AD\u5F00\u4E00\u6B21 TCP \u8FDE\u63A5\u3002 <img src="'+l+'" alt=""> \u4EE5\u65E9\u671F\u7684\u901A\u4FE1\u60C5\u51B5\u6765\u8BF4\uFF0C\u56E0\u4E3A\u90FD\u662F\u4E9B\u5BB9\u91CF\u5F88\u5C0F\u7684\u6587\u672C\u4F20\u8F93\uFF0C\u6240\u4EE5\u5373\u4F7F\u8FD9\u6837\u4E5F\u6CA1\u6709\u591A\u5927\u95EE\u9898\u3002\u4F46\u662F\u968F\u7740 HTTP \u7684\u5927\u91CF\u666E\u53CA\uFF0C\u6587\u6863\u4E2D\u5305\u542B\u5927\u91CF\u5BCC\u6587\u672C\uFF08\u56FE\u7247\u3001\u89C6\u9891\u7B49\u8D44\u6E90\uFF09\u7684\u60C5\u51B5\u591A\u4E86\u8D77\u6765\u3002</p><p>\u6BD4\u5982\uFF0C\u4F7F\u7528\u6D4F\u89C8\u5668\u6D4F\u89C8\u4E00\u4E2A\u5305\u542B\u591A\u5F20\u56FE\u7247\u7684 HTMl \u9875\u9762\u65F6\uFF0C\u5728\u53D1\u9001\u8BF7\u6C42\u8BBF\u95EE HTMl \u9875\u9762\u8D44\u6E90\u7684\u540C\u65F6\uFF0C\u4E5F\u4F1A\u8BF7\u6C42\u8BE5 HTML \u9875\u9762\u5305\u542B\u7684\u5176\u5B83\u8D44\u6E90\u3002\u56E0\u6B64\uFF0C\u6BCF\u6B21\u7684\u8BF7\u6C42\u90FD\u4F1A\u9020\u6210\u65E0\u8C13\u7684 TCP \u8FDE\u63A5\u5EFA\u7ACB\u548C\u65AD\u5F00\uFF0C\u589E\u52A0\u901A\u4FE1\u5F55\u7684\u5F00\u9500\u3002 <img src="'+p+`" alt=""> \u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6709\u4E9B\u6D4F\u89C8\u5668\u5728\u8BF7\u6C42\u65F6\uFF0C\u7528\u4E86\u4E00\u4E2A\u975E\u6807\u51C6\u7684 Connection \u5B57\u6BB5\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">Connection</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> keep</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">alive</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u8FD9\u4E2A\u5B57\u6BB5\u8981\u6C42\u670D\u52A1\u5668\u4E0D\u8981\u5173\u95ED TCP \u8FDE\u63A5\uFF0C\u4EE5\u4FBF\u5176\u4ED6\u8BF7\u6C42\u590D\u7528\u3002\u670D\u52A1\u5668\u540C\u6837\u56DE\u5E94\u8FD9\u4E2A\u5B57\u6BB5\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">Connection</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> keep</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">alive</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u4E00\u4E2A\u53EF\u4EE5\u590D\u7528\u7684 TCP \u8FDE\u63A5\u5C31\u5EFA\u7ACB\u4E86\uFF0C\u76F4\u5230\u5BA2\u6237\u7AEF\u6216\u670D\u52A1\u5668\u4E3B\u52A8\u5173\u95ED\u8FDE\u63A5\u3002\u4F46\u662F\uFF0C\u8FD9\u4E0D\u662F\u6807\u51C6\u5B57\u6BB5\uFF0C\u4E0D\u540C\u5B9E\u73B0\u7684\u884C\u4E3A\u53EF\u80FD\u4E0D\u4E00\u81F4\uFF0C\u56E0\u6B64\u4E0D\u662F\u6839\u672C\u7684\u89E3\u51B3\u529E\u6CD5\u3002</p><h2 id="\u957F\u8FDE\u63A5" tabindex="-1">\u957F\u8FDE\u63A5 <a class="header-anchor" href="#\u957F\u8FDE\u63A5" aria-hidden="true">#</a></h2><p>1997 \u5E74 1 \u6708\uFF0CHTTP/1.1 \u7248\u672C\u53D1\u5E03\uFF0C\u53EA\u6BD4 1.0 \u7248\u672C\u665A\u4E86\u534A\u5E74\u3002\u5B83\u8FDB\u4E00\u6B65\u5B8C\u5584\u4E86 HTTP \u534F\u8BAE\uFF0C\u76F4\u5230\u73B0\u5728\u8FD8\u662F\u6700\u6D41\u884C\u7684\u7248\u672C\u3002</p><p>HTTP 1.1 \u7248\u7684\u6700\u5927\u53D8\u5316\uFF0C\u5C31\u662F\u5F15\u5165\u4E86\u6301\u4E45\u8FDE\u63A5\uFF08HTTP Persistent Connections\uFF09\uFF0C\u5373 TCP \u8FDE\u63A5\u9ED8\u8BA4\u4E0D\u5173\u95ED\uFF0C\u53EF\u4EE5\u88AB\u591A\u4E2A\u8BF7\u6C42\u590D\u7528\uFF0C\u4E0D\u7528\u58F0\u660E Connection: keep-alive\u3002 <img src="`+o+`" alt=""></p><p>\u6301\u4E45\u8FDE\u63A5\u7684\u597D\u5904\u5728\u4E8E\u51CF\u5C11\u4E86 TCP \u8FDE\u63A5\u7684\u91CD\u590D\u5EFA\u7ACB\u548C\u65AD\u5F00\u6240\u9020\u6210\u7684\u989D\u5916\u5F00\u9500\uFF0C\u51CF\u8F7B\u4E86\u670D\u52A1\u5668\u7AEF\u7684\u8D1F\u8F7D\u3002\u53E6\u5916\uFF0C\u51CF\u5C11\u5F00\u9500\u7684\u90A3\u90E8\u5206\u65F6\u95F4\uFF0C\u4F7F HTTP \u8BF7\u6C42\u548C\u54CD\u5E94\u80FD\u591F\u66F4\u65E9\u7684\u7ED3\u675F\uFF0C\u8FD9\u6837 Web \u9875\u9762\u7684\u663E\u793A\u901F\u5EA6\u4E5F\u5C31\u76F8\u5E94\u63D0\u9AD8\u4E86\u3002</p><p>\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u53D1\u73B0\u5BF9\u65B9\u4E00\u6BB5\u65F6\u95F4\u6CA1\u6709\u6D3B\u52A8\uFF0C\u5C31\u53EF\u4EE5\u4E3B\u52A8\u5173\u95ED\u8FDE\u63A5\u3002\u4E0D\u8FC7\uFF0C\u89C4\u8303\u7684\u505A\u6CD5\u662F\uFF0C\u5BA2\u6237\u7AEF\u5728\u6700\u540E\u4E00\u4E2A\u8BF7\u6C42\u65F6\uFF0C\u53D1\u9001 Connection: close\uFF0C\u660E\u786E\u8981\u6C42\u670D\u52A1\u5668\u5173\u95ED TCP \u8FDE\u63A5\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">Connection</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> close</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u76EE\u524D\uFF0C\u5BF9\u4E8E\u540C\u4E00\u4E2A\u57DF\u540D\uFF0C\u5927\u591A\u6570\u6D4F\u89C8\u5668\u5141\u8BB8\u540C\u65F6\u5EFA\u7ACB6\u4E2A\u6301\u4E45\u8FDE\u63A5\u3002</p><h2 id="\u7BA1\u9053\u673A\u5236" tabindex="-1">\u7BA1\u9053\u673A\u5236 <a class="header-anchor" href="#\u7BA1\u9053\u673A\u5236" aria-hidden="true">#</a></h2><p>HTTP 1.1 \u7248\u8FD8\u5F15\u5165\u4E86\u7BA1\u9053\u673A\u5236\uFF08pipelining\uFF09\uFF0C\u5373\u5728\u540C\u4E00\u4E2A TCP \u8FDE\u63A5\u91CC\u9762\uFF0C\u5BA2\u6237\u7AEF\u53EF\u4EE5\u540C\u65F6\u53D1\u9001\u591A\u4E2A\u8BF7\u6C42\u3002\u8FD9\u6837\u5C31\u8FDB\u4E00\u6B65\u6539\u8FDB\u4E86 HTTP \u534F\u8BAE\u7684\u6548\u7387\u3002</p><p>\u4ECE\u524D\u53D1\u9001\u8BF7\u6C42\u540E\u9700\u7B49\u5F85\u5E76\u63A5\u6536\u54CD\u5E94\uFF0C\u624D\u80FD\u53D1\u9001\u4E0B\u4E00\u4E2A\u8BF7\u6C42\u3002\u7BA1\u7EBF\u5316\u6280\u672F\u51FA\u73B0\u540E\uFF0C\u4E0D\u7528\u7B49\u5F85\u54CD\u5E94\u5373\u53EF\u76F4\u63A5\u53D1\u9001\u4E0B\u4E00\u4E2A\u8BF7\u6C42\u3002\u8FD9\u6837\u5C31\u80FD\u591F\u505A\u5230\u540C\u65F6\u5E76\u884C\u53D1\u9001\u591A\u4E2A\u8BF7\u6C42\uFF0C\u800C\u4E0D\u9700\u8981\u4E00\u4E2A\u63A5\u4E00\u4E2A\u7684\u7B49\u5F85\u54CD\u5E94\u4E86\uFF0C\u4E0E\u6328\u4E2A\u8FDE\u63A5\u76F8\u6BD4\uFF0C\u7528\u6301\u4E45\u8FDE\u63A5\u53EF\u4EE5\u8BA9\u8BF7\u6C42\u66F4\u5FEB\u7ED3\u675F\u3002\u800C\u7BA1\u7EBF\u5316\u6280\u672F\u5219\u6BD4\u6301\u4E45\u8FDE\u63A5\u8FD8\u8981\u5FEB\u3002\u8BF7\u6C42\u6570\u8D8A\u591A\uFF0C\u65F6\u95F4\u5DEE\u5C31\u8D8A\u660E\u663E\u3002 <img src="`+t+`" alt=""> \u4E3E\u4F8B\u6765\u8BF4\uFF0C\u5BA2\u6237\u7AEF\u9700\u8981\u8BF7\u6C42\u4E24\u4E2A\u8D44\u6E90\u3002\u4EE5\u524D\u7684\u505A\u6CD5\u662F\uFF0C\u5728\u540C\u4E00\u4E2A TCP \u8FDE\u63A5\u91CC\u9762\uFF0C\u5148\u53D1\u9001 A \u8BF7\u6C42\uFF0C\u7136\u540E\u7B49\u5F85\u670D\u52A1\u5668\u505A\u51FA\u56DE\u5E94\uFF0C\u6536\u5230\u540E\u518D\u53D1\u51FA B \u8BF7\u6C42\u3002\u7BA1\u9053\u673A\u5236\u5219\u662F\u5141\u8BB8\u6D4F\u89C8\u5668\u540C\u65F6\u53D1\u51FA A \u8BF7\u6C42\u548C B \u8BF7\u6C42\uFF0C\u4F46\u662F\u670D\u52A1\u5668\u8FD8\u662F\u6309\u7167\u987A\u5E8F\uFF0C\u5148\u56DE\u5E94A\u8BF7\u6C42\uFF0C\u5B8C\u6210\u540E\u518D\u56DE\u5E94 B \u8BF7\u6C42\u3002</p><h2 id="content-length-\u5B57\u6BB5" tabindex="-1">Content-Length \u5B57\u6BB5 <a class="header-anchor" href="#content-length-\u5B57\u6BB5" aria-hidden="true">#</a></h2><p>\u4E00\u4E2A TCP \u8FDE\u63A5\u73B0\u5728\u53EF\u4EE5\u4F20\u9001\u591A\u4E2A\u56DE\u5E94\uFF0C\u52BF\u5FC5\u5C31\u8981\u6709\u4E00\u79CD\u673A\u5236\uFF0C\u533A\u5206\u6570\u636E\u5305\u662F\u5C5E\u4E8E\u54EA\u4E00\u4E2A\u56DE\u5E94\u7684\u3002\u8FD9\u5C31\u662F Content-length \u5B57\u6BB5\u7684\u4F5C\u7528\uFF0C\u58F0\u660E\u672C\u6B21\u56DE\u5E94\u7684\u6570\u636E\u957F\u5EA6\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Length</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3495</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u4E0A\u9762\u4EE3\u7801\u544A\u8BC9\u6D4F\u89C8\u5668\uFF0C\u672C\u6B21\u56DE\u5E94\u7684\u957F\u5EA6\u662F3495\u4E2A\u5B57\u8282\uFF0C\u540E\u9762\u7684\u5B57\u8282\u5C31\u5C5E\u4E8E\u4E0B\u4E00\u4E2A\u56DE\u5E94\u4E86\u3002</p><p>\u57281.0\u7248\u4E2D\uFF0CContent-Length \u5B57\u6BB5\u4E0D\u662F\u5FC5\u9700\u7684\uFF0C\u56E0\u4E3A\u6D4F\u89C8\u5668\u53D1\u73B0\u670D\u52A1\u5668\u5173\u95ED\u4E86 TCP \u8FDE\u63A5\uFF0C\u5C31\u8868\u660E\u6536\u5230\u7684\u6570\u636E\u5305\u5DF2\u7ECF\u5168\u4E86\u3002</p><h2 id="\u5206\u5757\u4F20\u8F93\u7F16\u7801" tabindex="-1">\u5206\u5757\u4F20\u8F93\u7F16\u7801 <a class="header-anchor" href="#\u5206\u5757\u4F20\u8F93\u7F16\u7801" aria-hidden="true">#</a></h2><p>\u4F7F\u7528 Content-Length \u5B57\u6BB5\u7684\u524D\u63D0\u6761\u4EF6\u662F\uFF0C\u670D\u52A1\u5668\u53D1\u9001\u56DE\u5E94\u4E4B\u524D\uFF0C\u5FC5\u987B\u77E5\u9053\u56DE\u5E94\u7684\u6570\u636E\u957F\u5EA6\u3002</p><p>\u5BF9\u4E8E\u4E00\u4E9B\u5F88\u8017\u65F6\u7684\u52A8\u6001\u64CD\u4F5C\u6765\u8BF4\uFF0C\u8FD9\u610F\u5473\u7740\uFF0C\u670D\u52A1\u5668\u8981\u7B49\u5230\u6240\u6709\u64CD\u4F5C\u5B8C\u6210\uFF0C\u624D\u80FD\u53D1\u9001\u6570\u636E\uFF0C\u663E\u7136\u8FD9\u6837\u7684\u6548\u7387\u4E0D\u9AD8\u3002\u66F4\u597D\u7684\u5904\u7406\u65B9\u6CD5\u662F\uFF0C\u4EA7\u751F\u4E00\u5757\u6570\u636E\uFF0C\u5C31\u53D1\u9001\u4E00\u5757\uFF0C\u91C7\u7528\u201C\u6D41\u6A21\u5F0F\u201D\uFF08stream\uFF09\u53D6\u4EE3\u201C\u7F13\u5B58\u6A21\u5F0F\u201D\uFF08buffer\uFF09\u3002</p><p>\u56E0\u6B64\uFF0C1.1\u7248\u89C4\u5B9A\u53EF\u4EE5\u4E0D\u4F7F\u7528 Content-Length \u5B57\u6BB5\uFF0C\u800C\u4F7F\u7528&quot;\u5206\u5757\u4F20\u8F93\u7F16\u7801&quot;\uFF08chunked transfer encoding\uFF09\u3002\u53EA\u8981\u8BF7\u6C42\u6216\u56DE\u5E94\u7684\u5934\u4FE1\u606F\u6709 Transfer-Encoding \u5B57\u6BB5\uFF0C\u5C31\u8868\u660E\u56DE\u5E94\u5C06\u7531\u6570\u91CF\u672A\u5B9A\u7684\u6570\u636E\u5757\u7EC4\u6210\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Transfer</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Encoding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> chunked</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u6BCF\u4E2A\u975E\u7A7A\u7684\u6570\u636E\u5757\u4E4B\u524D\uFF0C\u4F1A\u6709\u4E00\u4E2A16\u8FDB\u5236\u7684\u6570\u503C\uFF0C\u8868\u793A\u8FD9\u4E2A\u5757\u7684\u957F\u5EA6\u3002\u6700\u540E\u662F\u4E00\u4E2A\u5927\u5C0F\u4E3A0\u7684\u5757\uFF0C\u5C31\u8868\u793A\u672C\u6B21\u56DE\u5E94\u7684\u6570\u636E\u53D1\u9001\u5B8C\u4E86\u3002\u4E0B\u9762\u662F\u4E00\u4E2A\u4F8B\u5B50\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> HTTP</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">1.1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200</span><span style="color:#A6ACCD;"> OK </span></span>
<span class="line"><span style="color:#A6ACCD;"> Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">plain </span></span>
<span class="line"><span style="color:#A6ACCD;"> Transfer</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Encoding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> chunked </span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"> This is the data </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> the first chunk </span></span>
<span class="line"><span style="color:#A6ACCD;"> 1C</span></span>
<span class="line"><span style="color:#A6ACCD;">and </span><span style="color:#89DDFF;">this</span><span style="color:#A6ACCD;"> is the second one </span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">con </span></span>
<span class="line"><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">sequence </span></span>
<span class="line"><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9" tabindex="-1">\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9 <a class="header-anchor" href="#\u957F\u8FDE\u63A5\u7684\u7F3A\u70B9" aria-hidden="true">#</a></h2><p>\u867D\u7136 HTTP 1.1 \u7248\u5141\u8BB8\u590D\u7528 TCP \u8FDE\u63A5\uFF0C\u4F46\u662F\u540C\u4E00\u4E2A TCP \u8FDE\u63A5\u91CC\u9762\uFF0C\u6240\u6709\u7684\u6570\u636E\u901A\u4FE1\u662F\u6309\u6B21\u5E8F\u8FDB\u884C\u7684\u3002\u670D\u52A1\u5668\u53EA\u6709\u5904\u7406\u5B8C\u4E00\u4E2A\u56DE\u5E94\uFF0C\u624D\u4F1A\u8FDB\u884C\u4E0B\u4E00\u4E2A\u56DE\u5E94\u3002\u8981\u662F\u524D\u9762\u7684\u56DE\u5E94\u7279\u522B\u6162\uFF0C\u540E\u9762\u5C31\u4F1A\u6709\u8BB8\u591A\u8BF7\u6C42\u6392\u961F\u7B49\u7740\u3002\u8FD9\u79F0\u4E3A&quot;\u961F\u5934\u5835\u585E&quot;\uFF08Head-of-line blocking\uFF09\u3002</p><p>\u4E3A\u4E86\u907F\u514D\u8FD9\u4E2A\u95EE\u9898\uFF0C\u53EA\u6709\u4E24\u79CD\u65B9\u6CD5\uFF1A</p><ul><li>\u4E00\u662F\u51CF\u5C11\u8BF7\u6C42\u6570</li><li>\u4E8C\u662F\u540C\u65F6\u591A\u5F00\u6301\u4E45\u8FDE\u63A5</li></ul><p>\u8FD9\u5BFC\u81F4\u4E86\u5F88\u591A\u7684\u7F51\u9875\u4F18\u5316\u6280\u5DE7\uFF0C\u6BD4\u5982\u5408\u5E76\u811A\u672C\u548C\u6837\u5F0F\u8868\u3001\u5C06\u56FE\u7247\u5D4C\u5165 CSS \u4EE3\u7801\u3001\u57DF\u540D\u5206\u7247\uFF08domain sharding\uFF09\u7B49\u7B49\u3002\u5982\u679C HTTP \u534F\u8BAE\u8BBE\u8BA1\u5F97\u66F4\u597D\u4E00\u4E9B\uFF0C\u8FD9\u4E9B\u989D\u5916\u7684\u5DE5\u4F5C\u662F\u53EF\u4EE5\u907F\u514D\u7684\u3002</p>`,35),i=[r];function C(d,h,u,y,b,A){return a(),n("div",null,i)}const T=s(c,[["render",C]]);export{m as __pageData,T as default};