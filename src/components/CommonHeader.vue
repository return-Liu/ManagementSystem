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
      <div class="theme" :class="{ disabled: value3 }">
        <i
          @click="handlerTheme('light')"
          v-show="theme === 'dark'"
          :class="iconClass"
          :title="titleTheme"
        ></i>
        <i
          @click="handlerTheme('dark')"
          v-show="theme === 'light'"
          :class="iconClass"
          :title="titleTheme"
        ></i>
      </div>
      <div
        class="iconfont icon-tubiao-"
        style="font-size: 20px; cursor: pointer"
        @click="drawer = true"
        title="模式选择"
      ></div>
      <el-drawer
        title="模式选择"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <div class="Overall-Style-Settings" :class="{ disabled: value3 }">
          <div
            class="Style-Settings"
            style="display: flex; justify-content: center; color: #000"
          >
            主题风格模式(颜色与背景)
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
              flex-wrap: wrap;
            "
          >
            <div class="container" @click="selectItem('left')">
              <div class="aside-left"></div>
              <div class="content">
                <i v-show="selectedItem === 'left'" class="el-icon-check"></i>
              </div>
            </div>
            <div class="container" @click="selectItem('right')">
              <div class="aside-right"></div>
              <div class="content">
                <i v-show="selectedItem === 'right'" class="el-icon-check"></i>
              </div>
            </div>
            <div class="container-header" @click="selectItem('top-black')">
              <div class="content-header">
                <i
                  v-show="selectedItem === 'top-black'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header" @click="selectItem('top-white')">
              <div class="content-headers">
                <i
                  v-show="selectedItem === 'top-white'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header-bg" @click="selectItem('top-bg1')">
              <div
                class="content-headers-bg"
                :style="{ backgroundImage: `url(${background_bg_1})` }"
              >
                <i
                  v-show="selectedItem === 'top-bg1'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header-bg" @click="selectItem('top-bg2')">
              <div
                class="content-headers-bg"
                :style="{ backgroundImage: `url(${background_bg_2})` }"
              >
                <i
                  v-show="selectedItem === 'top-bg2'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header-bg" @click="selectItem('top-bg3')">
              <div
                class="content-headers-bg"
                :style="{ backgroundImage: `url(${background_bg_3})` }"
              >
                <i
                  v-show="selectedItem === 'top-bg3'"
                  class="el-icon-check"
                ></i>
              </div>
            </div>
            <div class="container-header-bg" @click="selectItem('top-bg4')">
              <div
                class="content-headers-bg"
                :style="{ backgroundImage: `url(${background_bg_4})` }"
              >
                <i
                  v-show="selectedItem === 'top-bg4'"
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
            margin-top: 150px;
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
                <span>深色模式跟随系统</span>
                <i v-show="theme === 'system'" class="el-icon-check"></i>
              </p>
            </div>
            <div>
              <div
                class="light-theme"
                :class="{ active: theme === 'light' }"
                @click="setTheme('light')"
              >
                <p>
                  <span>浅色模式</span>
                  <i v-show="theme === 'light'" class="el-icon-check"></i>
                </p>
              </div>
              <div
                class="dark-theme"
                :class="{ active: theme === 'dark' }"
                @click="setTheme('dark')"
              >
                <p>
                  <span>深色模式</span>
                  <i v-show="theme === 'dark'" class="el-icon-check"></i>
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
            class="Content_The_Header"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="The_Header">固定Header</div>
            <div class="Header" style="margin-left: 100px">
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
            class="Content-The_Aside"
            style="
              margin-top: 30px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="The_Aside">固定侧边栏</div>
            <div class="Aside" style="margin-left: 100px">
              <el-switch
                v-model="value4"
                @change="switchAside"
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
            <div class="LOGO" style="margin-left: 110px">
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
            <div class="Settings">其他模式</div>
          </div>

          <div
            class=""
            style="
              margin-top: 20px;
              color: #000;
              display: flex;
              justify-content: center;
            "
          >
            <div class="Color-Deficiency-Mode">护眼模式</div>
            <div class="Switch" style="margin-left: 115px">
              <el-switch
                v-model="value3"
                @change="switchDeficiency"
                active-color="#409EFF"
              ></el-switch>
            </div>
          </div>
        </div>
      </el-drawer>
      <el-dropdown
        @command="handlerDropdown"
        style="padding: 0 20px; color: var(--text-color1)"
      >
        <div class="el-dropdown-link">
          <!-- 显示用户角色 -->
          <span style="color: var(--text-color6)"> {{ roles }}</span>
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
import { headerMixin } from "../mixin/headerMixin";
import cookie from "js-cookie";
export default {
  // 使用混入
  mixins: [headerMixin],
  name: "CommonHeader",
  data() {
    return {
      selectedItem: null,
      value1: false,
      value2: true,
      value4: false,
      value3: localStorage.getItem("deficiency") === "true",
      roles: "",
      drawer: false,
      direction: "rtl",
      theme: localStorage.getItem("theme") || "light",
      selectedItems: "left",
      isDisabled: false,
      iconClass: localStorage.getItem("icon") || "el-icon-moon",
      background_bg_1: require("../assets/images/top-bg-1.png"),
      background_bg_2: require("../assets/images/top-bg-2.png"),
      background_bg_3: require("../assets/images/top-bg-3.png"),
      background_bg_4: require("../assets/images/top-bg-4.png"),
    };
  },
  created() {
    this.loadRoles();
    this.selectedItem = this.selectedItems;
    this.$root.$on("updateSidebarDeficiency", (newDeficiency) => {
      // 控制色弱模式
      this.value3 = newDeficiency;
      if (newDeficiency) {
        document.body.classList.add("color-deficiency-mode");
      } else {
        document.body.classList.remove("color-deficiency-mode");
      }
    });
  },
  methods: {
    loadRoles() {
      const roles = localStorage.getItem("roles") || "获取用户失败 请登录重试";
      this.roles = roles;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$notify({
            title: "模式选择",
            message: "关闭成功",
            type: "success",
          });
          done();
        })
        .catch(() => {
          this.$notify({
            title: "模式选择",
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
    handleLogout() {
      this.$confirm("此操作将退出此账号, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功",
          });
          cookie.remove("token");
          cookie.remove("menu");
          this.$router.push({ name: "login" });
          this.$store.commit("CLEAR_TABS_LIST");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  computed: {
    ...mapState({
      msg: (state) => state.tab.tabsList,
    }),
    titleTheme() {
      return this.theme === "light" ? "深色模式" : "浅色模式";
    },
  },
};
</script>

<style lang="less" scoped>
.color-deficiency-mode {
  --bg10: #f9f9f9; /* 更柔和的背景颜色 */
  --text-color9: #333333; /* 更深的文字颜色 */
  filter: brightness(90%) contrast(110%) sepia(10%) hue-rotate(20deg);
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
  background-size: cover; /* 确保图片覆盖整个区域 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 确保图片居中 */
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
  .theme {
    margin-right: 20px;
  }
  .el-icon-moon,
  .el-icon-sunny {
    font-size: 20px;
    cursor: pointer;
  }
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
  .container-header,
  .container-header-bg {
    width: 60px;
    height: 50px;
    background-color: #eeeaf3;
    border-radius: 5px;
    margin-top: 30px;
    margin-left: 50px;
  }
  .content-headers-bg {
    height: 20px;
    width: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .container-header-bg .el-icon-check,
  .content-header .el-icon-check,
  .content-headers .el-icon-check {
    display: flex;
    justify-content: center;
    color: blue;
    align-items: center;
    line-height: 60px;
  }
  .content .el-icon-check {
    display: flex;
    justify-content: center;
    color: blue;
    align-items: center;
    line-height: 30px;
  }
  .content-headers,
  .content-header {
    height: 15px;
    width: 60px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content-headers {
    background-color: #77cb29;
  }
  .content-header {
    background-color: #2f273b;
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
    height: 80px;
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
