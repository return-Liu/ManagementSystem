<template>
  <div class="login" :class="{ 'register-page': true }">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="form"
    >
      <i class="el-icon-back" title="返回" @click="returnClick"></i>
      <h3 class="login-title">注册页面</h3>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          placeholder="请输入密码"
          @keyup.enter="register"
        >
        </el-input>
        <i
          class="el-icon-view"
          :class="{
            'iconfont icon-biyan': !showPassword,
            'iconfont icon-zhengyan': showPassword,
          }"
          @click="togglePasswordVisibility('password')"
        ></i>
      </el-form-item>
      <el-form-item prop="passwords">
        <el-input
          prefix-icon="el-icon-lock"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="form.passwords"
          placeholder="请再次输入密码"
          @keyup.enter="register"
        >
        </el-input>
        <i
          class="el-icon-view"
          :class="{
            'iconfont icon-biyan': !showConfirmPassword,
            'iconfont icon-zhengyan': showConfirmPassword,
          }"
          @click="togglePasswordVisibility('confirmPassword')"
        ></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register" @click="register"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getRegister } from "../api";
export default {
  name: "RegisterManage",
  data() {
    return {
      passwordError: false,
      form: {
        username: "",
        password: "",
        passwords: "",
      },
      showPassword: false, // 控制第一个密码输入框的显示
      showConfirmPassword: false, // 控制第二个密码输入框的显示
    };
  },
  mounted() {
    // 监听键盘事件
    document.addEventListener("keydown", this.onKeyPress);
  },
  beforeDestroy() {
    // 销毁监听键盘事件
    document.removeEventListener("keydown", this.onKeyPress);
  },
  methods: {
    // 判断事件
    onKeyPress(e) {
      // 如果e.key是回车
      if (e.key === "Enter") {
        // 直接注册
        this.register();
      } else {
        // 否则退出
        return;
      }
    },
    // 返回
    returnClick() {
      // 跳转回登录页
      this.$router.push("login/index");
    },
    togglePasswordVisibility(type) {
      if (type === "password") {
        this.showPassword = !this.showPassword;
      } else if (type === "confirmPassword") {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    register() {
      // 判断校验
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
      if (!this.form.passwords) {
        this.$notify({
          title: "密码信息",
          message: "请再次输入密码",
          type: "error",
        });
        return;
      }
      if (this.form.password !== this.form.passwords) {
        this.$notify({
          title: "密码信息",
          message: "两次密码不一致 请重新输入",
          type: "error",
        });
        return;
      }
      getRegister(this.form)
        .then(({ data }) => {
          console.log("注册返回数据:", data, "账号密码", this.form);
          if (data.code === 200) {
            this.$notify({
              title: "提示",
              message: "注册成功",
              type: "success",
            });
            this.$router.push("login/index");
          } else {
            this.$notify({
              title: "警告",
              message: "注册失败 请重新输入",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("注册请求失败:", error);
          this.$notify({
            title: "错误",
            message: "注册请求失败，请稍后再试",
            type: "error",
          });
        });
    },
  },
};
</script>
<style scoped lang="less">
// 为了确保注册页面(register.vue)不受全局body样式的影响
.register-page {
  background: radial-gradient(ellipse at bottom, #1b2753 0%, #090a0f 100%);
  width: 100%;
  height: 100vh;
}
.el-form {
  width: 350px;
  margin: 0 auto;
  padding: 35px 35px 25px 35px;
  background: var(--bg12);
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  top: 200px;
  .el-icon-back {
    color: var(--text-color7);
    font-size: 20px;
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
    position: relative;
    left: 40px;
  }
  .el-icon-view {
    position: absolute;
    right: -30px;
    top: 13px;
    cursor: pointer;
    color: var(--text-color7);
  }
  .register {
    margin: 0 40px;
    width: 200px;
    background: var(--bg11);
    color: var(--text-color7);
    border-color: var(--border6);
  }
}
</style>
