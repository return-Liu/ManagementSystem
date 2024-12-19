export default {
  state: {
    roles: [], // 用户角色
    avatar: [], // 用户头像
    messages: [], // 用户信息
    uid: [],
  },
  mutations: {
    // 设置用户角色
    setRole(state, val) {
      state.roles = val;
      localStorage.setItem("roles", val);
    },
    // 设置用户头像
    setAvatar(state, val) {
      state.avatar = val;
      localStorage.setItem("avatar", val);
    },
    // 设置用户信息
    setMessage(state, val) {
      state.messages = val;
      localStorage.setItem("messages", val);
    },
    // 设置用户id
    setUid(state, val) {
      state.uid = val;
      localStorage.setItem("uid", val);
    },
  },
};
