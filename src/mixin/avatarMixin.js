export const avatarMixin = {
  methods: {
    // 获取头像的功能 减少代码复用
    loadAvatar() {
      const storedAvatar = localStorage.getItem(`avatar_${this.username}`);
      const defaultAvatar =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.avatar = storedAvatar || defaultAvatar;
    },
    handleFileChange(e) {
      try {
        if (!e.target || !e.target.files || e.target.files.length === 0) {
          return;
        }
        if (this.roles === "用户获取失败") {
          this.$message({
            message: "用户获取失败 请重新登录",
            type: "warning",
          });
          return;
        }
        if (!this.roles.includes("超级管理员")) {
          this.$message({
            type: "error",
            message: "亲，您的权限不足",
          });
          return;
        }
        // 获取文件对象
        const file = e.target.files[0];
        // 创建FileReader实例
        const reader = new FileReader();
        // 加载文件
        reader.onload = (e) => {
          // 将获取的头像地址赋值给avatar
          this.avatar = e.target.result;
          // 存储到本地存储
          localStorage.setItem(`avatar_${this.username}`, this.avatar);
          // 提示成功信息
          this.$message({
            message: "头像更换成功",
            type: "success",
          });
        };
        // 将读取的文件转换为DataURL
        reader.readAsDataURL(file);
      } catch (error) {
        // 提示失败信息
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
      }
    },
  },
};
