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
    <div class="message-title">
      <span v-show="roles.includes('普通用户')">{{ messages }}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {
      roles: "",
      messages: "",
    };
  },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeRemove"]),
    // 点击tag跳转的功能
    addMsg(item) {
      // 当点击的标签与当前路由名称不同时，进行页面跳转
      if (item.name !== this.$route.name) {
        this.$router.push({ name: item.name });
      }
    },
    // 点击tag删除的功能
    hanlderClose(item, index) {
      this.closeRemove(item);
      // 获取当前tag的长度
      const length = this.tag.length;
      // 当删除的标签与当前路由名称不同时，直接返回
      if (item.name !== this.$route.name) {
        return;
      }
      //   表示的是删除的最后一项 则跳转至前一项
      if (index === length) {
        this.$router.push({
          name: this.tag[length - 1].name,
        });
        // 如果删除是中间一项 则跳转到最后一项
      } else {
        this.$router.push({
          name: this.tag[index].name,
        });
      }
    },
    load() {
      const messages = localStorage.getItem("messages");
      this.messages = messages;
      const roles = localStorage.getItem("roles");
      this.roles = roles;
    },
  },
  created() {
    this.load();
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  display: flex;
  background-color: var(--bg1);

  .el-alert {
    width: 150px;
    text-align: center;
    margin: 0 auto;
  }
  .el-tag {
    cursor: pointer;
    background-color: var(--bg6);
    border-color: var(--border7);
    color: var(--text-color1);
  }
  .message-title {
    position: fixed;
    right: 20px;
    color: var(--text-color1);
  }
}
</style>
