<template>
  <!-- 向message组件传递必要的属性 -->
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>
  
  <script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    //记录目前页码
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    // 通过事件总线监听滚动事件
    this.$bus.$on("mainScroll", this.handleScoll);
  },
  destroyed() {
    //移除效果
    this.$bus.$off("mainScroll", this.handleScoll);
  },
  computed: {
    hasMore() {
      //判断展示的数据是否小于总数量
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    handleScoll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        console.log(1);
        this.fetchMore();
      }
    },
    async fetchData() {
      // 调用fetchData方法获取评论信息
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    //加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      (this.isLoading = true), this.page++;
      //重新获取模拟数据
      const resp = await this.fetchData();
      // 更新data.total
      this.data.total = resp.total;
      // 将两个数据拼接在一起
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      //获取评论数据
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      //unshift(resp)将相应结果加入到数组的开头
      this.data.rows.unshift(resp);
      //总数增加
      this.data.total++;
      callback("评论成功"); // 告诉子组件，我这边处理完了，你继续
      //当运行这个函数之后，组件DataFrom组件里面传递给这边的函数也会运行
    },
  },
};
</script>
  
  <style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
  