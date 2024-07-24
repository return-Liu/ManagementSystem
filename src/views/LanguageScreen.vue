<template>
  <div>
    <el-card
      style="
        height: 350px;
        background-color: var(--bg1);
        border: var(--border1);
      "
    >
      <dv-border-box-1 :color="['red', 'green']" backgroundColor="blue"
        >dv-border-box-1</dv-border-box-1
      >
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LanguageScreen",
  data() {
    return {
      tableData: [
        { date: "java", address: "100%" },
        { date: "python", address: "80%" },
        { date: "c++", address: "60%" },
        { date: "c#", address: "40%" },
        { date: "javascript", address: "20%" },
      ],
    };
  },
};
</script>
<style scoped lang="less">
::v-deep .el-table {
  background-color: var(--bg1);
}

::v-deep .el-table__body-wrapper tbody tr {
  background-color: var(--bg1);
}

::v-deep .el-table__header {
  background-color: var(--bg1);
}

::v-deep .el-table__header th {
  background-color: var(--bg1);
}
</style>
