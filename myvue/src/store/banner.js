import {getBanners} from "../api/banner"
export default{
    namespaced:true,//开启命名空间
    state:{
        //属性
        loading:false,
        data:[],

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
        async fetchBanner(ctx){
            if(ctx.state.data.length){
                return
            }
            ctx.commit("setLoading",true);
            const resp =await getBanners();
            ctx.commit("setData",resp); //设置为等待返回的结果
            ctx.commit("setLoading",false);
        }
    }


}