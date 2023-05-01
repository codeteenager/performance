import{_ as e,c as a,o as t,V as i}from"./chunks/framework.25288a50.js";const l="/performance/optimization/14.svg",g=JSON.parse('{"title":"Web Vitals","description":"","frontmatter":{},"headers":[],"relativePath":"optimization/metrics/vitals.md","filePath":"optimization/metrics/vitals.md","lastUpdated":1681882472000}'),r={name:"optimization/metrics/vitals.md"},o=i('<h1 id="web-vitals" tabindex="-1">Web Vitals <a class="header-anchor" href="#web-vitals" aria-label="Permalink to &quot;Web Vitals&quot;">​</a></h1><p>Google 开发了许多实用指标和工具，帮助衡量用户体验和质量，从而发掘优化点。一项名为 Web Vitals 的计划降低了学习成本，为网站体验提供了一组统一的质量衡量指标 — Core Web Vitals，其中包括加载体验、交互性和页面内容的视觉稳定性。</p><p>有很多方法可以优化网站的用户体验。若能预先了解最佳的优化衡量方法，可以大大节省时间和成本。</p><p>Google 在 2020 年 5 月 5 日提出了新的用户体验量化方式 Web Vitals 来衡量网站的用户体验，并将这些衡量结果用作其排名算法的一部分。为了更好的理解这些内容，让我们来看看这些重要指标是什么。</p><h2 id="core-web-vitals-与-web-vitals" tabindex="-1">Core Web Vitals 与 Web Vitals <a class="header-anchor" href="#core-web-vitals-与-web-vitals" aria-label="Permalink to &quot;Core Web Vitals 与 Web Vitals&quot;">​</a></h2><p>什么是 Web Vitals，Google 给出的定义是 一个良好网站的基本指标（Essential metrics for a healthy site），过去要衡量一个网站的好坏，需要使用的指标太多了，Web Vitals 可以简化指标的学习曲线，只需聚焦于 Web Vitals 指标的表现即可。</p><p>在这些 Web Vitals 中，Google 确定了三个主要衡量指标，即在所有类型的网站中通用的 Core Web Vitals：</p><blockquote><p>Core Web Vitals 是应用于所有 Web 页面的 Web Vitals 的子集，是其最重要的核心。</p></blockquote><p><img src="'+l+'" alt=""></p><ul><li>加载性能（LCP） — 显示最大内容元素所需时间</li><li>交互性（FID） — 首次输入延迟时间</li><li>视觉稳定性（CLS） — 累积布局配置偏移</li></ul><p>这三个指标已经经过了一段时间的验证，如 LCP 在 WICG 已经孵化至少 1 年以上，FID 在 Google Chrome Labs 上已经实施 2 年以上，LCP 和 CLS（相关 Layout Instability API）已于今年入 W3C 草拟标准。</p><h2 id="测量-web-vitals" tabindex="-1">测量 Web Vitals <a class="header-anchor" href="#测量-web-vitals" aria-label="Permalink to &quot;测量 Web Vitals&quot;">​</a></h2><ul><li>性能测试工具，比如 Lighthouse</li><li>使用 <a href="https://github.com/GoogleChrome/web-vitals" target="_blank" rel="noreferrer">web-vitals</a> 库</li><li>使用浏览器插件 <a href="https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma" target="_blank" rel="noreferrer">Web Vitals</a></li></ul><h2 id="优化-web-vitals" tabindex="-1">优化 Web Vitals <a class="header-anchor" href="#优化-web-vitals" aria-label="Permalink to &quot;优化 Web Vitals&quot;">​</a></h2><ul><li><a href="https://web.dev/optimize-lcp/" target="_blank" rel="noreferrer">Optimize Largest Contentful Paint</a></li><li><a href="https://web.dev/optimize-fid/" target="_blank" rel="noreferrer">Optimize First Input Delay</a></li><li><a href="https://web.dev/optimize-cls/" target="_blank" rel="noreferrer">Optimize Cumulative Layout Shift</a></li></ul><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://web.dev/vitals/" target="_blank" rel="noreferrer">https://web.dev/vitals/</a></li><li><a href="https://juejin.cn/post/6844904168591736846" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904168591736846</a></li><li><a href="https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related" target="_blank" rel="noreferrer">https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related</a></li><li><a href="https://www.uisdc.com/web-vitals" target="_blank" rel="noreferrer">https://www.uisdc.com/web-vitals</a></li></ul>',17),s=[o];function b(h,n,p,c,d,m){return t(),a("div",null,s)}const _=e(r,[["render",b]]);export{g as __pageData,_ as default};
