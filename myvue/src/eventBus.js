// //事件总线
// const listeners={};
// export default{
//     $on(enventName,handler){
//         //监听某一事件
//         if(!listeners[enventName]){
//             //如果不存在则创建一个初始化的空对象
//             listeners[enventName]=new Set()
//         }
//         //触发时将事件添加到数组中
//         listeners[enventName].add(handler)
//     },
//     $off(enventName,handler){
//         //取消监听
//             //监听某一事件
//             if(!listeners[enventName]){
//                 //如果不存在则创建一个初始化的空对象
//                return
//             }
//             // 移除监听
//             listeners[enventName].delete(handler)
//     },
//     $emit(enventName,...args){
//         //触发事件
//         if(!listeners[enventName]){
//             return
//         }
//         for(const handler of listeners[enventName]){
//             // 循环拿到每一个事件
//             //触发
//             handler(...args)
//         }
//     }
// }








// 简单办法新建一个vue实例，里面包括了上述代码
import Vue from "vue";
const app=new Vue({});

Vue.prototype.$bus = app
export default app
