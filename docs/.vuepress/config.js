const themeConfig = require('./themeConfig.js')
const markdown = require('./markdown.js')
const plugins = require('./plugin.js')

module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  title: 'soupJian\'s Blog',
  description: '把所有的不快给昨天|把所有的努力给今天|把所有的希望给明天',
  // dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'keywords', content: 'soupjian,博客'}],
    // 配置百度推送
    // ['script', {}, `
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?www.soupjian.work"; 
    //     var s = document.getElementsByTagName("script")[0]; 
    //     s.parentNode.insertBefore(hm, s);
    //   })();`]
  ],
  markdown,
  theme: 'reco',
  themeConfig,
  plugins
}
