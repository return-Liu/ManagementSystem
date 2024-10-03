import http from "axios";
export default http.create({
  // 默认请求的地址
  baseURL: "/api",
  // 设置请求超时时间
  timeout: 3000,
});
// 添加请求拦截器  interceptors是axios的拦截器
http.interceptors.request.use(
  (config) => {
    return config;
    // 判断登录状态是否有token
    // 如果有token就带上 没有就跳转到登录界面
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
http.interceptors.response.use((response) => {
  return response;
}),
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  };
