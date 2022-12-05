import{_ as i,c as e,o as l,a}from"./app.6143a61b.js";const P=JSON.parse('{"title":"\u8BF7\u6C42\u548C\u54CD\u5E94\u4F18\u5316","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u89E3\u51B3\u65B9\u6848","slug":"\u89E3\u51B3\u65B9\u6848","link":"#\u89E3\u51B3\u65B9\u6848","children":[]}],"relativePath":"optimization/response/index.md","lastUpdated":1670172988000}'),t={name:"optimization/response/index.md"},r=a('<h1 id="\u8BF7\u6C42\u548C\u54CD\u5E94\u4F18\u5316" tabindex="-1">\u8BF7\u6C42\u548C\u54CD\u5E94\u4F18\u5316 <a class="header-anchor" href="#\u8BF7\u6C42\u548C\u54CD\u5E94\u4F18\u5316" aria-hidden="true">#</a></h1><p>\u8BF7\u6C42\u548C\u54CD\u5E94\u4F18\u5316\u7684\u76EE\u7684\u662F\u66F4\u5FEB\u7684\u5185\u5BB9\u5230\u8FBE\u65F6\u95F4\u3002\u5B83\u7684\u6838\u5FC3\u601D\u8DEF\u662F\uFF1A</p><ul><li>\u66F4\u597D\u7684\u8FDE\u63A5\u4F20\u8F93\u6548\u7387\uFF0C\u5305\u62ECDNS\u67E5\u8BE2\u3001HTTP\u4E09\u6B21\u63E1\u624B\u8FDE\u63A5</li><li>\u66F4\u5C11\u7684\u8BF7\u6C42\u6570\u91CF\uFF0C\u51CF\u5C11\u5BA2\u6237\u7AEF\u5411\u670D\u52A1\u7AEF\u8BF7\u6C42\u6570\u91CF</li><li>\u66F4\u5C0F\u7684\u8D44\u6E90\u5927\u5C0F</li><li>\u5408\u9002\u7684\u7F13\u5B58\u7B56\u7565</li></ul><h2 id="\u89E3\u51B3\u65B9\u6848" tabindex="-1">\u89E3\u51B3\u65B9\u6848 <a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a></h2><ol><li>\u51CF\u5C11 DNS \u67E5\u627E\uFF1A\u6BCF\u6B21\u4E3B\u673A\u540D\u7684\u89E3\u6790\u90FD\u9700\u8981\u4E00\u6B21\u7F51\u7EDC\u5F80\u8FD4\uFF0C\u4ECE\u800C\u589E\u52A0\u4E86\u8BF7\u6C42\u7684\u5EF6\u8FDF\u65F6\u95F4\uFF0C\u540C\u65F6\u8FD8\u4F1A\u963B\u585E\u540E\u7EED\u7684\u8BF7\u6C42\u3002</li><li>\u91CD\u7528 TCP \u8FDE\u63A5\uFF1A\u5C3D\u53EF\u80FD\u7684\u4F7F\u7528\u6301\u4E45\u8FDE\u63A5\uFF0C\u4EE5\u6D88\u9664\u56E0 TCP \u63E1\u624B\u548C\u6162\u542F\u52A8\u5BFC\u81F4\u7684\u5EF6\u8FDF\u3002</li><li>\u51CF\u5C11 HTTP \u91CD\u5B9A\u5411\uFF1AHTTP \u51B2\u5B9A\u5411\u9700\u8981\u989D\u5916\u7684 DNS \u67E5\u8BE2\u3001TCP \u63E1\u624B\u7B49\u975E\u5E38\u8017\u65F6\uFF0C\u6700\u4F73\u7684\u91CD\u5B9A\u5411\u6B21\u6570\u4E3A0\u3002</li><li>\u538B\u7F29\u4F20\u8F93\u7684\u8D44\u6E90\uFF1A\u6BD4\u5982 Gzip\u3001\u56FE\u7247\u538B\u7F29\u3002</li><li>\u4F7F\u7528\u7F13\u5B58\uFF1A\u6BD4\u5982 HTTP \u7F13\u5B58\u3001CDN \u7F13\u5B58\u3001Service Worker \u7F13\u5B58\u3002</li><li>\u4F7F\u7528 CDN\uFF08\u5185\u5BB9\u5206\u53D1\u7F51\u7EDC\uFF09\uFF1A\u628A\u6570\u636E\u653E\u5728\u79BB\u7528\u6237\u5730\u7406\u4F4D\u7F6E\u66F4\u8FD1\u7684\u5730\u65B9\uFF0C\u53EF\u4EE5\u660E\u663E\u51CF\u5C11\u6BCF\u6B21 TCP \u8FDE\u63A5\u7684\u7F51\u7EDC\u5EF6\u8FDF\uFF0C\u589E\u5927\u541E\u5410\u91CF\u3002</li><li>\u5220\u9664\u6CA1\u6709\u5FC5\u8981\u8BF7\u6C42\u7684\u8D44\u6E90\u3002</li><li>\u5728\u5BA2\u6237\u7AEF\u7F13\u5B58\u8D44\u6E90\uFF1A\u7F13\u5B58\u5FC5\u8981\u7684\u5E94\u7528\u8D44\u6E90\uFF0C\u907F\u514D\u6BCF\u6B21\u90FD\u91CD\u590D\u8BF7\u6C42\u76F8\u540C\u7684\u5185\u5BB9\uFF0C\u4F8B\u5982\u591A\u56FE\u7247\u4E0B\u8F7D\u53EF\u4EE5\u8003\u8651\u4F7F\u7528\u7F13\u5B58\u3002</li><li>\u5185\u5BB9\u5728\u4F20\u8F93\u524D\u5148\u538B\u7F29\uFF1A\u4F20\u8F93\u6570\u636E\u4E4B\u524D\u5E94\u8BE5\u5148\u538B\u7F29\u5E94\u7528\u8D44\u6E90\uFF0C\u628A\u8981\u4F20\u8F93\u7684\u5B57\u8282\u51CF\u5C11\u5230\u6700\u5C0F\uFF0C\u5728\u538B\u7F29\u7684\u65F6\u5019\u786E\u4FDD\u5BF9\u6BCF\u79CD\u4E0D\u540C\u7684\u8D44\u6E90\u91C7\u7528\u6700\u597D\u7684\u538B\u7F29\u624B\u6BB5\u3002</li><li>\u6D88\u9664\u4E0D\u5FC5\u8981\u7684\u8BF7\u6C42\u5F00\u9500\uFF1A\u51CF\u5C11\u8BF7\u6C42\u7684 HTTP \u9996\u90E8\u6570\u636E\uFF08\u6BD4\u5982 HTTP COokie\uFF09</li><li>\u5E76\u884C\u5904\u7406\u8BF7\u6C42\u548C\u54CD\u5E94\uFF1A\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u6392\u961F\u90FD\u4F1A\u5BFC\u81F4\u5EF6\u8FDF\uFF0C\u53EF\u4EE5\u5C1D\u8BD5\u5E76\u884C\u7684\u5904\u7406\u8BF7\u6C42\u548C\u54CD\u5E94\uFF08\u5229\u7528\u591A\u4E2A HTTP1.1 \u8FDE\u63A5\u5B9E\u73B0\u5E76\u884C\u4E0B\u8F7D\uFF0C\u5728\u53EF\u80FD\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528 HTTP \u7BA1\u9053\u8BA1\u6570\uFF09\u3002</li><li>\u9488\u5BF9\u534F\u8BAE\u7248\u672C\u91C7\u53D6\u4F18\u5316\u63AA\u65BD\u3002\u5347\u7EA7\u5230 HTTP2.0\u3002</li><li>\u6839\u636E\u9700\u8981\u91C7\u7528\u670D\u52A1\u7AEF\u6E32\u67D3\u65B9\u5F0F\u3002\u8FD9\u79CD\u65B9\u5F0F\u53EF\u4EE5\u89E3\u51B3 SPA \u5E94\u7528\u9996\u5C4F\u6E32\u67D3\u6162\u7684\u95EE\u9898\u3002</li><li>\u91C7\u7528\u9884\u6E32\u67D3\u7684\u65B9\u5F0F\u5FEB\u901F\u52A0\u8F7D\u9759\u6001\u9875\u9762\u3002\u9875\u9762\u6E32\u67D3\u7684\u6781\u81F4\u6027\u80FD\uFF0C\u6BD4\u8F83\u9002\u5408\u9759\u6001\u9875\u9762\u3002</li></ol>',5),o=[r];function n(s,d,T,_,c,p){return l(),e("div",null,o)}const m=i(t,[["render",n]]);export{P as __pageData,m as default};