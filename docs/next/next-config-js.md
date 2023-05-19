---
title: next.config.js
date: 2023-03-19
categories:
  - next
---
```js
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath:'/',
  compress: true // 代码压缩
  env:{ // 配置项 process.env

  },
  webpack:(config)=>{return config},
  images:{
    deviceSizes:[80,320,475,960,1280,1920] // 图片分辨率
     domains: [ // 图片域名
      "http://xxx.com",
    ]
  },
  exportPathMap: async function(defaultPathMap,{ dev, dir, outDir, distDir, buildId }){
    return {
      "/": { page: "/" },
      "/home": { page: "/home" },
    }
  },
  async rewrites(){
    return {
      // 代理
      fallback: [
        {
          source: "/api_url/:path*",
          destination: `https://xxx.com/:path*`
        }
      ],
      beforeFiles:[
        {
          source: '/some-page',
          destination: '/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
      // 路由重写，一般用于动态路由配置别名
      afterFiles:[ 
        {
          source: '/car/suv',
          destination: '/car/123'
        },
      ]
    }
  },
  // 重定向
   async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // 开启生产模式 cdn
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined, 
}
export default nextConfig
```