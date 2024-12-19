export const pagedataMixin = {
  methods: {
    // 统一处理用户与产品管理的逻辑 减少代码重复 增强复用性
    // 修正分页处理逻辑
    handleSizeChange(val) {
      this.pageData.limit = val;
      this.getList();
    },
    // 修正页码处理逻辑
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getList();
    },
    handleClose() {
      // console.log(this.form);
      // 清空表单
      this.resetForm();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    cancel() {
      // 关闭弹窗
      this.handleClose();
      //  调用resetForm方法 用于统一重置表单
      this.resetForm();
    },
    // 封装弹窗权限方法
    handlerDialog() {
      this.$message({
        type: "error",
        message: "亲，您的权限不足",
      });
    },
    // 导入导出权限处理
    handlerImEx() {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
    },
    // 导入excel
    handlerImport() {
      // 获取DOM点击事件
      this.$refs.fileInput.click();
    },
    // 关闭查看内容
    viewClose() {
      this.viewList = false;
    },
  },
};
