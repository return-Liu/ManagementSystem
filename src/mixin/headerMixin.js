export const headerMixin = {
  created() {
    if (this.theme === "auto") {
      this.setupSystemThemeListener();
    }
  },
  destroyed() {
    this.removeSystemThemeListener();
  },
  methods: {
    // 当前是系统主题
    handlerAutoTheme() {
      // 根据当前主题切换到相反的主题
      const newTheme = this.theme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    },
    // 手动选择 dark 或 light 主题
    handlerTheme(theme) {
      if (theme === "auto") {
        this.setupSystemThemeListener();
      } else {
        this.removeSystemThemeListener();
      }
      this.setTheme(theme);
    },
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      const iconItem = {
        dark: "el-icon-sunny",
        light: "el-icon-moon",
        auto: "el-icon-moon",
      };
      this.iconClass = iconItem[theme];
      localStorage.setItem("icon", this.iconClass);
    },
    setupSystemThemeListener() {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.mediaQuery.addEventListener("change", this.handleSystemThemeChange);
      this.handleSystemThemeChange(this.mediaQuery);
    },
    removeSystemThemeListener() {
      if (this.mediaQuery) {
        this.mediaQuery.removeEventListener(
          "change",
          this.handleSystemThemeChange
        );
      }
    },
    handleSystemThemeChange(e) {
      const systemTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
      this.iconClass =
        systemTheme === "dark" ? "el-icon-sunny" : "el-icon-moon";
      localStorage.setItem("icon", this.iconClass);
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
          headerContainer.style.backgroundImage = `url(${backgroundColorMap[item]})`;
          headerContainer.style.backgroundColor = "transparent";
        } else {
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
  computed: {
    titleTheme() {
      return this.theme === "light" ? "深色模式" : "浅色模式";
    },
  },
};
