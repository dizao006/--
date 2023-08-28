<template>
  <div class="blog-list-container" ref="mainConatiner" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb">
          <router-link :to="{name:'BlogDetails',params:{id:item.id}}">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link :to="{name:'BlogDetails',params:{id:item.id}}">
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论:{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >{{item.category.name}}</router-link>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    >
    </Pager>
  </div>
</template>
<script>
import { formatDate } from "@/utils";
import { getBlogs } from "@/api/blog";
import Pager from "@/components/Pager/index.vue";
import fetchData from "@/mixins/fetchData";
export default {
  mixins: [fetchData({})],
  components: {
    Pager,
  },
  mounted(){
    this.$refs.mainConatiner.addEventListener('scroll',this.handleScroll)
    this.$bus.$on("setMainScroll",this.handleSetMainScroll)
  },
    beforeDestroyed(){
    //移除滚动事件
    this.$bus.$emit('mainScroll')
    this.$refs.mainConatiner.removeEventListener('scroll',this.handleScroll)
    this.$bus.$off("setMainScroll",this.handleSetMainScroll)
  },
  computed: {
    //路由信息获取
    routeInfo() {
      //获取分类的id，如果没有则为-1为全部的
      const categoryId = +this.$route.params.categoryId || -1;
      //获取第几页
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      //设置视口高度
      this.$refs.mainConatiner.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  methods: {
    handleScroll(){
      //通过事件总线，往事件总线里面添加监听事件，
      this.$bus.$emit("mainScroll",this.$refs.mainConatiner)
    },
    handleSetMainScroll(scrollTop){
      this.$refs.mainConatiner.scrollTop=scrollTop;
    },
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    //处理分页组件
    handlePageChange(newPage) {
      //路由命名跳转
      //query会把里面的内容拼接到网站里面去
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      //跳转到 当前分类的id  当前的页容量   newpage的页码
      if (this.routeInfo.categoryId === -1) {
        //当前没有分类 /article?page=${newPage}&limit=${this.routeInfo.limit}'
        this.$router.push({
          name: "Blog", //表示跳转到哪一个路由
          query, //配置相关信息
        });
      } else {
        //当前有分页  /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "CategoryBlog",
          query,
          //动态路由导航
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
};
</script>
  <style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
  