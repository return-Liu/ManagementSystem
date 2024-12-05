<template>
  <div :class="{ 'login-page': true }">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <el-form label-width="70px" ref="form" :model="form" class="login-form">
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          @keyup.enter="login"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            :class="{
              'iconfont icon-biyan': !showPassword,
              'iconfont icon-zhengyan': showPassword,
            }"
            @click="handlerClick"
          ></i>
        </el-input>
      </el-form-item>
      <div class="register-box">
        <span class="register" @click="register">没有此账号? 注册</span>
      </div>
      <el-form-item>
        <el-button type="primary" class="login" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "LoginManage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },

      showPassword: false, // 控制密码显示
      alertVisible: false, // 控制错误提示的显示
    };
  },
  created() {
    // 在组件创建时检查token是否存在，不存在则默认隐藏提示框
    if (!Cookie.get("token")) {
      this.alertVisible = false;
    }
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
      if (!this.form.username) {
        this.$notify({
          title: "账号信息",
          message: "请输入账号",
          type: "error",
        });
        return;
      }
      if (!this.form.password) {
        this.$notify({
          title: "密码信息",
          message: "请输入密码",
          type: "error",
        });
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
            // 将用户角色存入store
            this.$store.commit("setMessage", data.data.messages);
            // 将用户信息存入store
            this.$store.commit("setRole", data.data.roles);
            // 设置用户头像
            this.$store.commit("setAvatar", data.data.avatar);
            // 当前路由为登录页时 跳转到首页
            this.$router.push({ name: "home", path: "/home" });
            // 登录成功逻辑  直接显示登录成功通知
            this.$notify({
              title: "提示",
              message: `登录成功 欢迎回来 ${data.data.roles}`,
              type: "success",
            });
          } else {
            this.$notify({
              title: "警告",
              message: "用户名或密码错误",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("登录失败:", error.message);
          this.$notify({
            title: "错误",
            message: "你的网络登录过程中发生错误，请稍后再试。",
            type: "error",
          });
        });
    },
    handlerClick() {
      // 切换密码显示状态
      this.showPassword = !this.showPassword;
    },
    register() {
      this.$router.push({ name: "register", path: "/register" });
    },
  },
};
</script>

<style scoped lang="less">
.login-page {
  background: radial-gradient(ellipse at bottom, #1b2753 0%, #090a0f 100%);
  width: 100%;
  height: 100vh;
}
.login-form {
  width: 360px;
  height: 350px;
  margin: 0 auto;
  padding: 35px 35px 25px 35px;
  border-radius: 15px;
  background: var(--bg12);
  box-sizing: border-box;
  position: relative;
  top: 200px;
  .el-form-item {
    margin-bottom: 20px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 40px;
    background: var(--bg9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .el-input {
    width: 100%;
    position: relative;
    left: -30px;
  }

  .login {
    position: relative;
    left: -30px;
    width: 220px;
    background: var(--bg11);
    color: var(--text-color7);
    border-color: var(--border6);
    margin-top: 10px;
  }

  .el-icon-view,
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: var(--text-color7);
  }

  .register-box {
    margin-top: 10px;
    text-align: right;
    position: relative;
    left: -30px;
    cursor: pointer;
  }

  .register {
    color: var(--text-color7);
    font-size: 12px;
  }
}
</style>
