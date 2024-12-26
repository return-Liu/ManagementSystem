## 功能主要

1. 登录注册功能
2. 菜单栏功能
3. 权限管理功能
4. 搜索功能 增删改查与批量操作功能 分页功能 tag 标签功能 面包屑功能 查询天气功能 更多列表 导入导出功能 地图(高德地图随时展示信息)
5. 头像上传功能 模式选择(主题风格模式 色彩模式 导航模式 其他模式) 侧边栏折叠功能 vuex 持久化 路由加载状态

## 账号演示

测试账号
普通用户 任意账号密码
注意：
普通用户 没有全部权限,只有部分功能。

## 项目依赖包版本

由于项目依赖包版本过高，部分功能可能无法使用，请自行升级相关依赖包

项目依赖包版本:node v20.11.0

## 开发

github 与 gitee 仓库地址:

1.git clone https://github.com/return-Liu/ManagementSystem.git(注意:要从master分支拉取代码)

2.cd ManagementSystem

3.npm install

本地运行:
npm run serve 运行之后，会默认打开本地访问路径：http://localhost:8080

发布:
npm run build (生成打包之后的项目文件,此文件主要用于项目部署)。

gitee 托管平台更新版本信息将不再有 转移至 github

1.git clone https://gitee.com/publishnsodqmodd/merchandise-backend.git(注意:要从master分支拉取代码)

2.cd merchandise-backend

3.npm install

## 运行项目

可以通过 npm run serve 启动项目
如有问题可查看官网 https://cli.vuejs.org/zh/guide/
运行项目前请确保本地已安装 nodejs 和 npm

温馨提示：

本项目图标线上地址为://https://element.eleme.cn

1.执行 npm run serve 报错处理方案：

可能是你的本机安装 nodejs 版本过低，请卸载 nodejs 低版本，重新安装较高版本(如 v20.11.0)； 或者通过安装 nvm 来切换到较高版本也可以实现正常启动
