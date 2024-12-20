import cookie from "js-cookie";

export default {
  state: {
    // 用于控制菜单的展开还是收起
    isCollapse: false,
    // // 用于控制是否显示logo
    // isLogo: true,
    tabsList: [
      // 面包屑数据
      {
        path: "/",
        name: "home",
        lable: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    // 菜单数据
    menu: [],
  },
  mutations: {
    // 清空标签列表
    CLEAR_TABS_LIST(state) {
      state.tabsList = [
        {
          path: "/",
          name: "home",
          lable: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
      ];
    },
    // 修改菜单展开收起方法
    CollapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 跳转对应的tag
    addTabs(state, val) {
      // 请求是否为首页
      if (val.name !== "home") {
        // 判断是否已经存在
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    // 删除指定的tag
    closeRemove(state, item) {
      const index = state.tabsList.findIndex((val) => val.name === item.name);
      state.tabsList.splice(index, 1);
    },
    // 获取菜单数据
    setMenu(state, val) {
      state.menu = val;
      cookie.set("menu", JSON.stringify(val));
    },
    // 组件动态路由
    addMenu(state, router) {
      // console.log("addMenu called with state:", state); // 动态路由数据
      if (!cookie.get("menu")) return;
      const menu = JSON.parse(cookie.get("menu"));
      state.menu = menu;
      // console.log("Parsed menu:", menu); // 解析后的菜单数据

      // 处理动态路由的数据
      let menuarray = []; // 声明一个空数组
      // 有子菜单
      menu.forEach((item) => {
        if (item.children) {
          item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          // 解构赋值
          menuarray.push(...item.children);
        } else {
          // 没有子菜单
          item.component = () => import(`../views/${item.url}`);
          menuarray.push(item);
        }
      });

      // 动态路由的添加
      menuarray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};
