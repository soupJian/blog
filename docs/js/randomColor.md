---
title: 随机背景色
date: 2021-12-24
categories:
 - javascript
tags:
 - utils
---

## 方案一

>利用十六进制法则

```js
function randomColor(){
	const color = '#'+parseInt(Math.random()*0xFFFFFF).toString(16)
	return color
}
```
## 方案二
>利用rgb()，向下取整所以是 256 而不是 255\
>也可以采用rgba，最后加一个随机数 透明度

```js
function randomParams(){
    return Math.floor(Math.random()*256)
}
function randomColor(){
    // rgb
    // const color = `rgb(${randomParams()},${randomParams()},${randomParams()})`
    // rgba
    const opacity = Math.random().toFixed(2) // 透明度不需要太多位小数，两位就够了
    const color = `rgb(${randomParams()},${randomParams()},${randomParams()},${opacity})`
    return color
}
```
<Valine/>