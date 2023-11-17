import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.fAsUD1FY.js";const b=JSON.parse('{"title":"缓存","description":"","frontmatter":{},"headers":[],"relativePath":"optimization/cache.md","filePath":"optimization/cache.md","lastUpdated":1683291227000}'),p={name:"optimization/cache.md"},o=l(`<h1 id="缓存" tabindex="-1">缓存 <a class="header-anchor" href="#缓存" aria-label="Permalink to &quot;缓存&quot;">​</a></h1><h2 id="文件缓存" tabindex="-1">文件缓存 <a class="header-anchor" href="#文件缓存" aria-label="Permalink to &quot;文件缓存&quot;">​</a></h2><p>通过连接名称控制缓存，例如第一个版本用abc_1名字来做名称,名字不会变那就不需要重新下载直接使用缓存。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;abc_1.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;abc_1.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当内容改变的时候，链接名称才会去改变</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;abc_2.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;abc_2.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="dom查询缓存" tabindex="-1">DOM查询缓存 <a class="header-anchor" href="#dom查询缓存" aria-label="Permalink to &quot;DOM查询缓存&quot;">​</a></h2><p>将DOM查询缓存到变量中，这样下次循环就不需要重新获取。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//未缓存DOM查询</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(i</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">document.</span><span style="color:#B392F0;">getElementsByTagName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//todo</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//缓存了DOM查询</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> pList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementsByTagName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(i</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">pList.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//todo</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//未缓存DOM查询</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(i</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">document.</span><span style="color:#6F42C1;">getElementsByTagName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">).</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//todo</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//缓存了DOM查询</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> pList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementsByTagName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(i</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">pList.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//todo</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,9),e=[o];function t(c,r,i,y,E,d){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{b as __pageData,m as default};