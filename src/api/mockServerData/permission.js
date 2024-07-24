import Mock from "mockjs";
export default {
  getMenu: (config) => {
    let requestBody;
    try {
      requestBody = JSON.parse(config.body);
    } catch (error) {
      // 如果解析失败，说明请求体不是有效的JSON，返回错误信息
      return {
        code: -1,
        data: {
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
        code: 20000,
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
              path: "/mall",
              name: "mall",
              lable: "商品管理",
              icon: "s-grid",
              url: "Mall.vue",
            },
            {
              path: "/user",
              name: "user",
              lable: "用户管理",
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
                  path: "/languagescreen",
                  name: "languagescreen",
                  lable: "数据大屏",
                  icon: "s-custom",
                  url: "LanguageScreen.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "123456") {
      return {
        code: 20000,
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
              path: "/mall",
              name: "mall",
              lable: "商品管理",
              icon: "s-grid",
              url: "MallManage/MallManage",
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
      };
    }
  },
};
