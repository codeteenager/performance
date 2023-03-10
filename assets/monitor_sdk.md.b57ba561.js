import{_ as s,c as a,o as n,a as p}from"./app.c2dac3e8.js";const l="/performance/monitor/6.png",A=JSON.parse('{"title":"SDK设计","description":"","frontmatter":{},"headers":[{"level":2,"title":"SDK接入设计","slug":"sdk接入设计","link":"#sdk接入设计","children":[]},{"level":2,"title":"SDK 运行设计","slug":"sdk-运行设计","link":"#sdk-运行设计","children":[]},{"level":2,"title":"上报策略设计","slug":"上报策略设计","link":"#上报策略设计","children":[{"level":3,"title":"日志数据过滤","slug":"日志数据过滤","link":"#日志数据过滤","children":[]},{"level":3,"title":"数据抽样策略","slug":"数据抽样策略","link":"#数据抽样策略","children":[]},{"level":3,"title":"上报机制选择","slug":"上报机制选择","link":"#上报机制选择","children":[]}]}],"relativePath":"monitor/sdk.md","lastUpdated":1671093649000}'),e={name:"monitor/sdk.md"},o=p('<h1 id="sdk设计" tabindex="-1">SDK设计 <a class="header-anchor" href="#sdk设计" aria-hidden="true">#</a></h1><p>性能 SDK，即为公司各个产品业务提供性能统计的 JS SDK。它包括 API 接口、工程引入、文档平台、开发调试工具，主要是将性能采集代码和上报策略封装在一起，通过采集首屏、白屏等指标数据，然后上报到性能平台后端进行处理。</p><p>由于性能 SDK 最终是给各个业务使用的，所以它的设计要满足在接入性能监控平台时，简单易用和运行平稳高效，这两个要求。</p><h2 id="sdk接入设计" tabindex="-1">SDK接入设计 <a class="header-anchor" href="#sdk接入设计" aria-hidden="true">#</a></h2><p>要保证SDK接入简单，容易使用，首先要把之前首屏、白屏和卡顿采集的脚本封装在一起，并让脚本自动初始化和运行。 <img src="'+l+`" alt=""></p><p>具体来说，首屏采集的分数计算部分 API（calculateScore）、变化率计算的 API（calFinallScore）和首屏图片时间计算 API（fmpImg）可以一起封装成 FMP API。其中首屏图片计算 API 因为比较独立，可以专门抽离成一个 util，供其他地方调用。白屏和卡顿采集也类似，可以封装成 FP API 和 BLOCK API。</p><p>还有一个 ExtensionAPI 接口，用来封装一些后续需要使用的数据，比如加载瀑布流相关的数据（将首屏时间细分为DNS、TCP连接等时间），这些数据可以通过浏览器提供的 performance 接口获得。</p><p>为了进行首屏、白屏、卡顿的指标采集，我们可以封装 Perf API，调用 FMP、FP、BLOCK、ExtensionAPI 四个 API 来完成。因为是调用 window.performance 接口，所以先做环境兼容性的判断，即看看浏览器是否支持 window.performance。</p><p>最终我们接入时只要安装一个 npm 包，然后初始化即可，具体代码如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">common</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Perf </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">S</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">perfInit</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">perfInit</span><span style="color:#A6ACCD;"> ()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>或者以外链的形式接入：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">https://s1.static.com/common/perf/static/js/1.0.0/perf.min.js</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">perfInit</span><span style="color:#F07178;"> ()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">catch</span><span style="color:#A6ACCD;"> (err) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">warn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>除了性能 SDK 自身的方案设计之外，提供帮助文档（如示例代码、 QA 列表等），也可以提高性能 SDK 的易用性。</p><p>具体来说，我们可以搭建一个简单的性能 SDK 网站，进入站点后，前端工程师可以看到使用文档，包括各种平台下如何接入，接入的示例代码是怎样的，接入性能 SDK 后去哪个 URL 看数据，遇到异常问题时怎么调试，等等。</p><p>另外，还可以设置性能分析小助手，快速定位一些基础问题。这个小助手怎么实现呢？我们在SDK 中通过检测访问页面的 URL 是不是加了调试参数（PERF_DEV_MODEL=PERF_DEV_MODEL），如果访问的页面 URL 中加了调试参数，打开页面后就可以看到一个性能分析小助手的圆形图标。通过它，前端工程师可以快速进入诊断模式，定位一些基础问题，如性能 SDK 初始化失败，采集数据异常，发送的请求参数不正确等问题。</p><p>但有时候前端工程师在接入时也会遇到帮助文档里也没有提供解决办法的问题。这时怎么办呢？可以借助代码存放的 Gitlab 平台，让前端工程师通过 issue 的方式提交问题，看到问题后我们及时回复解决。如果问题很紧急，也可以通过平台上的联系方式联系开发者，开发者解决完问题后，发布代码并通知前端工程师。</p><h2 id="sdk-运行设计" tabindex="-1">SDK 运行设计 <a class="header-anchor" href="#sdk-运行设计" aria-hidden="true">#</a></h2><p>SDK 如果想运行高效，必须有好的兼容性策略、容错机制和测试方案。</p><p>所谓兼容性策略，就是性能 SDK 可以在各个业务下都可以稳定运行。</p><p>我们知道，前端性能优化会面临的业务场景大致有：</p><ul><li>各类页面，如平台型页面、3C 类页面、中后台页面；</li><li>一些可视化搭建的平台，如用于搭建天猫双十一会场页这种用于交易运行页面的魔方系统；</li><li>各个终端，如 PC 端，移动端，小程序端等。</li></ul><p>这就要求性能 SDK 要能适应这些业务，及时采集性能指标并进行上报。那具体怎么做呢？</p><p>一般不同页面和终端，它们的技术栈也会不同，如 PC端页面使用 React，移动端页面使用 VUE 。这个时候，我们可以尽可能用原生 JavaScript 去做性能指标的采集，从而实现跨不同技术栈的采集。</p><p>不同终端方面，可以使用一个适配层来抹平采集方面的差异。具体来说，小程序端可以用有自己的采集 API，如 minaFMP，其他端可以直接用 FMP，这样在性能 SDK 初始化时，根据当前终端类型的不同，去调用各自的性能指标采集 API。</p><p>容错方面怎么做呢？</p><p>如果是性能 SDK 自身的报错，可以通过 try catch 的方式捕获到，然后上报异常监控平台。注意，不要因为 SDK 的报错而影响引入性能 SDK 页面的正常运行。</p><p>除此之外，好的自测和 QA 的测试也是性能 SDK 运行平稳的一大保障。</p><p>在开发 SDK 时，我们可以根据用户实际的浏览器和机型分布比例，确定 top10% 用户的机型和浏览器类型。然后在每次开发完成并进行代码 review 后，使用这些机型和浏览器类型进行自测。</p><p>另外，在升级性能 SDK 时，不论功能大小，为了保证不影响到所有业务方线上稳定运行，最好都进行一次冒烟测试用例。</p><h2 id="上报策略设计" tabindex="-1">上报策略设计 <a class="header-anchor" href="#上报策略设计" aria-hidden="true">#</a></h2><p>上报策略是指在性能指标采集完成后，上报到性能平台所采用的具体策略。比如通过 SDK 上报到性能平台后端，是数据直接上传还是做一些过滤处理，是全量上传数据还是抽样，是选择 H5 接口上报还是 native 接口上报，等等，这些都需要我们确定一下。</p><h3 id="日志数据过滤" tabindex="-1">日志数据过滤 <a class="header-anchor" href="#日志数据过滤" aria-hidden="true">#</a></h3><p>我的建议是，在采集性能指标之后，最好先对异常数据进行过滤。</p><p>异常数据分一般有两类，第一类是计算错误导致的异常数据，比如负值或者非数值数据，第二类是合法异常值、极大值、极小值，属于网络断掉或者超时形成的数值，比如 15s 以上的首屏时间。</p><p>负值的性能指标数据影响很大，它会严重拖低首屏时间，也会把计算逻辑导致负值的问题给掩盖掉。</p><p>还有首屏时间是非数值数据的时候也非常麻烦，比如首屏时间是 “200”，我这里使用引号是因为它是字符串类型，在采集过程中计算时，遇到加法时，会出现 “200”+30=20030，而不是你预期的 230 的情况。后来遇到负值数据和非数值数据后，我都会用程序打印日志记录，并上报到错误异常平台。</p><h3 id="数据抽样策略" tabindex="-1">数据抽样策略 <a class="header-anchor" href="#数据抽样策略" aria-hidden="true">#</a></h3><p>性能 SDK 上报数据是全量还是抽象，需要根据本身 App 或者网站的日活来确定，如果日活10万以下，那抽样就没必要了。如果是一款日活千万的 App，那就需要进行数据抽样了，因为如果上报全量日志的话，会耗费大量用户的流量和请求带宽。</p><p>除了在 SDK 里面设置抽样策略，业界还有通过服务器端下发数据抽样率的方式，来动态控制客户端向服务器端上报性能数据的量。比如，双十二运营活动当天，日活跃用户激增，抽样率由10%降低到5%，可以大大降低运营活动时统计服务器的负载。</p><h3 id="上报机制选择" tabindex="-1">上报机制选择 <a class="header-anchor" href="#上报机制选择" aria-hidden="true">#</a></h3><p>一般，为了节省流量，性能 SDK 也会根据网络能力，选择合适的上报机制。在强网环境（如 4G/WIFI），直接进行上报；在弱网（2G/3G）下，将日志存储到本地，延时到强网下再上报。</p><p>除了网络能力，我们还可以让 SDK 根据 App 忙碌状态，选择合适的上报策略。如果 App 处于空闲状态，直接上报；如果处于忙碌状态，等到闲时（比如凌晨 2-3 点）再进行上报。</p><p>除此之外，还有一些其他的策略，如批量数据上报，默认消息数量达到 30 条才上报，或者只在 App 启动时上报等策略，等等。你可以根据实际情况进行选择。</p><p>在上报能力选择方面，由于使用 native 接口上报时，SDK 可以复用客户端的请求连接，采取延时上报或者批量上报等策略。所以虽然我们支持 H5 和 native 两种接口上报方式，但实际工作中建议优先使用 native 接口进行数据上报。</p>`,44),t=[o];function r(c,i,D,d,F,y){return n(),a("div",null,t)}const m=s(e,[["render",r]]);export{A as __pageData,m as default};