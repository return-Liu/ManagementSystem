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
    getUser().then(({ data }) => {
      // console.log(data); // 打印整个数据对象
      if (data && data.list && Array.isArray(data.list)) {
        // 解构数据对象
        const { list } = data;
        // console.log(list);
        // 通过refs 获取到dom元素
        const echart = echarts.init(this.$refs.echart);
        // 配置项
        const Option = {};
        // 处理数据xAxis
        const xAxis = Object.keys(list[0]);
        // x轴
        const xAxisData = {
          data: xAxis,
        };
        // 将xAxisData添加到Option中
        Option.xAxis = xAxisData;
        // y轴
        Option.yAxis = {
          type: "value", // 使用 "value" 类型
        };
        // 图例
        Option.legend = {
          data: xAxis,
        };
        // 设置系列列表为空数组
        Option.series = [];
        // 根据x轴遍历每一项添加到列表中
        xAxis.forEach((key) => {
          console.log(key);
          Option.series.push({
            // id name addr age birth sex
            name: key,
            // 折线图
            type: "line",
            data: list.map((item) => item[key] ?? null), // 处理 undefined 情况
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        echart.setOption(Option);
      }
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
