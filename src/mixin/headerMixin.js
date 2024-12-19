export const headerMixin = {
  methods: {
    // 获取主题的功能 增强代码的复用 减少代码重复
    handlerTheme(theme) {
      this.setTheme(theme);
    },
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      const iconMap = {
        dark: "el-icon-sunny",
        light: "el-icon-moon",
        system: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "el-icon-moon"
          : "el-icon-sunny",
      };
      this.iconClass = iconMap[theme];
      localStorage.setItem("icon", this.iconClass);
      this.showMessage("色彩模式切换成功");
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
    selectItem(item) {
      this.selectedItem = item;
      const headerContainer = document.querySelector(".header-container");
      const backgroundColorMap = {
        "top-black": "#2F273B",
        "top-white": "#77CB29",
      };
      if (backgroundColorMap[item]) {
        headerContainer.style.backgroundColor = backgroundColorMap[item];
      }
      const sidebarBackgroundMap = {
        left: "rgb(48, 70, 92)",
        right: "#4CE4CD",
      };
      if (sidebarBackgroundMap[item]) {
        this.$root.$emit("updateSidebarBackground", sidebarBackgroundMap[item]);
      }
      this.showMessage("主题风格模式切换成功");
    },
    switchHeader() {
      const isHeader = document.querySelector(".header-container");
      if (isHeader) {
        isHeader.style.position = this.value1 ? "static" : "relative";
        this.showMessage(this.value1 ? "已开启固定头部栏" : "已取消固定头部栏");
      }
    },
    switchDeficiency() {
      this.$root.$emit("updateSidebarDeficiency", this.value3);
      this.isDisabled = this.value3;
      this.showMessage(
        this.value3
          ? "护眼模式已开启 部分主题开启禁用状态"
          : "护眼模式已关闭 部分主题解除禁用状态"
      );
      localStorage.setItem("deficiency", this.value3.toString());
    },
    switchAside() {
      this.$root.$emit("updateSidebarAside", this.value4);
      this.showMessage(this.value4 ? "已开启固定侧边栏" : "已取消固定侧边栏");
    },
    switchLogo() {
      this.$root.$emit("updateSidebarLogo", this.value2);
      this.showMessage(this.value2 ? "Logo显示成功" : "Logo隐藏成功");
    },
    showMessage(message) {
      this.$message({
        type: "success",
        message,
        duration: 1500,
      });
    },
  },
};
