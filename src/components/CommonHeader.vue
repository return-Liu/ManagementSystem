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
          >{{ item.lable }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handlerDropdown">
        <span class="el-dropdown-link">
          <span>{{ user }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="el-dropdown-menu" slot="dropdown">
          <el-dropdown-item command="selfcenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
        <div class="el-icon-film" @click="drawer = true" title="项目配置"></div>
        <el-drawer
          title="项目配置"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose"
        >
          <span class="System_Theme">
            <div class="Theme">系统主题</div>
          </span>
          <!-- 黑白主题 -->
          <div class="switch">
            <el-switch
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
        </el-drawer>
        <div
          class="el-icon-full-screen"
          title="全屏模式"
          @click="handlerscreen"
        ></div>
        <div class="el-icon-refresh" title="刷新" @click="hanlderrefresh"></div>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// 引入vuex
import { mapState } from "vuex";
import cookie from "js-cookie";
export default {
  name: "CommonHeader",
  data() {
    return {
      user: "欢迎 admin",
      drawer: false,
      direction: "rtl",
      theme: localStorage.getItem("theme") || "light",
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$notify({
            title: "项目配置",
            message: "关闭成功",
            type: "success",
          });
          done();
        })
        .catch(() => {
          this.$notify({
            title: "项目配置",
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
      // 个人中心
      if (command === "selfcenter") {
        this.$router.push({ name: "personalcenter", path: "/personalcenter" });
      }
      // 退出首页
      if (command === "cancel") {
        console.log("退出");
        cookie.remove("token");
        // 清除cookie中的menu
        cookie.remove("menu");
        this.$router.push({ name: "login", path: "/login" });
        this.$notify({
          title: "提示",
          message: "退出成功",
          type: "success",
        });
      }
    },
    // 主题
    switchTheme() {
      // 检查 document.documentElement 是否存在
      if (document.documentElement) {
        // 设置 data-theme 的主题
        document.documentElement.setAttribute("data-theme", this.theme);
        // 读取并打印设置后的主题值
        const theme = document.documentElement.getAttribute("data-theme");
        // 将存储主题值到 localStorage
        localStorage.setItem("theme", theme);
      } else {
        console.error("document.documentElement is null");
      }
    },
    // 全屏功能
    handlerscreen() {
      // 判断当前是否全屏
      if (document.fullscreenElement) {
        // 退出全屏 (如果当前是全屏状态)
        document.exitFullscreen();
      } else {
        // 全屏 （即当前不是全屏状态）
        document.documentElement.requestFullscreen();
      }
    },
    // 刷新功能
    hanlderrefresh() {
      // 利用路由的go方法重定向导当前页面 0表示不改变路由地址 只是重新加载当前页面
      this.$router.go(0);
      this.$message({
        message: "刷新成功",
        type: "success",
      });
    },
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
    color: var(--text-color);
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
        color: var(--text-color);
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: var(--text-color);
      }
    }
    .el-breadcrumb__separator[class*="icon"] {
      color: var(--text-color);
    }
  }
}
.r-content {
  display: flex;
  align-items: center;

  .users {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 20px;
    cursor: pointer;
  }
  .el-dropdown {
    display: flex;
    align-items: center;
    cursor: pointer;
    .el-dropdown-link {
      color: var(--text-color);
      font-size: 14px;
      padding: 0 17px;
    }
    .el-dropdown-menu {
      background-color: var(--bg1);
    }
    .el-icon-film {
      color: var(--text-color);
      font-size: 20px;
      margin-right: 20px;
    }
    ::v-deep .el-drawer__header {
      background: var(--bg10);
      margin-bottom: 0;
      height: 50px;
      line-height: 50px;
    }
    ::v-deep .el-drawer__body {
      flex: 1;
      overflow: auto;
      background: var(--bg10);
      .System_Theme {
        width: 551px;
        height: 19px;
        display: block;
        text-align: center;
        padding-top: 10px;
      }
    }
    .el-switch {
      width: 551px;
      height: 80px;
      display: flex;
      justify-content: center;
    }
    .el-icon-full-screen {
      color: var(--text-color);
      font-size: 20px;
      margin-right: 20px;
    }
    .el-icon-refresh {
      color: var(--text-color);
      font-size: 23px;
    }
  }
}
</style>
