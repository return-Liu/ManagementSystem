import Mock from "mockjs";
export default {
  // config 为请求体
  getMenu: (config) => {
    // 声明一个变量来存储请求体
    let requestBody;
    try {
      // 如果解析请求体成功 说明请求体是有效JSON字符串，解析为对象
      requestBody = JSON.parse(config.body);
    } catch (error) {
      return {
        code: -1,
        data: {
          message: "请求体不是有效的JSON字符串",
        },
      };
    }

    // 确保请求体中包含username和password与passwords
    if (
      !requestBody ||
      !requestBody.username ||
      !requestBody.password ||
      !requestBody.passwords
    ) {
      return {
        code: -1,
        data: {
          message: "缺少必要的参数",
        },
      };
    }

    const { username, password, passwords } = requestBody;

    // 先判断用户是否存在
    // 判断账号和密码是否对应
    // 再判断密码是否一致
    if (
      username === "admin" &&
      password === "123456" &&
      passwords === "123456"
    ) {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/login",
              name: "login",
              label: "登录",
              url: "Login.vue",
            },
          ],
        },
      };
    } else {
      return {
        // 随意登录
        code: 200,
        data: {
          menu: [
            {
              path: "/login",
              name: "login",
              label: "登录",
              url: "Login.vue",
            },
          ],
        },
        // 模拟token
        token: Mock.Random.guid(),
        message: "获取成功",
      };
    }
  },
};
