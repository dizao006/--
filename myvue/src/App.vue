<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <!-- 匹配路由，这里相当于一个一个占位符，当路由匹配到的时候加载到这里 -->
        <!-- <router-link to="/about" >About</router-link> -->
        <router-view></router-view>
      </template>
    </Layout>
    <ToTop></ToTop>
  </div>
</template>

<script>
import Layout from "./components/Layout";
import ToTop from "@/components/ToTop"
import SiteAside from "./components/SiteAside";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop
},
};
</script>

<style lang="less" scoped>
@import "~@/styles/mix.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 250px;
  height: 100%;
}
</style>
