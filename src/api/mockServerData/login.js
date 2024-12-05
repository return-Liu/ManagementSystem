import Mock from "mockjs";
// 添加默认头像
const avatar =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
const user_data = {
  admin: {
    roles: "超级管理员",
    avatar,
    menu: [
      {
        path: "/home",
        name: "home",
        lable: "首页",
        icon: "s-home",
        url: "Home.vue",
      },
      {
        path: "/products",
        name: "products",
        lable: "产品管理",
        icon: "s-grid",
        url: "Products.vue",
      },
      {
        path: "/users",
        name: "users",
        lable: "用户管理",
        icon: "user-solid",
        url: "User.vue",
      },
      {
        path: "/mapintegration",
        name: "mapintegration",
        lable: "高德地图",
        icon: "s-promotion",
        url: "Mapintegration.vue",
      },
      {
        path: "/permissionmanagement",
        name: "permissionmanagement",
        lable: "权限管理",
        icon: "s-custom",
        url: "PermissionsManagement.vue",
      },
      {
        lable: "其他",
        icon: "pie-chart",
        children: [
          {
            path: "/datamanagement",
            name: "datamanagement",
            lable: "数据展示",
            icon: "s-custom",
            url: "DataManagement.vue",
          },
          {
            path: "/personalcenter",
            name: "personalcenter",
            lable: "个人中心",
            icon: "s-custom",
            url: "PersonalCenter.vue",
          },
        ],
      },
    ],
  },
  user: {
    roles: "普通管理员",
    avatar,
    menu: [],
  },
  guest: {
    roles: "普通用户",
    avatar,
    messages: "此账号仅可查看 支持一些功能，不可操作",
    menu: [],
  },
};
// 将 admin 的菜单解构给 user
const { menu: adminMenu } = user_data.admin;
user_data.user.menu = adminMenu;

// 将 admin 的菜单解构给 guest
const { menu: guestMenu } = user_data.admin;
user_data.guest.menu = guestMenu;

const ERROR_MESSAGES = {
  INVALID_JSON: "请求体格式错误，请确保发送了有效的JSON数据",
  MISSING_PARAMS: "缺少必要的参数（username 或 password）",
  WRONG_PASSWORD: "密码错误",
};
// 登录成功随机生成token
const generateToken = () => Mock.Random.guid();

export default {
  // 模拟后端返回的菜单数据
  getMenu: (config) => {
    // 解析请求体
    let requestBody;
    try {
      requestBody = JSON.parse(config.body);
    } catch (error) {
      return { code: -1, data: { message: ERROR_MESSAGES.INVALID_JSON } };
    }

    // 验证请求体
    if (!requestBody || !requestBody.username || !requestBody.password) {
      return { code: -2, data: { message: ERROR_MESSAGES.MISSING_PARAMS } };
    }

    const { username, password } = requestBody;

    // 验证用户
    if (username === "admin" && password === "123456") {
      const userData = user_data.admin;
      return {
        code: 200,
        data: {
          ...userData,
          token: generateToken(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "123456") {
      const userData = user_data.user;
      return {
        code: 200,
        data: {
          ...userData,
          token: generateToken(),
          message: "获取成功",
        },
      };
    } else {
      const userData = user_data.guest;
      return {
        code: 200,
        data: {
          ...userData,
          token: generateToken(),
          message: "获取成功",
        },
      };
    }
  },
};
