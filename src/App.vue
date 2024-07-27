<template>
  <div>
    <!-- 给路由出口添加过渡效果 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      // 获取本地存储的主题
      theme: localStorage.getItem("theme") || "light",
      // theme: localStorage.getItem("theme"),
    };
  },
  mounted() {
    // 获取主题进行挂载
    document.documentElement.setAttribute("data-theme", this.theme);
  },
};
</script>
<style lang="less">
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
body {
  background-color: var(--bg1);
  color: var(--text-color);
}
// 处理卡片内的样式
/* 使用:deep()穿透Element UI组件的封装 */
:deep(.el-card__body),
:deep(.el-main) {
  padding: 20px;
  margin-bottom: 0; /* 避免负margin影响外部布局 */
}
</style>
