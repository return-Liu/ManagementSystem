<template>
  <div class="Map">
    <!-- 搜索地区 -->
    <dv-border-box-11 title="地图展示区域">
      <div class="map-container">
        <div class="map-container-left">
          <div class="map-container-left-top"></div>
          <div class="map-container-left-map" id="mapContainer"></div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "MapintegrationManage",
  data() {
    return {};
  },
  mounted() {
    // 初始化地图
    this.initMap();
  },
  methods: {
    initMap() {
      console.log("Initializing map...");
      // 检查AMap是否定义
      if (typeof AMap === "undefined") {
        // 显示错误
        console.error("AMap is not defined");
        return;
      }
      // 创建地图实例
      const map = new AMap.Map("mapContainer", {
        // 设置地图的显示级别
        zoom: 13,
        // 启用3D视图
        viewMode: "3D",
        // 设置地图中心点
        center: [116.397428, 39.90923], // 北京
      });
      // axios({
      //   url: "https://webapi.amap.com/maps?v=1.4.15",
      //   params: {
      //     key: "b219cc978d96ce513e410c5835a84050",
      //   },
      // }).then((response) => {
      //   console.log(response);
      // });
      // 创建标记实例
      const marker = new AMap.Marker({
        // 设置标记的坐标
        position: [116.397428, 39.90923],
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png", // 红色内置图标
      });
      // 将标记添加到地图上
      map.add(marker);
      // 判断当前网络状态是否显示地图
      // 如果成功 则显示地图 失败则提示
      navigator.onLine;
      this.$message({
        message: "当前网络可用",
        type: "success",
      });

      // console.log("网络状态", nav);

      // 监听地图加载完成事件
      map.on("complete", () => {
        // 地图加载完成后，显示地图
        this.$message({
          message: "地图加载完成",
          type: "success",
        });
      });
    },
  },
};
</script>
<style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
}

.search-area {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 200px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 5px 10px;
    margin-left: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-container-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-container-left-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.map-container-left-map {
  width: calc(100% - 140px);
  height: calc(100% - 100px);
  border-radius: 5px;
  margin-top: 40px;
}
</style>
