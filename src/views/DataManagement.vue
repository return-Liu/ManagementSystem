<template>
  <div class="data">
    <el-card class="card">
      <div class="text">数据管理</div>
      <!-- 折线图 -->
      <div ref="echart"></div>
    </el-card>
  </div>
</template>
<script>
// import * as echarts from "echarts";
export default {
  name: "DataManagement",
  data() {
    return {};
  },
  mounted() {
    // // 基于准备好的DOM 初始化echarts实例
    // const echart1 = echarts.init(this.$refs.echart);
    // // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    // };
  },
};
</script>
<style lang="less" scoped>
.card {
  width: 100%;
  height: 400px;
  background: var(--bg10);
  border: var(--border1);
}
.text {
  text-align: center;
  color: var(--text-color5);
}
</style>
