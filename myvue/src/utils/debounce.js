export default function(fn,duration=100){
    //函数防抖全能版本
    let timer=null  //定义计时器
    return (...args)=>{ //返回一个函数
        clearTimeout(timer);    //清除计时器存在效果
        timer=setTimeout(()=>{   //重新添加计时器，并且在一定时间内没有重复执行的情况下。执行函数并且将参数重新传入
            fn(...args);
        },duration)
    }
}