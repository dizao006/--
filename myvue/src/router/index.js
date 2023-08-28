import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes";
import { title } from "@/utils";
if(window.VueRouter){
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,//路由匹配规则
  mode:'history'
})

router.afterEach((to,from)=>{
  if(to.meta.title){
    title.setRouertTitle(to.meta.title) 
  }
})
export default router; 
