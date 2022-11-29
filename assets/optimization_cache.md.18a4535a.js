import{_ as s,c as a,o as n,a as l}from"./app.a104287a.js";const C=JSON.parse('{"title":"\u7F13\u5B58","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6587\u4EF6\u7F13\u5B58","slug":"\u6587\u4EF6\u7F13\u5B58","link":"#\u6587\u4EF6\u7F13\u5B58","children":[]},{"level":2,"title":"DOM\u67E5\u8BE2\u7F13\u5B58","slug":"dom\u67E5\u8BE2\u7F13\u5B58","link":"#dom\u67E5\u8BE2\u7F13\u5B58","children":[]}],"relativePath":"optimization/cache.md","lastUpdated":1669736972000}'),p={name:"optimization/cache.md"},e=l(`<h1 id="\u7F13\u5B58" tabindex="-1">\u7F13\u5B58 <a class="header-anchor" href="#\u7F13\u5B58" aria-hidden="true">#</a></h1><h2 id="\u6587\u4EF6\u7F13\u5B58" tabindex="-1">\u6587\u4EF6\u7F13\u5B58 <a class="header-anchor" href="#\u6587\u4EF6\u7F13\u5B58" aria-hidden="true">#</a></h2><p>\u901A\u8FC7\u8FDE\u63A5\u540D\u79F0\u63A7\u5236\u7F13\u5B58\uFF0C\u4F8B\u5982\u7B2C\u4E00\u4E2A\u7248\u672C\u7528abc_1\u540D\u5B57\u6765\u505A\u540D\u79F0,\u540D\u5B57\u4E0D\u4F1A\u53D8\u90A3\u5C31\u4E0D\u9700\u8981\u91CD\u65B0\u4E0B\u8F7D\u76F4\u63A5\u4F7F\u7528\u7F13\u5B58\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abc_1.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u5F53\u5185\u5BB9\u6539\u53D8\u7684\u65F6\u5019\uFF0C\u94FE\u63A5\u540D\u79F0\u624D\u4F1A\u53BB\u6539\u53D8</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abc_2.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h2 id="dom\u67E5\u8BE2\u7F13\u5B58" tabindex="-1">DOM\u67E5\u8BE2\u7F13\u5B58 <a class="header-anchor" href="#dom\u67E5\u8BE2\u7F13\u5B58" aria-hidden="true">#</a></h2><p>\u5C06DOM\u67E5\u8BE2\u7F13\u5B58\u5230\u53D8\u91CF\u4E2D\uFF0C\u8FD9\u6837\u4E0B\u6B21\u5FAA\u73AF\u5C31\u4E0D\u9700\u8981\u91CD\u65B0\u83B7\u53D6\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">//\u672A\u7F13\u5B58DOM\u67E5\u8BE2</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> i</span></span>
<span class="line"><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;">(i</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementsByTagName</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">p</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//todo</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u7F13\u5B58\u4E86DOM\u67E5\u8BE2</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> pList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementsByTagName</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">p</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> i</span></span>
<span class="line"><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;">(i</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">pList</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//todo</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,9),o=[e];function c(t,r,D,i,F,y){return n(),a("div",null,o)}const A=s(p,[["render",c]]);export{C as __pageData,A as default};
