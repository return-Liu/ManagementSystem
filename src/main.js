// 引入vue
import Vue from "vue";
// 引入核心App
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 引入vuex
import store from "./store";
// 引入mock
import "./api/mock";
// 引入scss主题样式
import "./sass_style/theme.scss";
// 引入cookie
import cookie from "js-cookie";
// 全局引入 element ui库
import ElementUI from "element-ui";
// 引入Element UI的默认主题样式
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入阿里巴巴矢量图标库
import "./assets/icon/iconfont.css";
// 引入数据可视化
import dataV from "@jiaminghi/data-view";
// 使用插件
Vue.use(dataV);
// 引入动画样式
import "animate.css";
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const token = cookie.get("token");
  if (
    !token &&
    to.path !== "/login/index" &&
    to.path !== "/register" &&
    to.path !== "/forgetpassword" &&
    to.path !== "/phoneveriflion"
  ) {
    // 如果token不存在 则跳转登录页面
    next({ path: "/login/index" });
  } else if (token && to.path === "/login/index") {
    // 判断token存在 则跳转首页
    next({ path: "/home" });
  } else {
    next();
  }
});
// 创建vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
  // 在vue实例上创建动态添加菜单
  created() {
    // 动态添加菜单
    store.commit("addMenu", router);
  },
}).$mount("#app");
