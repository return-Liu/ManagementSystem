<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="24"
      :md="8"
      :lg="8"
      :xl="8"
      style="padding-right: 10px"
    >
      <el-card
        class="box-card"
        style="background-color: var(--bg10); border: var(--border1)"
      >
        <div class="user">
          <img ref="avatarImg" class="users" :src="avatarUrl" />
          <div class="usermessage">
            <div class="avatar-box">
              <label
                ref="uploadLabel"
                for="uploadInput"
                style="color: var(--text-color2); cursor: pointer"
                >更新头像</label
              >
              <input
                ref="uploadInput"
                id="uploadInput"
                type="file"
                @change="handleFileChange"
                accept="image/*"
                class="upload"
              />
            </div>
            <p class="username">{{ userName }}</p>
            <p class="useraccess" v-show="showAccess" @click="updateUserType">
              {{ userType }}
            </p>
            <input
              type="text"
              ref="access"
              class="access"
              v-show="showAccessInput"
              v-model="userType"
            />
          </div>
        </div>
        <div class="login-message">
          <!-- 获取登录时间和登录地点 -->
          <p style="color: var(--text-color2); cursor: pointer">
            <i class="el-icon-time"></i>
            当前登录时间:<span>{{ time }}</span>
            <span @click="updateTime" ref="removetime">获取当前登录时间</span>
          </p>
          <p style="color: var(--text-color2); cursor: pointer">
            <i class="el-icon-location-information"></i>
            当前登录地区:<span>{{ city }}</span>
            <span @click="updateCity" ref="removecity">获取当前登录地区</span>
          </p>
        </div>
      </el-card>
      <el-card
        style="
          margin-top: 20px;
          height: 350px;
          background-color: var(--bg10);
          border: var(--border1);
        "
      >
        <el-table :data="UserData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tablelabel"
            :prop="key"
            :label="val"
            :key="key"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div class="num-list">
        <el-card
          style="
            height: 290px;
            width: 100%;
            background-color: var(--bg10);
            border: var(--border1);
          "
        >
          <div class="message">后台管理语言详情</div>
          <div class="progress">
            <template v-for="(lang, index) in languages">
              <span :key="lang.name">{{ lang.name }}</span>
              <el-progress
                :key="index"
                :percentage="lang.percentage"
                :color="lang.color"
              ></el-progress>
            </template>
          </div>
        </el-card>
        <!-- 待办事件 -->
        <el-card
          style="
            height: 350px;
            width: 100%;
            margin-top: 20px;
            background-color: var(--bg10);
            border: var(--border1);
          "
        >
          <el-table
            tooltip-effect="dark"
            style="width: 100%; height: 335px"
            :data="event"
          >
            <el-table-column prop="name" label="待办事项" />
            <el-table-column prop="user" label="用户"> </el-table-column>
            <el-table-column prop="time" label="时间" />
            <el-table-column prop="status" label="状态">
              <template v-slot="scope">
                <span class="green-text">{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template v-slot="scope">
                <span class="red-text">{{ scope.row.operate }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// 引入Cookie
// import Cookie from "js-cookie";
// api
import { getListData } from "../api";
export default {
  name: "HomeManage",
  data() {
    return {
      // 语言列表
      languages: [
        { name: "Vue", percentage: 70, color: "green" },
        { name: "Javascript", percentage: 23.4, color: "yellow" },
        { name: "CSS", percentage: 13, color: "blue" },
        { name: "HTML", percentage: 5, color: "red" },
      ],
      // 头像
      avatarUrl:
        localStorage.getItem("avatarUrl") ||
        require("../assets/images/789187C2E34DA7A8018BCDCC6B762911.jpg"),
      time: "无信息",
      city: "无信息",
      // 用户类型
      userName: "Admin",
      userType: "超级管理员",
      showAccessInput: false,
      showAccess: true,
      isFirstClick: true, // 新增标志
      // 渲染表格数据
      UserData: [],
      // 渲染表格信息
      tablelabel: {
        // 用户类型
        userType: "用户类型",
        // 用户登录时间
        loginTime: "登录时间",
        // 用户退出时间
        logoutTime: "退出时间",
      },
      // 更新名字

      // 渲染待办事件信息
      event: [
        {
          name: "修改个人信息",
          user: "Admin",
          time: "2023-03-01",
          status: "已完成",
          operate: "查看",
        },
      ],
    };
  },
  created() {
    // 获取数据
    getListData().then(({ data }) => {
      // 将数据进行解构
      const { UserData } = data.data;
      // console.log(data.data);
      //将解构的数据赋值给UserData
      this.UserData = UserData;
    });
  },
  methods: {
    handleFileChange(e) {
      try {
        // 获取头像文件
        const file = e.target.files[0];
        // 判断文件是否存在 不存在退出
        if (!file) return;
        // 创建文件读取对象
        const reader = new FileReader();
        // 读取文件 当读取成功后
        reader.onload = () => {
          // 将头像地址赋值给avatarImg
          this.avatarUrl = reader.result;
          //  通过ref获取头像
          this.$refs.avatarImg.src = this.avatarUrl;
          // 设置新的头像 URL 到 cookie 中
          localStorage.setItem("avatarUrl", this.avatarUrl, { expires: 7 }); // 设置过期时间为 7 天
        };
        // 读取文件
        reader.readAsDataURL(file);
        // 提示信息
        this.$message({
          message: "头像更换成功",
          type: "success",
        });
      } catch {
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
      }
    },
    // 获取当前登录地区
    updateCity() {
      // 获取当前登录地区
      this.city = "江西-宜春";
      this.$notify({
        title: "提示",
        message: "获取当前登录地区成功",
        type: "success",
      });
      // 当刷新页面时 获取的当前登录地区还在
      //  获取成功时 移除获取当前登录地区的标签
      this.$refs.removecity.remove();
    },
    // 更新名字
    updateUserType() {
      if (this.isFirstClick) {
        // 第一次点击时显示输入框并隐藏文本
        this.showAccessInput = true;
        this.showAccess = false;
        this.isFirstClick = false;
      } else {
        // 提交修改后的用户类型
        this.submitUserType();
      }
    },
    submitUserType() {
      // 提交修改后的用户类型
      this.showAccessInput = false;
      this.showAccess = true;
      this.isFirstClick = true;
      this.$notify({
        title: "提示",
        message: "修改用户类型成功",
        type: "success",
      });
    },
    updateTime() {
      // 获取当前日期
      this.time = new Date().toLocaleDateString();
      this.$notify({
        title: "提示",
        message: "获取当前登录时间成功",
        type: "success",
      });

      // 当刷新页面时,获取当前登录时间还在
      // 获取成功时 移除获取当前登录地区的标签
      this.$refs.removetime.remove();
    },
  },
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border1);
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .usermessage {
    .username {
      color: var(--text-color2);
      font-size: 32px;
      margin-bottom: 10px;
    }
    .avatar-box {
      margin-bottom: 20px;
    }
    .avatar-title {
      margin-bottom: 10px;
    }
    .prew {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .upload {
      display: none;
    }
    .useraccess {
      color: var(--text-color2);
      font-size: 20px;
    }
  }
}
.login-message {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    margin-top: 5px;
    span {
      color: #66666666;
      margin-left: 60px;
    }
  }
}
.progress {
  margin-top: 20px;
  .el-progress {
    margin-bottom: 15px;
  }
}
.num-shop {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }
  .num-text {
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
      text-indent: 85px;
      &:hover {
        color: red;
      }
    }

    .info {
      font-size: 14px;
      color: #999;
      text-align: center;
      text-indent: 75px;
      &:hover {
        color: blue;
      }
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 10px;
    background-clip: var(--bg10);
  }
}
::v-deep .el-table {
  background-color: var(--bg10);
  border-bottom: var(--border1);
}
::v-deep .el-table__body tr {
  background-color: var(--bg10);
  border-bottom: var(--border1);
}
::v-deep .el-table__header-wrapper thead th {
  background-color: var(--bg10);
  border-bottom: var(--border1);
}
.green-text {
  color: var(--text-color3);
}
.red-text {
  color: var(--text-color4);
}
</style>
