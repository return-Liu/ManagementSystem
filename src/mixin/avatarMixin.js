export const avatarMixin = {
  methods: {
    // 获取头像的功能 增强代码的复用 减少代码重复
    loadAvatar() {
      const storedAvatar = localStorage.getItem(`avatar_${this.username}`);
      const defaultAvatar =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.avatar = storedAvatar || defaultAvatar;
    },
    handleFileChange(e) {
      if (!this.isValidFile(e)) return;
      if (!this.hasPermission()) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatar = e.target.result;
        localStorage.setItem(`avatar_${this.username}`, this.avatar);
        this.showMessage("头像更换成功", "success");
      };
      reader.onerror = () => this.showMessage("头像更换失败", "error");
      reader.readAsDataURL(file);
    },
    isValidFile(e) {
      if (!e.target || !e.target.files || e.target.files.length === 0) {
        return false;
      }
      return true;
    },
    hasPermission() {
      if (this.roles === "用户获取失败") {
        this.showMessage("用户获取失败 请重新登录", "warning");
        return false;
      }
      if (!this.roles.includes("超级管理员")) {
        this.showMessage("亲，您的权限不足", "error");
        return false;
      }
      return true;
    },
    showMessage(message, type) {
      this.$message({ message, type, duration: 1500 });
    },
  },
};
