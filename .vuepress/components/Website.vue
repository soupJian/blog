<template>
    <div class="navigation-container">
        <div class="sidebar">
            <div
                v-for="(category, index) in categories"
                :key="index"
                class="tab"
                :class="{ active: activeCategory === category.name }"
                @click="activeCategory = category.name"
            >
                {{ category.name }}
            </div>
        </div>
        <div class="content">
            <div class="links">
                <div v-for="(link, index) in activeLinks" :key="index" class="link-item">
                    <a :href="link.url" target="_blank">{{ link.title }}</a>
                    <p class="link-description">{{ link.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeCategory: "React",
            categories: [
                {
                    name: "React",
                    links: [
                        {
                            title: "React 官网",
                            url: "https://react.dev/",
                            description: "React官方网站",
                        },
                        {
                            title: "React 中文网",
                            url: "https://zh-hans.react.dev/",
                            description: "React中文文档",
                        },
                        {
                            title: "redux中文文档",
                            url: "https://www.reduxjs.cn/",
                            description: "redux中文文档",
                        },
                        {
                            title: "ahooks",
                            url: "https://ahooks.js.org/zh-CN/",
                            description: "React Hooks 库，提供了一系列实用的 Hooks 来简化 React 开发。",
                        },
                        {
                            title: "Redux笔记-老陈打码",
                            url: "https://malun666.github.io/aicoder_vip_doc/#/pages/vip_3redux?id=redux-%E6%95%99%E7%A8%8B",
                            description: "redux笔记-老陈打码",
                        },
                        {
                            title: "Umi",
                            url: "https://v3.umijs.org/zh-CN",
                            description: "Umi 是一个可扩展的企业级前端应用框架，基于 React 和 TypeScript 构建。",
                        },
                        {
                            title: "Ant Design",
                            url: "https://ant.design/",
                            description:
                                "Ant Design 是一套企业级 UI 设计语言和 React 组件库，主要用于研发企业级中后台产品。",
                        },
                        {
                            title: "Antd Pro",
                            url: "https://beta-pro.ant.design/index-cn",
                            description:
                                "Ant Design Pro 是一个开箱即用的中台前端/设计解决方案，基于 Ant Design 和 UmiJS 构建。",
                        },
                        {
                            title: "Procomponents",
                            url: "https://procomponents.ant.design",
                            description:
                                "Ant Design Pro 是一个开箱即用的中台前端/设计解决方案，基于 Ant Design 和 UmiJS 构建。",
                        },
                    ],
                },
                {
                    name: "Next",
                    links: [
                        {
                            title: "Next.js 官网",
                            url: "https://nextjs.org/",
                            description: "The official website of Next.js",
                        },
                        {
                            title: "shadcn",
                            url: "https://ui.shadcn.com/",
                            description:
                                "shadcn 是一个基于 Radix UI 和 Tailwind CSS 构建的组件库，提供了一系列可定制的 UI 组件。",
                        },
                    ],
                },
                {
                    name: "Vue",
                    links: [
                        {
                            title: "Vue官网",
                            url: "https://vuejs.org/",
                            description: "The official website of Vue.js",
                        },
                        {
                            title: "Vue Router",
                            url: "https://router.vuejs.org/",
                            description: "Documentation for Vue Router",
                        },
                        {
                            title: "pinia",
                            url: "https://pinia.vuejs.org",
                            description: "Pinia 是 Vue.js 的状态管理库，提供了简单易用的 API 和 TypeScript 支持。",
                        },
                        {
                            title: "Vue技术揭秘",
                            url: "https://ustbhuangyi.github.io/vue-analysis/",
                            description: "Vue技术揭秘",
                        },
                    ],
                },
                {
                    name: "Blog",
                    links: [
                        {
                            title: "codebrickape 的 blog",
                            url: "https://codebrickape.lhzzs.top/",
                            description: "codebrickape的开发记录",
                        },
                        {
                            title: "zuo的日常分享",
                            url: "http://zuo11.com/",
                            description: "博客 | 笔记 | Food | Github",
                        },
                        {
                            title: "云卷云舒的blog",
                            url: "https://blog.csdn.net/qq_39290323",
                            description: "云卷云舒的blog",
                        },
                        {
                            title: "react官网性能分析",
                            url: "https://juejin.cn/post/7128369638794231839",
                            description: "react网站性能分析详细解读",
                        },
                        {
                            title: "前端进阶之旅",
                            url: "https://interview.poetries.top/",
                            description: "面试必备前端基础知识梳理",
                        },
                        {
                            title: "es6-阮一峰",
                            url: "https://es6.ruanyifeng.com/",
                            description: "阮一峰对es6的理解",
                        },
                        {
                            title: "老陈打码",
                            url: "https://www.cpengx.cn/",
                            description: "B站老陈打码",
                        },
                    ],
                },
                {
                    name: "npm",
                    links: [
                        {
                            title: "npmjs官网",
                            url: "https://www.npmjs.com/",
                            description: "npmjs官网",
                        },
                        {
                            title: "BetterScroll",
                            url: "https://better-scroll.github.io/docs/zh-CN/",
                            description:
                                "BetterScroll 是一款高性能的滚动插件，支持移动端和 PC 端，提供了丰富的 API 和事件。",
                        },
                        {
                            title: "Swiper",
                            url: "https://swiperjs.com/",
                            description:
                                "Swiper 是一款现代化的移动端触控滑块库，支持多种布局和效果，适用于移动端和桌面端。",
                        },
                        {
                            title: "embla-carousel",
                            url: "https://www.embla-carousel.com/",
                            description:
                                "Embla Carousel 是一个轻量级的、可访问的、可定制的滑块库，适用于移动端和桌面端。",
                        },
                        {
                            title: "React player",
                            url: "https://www.npmjs.com/package/react-player",
                            description:
                                "React Player 是一个用于在 React 应用中播放视频和音频的组件，支持多种媒体源和格式。",
                        },
                        {
                            title: "react-cool-inview",
                            url: "https://www.npmjs.com/package/react-cool-inview",
                            description:
                                "react-cool-inview 是一个用于实现懒加载和无限滚动的 React 组件，提供了简单易用的 API 和灵活的配置选项。",
                        },
                        {
                            title: "react-hook-form",
                            url: "https://www.npmjs.com/package/react-hook-form",
                            description:
                                "react-hook-form 是一个用于处理表单状态和验证的 React 库，提供了简单易用的 API 和高性能的表单处理能力。",
                        },
                        {
                            title: "react-page-scroll",
                            url: "https://www.npmjs.com/package/@campusrush/react-page-scroller",
                            description:
                                "react-page-scroll 是一个用于实现页面滚动效果的 React 组件，支持多种滚动效果和配置选项。",
                        },
                    ],
                },
                {
                    name: "html",
                    links: [
                        {
                            title: "css-loader",
                            url: "https://css-loaders.com/",
                            description: "css-loader是一个webpack的loader，用于处理CSS文件的加载和解析。",
                        },
                        {
                            title: "uiverse",
                            url: "https://uiverse.io/elements",
                            description:
                                "uiverse是一个免费的UI组件库，提供了大量的UI组件和设计元素，可以用于快速构建Web应用程序。",
                        },
                    ],
                },
                {
                    name: "typescript",
                    links: [
                        {
                            title: "ts入门",
                            url: "https://ts.xcatliu.com/",
                            description: "typescript入门教程",
                        },
                    ],
                },
                {
                    name: "数据可视化",
                    links: [
                        {
                            title: "echarts",
                            url: "https://echarts.apache.org/zh/index.html",
                            description: "数据可视化图表库",
                        },
                        {
                            title: "d3.js",
                            url: "https://d3js.org/",
                            description: "数据驱动文档的JavaScript库",
                        },
                        {
                            title: "antv",
                            url: "https://antv.vision/zh",
                            description: "蚂蚁金服数据可视化解决方案",
                        },
                        {
                            title: "three.js官网",
                            url: "https://threejs.org",
                            description: "three.js官网",
                        },
                        {
                            title: "three中文文档教程",
                            url: "http://webgl3d.cn/",
                            description: "three.js中文文档教程",
                        },
                        {
                            title: "isqqw",
                            url: "https://www.isqqw.com/",
                            description:
                                "isqqw是一个免费的在线数据可视化工具，提供了丰富的图表和可视化组件，可以用于快速创建数据可视化应用。",
                        },
                        {
                            title: "ppchart",
                            url: "https://ppchart.com/",
                            description:
                                "ppchart是一个免费的在线数据可视化工具，提供了丰富的图表和可视化组件，可以用于快速创建数据可视化应用。",
                        },
                        {
                            title: "soupjian echart宝典",
                            url: "https://data-screen-plan-soupjian.vercel.app/",
                            description: "soupjian echart宝典",
                        },
                    ],
                },
                {
                    name: "面经",
                    links: [
                        {
                            title: "web面试",
                            url: "https://vue3js.cn/interview/",
                            description: "Vue2/3 | React | Node | TS | 操作系统 | 算法与数据结构 | 小程序",
                        },
                        {
                            title: "前端进阶之旅",
                            url: "https://interview.poetries.top/",
                            description: "面试必备前端基础知识梳理",
                        },
                    ],
                },
                {
                    name: "AI",
                    links: [
                        {
                            title: "Bolt New",
                            url: "https://bolt.new/",
                            description: "AI代码生成工具",
                        },
                        {
                            title: "Cursor",
                            url: "https://cursor.so/",
                            description: "AI代码生成工具",
                        },
                        {
                            title: "通义千问",
                            url: "https://tongyi.aliyun.com/qianwen",
                            description: "阿里巴巴的通义千问是一个大型语言模型，旨在提供自然语言处理和生成的能力。",
                        },
                        {
                            title: "deepseek",
                            url: "https://www.deepseek.com/",
                            description:
                                "deepseek是一个免费的在线AI搜索引擎，提供了丰富的搜索功能和智能推荐，可以用于快速查找和获取信息。",
                        },
                        {
                            title: "chatgpt",
                            url: "https://chat.openai.com/",
                            description:
                                "chatgpt是一个基于GPT-3.5的AI聊天机器人，提供了丰富的对话功能和智能推荐，可以用于快速获取信息和解决问题。",
                        },
                        {
                            title: "豆包",
                            url: "https://www.doubao.com",
                            description:
                                "豆包是一个基于GPT-3.5的AI聊天机器人，提供了丰富的对话功能和智能推荐，可以用于快速获取信息和解决问题。",
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        activeLinks() {
            const category = this.categories.find((cat) => cat.name === this.activeCategory);
            return category ? category.links : [];
        },
    },
};
</script>

<style scoped>
/* 整体容器 */
.navigation-container {
    display: flex;
    font-family: Arial, sans-serif;
    margin: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
}

/* 侧边栏 */
.sidebar {
    width: 200px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    padding: 10px;
}

.tab {
    padding: 10px 15px;
    cursor: pointer;
    margin-bottom: 5px;
    text-align: center;
    color: #333;
    font-weight: bold;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.tab.active {
    background-color: #007acc;
    color: #ffffff;
}

.tab:hover {
    background-color: #e6f7ff;
}

/* 内容区域 */
.content {
    flex: 1;
    padding: 20px;
    background-color: #ffffff;
}

.content-title {
    margin-bottom: 20px;
    font-size: 20px;
    color: #007acc;
    border-bottom: 2px solid #007acc;
    display: inline-block;
    padding-bottom: 5px;
}

/* 链接列表 */
.links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.link-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.link-item:hover {
    background-color: #e6f7ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.link-item a {
    text-decoration: none;
    color: #007acc;
    font-size: 16px;
    font-weight: bold;
}

.link-item a:hover {
    text-decoration: underline;
}

.link-description {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
}
</style>
