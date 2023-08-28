<template>
    <div class="test-container">
        <Menu> </Menu>
    </div>

</template>

<script>
import Menu from "./index.vue"
import "@/styles/global.less"
export default {
 components:{
    Menu,
 }
}
</script>

<style>
.test-container{
    position: relative;
    list-style-type:none;
    position: relative;
    width: 400px;
    height: 600px;
    border: 2px solid red;
    background: #000;
    margin: 0 auto;
}
</style>