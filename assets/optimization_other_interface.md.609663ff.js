import{_ as e,c as a,o as i,a as t}from"./app.1727c0d7.js";const u=JSON.parse('{"title":"接口优化","description":"","frontmatter":{},"headers":[{"level":2,"title":"接口服务调用优化","slug":"接口服务调用优化","link":"#接口服务调用优化","children":[{"level":3,"title":"接口合并","slug":"接口合并","link":"#接口合并","children":[]},{"level":3,"title":"接口上CDN","slug":"接口上cdn","link":"#接口上cdn","children":[]},{"level":3,"title":"接口域名上CDN","slug":"接口域名上cdn","link":"#接口域名上cdn","children":[]},{"level":3,"title":"接口降级","slug":"接口降级","link":"#接口降级","children":[]},{"level":3,"title":"接口监控","slug":"接口监控","link":"#接口监控","children":[]}]},{"level":2,"title":"接口缓存策略优化","slug":"接口缓存策略优化","link":"#接口缓存策略优化","children":[{"level":3,"title":"Ajax/fetch缓存","slug":"ajax-fetch缓存","link":"#ajax-fetch缓存","children":[]},{"level":3,"title":"本地缓存","slug":"本地缓存","link":"#本地缓存","children":[]},{"level":3,"title":"多次请求","slug":"多次请求","link":"#多次请求","children":[]}]}],"relativePath":"optimization/other/interface.md","lastUpdated":1670948464000}'),r={name:"optimization/other/interface.md"},h=t('<h1 id="接口优化" tabindex="-1">接口优化 <a class="header-anchor" href="#接口优化" aria-hidden="true">#</a></h1><h2 id="接口服务调用优化" tabindex="-1">接口服务调用优化 <a class="header-anchor" href="#接口服务调用优化" aria-hidden="true">#</a></h2><h3 id="接口合并" tabindex="-1">接口合并 <a class="header-anchor" href="#接口合并" aria-hidden="true">#</a></h3><p>这个是指一个页面的众多的业务接口和依赖的第三方接口统一使一个部署在集群的接口统一调用，以减少页面接口请求数。比如前端页面调用了N个业务的接口，可能有第三方的、自己部门的，这样页面请求数较多，我们把这些接口都统一放在一个集群中，通过这个集群提供统一的一个接口入口。</p><h3 id="接口上cdn" tabindex="-1">接口上CDN <a class="header-anchor" href="#接口上cdn" aria-hidden="true">#</a></h3><p>主要基于接口心梗考虑，我们可以把不需要实时更新的接口同步至CDN，等此接口内容变更之后自动同步至CDN集群上。如果一定时间内未请求到数据，会用源站接口再次请求。这个其实是双层接口的概念，本地的接口更新的时候同步到CDN集群上，这个时候就做了一个备份，提高了性能。</p><h3 id="接口域名上cdn" tabindex="-1">接口域名上CDN <a class="header-anchor" href="#接口域名上cdn" aria-hidden="true">#</a></h3><p>我们申请的域名是从外面申请的，这个域名并没有上到CDN上，CDN也不会对这个域名进行特殊的解析处理，以及针对某个城市地域进行解析处理，我们把域名上到CDN之后，就会根据城市地域选择最快的解析方式，可以增强可用性，稳定性。</p><h3 id="接口降级" tabindex="-1">接口降级 <a class="header-anchor" href="#接口降级" aria-hidden="true">#</a></h3><p>这个基于大促备战考虑，核心接口进行降级用基础接口进行业务实现，比如千人千面的推荐接口，在大促时间点可以直接运营编辑的数据。另外接口万一无法访问，使用预设好的垫底备份数据。</p><h3 id="接口监控" tabindex="-1">接口监控 <a class="header-anchor" href="#接口监控" aria-hidden="true">#</a></h3><p>监控接口成功率，不是常说的TP99，而是和用户实际情况一致的成功和失败监控，包括比如弱网、超时、网络异常、网络切换等情况。排查出来问题需要联合后端、运维、网络岗位人员一起解决。这种监控可以在ajax请求中把超时的信息包括用户的信息上报上去，方便后续查找问题。</p><h2 id="接口缓存策略优化" tabindex="-1">接口缓存策略优化 <a class="header-anchor" href="#接口缓存策略优化" aria-hidden="true">#</a></h2><h3 id="ajax-fetch缓存" tabindex="-1">Ajax/fetch缓存 <a class="header-anchor" href="#ajax-fetch缓存" aria-hidden="true">#</a></h3><p>前端请求时候带上cache，依赖浏览器本身缓存机制，这种比较适用于没有经常变更的数据，不需要实时更新。当我们第二次请求的时候带上cache，就从浏览器中获取缓存数据。从而减少服务器的压力。</p><h3 id="本地缓存" tabindex="-1">本地缓存 <a class="header-anchor" href="#本地缓存" aria-hidden="true">#</a></h3><p>异步接口数据优先使用本地localStorage中的缓存数据，当我们接口请求完数据之后，我们把第一次请求完的数据存储到localstorage中，同时记录下数据的md5值，第二次用户来的时候查看md5值有没有变更，变更了重新请求数据，并存储到localstorage中，如果没有变更，把数据返回给用户显示。这样减少服务器的压力，不用实时请求服务端的接口。</p><h3 id="多次请求" tabindex="-1">多次请求 <a class="header-anchor" href="#多次请求" aria-hidden="true">#</a></h3><p>接口数据本地无localStorage缓存数据，重新再次发起ajax请求。当网络特别差的时候，用户请求接口这个时候会超时，在第二次或第三次请求的时候延迟设置超时时间，比如是3秒，当第一次请求的时候没有数据，判断是弱网，在3秒后再次请求数据，那么有可能网络已经很好了，这时候就把数据展示到页面中。大大提高了接口的成功率。</p>',19),d=[h];function l(n,c,s,o,p,_){return i(),a("div",null,d)}const x=e(r,[["render",l]]);export{u as __pageData,x as default};
