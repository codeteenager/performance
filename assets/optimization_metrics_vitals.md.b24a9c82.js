import{_ as e,c as t,o as a,a as i}from"./app.6143a61b.js";const l="/performance/optimization/14.svg",m=JSON.parse('{"title":"Web Vitals","description":"","frontmatter":{},"headers":[{"level":2,"title":"Core Web Vitals \u4E0E Web Vitals","slug":"core-web-vitals-\u4E0E-web-vitals","link":"#core-web-vitals-\u4E0E-web-vitals","children":[]},{"level":2,"title":"\u6D4B\u91CF Web Vitals","slug":"\u6D4B\u91CF-web-vitals","link":"#\u6D4B\u91CF-web-vitals","children":[]},{"level":2,"title":"\u4F18\u5316 Web Vitals","slug":"\u4F18\u5316-web-vitals","link":"#\u4F18\u5316-web-vitals","children":[]},{"level":2,"title":"\u76F8\u5173\u6587\u7AE0","slug":"\u76F8\u5173\u6587\u7AE0","link":"#\u76F8\u5173\u6587\u7AE0","children":[]}],"relativePath":"optimization/metrics/vitals.md","lastUpdated":1670172988000}'),r={name:"optimization/metrics/vitals.md"},s=i('<h1 id="web-vitals" tabindex="-1">Web Vitals <a class="header-anchor" href="#web-vitals" aria-hidden="true">#</a></h1><p>Google \u5F00\u53D1\u4E86\u8BB8\u591A\u5B9E\u7528\u6307\u6807\u548C\u5DE5\u5177\uFF0C\u5E2E\u52A9\u8861\u91CF\u7528\u6237\u4F53\u9A8C\u548C\u8D28\u91CF\uFF0C\u4ECE\u800C\u53D1\u6398\u4F18\u5316\u70B9\u3002\u4E00\u9879\u540D\u4E3A Web Vitals \u7684\u8BA1\u5212\u964D\u4F4E\u4E86\u5B66\u4E60\u6210\u672C\uFF0C\u4E3A\u7F51\u7AD9\u4F53\u9A8C\u63D0\u4F9B\u4E86\u4E00\u7EC4\u7EDF\u4E00\u7684\u8D28\u91CF\u8861\u91CF\u6307\u6807 \u2014 Core Web Vitals\uFF0C\u5176\u4E2D\u5305\u62EC\u52A0\u8F7D\u4F53\u9A8C\u3001\u4EA4\u4E92\u6027\u548C\u9875\u9762\u5185\u5BB9\u7684\u89C6\u89C9\u7A33\u5B9A\u6027\u3002</p><p>\u6709\u5F88\u591A\u65B9\u6CD5\u53EF\u4EE5\u4F18\u5316\u7F51\u7AD9\u7684\u7528\u6237\u4F53\u9A8C\u3002\u82E5\u80FD\u9884\u5148\u4E86\u89E3\u6700\u4F73\u7684\u4F18\u5316\u8861\u91CF\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u5927\u5927\u8282\u7701\u65F6\u95F4\u548C\u6210\u672C\u3002</p><p>Google \u5728 2020 \u5E74 5 \u6708 5 \u65E5\u63D0\u51FA\u4E86\u65B0\u7684\u7528\u6237\u4F53\u9A8C\u91CF\u5316\u65B9\u5F0F Web Vitals \u6765\u8861\u91CF\u7F51\u7AD9\u7684\u7528\u6237\u4F53\u9A8C\uFF0C\u5E76\u5C06\u8FD9\u4E9B\u8861\u91CF\u7ED3\u679C\u7528\u4F5C\u5176\u6392\u540D\u7B97\u6CD5\u7684\u4E00\u90E8\u5206\u3002\u4E3A\u4E86\u66F4\u597D\u7684\u7406\u89E3\u8FD9\u4E9B\u5185\u5BB9\uFF0C\u8BA9\u6211\u4EEC\u6765\u770B\u770B\u8FD9\u4E9B\u91CD\u8981\u6307\u6807\u662F\u4EC0\u4E48\u3002</p><h2 id="core-web-vitals-\u4E0E-web-vitals" tabindex="-1">Core Web Vitals \u4E0E Web Vitals <a class="header-anchor" href="#core-web-vitals-\u4E0E-web-vitals" aria-hidden="true">#</a></h2><p>\u4EC0\u4E48\u662F Web Vitals\uFF0CGoogle \u7ED9\u51FA\u7684\u5B9A\u4E49\u662F \u4E00\u4E2A\u826F\u597D\u7F51\u7AD9\u7684\u57FA\u672C\u6307\u6807\uFF08Essential metrics for a healthy site\uFF09\uFF0C\u8FC7\u53BB\u8981\u8861\u91CF\u4E00\u4E2A\u7F51\u7AD9\u7684\u597D\u574F\uFF0C\u9700\u8981\u4F7F\u7528\u7684\u6307\u6807\u592A\u591A\u4E86\uFF0CWeb Vitals \u53EF\u4EE5\u7B80\u5316\u6307\u6807\u7684\u5B66\u4E60\u66F2\u7EBF\uFF0C\u53EA\u9700\u805A\u7126\u4E8E Web Vitals \u6307\u6807\u7684\u8868\u73B0\u5373\u53EF\u3002</p><p>\u5728\u8FD9\u4E9B Web Vitals \u4E2D\uFF0CGoogle \u786E\u5B9A\u4E86\u4E09\u4E2A\u4E3B\u8981\u8861\u91CF\u6307\u6807\uFF0C\u5373\u5728\u6240\u6709\u7C7B\u578B\u7684\u7F51\u7AD9\u4E2D\u901A\u7528\u7684 Core Web Vitals\uFF1A</p><blockquote><p>Core Web Vitals \u662F\u5E94\u7528\u4E8E\u6240\u6709 Web \u9875\u9762\u7684 Web Vitals \u7684\u5B50\u96C6\uFF0C\u662F\u5176\u6700\u91CD\u8981\u7684\u6838\u5FC3\u3002</p></blockquote><p><img src="'+l+'" alt=""></p><ul><li>\u52A0\u8F7D\u6027\u80FD\uFF08LCP\uFF09 \u2014 \u663E\u793A\u6700\u5927\u5185\u5BB9\u5143\u7D20\u6240\u9700\u65F6\u95F4</li><li>\u4EA4\u4E92\u6027\uFF08FID\uFF09 \u2014 \u9996\u6B21\u8F93\u5165\u5EF6\u8FDF\u65F6\u95F4</li><li>\u89C6\u89C9\u7A33\u5B9A\u6027\uFF08CLS\uFF09 \u2014 \u7D2F\u79EF\u5E03\u5C40\u914D\u7F6E\u504F\u79FB</li></ul><p>\u8FD9\u4E09\u4E2A\u6307\u6807\u5DF2\u7ECF\u7ECF\u8FC7\u4E86\u4E00\u6BB5\u65F6\u95F4\u7684\u9A8C\u8BC1\uFF0C\u5982 LCP \u5728 WICG \u5DF2\u7ECF\u5B75\u5316\u81F3\u5C11 1 \u5E74\u4EE5\u4E0A\uFF0CFID \u5728 Google Chrome Labs \u4E0A\u5DF2\u7ECF\u5B9E\u65BD 2 \u5E74\u4EE5\u4E0A\uFF0CLCP \u548C CLS\uFF08\u76F8\u5173 Layout Instability API\uFF09\u5DF2\u4E8E\u4ECA\u5E74\u5165 W3C \u8349\u62DF\u6807\u51C6\u3002</p><h2 id="\u6D4B\u91CF-web-vitals" tabindex="-1">\u6D4B\u91CF Web Vitals <a class="header-anchor" href="#\u6D4B\u91CF-web-vitals" aria-hidden="true">#</a></h2><ul><li>\u6027\u80FD\u6D4B\u8BD5\u5DE5\u5177\uFF0C\u6BD4\u5982 Lighthouse</li><li>\u4F7F\u7528 <a href="https://github.com/GoogleChrome/web-vitals" target="_blank" rel="noreferrer">web-vitals</a> \u5E93</li><li>\u4F7F\u7528\u6D4F\u89C8\u5668\u63D2\u4EF6 <a href="https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma" target="_blank" rel="noreferrer">Web Vitals</a></li></ul><h2 id="\u4F18\u5316-web-vitals" tabindex="-1">\u4F18\u5316 Web Vitals <a class="header-anchor" href="#\u4F18\u5316-web-vitals" aria-hidden="true">#</a></h2><ul><li><a href="https://web.dev/optimize-lcp/" target="_blank" rel="noreferrer">Optimize Largest Contentful Paint</a></li><li><a href="https://web.dev/optimize-fid/" target="_blank" rel="noreferrer">Optimize First Input Delay</a></li><li><a href="https://web.dev/optimize-cls/" target="_blank" rel="noreferrer">Optimize Cumulative Layout Shift</a></li></ul><h2 id="\u76F8\u5173\u6587\u7AE0" tabindex="-1">\u76F8\u5173\u6587\u7AE0 <a class="header-anchor" href="#\u76F8\u5173\u6587\u7AE0" aria-hidden="true">#</a></h2><ul><li><a href="https://web.dev/vitals/" target="_blank" rel="noreferrer">https://web.dev/vitals/</a></li><li><a href="https://juejin.cn/post/6844904168591736846" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904168591736846</a></li><li><a href="https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related" target="_blank" rel="noreferrer">https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related</a></li><li><a href="https://www.uisdc.com/web-vitals" target="_blank" rel="noreferrer">https://www.uisdc.com/web-vitals</a></li></ul>',17),o=[s];function b(h,n,p,d,c,g){return a(),t("div",null,o)}const w=e(r,[["render",b]]);export{m as __pageData,w as default};
