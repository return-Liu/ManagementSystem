<template>
  <div class="part">
    <div class="forgetpassowrd-container">
      <el-card
        class="box-card"
        :style="{ backgroundImage: `url(${login_bg})` }"
      >
        <div class="forgetpassword-title">忘记密码</div>
        <el-form
          :model="form"
          status-icon
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item>
            <input type="text" placeholder="密码" v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <input
              type="text"
              placeholder="再次输入密码"
              v-model="form.passwords"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="forgetpassword-btn"
              @click="forgetPassword"
              >可前往登录页面</el-button
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
  // 关闭语法检查
  /* eslint-disable */
  name: "ForgetPassword",
  data() {
    return {
      login_bg: require("@/assets/images/app=49&f=JPEG&fm=173&fmt=auto&u=3666850970,953079923.jpg"),
      form: {
        password: "",
        passwords: "",
      },
      alertVisible: false, // 控制错误提示的显示
    };
  },
  methods: {
    forgetPassword() {
      const validateField = (field, message) => {
        if (!this.form[field]) {
          this.showAlert(message, "error");
          return true;
        }
        return false;
      };
      if (validateField("password", "请输入密码")) return;
      if (validateField("passwords", "请再次输入密码")) return;

      if (this.form.password !== this.form.passwords) {
        this.showAlert("两次密码不一致", "error");
        return;
      }
      this.showAlert("密码修改成功", "success");
      this.$router.push({ name: "login", path: "/login/index" });
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
.forgetpassowrd-container,
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

.forgetpassword-title {
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
.forgetpassword-btn {
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
