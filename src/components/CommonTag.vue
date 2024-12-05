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
import cookie from "js-cookie";
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
      // 如果点击的tag和当前路由名称相同，则不跳转
      if (item.name !== this.$route.name) {
        this.$router.push({ name: item.name });
      }
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
    loadMessages() {
      const messages = localStorage.getItem("messages") || "用户信息获取失败";
      this.messages = messages;
    },
    loadRoles() {
      const roles = localStorage.getItem("roles") || "用户获取失败";
      this.roles = roles;
    },
  },
  created() {
    this.roles = cookie.get("roles");
    this.loadMessages();
    this.loadRoles();
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
