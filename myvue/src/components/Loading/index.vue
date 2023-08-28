<template>
  <img :src="loadingUrl" class="Loading-container">
</template>

<script>
import loadingUrl from "@/assets/loading.svg"
export default {
data(){
  return{
    loadingUrl,
  };
},
};
</script>

<style lang="less" scoped>
@import "~@/styles/mix.less";
.Loading-container{
  .center()
}

</style>