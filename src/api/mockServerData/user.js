import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    })
  );
}
/**
 * 将 ISO 8601 时间字符串转换为年月日格式
 * @param {string} isoString - ISO 8601 时间字符串
 * @returns {string} 年月日格式的日期字符串
 */
// 定义一个辅助函数 formatBirthDate 来处理日期格式化：
function formatBirthDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: (config) => {
    // console.log(config, "config");
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    // console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
    const mockList = List.filter((user) => {
      if (
        name &&
        user.name.indexOf(name) === -1 &&
        user.addr.indexOf(name) === -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },

  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));

    List.unshift({
      id: id,
      name: name,
      addr: addr,
      age: age,
      birth: formatBirthDate(birth),
      sex: sex,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * 删除和批量删除用户
   * @param {*} config
   * @return {{code: number, data: {message: string}}
   */
  deleteOrBatch: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return { code: -1, message: "缺少参数" };
    }
    const user = List.find((item) => item.id === id);
    if (!user) {
      return { code: -1, message: "用户不存在" };
    }
    List.splice(List.indexOf(user), 1);
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    const sex_num = parseInt(sex);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = formatBirthDate(birth); // 使用 formatBirthDate 函数格式化日期
        u.sex = sex_num;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
};
