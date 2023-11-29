import{_ as s,o as i,c as a,R as n}from"./chunks/framework.LGcbqaZT.js";const b=JSON.parse('{"title":"计算样式优化","description":"","frontmatter":{},"headers":[],"relativePath":"optimization/render/style-computed.md","filePath":"optimization/render/style-computed.md","lastUpdated":1683291227000}'),e={name:"optimization/render/style-computed.md"},l=n(`<h1 id="计算样式优化" tabindex="-1">计算样式优化 <a class="header-anchor" href="#计算样式优化" aria-label="Permalink to &quot;计算样式优化&quot;">​</a></h1><p>在 JavaScript 处理过后，若发生了添加和删除元素，对样式属性和类进行了修改，就都会导致浏览器重新计算所涉及元素的样式，某些修改还可能会引起页面布局的更改和浏览器的重新绘制，本节就着眼于样式相关的优化点，来看看如何提升前端渲染性能。</p><h2 id="减少要计算样式的元素数量" tabindex="-1">减少要计算样式的元素数量 <a class="header-anchor" href="#减少要计算样式的元素数量" aria-label="Permalink to &quot;减少要计算样式的元素数量&quot;">​</a></h2><p>首先我们需要知道与计算样式相关的一条重要机制：CSS 引擎在查找样式表时，对每条规则的匹配顺序是从右向左的，这与我们通常从左向右的书写习惯相反。举个例子，如下 CSS 规则：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.product-list</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> li</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果不知道样式规则查找顺序，则推测这个选择器规则应该不会太费力，首先类选择器 .product-list 的数量有限应该很快就能查找到，然后缩小范围再查找其下的li标签就顺理成章。</p><p>但 CSS 选择器的匹配规则实际上是从右向左的，这样再回看上面的规则匹配，其实开销相当高，因为 CSS 引擎需要首先遍历页面上的所有 li 标签元素，然后确认每个 li 标签有包含类名为 product-list 的父元素才是目标元素，所以为了提高页面的渲染性能，计算样式阶段应当尽量减少参与样式计算的元素数量，在这里总结了如下几点实战建议：</p><ol><li>使用类选择器替代标签选择器，对于上面 li 标签的错误示范，如果想对类名为 product-list 下的 li 标签添加样式规则，可直接为相应的 li 标签定义名为 product-list_li 的类选择器规则，这样做的好处是在计算样式时，减少了从整个页面中查找标签元素的范围，毕竟在 CSS 选择器中，标签选择器的区分度是最低的。</li><li>避免使用通配符做选择器，对于刚入门前端的小伙伴，通常在编写 CSS 样式之前都会有使用通配符去清除默认样式的习惯，如下所示：</li></ol><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这种操作在标签规模较小的 demo 项目中，几乎看不出有任何性能差异。但对实际的工程项目来说，使用通配符就意味着在计算样式时，浏览器需要去遍历页面中的每一个元素，这样的性能开销很大，应当避免使用。</p><h2 id="降低选择器的复杂性" tabindex="-1">降低选择器的复杂性 <a class="header-anchor" href="#降低选择器的复杂性" aria-label="Permalink to &quot;降低选择器的复杂性&quot;">​</a></h2><p>随着项目不断迭代，复杂性会越来越高，或许刚开始仅有一个名为 content 的类选择元素，但慢慢地单个元素可能会并列出列表，列表又会包裹在某个容器元素下，甚至该列表中的部分元素的样式又与其他兄弟元素有所差异，这样原本的一个类选择器就会被扩展成如下形式：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.container:nth-last-child</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-n+1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /* 样式规则 */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>浏览器在计算上述样式时，首先就需要查询有哪些应用了 content 类的元素，并且其父元素恰好带有 container 类的倒数第 n+1 个元素，这个计算过程可能就会花费许多时间，如果仅对确定的元素使用单一的类名选择器，那么浏览器的计算开销就会大幅度降低。</p><p>比如使用名为 final-container-content 的类选择替代上述的复杂样式计算，直接添加到目标元素上。而且复杂的匹配规则，可能也会存在考虑不周从而导致画蛇添足的情况，例如，通过 id 选择器已经可以唯一确定目标元素了，就无须再附加其他多余的选择器：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">× </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.content</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> #my-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">√ </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#my-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>由于 id 选择器本身就是唯一存在的，定位到目标元素后再去查找名为 content 的类选择器元素就多此一举。当然在实际项目中的情况会复杂得多，但若能做到尽量降低选择器的复杂性，则类似的问题也会容易避免。</p><h2 id="使用-bem-规范" tabindex="-1">使用 BEM 规范 <a class="header-anchor" href="#使用-bem-规范" aria-label="Permalink to &quot;使用 BEM 规范&quot;">​</a></h2><p>BEM 是一种 CSS 的书写规范，它的名称是由三个单词的首字母组成的，分别是块（Block）、元素（Element）和修饰符（Modifier）。理论上它希望每行 CSS 代码只有一个选择器，这就是为了降低选择器的复杂性，对选择器的命名要求通过以下三个符号的组合来实现。</p><ul><li>中画线（-）：仅作为连字符使用，表示某个块或子元素的多个单词之间的连接符。</li><li>单下画线（_）：作为描述一个块或其子元素的一种状态。</li><li>双下画线（__）：作为连接块与块的子元素。</li></ul><p>接下来首先给出一个基于 BEM 的选择器命名形式，然后再分别看块、元素与修饰符的含义和使用示例：</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type-block__element_modifier</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="块" tabindex="-1">块 <a class="header-anchor" href="#块" aria-label="Permalink to &quot;块&quot;">​</a></h3><p>通常来说，凡是独立的页面元素，无论简单或是复杂都可以被视作一个块，在 HTML 文档中会用一个唯一的类名来表示这个块。具体的命名规则包括三个：只能使用类选择器，而不使用ID选择器；每个块应定义一个前缀用来表示命名空间；每条样式规则必须属于一个块。比如一个自定义列表就可视作为一个块，其类名匹配规则可写为：</p><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="元素" tabindex="-1">元素 <a class="header-anchor" href="#元素" aria-label="Permalink to &quot;元素&quot;">​</a></h3><p>元素即指块中的子元素，且子元素也被视作块的直接子元素，其类名需要使用块的名称作为前缀。以上面自定义列表中的子元素类名写法为例，与常规写法对比如下：</p><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 常规写法 </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> .item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// BEM 写法 </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist__item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="修饰符" tabindex="-1">修饰符 <a class="header-anchor" href="#修饰符" aria-label="Permalink to &quot;修饰符&quot;">​</a></h3><p>修饰符可以看作是块或元素的某个特定状态，以按钮为例，它可能包含大、中、小三种默认尺寸及自定义尺寸，对此可使用 small、normal、big 或 size-N 来修饰具体按钮的选择器类名，示例如下：</p><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 自定义列表下子元素大、中、小三种尺寸的类选择器 */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist__item_big</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist__item_normal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist__item_small</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 带自定义尺寸修饰符的类选择器 */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.mylist__item_size-10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BEM 样式编码规范建议所有元素都被单一的类选择器修饰，从 CSS 代码结构角度来说这样不但更加清晰，而且由于样式查找得到了简化，渲染阶段的样式计算性能也会得到提升。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,31),p=[l];function t(h,r,d,k,c,o){return i(),a("div",null,p)}const u=s(e,[["render",t]]);export{b as __pageData,u as default};
