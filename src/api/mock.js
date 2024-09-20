import Mock from "mockjs";
import home from "./mockServerData/home";
import user from "./mockServerData/user";
import mall from "./mockServerData/mall";
import login from "./mockServerData/login";
import register from "./mockServerData/register";

// 定义mock请求拦截
Mock.mock("/api/home/getListData", home.getListData);
// 登录拦截
Mock.mock(/api\/login\/getMenu/, "post", login.getMenu);
// 注册拦截
Mock.mock(/api\/register\/getMenu/, "post", register.getMenu);

// 定义用户列表的数据
// 新增
Mock.mock("/api/user/add", "post", user.createUser);
// 编辑
Mock.mock("/api/user/edit", "post", user.updateUser);
// 删除和批量删除
Mock.mock("/api/user/del", "post", user.deleteOrBatch);
// 请求用户列表
Mock.mock(/api\/user\/getUser/, user.getUserList);

// 定义产品列表的数据
// 新增
Mock.mock("/api/mall/add", "post", mall.createProduct);
// 编辑
Mock.mock("/api/mall/edit", "post", mall.updateProduct);
// 删除和批量删除
Mock.mock("/api/mall/del", "post", mall.deleteOrBatch);
// 请求商品列表
Mock.mock(/api\/mall\/getMall/, mall.getProductList);
