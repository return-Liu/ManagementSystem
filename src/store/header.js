export default {
  state: {
    roles: [], // 用户角色
    avatar: [], // 用户头像
    messages: [], // 用户信息
  },
  mutations: {
    // 设置用户角色
    setRole(state, val) {
      state.roles = val;
      // console.log(`用户角色:${val}`);
      localStorage.setItem("roles", val);
    },
    // 设置用户头像
    setAvatar(state, val) {
      state.avatar = val;
      // console.log(`用户头像:${val}`);
      localStorage.setItem("avatar", val);
    },
    setMessage(state, val) {
      state.messages = val;
      localStorage.setItem("messages", val);
      // console.log(`用户信息:${val}`);
    },
  },
};
