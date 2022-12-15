import{_ as t,c as a,o,b as e,d as r}from"./app.1f4db720.js";const N=JSON.parse('{"title":"白屏","description":"","frontmatter":{},"headers":[],"relativePath":"monitor/write-screen.md","lastUpdated":1671093649000}'),n={name:"monitor/write-screen.md"},s=e("h1",{id:"白屏",tabindex:"-1"},[r("白屏 "),e("a",{class:"header-anchor",href:"#白屏","aria-hidden":"true"},"#")],-1),c=e("p",null,"白屏指在当前用户浏览的页面中，界面的可见区域内不存在任何可浏览的内容。导致白屏的原因大致可以分为JavaScript执行错误和请求未返回两类。",-1),i=e("p",null,"JavaScript执行错误导致的白屏一般伴随着功能流程的阻断出现，并且很难通过等待或者页面刷新等方法修复。这类问题出现的原因通常是前端逻辑错误，或是后端接口的脏数据导致的前端数据解析逻辑错误，最终导致运行异常的JavaScript代码触发了页面崩溃，上述问题需要开发人员介入才能修复。例如，如果React中的组件发生了异常，并且外部没有使用componentDidCatch或者getDerivedStateFromError捕获错误，那么React组件render挂载的目标节点下的DOM树会被清空，页面就会出现白屏。在这种情况发生后，如果开发人员没有及时处理，用户经过多次尝试依然无法恢复，就会进行投诉。",-1),d=e("p",null,"请求未返回导致的白屏又可以细分为可恢复和不可恢复两类。",-1),_=e("p",null,"可恢复的白屏常见于第一次进入页面时，由于资源加载过慢或者接口请求未返回，所以浏览器无法执行下一步骤。这种白屏通常是网络状况太差或者设备性能太差等原因导致的，一般在浏览器返回后，就能恢复页面渲染，可以通过监控首屏时间来发现。如果生产环境的首屏时间呈异常上升趋势，那么一定是页面白屏时间过长导致的，开发人员应该及时关注并排查近期改动的代码。",-1),p=e("p",null,"不可恢复的白屏非常少见。这种白屏一般是CDN服务器异常、域名劫持等原因导致的，可以通过资源保障来建立防御性措施。",-1),l=e("p",null,"经过以上分析，开发人员需要重点关注的是JavaScript执行错误导致的白屏问题。请求未返回导致的白屏可以通过性能监控和资源保障进行防御，也可以通过实时监控进行处理。",-1),h=[s,c,i,d,_,p,l];function m(u,f,v,S,x,D){return o(),a("div",null,h)}const $=t(n,[["render",m]]);export{N as __pageData,$ as default};
