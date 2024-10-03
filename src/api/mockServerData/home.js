import Mock from "mockjs";
export default {
  getListData: () => {
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
          { value: "吉安市", label: "吉安" },
          { value: "南昌", label: "南昌" },
        ],
        // 项目列表
        DataList: [
          {
            img: "",
            title: "Github",
            p: "不要等待机会, 而是要创造机会",
            name: "开源组",
            time: "2024-10-1",
          },
          {
            img: "",
            title: "Vue",
            p: "现在的你决定将来的你",
            name: "算法组",
            time: "2024-10-1",
          },
          {
            img: "",
            title: "Html5",
            p: "没有什么才能比努力更重要",
            name: "上班摸鱼",
            time: "2024-10-1",
          },
          {
            img: "",
            title: "Elment UI",
            p: "技术的尽头是空间想象力",
            name: "UI",
            time: "2024-10-1",
          },
          {
            img: "",
            title: "React",
            p: "健康的身体是是实现目标的基石",
            name: "技术牛",
            time: "2024-10-1",
          },
          {
            img: "",
            title: "javasript",
            p: "路就是走出来的,而不是空想出来的",
            name: "架构组",
            time: "2024-10-1",
          },
        ],
        // 最新列表
        newList: [
          {
            name: "Admin在算法组完成了项目Vue",
            time: "刚刚",
          },
        ],
        token: Mock.Random.guid(),
        message: "获取成功",
      },
    };
  },
};
