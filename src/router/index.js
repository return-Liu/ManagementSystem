// 引入vue
import Vue from "vue";
// 引入路由
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 创建路由组件
import Main from "../views/Main";
import Login from "../views/Login";
import Register from "../views/Register";
// 1.创建路由组件
// 2.将组件与组件进行映射
// 3.创建路由规则
const routes = [
  // 主路由
  {
    path: "/",
    component: Main,
    redirect: "/login/index", //重定向
    name: "Main",
  },

  {
    path: "/login/index", //登录
    name: "login",
    component: Login,
  },
  {
    path: "/register", //注册
    name: "register",
    component: Register,
  },
];
// 创建路由实例并暴露
export default new VueRouter({
  routes,
  mode: "history", // 路由模式
});
