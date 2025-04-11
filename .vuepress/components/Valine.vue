<template>
<div id="valine-vuepress-comment"></div>
</template>
<script>
export default {
  data(){
    return {
      Valine: ''
    }
  },
  mounted(){
    import("valine").then(res=>{
      this.Valine = res.default
      this.init()
    })
  },
  methods:{
    init(){
      new this.Valine({
        el: '#valine-vuepress-comment',
        appId: 'yxTchHuQE52RuyGLLtu6TJ3E-gzGzoHsz',
        appKey: 'dM1V7csYWFjadISkE5S77Fm3',
        avatar: 'robohash',
        path: window.location.pathname,
        visitor: true, // 统计阅读量,
        placeholder: '快来评论吧^_^'
      })
    }
  }
}
</script>