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
    // 确保 requestBody 存在且包含 username 和 password 和 passwords 属性
    if (
      !requestBody ||
      !requestBody.username ||
      !requestBody.password ||
      !requestBody.passwords
    ) {
      return {
        code: -2,
        data: {
          message: "缺少必要的参数（username 或 password 或 passwords）",
        },
      };
    }
    const { username, password, passwords } = requestBody;
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    // 两次输入的密码是否相同
    if (
      username === "admin" &&
      password === "123456" &&
      passwords === "123456"
    ) {
      //    注册成功

      return {
        code: 200,
        data: {
          message: "注册成功",
        },
        token: Mock.Random.guid(),
        message: "获取成功",
      };
    } else if (
      username === "user" &&
      password === "123456" &&
      passwords === "123456"
    ) {
      return {
        code: 200,
        data: {
          message: "注册成功",
        },
        token: Mock.Random.guid(),
        message: "获取成功",
      };
    } else {
      return {
        code: -999,
        data: {
          message: "注册失败",
        },
      };
    }
  },
};
