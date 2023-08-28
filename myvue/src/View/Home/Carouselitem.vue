<template>
  <div class="carousel-item-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="img" ref="img" :style="imagePosition">
      <ImageLoader
      @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      ></ImageLoader>
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>
  
  <script>
import ImageLoader from "@/components/ImageLoader/index.vue";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descwidth: 0,
      containerSize:null,  //外层容器
      innerSize:null,     //内层容器
      mouseX:0,
      mouseY:0
    };  
  },
  computed:{
    //得到图片的坐标

    imagePosition(){
      if(!this.innerSize || !this.containerSize) {
        return
      }
      const extraWidth=this.innerSize.width-this.containerSize.width;
      const extraHeight=this.innerSize.height-this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descwidth = this.$refs.desc.clientWidth;
   this.showSize()
    window.addEventListener("resize", this.showSize)
  },
  destroyed(){
    window.removeEventListener("resize", this.showSize)
  },
  methods: {
    //调用方法显示文字
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //强制渲染
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";
      //另一句话也一样
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descwidth + "px";
    },
    showSize(){
      this.containerSize={
      width:this.$refs.container.clientWidth,
      height:this.$refs.container.clientHeight,
    },
    this.innerSize={
      width:this.$refs.img.clientWidth,
      height:this.$refs.img.clientHeight,
    }
  },
  handleMouseMove(e){
    const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
  },
  handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
}
};
</script>
  
  <style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  background: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  left: -40px;
  overflow: hidden;
}
.img {
  height: 110%;
  width: 110%;
  position: absolute;
  transition: 0.3s;
}
.title,
.desc {
  position: absolute;
  left: 30px;
  letter-spacing: 5px;
  color: #fff;
  opacity: 0;
  // 描边效果
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5),
    -1px 0 0 rgba(0, 0, 0, 0.5) 0 1px 0 rgba(0, 0, 0, 0.5),
    0 -1px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
}
.title {
  top: 45%;
  font-size: 2em;
}
.desc {
  top: 52%;
  font-size: 18px;
  text-indent: 35px;
}
</style>
  