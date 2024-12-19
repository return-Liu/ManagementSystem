export const avatarMixin = {
  methods: {
    // 获取头像的功能 增强代码的复用 减少代码重复
    loadAvatar() {
      const storedAvatar = localStorage.getItem(
        `avatar_${this.username}`,
        this.avatar
      );
      // 有就存储新头像 没有就默认头像
      const defaultAvatar =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.avatar = storedAvatar || defaultAvatar;
    },
    // 判断文件是否符合
    handleFileChange(e) {
      // 判断文件非符合 直接返回
      if (!this.isValidFile(e)) return;
      // 判断非拥有权限
      if (!this.hasPermission()) return;
      // 获取文件
      const file = e.target.files[0];
      // 获取头像类型
      const fileType = file.type;
      // 判断文件类型是否是图片
      if (!fileType.startsWith("image/")) {
        this.showMessage("请选择正确的头像类型", "error");
        return;
      }
      // 读取文件
      const reader = new FileReader();
      // 读取加载后
      reader.onload = (e) => {
        // 将获取文件的结果赋值给avatar
        this.avatar = e.target.result;
        // 存储到本地
        localStorage.setItem(`avatar_${this.username}`, this.avatar);
        // 提示信息
        this.showMessage("头像更换成功", "success");
      };
      // 读取失败
      reader.onerror = () => this.showMessage("头像更换失败", "error");
      // 转换为dataURL码
      reader.readAsDataURL(file);
    },
    // 判断文件是否符合
    isValidFile(e) {
      if (!e.target || !e.target.files || e.target.files.length === 0) {
        return false;
      }
      return true;
    },
    // 判断是否拥有权限
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
