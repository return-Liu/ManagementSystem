<template>
  <div class="part">
    <div class="login-container">
      <el-card
        class="box-card"
        :style="{ backgroundImage: `url(${login_bg})` }"
      >
        <div class="login-title">登录</div>
        <el-form
          :model="form"
          status-icon
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="account" style="position: relative">
            <input
              type="text"
              v-model="form.account"
              placeholder="账号/手机号/邮箱"
            />
            <i
              @click="arrowDown"
              class="el-icon-arrow-down"
              style="position: absolute; right: 0; color: #fff; bottom: 20px"
            ></i>
          </el-form-item>
          <el-form-item prop="password">
            <input type="text" placeholder="密码" v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="login"
              >登录</el-button
            >
          </el-form-item>
          <!-- 忘记密码 新用户登录 -->
          <el-form-item class="button-container">
            <el-button
              type="text"
              class="forget-password"
              @click="forgetPassword"
              >忘记密码</el-button
            >
            <el-button type="text" class="new-user-login" @click="newUserLogin"
              >新用户登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  // 关闭语法检查
  /* eslint-disable */
  name: "Login",
  data() {
    return {
      login_bg: require("@/assets/images/app=49&f=JPEG&fm=173&fmt=auto&u=3666850970,953079923.jpg"),
      form: {
        account: "",
        password: "",
      },
      alertVisible: false, // 控制错误提示的显示
    };
  },
  created() {
    // 在组件创建时检查token是否存在，不存在则默认隐藏提示框
    if (!Cookie.get("token")) {
      this.alertVisible = false;
    }
  },
  destroyed() {
    // 在组件销毁时移除事件监听器
    document.removeEventListener("keydown", this.onKeyPress);
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyPress);
  },
  methods: {
    onKeyPress(e) {
      if (e.key === "Enter") {
        this.login();
      }
    },
    // 登录
    login() {
      if (!this.form.account) {
        this.showAlert("请输入账号/手机号", "error");
        return;
      }
      if (!this.form.password) {
        this.showAlert("请输入密码", "error");
        return;
      }

      getMenu(this.form)
        .then(({ data }) => {
          console.log("登录返回数据:", data, "账号密码", this.form);
          if (data.code === 200) {
            // 根据响应码决定是否显示错误提示及后续操作
            Cookie.set("token", data.data.token);
            // 获取菜单数据 存入store
            this.$store.commit("setMenu", data.data.menu);
            // 添加动态路由
            this.$store.commit("addMenu", this.$router);
            // 将用户ID存入store
            this.$store.commit("setUid", data.data.uid);
            // 将用户角色存入store
            this.$store.commit("setMessage", data.data.messages);
            // 将用户信息存入store
            this.$store.commit("setRole", data.data.roles);
            // 设置用户头像
            this.$store.commit("setAvatar", data.data.avatar);
            // 当前路由为登录页时 跳转到首页
            this.$router.push({ name: "home", path: "/home" });
            // 登录成功逻辑  直接显示登录成功通知
            this.showAlert("登录成功", "success");
          } else {
            this.showAlert("账号或密码错误", "error");
          }
        })
        .catch((error) => {
          console.error("登录失败:", error.message);
          this.showAlert("登录失败", "error");
        });
    },
    arrowDown() {
      this.showAlert("正在测试中 后续会上线", "error");
    },

    forgetPassword() {
      this.$router.push({ name: "phoneveriflion", path: "/phoneveriflion" });
    },
    newUserLogin() {
      this.$router.push({ name: "register", path: "/register" });
    },
    // 封装提示信息
    showAlert(message, type) {
      this.alertVisible = true;
      this.$message({
        message,
        type,
      });
    },
  },
};
</script>

<style scoped lang="less">
.part {
  height: 100vh;
  background: #fff;
}
.login-container,
.box-card {
  width: 480px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 620px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  border-radius: 10px;
}

.login-title {
  margin-left: 70px;
  margin-top: 100px;
  padding: 20px;
  font-size: 30px;
  background: var(--bg12);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
input {
  width: 100%;
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0); // 透明背景
  border-bottom: 1px solid #ccc; // 添加底部边框
  padding: 10px 0;
}
input::-webkit-input-placeholder {
  color: #fff;
}

.el-form {
  margin-right: 70px;
}

.login-btn {
  width: 100%;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  height: 40px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.forget-password {
  margin-right: 125px;
}
.forget-password,
.new-user-login {
  color: #409eff;
}
</style>
