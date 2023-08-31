---
title: 苹果官网动画-airpods
date: 2023-08-31
categories:
  - css
tags:
  - css
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
  <canvas id="hero-light" />
</div>
```

```js
const html = document.documentElement;
const canvas = document.getElementById("hero-light");
const context = canvas.getContext("2d");
const frameCount = 148;
const currentFrame = (index) => {
  console.log(index, index.toString(), index.toString().padStart(4, "0"));
  // 1 '1' '0001'
  // 13 '13' '0013'
  // 148 '148' '0148'
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
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
```

## vue

```vue
<template>
  <div class="hero">
    <canvas id="hero-light" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      html: null,
      img: null,
      context: null,
      frameCount: 148,
    };
  },
  mounted() {
    this.templeteStyle();
    this.initCanvas();
    this.preloadImages();
    this.html = document.documentElement;

    this.img = new Image();
    this.img.src = this.currentFrame(1);

    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0);
    };

    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    templeteStyle() {
      const body = document.body;
      body.classList.add("templeteBody");

      const sections = document.getElementsByTagName("section");
      sections[0].classList.add("removeTransform");
    },
    destroyStyle() {
      const body = document.body;
      body.classList.remove("templeteBody");

      const sections = document.getElementsByTagName("section");
      sections[0].classList.remove("removeTransform");
    },
    initCanvas() {
      const canvas = document.getElementById("hero-light");
      canvas.width = 1158;
      canvas.height = 770;
      this.context = canvas.getContext("2d");
    },
    currentFrame(index) {
      // console.log(index, index.toString(), index.toString().padStart(4, "0"));
      // 1 '1' '0001'
      // 13 '13' '0013'
      // 148 '148' '0148'
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
      this.context.drawImage(this.img, 0, 0);
    },
    scroll() {
      const scrollTop = this.html.scrollTop;
      const maxScrollTop = this.html.scrollHeight - window.innerHeight; // 总共可以滚动的距离
      const scrollFraction = scrollTop / maxScrollTop; // 当前滚动距离 / 总滚动距离
      // 当前图片帧 index = 滚动比例 * 总图片帧数
      const frameIndex = Math.min(
        this.frameCount - 1,
        Math.ceil(scrollFraction * this.frameCount)
      );
      requestAnimationFrame(() => this.updateImage(frameIndex + 1));
    },
  },
  destroyed() {
    this.destroyStyle();
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>
<style scoped>
canvas {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  max-width: 100%;
  max-height: 100%;
}
</style>
```

<iframe src="/demo/airpods.html" style="width: 100%;height: 100vh;position:sticky;"/>
