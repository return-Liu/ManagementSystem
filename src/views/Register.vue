<template>
  <div class="login" :class="{ 'register-page': true }">
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="form"
      :rules="rules"
    >
      <i class="el-icon-back" title="返回" @click="returnClick"></i>
      <h3 class="login-title">注册页面</h3>
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
      <el-form-item label="密码" prop="passwords">
        <el-input
          type="password"
          v-model="form.passwords"
          placeholder="请再次输入密码"
        ></el-input>
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
import { getMenu } from "../api";
export default {
  name: "RegisterManage",
  data() {
    return {
      passwordError: false,
      form: {
        username: "admin",
        password: "123456",
        passwords: "123456",
      },
      // 校验规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名或手机号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        passwords: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 返回
    returnClick() {
      // 跳转回登录页
      this.$router.push("login");
    },
    register() {
      // 判断校验
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then((response) => {
            // 当响应状态码为200时，注册成功 如果不为200，则注册失败
            if (response.data.code === 200) {
              this.$router.push("login");
              this.$notify({
                title: "提示",
                message: "注册成功",
                type: "success",
              });
            } else {
              // 失败的逻辑
              this.$notify({
                title: "警告",
                message: "注册失败",
                type: "warning",
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
// 为了确保注册页面(register.vue)不受全局body样式的影响
.register-page {
  background: var(--bg11);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.el-form {
  width: 350px;
  margin: 100px auto;
  padding: 35px 35px 25px 35px;
  background: var(--bg12);
  border-radius: 15px;
  box-sizing: border-box;
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
  }
  .register {
    margin: 0 0 0 68px;
    width: 200px;
    background: var(--bg11);
    color: var(--text-color7);
    border-color: var(--border6);
  }
}
</style>
