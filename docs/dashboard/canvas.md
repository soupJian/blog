---
title: canvas基础
date: 2022-02-11
categories:
  - 数据可视化
tags:
  - 数据可视化
---

>canvas

##  获取canvas
```html
<style>
canvas {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
}
</style>
<!-- canvas在低版本不兼容，需要兼容用户 -->
  <canvas id="canvas" width="500px" height="500px">
    您的浏览器版本过低，请升级浏览器或者使用chrome打开
  </canvas>
  
```

```js
  // 获取canvas标签
  const canvasHtml = document.getElementById("canvas")
  // 建立2d对象
  const canvas = canvasHtml.getContext('2d')
```

##  直线

```js
 /**
   * 一条线可以开启多个 lineTo 一笔画
   * 虚线直接多条直线连接 + 间隙
  */
const line = (canvas,x1,y1,x2,y2,color,width) => {
  // 开启一条直线
  canvas.beginPath();
  // 确定起始点
  canvas.moveTo(x1, y1);
  // 确定结束点
  canvas.lineTo(x2, y2);
  // 再上色之前设置颜色和线宽
  canvas.strokeStyle = color
  canvas.lineWidth = width;
  // 上色
  canvas.stroke();
  // 关闭路径
  canvas.closePath();
}

/**
 * lineGap 设置线条端点样式
 * butt 默认无端
 * round 圆形
 * square 方形
*/

/**
 * lineJoin 设置线条转角链接样式
 * miter 默认 尖角
 * round 圆形
 * bevel 平角
*/
```
<canvas-line/>

##  矩形

```js
 /**
 * canvas.fillRect(startX,startY,width,height)
 * canvas.fillStyle = 'red' 填充色
 * canvas.fillRect(120,200,20,200)
 * 起点120 200 画一个矩形宽20 高200 填充矩形
 * 
 *  非填充矩形
 * canvas.rect(120,200,20,200)
 * 
 * 不填充颜色的矩形
 * strokeRect(120,200,20,200)
 */
canvas.fillStyle = 'red'  // 填充色
canvas.fillRect(120,200,20,200)
// 清除矩形
canvas.clearRect(120,200,20,200)
// 矩形描边
canvas.strokeRect(120,200,20,200)
```
<canvas-rect/>

##  圆
```js
/**
   * arc(x,y,radius,startAngle,endAngle,counterclockWise)
   * x,y 圆心坐标
   * radius 半径
   * startAngle,endAngle 起始角度和最终角度
   * counterclockWise 顺时针 false 逆时针 true
   */
 function circle(x, y, r, startAngle, endAngle, clockWise, width,color) {
    canvas.beginPath()
    canvas.arc(x, y, r, startAngle, endAngle, clockWise)
    canvas.lineWidth = width
    // 着色
    canvas.strokeStyle = color
    canvas.stroke()
    canvas.closePath()
    // 填充色
    // canvas.fillStyle = 'gold';
    // canvas.fill()
  }

  circle(100, 100, 50, 0, Math.PI, true,2,'#000')
  circle(200, 100, 50, 0, Math.PI, false,5,"gold")
```

<canvas-circle/>

##  文本

```js
  /**
   * 画文字
   * canvas.fontSize = 100
   * 填充文字
   * fillText(text,x,y,maxWidth)
   * 缕空描边文字
   * strokeText(text,x,y,maxWidth)
   * text 文字
   * x y 开始位置 也就是一般下划线的位置
   * maxWidth 最大宽度，超出就压缩文字大小，完全展示
   * 
   * 文字位置
   * textAlign  水平位置 start(默认) end center left right
   * textBaseLine 垂直位置 botom(默认) top  middle
   */ 
  canvas.font = '100px 微软雅黑';
  canvas.fillStyle = 'red'
  canvas.fillText('hello',100,100)
  canvas.strokeText("你好",400,300,100)
  /**
    * 线性渐变
  */
  const gradient = canvas.createLinearGradient(0, 0, 500, 0);
  gradient.addColorStop("0",'yellow')
  gradient.addColorStop("1.0",'blue')
  // 应用渐变
  canvas.strokeStyle = gradient
  canvas.strokeText("这是渐变文字",0,400,500)
```

<canvas-text/>

##  绘制图片

```js
context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
/**
 * image 图片dom，需要onload后绘制canvas
 * sx,  从原始图片的 x 区域开始裁剪
   sy,  从原始图片的 y 区域开始裁剪
   sWidth,  从原始图片中 截取的 宽度
   sHeight,  从原始图片中 截取的 高度
   dx,  在 画布的 起始 x 坐标开始
   dy,  	在 画布的 起始 y 坐标开始
   dWidth,  画布上 绘制的宽度
   dHeight  画布上 绘制的 高度
*/
/*
* 第一个dom也可以是 CSSImageValue，HTMLImageElement，SVGImageElement，HTMLVideoElement， HTMLCanvasElement，ImageBitmap 或者OffscreenCanvas
*/
const canvasDom = this.$refs.canvas
const canvas = canvasDom.getContext('2d')
const img = new Image()
  img.src= '.....'
  img.onload = ()=>{
    canvas.drawImage(img,0,0,100,100,0,0,100,100) 
}
```

<canvas-drawImage/>

##  常用api

`getContext()`: 获取文本2d

`beginPath()`： 开启画笔

`closePath()`:  关闭画笔

`fontSize`: 画笔文字大小

`fillText`: 填充文字

`textAlign`: 文字水平对齐方式

`textBaseLine`: 文字垂直对齐方式

`strokeStyle`: 着色颜色

`stroke()`： 着色描边

`lineWidth`: 线条宽度

`fillStyle`: 填充颜色

`fill()`: 填充

`fillRect()`: 填充矩形

`rotate()`：画布旋转, `translate`、`sacle`

`save()`：保存一个状态

`restore()`：回复到上一个save的状态

`drawImage()`: 绘制图片

<Valine/>






