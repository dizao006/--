<template>
  <div>
    <Pager
      :total="total"
      :current="current"
      @pageChange="handlePageChange($event)"
    ></Pager>
  </div>
  <!-- <h1 v-if="score>=80">U</h1>
      <h2 v-else-if="score>=60">L</h2>
      <h3 v-else>X</h3> -->
  <!-- vif会添加和删除元素，控制是否生成对应的dom，而vshow始终都会生成dom用dom控制style：display：none，vif则是直接删除元素 -->
  <!-- 使用vif可以有效的减少树的节点和渲染量，但是也会导致树的不稳定，而vshow可以保持数的稳定，但不能减少树的节点和渲染量 -->
  <!-- 因此，在实际开发中，显示频繁变化的情况下应该用vshow，用以保持树的稳定，显示状态变化少的时候用vif，用以减少树的节点和渲染量 -->
</template>

  <script>
import Pager from "./index.vue";
export default {
  components: {
    Pager,
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
  data() {
    return {
      current: 1,
      total: 302,
    };
  },
};
</script>
  <style scoped>
.iconfont {
  font-size: 90px;
  color: black;
}
</style>