// 配置 themeConfig.js
module.exports = {
  nav: [
    { text: '主页', link: '/', icon: 'reco-home' },
    { text: '分类', link: '/archives.html', icon: 'reco-date',
      items:[
        {text: 'Vue2.x',link:'/vue2'},
        {text: 'Vue3.x',link:'/vue3'},
        {text: '小程序',link:'/miniProgram'},
        {text: 'react',link:'/react'},
        {text: 'html',link:'/html'},
        {text: 'javascript',link:'/js'},
        {text: 'css',link:'/css'},
        {text: '数据大屏',link:'/dashboard'}
      ]
    },
  ],
  type: 'blog',
  // blogConfig: {
  //   category: {
  //     location: 2, // 在导航栏菜单中所占的位置，默认2
  //     text: '分类' // 默认 “分类”
  //   },
  //   // tag: {
  //   //   location: 3, // 在导航栏菜单中所占的位置，默认3
  //   //   text: '标签' // 默认 “标签”
  //   // },
  //   socialLinks: [
  //     { icon: 'reco-github', link: 'https://github.com/soupjian' },
  //     { icon: 'reco-weixin', link: 'https://gitee.com/soupjian' },
  //   ]
  // },
  logo: '/logo.png',
  authorAvatar: '/avator.png',
  search: true,
  searchMaxSuggestions: 10,
  subSidebar: 'auto',
  sidebarDepth: 4,
  lastUpdated: '上次更新',
  author: 'soupJian',
  record: 'www.soupjian.work',
  startYear: '2021',
  friendLink: [
    {
      title: '午后南杂',
      desc: 'Enjoy when you can, and endure when you must.',
      email: '1156743527@qq.com',
      link: 'https://www.recoluan.com'
    },
    {
      title: 'Torrk\'s Blog',
      desc: '记录，成为更好的自己。',
      logo: 'https://conimi.com/files/images/i.jpg',
      link: 'https://conimi.com'
    },
  ],
}