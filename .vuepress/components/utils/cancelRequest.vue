<template>
<div>
  <input v-model="value"/>
  <div v-if="songs.length>0">
    <div v-for="item of songs" :key="item.id" style="line-height: 30px">{{item.name}}</div>
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
