---
title: 响应式数据大屏构建
date: 2021-12-24
categories:
 - dashboard
tags:
 - dashboard
---

## 需求

>实现响应式数据大屏，适配各种屏幕，不允许出现滚动条

## 方案

### rem
>**实现原理**： 根据屏幕宽度，计算1rem的宽度，配置根元素的font-size,所有的像素单位按照rem计算\
>**优点**：实现响应式，根据设计稿和`VW`的宽度实现界面宽度百分百展示\
>**缺点**： 在非设计稿比例的屏幕下，会出现滚动条

### scale

>**实现原理**： 将设计稿按照比例放大或缩小，在不出现滚动条的情况下，放大至最大展示\
>**优点**：响应式缩放，没有滚动条，不需要转化单位，按照设计稿一比一开发\
>**缺点**： 对于部分像素偏小的单位，缩小后模糊
   
本人目前开发采用的是 **scale** 方案 灵感来自  [电商618数据大屏](https://sugar.aipage.com/dashboard/5f81db321ff3e080e9f09168c923854f)

## 代码实现

### react

>最佳响应缩放比例

```js
import debounce from 'loadsh.debounce'

getScale = () => {
    const {width =1920,height=1080} = this.props
    const ww = window.inndeWidth/width
    const wh = window.innerHeight/height
    return ww<wh?ww:wh
}

// 可以采用debounce或者自定义一个定时器
setScale = debounce(() => {
	const scale = this.getScale()
	this.setState({ scale })
},500)

```

>监听屏幕尺寸改变

```js
componDidMount = ()  =>{
    window.addEventLister("resize,this.setScale)
}
```

>渲染 render

```js
render(){
    const {width=1920,height=1080,children} = this.props
    return(
        <div className={{styles.wrap}}>
            <div style={{
                transform:`scale(${scale},${scale}},
                transform:`scale(${scale},${scale}},
                width,
                height
                }}>
                {{children}}
            </div>
        </div>
    )
}
```
### vue

>App.vue

```html
<!-- html部分 -->
<div id="app">
    <div class="container" :style="{transform:`scale(${scale},${scale}) translateX(-50%)`,width: `${width}px`,height: `${height}px`}">
        <div class="main-wrap">
           ... 
        </div>
    </div>
</div>
```
```css
// css部分
html,body,#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#app{
    position: relative;
    .container{
        position: absolute;
        left: 50%;
        transform-origin: 0 0;
        overflow: hidden;
        transition: all .3s linear;
        .main-wrap{
            width: 100%;
            height: 100%;
        }
    }
}
```
```js
import {getScale,width,height}from './utils/getScale'
export default {
	data(){
        return{
            width,
            height,
            scale: getScale(), // 初始化时候就进行一次获取比例
            timer: null // 防抖
        }
    },
    methods:{
        // 设置缩放比
        setScale(){
            if(this.timer){
                clearTimeOut(this.timer)
                this.timer = setTimeOut(()=>{
                    this.scale = getScale()
                },500)
            }
        }
    },
    mounted(){
        const that = this
        window.addEventListener('resize',()=>{
            that.setScale()
        })
    },
    destoryed(){
        window.removeEventListener('resize',this.setScale())
    }
}
```

>utils/getScales.js

```js
const height = 1080 // 设计稿 height
const width = 1920 // 设计稿 width
// 获取宽高比例
const getScale = () =>{
    const ww = window.innerWidth / width
    const hh = window.innerHeight / height
    const scale = ww < wh ? ww : wh
    return scale
}
```
就这样子一款数据大屏就构建好了

本人开发大屏的案例 [业务数据大屏](http://cc-hc.com:8989/) 和 [区块链数据大屏](https://www.yljr.com/zqyl-reveal/#/)

其他的由于需要权限才能观赏就不分享了.
<Valine/>
