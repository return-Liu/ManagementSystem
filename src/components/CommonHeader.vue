<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        @click="handlerMenu"
        style="
          margin-right: 20px;
          background-color: var(--bg11);
          border: var(--border6);
        "
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in msg"
          :key="item.path"
          :to="{ path: item.path }"
          @click="handlerBreadcrumb(item)"
          >{{ item.lable }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <div
        class="iconfont icon-tubiao-"
        style="font-size: 20px; cursor: pointer"
        @click="drawer = true"
        title="布局设置"
      ></div>
      <el-drawer
        title="布局设置"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <span class="Overall-Style-Settings">
          <div
            class="Style-Settings"
            style="display: flex; justify-content: center; color: #000"
          >
            主题风格设置
          </div>
          <div
            class="Style"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 35px;
              color: white;
              margin-top: 30px;
            "
          >
            <div class="container" @click="selectItem('left')">
              <div class="aside-left"></div>
              <div class="content">
                <i v-if="selectedItem === 'left'" class="el-icon-check"></i>
              </div>
            </div>
            <div class="container" @click="selectItem('right')">
              <div class="aside-right"></div>
              <div class="content">
                <i v-if="selectedItem === 'right'" class="el-icon-check"></i>
              </div>
            </div>
            <div class="container-header" @click="selectItem('top-black')">
              <div class="content-header">
                <i
                  v-if="selectedItem === 'top-black'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header" @click="selectItem('top-white')">
              <div class="content-headers">
                <i
                  v-if="selectedItem === 'top-white'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
          </div>
        </span>
        <span class="System_Theme">
          <div
            class="Theme"
            style="
              display: flex;
              justify-content: center;
              color: #000;
              margin-top: 60px;
            "
          >
            主题色
          </div>
        </span>
        <!-- 黑白主题 -->
        <div class="switch">
          <el-switch
            style="display: flex; justify-content: center; margin-top: 30px"
            v-model="theme"
            active-icon-class="el-icon-moon"
            active-color="#183153"
            active-value="dark"
            inactive-icon-class="el-icon-sunny"
            inactive-color="#73c0fc"
            inactive-value="light"
            @change="switchTheme"
          >
          </el-switch>
        </div>
        <div
          class="line"
          style="
            width: 500px;
            height: 1px;
            background-color: #ccc;
            margin-top: 30px;
          "
        ></div>
        <span>
          <div
            class="Navigation-Mode"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: space-around;
            "
          >
            <div class="Navigation">导航模式</div>
          </div>
          <div
            class="Content_Header"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="Header">固定Header</div>
            <div class="Switch" style="margin-left: 100px">
              <el-switch
                v-model="value1"
                @change="switchHeader"
                active-color="#409EFF"
              ></el-switch>
            </div>
          </div>
          <div
            class="Display-The-LOGO"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="The-LOGO">显示LOGO</div>
            <div class="" style="margin-left: 110px">
              <el-switch
                v-model="value2"
                @change="switchLogo"
                active-color="#409EFF"
              ></el-switch>
            </div>
          </div>
        </span>
        <div
          class="line"
          style="
            width: 500px;
            height: 1px;
            background-color: #ccc;
            margin-top: 30px;
          "
        ></div>
        <span>
          <div
            class="Other_Settings"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: space-around;
            "
          >
            <div class="Settings">其他设置</div>
          </div>

          <div
            class=""
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="Color-Deficiency-Mode">色弱模式</div>
            <div class="Switch" style="margin-left: 115px">
              <el-switch
                v-model="value3"
                @change="switchDeficiency"
                active-color="#409EFF"
              ></el-switch>
            </div>
          </div>
        </span>
      </el-drawer>
      <el-dropdown
        @command="handlerDropdown"
        style="padding: 0 20px; color: var(--text-color1)"
      >
        <span class="el-dropdown-link">
          <!-- 显示用户角色 -->
          <span> {{ roles }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="selfcenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// 引入vuex
import { mapState } from "vuex";
import cookie from "js-cookie";
// 引入防抖函数处理主题切换频率
import { debounce } from "lodash";
export default {
  name: "CommonHeader",
  data() {
    return {
      // 存储主题切换的频繁次数
      ThemeCount: "", // 初始化为0
      avatar: "",
      selectedItem: null, // 默认不选中任何项
      // 存储是否固定Header
      value1: false,
      // 存储是否显示LOGO
      value2: true,
      // 存储是否开启色弱模式
      value3: false,
      roles: "", // 存储用户角色
      drawer: false,
      direction: "rtl",
      theme: localStorage.getItem("theme"),
      // 设置默认选中的头部风格
      selectedItems: "left",
    };
  },
  created() {
    this.loadRoles();
    this.selectedItem = this.selectedItems;
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      // 设置头部风格
      const header_container = document.querySelector(".header-container");
      if (item === "top-black") {
        header_container.style.backgroundColor = "#2F273B";
      } else if (item === "top-white") {
        header_container.style.backgroundColor = "#77CB29";
      }
      // 设置侧边栏风格
      if (item === "left") {
        // 触发父组件的事件
        this.$root.$emit("updateSidebarBackground", "rgb(48, 70, 92)");
      } else if (item === "right") {
        // 触发父组件的事件
        this.$root.$emit("updateSidebarBackground", "#4CE4CD");
      }
      this.$message({
        type: "success",
        message: "主题风格设置成功",
        duration: 1500,
      });
    },
    // 固定头部栏
    switchHeader() {
      const isHeader = document.querySelector(".header-container");
      if (isHeader) {
        if (this.value1 == true) {
          isHeader.style.position = "static";
          this.$message({
            type: "success",
            message: "已开启固定头部栏",
            duration: 1500,
          });
        } else {
          this.$message({
            type: "success",
            message: "已取消固定头部栏",
            duration: 1500,
          });
        }
      }
    },
    // 色弱模式
    switchDeficiency() {
      this.$root.$emit("updateSidebarDeficiency", this.value3);
      if (this.value3 == true) {
        this.$message({
          message: "色弱模式已开启",
          type: "success",
        });
      }
      if (this.value3 == false) {
        this.$message({
          message: "色弱模式已关闭",
          type: "success",
        });
      }
    },
    // 显示Logo
    switchLogo() {
      this.$root.$emit("updateSidebarLogo", this.value2);
      if (this.value2 == false) {
        this.$message({
          type: "success",
          message: "Logo隐藏成功",
          duration: 1500,
        });
      } else {
        this.$message({
          type: "success",
          message: "Logo显示成功",
          duration: 1500,
        });
      }
    },
    loadRoles() {
      const roles = localStorage.getItem("roles") || "获取用户失败 请登录重试";
      this.roles = roles;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$notify({
            title: "布局设置",
            message: "关闭成功",
            type: "success",
          });
          done();
        })
        .catch(() => {
          this.$notify({
            title: "布局设置",
            message: "关闭失败",
            type: "info",
          });
        });
    },
    handlerMenu() {
      // 侧边栏的折叠
      this.$store.commit("CollapseMenu");
    },
    handlerDropdown(command) {
      switch (command) {
        case "selfcenter":
          this.handleSelfCenter();
          break;
        case "cancel":
          this.handleLogout();
          break;
      }
    },
    handleSelfCenter() {
      if (this.roles.includes("超级管理员")) {
        this.$router.push({ name: "personalcenter" });
      } else {
        this.$message({
          message: "您没有权限查看个人中心",
          type: "warning",
        });
      }
    },
    handleLogout() {
      cookie.remove("token");
      // 清除cookie中的menu
      cookie.remove("menu");
      this.$router.push({ name: "login" });

      this.$notify({
        title: "提示",
        message: `退出成功 欢迎下次回来 ${this.roles}`,
        type: "success",
      });
    },
    // 主题切换
    switchTheme: debounce(function () {
      // 检查主题的频繁次数
      this.ThemeCount++;
      if (this.ThemeCount >= 3) {
        this.$message({
          message: "请你慢一点 继续操作",
          type: "warning",
        });
        return;
      }
      // 执行主题切换的逻辑
      // 重置计数器
      setTimeout(() => {
        this.ThemeCount = 0;
      }, 3000); // 例如，60秒后重置计数器
      //  不在执行后面操作
      if (!this.roles.includes("超级管理员")) {
        this.$notify({
          title: "提示",
          message: "切换主题失败 权限不足",
          type: "warning",
        });
        return;
      } else {
        this.$message({
          title: "提示",
          message: "主题切换成功",
          type: "success",
        });
      }
      // 检查 document.documentElement 是否存在
      if (document.documentElement) {
        // 设置 data-theme 的主题
        document.documentElement.setAttribute("data-theme", this.theme);
        // 读取并打印设置后的主题值
        const theme = document.documentElement.getAttribute("data-theme");
        // 将存储主题值到 localStorage
        localStorage.setItem("theme", theme);
      }
    }),
  },

  computed: {
    // 面包屑
    ...mapState({
      msg: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: var(--bg8);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    color: var(--text-color1);
    font-size: 14px;
    padding: 0 10px;
  }
}
.l-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      &.is-link {
        color: var(--text-color1);
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: var(--text-color1);
      }
    }
    .el-breadcrumb__separator[class*="icon"] {
      color: var(--text-color1);
    }
  }
}
.r-content {
  display: flex;
  align-items: center;
  .Style {
    display: flex;
    justify-content: center;
  }
  .container {
    width: 60px;
    height: 50px;
    background-color: #eeeaf3;
    border-radius: 5px;
    position: relative;
    margin-top: 30px;
    margin-left: 50px;
  }
  .aside-left {
    background-color: rgb(48, 70, 92);
  }
  .aside-right {
    background-color: #4ce4cd;
  }
  .aside-left,
  .aside-right {
    height: 50px;
    width: 20px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .content {
    width: 40px;
    height: 35px;
    background-color: #eeeaf3;
    position: absolute;
    bottom: 0;
    left: 20px;
    border-bottom-right-radius: 5px;
  }
  .content .el-icon-check {
    display: flex;
    justify-content: center;
    color: blue;
    align-items: center;
    line-height: 40px;
  }
  .container-header {
    width: 60px;
    height: 50px;
    background-color: #eeeaf3;
    border-radius: 5px;
    margin-top: 30px;
    margin-left: 50px;
  }
  .content-header .el-icon-check,
  .content-headers .el-icon-check {
    display: flex;
    justify-content: center;
    color: blue;
    align-items: center;
    line-height: 70px;
  }
  .content-headers {
    height: 15px;
    width: 60px;
    background-color: #77cb29;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content-header {
    height: 15px;
    width: 60px;
    background-color: #2f273b;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .Theme-Color div {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
  .color-block {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i {
      color: #fff;
      font-size: 14px;
    }
  }
}
.el-dropdown {
  .el-dropdown-link {
    color: var(--text-color1);
    font-size: 14px;
    padding: 0 20px;
  }
}
</style>
