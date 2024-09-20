<template>
  <div class="login-page" :class="{ 'login-page': true }">
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      :model="form"
      :rules="rules"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          :type="showPassword ? 'text' : 'password'"
          ref="password"
          v-model="form.password"
          placeholder="请输入密码"
        >
        </el-input>
        <i
          class="el-icon-view"
          :class="{
            'el-icon-view': !showPassword,
            'el-icon-close': showPassword,
          }"
          @click="handlerClick"
        ></i>
      </el-form-item>
      <div class="register-box">
        <span class="register" @click="register">新用户?是否注册</span>
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
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      showPassword: false, // 添加这个属性来控制密码显示
    };
  },
  created() {
    // 在组件创建时检查token是否存在，不存在则默认隐藏提示框
    if (!Cookie.get("token")) {
      this.alertVisible = false;
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form)
            .then(({ data }) => {
              // 根据响应码决定是否显示错误提示及后续操作
              if (data.code === 200) {
                Cookie.set("token", data.data.token);
                // 获取菜单数据 存入store
                this.$store.commit("setMenu", data.data.menu);
                // 添加动态路由
                this.$store.commit("addMenu", this.$router);
                // 当前路由为登录页时，跳转到首页
                this.$router.push({ name: "home", path: "/home" });
                // 登录成功逻辑  直接显示登录成功通知
                this.$notify({
                  title: "提示",
                  message: "登录成功",
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
        }
      });
    },
    handlerClick() {
      // 切换密码显示状态
      this.showPassword = !this.showPassword;
    },
    register() {
      // this.$router.push("register");
      // this.$message.success("还在开发中,敬请期待");
      this.$router.push({ name: "register", path: "/register" });
    },
  },
};
</script>
<style scoped lang="less">
.login-page {
  background: var(--bg11);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .el-form {
    width: 350px;
    margin: 0 auto;
    padding: 35px 35px 25px 35px;
    border-radius: 15px;
    background: var(--bg12);
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-alert {
      width: 300px;
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
      width: 198px;
    }
    .login {
      width: 200px;
      transform: translateX(69px);
      background: var(--bg11);
      color: var(--text-color7);
      border-color: var(--border6);
      margin-top: 5px;
    }
    .el-icon-view {
      position: absolute;
      right: 6px;
      top: 13px;
      cursor: pointer;
    }
    .register-box {
      margin-top: -10px;
      cursor: pointer;
    }
    .register {
      color: var(--text-color8);
      margin: 0 0 0 180px;
      font-size: 12px;
    }
  }
}
</style>
