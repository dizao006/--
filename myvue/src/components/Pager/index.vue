<template>
    <!-- //只有总页数大于1的时候才会显示，比较稳定,选择用vif否则没有意义 -->
    <div class="pager-container" v-if="pageNumber > 1">
      <!-- 子组件无权更改数据，在父组件中数据更改可能会影响到其他，所以子组件只能通过发出通知的形式告诉父组件 -->
      <!-- 点击的时候调用h函数，传入适当的参数，大返回就传入第一页，小返回就传入当前页数-1 -->
      <!-- 注意a标签没有href，如果写上了就会存在重新加载页面的问题 -->
      <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
        >|&lt;&lt;</a
      >
      <a
        @click="handleClick(current - 1)"
        :class="{ disabled: current === 1 }"
        >&lt;&lt;</a
      >
      <!-- 循环生成的数组,设置唯一值,并且判断添加active样式(当前页是否为) -->
      <!-- 当前页是多少就传入多少 -->
      <a
        @click="handleClick(tem)"
        v-for="(tem, i) in numbers"
        :key="i"
        :class="{ active: tem === current }"
        >{{tem}}</a
      >
      <a
        @click="handleClick(current + 1)"
        :class="{ disabled: current === pageNumber }"
        >&gt;&gt;</a
      >
      <a
        @click="handleClick(pageNumber)"
        :class="{ disabled: current === pageNumber }"
        >&gt;&gt;|</a
      >
    </div>
  </template>
  
  <style lang="less" scoped>
@import "~@/styles/var.less";
  .pager-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a {
      color: @primary;
      margin: 0 6px;
      cursor: pointer;
      &.disabled {
        color: @lightWords;
        cursor: not-allowed;
      }
      &.active {
        color: @words;
        font-weight: bold;
        cursor: text;
      }
    }
  }
  </style>
  
  <script>
  export default {
    computed: {
      pageNumber: function () {
        return Math.ceil(this.total / this.limit); //总条数/每页限制10条 得到页数
      },
      getMax() {
        let max = this.getMin + this.visibleNumber - 1;
        if (max > this.pageNumber) {
          max = this.pageNumber;
        }
        return max;
      },
      getMin() {
        //得到显示页码中最小的数字
        //当前页面减去最多显示页码数的一半得到显示最小的那个
        let min = this.current - Math.floor(this.visibleNumber / 2);
        if (min < 1) {
          min = 1;
        }
        return min;
      },
      numbers() {
        let arr = [];
        for (let i = this.getMin; i <= this.getMax; i++) {
          arr.push(i);
        }
        return arr;
      },
    },
    methods: {
      handleClick(newPage) {
        //如果新页面小于1则赋值为1，大于最大的页数则赋值为最大页数，等于当前页数直接return
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > this.pageNumber) {
          newPage = this.pageNumber;
        }
        if (newPage === this.current) {
          return;
        }
        //抛出事件通知父组件
        //参数：名字，数据
        this.$emit("pageChange", newPage);
      },
    },
    props: {
      current: {
        //当前页
        type: Number,
        default: 1,
      },
      total: {
        //总条数
        type: Number,
        default: 0,
      },
      limit: {
        //每页展示多少条
        type: Number,
        default: 10,
      },
      // 最多显示页码的个数
      visibleNumber: {
        type: Number,
        default: 10,
      },
    },
  };
  </script>
  
  