export const headerMixin = {
  methods: {
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
      this.showMessage("模式切换成功");
    },
    applySystemTheme() {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setTheme(prefersDarkScheme ? "dark" : "light");
    },
    selectItem(item) {
      this.selectedItem = item;
      const headerContainer = document.querySelector(".header-container");
      const backgroundColorMap = {
        "top-black": "#2F273B",
        "top-white": "#77CB29",
        "top-bg1": this.background_bg_1,
        "top-bg2": this.background_bg_2,
        "top-bg3": this.background_bg_3,
        "top-bg4": this.background_bg_4,
      };
      console.log(item);
      if (backgroundColorMap[item]) {
        if (item.startsWith("top-bg")) {
          // 如果是背景图片，清除背景颜色
          headerContainer.style.backgroundImage = `url(${backgroundColorMap[item]})`;
          headerContainer.style.backgroundColor = "transparent"; // 确保背景颜色透明
        } else {
          // 如果是颜色，清除背景图片
          headerContainer.style.backgroundImage = "none";
          headerContainer.style.backgroundColor = backgroundColorMap[item];
        }
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
    // 统一处理提示信息
    showMessage(message) {
      this.$message({
        type: "success",
        message,
        duration: 1500,
      });
    },
  },
};
