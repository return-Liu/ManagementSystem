// vuex状态持久化
export default function persist(store) {
  // 保存状态到本地存储
  store.subscribe((mutation, state) => {
    localStorage.setItem("vuex", JSON.stringify(state));
  });

  // 从本地存储恢复状态
  const savedState = localStorage.getItem("vuex");
  try {
    if (savedState) {
      store.replaceState(JSON.parse(savedState));
    }
  } catch {
    console.log("数据异常");
  }
}
