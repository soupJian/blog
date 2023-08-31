<template>
  <div>
    <img
      src="https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg"
      alt=""
    />
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
      const width = this.$refs.scrollview.offsetWidth;
      const canvas = document.getElementById("hero-lightpass");
      canvas.style.height = width * 0.66 + "px";
      const context = canvas.getContext("2d");
      this.canvas = canvas;
      this.context = context;
      this.$refs.scrollview.style.height = width * 0.66 + "px";
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
      context.drawImage(
        this.img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    },
    scroll() {
      // console.log(e);
      const scrollTop = this.$refs.scrollview.scrollTop;
      // 总共可以滚动的距离 = 内容的总高度 - 父元素的高度
      const maxScrollTop =
        this.$refs.scrollview.scrollHeight - this.$refs.scrollview.offsetHeight;
      const scrollFraction = scrollTop / maxScrollTop; // 当前滚动距离 / 总滚动距离
      // 当前图片帧 index = 滚动比例 * 总图片帧数
      const frameIndex = Math.min(
        this.frameCount - 1,
        Math.ceil(scrollFraction * this.frameCount)
      );
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
  border: 1px solid;
  overflow-x: hidden;
}
.hero {
  width: 100%;
  height: 8000px;
}
canvas {
  position: sticky;
  top: 0;
  width: 100%;
}
</style>
