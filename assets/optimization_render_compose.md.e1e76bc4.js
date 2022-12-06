import{_ as s,c as a,o as n,a as e}from"./app.29eff67c.js";const C=JSON.parse('{"title":"\u5408\u6210\u5904\u7406","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u65B0\u589E\u56FE\u5C42","slug":"\u65B0\u589E\u56FE\u5C42","link":"#\u65B0\u589E\u56FE\u5C42","children":[]},{"level":2,"title":"\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027","slug":"\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027","link":"#\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027","children":[]}],"relativePath":"optimization/render/compose.md","lastUpdated":1670314986000}'),t={name:"optimization/render/compose.md"},l=e(`<h1 id="\u5408\u6210\u5904\u7406" tabindex="-1">\u5408\u6210\u5904\u7406 <a class="header-anchor" href="#\u5408\u6210\u5904\u7406" aria-hidden="true">#</a></h1><p>\u5408\u6210\u5904\u7406\u662F\u5C06\u5DF2\u7ED8\u5236\u7684\u4E0D\u540C\u56FE\u5C42\u653E\u5728\u4E00\u8D77\uFF0C\u6700\u7EC8\u5728\u5C4F\u5E55\u4E0A\u6E32\u67D3\u51FA\u6765\u7684\u8FC7\u7A0B\u3002\u5728\u8FD9\u4E2A\u73AF\u8282\u4E2D\uFF0C\u6709\u4E24\u4E2A\u56E0\u7D20\u53EF\u80FD\u4F1A\u5F71\u54CD\u9875\u9762\u6027\u80FD\uFF1A\u4E00\u4E2A\u662F\u6240\u9700\u5408\u6210\u7684\u56FE\u5C42\u6570\u91CF\uFF0C\u53E6\u4E00\u4E2A\u662F\u5B9E\u73B0\u52A8\u753B\u7684\u76F8\u5173\u5C5E\u6027\u3002</p><h2 id="\u65B0\u589E\u56FE\u5C42" tabindex="-1">\u65B0\u589E\u56FE\u5C42 <a class="header-anchor" href="#\u65B0\u589E\u56FE\u5C42" aria-hidden="true">#</a></h2><p>\u5728\u964D\u4F4E\u7ED8\u5236\u590D\u6742\u5EA6\u5C0F\u8282\u4E2D\u8BB2\u5230\uFF0C\u53EF\u901A\u8FC7\u5C06\u56FA\u5B9A\u533A\u57DF\u548C\u52A8\u753B\u533A\u57DF\u62C6\u5206\u5230\u4E0D\u540C\u56FE\u5C42\u4E0A\u8FDB\u884C\u7ED8\u5236\uFF0C\u6765\u8FBE\u5230\u7ED8\u5236\u533A\u57DF\u6700\u5C0F\u5316\u7684\u76EE\u7684\u3002\u63A5\u4E0B\u6765\u6211\u4EEC\u5C31\u6765\u63A2\u8BA8\u5982\u4F55\u521B\u5EFA\u65B0\u7684\u56FE\u5C42\uFF0C\u6700\u4F73\u65B9\u5F0F\u4FBF\u662F\u4F7F\u7528 CSS \u5C5E\u6027 will-change \u6765\u521B\u5EFA\uFF1A</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">nav-layer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">will-change</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> transform</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u8BE5\u65B9\u6CD5\u5728 Chrome\u3001Firefox \u53CA Opera \u4E0A\u5747\u6709\u6548\uFF0C\u800C\u5BF9\u4E8E Safari \u7B49\u4E0D\u652F\u6301 will-change \u5C5E\u6027\u7684\u6D4F\u89C8\u5668\uFF0C\u5219\u53EF\u4EE5\u4F7F\u7528 3D \u53D8\u6362\u6765\u5F3A\u5236\u521B\u5EFA\uFF1A</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">new-layer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">translate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u867D\u7136\u521B\u5EFA\u65B0\u7684\u56FE\u5C42\u80FD\u591F\u5728\u4E00\u5B9A\u7A0B\u5EA6\u4E0A\u51CF\u5C11\u7ED8\u5236\u533A\u57DF\uFF0C\u4F46\u4E5F\u5E94\u5F53\u6CE8\u610F\u4E0D\u80FD\u521B\u5EFA\u592A\u591A\u7684\u56FE\u5C42\uFF0C\u56E0\u4E3A\u6BCF\u4E2A\u56FE\u5C42\u90FD\u9700\u8981\u6D4F\u89C8\u5668\u4E3A\u5176\u5206\u914D\u5185\u5B58\u53CA\u7BA1\u7406\u5F00\u9500\u3002\u5982\u679C\u5DF2\u7ECF\u5C06\u4E00\u4E2A\u5143\u7D20\u63D0\u5347\u5230\u6240\u521B\u5EFA\u7684\u65B0\u56FE\u5C42\u4E0A\uFF0C\u4E5F\u6700\u597D\u4F7F\u7528 Chrome \u5F00\u53D1\u8005\u5DE5\u5177\u4E2D\u7684 Layers \u5BF9\u56FE\u5C42\u8BE6\u60C5\u8FDB\u884C\u8BC4\u4F30\uFF0C\u786E\u5B9A\u662F\u5426\u771F\u7684\u5E26\u6765\u4E86\u6027\u80FD\u63D0\u5347\uFF0C\u5207\u5FCC\u5728\u672A\u7ECF\u5206\u6790\u8BC4\u4F30\u524D\u5C31\u76F2\u76EE\u5730\u8FDB\u884C\u56FE\u5C42\u521B\u5EFA\u3002</p><h2 id="\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027" tabindex="-1">\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027 <a class="header-anchor" href="#\u4EC5\u4E0E\u5408\u6210\u76F8\u5173\u7684\u52A8\u753B\u5C5E\u6027" aria-hidden="true">#</a></h2><p>\u5728\u4E86\u89E3\u4E86\u6E32\u67D3\u8FC7\u7A0B\u5404\u90E8\u5206\u7684\u529F\u80FD\u548C\u4F5C\u7528\u540E\uFF0C\u6211\u4EEC\u77E5\u9053\u5982\u679C\u4E00\u4E2A\u52A8\u753B\u7684\u5B9E\u73B0\u4E0D\u7ECF\u8FC7\u9875\u9762\u5E03\u5C40\u548C\u91CD\u7ED8\u73AF\u8282\uFF0C\u4EC5\u5728\u5408\u6210\u5904\u7406\u9636\u6BB5\u5C31\u80FD\u5B8C\u6210\uFF0C\u5219\u5C06\u4F1A\u8282\u7701\u5927\u91CF\u7684\u6027\u80FD\u5F00\u9500\u3002\u76EE\u524D\u80FD\u591F\u7B26\u5408\u8FD9\u4E00\u8981\u6C42\u7684\u52A8\u753B\u5C5E\u6027\u53EA\u6709\u4E24\u4E2A\uFF1A\u900F\u660E\u5EA6 opacity \u548C\u56FE\u5C42\u53D8\u6362 transform\u3002\u5B83\u4EEC\u6240\u80FD\u5B9E\u73B0\u7684\u52A8\u753B\u6548\u679C\u5982\u8868\u6240\u793A\uFF0C\u5176\u4E2D\u7528 n \u6765\u8868\u793A\u6570\u5B57\u3002</p><table><thead><tr><th>\u52A8\u753B\u6548\u679C</th><th>\u5B9E\u73B0\u65B9\u5F0F</th></tr></thead><tbody><tr><td>\u4F4D\u79FB</td><td>transform: translate(npx, npx);</td></tr><tr><td>\u7F29\u653E</td><td>transform: scale(n);</td></tr><tr><td>\u65CB\u8F6C</td><td>transform: rotate(ndeg);</td></tr><tr><td>\u503E\u659C</td><td>transform: skew(X</td></tr><tr><td>\u77E9\u9635\u53D8\u6362</td><td>transform: matrix(3d)(/* \u77E9\u9635\u53D8\u6362 */);</td></tr><tr><td>\u900F\u660E\u5EA6</td><td>opacity: 0...1</td></tr></tbody></table><p>\u5728\u4F7F\u7528 opacity \u548C transform \u5B9E\u73B0\u76F8\u5E94\u7684\u52A8\u753B\u6548\u679C\u65F6\uFF0C\u9700\u8981\u6CE8\u610F\u52A8\u753B\u5143\u7D20\u5E94\u5F53\u4F4D\u4E8E\u72EC\u7ACB\u7684\u7ED8\u56FE\u5C42\u4E0A\uFF0C\u4EE5\u907F\u514D\u5F71\u54CD\u5176\u4ED6\u7ED8\u5236\u533A\u57DF\u3002\u8FD9\u5C31\u9700\u8981\u5C06\u52A8\u753B\u5143\u7D20\u63D0\u5347\u81F3\u4E00\u4E2A\u65B0\u7684\u7ED8\u56FE\u5C42\u3002</p>`,12),r=[l];function p(o,c,d,i,y,h){return n(),a("div",null,r)}const D=s(t,[["render",p]]);export{C as __pageData,D as default};