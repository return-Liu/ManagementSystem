<template>
  <div>
    <el-card
      style="
        height: 350px;
        background-color: var(--bg1);
        border: var(--border1);
      "
    >
      <div class="Product" style="background-color: var(--text-color)">
        其他语言大屏展示
      </div>
      <el-table :data="tableData" style="width: 100%">
        <!-- 设置语言列靠左 -->
        <el-table-column prop="date" label="语言" width="180" align="left">
        </el-table-column>
        <!-- 设置已完成列靠右 -->
        <el-table-column prop="address" label="已完成" align="right">
        </el-table-column>
      </el-table>
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
