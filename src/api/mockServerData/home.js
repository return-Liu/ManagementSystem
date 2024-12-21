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
          { value: "南昌市", label: "南昌市" },
          { value: "景德镇市", label: "景德镇市" },
          { value: "萍乡市", label: "萍乡市" },
          { value: "九江市", label: "九江市" },
          { value: "新余市", label: "新余市" },
          { value: "鹰潭市", label: "鹰潭市" },
          { value: "赣州市", label: "赣州市" },
          { value: "吉安市", label: "吉安市" },
          { value: "宜春市", label: "宜春市" },
          { value: "抚州市", label: "抚州市" },
          { value: "上饶市", label: "上饶市" },
          // 南昌市
          { value: "东湖区", label: "东湖区", city: "南昌市" },
          { value: "西湖区", label: "西湖区", city: "南昌市" },
          { value: "青云谱区", label: "青云谱区", city: "南昌市" },
          { value: "湾里区", label: "湾里区", city: "南昌市" },
          { value: "青山湖区", label: "青山湖区", city: "南昌市" },
          { value: "新建区", label: "新建区", city: "南昌市" },
          { value: "南昌县", label: "南昌县", city: "南昌市" },
          { value: "安义县", label: "安义县", city: "南昌市" },
          { value: "进贤县", label: "进贤县", city: "南昌市" },
          // 景德镇市
          { value: "昌江区", label: "昌江区", city: "景德镇市" },
          { value: "珠山区", label: "珠山区", city: "景德镇市" },
          { value: "浮梁县", label: "浮梁县", city: "景德镇市" },
          { value: "乐平市", label: "乐平市", city: "景德镇市" },
          // 萍乡市
          { value: "安源区", label: "安源区", city: "萍乡市" },
          { value: "湘东区", label: "湘东区", city: "萍乡市" },
          { value: "莲花县", label: "莲花县", city: "萍乡市" },
          { value: "上栗县", label: "上栗县", city: "萍乡市" },
          { value: "芦溪县", label: "芦溪县", city: "萍乡市" },
          // 九江市
          { value: "濂溪区", label: "濂溪区", city: "九江市" },
          { value: "浔阳区", label: "浔阳区", city: "九江市" },
          { value: "柴桑区", label: "柴桑区", city: "九江市" },
          { value: "武宁县", label: "武宁县", city: "九江市" },
          { value: "修水县", label: "修水县", city: "九江市" },
          { value: "永修县", label: "永修县", city: "九江市" },
          { value: "德安县", label: "德安县", city: "九江市" },
          { value: "都昌县", label: "都昌县", city: "九江市" },
          { value: "湖口县", label: "湖口县", city: "九江市" },
          { value: "彭泽县", label: "彭泽县", city: "九江市" },
          { value: "瑞昌市", label: "瑞昌市", city: "九江市" },
          { value: "共青城市", label: "共青城市", city: "九江市" },
          { value: "庐山市", label: "庐山市", city: "九江市" },
          // 新余市
          { value: "渝水区", label: "渝水区", city: "新余市" },
          { value: "分宜县", label: "分宜县", city: "新余市" },
          // 鹰潭市
          { value: "月湖区", label: "月湖区", city: "鹰潭市" },
          { value: "余江区", label: "余江区", city: "鹰潭市" },
          { value: "贵溪市", label: "贵溪市", city: "鹰潭市" },
          { value: "余江市", label: "余江市", city: "鹰潭市" },
          // 赣州市
          { value: "章贡区", label: "章贡区", city: "赣州市" },
          { value: "南康区", label: "南康区", city: "赣州市" },
          { value: "赣县区", label: "赣县区", city: "赣州市" },
          { value: "信丰县", label: "信丰县", city: "赣州市" },
          { value: "大余县", label: "大余县", city: "赣州市" },
          { value: "上犹县", label: "上犹县", city: "赣州市" },
          { value: "崇义县", label: "崇义县", city: "赣州市" },
          { value: "安远县", label: "安远县", city: "赣州市" },
          { value: "龙南市", label: "龙南市", city: "赣州市" },
          { value: "定南县", label: "定南县", city: "赣州市" },
          { value: "全南县", label: "全南县", city: "赣州市" },
          { value: "宁都县", label: "宁都县", city: "赣州市" },
          { value: "于都县", label: "于都县", city: "赣州市" },
          { value: "兴国县", label: "兴国县", city: "赣州市" },
          { value: "会昌县", label: "会昌县", city: "赣州市" },
          { value: "寻乌县", label: "寻乌县", city: "赣州市" },
          { value: "石城县", label: "石城县", city: "赣州市" },
          { value: "瑞金市", label: "瑞金市", city: "赣州市" },
          { value: "南康市", label: "南康市", city: "赣州市" },
          // 吉安市
          { value: "吉州区", label: "吉州区", city: "吉安市" },
          { value: "青原区", label: "青原区", city: "吉安市" },
          { value: "吉安县", label: "吉安县", city: "吉安市" },
          { value: "吉水县", label: "吉水县", city: "吉安市" },
          { value: "峡江县", label: "峡江县", city: "吉安市" },
          { value: "新干县", label: "新干县", city: "吉安市" },
          { value: "永丰县", label: "永丰县", city: "吉安市" },
          { value: "泰和县", label: "泰和县", city: "吉安市" },
          { value: "遂川县", label: "遂川县", city: "吉安市" },
          { value: "万安县", label: "万安县", city: "吉安市" },
          { value: "安福县", label: "安福县", city: "吉安市" },
          { value: "永新县", label: "永新县", city: "吉安市" },
          { value: "井冈山市", label: "井冈山市", city: "吉安市" },
          // 宜春市
          { value: "袁州区", label: "袁州区", city: "宜春市" },
          { value: "奉新县", label: "奉新县", city: "宜春市" },
          { value: "万载县", label: "万载县", city: "宜春市" },
          { value: "上高县", label: "上高县", city: "宜春市" },
          { value: "宜丰县", label: "宜丰县", city: "宜春市" },
          { value: "靖安县", label: "靖安县", city: "宜春市" },
          { value: "铜鼓县", label: "铜鼓县", city: "宜春市" },
          { value: "丰城市", label: "丰城市", city: "宜春市" },
          { value: "樟树市", label: "樟树市", city: "宜春市" },
          { value: "高安市", label: "高安市", city: "宜春市" },
          // 抚州市
          { value: "临川区", label: "临川区", city: "抚州市" },
          { value: "东乡区", label: "东乡区", city: "抚州市" },
          { value: "南城县", label: "南城县", city: "抚州市" },
          { value: "黎川县", label: "黎川县", city: "抚州市" },
          { value: "南丰县", label: "南丰县", city: "抚州市" },
          { value: "崇仁县", label: "崇仁县", city: "抚州市" },
          { value: "乐安县", label: "乐安县", city: "抚州市" },
          { value: "宜黄县", label: "宜黄县", city: "抚州市" },
          { value: "金溪县", label: "金溪县", city: "抚州市" },
          { value: "资溪县", label: "资溪县", city: "抚州市" },
          { value: "东临新区", label: "东临新区", city: "抚州市" },
          { value: "广昌县", label: "广昌县", city: "抚州市" },
          // 上饶市
          { value: "信州区", label: "信州区", city: "上饶市" },
          { value: "广丰区", label: "广丰区", city: "上饶市" },
          { value: "广信区", label: "广信区", city: "上饶市" },
          { value: "玉山县", label: "玉山县", city: "上饶市" },
          { value: "铅山县", label: "铅山县", city: "上饶市" },
          { value: "横峰县", label: "横峰县", city: "上饶市" },
          { value: "弋阳县", label: "弋阳县", city: "上饶市" },
          { value: "余干县", label: "余干县", city: "上饶市" },
          { value: "鄱阳县", label: "鄱阳县", city: "上饶市" },
          { value: "万年县", label: "万年县", city: "上饶市" },
          { value: "婺源县", label: "婺源县", city: "上饶市" },
          { value: "德兴市", label: "德兴市", city: "上饶市" },
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
            time: "2024-11-05",
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
          {
            id: 7,
            title: "vue-echarts",
            p: "vue-echarts 是一款基于vue.js的图表组件，基于echarts封装而成，使用更简单，更轻量。",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 8,
            title: "vue-count-to",
            p: "vue-count-to 是一款vue.js的数字滚动插件，基于countup.js封装而成，使用更简单",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 9,
            title: "vue-pinia",
            p: "vue-pinia 是一款基于vue.js的pinia状态管理插件，基于pinia封装而成，使用更简单，更轻量。",
            name: "前端开发组",
            time: formatTime(currentTimeISO),
          },
          {
            id: 10,
            title: "vue-element-admin",
            p: "vue-element-admin 是一款后台管理系统的模板，基于vue.js + element-ui + vuex + vue-router + axios + webpack封装的模板，使用更简单，更轻量。",
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
          {
            id: 8,
            name: "全新使用mixin 进行代码复用 减少代码重复 提升代码可读性 降低代码维护成本和使用nanoid随机生成id 避免id重复",
            time: "2024-12-19",
          },
          {
            id: 9,
            name: "主要修改点:暗色主题与新增权限管理的角色选项 添加头像的类型 登录成功后会获取Uid 用于判断是否登录",
            time: "2024-12-20",
          },
          {
            id: 10,
            name: "主要修改点:将城市列表更改为江西和处理与优化产品管理与用户管理搜索框与主题暗色模式,更换了首页的轮播图区域",
          },
        ],
        message: "获取成功",
      },
    };
  },
};
