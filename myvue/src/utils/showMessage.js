import Icon from '../components/Icon/index.vue';
import getComponentRootDom from './getComponentRootDom.js'
import styles from './message.module.less';
/**
 *  弹出消息
 * @param {string} content  消息内容
 * @param {string} type     消息类型  info   error  success  warn
 * @param {number} duration 多久消失
 * @param {HTMLElement} container  容器，将内容显示到正中间，不传则显示在页面正中间
 */

export default function (options = {}) {
    //这里设置了一个空数组，方便再调用的时候传入数据，当没有传入数据的时候，会按照下面的默认值进行处理
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    //创建元素
    //这里引用了getjs里的一个方法，其目的是获取渲染的dom元素
    const div = document.createElement('div'); //首先创建了一个div元素
    const iconDom = getComponentRootDom(Icon, {
        type, //然后获取了icon组件渲染出来的dom元素，传入参数type类型
    })
    //下面通过字符串语法将div的内容内容设置为html元素构成的内容
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span> <div>${content}</div>`

    //设置样式
    div.className = `${styles.message} ${styles[`message-${type}`]}`
    //将div加入到容器中
    if(options.container){
        //传递了容器则把它设置为relative，如果没有传递，则默认为body
        if (getComputedStyle(container).position === "static") {
            //如果传入的容器是一个没有进行任何定位的容器，则给他设置为相对定位
            container.style.position = "relative";
        }
    }
   
    container.appendChild(div)
    //浏览器是异步渲染的，是执行完之后发现又回到了原来的位置，所以直接按照原来的位置进行了渲染
    //如果想要看到过度的效果，必须让浏览器强行渲染一次，形成过度
    //在 Web 开发中，当我们设置动画时，有时候需要强制重新渲染浏览器，这是因为浏览器在渲染页面时使用了一种优化技术称为"合成层"（Composite Layer）。
    //合成层是浏览器在渲染页面时为某些元素创建的独立渲染层。这些元素可以受益于硬件加速，并且可以独立于其他部分进行渲染，从而提高页面的性能和动画的流畅度。
    //然而，当我们对某个元素执行动画时，这个元素可能会生成一个新的合成层。但是，浏览器在实时渲染页面时并不会检测到动画元素是否需要更新合成层，因此可能会导致一些问题，比如动画卡顿、帧率下降等。
    //为了解决这个问题，我们需要对动画元素进行强制重新渲染浏览器，即强制浏览器重新创建合成层，以确保动画的平滑执行和良好的性能。
    //可以通过几种方式实现强制重新渲染浏览器，比如修改元素的某些属性、通过改变元素的样式触发重绘等。这将强制浏览器重新计算和绘制元素，确保动画效果的流畅性和准确性。
    //总之，强制重新渲染浏览器是为了解决浏览器渲染优化的问题，确保动画元素能够正确、流畅地渲染和动画执行
    div.clientHeight; //导致强行渲染
    //回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`

    //等一段时间后消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`
        div.addEventListener("transitionend", function () {
            div.remove();
            //运行回调
            options.callback && options.callback()
        }, {
            once: true
        });
    }, duration)
}