<template>
  <canvas id="canvas" ref="canvas" width="150px" height="150px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
</template>

<script>
export default {
  mounted(){
    const canvasDom = this.$refs.canvas
    this.canvas = canvasDom.getContext('2d')
    this.canvas.fillStyle = 'red'  // 填充色
    this.canvas.fillRect(10,10,20,100)

    this.canvas.strokeStyle = 'skyblue'
    this.canvas.strokeRect(60,10,20,100)
  }
}
</script>

<style scoped>
canvas {
  width: 150px;
  height: 150px;
  margin: auto;
}
</style>