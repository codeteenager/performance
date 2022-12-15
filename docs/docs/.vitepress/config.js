module.exports = {
    title: '性能监控与优化',
    description: '前端性能监控与优化',
    base: '/performance/',
    head: [
        ['link', { rel: 'icon', href: '/performance/favicon.ico' }]
    ],
    markdown: {
        lineNumbers: true, //显示代码行数
    },
    lastUpdated: true,
    themeConfig: {
        nav: [
            {
                text: '监控',
                link: "/monitor/index"
            },
            {
                text: '优化',
                link: "/optimization/index"
            }
        ],
        outlineTitle: '在本页面',
        lastUpdatedText: '最近更新时间',
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/performance" }],
        sidebar: {
            "/optimization/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "介绍",
                            link: "/optimization/index",
                        },
                        {
                            text: "页面的生命周期",
                            link: "/optimization/lifecycle",
                        },
                        {
                            text: "分享",
                            link: "/optimization/share",
                        }
                    ],
                },
                {
                    text: "Web性能指标",
                    collapsible: true,
                    items: [
                        {
                            text: "介绍",
                            link: "/optimization/metrics/index",
                        },
                        {
                            text: "RAIL性能模型",
                            link: "/optimization/metrics/rail",
                        },
                        {
                            text: "基于用户体验的性能指标",
                            link: "/optimization/metrics/metrics",
                        },
                        {
                            text: "Web Vitals",
                            link: "/optimization/metrics/vitals",
                        },
                        {
                            text: "其他性能指标",
                            link: "/optimization/metrics/other",
                        },
                    ],
                },
                {
                    text: "Web性能测试",
                    collapsible: true,
                    items: [
                        {
                            text: "介绍",
                            link: "/optimization/test/index",
                        },
                        {
                            text: "灯塔Lighthouse",
                            link: "/optimization/test/lighthouse",
                        },
                        {
                            text: "WebPageTest",
                            link: "/optimization/test/webpagetest",
                        },
                        {
                            text: "Chrome Devtools",
                            link: "/optimization/test/chrome-devtools",
                        },
                        {
                            text: "性能测量APIs",
                            link: "/optimization/test/apis",
                        },
                    ]
                },
                {
                    text: "请求和响应优化",
                    collapsible: true,
                    items: [
                        {
                            text: "介绍",
                            link: "/optimization/response/index",
                        },
                        {
                            text: "DNS解析",
                            link: "/optimization/response/dns",
                        },
                        {
                            text: "HTTP长连接",
                            link: "/optimization/response/http",
                        },
                        {
                            text: "HTTP2",
                            link: "/optimization/response/http2",
                        },
                        {
                            text: "避免重定向",
                            link: "/optimization/response/redirect",
                        },
                        {
                            text: "压缩构建的数据资源",
                            link: "/optimization/response/compress",
                        },
                        {
                            text: "HTTP缓存",
                            link: "/optimization/response/http-cache",
                        },
                        {
                            text: "CDN缓存",
                            link: "/optimization/response/cdn-cache",
                        },
                        {
                            text: "Push缓存",
                            link: "/optimization/response/push-cache",
                        },
                        {
                            text: "Service Worker缓存",
                            link: "/optimization/response/service-worker",
                        },
                        {
                            text: "服务端性能优化",
                            link: "/optimization/response/ssr",
                        },
                        {
                            text: "浏览器存储",
                            link: "/optimization/response/browser-cache",
                        },
                    ]
                },
                {
                    text: "渲染优化",
                    collapsible: true,
                    items: [
                        {
                            text: "介绍",
                            link: "/optimization/render/index",
                        },
                        {
                            text: "关键渲染路径优化",
                            link: "/optimization/render/path",
                        },
                        {
                            text: "JavaScript执行优化",
                            link: "/optimization/render/javascript-execution",
                        },
                        {
                            text: "计算样式优化",
                            link: "/optimization/render/style-computed",
                        },
                        {
                            text: "页面布局与重绘优化",
                            link: "/optimization/render/repaint-reflow",
                        },
                        {
                            text: "合成处理",
                            link: "/optimization/render/compose",
                        }
                    ]
                },
                {
                    text: "资源优化",
                    collapsible: true,
                    items: [
                        {
                            text: "资源优先级",
                            link: "/optimization/resource/priority"
                        },
                        {
                            text: "图片优化",
                            link: "/optimization/resource/image",
                        },
                        {
                            text: "压缩&合并",
                            link: "/optimization/resource/compress",
                        },
                    ]
                },
                {
                    text: "代码优化",
                    collapsible: true,
                    items: [
                        {
                            text: "HTML优化",
                            link: "/optimization/code/html"
                        },
                        {
                            text: "CSS优化",
                            link: "/optimization/code/css"
                        },
                        {
                            text: "JavaScript优化",
                            link: "/optimization/code/javascript"
                        }
                    ]
                },
                {
                    text: "其他优化技术",
                    collapsible: true,
                    items: [
                        {
                            text: "懒加载和预加载",
                            link: "/optimization/other/load",
                        },
                        {
                            text: "骨架屏",
                            link: "/optimization/other/skeleton"
                        },
                        {
                            text: "接口优化",
                            link: "/optimization/other/interface"
                        },
                        {
                            text: "webpack优化",
                            link: "/optimization/other/webpack"
                        }
                    ]
                }
            ],
            "/monitor/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "介绍",
                            link: "/monitor/index",
                        },
                        {
                            text: "前端监控内容",
                            link: "/monitor/content",
                        },
                        {
                            text: "前端采集脚本",
                            link: "/monitor/collect",
                        },
                        {
                            text: "异常监控",
                            link: "/monitor/exception",
                        },
                        {
                            text: "接口监控",
                            link: "/monitor/interface",
                        },
                        {
                            text: "性能监控",
                            link: "/monitor/performance",
                        },
                        {
                            text: "白屏",
                            link: "/monitor/write-screen",
                        },
                        {
                            text: "SDK设计",
                            link: "/monitor/sdk",
                        },
                        {
                            text: "前端性能平台",
                            link: "/monitor/platform",
                        },
                        {
                            text: "性能专项测试",
                            link: "/monitor/test",
                        },
                        {
                            text: "相关资料",
                            link: "/monitor/learn",
                        },
                    ],
                }
            ],
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        }
    }
}