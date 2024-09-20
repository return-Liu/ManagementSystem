import http from "../utils/request";

// 请求首页数据
export const getListData = () => {
  // 返回一个promise对象
  return http.get("/home/getListData");
};

// 获取用户列表
export const getUser = (params) => {
  // console.log(params, "params");
  // 返回用户列表
  return http.get("/user/getUser", params);
};
// 添加用户

export const addUser = (data) => {
  return http.post("/user/add", data);
};
// 编辑用户

export const editUser = (data) => {
  return http.post("/user/edit", data);
};

// 删除和批量删除
export const delUser = (data) => {
  return http.post("/user/del", data);
};

// 获取商品列表
export const getMall = (param) => {
  console.log(param, "param");
  return http.get("/mall/getMall", param);
};

// 增加商品
export const addMall = (data) => {
  return http.post("/mall/add", data);
};
// 编辑商品
export const editMall = (data) => {
  return http.post("/mall/edit", data);
};
// 删除和批量删除
export const delMall = (data) => {
  return http.post("/mall/del", data);
};

// 获取动态菜单
export const getMenu = (data) => {
  return http.post("/login/getMenu", data);
};
// 注册
export const getRegister = (data) => {
  return http.post("/register/getMenu", data);
};
