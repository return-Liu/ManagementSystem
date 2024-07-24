<template>
  <div class="login">
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="form"
      :rules="rules"
    >
      <i class="el-icon-back" @click="returnClick"></i>
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
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import Mock from "mockjs";
// import cookie from "js-cookie";
import { getMenu } from "../api";
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
      // if (this.form.password !== this.form.passwords) {
      //   this.$message.error("两次密码不一致");
      // }
      // 判断校验
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then((response) => {
            if (response.data.code === 20000) {
              this.$router.push("login");
              // 成功的逻辑
              this.$message.success("注册成功");
            } else {
              // 失败的逻辑
              this.$message.error("注册失败，请检查用户名和密码!");
            }
          });
        }
      });
      // this.$message({
      //   message: "功能占未开放",
      //   type: "warning",
      // });
    },
  },
};
</script>
<style scoped lang="less">
.el-form {
  width: 350px;
  border: 1px solid #ccc;
  margin: 100px auto;
  padding: 35px 35px 25px 35px;
  background-color: #ffff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgb(217, 222, 224);
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 110px;
  }
}
</style>
