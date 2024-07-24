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
// 引入主题样式
import "./style/theme.css";
// 引入cookie
import cookie from "js-cookie";
// 全局引入 element ui库
import ElementUI from "element-ui";
// 引入Element UI的默认主题样式
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 创建事件总线实例
export const eventBus = new Vue();
//   添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否有token
  const token = cookie.get("token");
  if (!token && to.name !== "login" && to.name !== "register") {
    // 如果token不存在 则跳转登录页面
    next({ name: "login" });
    // 判断token存在 则跳转首页
  } else if (token && to.name == "login") {
    next({ name: "home" });
  } else if (token && to.name == "register") {
    next({ name: "login" });
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
    store.commit("addMenu", router);
  },
}).$mount("#app");
