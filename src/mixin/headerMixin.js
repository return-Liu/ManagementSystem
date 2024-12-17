export const headerMixin = {
  methods: {
    // 获取主题的功能 减少代码复用
    handlerTheme(theme) {
      //  调用setTheme方法
      this.setTheme(theme);
    },
    setTheme(Theme) {
      this.theme = Theme;
      if (Theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        this.iconClass = "el-icon-sunny";
        localStorage.setItem("icon", "el-icon-sunny");
      } else if (Theme === "system") {
        this.applySystemTheme();
        localStorage.setItem("theme", "system");
        // 根据系统主题更新图标
        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        this.iconClass = prefersDarkScheme ? "el-icon-moon" : "el-icon-sunny";
        localStorage.setItem("icon", this.iconClass);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        this.iconClass = "el-icon-moon";
        localStorage.setItem("icon", "el-icon-moon");
      }
    },
    // 系统主题
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
      const header_container = document.querySelector(".header-container");
      if (item === "top-black") {
        header_container.style.backgroundColor = "#2F273B";
      } else if (item === "top-white") {
        header_container.style.backgroundColor = "#77CB29";
      }
      if (item === "left") {
        this.$root.$emit("updateSidebarBackground", "rgb(48, 70, 92)");
      } else if (item === "right") {
        this.$root.$emit("updateSidebarBackground", "#4CE4CD");
      }
      this.$message({
        type: "success",
        message: "主题风格模式成功",
        duration: 1500,
      });
    },
    switchHeader() {
      const isHeader = document.querySelector(".header-container");
      if (isHeader) {
        if (this.value1 == true) {
          isHeader.style.position = "static";
          this.$message({
            type: "success",
            message: "已开启固定头部栏",
            duration: 1500,
          });
        } else {
          this.$message({
            type: "success",
            message: "已取消固定头部栏",
            duration: 1500,
          });
        }
      }
    },
    switchDeficiency() {
      this.$root.$emit("updateSidebarDeficiency", this.value3);
      this.isDisabled = this.value3;
      if (this.value3) {
        this.$message({
          message: "色弱模式已开启 部分主题开启禁用状态 注意用眼",
          type: "success",
        });
        localStorage.setItem("deficiency", "true");
      }
      if (this.value3 == false) {
        this.$message({
          message: "色弱模式已关闭 部分主题解除禁用状态",
          type: "success",
        });
        localStorage.setItem("deficiency", "false");
      }
    },
    switchAside() {
      this.$root.$emit("updateSidebarAside", this.value4);
      if (this.value4 == true) {
        this.$message({
          type: "success",
          message: "已开启固定侧边栏",
          duration: 1500,
        });
      } else {
        this.$message({
          type: "success",
          message: "已取消固定侧边栏",
          duration: 1500,
        });
      }
    },
    switchLogo() {
      this.$root.$emit("updateSidebarLogo", this.value2);
      if (this.value2 == false) {
        this.$message({
          type: "success",
          message: "Logo隐藏成功",
          duration: 1500,
        });
      } else {
        this.$message({
          type: "success",
          message: "Logo显示成功",
          duration: 1500,
        });
      }
    },
  },
};
