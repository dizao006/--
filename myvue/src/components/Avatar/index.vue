<template>
  <!-- 在templat里面写模板，写一个img模板，里面属性包括src，style样式（长宽），并且通过：进行绑定属性，实现数据传输等-->
  <img
    class="avatar-container"  
    :src="url"
    :style="{
      with: size + 'px',
      height: size + 'px',
    }"
  />
  <!--属性可以写成对象的形式，一般也是写成对象的形式-->
</template>

<script>
//默认导出 props用来声明组件接收的属性，要注意是单向流，并不能子传父数据
export default {
  props: {
    url: {
      type: String,   //设置类型为字符串行的
      required: true, //属性必须传入
    },
    size: {
      type: Number,
      default:50,
    },
  },
};
</script>

<style scoped>
.avatar-container{
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>

