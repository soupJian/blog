---
title: 取消接口请求
date: 2023-05-19 14:59:00
categories:
  - js
tags: 
 - js
 - utils
sticky:
 - 3
---

在正常的项目中我们都会遇到 输入信息 进行查询

这时候会出现以下状况：

    用户发送的请求是一个接一个顺序发送给服务端的，
    
    但是服务端响应的就不一定是顺序返回的，比如某个查询比较耗时，某个查询轻松匹配返回

    这时候就容易出现一个错误，先查询的后返回，导致用户看到的第二次查询结果返回后，一会儿又被第一次请求结果返回替代了.
    
    那么这时候就需要在第二次接口请求的时候，关闭掉第一个接口请求

下面以 fetch 为例, 可以打开控制台查看，在我们第二次输入请求的时候取消掉第一次请求,假设我们快速的输入 1234 后，前面的三个请求全部都会被我们标记上 canceled 记号，此方法不仅仅在 fetch中有效，在任何 填写 methos:'GET' 的地方都可以使用
```vue
<template>
<div>
  <input v-model="value"/>
  <div v-if="songs.length>0">
    <div v-for="item of songs" :key="item.id" style="line-height: 30px">
      {{item.name}}
    </div>
  </div>
</div>
</template>
<script>
let controller = null
const baseUrl = 'https://music-soupjian.vercel.app'

export default {
  data(){
    return{
      value: '',
      songs:[],
    }
  },
  watch:{
    value(){
      this.getData()
    }
  },
  methods:{
    async getData(){
      controller && controller.abort()
      controller  = new AbortController() 
      const url = `${baseUrl}/search?keywords=${this.value}`
      const {result} = await fetch(url,{
        signal: controller.signal
      }).then(data=>data.json())
      this.songs = result.songs.map(item=>{return{id:item.id,name:item.name}});
    }
  }
}
</script>

```
<utils-cancelRequest/>
