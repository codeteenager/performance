import{_ as e,c as a,o as i,a as r}from"./app.c2dac3e8.js";const l="/performance/monitor/4.png",x=JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[{"level":2,"title":"为什么做前端监控?","slug":"为什么做前端监控","link":"#为什么做前端监控","children":[]},{"level":2,"title":"性能优化体系概览","slug":"性能优化体系概览","link":"#性能优化体系概览","children":[{"level":3,"title":"第一部分，性能优化流程","slug":"第一部分-性能优化流程","link":"#第一部分-性能优化流程","children":[]},{"level":3,"title":"第二部分，性能指标采集与上报","slug":"第二部分-性能指标采集与上报","link":"#第二部分-性能指标采集与上报","children":[]},{"level":3,"title":"第三部分，性能监控预警平台","slug":"第三部分-性能监控预警平台","link":"#第三部分-性能监控预警平台","children":[]}]},{"level":2,"title":"如何设定性能关键指标？","slug":"如何设定性能关键指标","link":"#如何设定性能关键指标","children":[{"level":3,"title":"关注什么样的指标？","slug":"关注什么样的指标","link":"#关注什么样的指标","children":[]},{"level":3,"title":"性能优化关键指标设定及标准","slug":"性能优化关键指标设定及标准","link":"#性能优化关键指标设定及标准","children":[]}]},{"level":2,"title":"加载关键指标","slug":"加载关键指标","link":"#加载关键指标","children":[{"level":3,"title":"白屏时间","slug":"白屏时间","link":"#白屏时间","children":[]},{"level":3,"title":"首屏时间","slug":"首屏时间","link":"#首屏时间","children":[]}]}],"relativePath":"monitor/index.md","lastUpdated":1670927597000}'),h={name:"monitor/index.md"},t=r('<h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h1><p>我们在工作中经常会遇到首页打开缓慢，这类情况原因很多，我们希望通过查日志就能定位平台问题，而不是停留在猜测层面。那么，前端有没有这样的工具呢？有，那就是性能监控平台。平台上面有各个业务的性能指标及其对应场景下的性能标准，一旦遇到性能问题，就能直接判断当前性能数据有没有问题，然后提示问题是出在前端、后端，还是网络层，进而从前端性能体系来系统考虑性能优化。</p><p>我们更多希望在什么场景下，遇到了什么性能问题，围绕什么样的性能指标，采取了哪些性能优化手段，最后取得了什么样的结果，而不仅仅是只了解有哪些优化手段。</p><h2 id="为什么做前端监控" tabindex="-1">为什么做前端监控? <a class="header-anchor" href="#为什么做前端监控" aria-hidden="true">#</a></h2><ol><li>更快发现问题和解决问题，在用户反馈之前自己发现问题并解决。</li><li>做产品的决策依据，产品发布之后有没有人用，pv、uv多少可以知道。</li><li>提升前端工程师的技术深度和广度，打造简历亮点，什么是亮点？就是有技术难度，推进产品的改进。</li><li>为业务扩展提供了更多可能性，有了数据之后提供更多的业务功能。</li></ol><h2 id="性能优化体系概览" tabindex="-1">性能优化体系概览 <a class="header-anchor" href="#性能优化体系概览" aria-hidden="true">#</a></h2><p>性能优化体系主要包括三部分：性能优化流程、性能指标采集及上报、性能监控预警平台。 <img src="'+l+'" alt=""></p><h3 id="第一部分-性能优化流程" tabindex="-1">第一部分，性能优化流程 <a class="header-anchor" href="#第一部分-性能优化流程" aria-hidden="true">#</a></h3><p>对应图中灰色部分，主要包括性能指标设定、性能标准确定、收益评估、诊断清单、优化手段、性能立项、性能实践。</p><p>其中，性能指标设定，说的是我们要选择什么样的指标。比如页面打开慢，我们想要优化它，该从哪些地方入手，优化完后怎么知道问题解决了？这些就需要明确的指标来衡量。</p><p>在设定指标之后，接下就是确定性能标准。也就是我们性能优化目标是怎样的，优化到什么程度合适。例如，我们要优化 App 里面的 H5 页面打开速度，确定的指标是秒开率，那一秒内可以打开的请求比例就是它的性能标准。</p><p>除了判断性能指标是否优化到位，我们还需要关联产品目标进行收益评估。比如，列表页到详情页的转化率能不能提升？用户跳出率可不可降低？</p><p>接下来，我们就可以把业务代码接入性能监控预警平台，根据性能标准给出诊断清单。假如诊断出性能问题，我们就可以结合性能标准和诊断清单，确定相应的优化手段。</p><p>最后是性能实践，即经过优化之后发起项目上线，并跟踪进行效果评估，结合场景把这些项目成果以文档或代码的形式沉淀下来，给后来者使用参考。</p><p>制订优化实践，确保新人也可以执行，是优化成果得以长期保持的必要保障。比如之前有个同事通过懒加载解决了滚动列表下拉慢的问题，后来的新同事再遇到同样问题，就可以通过查看这个文档快速解决。</p><h3 id="第二部分-性能指标采集与上报" tabindex="-1">第二部分，性能指标采集与上报 <a class="header-anchor" href="#第二部分-性能指标采集与上报" aria-hidden="true">#</a></h3><p>对应着图中紫色部分，它的主要内容是把前面提到的性能指标以代码的形式分解落地，确保可以采集，然后在 SDK 封装后集合统计埋点，最后根据实际情况，制定上报策略。</p><p>在上报之前，我们还需要注意将一些“脏数据”（也就是明显异常的数据）丢弃掉，避免占用用户网络带宽。</p><h3 id="第三部分-性能监控预警平台" tabindex="-1">第三部分，性能监控预警平台 <a class="header-anchor" href="#第三部分-性能监控预警平台" aria-hidden="true">#</a></h3><p>对应图中橙色部分，主要是通过分析上一步采集到的性能数据，再对比性能标准进行监控。当指标超过某一监控阈值时，性能监控预警平台会通过邮件或者短信，给我们发送预警信息。</p><p>在构造上，性能监控预警平台包括：性能数据处理后台和性能可视化展现前台两部分。</p><p>其中，性能数据处理后台，主要是在性能采集数据上报到性能平台后，对数据进行预处理、数据清洗和数据计算，然后生成前台可视化所需数据。</p><p>性能可视化展现前台包括性能展示、性能监控预警，主要是对核心数据指标进行可视化展现，对性能数据波动进行监控，对超出阈值的数据给出短信或邮件报警。</p><p>为了确保没问题，在上线前一定要做性能专项测试，检查一下你采取的措施和性能优化预期是否一致。比如，能否正确发出请求，请求处理流程是否正确，性能平台数据能否展现。如果不一致，那就得继续优化。</p><h2 id="如何设定性能关键指标" tabindex="-1">如何设定性能关键指标？ <a class="header-anchor" href="#如何设定性能关键指标" aria-hidden="true">#</a></h2><p>设定性能关键指标包括两部分，一个是关注什么样的指标，一个是关键指标的设定及标准。</p><h3 id="关注什么样的指标" tabindex="-1">关注什么样的指标？ <a class="header-anchor" href="#关注什么样的指标" aria-hidden="true">#</a></h3><p>要确定关键的性能指标，必须满足两点：</p><ul><li>可衡量，就是可以通过代码来度量；</li><li>关注以用户为中心的关键结果和真实体验。</li></ul><p>所谓关键结果，就是用户真正关心什么。举例来说，当用户进入商品详情页面，他关心的是这个商品怎么样，什么价格，具体到页面上就是商品描述、商品头图、商品价格和购买按钮这些关键信息。我们要保证无论什么情况下都能让用户看到这些信息。</p><p>而真实体验，就是用户使用产品的感受。比如当用户进入列表页，在滑动过程中，页面加载突然跳出一个弹窗，他会不会觉得烦？这就是一种真实体验。</p><h3 id="性能优化关键指标设定及标准" tabindex="-1">性能优化关键指标设定及标准 <a class="header-anchor" href="#性能优化关键指标设定及标准" aria-hidden="true">#</a></h3><p>在性能指标方面，主要是加载、交互性和视觉稳定性这三个层面。</p><h4 id="加载" tabindex="-1">加载 <a class="header-anchor" href="#加载" aria-hidden="true">#</a></h4><p>加载，就是进入页面时，页面内容的载入过程。比如，当你打开一些网站时，你会发现，有的网站首页上的文字、图片出现很缓慢，而有的则很快，这个内容出现的过程就是加载。加载缓慢严重消耗用户的耐心，会让用户离开页面。</p><h4 id="交互性" tabindex="-1">交互性 <a class="header-anchor" href="#交互性" aria-hidden="true">#</a></h4><p>交互，就是用户点击网站或 App 的某个功能，页面给出的回应。比如我们点击了一个“点赞”按钮，立刻给出了点赞数加一的展示，这就是交互体验好，反之如果很长时间都没回应，这就是交互体验不好。</p><h4 id="视觉稳定性" tabindex="-1">视觉稳定性 <a class="header-anchor" href="#视觉稳定性" aria-hidden="true">#</a></h4><p>视觉稳定性指标，我们叫它 CLS（Cumulative Layout Shift），也就是布局偏移量，它是指页面从一帧切换到另外一帧时，视线中不稳定元素的偏移情况。</p><p>比如，你想要购买的商品正在参加抢购活动，而且时间快要到了。在你正要点击页面链接购买的时候，原来的位置插入了一条 9.9 元包邮的商品广告。结果会怎样？你点成了那个广告商品。如果等你再返回购买的时候，你心仪商品的抢购活动结束了，所以，CLS也非常重要。</p><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h4><p>在性能优化关键指标方面，目前业界主要集中在加载方面，特别是白屏时间和首屏时间。它们直接和用户体验相关，且相关的衡量标准已经达成共识。在采集方式上，除了手动采集之外，还可以自动化采集。而交互性和视觉稳定性关键指标，业界还在探索，没有统一的衡量标准，且必须手动采集。</p><p>比如交互方面，有的公司用 FID 指标 （First Input Delay，首次输入延迟）， 指标必须尽量小于 100ms，如果过长会给人页面卡顿的感觉。还有的公司使用 PSI（Perceptual Speed Index，视觉变化率），衡量标准是小于20%。</p><p>而视觉稳定性指标CLS 比较前沿，2020 年 5 月 Google 公司才发布了一篇文章关于 CLS 指标定义及相关介绍的文章。它的采集方法，除了依赖 Google 的 Lighthouse 做本地采集，目前还没有好的方案。在应用上，其他公司或者沿用 Google 的或者很少使用。</p><h2 id="加载关键指标" tabindex="-1">加载关键指标 <a class="header-anchor" href="#加载关键指标" aria-hidden="true">#</a></h2><p>加载关键指标主要是白屏时间和首屏时间。</p><h3 id="白屏时间" tabindex="-1">白屏时间 <a class="header-anchor" href="#白屏时间" aria-hidden="true">#</a></h3><p>它指的是从输入内容回车（包括刷新、跳转等方式）后，到页面开始出现第一个字符的时间。这个过程包括 DNS 查询，建立 TCP 连接，发送首个HTTP请求（如果使用HTTPS还要介入 TLS 的验证时间），返回HTML文档，HTML文档 Head 解析完毕。它的标准时间是 300ms。</p><p>如果白屏时间过长，用户会认为我们的页面不可用，或者可用性差。如果超过一定时间（如 1s），用户注意力就会转移到其他页面。</p><p>哪些因素会导致白屏时间过长？原因有很多，有可能是 DNS 查询时间长，建立 TCP 请求链接太慢，或者是服务器处理请求速度太慢，客户端下载、解析、渲染时长过长，没有做 Gzip 压缩，缺乏本地离线化处理，等等。</p><h3 id="首屏时间" tabindex="-1">首屏时间 <a class="header-anchor" href="#首屏时间" aria-hidden="true">#</a></h3><p>首屏时间=白屏时间+渲染时间。它是指从浏览器输入地址并回车后，到首屏内容渲染完毕的时间。这期间不需要滚动鼠标或者下拉页面，否则无效。</p><p>在加载性能指标方面，相比于白屏时间，首屏时间更重要。为什么？</p><ol><li><p>从重要性角度看，打开页面后，第一眼看到的内容一般都非常关键，比如电商的头图、商品价格、购买按钮等。这些内容即便在最恶劣的网络环境下，我们也要确保用户能看得到。</p></li><li><p>从体验完整性角度看，进入页面后先是白屏，随着第一个字符加载，到首屏内容显示结束，我们才会认为加载完毕，用户可以使用了。白屏加载完成后，仅仅意味着页面内容开始加载，但我们还是没法完成诸如下单购买等实际操作，首屏时间结束后则可以。</p></li></ol><p>首屏时间的标准，最初只是根据这个页面对时间是否敏感来判定，主要以用户平均首屏加载时间来计算，并没有详细区分 2G/3G/4G/WiFi 这些网络环境。后来引入了秒开率的指标，即 1s 内打开用户的占比。这个概念最早来自阿里巴巴，后来被业界普遍采用。</p><p>首屏时间进一步拆分可以拆分为白屏时间、数据接口响应时间、图片加载资源等。 白屏时间前面已经提到了，数据接口响应时间可以直接从后端服务中获取，不需要前端再重复计算，我们只需取完放在性能平台即可。最后的图片资源需要我们单独采集。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>可以使用<a href="https://gtmetrix.com/" target="_blank" rel="noreferrer">https://gtmetrix.com/</a>来测试网站加载速度。</p></div>',57),d=[t];function p(n,s,c,o,u,_){return i(),a("div",null,d)}const m=e(h,[["render",p]]);export{x as __pageData,m as default};