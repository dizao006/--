<template>
  <!-- 这是一个三栏分布的vue插槽 slot是vue的内置组件，通过这个组件加上署名，在测试部分可以通过不同的署名插入一些代码，起到一个
  占位的作用 -->
  <div class="container">
    <div class="left">
      <slot name="left"> </slot>
    </div>
    <div class="main">
      <slot> </slot>
    </div>
    <div class="right">
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>


<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    flex: 0 0 auto;
    overflow: hidden;
  }
  .main {
    flex: 1 1 auto;
    overflow: hidden;
  }
}
</style>