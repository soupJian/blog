// 配置 themeConfig.js
module.exports = {
  logo: '/img/logo.png',
  type: 'blog',
  nav: [
    { text: '首页', link: '/', icon: 'reco-home' },
    { text: '时间线', link: '/timeline/', icon: 'reco-date' },
    { text: 'Contact', 
      icon: 'reco-message',
      items: [
        { text: 'GitHub', link: 'https://github.com/soupJian', icon: 'reco-github' },
        { text: 'Gitee', link: 'https://gitee.com/soupjian', icon: 'reco-mayun' }
      ]
    }
  ],
  sidebar: {},  
  // 博客设置 分类和标签
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类' // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: '标签' // 默认 “标签”
    },
    timeLine:{
      location: 3,
      text: '时间轴' 
    }
  },
  socialLinks: [
    { icon: 'reco-github', link: 'https://github.com/soupjian' },
    { icon: 'reco-mayun', link: 'https://gitee.com/soupjian' },
  ],
  // friendLink: [
  //   {
  //     title: '午后南杂',
  //     desc: 'Enjoy when you can, and endure when you must.',
  //     email: '1156743527@qq.com',
  //     link: 'https://www.recoluan.com'
  //   },
  //   {
  //     title: 'vuepress-theme-reco',
  //     desc: 'A simple and beautiful vuepress Blog & Doc theme.',
  //     avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
  //     link: 'https://vuepress-theme-reco.recoluan.com'
  //   },
  // ],
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  // 最后更新时间
  lastUpdated: '最近更新',
  // 作者
  author: 'soupjian',
  // 作者头像
  authorAvatar: '/img/avator.png',
  // 备案号
  record: null,
  // 项目开始时间
  // startYear: '2021',
  /**
   * 密钥 (if your blog is private)
   */

  // keyPage: {
  //   keys: ['your password'],
  //   color: '#42b983',
  //   lineColor: '#42b983'
  // },

  /**
   * valine 设置 (if you need valine comment )
   */

  // valineConfig: {
  //   appId: '...',// your appId
  //   appKey: '...', // your appKey
  // }
}