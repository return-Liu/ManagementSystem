// 引入vue
import Vue from "vue";
// 引入路由
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 创建路由组件
// import User from "../views/User";
import Main from "../views/Main";
// import Mall from "../views/Mall";
// import ProductType from "../views/ProductType";
import Login from "../views/Login";
import Register from "../views/Register";
// import LanguageScreen from "../views/LanguageScreen";
// 1.创建路由组件
// 2.将组件与组件进行映射
// 3.创建路由规则
const routes = [
  // 主路由
  {
    path: "/",
    component: Main,
    redirect: "/login", //重定向
    name: "Main",
    children: [
      // {
      //   // 子路由
      //   name: "home",
      //   path: "home", //首页
      //   component: Home,
      // },
      // {
      //   name: "user",
      //   path: "user", //用户管理
      //   component: User,
      // },
      // {
      //   name: "mall",
      //   path: "mall", // 商品管理
      //   component: Mall,
      // },
      // {
      //   name: "productype",
      //   path: "productype",
      //   component: ProductType, //商品类型
      // },
      // {
      //   name: "languagescreen",
      //   path: "languagescreen",
      //   component: LanguageScreen, //数据大屏
      // },
    ],
  },
  {
    path: "/login", //登录
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
