import Mock from "mockjs";
export default {
  // 模拟后端返回的菜单数据
  getMenu: (config) => {
    // 声明一个变量来存储请求体
    let requestBody;
    try {
      // 如果解析请求体成功 说明请求体是有效JSON字符串，解析为对象
      requestBody = JSON.parse(config.body);
    } catch (error) {
      // 如果解析失败体失败，说明请求体不是有效的JSON，返回错误信息
      return {
        // 返回错误码
        code: -1,
        data: {
          // 返回错误信息
          message: "请求体格式错误，请确保发送了有效的JSON数据",
        },
      };
    }
    // 确保 requestBody 存在且包含 username 和 password 属性
    if (!requestBody || !requestBody.username || !requestBody.password) {
      return {
        code: -2,
        data: {
          message: "缺少必要的参数（username 或 password）",
        },
      };
    }
    const { username, password } = requestBody;
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "123456") {
      return {
        // 请求成功时为状态码200时 返回数据
        code: 200,
        data: {
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
              lable: "产品列表",
              icon: "s-grid",
              url: "Products.vue",
            },
            {
              path: "/users",
              name: "users",
              lable: "用户列表",
              icon: "user-solid",
              url: "User.vue",
            },
            {
              lable: "其他",
              icon: "pie-chart",
              children: [
                {
                  path: "/datamanagement",
                  name: "datamanagement",
                  lable: "数据管理",
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
          // 模拟token
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "123456") {
      return {
        code: 200,
        data: {
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
              lable: "产品列表",
              icon: "s-grid",
              url: "Products.vue",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
        token: Mock.Random.guid(),
        message: "获取失败",
      };
    }
  },
};
