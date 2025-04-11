<template>
  <canvas id="canvas" ref="canvas" width="150px" height="150px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
</template>

<script>
export default {
  methods:{
     line(x1,y1,x2,y2,color,width){
      // 开启一条直线
      this.canvas.beginPath();
      // 确定起始点
      this.canvas.moveTo(x1, y1);
      // 确定结束点
      this.canvas.lineTo(x2, y2);
      // 再上色之前设置颜色和线宽
      this.canvas.strokeStyle = color
      this.canvas.lineWidth = width;
      // 上色
      this.canvas.stroke();
      // 关闭路径
      this.canvas.closePath();
    }
  },
  mounted(){
    const canvasDom = this.$refs.canvas
    this.canvas = canvasDom.getContext('2d')
    this.line(10,10,110,10,'blue',2)
    this.line(110,10,110,110,'skyblue',3)
    this.line(110,110,10,110,'gray',1)
    this.line(10,110,10,10,'yellow',2)
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