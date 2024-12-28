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
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="form.code">
              <template #append>
                <el-button @click="getCode">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="resister-btn" @click="resister"
              >注册</el-button
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
      this.form.code = Math.floor(Math.random() * 1000000);
      console.log(this.form.code);
    },
    // 显示提示框
    showAlert(message) {
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
  transform: translateX(70%) translateY(10%);
  height: 620px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  border-radius: 10px;
}
.register-title {
  text-align: center;
  margin-top: 100px;
  padding: 20px;
  font-size: 30px;
  background: var(--bg12);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.el-form {
  margin-right: 70px;
}
.resister-btn {
  width: 100%;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  height: 40px;
}
</style>
