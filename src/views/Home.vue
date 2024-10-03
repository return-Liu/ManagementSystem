<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="12"
      :xl="12"
      style="padding-right: 10px"
    >
      <el-card class="header">
        <h6>头像</h6>
        <!-- 头像 -->
        <div class="avatar">
          <img ref="avatarImg" alt="" :src="avatarUrl" class="avatar-img" />
          <div class="mask">
            <label for="upload" @click="handleFileChange">更新头像</label>
            <input
              id="upload"
              type="file"
              class="upload"
              @change="handleFileChange"
            />
          </div>

          <div class="message">
            <p>{{ message }}</p>
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
            <div class="wheater">
              {{ weatherData }}
            </div>
          </div>
          <div class="right-Information">
            <span class="To_do"
              >待办
              <div class="To_toList">{{ To_toList }}</div>
            </span>
            <span class="Project"
              >项目
              <div class="Project_List">{{ Project_List }}</div>
            </span>

            <span class="Team"
              >团队
              <div class="Team_list">{{ Team_list }}</div>
            </span>
          </div>
        </div>
      </el-card>
      <div class="main">
        <el-card class="Project-List">
          <span class="more-Project_List" @click="handlerMore">更多</span>
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
        </el-card>
        <el-card class="New">
          <span>最新动态</span>
          <span class="more-list" @click="handlerMore">更多</span>
          <div class="new" v-for="item in newList" :key="item.id">
            {{ item.name }}
            <div class="time">{{ item.time }}</div>
          </div>
        </el-card>
        <el-card class="card-Img">
          <img class="img" :src="cardImg" alt="" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// 引入Cookie
// import Cookie from "js-cookie";
// api
import axios from "axios";
import { getListData } from "../api";
export default {
  name: "HomeManage",
  data() {
    return {
      //
      selectedCity: "",
      // 城市列表
      // 初始化为空字符串
      avatarUrl: "",
      message: "早安, Admin!, 开启您一天的工作吧",
      weatherData: null,
      To_toList: "2/10",
      Project_List: "6",
      Team_list: "1",
      dataList: [], // 存放项目动态列表
      newList: [], // 存放最新动态列表
      cities: [], // 存放城市列表
      cardImg: require("../assets/images/3f249db900804332ff6fb17e3426cdc7.webp"),
    };
  },

  created() {
    // 获取数据
    getListData().then(({ data }) => {
      // 将数据进行解构
      const { cities, newList, DataList } = data.data;
      // 将解构newList赋值给空数组newList
      this.newList = newList;
      // 将解构赋值DataList给空数组DataList
      this.dataList = DataList;
      // 将解构赋值DataList给空数组 cities
      this.cities = cities;
      // console.log(this.cities);
    });
    // 初始化头像 URL
    this.avatarUrl =
      localStorage.getItem("avatarUrl") ||
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    // 初始化天气数据
    this.weatherData = localStorage.getItem("weatherData") || "";
  },
  methods: {
    //公共的天气查询逻辑
    async Weather(city) {
      await axios({
        // 天气数据api
        url: "https://restapi.amap.com/v3/weather/weatherInfo?key=b219cc978d96ce513e410c5835a84050",
        params: {
          // 城市名称
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
            this.weatherData = ` 当前地区:${liveData.city} 今日:${liveData.weather} 实时气温:${liveData.temperature}℃`;
            localStorage.setItem("weatherData", this.weatherData);
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
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            this.$notify({
              title: "天气查询",
              message: "网络请求错误，请检查您的网络连接",
              type: "error",
              duration: 2000,
            });
          } else {
            // 发生了一些问题，导致请求未能发出
            console.error("Error", error.message);
            this.$notify({
              title: "天气查询",
              message: "天气数据请求异常，请稍后重试",
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
        // 确保 e.target 和 e.target.files 都存在
        if (!e.target || !e.target.files || e.target.files.length === 0) {
          return;
        }
        // 获取头像文件
        const file = e.target.files[0];
        // 创建文件读取对象
        const reader = new FileReader();
        // 读取文件，当读取成功后
        reader.onload = (e) => {
          // 将头像地址赋值给 avatarUrl
          this.avatarUrl = e.target.result;
          // 设置新的头像 URL 到 localStorage 中
          localStorage.setItem("avatarUrl", this.avatarUrl);
          // 提示信息
          this.$message({
            message: "头像更换成功",
            type: "success",
          });
        };
        // 读取文件
        reader.readAsDataURL(file);
      } catch (error) {
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
        console.dir(error);
      }
    },
    handlerMore() {
      this.$notify({
        title: "更多",
        message: "敬请期待",
        type: "info",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.el-col {
  box-sizing: border-box;
}
.header {
  width: 1550px; /* 占满父元素宽度 */
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
        top: -10px;
        left: 270px;
      }

      p {
        color: var(--text-color9);
        width: 250px;
      }
    }
    .right-Information {
      width: 1550px;
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
    .wheater {
      font-size: 16px; /* 文字大小 */
      margin-top: 18px; /* 顶部外边距 */
      width: 600px;
      color: var(--text-color9);
    }
  }
}
.main {
  width: 1550px;
  height: 570px;
  // background: orange;
  margin-bottom: 0;
  display: flex;
  // justify-content: space-between;
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
    }
    .item-list {
      width: 800px;
      height: 200px;
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
    width: 740px;
    height: 280px;
    background: var(--bg10);
    border: var(--border1);
    margin-top: 10px;
  }
  .New {
    margin-top: 10px;
    width: 800px;
    height: 170px;
    background: var(--bg10);
    border: var(--border1);
    position: relative;
    .more-list {
      position: absolute;
      right: 20px;
      top: 0;
      cursor: pointer;
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
    margin-top: -110px;
    width: 740px;
    height: 290px;
    background: var(--bg10);
    border: var(--border1);
    margin-left: 10px;
    cursor: pointer;
    .img {
      width: 740px;
      height: 290px;
    }
  }
}
</style>
