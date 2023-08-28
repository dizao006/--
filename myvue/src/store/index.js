import Vue from "vue";
import { Store, install } from "vuex";
import about from "./about";
import banner from "./banner"
import setting from "./setting"
import project from "./project";
if(window.VueRouter){
    install(Vue)
}


export default new Store({
    modules: {
        project,
        about,
        banner,
        setting,
    },
    strict: true //严格模式
})