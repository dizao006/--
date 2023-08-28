//得到el中带有loading元素的img
//写一个函数，获取到具有data-role属性，且值为loading的dom
function getele(el){
return el.querySelector("img[data-role=loading]")
}

//创建一个img元素，带着loading的自定义属性
import loadingImg from '@/assets/loading.svg'    
import styles from "./loading.module.less"
function putele(){
    //这里创建了一个img元素，且自定义属性为loading
    const img =document.createElement('img');
    //这句话是自定义属性的名字为role，值为loading，语法则是dom.dataset.自定义名字=值
    img.dataset.role='loading';
    img.src=loadingImg;//这里导入loading组件
    img.className=styles.loading //这里通过dom操作给img写入了一个样式，样式在另一个文件夹，通过引入样式文件进行添加
    return img
}
//这里是自定义指令的配置，在main中使用vue实例Vue.directive("Loading",vLoading)
//其中指令名是Loading，指令对象为vLoading，提供指令Loading的逻辑，也就是下面配置的对象
//bind(el, binding, vnode)：在指令与元素绑定时执行的函数。通常在此方法中可以设置初始状态或配置参数。
//inserted(el, binding, vnode)：在元素被插入到父节点后执行的函数。通常在此方法中可以触发加载状态的效果。
//update(el, binding, vnode)：在组件更新时执行的函数。通常在此方法中可以根据输入的值或参数来更新加载状态。
//componentUpdated(el, binding, vnode)：在组件及其子组件更新后执行的函数。通常在此方法中可以处理更新后的加载状态。
//unbind(el, binding, vnode)：在指令与元素解绑时执行的函数。通常在此方法中可以清除绑定的事件或状态信息。
//经常用的是bind和updata，如果他们做的事情一样，则可以写成以下这种形式
//导出指令的配置对象
export default function(el,binding){
    //el是指绑定的元素，可以操作dom，在这里绑定了div元素
    //biding是一个对象，描述了指令中提供的信息,在bingding对象中可以定义自定义指令的名称，value是值“”里面的js表达式的值
    //<div v-Loading="isLoading" class="home-container" ref="container" @wheel="handleWheel ">
    //vnode：表示 Vue 编译生成的虚拟节点。可以通过 vnode 参数访问和操作虚拟节点
    const img=getele(el); //获取到divdom元素
    if(binding.value){  //如果这个img元素应该给存在的话，再判断如果img元素不存在，那么添加img元素，如果不应存在的情况下移除
        if(!img){
            const img=putele();   
            el.appendChild(img);
        }
    }
    else{
        if(img)
        img.remove()
    }
}