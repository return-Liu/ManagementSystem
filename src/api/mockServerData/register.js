import Mock from "mockjs";

export default{
  getRegister:(config)=>{
	  // 声明一个变量来存储请求体
	    let requestBody;
	    try {
	      // 如果解析请求体成功 说明请求体是有效JSON字符串，解析为对象
	      requestBody = JSON.parse(config.body);
	      console.log("Parsed request body:", requestBody); // 调试信息
	    } catch (error) {
	      console.error("Failed to parse request body:", error); // 调试信息
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
	      console.error("Missing necessary parameters in request body:", requestBody); // 调试信息
	      return {
	        code: -1,
	        data: {
	          message: "缺少必要的参数",
	        },
	      };
	    }
	  
	    const { username, password, passwords } = requestBody;
	  
	    // 判断两次输入的密码是否一致
	    if (password !== passwords) {
	      return {
	        code: -1,
	        data: {
	          message: "两次输入的密码不一致",
	        },
	      };
	    }
	    // 模拟用户注册成功
	    return {
	      code: 200,
	      data: {
	        message: "注册成功",
	      },
	      // 模拟token
	      token: Mock.Random.guid(),
	    };
  }
}
