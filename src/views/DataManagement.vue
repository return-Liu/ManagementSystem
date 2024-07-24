<template>
  <div class="data">
    <el-card
      style="
        height: 350px;
        background-color: var(--bg1);
        border: var(--border1);
      "
    >
    </el-card>
  </div>
</template>

<!-- 通过事件总线把数据大屏信息传给数据管理 -->
<script>
import { eventBus } from "./main"; // 导入事件总线
export default {
  name: "DataManagement",
  data() {
    return {
      receivedData: [], // 用于存储从事件总线接收到的数据
    };
  },
  created() {
    // 监听事件总线上的'dataUpdated'事件
    eventBus.$on("dataUpdated", (data) => {
      this.receivedData = data;
      console.log("Received data:", data);
    });
  },
  beforeDestroy() {
    // 组件销毁前，移除事件监听器
    eventBus.$off("dataUpdated");
  },
};
</script>
<style></style>
