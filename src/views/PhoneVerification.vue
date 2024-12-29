<template>
  <div class="part">
    <div class="verification-container">
      <el-card
        class="box-card"
        :style="{ backgroundImage: `url(${login_bg})` }"
      >
        <div class="verification-title">手机号验证</div>
        <el-form
          :model="form"
          status-icon
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="phone">
            <input type="text" placeholder="手机号/邮箱" v-model="form.phone" />
          </el-form-item>
          <el-form-item prop="code" style="position: relative">
            <input type="text" placeholder="验证码" v-model="form.code" />
            <span
              ref="code"
              style="position: absolute; right: 0; bottom: 10px; color: #fff"
              @click="getCode"
              >{{ buttonText }}</span
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="verification-btn"
              @click="verifyCode"
              >下一步</el-button
            >
          </el-form-item>
          <el-form-item class="button-container">
            <el-button type="text" class="login" @click="newUserLogin"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneVerification",
  data() {
    return {
      login_bg: require("@/assets/images/app=49&f=JPEG&fm=173&fmt=auto&u=3666850970,953079923.jpg"),
      form: {
        phone: "",
        code: "",
      },
      isSending: false,
      countdown: 60,
      buttonText: "获取验证码",
    };
  },
  methods: {
    getCode() {
      if (!this.form.phone) {
        this.showAlert("请输入账号/邮箱/手机号", "error");
        return;
      }
      this.$refs.form.validateField("phone", (error) => {
        if (error) {
          return;
        }
        this.showAlert("获取验证码成功", "success");
        setTimeout(() => {
          // 模拟发送验证码
          this.form.code = Math.floor(Math.random() * 100000)
            .toString()
            .padStart(5, "0");
        }, 5000);
        // 发送验证码逻辑
        this.isSending = true;
        const timer = setInterval(() => {
          this.countdown--;
          this.buttonText = `${this.countdown}秒后重新发送`;
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.isSending = false;
            this.buttonText = "获取验证码";
            this.countdown = 60;
          }
        }, 1000);
      });
    },
    verifyCode() {
      if (!this.form.phone) {
        this.showAlert("请输入账号/邮箱/手机号", "error");
        return;
      }
      // 判断手机号是否为空或格式不对  // 判断邮箱是否为空或格式不对
      if (!this.form.code) {
        this.showAlert("请输入验证码", "error");
        return;
      }
      // 这里可以添加验证验证码的逻辑
      this.$router.push({ name: "forgetpassword", path: "/forgetpassword" });
    },
    showAlert(message, type) {
      this.alertVisible = true;
      this.$message({
        message,
        type,
      });
    },
    newUserLogin() {
      this.$router.push({ name: "login", path: "/login/index" });
    },
  },
};
</script>

<style scoped lang="less">
.part {
  height: 100vh;
  background: #fff;
}
.verification-container,
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

.verification-title {
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
.verification-btn {
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
</style>
