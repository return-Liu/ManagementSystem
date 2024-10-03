、
<template>
  <div class="data">
    <el-card class="card">
      <div class="text">数据管理</div>
      <!-- 折线图 -->
      <div ref="echart" style="height: 300px"></div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getUser } from "../api";
export default {
  name: "DataManagement",
  data() {
    return {};
  },
  mounted() {
    getUser()
      .then(({ data }) => {
        // console.log(data); // 打印整个数据对象
        if (data && data.list && Array.isArray(data.list)) {
          const { list } = data;
          const echart1 = echarts.init(this.$refs.echart);
          const echartOption = {};
          // 处理数据xAxis
          const xAxis = Object.keys(list[0]);
          // console.log(xAxis);
          // x轴
          const xAxisData = {
            data: xAxis,
          };
          // 将xAxisData添加到echartOption中
          echartOption.xAxis = xAxisData;
          // y轴
          echartOption.yAxis = {
            type: "value", // 使用 "value" 类型
          };
          // 图例
          echartOption.legend = {
            data: xAxis,
          };
          // 设置系列列表为空数组
          echartOption.series = [];
          // 根据x轴遍历每一项添加到列表中
          xAxis.forEach((key) => {
            echartOption.series.push({
              name: key,
              type: "line",
              data: list.map((item) => item[key] ?? null), // 处理 undefined 情况
            });
          });
          // console.log(echartOption);
          // 使用刚指定的配置项和数据显示图表。
          echart1.setOption(echartOption);
        } else {
          console.log("数据没有获取到");
        }
      })
      .catch((error) => {
        console.error("获取数据时出错:", error);
      });
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
