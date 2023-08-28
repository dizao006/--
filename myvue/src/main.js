// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage";
import "./eventBus";
Vue.prototype.$showMessage = showMessage;
//注册全局指令
import vLoading from "./directives/loading";
import vlazy from "./directives/layz"
import store from "./store/index";
Vue.directive("Loading",vLoading)
Vue.directive("lazy",vlazy)
store.dispatch("setting/fetchSetting")

// import "./api/banner";
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");


// 测试接口
// import * as blogApi from "./api/blog"
// // blogApi.getBlog('sad').then((r)=>{console.log(r)})
// // blogApi
// //   .postComment({
// //     nickname: "昵称",
// //     content: "评论内容，纯文本",
// //     blogId: "123",
// //   })
// //   .then((r) => {
// //     console.log("zhheli",r);
// //   });
// blogApi.getComments("123123").then((r) => {
//   console.log(r);
// });