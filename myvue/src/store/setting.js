import {getSetting} from "../api/setting"
import {title} from "@/utils"
export default{
    namespaced:true,//开启命名空间
    state:{
        //属性
        loading:false,
        data:null,
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload;
        },
        setData(state,payload){
            state.data = payload;
        }
    },
    actions:{
        async fetchSetting(ctx){
            ctx.commit("setLoading",true);
            const resp =await getSetting();
            ctx.commit("setData",resp); //设置为等待返回的结果
            ctx.commit("setLoading",false);
            if (resp.favicon) {
                // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
                let link = document.querySelector("link[ref='shortcut icon']");
                if (link) {
                  return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = resp.favicon;
                document.querySelector("head").appendChild(link);
              }
              if(resp.siteTitle){
                title.setSiteTitle(resp.siteTitle);
              }
        }
    }


}