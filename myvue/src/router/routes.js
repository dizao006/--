export default [
  //配置路由
  // {
  //   path: '/',
  //   redirect: '/about'
  // },
  {
    name: "Home",
    path: "/",
    component: ()=>import("@/View/Home/index.vue"),//路由懒加载写法,
    meta:{
      title:"主页"
    }
  },
  {
    name: "About",
    path: "/about",
    component: ()=>import("@/View/About/index.vue"),
    meta:{
      title:"关于我"
    }
  },
  {
    name: "Project",
    path: "/project",
    component: ()=>import("@/View/Project/index.vue"),
    meta:{
      title:"项目效果"
    }
  },
  {
    name: "Message",
    path: "/message",
    component: ()=>import("@/View/Message/index.vue"),
    meta:{
      title:"留言板"
    }
  },
  {
    name: "Blog",
    path: "/article",
    component: ()=>import("@/View/Blog"),
    meta:{
      title:"我的文章"
    }
  },
  {
    name: "CategoryBlog",
    path: "/article/cate/:categoryId",
    component: ()=>import("@/View/Blog")
  },
  {
    name:'BlogDetails',
    path: '/article/:id',
    component: ()=>import("@/View/Blog/Detail") 
  }
]