module.exports = [
  // 添加评论功能 方法一
  // ['@vuepress-reco/comments', {
  //   solution: 'valine',
  //   options: {
  //     appId: 'yxTchHuQE52RuyGLLtu6TJ3E-gzGzoHsz',// your appId
  //     appKey: 'dM1V7csYWFjadISkE5S77Fm3', // your appKey
  //   }
  // }]
  // 方法二
  [
    'vuepress-plugin-comment',
    {
      choosen: 'valine', 
      // options选项中的所有参数，会传给Valine的配置
      options: {
        el: '#valine-vuepress-comment',
        appId: 'yxTchHuQE52RuyGLLtu6TJ3E-gzGzoHsz',
        appKey: 'dM1V7csYWFjadISkE5S77Fm3'
      }
    }
  ],
  // 更新刷新插件
//   ['@vuepress/pwa', {
//     serviceWorker: true,
//     updatePopup: {
//         message: "发现新内容可用",
//         buttonText: "刷新"
//     }
//   }],
// 代码复制弹窗插件
  ["vuepress-plugin-nuggets-style-copy", {
    copyText: "copy",
    tip: {
        content: "复制成功!"
    }
  }],
//   ['@vuepress/last-updated', 
//     {
//       transformer: (timestamp, lang) => {
//         return (new Date(timestamp)).toUTCString() 
//       }
//     }],
  ['@vuepress-reco/vuepress-plugin-pagation', {
    perPage: 16
  }]
//   ['sitemap', {
//     hostname: 'https://conimi.com'
//   }],
]