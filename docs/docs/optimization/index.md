## 什么是前端性能？
前端性能通常是指页面的访问速度。
## 为什么提升前端性能？
前端性能可以显著提升用户访问体验，提供用户活跃度和留存率。
## 如何提高前端性能？
两步走：
* 监控前端性能
* 优化前端性能

## 网站性能数据衡量
> https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API


## 性能优化-加载
* 理解加载瀑布图
* 基于HAR存储与重建性能信息
* 速度指数（Speed Index）
* 重要测量指标（TTFB、页面加载时间、首次渲染）

## 性能优化-响应
* 交互动作的反馈时间
* 帧率FPS（要足够高60FPS）
* 异步请求的完成时间（尽量在一秒之内完成）

## RAIL测量模型
### 什么是RAIL
* Response 响应
* Animation 动画
* Idle 空闲
* Load 加载

### RAIL评估标准
* 响应：处理事件应在50ms以内完成
* 动画：每10ms产生一帧
* 空闲：尽可能增加空闲时间
* 加载：在5s内完成内容加载并可以交互

### 性能测量工具
* Chrome Devtools开发调试、性能评测
* Lighthouse网站整体质量评估
* WebPageTest多测试地点、全面性能报告

#### WebPageTest
* waterfall chart请求瀑布图
* first view 首次访问
* repeat view 二次访问

#### Chrome Devtools
* Audit(Lighthouse)
* Throttling调整网络吞吐
* Performance性能分析
* Network网络加载分析

### 常用的性能测试APIs
* 关键时间节点(Navigation Timing， Resource Timing)
* 网络状态(Network APIs)
* 客户端服务端协商(HTTP Client Hints)&网页显示状态(UI APIs)

DNS 解析耗时: domainLookupEnd - domainLookupStart
TCP 连接耗时: connectEnd - connectStart
SSL 安全连接耗时: connectEnd - secureConnectionStart
网络请求耗时 (TTFB): responseStart - requestStart
数据传输耗时: responseEnd - responseStart
DOM 解析耗时: domInteractive - responseEnd
资源加载耗时: loadEventStart - domContentLoadedEventEnd
First Byte时间: responseStart - domainLookupStart
白屏时间: responseEnd - fetchStart
首次可交互时间: domInteractive - fetchStart
DOM Ready 时间: domContentLoadEventEnd - fetchStart
页面完全加载时间: loadEventStart - fetchStart
http 头部大小： transferSize - encodedBodySize
重定向次数：performance.navigation.redirectCount
重定向耗时: redirectEnd - redirectStart


