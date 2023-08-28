<template>
    <!-- 这里是递归调用组件，这里呢写了一个ul li的模板，用于展示文章列表的，但是要显示二级三级标题
    需要递归调用这个组件 -->
  <ul class="Right-container">
    <!-- 这里通过vfor循环，生成一个列表  注意key值是必须的 -->
    <li v-for="(item, i) in list" :key="i">
        <!-- 注意，这里写入了一个动态样式，：class="{样式名称： 布尔值当slelcted为true的时候加入这个样式}" -->
      <span @click="handleClick(item)" :class="{ active: item.isSelect}">
      {{
        item.name
      }}</span>
       <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
      <!-- 这里是递归调用的地方，在下面导出部分写出了他的名字  name: "RightList",这样他才能识别 -->
      <!-- 同时这里 @select="handleClick" 也调用了一个方法-->
      <RightList :list="item.children" @select="handleClick"></RightList>
    </li>
  </ul>
</template>
<script>
export default {
    // 在这里给递归调用的组件取名字
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [], //当默认值为数组的时候，不能直接写空数组，而需要写一个函数返回一个数组
    },
  },
  methods: {
    // 这里无法处理,选择抛出事件给父组件,在父元素中可以通过@select来监听这个事件,当点击span元素后,子组件会传递slelct事件来通知父元素
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.Right-container {
  list-style: none;
  padding: 0;
  .Right-container {
    // 这里是循环嵌套的组件里面的相同的样式
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: orange;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>  