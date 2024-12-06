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
                天气信息由中国气象局提供<span class="detail-text">
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
        <el-card
          v-show="DataList"
          style="
            background: var(--bg9);
            color: var(--text-color9);

            width: 850px;
            height: 350px;
            position: fixed;
            left: 200px;
            z-index: 999;
            top: 500px;
          "
        >
          <p class="moreList" style="text-align: center; margin-top: 10px">
            项目更多列表 尽在处理优化中
          </p>
          <i
            @click="moreClose"
            class="el-icon-close"
            style="position: absolute; cursor: pointer; top: 10px; right: 10px"
          ></i>
          <div style="overflow-y: scroll; height: 250px" class="Morelist">
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
        <el-card
          v-show="moreList"
          style="
            background: var(--bg9);
            color: var(--text-color9);
            width: 850px;
            height: 350px;
            position: fixed;
            left: 200px;
            z-index: 999;
            top: 500px;
          "
        >
          <p class="moreList" style="text-align: center; margin-top: 10px">
            动态更多列表 尽在处理优化中
          </p>
          <i
            @click="moreClose"
            class="el-icon-close"
            style="position: absolute; cursor: pointer; top: 10px; right: 10px"
          ></i>
          <div style="overflow-y: scroll; height: 250px" class="Morelist">
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
import axios from "axios";
import { getListData } from "../api";
export default {
  name: "HomeManage",
  data() {
    return {
      // 轮播图列表
      card: [
        {
          id: 0,
          CardView:
            "	https://img.alicdn.com/imgextra/i3/O1CN01QsTHmn1PNjPfl0ILH_!!6000000001829-2-tps-896-336.png",
        },
        {
          id: 1,
          CardView:
            "https://img.alicdn.com/imgextra/i1/O1CN01nqwokR1jdZQRGgX27_!!6000000004571-2-tps-896-336.png",
        },
        {
          id: 2,
          CardView:
            "https://img.alicdn.com/imgextra/i3/O1CN010nhTE71WerXP5QAot_!!6000000002814-2-tps-896-336.png",
        },
        {
          id: 3,
          CardView:
            "https://img.alicdn.com/imgextra/i1/O1CN01nqwokR1jdZQRGgX27_!!6000000004571-2-tps-896-336.png",
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
    this.loadRoles();
    this.loadAvatar();
  },
  methods: {
    handleClick(item) {
      switch (item.name) {
        case "产品管理":
          this.$router.push({ name: "products", path: "/products" });
          break;
        case "用户管理":
          this.$router.push({ name: "users", path: "/users" });
          break;
        case "高德地图":
          this.$router.push({
            name: "mapintegration",
            path: "/mapintegration",
          });
          break;
        case "权限管理":
          this.$router.push({
            name: "permissionmanagement",
            path: "/permissionmanagement",
          });
          break;
      }
    },

    loadRoles() {
      const roles = localStorage.getItem("roles") || "用户获取失败";
      this.roles = roles;
    },
    loadAvatar() {
      const avatar =
        localStorage.getItem("avatar") ||
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.avatar = avatar;
    },
    async Weather(city) {
      await axios({
        url: `https://restapi.amap.com/v3/weather/weatherInfo`,
        params: {
          key: "b219cc978d96ce513e410c5835a84050",
          city,
        },
      })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.lives &&
            response.data.lives.length > 0
          ) {
            const liveData = response.data.lives[0];
            let weatherTip = "";
            switch (liveData.weather) {
              case "晴":
                weatherTip = "天气晴朗，适合外出活动哦！";
                break;
              case "雨":
                weatherTip = "今天有雨，请记得带伞！";
                break;
              case "雪":
                weatherTip = "下雪啦，出门请注意保暖！";
                break;
              case "多云":
                weatherTip = " 天气多云，适合出门活动哦！";
                break;
              case "阴":
                weatherTip = "今天阴天，注意防晒哦！";
                break;
              case "雾":
                weatherTip = "今天有雾，请注意安全！";
                break;
              case "雷阵雨":
                weatherTip = "今天有雷阵雨，请注意安全！";
                break;
              case "暴雨":
                weatherTip = "今天有暴雨，尽量减少外出！";
                break;
              case "台风":
                weatherTip = "今天有台风，请留在室内！";
                break;
              case "沙尘暴":
                weatherTip = "今天有沙尘暴，请佩戴口罩！";
                break;
              default:
                weatherTip = "未知天气，请关注最新气象信息！";
                break;
            }
            this.weatherData = ` 当前地区:${liveData.city} 今日:${liveData.weather} 实时气温:${liveData.temperature}℃ 温馨提示: ${weatherTip}`;
            this.$notify({
              title: "天气查询",
              message: "获取成功",
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              title: "天气查询",
              message: "服务器返回了非预期的状态码，请稍后再试",
              type: "warning",
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            this.$notify({
              title: "天气查询",
              message: "天气数据请求异常，请稍后重试",
              type: "error",
              duration: 2000,
            });
          } else {
            console.error("Error", error.message);
            this.$notify({
              title: "天气查询",
              message: "你的网络发生问题，请稍后重试",
              type: "error",
              duration: 2000,
            });
          }
        });
    },
    handlerCity() {
      const city = this.selectedCity;
      this.Weather(city);
    },
    handleFileChange(e) {
      try {
        if (!e.target || !e.target.files || e.target.files.length === 0) {
          return;
        }
        if (!this.roles.includes("超级管理员")) {
          this.$message({
            message: "您没有权限更换头像",
            type: "warning",
          });
          return;
        }
        const file = e.target.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar = e.target.result;
          localStorage.setItem("avatar", this.avatar);
          this.$message({
            message: "头像更换成功",
            type: "success",
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
        console.dir(error);
      }
    },
    handlerList() {
      if (this.roles.includes("普通用户")) {
        this.$notify({
          message: "暂无查看权限",
          type: "warning",
        });
      }
    },
    handlerListMore() {
      this.DataList = true;
    },
    handlerMore() {
      this.moreList = true;
    },
    moreClose() {
      this.moreList = false;
      this.DataList = false;
    },
  },
};
</script>
<style lang="less" scoped>
.color-deficiency-mode {
  filter: invert(70%) sepia(8%) saturate(150%) hue-rotate(310deg)
    brightness(110%) contrast(110%);
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
  height: 110px;
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
    .avatar-img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: relative;
    }
    .mask {
      position: absolute;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: background 0.3s ease;
    }
    /* 头像上传样式 */
    label {
      width: 70px;
      height: 70px;
      line-height: 70px;
      opacity: 0;
      color: #7a6c6c;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
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
      width: 620px;
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
/* 响应式布局 */
@media (max-width: 768px) {
  .el-col {
    width: 100%;
  }
  .main {
    flex-direction: column;
    align-items: center;
  }
  .Project-List,
  .Quick-Navigation,
  .New,
  .card-Img {
    width: 100%;
    margin: 10px 0;
  }
  .Project-List .item-list {
    flex-direction: column;
  }
  .Project-List .item {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border3);
  }
  .Quick-Navigation .Quick-list {
    flex-direction: column;
  }
  .Quick-Navigation .list {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border3);
  }
  .New .new {
    text-indent: 20px;
  }
  .card-Img {
    margin-top: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .el-col {
    width: 100%;
  }
  .main {
    flex-direction: column;
    align-items: center;
  }
  .Project-List,
  .Quick-Navigation,
  .New,
  .card-Img {
    width: 100%;
    margin: 10px 0;
  }
  .Project-List .item-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .Project-List .item {
    width: 50%;
    border-right: none;
    border-bottom: 1px solid var(--border3);
  }
  .Quick-Navigation .Quick-list {
    flex-direction: row;
  }
  .Quick-Navigation .list {
    width: 25%;
    border-right: 1px solid var(--border3);
  }
  .New .new {
    text-indent: 20px;
  }
  .card-Img {
    margin-top: 10px;
  }
}
// 设置动画
@keyframes typing {
  // 宽度从0字符开始
  from {
    width: 0ch;
  }
}
</style>
