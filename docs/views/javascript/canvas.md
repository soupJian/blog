---
title: canvas基础
date: 2022-02-11
categories:
 - 数据可视化
tags:
 - 数据可视化
---


>canvas

## 获取canvas
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

## 直线

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

## 矩形

```js
 /**
 * canvas.fillRect(startX,startY,width,height)
 * canvas.fillStyle = 'red' 填充色
 * canvas.fillRect(120,200,20,200)
 */
canvas.fillStyle = 'red'  // 填充色
canvas.fillRect(120,200,20,200)
// 清除矩形
canvas.clearRect()
// 矩形描边
canvas.strokrRect()
```

## 圆
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

## 文本

```js
  /**
   * 画文字
   * canvas.fontSize = 100
   * fillText(text,x,y,maxWidth)
   * text 文字
   * x y 开始位置
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

## 绘制图片

```js
context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
/**
 * image 图片dom，需要onload后绘制canvas
 * sx,  图片元素绘制在Canvas画布上起始横坐标。
   sy,  图片元素绘制在Canvas画布上起始纵坐标
   sWidth,  图片本身绘制在canvas上的长度
   sHeight,  图片本身绘制在canvas上的高度
   dx,  左上角横坐标
   dy,  左上角纵坐标
   dWidth,  绘制图片容器区域的宽度
   dHeight  绘制图片容器区域的高度
*/
```

## 常用api

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






