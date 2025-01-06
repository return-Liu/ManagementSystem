export const headerMixin = {
  mounted() {
    this.setupSystemThemeListener();
    // this.handleSystemThemeChange();
  },
  destroyed() {
    this.removeSystemThemeListener();
    this.setupSystemThemeListener();
  },
  methods: {
    // 图标切换
    handlerAutoTheme(theme) {
      if (theme === "os_default") {
        this.$confirm(
          "主动切换主题后,将暂时关闭主题跟随功能,可在模式选择中,重新开启自动跟随",
          "温馨提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        )
          .then(() => {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              this.setTheme("light");
            }
            if (window.matchMedia("(prefers-color-scheme: light)").matches) {
              this.setTheme("dark");
            }
            this.showMessage("正在切换中", "success");
          })
          .catch(() => {
            this.showMessage("自动跟随系统模式中", "info");
          });
      }
    },
    // 自动主题
    handlerTheme(theme) {
      if (theme === "os_default") {
        this.$confirm(
          "切换为跟随系统模式后,将根据系统主题自动切换浅深模式？",
          "温馨提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        )
          .then(() => {
            this.setupSystemThemeListener();
            this.showMessage("已开启跟随系统模式", "success");
            this.setTheme(theme);
          })
          .catch(() => {
            this.removeSystemThemeListener();
            this.showMessage("已取消跟随系统模式", "error");
          });
      } else {
        this.setTheme(theme);
      }
    },
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      const iconItem = {
        dark: "el-icon-sunny",
        light: "el-icon-moon",
        os_default: `${this.iconClass}`,
      };
      this.iconClass = iconItem[theme];
      localStorage.setItem("icon", this.iconClass);
    },
    setupSystemThemeListener() {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      // console.log(this.mediaQuery);
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
      // 系统变化
      const systemTheme = e.matches ? "os_default" : "os_default";
      // 图标变化
      const IconTheme = e.matches ? "el-icon-sunny" : "el-icon-moon";
      this.setTheme(systemTheme);
      this.iconClass = IconTheme;
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
    switchAside() {
      this.$root.$emit("updateSidebarAside", this.value4);
      this.showMessage(this.value4 ? "已开启固定侧边栏" : "已取消固定侧边栏");
    },
    switchLogo() {
      this.$root.$emit("updateSidebarLogo", this.value2);
      this.showMessage(this.value2 ? "Logo显示成功" : "Logo隐藏成功");
    },
    // 统一处理提示信息
    showMessage(message, type = "info") {
      this.$message({
        type,
        message,
        duration: 1500,
      });
    },
  },
  computed: {
    titleTheme() {
      if (this.theme === "os_default") {
        return "跟随系统模式";
      }
      return this.theme === "light" ? "深色模式" : "浅色模式";
    },
  },
};
