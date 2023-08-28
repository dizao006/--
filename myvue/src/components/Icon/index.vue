<template>
      <!-- 自定义一个组件，引入对应的矢量库，同时绑定一个class样式，并且通过计算属性种的函数获取对应的样式
      <i class="iconfont" :class="type"></i>如果这样写的话，则需要在app组件种的tpye输入正确的矢量名称-->
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-shouye",
  success: "icon-zhengque",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxi",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-about",
  weixin: "icon-weixin",
  gitee: "icon-gitee-fill-round",
  qq: "icon-QQ",
  arrowUp: "icon-xiangshang",
  arrowDown: "icon-xiajiantou",
  empty: "icon-box-empty",
  chat: "icon-liuyan",
};
export const types = Object.keys(classMap);//通过计算属性，获取对应的名字
export default {
  props: {
    type: {
      type: String,   //从app组件种传过来对应的字符串，然后对应到上述的class属性种
      required: true,
    },
  },
  computed: {
    // 图标类样式
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4173165_2g4t5a6pg9v.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
