<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag />
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTag from "../components/CommonTag";
export default {
  // 关闭语法检查
  /* eslint-disable */
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
/* 侧边栏滚动条取消样式 */
.el-aside {
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
}
.el-header {
  padding: 0;
}
</style>
