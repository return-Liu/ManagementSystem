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
        <div class="Overall-Style-Settings" :class="{ disabled: value3 }">
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
        </div>
        <div
          class="line"
          style="
            width: 500px;
            height: 1px;
            background-color: #ccc;
            margin-top: 60px;
          "
        ></div>
        <div class="System_Theme" :class="{ disabled: value3 }">
          <div
            class="Theme"
            style="
              display: flex;
              justify-content: center;
              color: #000;
              margin-top: 30px;
            "
          >
            色彩模式
          </div>
        </div>
        <!-- 黑白主题 -->
        <div :class="{ disabled: value3 }" class="switch" style="color: #000">
          <div class="switch-theme">
            <div
              class="ocs-theme"
              :class="{ active: theme === 'system' }"
              @click="setTheme('system')"
            >
              <p>
                <span>暗黑模式跟随系统</span>
                <i v-if="theme === 'system'" class="el-icon-check"></i>
              </p>
            </div>
            <div>
              <div
                class="light-theme"
                :class="{ active: theme === 'light' }"
                @click="setTheme('light')"
              >
                <p>
                  <span>明亮模式</span>
                  <i v-if="theme === 'light'" class="el-icon-check"></i>
                </p>
              </div>
              <div
                class="dark-theme"
                :class="{ active: theme === 'dark' }"
                @click="setTheme('dark')"
              >
                <p>
                  <span>暗黑模式</span>
                  <i v-if="theme === 'dark'" class="el-icon-check"></i>
                </p>
              </div>
            </div>
          </div>
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
        <div>
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
            :class="{ disabled: value3 }"
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
                :disabled="isDisabled"
              ></el-switch>
            </div>
          </div>
          <div
            :class="{ disabled: value3 }"
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
                :disabled="isDisabled"
              >
                ></el-switch
              >
            </div>
          </div>
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
        <div>
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
        </div>
        <div v-if="loading" class="loading-overlay">
          <span class="loading-text">模式切换中</span>
          <div class="loading-spinner"></div>
        </div>
      </el-drawer>
      <el-dropdown
        @command="handlerDropdown"
        style="padding: 0 20px; color: var(--text-color1)"
      >
        <div class="el-dropdown-link">
          <!-- 显示用户角色 -->
          <span> {{ roles }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="selfcenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import cookie from "js-cookie";
export default {
  name: "CommonHeader",
  data() {
    return {
      // 色彩模式加载
      loading: false,
      selectedItem: null,
      value1: false,
      value2: true,
      value3: localStorage.getItem("deficiency") === "true",
      roles: "",
      drawer: false,
      direction: "rtl",
      theme: localStorage.getItem("theme") || "light",
      selectedItems: "left",
      isDisabled: false,
    };
  },
  created() {
    this.loadRoles();
    this.selectedItem = this.selectedItems;
    this.loadAvatar();
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      const header_container = document.querySelector(".header-container");
      if (item === "top-black") {
        header_container.style.backgroundColor = "#2F273B";
      } else if (item === "top-white") {
        header_container.style.backgroundColor = "#77CB29";
      }
      if (item === "left") {
        this.$root.$emit("updateSidebarBackground", "rgb(48, 70, 92)");
      } else if (item === "right") {
        this.$root.$emit("updateSidebarBackground", "#4CE4CD");
      }
      this.$message({
        type: "success",
        message: "主题风格设置成功",
        duration: 1500,
      });
    },
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
    switchDeficiency() {
      this.$root.$emit("updateSidebarDeficiency", this.value3);
      this.isDisabled = this.value3;
      if (this.value3) {
        this.$message({
          message: "色弱模式已开启 部分主题开启禁用状态 注意用眼",
          type: "success",
        });
        localStorage.setItem("deficiency", "true");
      }
      if (this.value3 == false) {
        this.$message({
          message: "色弱模式已关闭 部分主题解除禁用状态",
          type: "success",
        });
        localStorage.setItem("deficiency", "false");
      }
    },
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
    loadAvatar() {
      const avatar =
        localStorage.getItem("avatar") ||
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.avatar = avatar;
    },
    handleLogout() {
      cookie.remove("token");
      cookie.remove("menu");
      this.$router.push({ name: "login" });
      this.$store.commit("CLEAR_TABS_LIST");
      this.$notify({
        title: "提示",
        message: `退出成功`,
        type: "success",
      });
    },
    setTheme(Theme) {
      this.loading = true; // 设置加载状态
      setTimeout(() => {
        this.theme = Theme;
        if (Theme === "dark") {
          console.log("当前模式为: " + Theme);
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        } else if (Theme === "system") {
          this.applySystemTheme();
          localStorage.setItem("theme", "system");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        }
        this.loading = false; // 清除加载状态
        this.$notify({
          title: "色彩模式",
          message: "切换成功",
          type: "success",
        });
      }, 3000); // 假设加载过程需要3秒
    },
    applySystemTheme() {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDarkScheme ? "dark" : "light"
      );
    },
  },
  computed: {
    ...mapState({
      msg: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.loading-text {
  position: fixed;
  left: 52%;
}
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.disabled {
  pointer-events: none; /* 禁用所有鼠标事件 */
  opacity: 0.5; /* 可选：降低透明度以表示禁用状态 */
}
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
  .switch {
    overflow: hidden;
    margin-top: 30px;
  }
  .switch-theme {
    margin-left: 235px;
    width: 300px;
    height: 130px;
  }
  .switch div p {
    height: 20px;
    margin-top: 10px;
  }
  .switch div .el-icon-check {
    position: relative;
    top: -20px;
    left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
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
