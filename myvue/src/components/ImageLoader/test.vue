<template>
    <div class="I-container">
        <ImageLoader 
	src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
  placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
  :duration="5000"
  @load="handleLoad"
/>
    </div>

</template>

<script >
import ImageLoader from "./index.vue"
export default {
    components:{
        ImageLoader
    },
    methods:{
        handleLoad(){
            console.log('tpjzwc')
        }
    }
}
</script>

<style>

.I-container{
    overflow: hidden;
    top: 100px;
    width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 0 auto;
  position: relative;
}
</style>