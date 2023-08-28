<!-- 通过vfo循环生成类似contact的那样的效果 -->
<template>
    <nav class="menu-container" v-if="data">
      <!-- vfo通过循环数组items（里面传入要渲染出来的数据），从而渲染出不同的界面效果 ，同时动态了一个class样式
      选中的效果当什么情况下选中当前的效果-->
      <!-- routerLink会渲染出一个a元素，由history生成的为例避免刷新页面，自动注册了点击事件，并且阻止默认行为。在事件内部用history api更改路径 -->
      <!-- 注意，不可使用大写的Routerlink，貌似已经不支持了，然后，这个会形成一个无刷新跳转，注意 ，默认情况下，当前路径以导航路径开头
      则算作匹配，会添加类样式 router-link-active，如果完全等于路径，则算作精确匹配，添加router-link-exact-active样式
    exact: true 表示是否激活精确匹配，当为true的时候，表示要进行精确匹配，路径必须完全相等才会添加类样式，如果为flase则进行模糊匹配
  适合该项目中文章部分的使用模糊匹配  当使用这个方式后，下面的isSelected(item)便不需要写了-->
  <!-- :to="{name:item.name}  router link来创建一个链接，由to来指向路由地址 -->
      <router-link
        v-for="item in items"
        :exact="item.exact"
        :key="item.link"  
        :to="{name:item.name}"
        active-class="selected"
        exact-active-class=""
      >
      <!--  -->
        <div class="icon">
          <Icon :type="item.icon" />
        </div>
        <span>{{ item.title }}</span>
      </router-link>
    </nav>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import Icon from "@/components/Icon";
  export default {
    components: {
      Icon,
    },
    computed:{
    ...mapState("setting",["data"]),
  },
    data() {
      return {
        items: [
          //在这里定义了一个供vfo循环生成的数据数组
          {
            name: "Home",
            title: "首页",
            icon: "home",
            exact: true
          },
          {
            name: "Blog",
            title: "文章",
            icon: "blog",
            exact: false, //激活状态是否要精确匹配
          },
          {
            name: "About",
            title: "关于我",
            icon: "about",
            exact: true
          },
          {
            name: "Project",
            title: "项目&效果",
            icon: "code",
            exact: true
          },
          {
            name: "Message",
            title: "留言板",
            icon: "chat",
            exact: true
          },
        ],
      };
    },
    methods: {
      isSelected(item) {
        //这里定义了一个方法，用来判断是否选中添加选中效果的函数
        var link = item.name.toLowerCase(); // 菜单的链接地址
        var curPathname = location.pathname.toLowerCase(); // 当前浏览器的访问路径
        if (item.startWith) {
          //果item.startWith为ture的话，则返回浏览器访问路径的菜单地址
          return curPathname.startsWith(link);
        } else {
          //否则的话让当前浏览器的访问路径等于菜单的链接地址
          return curPathname === link;
        }
      },
    },
  };
  </script>
  
  <style scoped lang="less">
  @import "~@/styles/var.less";
  .menu-container {
    color: @gray;
    margin: 24px 0;
    a {
      &.selected {
        background: darken(@words, 3%);//arken(@words, 3%)会将@words所代表的颜色的亮度值减少3%。这将使颜色变得稍暗一些。
      }
      padding: 0 50px;
      display: block;
      display: flex;
      align-items: center;
      height: 45px;
      .icon {
        width: 24px;
      }
      &:hover {
        color: #fff;
      }
    }
  }
  </style>
  