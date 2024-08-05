import Mock from "mockjs";

// 图表数据
const generateListData = () => {
  console.log("生成数据");
  const List = [];
  for (let i = 0; i < 4; i++) {
    List.push(
      Mock.mock({
        用户类型: Mock.Random.float(100, 3000, 0, 2), // 生成100到3000之间的浮点数，保留2位小数
        登录时间: Mock.Random.datetime("yyyy-MM-dd HH:mm:ss"), // 生成随机日期时间
        退出时间: Mock.Random.datetime("yyyy-MM-dd HH:mm:ss"), // 同上
      })
    );
  }
  return List;
};
export default {
  getListData: () => {
    const generatedData = generateListData();
    return {
      code: 200, // 通常成功状态码为200
      data: {
        UserData: [
          {
            userType: "管理员", //用户类型
            loginTime: "2023-04-01 12:00:00", // 登录时间
            logoutTime: "2023-04-01 13:00:00", // 退出时间
            userData: generatedData, // 用户数据
          },
        ],
      },
    };
  },
};
