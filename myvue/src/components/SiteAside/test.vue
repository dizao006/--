<template>
    <div class="test-container">
        <SiteAside></SiteAside>
    </div>

</template>

<script>
import "@/styles/global.less"
import SiteAside from"./index.vue"
export default {
components:{
    SiteAside
}
}
</script>


<style>
.test-container{
    width: 250px;
  height: 500px;
  border: 2px solid;
  margin: 0 auto;
}

</style>