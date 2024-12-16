<template>
  <div class="login-container">
    <div class="part part-01">
      <div class="bannervideo" v-show="isVideo">
        <div class="video-bg-title">
          <ul>
            <li>
              <a href="javascript:;" @click="handlerLogin">登录</a>
            </li>
          </ul>
        </div>
        <video
          autoplay
          muted
          id="video1"
          poster="https://mumu.163.com/homepage_2023/animation_01.jpg"
          src="https://mumu-fe.fp.ps.netease.com/file/66ebea2b818b7af1bea07601HVJLgDNt05"
        ></video>
      </div>
      <el-form label-width="70px" :model="form" class="login-form">
        <h3 class="login-title">快捷登录</h3>
        <i class="el-icon el-icon-close" @click="loginClose"></i>
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
          <span class="register" @click="register">还没有此账号? 立即注册</span>
        </div>
        <el-form-item>
          <el-button type="primary" class="login" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  // 关闭语法检查
  /* eslint-disable */
  name: "Login",
  data() {
    return {
      isVideo: true,
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
    // 七天免登录
    handlerLogin() {
      const ElLogin = document.querySelector(".login-form");
      ElLogin.style.display = "block";
      this.isVideo = false;
      // 设置七天免登录
      // 跳转首页
    },
    loginClose() {
      const ElLogin = document.querySelector(".login-form");
      ElLogin.style.display = "none";
      this.isVideo = true;
    },
    // 登录
    login() {
      if (!this.form.username) {
        this.$message({
          message: "请输入账号",
          type: "error",
        });
        return;
      }
      if (!this.form.password) {
        this.$message({
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
            this.$message({
              message: `登录成功 欢迎回来 ${data.data.roles}`,
              type: "success",
            });
          } else {
            this.$message({
              message: "用户名或密码错误",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("登录失败:", error.message);
          this.$message({
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
.login-container {
  height: 100vh;
}
.part-01 {
  height: 100vh;
  justify-content: flex-end;
  background: radial-gradient(ellipse at bottom, #1b2753 0%, #090a0f 100%);
  position: relative;
  .bannervideo {
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    background: url(https://mumu.res.netease.com/pc/gw/20230510161641/img/kv_bg_9466e7b0.jpg)
      no-repeat 60% bottom #000;
    background-size: auto 100%;
    .video-bg-title {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
      position: fixed;
      pointer-events: auto; /* 确保可以接收点击事件 */
      z-index: 2;
      width: 100%;
      ul {
        list-style-type: none;
      }
      ul li a {
        text-decoration: none;
        color: #fff;
        padding: 20px;
      }
      ul li a:hover {
        color: skyblue;
      }
    }
    .part-01 .banenrVideo video {
      z-index: 2;
    }
    video {
      position: absolute;
      width: 100%;
      min-width: 100%;
      min-height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
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
  display: none;
  z-index: 1000;
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
  .el-icon-close {
    height: 275px;
    position: absolute;
    top: 0;
    right: 0;
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
