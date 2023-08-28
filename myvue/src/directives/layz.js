import eventBus from "@/eventBus"
import { debounce } from "@/utils"
import defaultGif from "@/assets/default.gif"  
let imgs=[]
export default{
    inserted(el,bindings){
        const img={
            dom:el,//将传入的图片元素el存储在dom属性中。
            src:bindings.value,
            // 从bindings对象中获取value属性的值，并将其存储在src属性中。这个值通常是绑定到指令的图片 URL。
        }
        // el是一个图片元素的引用，bindings包含指令的绑定信息。
        imgs.push(img)
        setImage(img)  //一开始就加载一次
    },
    unbind(el){
        // unbind(el){ 定义了一个名为unbind的函数，它接受一个参数el，代表要解绑的图片元素。
        imgs=imgs.filter((img)=>{img.dom !==el})
        // imgs=imgs.filter((img)=>{img.dom !==el}) 这一行代码会找到imgs数组中所有dom属性不等于要解绑的图片元素el的对象，
        //并重新赋值给imgs数组，从而实现解绑操作。实际上，该行代码使用了数组的filter方法，
        //通过比较每个对象的dom属性与传入的el参数，来确定哪些对象应该保留在数组中。
    }
}
eventBus.$on('mainScroll',debounce(handleScroll)
,50)
function setImages(){
    //调用即可设置相应的图片
    for (const img of imgs) {
            setImage(img)  
    }
   
}
function setImage(img){


    //处理img
    img.dom.src=defaultGif
    const clientHeight=document.documentElement.clientHeight
    const rect= img.dom.getBoundingClientRect()
    const height=rect.height||150
    if(rect.top>-height ||rect.top<=clientHeight){
        //在视口范围内
        console.log(img.dom,"在范围内")
        const tempImg=new Image()
        tempImg.onload=function(){
            //当图片加载完成之后
            img.dom.src=img.src
        }
        tempImg.src=img.src
        imgs=imgs.filter((i)=>i!==img)//处理完之后移除
    }
 

    img.handle = true //已经处理了
}
function handleScroll(){
    setImages()
}