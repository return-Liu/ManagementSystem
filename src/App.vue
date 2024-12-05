<template>
  <div class="container">
    <div v-show="loading" class="loading-line"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      theme: localStorage.getItem("theme"),
      // 表示加载状态
      loading: false,
      // 表示存储加载定时器
      loadingTimer: null,
      // 默认加载时间
      loadDuration: 500,
    };
  },
  created() {
    console.log("Router:", this.$router);
    if (!this.$router) {
      console.error("Vue Router is not defined");
      return;
    }
    document.documentElement.setAttribute("data-theme", this.theme);
    // to 表示在那个路由 from 表示去那个路由 next跳过以上继续执行
    this.$router.beforeEach((to, from, next) => {
      // 当路由进行加载时 将加载状态啊为true
      this.loading = true;
      // 如果存在之前的加载定时器
      if (this.loadingTimer) {
        // 清除
        clearTimeout(this.loadingTimer);
      }
      // 以上都跳过 继续执行
      next();
    });
    this.$router.afterEach((to, from) => {
      // 记录路由切换信息。
      console.log("路由切换", to, from);
      this.loadDuration = 500; // 重置默认加载时间
      // 启动加载动画
      this.startLoadingAnimation();
    });
  },
  methods: {
    startLoadingAnimation() {
      // 记录当前时间
      const startTime = Date.now();
      // 确保DOM更新后再执行加载动画
      this.$nextTick(() => {
        // 设置一个定时器，在指定时间后执行
        this.loadingTimer = setTimeout(() => {
          // 记录结束时间
          const endTime = Date.now();
          // 计算实际的加载时间
          const actualDuration = endTime - startTime;
          // 确保加载时间不少于 500ms
          this.loadDuration = Math.max(500, actualDuration);
          // 关闭加载状态
          this.loading = false;
        }, this.loadDuration);
      });
    },
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
  box-sizing: border-box;
}
body {
  background-color: var(--bg1);
  color: var(--text-color);
  margin: 0 auto;
}
:deep(.el-card__body),
:deep(.el-main) {
  padding: 20px;
  margin-bottom: 0;
}

.loading-line {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: #43b3cf;
  z-index: 1000;
  width: 0;
  animation: load 1s forwards;
}

@keyframes load {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
