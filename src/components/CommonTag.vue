<template>
  <div class="tabs">
    <el-tag
      @click="addMsg(item)"
      v-for="(item, index) in tag"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @close="hanlderClose(item, index)"
    >
      {{ item.lable }}
    </el-tag>
    <!-- 黑白主题 -->
    <div class="switch">
      <el-switch
        v-model="theme"
        active-icon-class="el-icon-moon"
        active-color="#183153"
        active-value="dark"
        inactive-icon-class="el-icon-sunny"
        inactive-color="#73c0fc"
        inactive-value="light"
        @change="switchTheme"
      >
      </el-switch>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {
      theme: localStorage.getItem("theme") || "light",
    };
  },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabsList,
    }),
  },
  mounted() {
    // 应用主题
    document.documentElement.setAttribute("data-theme", this.theme);
  },
  methods: {
    ...mapMutations(["closeRemove"]),

    // 点击tag跳转的功能
    addMsg(item) {
      this.$router.push({ name: item.name });
    },
    // 点击tag删除的功能
    hanlderClose(item, index) {
      this.closeRemove(item);
      const length = this.tag.length;
      //   删除之后的跳转逻辑
      // 如果删除非tag标签 不高亮显示
      if (item.name !== this.$route.name) {
        return;
      }
      //   表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tag[length - 1].name,
        });
        // 如果删除是中间一项 则跳转到前一项
      } else {
        this.$router.push({
          name: this.tag[index].name,
        });
      }
    },
    //
    // 主题
    switchTheme() {
      // 设置data-theme的主题
      document.documentElement.setAttribute("data-theme", this.theme);
      // 读取并打印设置后的主题值
      const theme = document.documentElement.getAttribute("data-theme");
      // console.log(theme);
      //将存储主题值到localStorage
      localStorage.setItem("theme", theme);
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  position: relative;
  display: flex;
  background-color: var(--bg1);

  .el-alert {
    width: 150px;
    text-align: center;
    margin: 0 auto;
  }
  .el-tag {
    cursor: pointer;
    background-color: var(--bg3);
    border: var(--border1);
    color: var(--text-color);
  }
  .switch {
    position: absolute;
    right: 20px;
  }
}
</style>
