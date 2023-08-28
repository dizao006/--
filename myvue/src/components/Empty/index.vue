<!-- 该效果写出了一个页面无数据的icon和p元素形成的一个图文效果 -->
<template>
  <div class="container">
    <Icon type="empty"></Icon>
    <p :text="text">{{ text }}</p> 
    <!-- 通过p元素绑定text，在测试的时候个text传入值从而影响展示出来的文字 -->
  </div>
</template>

<script>
import Icon from "../Icon/index.vue";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mix.less";
@import "~@/styles/var.less";
.container{
    .center();
    color: @gray;
}
.icon-container{
font-size: 150px;
}
</style>