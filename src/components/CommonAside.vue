<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="var(--text-color2)"
    active-text-color="#43b3cf"
  >
    <h3 style="color: var(--text-color1); background-color: var(--bg7)">
      <!-- <img src="../assets/logo.png" class="logo" /> -->
      {{ isCollapse ? "后台" : "后台管理系统" }}
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
        <span slot="title">{{ item.lable }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.lable
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import cookie from "js-cookie";
export default {
  name: "CommonAside",
  data() {
    return {};
  },
  methods: {
    // 点击菜单
    clickMenu(item) {
      // 当页面的路由与我们跳转的路由不一致时,才允许跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        // 跳转
        this.$router.push(item.path);
      }
      // 添加tab
      this.$store.commit("addTabs", item);
    },
  },
  computed: {
    // 没有子菜单
    noChildrenMenu() {
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildrenMenu() {
      return this.menuData.filter((item) => item.children);
    },
    // 菜单数据
    menuData() {
      // 判断当前数据 如果cookie没有 则从store中获取
      return JSON.parse(cookie.get("menu")) || this.$store.state.tab.menu;
    },
    // 菜单展开收起
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: var(--bg7);
}
.el-menu {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使用百分比而不是 calc */
  border-right: 0;
  background-color: var(--bg7);
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
