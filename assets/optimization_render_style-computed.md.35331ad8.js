import{_ as s,c as n,o as a,a as l}from"./app.61540a41.js";const F=JSON.parse('{"title":"\u8BA1\u7B97\u6837\u5F0F\u4F18\u5316","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF","slug":"\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF","link":"#\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF","children":[]},{"level":2,"title":"\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027","slug":"\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027","link":"#\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027","children":[]},{"level":2,"title":"\u4F7F\u7528 BEM \u89C4\u8303","slug":"\u4F7F\u7528-bem-\u89C4\u8303","link":"#\u4F7F\u7528-bem-\u89C4\u8303","children":[{"level":3,"title":"\u5757","slug":"\u5757","link":"#\u5757","children":[]},{"level":3,"title":"\u5143\u7D20","slug":"\u5143\u7D20","link":"#\u5143\u7D20","children":[]},{"level":3,"title":"\u4FEE\u9970\u7B26","slug":"\u4FEE\u9970\u7B26","link":"#\u4FEE\u9970\u7B26","children":[]}]}],"relativePath":"optimization/render/style-computed.md","lastUpdated":1670314986000}'),p={name:"optimization/render/style-computed.md"},e=l(`<h1 id="\u8BA1\u7B97\u6837\u5F0F\u4F18\u5316" tabindex="-1">\u8BA1\u7B97\u6837\u5F0F\u4F18\u5316 <a class="header-anchor" href="#\u8BA1\u7B97\u6837\u5F0F\u4F18\u5316" aria-hidden="true">#</a></h1><p>\u5728 JavaScript \u5904\u7406\u8FC7\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u6DFB\u52A0\u548C\u5220\u9664\u5143\u7D20\uFF0C\u5BF9\u6837\u5F0F\u5C5E\u6027\u548C\u7C7B\u8FDB\u884C\u4E86\u4FEE\u6539\uFF0C\u5C31\u90FD\u4F1A\u5BFC\u81F4\u6D4F\u89C8\u5668\u91CD\u65B0\u8BA1\u7B97\u6240\u6D89\u53CA\u5143\u7D20\u7684\u6837\u5F0F\uFF0C\u67D0\u4E9B\u4FEE\u6539\u8FD8\u53EF\u80FD\u4F1A\u5F15\u8D77\u9875\u9762\u5E03\u5C40\u7684\u66F4\u6539\u548C\u6D4F\u89C8\u5668\u7684\u91CD\u65B0\u7ED8\u5236\uFF0C\u672C\u8282\u5C31\u7740\u773C\u4E8E\u6837\u5F0F\u76F8\u5173\u7684\u4F18\u5316\u70B9\uFF0C\u6765\u770B\u770B\u5982\u4F55\u63D0\u5347\u524D\u7AEF\u6E32\u67D3\u6027\u80FD\u3002</p><h2 id="\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF" tabindex="-1">\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF <a class="header-anchor" href="#\u51CF\u5C11\u8981\u8BA1\u7B97\u6837\u5F0F\u7684\u5143\u7D20\u6570\u91CF" aria-hidden="true">#</a></h2><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u77E5\u9053\u4E0E\u8BA1\u7B97\u6837\u5F0F\u76F8\u5173\u7684\u4E00\u6761\u91CD\u8981\u673A\u5236\uFF1ACSS \u5F15\u64CE\u5728\u67E5\u627E\u6837\u5F0F\u8868\u65F6\uFF0C\u5BF9\u6BCF\u6761\u89C4\u5219\u7684\u5339\u914D\u987A\u5E8F\u662F\u4ECE\u53F3\u5411\u5DE6\u7684\uFF0C\u8FD9\u4E0E\u6211\u4EEC\u901A\u5E38\u4ECE\u5DE6\u5411\u53F3\u7684\u4E66\u5199\u4E60\u60EF\u76F8\u53CD\u3002\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u5982\u4E0B CSS \u89C4\u5219\uFF1A</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">product-list</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">li</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u5982\u679C\u4E0D\u77E5\u9053\u6837\u5F0F\u89C4\u5219\u67E5\u627E\u987A\u5E8F\uFF0C\u5219\u63A8\u6D4B\u8FD9\u4E2A\u9009\u62E9\u5668\u89C4\u5219\u5E94\u8BE5\u4E0D\u4F1A\u592A\u8D39\u529B\uFF0C\u9996\u5148\u7C7B\u9009\u62E9\u5668 .product-list \u7684\u6570\u91CF\u6709\u9650\u5E94\u8BE5\u5F88\u5FEB\u5C31\u80FD\u67E5\u627E\u5230\uFF0C\u7136\u540E\u7F29\u5C0F\u8303\u56F4\u518D\u67E5\u627E\u5176\u4E0B\u7684li\u6807\u7B7E\u5C31\u987A\u7406\u6210\u7AE0\u3002</p><p>\u4F46 CSS \u9009\u62E9\u5668\u7684\u5339\u914D\u89C4\u5219\u5B9E\u9645\u4E0A\u662F\u4ECE\u53F3\u5411\u5DE6\u7684\uFF0C\u8FD9\u6837\u518D\u56DE\u770B\u4E0A\u9762\u7684\u89C4\u5219\u5339\u914D\uFF0C\u5176\u5B9E\u5F00\u9500\u76F8\u5F53\u9AD8\uFF0C\u56E0\u4E3A CSS \u5F15\u64CE\u9700\u8981\u9996\u5148\u904D\u5386\u9875\u9762\u4E0A\u7684\u6240\u6709 li \u6807\u7B7E\u5143\u7D20\uFF0C\u7136\u540E\u786E\u8BA4\u6BCF\u4E2A li \u6807\u7B7E\u6709\u5305\u542B\u7C7B\u540D\u4E3A product-list \u7684\u7236\u5143\u7D20\u624D\u662F\u76EE\u6807\u5143\u7D20\uFF0C\u6240\u4EE5\u4E3A\u4E86\u63D0\u9AD8\u9875\u9762\u7684\u6E32\u67D3\u6027\u80FD\uFF0C\u8BA1\u7B97\u6837\u5F0F\u9636\u6BB5\u5E94\u5F53\u5C3D\u91CF\u51CF\u5C11\u53C2\u4E0E\u6837\u5F0F\u8BA1\u7B97\u7684\u5143\u7D20\u6570\u91CF\uFF0C\u5728\u8FD9\u91CC\u603B\u7ED3\u4E86\u5982\u4E0B\u51E0\u70B9\u5B9E\u6218\u5EFA\u8BAE\uFF1A</p><ol><li>\u4F7F\u7528\u7C7B\u9009\u62E9\u5668\u66FF\u4EE3\u6807\u7B7E\u9009\u62E9\u5668\uFF0C\u5BF9\u4E8E\u4E0A\u9762 li \u6807\u7B7E\u7684\u9519\u8BEF\u793A\u8303\uFF0C\u5982\u679C\u60F3\u5BF9\u7C7B\u540D\u4E3A product-list \u4E0B\u7684 li \u6807\u7B7E\u6DFB\u52A0\u6837\u5F0F\u89C4\u5219\uFF0C\u53EF\u76F4\u63A5\u4E3A\u76F8\u5E94\u7684 li \u6807\u7B7E\u5B9A\u4E49\u540D\u4E3A product-list_li \u7684\u7C7B\u9009\u62E9\u5668\u89C4\u5219\uFF0C\u8FD9\u6837\u505A\u7684\u597D\u5904\u662F\u5728\u8BA1\u7B97\u6837\u5F0F\u65F6\uFF0C\u51CF\u5C11\u4E86\u4ECE\u6574\u4E2A\u9875\u9762\u4E2D\u67E5\u627E\u6807\u7B7E\u5143\u7D20\u7684\u8303\u56F4\uFF0C\u6BD5\u7ADF\u5728 CSS \u9009\u62E9\u5668\u4E2D\uFF0C\u6807\u7B7E\u9009\u62E9\u5668\u7684\u533A\u5206\u5EA6\u662F\u6700\u4F4E\u7684\u3002</li><li>\u907F\u514D\u4F7F\u7528\u901A\u914D\u7B26\u505A\u9009\u62E9\u5668\uFF0C\u5BF9\u4E8E\u521A\u5165\u95E8\u524D\u7AEF\u7684\u5C0F\u4F19\u4F34\uFF0C\u901A\u5E38\u5728\u7F16\u5199 CSS \u6837\u5F0F\u4E4B\u524D\u90FD\u4F1A\u6709\u4F7F\u7528\u901A\u914D\u7B26\u53BB\u6E05\u9664\u9ED8\u8BA4\u6837\u5F0F\u7684\u4E60\u60EF\uFF0C\u5982\u4E0B\u6240\u793A\uFF1A</li></ol><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">margin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">padding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u8FD9\u79CD\u64CD\u4F5C\u5728\u6807\u7B7E\u89C4\u6A21\u8F83\u5C0F\u7684 demo \u9879\u76EE\u4E2D\uFF0C\u51E0\u4E4E\u770B\u4E0D\u51FA\u6709\u4EFB\u4F55\u6027\u80FD\u5DEE\u5F02\u3002\u4F46\u5BF9\u5B9E\u9645\u7684\u5DE5\u7A0B\u9879\u76EE\u6765\u8BF4\uFF0C\u4F7F\u7528\u901A\u914D\u7B26\u5C31\u610F\u5473\u7740\u5728\u8BA1\u7B97\u6837\u5F0F\u65F6\uFF0C\u6D4F\u89C8\u5668\u9700\u8981\u53BB\u904D\u5386\u9875\u9762\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\uFF0C\u8FD9\u6837\u7684\u6027\u80FD\u5F00\u9500\u5F88\u5927\uFF0C\u5E94\u5F53\u907F\u514D\u4F7F\u7528\u3002</p><h2 id="\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027" tabindex="-1">\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027 <a class="header-anchor" href="#\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027" aria-hidden="true">#</a></h2><p>\u968F\u7740\u9879\u76EE\u4E0D\u65AD\u8FED\u4EE3\uFF0C\u590D\u6742\u6027\u4F1A\u8D8A\u6765\u8D8A\u9AD8\uFF0C\u6216\u8BB8\u521A\u5F00\u59CB\u4EC5\u6709\u4E00\u4E2A\u540D\u4E3A content \u7684\u7C7B\u9009\u62E9\u5143\u7D20\uFF0C\u4F46\u6162\u6162\u5730\u5355\u4E2A\u5143\u7D20\u53EF\u80FD\u4F1A\u5E76\u5217\u51FA\u5217\u8868\uFF0C\u5217\u8868\u53C8\u4F1A\u5305\u88F9\u5728\u67D0\u4E2A\u5BB9\u5668\u5143\u7D20\u4E0B\uFF0C\u751A\u81F3\u8BE5\u5217\u8868\u4E2D\u7684\u90E8\u5206\u5143\u7D20\u7684\u6837\u5F0F\u53C8\u4E0E\u5176\u4ED6\u5144\u5F1F\u5143\u7D20\u6709\u6240\u5DEE\u5F02\uFF0C\u8FD9\u6837\u539F\u672C\u7684\u4E00\u4E2A\u7C7B\u9009\u62E9\u5668\u5C31\u4F1A\u88AB\u6269\u5C55\u6210\u5982\u4E0B\u5F62\u5F0F\uFF1A</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">container</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">nth-last-child</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">-n+1</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">content</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">/* \u6837\u5F0F\u89C4\u5219 */</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u6D4F\u89C8\u5668\u5728\u8BA1\u7B97\u4E0A\u8FF0\u6837\u5F0F\u65F6\uFF0C\u9996\u5148\u5C31\u9700\u8981\u67E5\u8BE2\u6709\u54EA\u4E9B\u5E94\u7528\u4E86 content \u7C7B\u7684\u5143\u7D20\uFF0C\u5E76\u4E14\u5176\u7236\u5143\u7D20\u6070\u597D\u5E26\u6709 container \u7C7B\u7684\u5012\u6570\u7B2C n+1 \u4E2A\u5143\u7D20\uFF0C\u8FD9\u4E2A\u8BA1\u7B97\u8FC7\u7A0B\u53EF\u80FD\u5C31\u4F1A\u82B1\u8D39\u8BB8\u591A\u65F6\u95F4\uFF0C\u5982\u679C\u4EC5\u5BF9\u786E\u5B9A\u7684\u5143\u7D20\u4F7F\u7528\u5355\u4E00\u7684\u7C7B\u540D\u9009\u62E9\u5668\uFF0C\u90A3\u4E48\u6D4F\u89C8\u5668\u7684\u8BA1\u7B97\u5F00\u9500\u5C31\u4F1A\u5927\u5E45\u5EA6\u964D\u4F4E\u3002</p><p>\u6BD4\u5982\u4F7F\u7528\u540D\u4E3A final-container-content \u7684\u7C7B\u9009\u62E9\u66FF\u4EE3\u4E0A\u8FF0\u7684\u590D\u6742\u6837\u5F0F\u8BA1\u7B97\uFF0C\u76F4\u63A5\u6DFB\u52A0\u5230\u76EE\u6807\u5143\u7D20\u4E0A\u3002\u800C\u4E14\u590D\u6742\u7684\u5339\u914D\u89C4\u5219\uFF0C\u53EF\u80FD\u4E5F\u4F1A\u5B58\u5728\u8003\u8651\u4E0D\u5468\u4ECE\u800C\u5BFC\u81F4\u753B\u86C7\u6DFB\u8DB3\u7684\u60C5\u51B5\uFF0C\u4F8B\u5982\uFF0C\u901A\u8FC7 id \u9009\u62E9\u5668\u5DF2\u7ECF\u53EF\u4EE5\u552F\u4E00\u786E\u5B9A\u76EE\u6807\u5143\u7D20\u4E86\uFF0C\u5C31\u65E0\u987B\u518D\u9644\u52A0\u5176\u4ED6\u591A\u4F59\u7684\u9009\u62E9\u5668\uFF1A</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">\xD7 </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">content</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">my-content</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">\u221A </span></span>
<span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">my-content</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u7531\u4E8E id \u9009\u62E9\u5668\u672C\u8EAB\u5C31\u662F\u552F\u4E00\u5B58\u5728\u7684\uFF0C\u5B9A\u4F4D\u5230\u76EE\u6807\u5143\u7D20\u540E\u518D\u53BB\u67E5\u627E\u540D\u4E3A content \u7684\u7C7B\u9009\u62E9\u5668\u5143\u7D20\u5C31\u591A\u6B64\u4E00\u4E3E\u3002\u5F53\u7136\u5728\u5B9E\u9645\u9879\u76EE\u4E2D\u7684\u60C5\u51B5\u4F1A\u590D\u6742\u5F97\u591A\uFF0C\u4F46\u82E5\u80FD\u505A\u5230\u5C3D\u91CF\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027\uFF0C\u5219\u7C7B\u4F3C\u7684\u95EE\u9898\u4E5F\u4F1A\u5BB9\u6613\u907F\u514D\u3002</p><h2 id="\u4F7F\u7528-bem-\u89C4\u8303" tabindex="-1">\u4F7F\u7528 BEM \u89C4\u8303 <a class="header-anchor" href="#\u4F7F\u7528-bem-\u89C4\u8303" aria-hidden="true">#</a></h2><p>BEM \u662F\u4E00\u79CD CSS \u7684\u4E66\u5199\u89C4\u8303\uFF0C\u5B83\u7684\u540D\u79F0\u662F\u7531\u4E09\u4E2A\u5355\u8BCD\u7684\u9996\u5B57\u6BCD\u7EC4\u6210\u7684\uFF0C\u5206\u522B\u662F\u5757\uFF08Block\uFF09\u3001\u5143\u7D20\uFF08Element\uFF09\u548C\u4FEE\u9970\u7B26\uFF08Modifier\uFF09\u3002\u7406\u8BBA\u4E0A\u5B83\u5E0C\u671B\u6BCF\u884C CSS \u4EE3\u7801\u53EA\u6709\u4E00\u4E2A\u9009\u62E9\u5668\uFF0C\u8FD9\u5C31\u662F\u4E3A\u4E86\u964D\u4F4E\u9009\u62E9\u5668\u7684\u590D\u6742\u6027\uFF0C\u5BF9\u9009\u62E9\u5668\u7684\u547D\u540D\u8981\u6C42\u901A\u8FC7\u4EE5\u4E0B\u4E09\u4E2A\u7B26\u53F7\u7684\u7EC4\u5408\u6765\u5B9E\u73B0\u3002</p><ul><li>\u4E2D\u753B\u7EBF\uFF08-\uFF09\uFF1A\u4EC5\u4F5C\u4E3A\u8FDE\u5B57\u7B26\u4F7F\u7528\uFF0C\u8868\u793A\u67D0\u4E2A\u5757\u6216\u5B50\u5143\u7D20\u7684\u591A\u4E2A\u5355\u8BCD\u4E4B\u95F4\u7684\u8FDE\u63A5\u7B26\u3002</li><li>\u5355\u4E0B\u753B\u7EBF\uFF08_\uFF09\uFF1A\u4F5C\u4E3A\u63CF\u8FF0\u4E00\u4E2A\u5757\u6216\u5176\u5B50\u5143\u7D20\u7684\u4E00\u79CD\u72B6\u6001\u3002</li><li>\u53CC\u4E0B\u753B\u7EBF\uFF08__\uFF09\uFF1A\u4F5C\u4E3A\u8FDE\u63A5\u5757\u4E0E\u5757\u7684\u5B50\u5143\u7D20\u3002</li></ul><p>\u63A5\u4E0B\u6765\u9996\u5148\u7ED9\u51FA\u4E00\u4E2A\u57FA\u4E8E BEM \u7684\u9009\u62E9\u5668\u547D\u540D\u5F62\u5F0F\uFF0C\u7136\u540E\u518D\u5206\u522B\u770B\u5757\u3001\u5143\u7D20\u4E0E\u4FEE\u9970\u7B26\u7684\u542B\u4E49\u548C\u4F7F\u7528\u793A\u4F8B\uFF1A</p><div class="language-xml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">type-block__element_modifier</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h3 id="\u5757" tabindex="-1">\u5757 <a class="header-anchor" href="#\u5757" aria-hidden="true">#</a></h3><p>\u901A\u5E38\u6765\u8BF4\uFF0C\u51E1\u662F\u72EC\u7ACB\u7684\u9875\u9762\u5143\u7D20\uFF0C\u65E0\u8BBA\u7B80\u5355\u6216\u662F\u590D\u6742\u90FD\u53EF\u4EE5\u88AB\u89C6\u4F5C\u4E00\u4E2A\u5757\uFF0C\u5728 HTML \u6587\u6863\u4E2D\u4F1A\u7528\u4E00\u4E2A\u552F\u4E00\u7684\u7C7B\u540D\u6765\u8868\u793A\u8FD9\u4E2A\u5757\u3002\u5177\u4F53\u7684\u547D\u540D\u89C4\u5219\u5305\u62EC\u4E09\u4E2A\uFF1A\u53EA\u80FD\u4F7F\u7528\u7C7B\u9009\u62E9\u5668\uFF0C\u800C\u4E0D\u4F7F\u7528ID\u9009\u62E9\u5668\uFF1B\u6BCF\u4E2A\u5757\u5E94\u5B9A\u4E49\u4E00\u4E2A\u524D\u7F00\u7528\u6765\u8868\u793A\u547D\u540D\u7A7A\u95F4\uFF1B\u6BCF\u6761\u6837\u5F0F\u89C4\u5219\u5FC5\u987B\u5C5E\u4E8E\u4E00\u4E2A\u5757\u3002\u6BD4\u5982\u4E00\u4E2A\u81EA\u5B9A\u4E49\u5217\u8868\u5C31\u53EF\u89C6\u4F5C\u4E3A\u4E00\u4E2A\u5757\uFF0C\u5176\u7C7B\u540D\u5339\u914D\u89C4\u5219\u53EF\u5199\u4E3A\uFF1A</p><div class="language-CSS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h3 id="\u5143\u7D20" tabindex="-1">\u5143\u7D20 <a class="header-anchor" href="#\u5143\u7D20" aria-hidden="true">#</a></h3><p>\u5143\u7D20\u5373\u6307\u5757\u4E2D\u7684\u5B50\u5143\u7D20\uFF0C\u4E14\u5B50\u5143\u7D20\u4E5F\u88AB\u89C6\u4F5C\u5757\u7684\u76F4\u63A5\u5B50\u5143\u7D20\uFF0C\u5176\u7C7B\u540D\u9700\u8981\u4F7F\u7528\u5757\u7684\u540D\u79F0\u4F5C\u4E3A\u524D\u7F00\u3002\u4EE5\u4E0A\u9762\u81EA\u5B9A\u4E49\u5217\u8868\u4E2D\u7684\u5B50\u5143\u7D20\u7C7B\u540D\u5199\u6CD5\u4E3A\u4F8B\uFF0C\u4E0E\u5E38\u89C4\u5199\u6CD5\u5BF9\u6BD4\u5982\u4E0B\uFF1A</p><div class="language-CSS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// \u5E38\u89C4\u5199\u6CD5 </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">item</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">// BEM \u5199\u6CD5 </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist__item</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="\u4FEE\u9970\u7B26" tabindex="-1">\u4FEE\u9970\u7B26 <a class="header-anchor" href="#\u4FEE\u9970\u7B26" aria-hidden="true">#</a></h3><p>\u4FEE\u9970\u7B26\u53EF\u4EE5\u770B\u4F5C\u662F\u5757\u6216\u5143\u7D20\u7684\u67D0\u4E2A\u7279\u5B9A\u72B6\u6001\uFF0C\u4EE5\u6309\u94AE\u4E3A\u4F8B\uFF0C\u5B83\u53EF\u80FD\u5305\u542B\u5927\u3001\u4E2D\u3001\u5C0F\u4E09\u79CD\u9ED8\u8BA4\u5C3A\u5BF8\u53CA\u81EA\u5B9A\u4E49\u5C3A\u5BF8\uFF0C\u5BF9\u6B64\u53EF\u4F7F\u7528 small\u3001normal\u3001big \u6216 size-N \u6765\u4FEE\u9970\u5177\u4F53\u6309\u94AE\u7684\u9009\u62E9\u5668\u7C7B\u540D\uFF0C\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-CSS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/* \u81EA\u5B9A\u4E49\u5217\u8868\u4E0B\u5B50\u5143\u7D20\u5927\u3001\u4E2D\u3001\u5C0F\u4E09\u79CD\u5C3A\u5BF8\u7684\u7C7B\u9009\u62E9\u5668 */</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist__item_big</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist__item_normal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist__item_small</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#676E95;">/* \u5E26\u81EA\u5B9A\u4E49\u5C3A\u5BF8\u4FEE\u9970\u7B26\u7684\u7C7B\u9009\u62E9\u5668 */</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">mylist__item_size-10</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">BEM \u6837\u5F0F\u7F16\u7801\u89C4\u8303\u5EFA\u8BAE\u6240\u6709\u5143\u7D20\u90FD\u88AB\u5355\u4E00\u7684\u7C7B\u9009\u62E9\u5668\u4FEE\u9970\uFF0C\u4ECE CSS \u4EE3\u7801\u7ED3\u6784\u89D2\u5EA6\u6765\u8BF4\u8FD9\u6837\u4E0D\u4F46\u66F4\u52A0\u6E05\u6670\uFF0C\u800C\u4E14\u7531\u4E8E\u6837\u5F0F\u67E5\u627E\u5F97\u5230\u4E86\u7B80\u5316\uFF0C\u6E32\u67D3\u9636\u6BB5\u7684\u6837\u5F0F\u8BA1\u7B97\u6027\u80FD\u4E5F\u4F1A\u5F97\u5230\u63D0\u5347\u3002</span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,31),o=[e];function c(r,t,i,C,y,d){return a(),n("div",null,o)}const b=s(p,[["render",c]]);export{F as __pageData,b as default};
