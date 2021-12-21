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
  title: "soupJian的前端之旅",
  description: '把所有的不快给昨天 | 把所有的努力给今天 | 把所有的希望给明天',
  dest: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/valine.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig,
  markdown,
  plugins
}  
