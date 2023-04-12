const themeConfig = require('./themeConfig.js')
const markdown = require('./markdown.js')
const plugins = require('./plugin.js')

module.exports = {
  theme: 'reco',
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  title: "soupJian私房菜",
  description: '读万卷书 | 赚万贯财 | 行万里路',
  dest: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/valine.css' }],
    ['link', { rel: 'stylesheet', href: '/css/reset.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig,
  markdown,
  plugins
}  
