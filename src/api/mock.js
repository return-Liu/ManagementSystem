import Mock from "mockjs";
import home from "./mockServerData/home";
import user from "./mockServerData/user";
import mall from "./mockServerData/mall";
import permission from "./mockServerData/permission";
import permissions from "./mockServerData/permissions";

// 定义mock请求拦截
Mock.mock("/api/home/getListData", home.getListData);

// 登录拦截
Mock.mock(/api\/permission\/getMenu/, "post", permission.getMenu);
// 注册拦截
Mock.mock(/api\/permissions\/getMenu/, "post", permissions.getMenu);

// 定义用户列表的数据
// 添加
Mock.mock("/api/user/add", "post", user.createUser);
// 编辑
Mock.mock("/api/user/edit", "post", user.updateUser);
// 删除
Mock.mock("/api/user/del", "post", user.deleteUser);
// 批量删除
Mock.mock("/api/user/bat", "post", user.batchremove);
// 请求用户列表
Mock.mock(/api\/user\/getUser/, user.getUserList);

// 定义商品列表的数据
// 添加
Mock.mock("/api/mall/add", "post", mall.createProduct);
// 编辑
Mock.mock("/api/mall/edit", "post", mall.updateProduct);
// 删除
Mock.mock("/api/mall/del", "post", mall.deleteProduct);
// 批量删除
Mock.mock("/api/mall/bat", "post", mall.batchProduct);
// 请求商品列表
Mock.mock(/api\/mall\/getMall/, mall.getProductList);
