<template>
  <div
    v-Loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <ul
      class="carousel"
      :style="{
        marginTop,
      }"
      @transitionend="handelEnd"
    >
      <li v-for="item in data" :key="item.id">
        <!-- 这里负循环选渲染三个图片和文字部分，剩下的页面组件交给home -->
        <Carouselitem :carousel="item"></Carouselitem>
      </li>
    </ul>
    <div class="icon up" @click="switchTo(index - 1)" v-show="this.index >= 1">
      <Icon type="arrowUp"></Icon>
    </div>
    <div
      class="icon down"
      @click="switchTo(index + 1)"
      v-show="this.index < data.length - 1"
    >
      <Icon type="arrowDown"></Icon>
    </div>
    <ul class="indicator">
      <li
        :class="{
          active: index === i,
        }"
        @click="switchTo(i)"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Carouselitem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
export default {
  data() {
    return {
      index: 0, //当前显示的页面
      containerHeight: 0,
      attitude: false,
    };
  },
  components: {
    Carouselitem,
    Icon,
  },
  mounted() {
    //将视口长度保存到数据containerHeight中，方便后续计算
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  created(){
    this.$store.dispatch("banner/fetchBanner")
    //dispatch 调用的是 actions中的方法，commit调用的是 mutations中的函数
  },
  computed: {
    ...mapState("banner",["loading","data"]),//通过辅助函数从仓库里拿到数据
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleResize() {
      //重新渲染页面
      console.log("重新渲染页面");
      this.containerHeight = this.$refs.container.clientHeight;
    },
    handleWheel(e) {
      //控制滑轮
      if (this.attitude) {
        return;
      }
      if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.attitude = true;
        this.index++;
      }
      if (e.deltaY < -5 && this.index > 0) {
        this.attitude = true;
        this.index--;
      }
    },
    handelEnd() {
      this.attitude = false;
    },
  },
  destroyed() {
    console.log("移除");
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>


<style lang="less" scoped>
@import "~@/styles/mix.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  // background: @dark;
  position: relative;
  overflow: hidden; //防止外边距合并
  ul {
    margin: 0;
    list-style: none; //设置li标签的前方原点是否消失
  }
}
.carousel {
  width: 100%;
  height: 100%;
  transition: 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  .center();
  font-size: 30px;
  color: @gray;
  cursor: pointer;
  transform: translateX(-50%);
  &.up {
    top: 15px;
    animation: jump-up 2s infinite;
  }
  &.down {
    top: auto;
    bottom: 30px;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator {
  .center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  cursor: pointer;
  li {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-bottom: 10px;
    box-sizing: border-box;
    background: @words;
    border: 1px solid #fff;
    transition: 0.5s;
    &.active {
      background: red;
    }
  }
}
</style>
