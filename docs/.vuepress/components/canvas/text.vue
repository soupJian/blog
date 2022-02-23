<template>
  <canvas id="canvas" ref="canvas" width="250px" height="250px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
</template>

<script>
export default {
  mounted(){
    const canvasDom = this.$refs.canvas
    const canvas = canvasDom.getContext('2d')
    canvas.font = '100px 微软雅黑';
    canvas.fillStyle = 'red'
    canvas.fillText('hello',0,100,100)
    /**
      * 线性渐变
    */
    const gradient = canvas.createLinearGradient(0, 0, 150, 0);
    gradient.addColorStop("0",'yellow')
    gradient.addColorStop("1.0",'blue')
    // 应用渐变
    canvas.strokeStyle = gradient
    canvas.strokeText("这是渐变文字",0,200,100)
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 250px;
  margin: auto;
}
</style>