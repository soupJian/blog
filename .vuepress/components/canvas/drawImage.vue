<template>
  <canvas id="canvas" ref="canvas" width="236px" height="236px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
</template>

<script>
const image = require('../../public/img/avator.png')
export default {
  mounted(){
    const canvasDom = this.$refs.canvas
    const canvas = canvasDom.getContext('2d')
    const img = new Image()
    img.src=image
    img.onload = ()=>{
      canvas.drawImage(img,0,0,236,236,0,0,236,236) 
    }
  }
}
</script>

<style scoped>
canvas {
  width: 236px;
  height: 236px;
  margin: auto;
}
</style>