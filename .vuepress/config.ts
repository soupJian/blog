import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";

// const themeConfig = require("./themeConfig.ts");
// const markdown = require("./markdown.ts");
// const plugins = require("./plugin.ts");

export default defineUserConfig({
    base: "/",
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    title: "soupJian私房菜",
    description: "读万卷书 | 赚万贯财 | 行万里路",
    bundler: viteBundler(),
    dest: "./dist",
    head: [
        ["link", { rel: "icon", href: "/favicon.ico" }],
        ["link", { rel: "stylesheet", href: "/css/valine.css" }],
        ["link", { rel: "stylesheet", href: "/css/reset.css" }],
        ["script", { src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" }],
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
    ],
    // bundler: webpackBundler(),
    theme: recoTheme({
        logo: "/img/logo.png",
        navbar: [
            { text: "Category", link: "/categories/js/1.html", icon: "reco-category" },
            { text: "Tag", link: "/tags/suanfa/1.html", icon: "reco-tag" },
            { text: "Timeline", link: "/timeline.html", icon: "reco-date" },
            {
                text: "Contact",
                icon: "reco-message",
                children: [
                    { text: "GitHub", link: "https://github.com/soupJian", icon: "reco-github" },
                    { text: "Gitee", link: "https://gitee.com/soupjian", icon: "reco-mayun" },
                ],
            },
        ],
        socialLinks: [
            { icon: "reco-github", link: "https://github.com/soupjian" },
            { icon: "reco-mayun", link: "https://gitee.com/soupjian" },
        ],
        // 作者
        author: "soupjian",
        // 作者头像
        authorAvatar: "/img/avator.png",
        // docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
        // docsBranch: "main",
        // docsDir: "example",
        // lastUpdatedText: "",
        // bulletin: {
        //     body: [
        //         {
        //             type: "text",
        //             content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
        //             style: "font-size: 12px;",
        //         },
        //         {
        //             type: "hr",
        //         },
        //         {
        //             type: "title",
        //             content: "QQ 群",
        //         },
        //         {
        //             type: "text",
        //             content: `
        //       <ul>
        //         <li>QQ群1：1037296104</li>
        //         <li>QQ群2：1061561395</li>
        //         <li>QQ群3：962687802</li>
        //       </ul>`,
        //             style: "font-size: 12px;",
        //         },
        //         {
        //             type: "hr",
        //         },
        //         {
        //             type: "title",
        //             content: "GitHub",
        //         },
        //         {
        //             type: "text",
        //             content: `
        //       <ul>
        //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
        //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
        //       </ul>`,
        //             style: "font-size: 12px;",
        //         },
        //         {
        //             type: "hr",
        //         },
        //         {
        //             type: "buttongroup",
        //             children: [
        //                 {
        //                     text: "打赏",
        //                     link: "/docs/others/donate.html",
        //                 },
        //             ],
        //         },
        //     ],
        // },
        commentConfig: {
            type: "valine",
            // options 与 1.x 的 valineConfig 配置一致
            options: {
                appId: "yxTchHuQE52RuyGLLtu6TJ3E-gzGzoHsz",
                appKey: "dM1V7csYWFjadISkE5S77Fm3",
                avatar: "robohash",
                // placeholder: '填写邮箱可以收到回复提醒哦！',
                // verify: true, // 验证码服务
                // notify: true,
                // recordIP: true,
                // hideComments: true // 隐藏评论
            },
        },
    }),
    // debug: true,
});
