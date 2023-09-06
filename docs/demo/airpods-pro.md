---
title: 苹果官网动画-airpods-pro
date: 2023-08-31
categories:
  - demo
tags:
  - demo
---

## 解析

1. 获取到 video 的时长
2. 获取滚动的距离 和 总滚动距离的比例
3. 根据 比例 配置当前 视频的 currentTime

## Vue 代码

```vue
<template>
  <div class="hero-wrap" ref="scrollview">
    <div class="hero">
      <video
        id="videId"
        src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        muted
        ref="video"
      ></video>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    scrollPlay() {
      const scrollTop = this.$refs.scrollview.scrollTop;
      // 总共可以滚动的距离 = 内容的总高度 - 父元素的高度
      const maxScrollTop =
        this.$refs.scrollview.scrollHeight - this.$refs.scrollview.offsetHeight;
      const scrollFraction = scrollTop / maxScrollTop; // 当前滚动距离 / 总滚动距离
      requestAnimationFrame(() => this.uploadVideoTime(scrollFraction));
    },
    uploadVideoTime(scrollFraction) {
      this.$refs.video.currentTime = scrollFraction * this.$refs.video.duration;
    },
  },
  mounted() {
    this.$refs.scrollview.addEventListener("scroll", this.scrollPlay, true);
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
  aspect-ratio: calc(1120 / 840);
}
.hero {
  width: 100%;
  height: 8000px;
}
video {
  position: sticky;
  top: 0;
  width: 100%;
}
</style>
```

## requestAnimationFrame

这个 playbackConst 需要多次调试，然后这个方法其实一直都会运行，占用 cpu 运行

```javascript
let playbackConst = 200;
let videoEl = document.getElementById("videId");
// Use requestAnimationFrame for smooth playback
function scrollPlay() {
  var frameNumber = window.pageYOffset / playbackConst;
  videoEl.currentTime = frameNumber;
  // console.log(videoEl.currentTime);
  window.requestAnimationFrame(scrollPlay);
}
window.requestAnimationFrame(scrollPlay);
```

## 在线案例

<demo-airpods-pro/>
