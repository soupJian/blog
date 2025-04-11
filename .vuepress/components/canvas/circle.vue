<template>
  <canvas id="canvas" ref="canvas" width="300px" height="170px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
</template>

<script>
export default {
  methods:{
    circle(x, y, r, startAngle, endAngle, clockWise, width,color) {
      this.canvas.beginPath()
      this.canvas.arc(x, y, r, startAngle, endAngle, clockWise)
      this.canvas.lineWidth = width
      // 着色
      this.canvas.strokeStyle = color
      this.canvas.stroke()
      this.canvas.closePath()
      // 填充色
      // canvas.fillStyle = 'gold';
      // canvas.fill()
    }
  },
  mounted(){
    const canvasDom = this.$refs.canvas
    this.canvas = canvasDom.getContext('2d')
    this.circle(100, 100, 50, 0, Math.PI, true,2,'#000')
    this.circle(200, 100, 50, 0, Math.PI, false,5,"gold")
  }
}
</script>

<style scoped>
canvas {
  width: 300px;
  height: 150px;
  margin: auto;
}
</style>