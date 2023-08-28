<template>
 <Layout>
  <div class="main-container" ref="mainConatiner"  v-Loading="isLoading">
    <BlogDetail :blog="data" v-if="data"></BlogDetail>
    <BlogComment v-if="!isLoading" />
  </div>
<template #right>
  <div class="right-container" v-loading="isLoading">
    <BlogToc :toc="data.toc" v-if="data"></BlogToc>
  </div>
</template>
</Layout>
</template> 
<script>
import fetchData from "@/mixins/fetchData";
import { title } from "@/utils";
import { getBlog } from "@/api/blog";
import BlogDetail from "./components/BlogDetail.vue";
import BlogToc from "./components/BlogToc.vue";
import Layout from "@/components/Layout/index.vue";
import BlogComment from "./components/BlogComment";
export default {
  mounted(){
    //添加滚动事件
    this.$refs.mainConatiner.addEventListener('scroll',this.handleScroll)
    this.$bus.$on("setMainScroll",this.handleSetMainScroll)
  },
  beforeDestroyed(){
    //移除滚动事件
    this.$bus.$emit('mainScroll')
    this.$refs.mainConatiner.removeEventListener('scroll',this.handleScroll)
    this.$bus.$off("setMainScroll",this.handleSetMainScroll)
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  components: {
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
  },
  mixins: [fetchData(null)],
  methods: { 
    async fetchData() {
      //等待获取文章数据id
      const resp=await getBlog(this.$route.params.id);
      title.setRouertTitle(resp.title);
      return resp
    },
    handleScroll(){
      //通过事件总线，往事件总线里面添加监听事件，
      this.$bus.$emit("mainScroll",this.$refs.mainConatiner)
    },
    handleSetMainScroll(scrollTop){
      this.$refs.mainConatiner.scrollTop=scrollTop;
    }
  },
};
</script>

<style scoped lang="less"> 
.main-container{
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  scroll-behavior: smooth;
 }
 .right-container{
  width: 300px;
  height: 100%;
overflow-y: scroll;
box-sizing: border-box;
position: relative;
padding: 20px;
 }
</style>