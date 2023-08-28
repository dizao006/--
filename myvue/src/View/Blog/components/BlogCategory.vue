<template>
  <!-- 文章分类组件部分 -->
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2> 
      <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./rightList";
import fetchData from "@/mixins/fetchData.js";
// 从blogjs中导入getBlogCategories方法，此方法是获取模拟数据 
import { getBlogCategories } from "@/api/blog.js";
export default {
  //掉用mixins里的fetchData方法，传入一个数组
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      //获取分类id
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      //将文章数量汇总起来
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );

      const result = [
        //得到新分类数组
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((it) => ({
        // 设置选中状态
        ...it,
        //添加选中状态，取决于当前id是否等于分类id
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      // 通过这个方法返回出来模拟的数据 
      return await getBlogCategories();
    },
    handleSelect(item) {
      //注册页面跳转事件
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
