<template>
  <!-- 这是一块组合部分，将  Contact,
        Menu,
        Avatar组件拼接成一个侧边栏-->
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar
      url="http://mdrs.yuanjin.tech/FgMwAPYq17So9nwVH44ltDHo7u3c"
      :size="200"
    />
    <h1 class="title">{{data.siteTitle}}</h1>
    </template>
    <Menu></Menu>
    <Contact></Contact>
    <p class="footer" v-if="data">{{data.icp}}</p>
  </div>
</template>
<script>
import Avatar from "../Avatar/index.vue";
import Contact from "../Contact/index2.vue";
import Menu from "../Menu/index.vue";
import { mapState } from "vuex";
export default {
  components: {
    Contact,
    Menu,
    Avatar,
  },
  computed: {
    ...mapState("setting",["data"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  //示水平方向上的溢出内容将被隐藏，而overflow-y: auto;表示垂直方向上的溢出内容将自动显示滚动条以便查看。
}

.avatar-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>