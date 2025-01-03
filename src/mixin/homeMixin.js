import axios from "axios";
export const homeMixin = {
  methods: {
    loadRoles() {
      const roles = localStorage.getItem("roles") || "用户获取失败";
      this.roles = roles;
    },
    async Weather(city) {
      await axios({
        url: `https://restapi.amap.com/v3/weather/weatherInfo`,
        params: {
          key: "b219cc978d96ce513e410c5835a84050",
          city,
        },
      })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.lives &&
            response.data.lives.length > 0
          ) {
            const liveData = response.data.lives[0];
            const weatherTip =
              this.weatherDataArray[liveData.weather] ||
              this.weatherDataArray.default;
            this.weatherData = `当前地区:${liveData.city} 今日:${liveData.weather} 实时气温:${liveData.temperature}℃ 温馨提示: ${weatherTip}`;
            this.showMessage("天气信息获取成功");
          }
        })
        .catch((error) => {
          if (error.response) {
            this.showMessage("天气信息获取失败", "error");
          } else {
            console.error("Error", error.message);
            this.showMessage("网络连接失败", "error");
          }
        });
    },
    handleClick(item) {
      const routeItem = {
        产品管理: { name: "products", path: "/products" },
        用户管理: { name: "users", path: "/users" },
        高德地图: { name: "mapintegration", path: "/mapintegration" },
        权限管理: {
          name: "permissionmanagement",
          path: "/permissionmanagement",
        },
      };
      const route = routeItem[item.name];
      if (route) {
        this.$router.push(route);
      }
    },
    handlerCity() {
      const city = this.selectedCity;
      this.Weather(city);
    },
    handlerList() {
      if (this.roles.includes("普通用户")) {
        this.$notify({
          message: "暂无查看权限",
          type: "warning",
        });
      }
    },
    showMessage(message) {
      this.$message({
        type: "success",
        message,
        duration: 1500,
      });
    },
  },
};
