<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        @click="handlerMenu"
        style="
          margin-right: 20px;
          background-color: var(--bg1);
          border: var(--border1);
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
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="selfcenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
        <div class="el-icon-full-screen" @click="handlerscreen"></div>
        <div class="el-icon-refresh" @click="hanlderrefresh"></div>
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
    };
  },

  methods: {
    handlerMenu() {
      // 侧边栏的折叠
      this.$store.commit("CollapseMenu");
    },
    handlerDropdown(command) {
      // 个人中心
      if (command === "selfcenter") {
        this.$router.push({ name: "personalcenter" });
      }
      // 退出首页
      if (command === "cancel") {
        console.log("退出");
        cookie.remove("token");
        // 清除cookie中的menu
        cookie.remove("menu");
        this.$router.push({ name: "login" });
        this.$message({
          message: "退出成功",
          type: "success",
        });
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
  background-color: var(--bg7);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    color: var(--text-color);
    font-size: 14px;
    padding: 0 10px;
  }
  // .user {
  //   width: 40px;
  //   height: 40px;
  //   border-radius: 50%;
  // }
}
.l-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      &.is-link {
        color: rgb(67, 179, 207);
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: var(--text-color);
      }
    }
  }
}
.r-content {
  display: flex;
  align-items: center;
  .time {
    color: var(--text-color);
  }
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
