---
title: 苹果官网动画-airpods
date: 2023-08-31
categories:
    - demo
tags:
    - demo
---

## 解析

1. 预加载全部的图片
    - 创建 img 对象配置 src 即可预加载
2. 利用 canvas 绘制第一张图
3. 计算可滚动的高度 / 总图片数目 = 滚动一张图需要的距离
4. 监听滚动的巨鹿，计算当前是第几涨图片，canvas 渲染该图

## 一般写法

```html
<div class="hero">
    <canvas id="hero-lightpass" />
</div>
```

```js
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const frameCount = 147;
const currentFrame = (index) => {
    // console.log(index, index.toString(), index.toString().padStart(4, "0"));
    // 1 '1' '0001'
    return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
        .toString()
        .padStart(4, "0")}.jpg`;
};

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1158;
canvas.height = 770;
img.onload = function () {
    context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight; // 总共可以滚动的距离
    const scrollFraction = scrollTop / maxScrollTop; // 当前滚动距离 / 总滚动距离
    // 当前图片帧 index = 滚动比例 * 总图片帧数
    const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
```

## vue

```vue
<template>
    <div>
        <p>对比静态图</p>
        <img
            src="https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg"
            alt=""
        />
        <p>滚动一下下面airpods</p>
        <div class="hero-wrap" ref="scrollview">
            <div class="hero"><canvas id="hero-lightpass" /></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            wrap: null,
            img: null,
            canvas: null,
            context: null,
            frameCount: 147,
        };
    },
    mounted() {
        this.initCanvas();
        this.preloadImages();
        this.img = new Image();
        this.img.src = this.currentFrame(1);
        this.img.onload = () => {
            this.drawImage();
        };
        this.$refs.scrollview.addEventListener("scroll", this.scroll, true);
    },
    methods: {
        initCanvas() {
            const canvas = document.getElementById("hero-lightpass");
            const context = canvas.getContext("2d");
            this.canvas = canvas;
            this.context = context;
        },
        currentFrame(index) {
            // 1 '1' '0001'
            return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
                .toString()
                .padStart(4, "0")}.jpg`;
        },
        preloadImages() {
            for (let i = 1; i < this.frameCount; i++) {
                const img = new Image();
                img.src = this.currentFrame(i);
            }
        },
        updateImage(index) {
            this.img.src = this.currentFrame(index);
            this.drawImage();
        },
        drawImage() {
            const { canvas, img, context } = this;
            // 在画布上绘制图片
            context.drawImage(this.img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        },
        scroll() {
            // console.log(e);
            const scrollTop = this.$refs.scrollview.scrollTop;
            // 总共可以滚动的距离 = 内容的总高度 - 父元素的高度
            const maxScrollTop = this.$refs.scrollview.scrollHeight - this.$refs.scrollview.offsetHeight;
            const scrollFraction = scrollTop / maxScrollTop; // 当前滚动距离 / 总滚动距离
            // 当前图片帧 index = 滚动比例 * 总图片帧数
            const frameIndex = Math.min(this.frameCount - 1, Math.ceil(scrollFraction * this.frameCount));
            requestAnimationFrame(() => this.updateImage(frameIndex + 1));
        },
    },
    beforeDestroy() {
        const scrollview = this.$refs["scrollview"];
        scrollview.removeEventListener("scroll", this.scroll);
    },
};
</script>
<style scoped>
.hero-wrap {
    width: 100%;
    /* background: #000; */
    overflow-x: hidden;
    aspect-ratio: 1.5;
}
.hero {
    width: 100%;
    height: 8000px;
}
canvas {
    position: sticky;
    top: 0;
    width: 100%;
    aspect-ratio: 1.5;
}
</style>
```

## 在线实例

<demo-airpods/>
