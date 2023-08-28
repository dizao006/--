import axios from "axios";
import showMessage from "../utils/showMessage";

const ins = axios.create(); // 创建一个axios的实例,这个axios实例相当于axios，不过添加了一个拦截器，在运行获取数据前，需要先运行这个拦截器
ins.interceptors.response.use(function(resp) {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

export default ins;
