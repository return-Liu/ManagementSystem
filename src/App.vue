<template>
  <div>
    <!-- 展示区域 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
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
}
// 处理卡片内的样式
/* 使用:deep()穿透Element UI组件的封装 */
:deep(.el-card__body),
:deep(.el-main) {
  padding: 20px;
  margin-bottom: 0; /* 避免负margin影响外部布局 */
}
</style>
