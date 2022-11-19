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
                            text: "优化",
                            link: "/optimization/render",
                        }
                    ],
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