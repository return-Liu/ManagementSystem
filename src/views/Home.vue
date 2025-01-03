<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
      style="padding-right: 10px"
      class="animate__animated animate__fadeIn"
    >
      <div class="overlay" v-show="moreList || DataList"></div>
      <el-card class="header">
        <h6
          class="avatar-name"
          style="color: skyblue; font-family: 'Times New Roman', Times, serif"
        >
          头像
        </h6>
        <!-- 头像 -->
        <div class="avatar">
          <img ref="avatarImg" alt="" :src="avatar" class="avatar-img" />
          <div class="mask">
            <label for="upload" @click="handleFileChange">更换头像</label>
            <input
              id="upload"
              type="file"
              class="upload"
              @change="handleFileChange"
            />
          </div>

          <div class="message">
            <el-tag>{{ roles }}</el-tag>
            <el-select
              v-model="selectedCity"
              placeholder="请选择地区查询当前天气"
              @change="handlerCity"
            >
              <el-option
                v-for="city in cities"
                :key="city.value"
                :label="city.label"
                :value="city.value"
              ></el-option>
            </el-select>
            <div class="city" style="margin-left: 370px; margin-top: -25px">
              <p>
                数据由中国天气提供<span class="detail-text">
                  <a
                    style="text-decoration: none; color: skyblue"
                    href="https://www.weather.com.cn/"
                    >详情</a
                  >
                </span>
              </p>
            </div>
            <div class="wheater">
              {{ weatherData }}
            </div>
          </div>
        </div>
      </el-card>
      <div class="main">
        <el-card class="Project-List">
          <span class="more-Project_List" @click="handlerListMore">更多</span>
          <span>项目</span>
          <div class="item-list">
            <div
              class="item"
              v-for="(item, index) in dataList"
              :key="item.id"
              :class="{ 'no-border-right': index === 2 || index === 5 }"
            >
              <div class="item-title">{{ item.title }}</div>
              <div class="item-p">{{ item.p }}</div>
              <div class="item-name">{{ item.name }}</div>
              <div class="item-time">{{ item.time }}</div>
            </div>
          </div>
        </el-card>
        <el-card class="Quick-Navigation">
          <span>快捷导航</span>
          <div class="Quick-list">
            <div
              class="list"
              v-for="(item, index) in shortcut"
              :key="item.id"
              :class="{ 'no-border-right': index === 4 }"
              @click="handleClick(item)"
            >
              <div class="list-name">{{ item.name }}</div>
            </div>
          </div>
        </el-card>
        <el-card v-show="DataList" class="DataList">
          <p class="moreList">
            {{ currentTip }}
          </p>
          <i @click="moreClose" class="el-icon-close"></i>
          <div class="Morelist">
            <div
              class="list-item"
              style="margin-top: 40px"
              v-for="item in DataListMore"
              :key="item.id"
            >
              <div class="item-title">{{ item.title }}</div>
              <div class="item-p">{{ item.p }}</div>
              <div class="item-name">{{ item.name }}</div>
              <div class="time" style="margin-top: 10px">
                {{ item.time }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="New">
          <span>最新动态</span>
          <span class="more-list" @click="handlerMore">更多 </span>
          <div class="new" v-for="item in newList" :key="item.id">
            {{ item.name }}
            <div class="time">{{ item.time }}</div>
          </div>
        </el-card>
        <el-card class="NewList" v-show="moreList">
          <p class="moreList">
            {{ currentTip }}
          </p>
          <i @click="moreClose" class="el-icon-close"></i>
          <div class="Morelist">
            <div
              class="list-item"
              style="margin-top: 20px"
              v-for="item in newListMore"
              :key="item.id"
            >
              {{ item.name }}
              <div class="time" style="margin-top: 10px">
                {{ item.time }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="card-Img" ref="mian">
          <el-carousel height="388px" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in card" :key="item.id">
              <img
                style="width: 690px; height: 389px"
                :src="item.CardView"
                class="image"
              />
            </el-carousel-item> </el-carousel
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// 封装天气列表
const WEATHER_TIPS = {
  晴: "天气晴朗，适合外出活动哦！",
  小雨: "今天有雨，请记得带伞！",
  小雪: "下雪啦，出门请注意保暖！",
  多云: "天气多云，适合出门活动哦！",
  阴: "今天阴天，注意防晒哦！",
  雾: "今天有雾，请注意安全！",
  霾: "今天有霾，请注意安全！",
  雷阵雨: "今天有雷阵雨，请注意安全！",
  暴雨: "今天有暴雨，尽量减少外出！",
  台风: "今天有台风，请留在室内！",
  沙尘暴: "今天有沙尘暴，请佩戴口罩！",
  default: "未知天气，请关注最新气象信息！",
};
import { getListData } from "../api";
// 引入混入
import { avatarMixin } from "../mixin/avatarMixin";
import { homeMixin } from "../mixin/homeMixin";
export default {
  // 使用混入
  mixins: [avatarMixin, homeMixin],
  // 关闭语法检查
  /* eslint-disable */
  name: "Home",
  data() {
    return {
      // 轮播图列表
      card: [
        {
          id: 0,
          CardView:
            "	https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171123181522_c48800.jpg",
        },
        {
          id: 1,
          CardView:
            "	https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191630_ff8fef.jpg",
        },
        {
          id: 2,
          CardView:
            "	https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191532_f2975b.jpg",
        },
      ],
      // 快捷导航列表
      shortcut: [
        { id: 1, name: "首页" },
        { id: 2, name: "产品管理" },
        { id: 3, name: "用户管理" },
        { id: 4, name: "高德地图" },
        { id: 5, name: "权限管理" },
      ],
      currentTip: "", // 存储更多列表标题信息
      // 动态更多列表
      moreList: false,
      // 项目更多列表
      DataList: false,
      // 角色
      roles: "",
      // 地市
      selectedCity: "",
      // 头像
      avatar: "",
      // 天气数据
      weatherData: null,
      // 项目列表
      dataList: [],
      // 最新动态
      newList: [],
      // 地区列表
      cities: [],
      // 动态更多列表
      newListMore: [],
      // 项目更多列表
      DataListMore: [],
      // 天气信息
      weatherDataArray: WEATHER_TIPS,
    };
  },
  created() {
    getListData().then(({ data }) => {
      const { cities, newList, DataList, newListMore, DataListMore } =
        data.data;
      this.newList = newList;
      this.dataList = DataList;
      this.cities = cities;
      this.newListMore = newListMore;
      this.DataListMore = DataListMore;
    });
    this.$root.$on("updateSidebarDeficiency", (newDeficiency) => {
      // 控制色弱模式
      this.value3 = newDeficiency;
      if (newDeficiency) {
        document.body.classList.add("color-deficiency-mode");
      } else {
        document.body.classList.remove("color-deficiency-mode");
      }
    });
    this.loadRoles();
    this.loadAvatar(); // 确保在created中调用loadAvatar
  },
  methods: {
    handlerListMore() {
      this.DataList = true;
      this.currentTip = "项目更多列表 尽在处理优化中";
    },
    handlerMore() {
      this.moreList = true;
      this.currentTip = "动态更多列表 尽在处理优化中";
    },
    moreClose() {
      this.moreList = false;
      this.DataList = false;
      this.currentTip = ""; // 关闭时清空提示信息
    },
  },
};
</script>
<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998; /* 确保遮罩层在内容之上，但在更多列表之下 */
}

// 原有样式保持不变
.el-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.el-col {
  box-sizing: border-box;
}
.header {
  width: 1500px; /* 占满父元素宽度 */
  height: 115px;
  background: var(--bg10);
  border: var(--border1);
  position: relative;
  border-radius: 10px;
  h6 {
    position: absolute;
    top: 2px;
    left: 10px;
    color: var(--text-color9);
  }
  .avatar {
    display: flex;
    align-items: center; /* 垂直居中 */
    padding-left: 20px; /* 左侧内边距 */
    .avatar-img,
    .mask,
    label {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: relative;
    }
    .mask {
      position: absolute;
      transition: background 0.3s ease;
    }
    /* 头像上传样式 */
    label {
      line-height: 70px;
      opacity: 0;
      color: #7a6c6c;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mask:hover label {
      opacity: 1;
      cursor: pointer;
    }
    .upload {
      display: none;
    }
    .mask:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.7);
    }
    .message {
      font-size: 16px; /* 文字大小 */
      margin-left: 10px; /* 左侧外边距 */
      position: relative;
      .el-select {
        position: absolute;
        top: 0px;
        left: 140px;
      }
      p {
        color: var(--text-color9);
        width: 250px;
      }
    }
    .right-Information {
      width: 1450px;
      display: flex;
      justify-content: end;
      span {
        margin: 10px 20px;
        color: var(--text-color9);
        text-align: center;
        .To_toList,
        .Project_List,
        .Team_list {
          padding-top: 5px;
        }
      }
    }
    .city {
      // 设置宽为30个字符
      width: 30ch;
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden; /* 隐藏溢出的文本 */
      animation: typing 2s steps(20) infinite alternate-reverse;
    }
    .wheater {
      font-size: 16px; /* 文字大小 */
      margin-top: 18px; /* 顶部外边距 */
      width: 630px;
      color: var(--text-color9);
    }
  }
}
.main {
  width: 1500px;
  height: 570px;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  span {
    display: block;
    text-align: center;
    line-height: 50px;
    color: var(--text-color9);
  }
  .Project-List {
    margin-top: 10px;
    width: 800px;
    height: 400px;
    background: var(--bg10);
    border: var(--border1);
    position: relative;
    .more-Project_List {
      position: absolute;
      right: 20px;
      top: 0;
      cursor: pointer;
      color: var(--text-color7);
    }
    .item-list {
      width: 800px;
      height: 170px;
      outline: 1px solid var(--border3);
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      color: var(--text-color9);
      .item {
        width: 250px;
        height: 200px;
        border-right: 1px solid var(--border3);
        position: relative;
        .item-title,
        .item-p {
          text-align: center;
          padding-top: 20px;
        }
        .item-name {
          margin-top: 10px;
          margin-left: 5px;
        }
        .item-time {
          position: absolute;
          right: 10px;
          top: 95px;
        }
      }
      .no-border-right {
        border-right: none;
      }
    }
  }
  .DataList,
  .NewList {
    color: var(--text-color9);
    width: 850px;
    height: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: url(https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191532_f2975b.jpg);
    background-size: 100% 100%; /* 确保图片覆盖整个区域 */
    background-repeat: no-repeat; /* 防止图片重复 */
    background-position: center; /* 确保图片居中 */
  }
  .moreList {
    text-align: center;
    margin-top: 10px;
  }
  .el-card {
    border: 0;
  }
  .Quick-Navigation {
    margin-left: 10px;
    width: 690px;
    height: 170px;
    background: var(--bg10);
    border: var(--border1);
    margin-top: 10px;
    .Quick-list {
      width: 690px;
      height: 100px;
      outline: 1px solid var(--border3);
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      color: var(--text-color9);
      cursor: pointer;
      .list {
        width: 100px;
        height: 100px;
        border-right: 1px solid var(--border3);
        .list-name {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      }
      .no-border-right {
        border-right: none;
      }
    }
  }
  .New {
    margin-top: 10px;
    width: 800px;
    height: 160px;
    background: var(--bg10);
    border: var(--border1);
    position: relative;
    .more-list {
      position: absolute;
      right: 20px;
      top: 0;
      cursor: pointer;
      color: var(--text-color7);
    }
    .new {
      text-indent: 50px;
      border-top: 1px solid var(--border3);
      color: var(--text-color9);
      padding-top: 20px;
    }
    .time {
      color: var(--text-color9);
      padding-top: 20px;
    }
  }
  ::v-deep .el-card__body {
    padding: 0;
  }
  .card-Img {
    margin-top: -220px;
    width: 690px;
    height: 389px;
    background: var(--bg10);
    border: var(--border1);
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
// 设置动画
@keyframes typing {
  // 宽度从0字符开始
  from {
    width: 0ch;
  }
}
@keyframes blink {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.el-icon-close:hover {
  animation: blink 0.5s linear;
}
.el-icon-close {
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
}
.Morelist {
  overflow-y: scroll;
  height: 350px;
  width: 850px;
}
</style>
