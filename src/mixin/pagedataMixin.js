export const pagedataMixin = {
  methods: {
    // 统一处理分页问题
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
  },
};
