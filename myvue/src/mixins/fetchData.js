export default function (defaultData = null) {
    //// 公共的远程获取数据的代码
// 具体的组件中，需要提供一个远程获取数据的方法  fetchData
    return {
        data() {
            return {
                isLoading: true,
                data: defaultData,
            };
        },
        //生命周期的钩子函数，用来获取远程数据
        async created() {
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }

}