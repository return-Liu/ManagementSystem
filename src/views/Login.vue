<template>
  <div class="login">
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
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login" @click="login">登录</el-button>
        <el-button type="primary" class="register" @click="register"
          >注册</el-button
        >
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
      alertVisible: true,
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
          getMenu(this.form).then(({ data }) => {
            // 根据响应码决定是否显示错误提示及后续操作
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              // 获取菜单数据 存入store
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" });
              // 登录成功逻辑
              this.$message({
                message: "登录成功",
                type: "success",
              });
            } else {
              // 登录失败逻辑
              this.$message.error("登录失败，请检查用户名和密码!");
            }
          });
        }
      });
    },
    register() {
      this.$router.push("register");
    },
  },
};
</script>
<style scoped lang="less">
.el-form {
  width: 350px;
  border: var(--bg8);
  margin: 150px auto;
  padding: 35px 35px 25px 35px;
  background-color: var(--bg1);
  border-radius: 15px;
  box-shadow: var(--box-shodow1);
  box-sizing: border-box;
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
    margin-left: 74px;
    background: var(--bg2);
    color: var(--text-color1);
    border-color: var(--border2);
  }
  .register {
    background: var(--bg2);
    color: var(--text-color1);
    border-color: var(--border2);
    margin-left: 48px;
  }
}
</style>
