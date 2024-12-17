<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="var(--text-color1)"
    active-text-color="#43b3cf"
    :style="{ backgroundColor: bgc }"
    :class="{ 'color-deficiency-mode': value3, 'aslide-fixed': isAside }"
  >
    <h3
      :style="{
        display: logo ? 'block' : 'none', // 根据 logo 值控制显示
      }"
    >
      {{ isCollapse ? "Krry" : " Krry blog" }}
    </h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildrenMenu"
      :key="item.name"
      :index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.lable }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildrenMenu"
      :key="item.lable"
      :index="item.lable"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span style="color: var(--text-color7)" slot="title">{{
          item.lable
        }}</span>
      </template>
      <el-menu-item-group
        :style="{ backgroundColor: bgc }"
        v-for="subItem in item.children"
        :key="subItem.path"
      >
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          {{ subItem.lable }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import cookie from "js-cookie";
export default {
  name: "CommonAside",
  data() {
    return {
      bgc: "var(--bg7)", // 设置初始值
      logo: true, // 设置初始值
      value3: localStorage.getItem("deficiency") === "true",
      // 固定侧边栏
      isAside: "",
    };
  },
  created() {
    // 更新背景颜色 接收组件传来的值
    this.$root.$on("updateSidebarBackground", (newBgc) => {
      this.bgc = newBgc;
    });
    // 控制LOGO显示 接收组件传来的值
    this.$root.$on("updateSidebarLogo", (newLogo) => {
      this.logo = newLogo;
    });
    // 控制色弱模式 接收组件传来的值
    this.$root.$on("updateSidebarDeficiency", (newDeficiency) => {
      this.value3 = newDeficiency;
      if (newDeficiency) {
        document.body.classList.add("color-deficiency-mode");
      } else {
        document.body.classList.remove("color-deficiency-mode");
      }
    });
    // 固定侧边栏 接收组件传来的值
    this.$root.$on("updateSidebarAside", (newAside) => {
      this.isAside = newAside;
      if (newAside) {
        document.body.classList.add("aslide-fixed");
      } else {
        document.body.classList.remove("aslide-fixed");
      }
    });
  },
  methods: {
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit("addTabs", item);
    },
  },
  computed: {
    noChildrenMenu() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildrenMenu() {
      return this.menuData.filter((item) => item.children);
    },
    menuData() {
      return JSON.parse(cookie.get("menu")) || this.$store.state.tab.menu;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.color-deficiency-mode {
  filter: invert(70%) sepia(8%) saturate(150%) hue-rotate(310deg)
    brightness(110%) contrast(110%);
}
.aslide-fixed {
  position: static;
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: var(--bg7);
  ::v-deep .el-menu {
    background-color: var(--bg7);
  }
  ::v-deep .el-menu-item-group__title {
    padding: 0;
  }
}
.el-menu {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使用百分比而不是 calc */
  border-right: 0;
  background-color: var(--bg7);

  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item:active {
    background-color: var(--bg9);
  }

  h3 {
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-color1);
  }
}
</style>
