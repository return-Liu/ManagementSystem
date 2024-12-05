// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from "vuex";
import tab from "./tab";
import header from "./header";
import persist from "./persist";

Vue.use(Vuex);

// 创建store实例
export default new Vuex.Store({
  modules: {
    tab,
    header,
  },
  plugins: [persist],
});
