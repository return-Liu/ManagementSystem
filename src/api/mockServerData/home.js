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
          { value: "十堰市", label: "十堰" },
          { value: "奉新县", label: "奉新" },
          { value: "后续会增加更多地区", label: "后续会增加更多地区" },
        ],
        // 项目列表
        DataList: [
          {
            title: "Github",
            p: "不要等待机会, 而是要创造机会",
            name: "开源组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "Vue",
            p: "现在的你决定将来的你",
            name: "算法组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "Html5",
            p: "没有什么才能比努力更重要",
            name: "增强组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "Elment UI",
            p: "技术的尽头是空间想象力",
            name: "UI组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "React",
            p: "健康的身体是是实现目标的基石",
            name: "技术组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "javascript",
            p: "路就是走出来的,而不是空想出来的",
            name: "架构组",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新列表
        newList: [
          {
            name: "优化了部分功能 新增了全新功能 例如:查看头像功能 查看表格数据 引入高德地图可视化数据 权限管理增删改查等等",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新项目列表更多
        DataListMore: [
          {
            title: "Vuex",
            p: "实践出真知，理论指导实践",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "Vue-router",
            p: "细节决定成败，态度决定一切",
            name: "后端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            title: "axios",
            p: "代码如诗，优雅简洁",
            name: "全栈开发组",
            time: formatTime(currentTimeISO),
          },
        ],
        // 最新动态更多
        newListMore: [
          {
            name: "优化了部分功能 新增了全新功能 例如:查看头像功能 查看表格数据 引入高德地图可视化数据 权限管理增删改查等等",
            time: formatTime(currentTimeISO),
          },
          {
            name: "新增了导入导出excel功能 导入excel目前存在错误bug 目前正在排查 会尽快解决",
            time: formatTime(currentTimeISO),
          },
        ],
        message: "获取成功",
      },
    };
  },
};
