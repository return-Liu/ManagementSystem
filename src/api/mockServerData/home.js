// 定义一个函数来转换时间格式
const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
export default {
  getListData: () => {
    // 获取当前时间的 ISO 8601 格式字符串
    const currentTimeISO = new Date().toISOString();
    return {
      code: 200, // 通常成功状态码为200
      data: {
        // 城市列表
        cities: [
          { value: "北京市", label: "北京" },
          { value: "上海市", label: "上海" },
          { value: "广州市", label: "广州" },
          { value: "深圳市", label: "深圳" },
          { value: "宜春市", label: "宜春" },
          { value: "杭州市", label: "杭州" },
          { value: "重庆市", label: "重庆" },
          { value: "南京市", label: "南京" },
          { value: "成都市", label: "成都" },
          { value: "武汉市", label: "武汉" },
          { value: "长沙市", label: "长沙" },
          { value: "天津市", label: "天津" },
          { value: "西安市", label: "西安" },
          { value: "昆明市", label: "昆明" },
          { value: "青岛市", label: "青岛" },
          { value: "苏州市", label: "苏州" },
          { value: "宁波市", label: "宁波" },
          { value: "郑州市", label: "郑州" },
          { value: "福州市", label: "福州" },
          { value: "厦门市", label: "厦门" },
          { value: "济南市", label: "济南" },
          { value: "合肥市", label: "合肥" },
          { value: "东莞市", label: "东莞" },
          { value: "佛山市", label: "佛山" },
          { value: "无锡市", label: "无锡" },
          { value: "南昌市", label: "南昌" },
          { value: "哈尔滨市", label: "哈尔滨" },
          { value: "长春市", label: "长春" },
          { value: "沈阳市", label: "沈阳" },
          { value: "大连市", label: "大连" },
          { value: "泉州市", label: "泉州" },
          { value: "温州市", label: "温州" },
          { value: "石家庄市", label: "石家庄" },
          { value: "太原市", label: "太原" },
          { value: "南宁市", label: "南宁" },
          { value: "贵阳市", label: "贵阳" },
          { value: "乌鲁木齐市", label: "乌鲁木齐" },
          { value: "兰州市", label: "兰州" },
          { value: "西宁市", label: "西宁" },
          { value: "银川市", label: "银川" },
          { value: "呼和浩特市", label: "呼和浩特" },
          { value: "包头市", label: "包头" },
          { value: "奉新县", label: "奉新" },
          { value: "青云谱", label: "青云谱" },
          { value: "莲池", label: "莲池" },
          { value: "后续会增加更多地区", label: "后续会增加更多地区" },
        ],
        // 项目列表
        DataList: [
          {
            id: 1,
            title: "Github",
            p: "不要等待机会, 而是要创造机会",
            name: "开源组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 2,
            title: "Vue",
            p: "现在的你决定将来的你",
            name: "算法组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 3,
            title: "Html5",
            p: "没有什么才能比努力更重要",
            name: "增强组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 4,
            title: "Elment UI",
            p: "技术的尽头是空间想象力",
            name: "UI组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 5,
            title: "React",
            p: "健康的身体是是实现目标的基石",
            name: "技术组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 6,
            title: "javascript",
            p: "路就是走出来的,而不是空想出来的",
            name: "架构组",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新列表
        newList: [
          {
            id: 1,
            name: "优化了部分功能 新增了全新功能 例如:查看头像功能 查看表格数据 引入高德地图可视化数据 权限管理增删改查等等",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新项目列表更多
        DataListMore: [
          {
            id: 1,
            title: "Vuex",
            p: "实践出真知，理论指导实践",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 2,
            title: "Vue-router",
            p: "细节决定成败，态度决定一切",
            name: "后端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 3,
            title: "axios",
            p: "代码如诗，优雅简洁",
            name: "全栈开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 4,
            title: "vue-cli",
            p: "vue-cli 是一个官方的脚手架工具，用于快速搭建基于 Vue.js 的单页面应用",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "vue-schart",
            p: "vue-schart 是一个基于 canvas 的图表组件，基于schart.js封装而成，使用更简单，更轻量。",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 5,
            title: "vue-cropper",
            p: "vue-cropper 是一款vue图片裁剪插件，基于babel+rollup+css-loader+vue-loader封装的vue组件，支持vue单文件组件语法。",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 6,
            title: "vue-quill-editor",
            p: "vue-quill-editor 是一个基于vue.js的富文本编辑器组件，基于quill封装而成，使用更简单，更轻量。",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新动态更多
        newListMore: [
          {
            id: 1,
            name: "优化了部分功能 新增了全新功能 例如:查看头像功能 查看表格数据 引入高德地图可视化数据 权限管理增删改查等等",
            time: "2024-11-28",
          },
          {
            id: 2,
            name: "新增了导入导出excel功能 导入excel目前存在错误bug 目前正在排查 会尽快解决",
            time: "2024-12-1",
          },
          {
            id: 3,
            name: "加强对页面UI的优化 对布局设置的页面进行了全新设计 功能如下(主题风格设置,色彩模式,导航模式,其他设置)",
            time: "2024-12-2",
          },
          {
            id: 4,
            name: "由gitee迁移至github gitee将停止更新 请关注项目地址 https://github.com/return-Liu/ManagementSystem.git 之后项目可能还会选择gitee平台 敬请期待",
            time: "2024-12-8",
          },
          {
            id: 5,
            name: "由于退出账号时 头像会出现默认头像的问题 目前未解决 可以重新获取头像 只有在不退出账号的情况下 才会出现该问题",
            time: "2024-12-11",
          },
          {
            id: 6,
            name: "头像问题:排查到由于默认头像是初始头像 并没有存储更换后的头像 所以导致退出再登录时还是默认头像 在下个版本将会修复该问题",
            time: "2024-12-11",
          },
          {
            id: 7,
            name: "头像问题:已解决 退出账号时 存储了更换后的头像 所以不会出现默认头像的问题",
            time: "2024-12-15",
          },
        ],
        message: "获取成功",
      },
    };
  },
};
