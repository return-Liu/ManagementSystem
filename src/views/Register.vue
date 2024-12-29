<template>
  <div class="part">
    <div class="register-container">
      <el-card
        class="box-card"
        :style="{ backgroundImage: `url(${login_bg})` }"
      >
        <div class="register-title">快捷注册</div>
        <el-form
          :model="form"
          status-icon
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <input
              type="text"
              v-model="form.account"
              placeholder="账号/手机号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <input type="text" placeholder="密码" v-model="form.password" />
          </el-form-item>
          <el-form-item prop="code" style="position: relative">
            <input type="text" v-model="form.code" placeholder="验证码" />
            <span
              style="position: absolute; right: 0; bottom: 10px; color: orange"
              @click="getCode"
              >获取验证码</span
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="resister-btn" @click="resister"
              >注册</el-button
            >
          </el-form-item>
          <el-form-item class="button-container">
            <el-button type="text" class="login" @click="newUserLogin"
              >已有账号 立即登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRegister } from "../api";
export default {
  // 关闭语法检查
  /* eslint-disable */
  name: "Register",
  data() {
    return {
      login_bg: require("@/assets/images/app=49&f=JPEG&fm=173&fmt=auto&u=3666850970,953079923.jpg"),
      form: {
        account: "",
        password: "",
        code: "",
      },
    };
  },
  computed: {
    validAccount() {
      return this.form.account.length >= 3; // 根据实际需求调整验证规则
    },
    validPassword() {
      return this.form.password.length >= 6; // 根据实际需求调整验证规则
    },
    validCode() {
      return this.form.code.length >= 5; // 根据实际需求调整验证规则
    },
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
        this.resister();
      }
    },
    // 注册
    resister() {
      if (!this.form.account) {
        this.showAlert("请输入账号", "error");
        return;
      }
      if (!this.form.password) {
        this.showAlert("请输入密码", "error");
        return;
      }
      // 验证码
      if (!this.form.code) {
        this.showAlert("请输入验证码", "error");
        return;
      }
      getRegister(this.form)
        .then(({ data }) => {
          console.log("返回返回数据:", data, "账号密码", this.form);
          // 跳转至登录
          if (data.code === 200) {
            this.showAlert("注册成功", "success");
            this.$router.push("/login/index");
          } else {
            this.showAlert("注册失败", "error");
          }
        })
        .catch((error) => {
          console.log("错误信息:", error);
        });
    },
    getCode() {
      console.log("获取验证码");
      // 随机数
      this.form.code = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");
      console.log(this.form.code);
    },
    newUserLogin() {
      this.$router.push({ name: "login", path: "/login/index" });
    },
    // 显示提示框
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
.register-container,
.box-card {
  width: 480px;
  height: 620px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  border-radius: 10px;
}
.register-title {
  text-align: center;
  margin-top: 120px;
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
}
.el-form {
  margin-right: 70px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
}
.resister-btn {
  width: 100%;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  height: 40px;
}
.el-input__icon {
  color: #606266; /* 设置图标的默认颜色 */
}
.el-icon-check {
  color: #67c23a; /* 设置勾号的颜色 */
}
.el-icon-close {
  color: #f56c6c; /* 设置叉号的颜色 */
}
</style>
