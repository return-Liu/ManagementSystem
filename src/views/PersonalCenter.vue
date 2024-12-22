<template>
  <div class="container">
    <el-card
      style="
        background-color: var(--bg10);
        border: var(--border1);
        border-radius: 10px;
      "
    >
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="user-info">
        <div class="avatars">头像</div>
        <img :src="avatar" ref="avatarImg" class="avatar" alt="" />
        <div class="avatar-box">
          <label
            class="avatar-title"
            for="uploadInput"
            style="color: var(--text-color2)"
            >更换头像</label
          >
          <label
            class="View-avatar"
            style="color: var(--text-color2)"
            @click="handleChange"
            >查看头像</label
          >
          <input
            ref="uploadInput"
            id="uploadInput"
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="upload"
          />
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info-box">
        <div class="user-info">
          <div class="user-info-id">Uid:{{ uid }}</div>
          <div class="user-info-title">用户名:{{ roles }}</div>
        </div>
        <div class="user-info-content"></div>
      </div>
    </el-card>
    <!-- 全屏蒙层 -->
    <div v-if="isFullScreen" class="fullscreen-overlay">
      <div class="avatar-name">我的头像</div>
      <div class="close-name" @click="closeFullScreen">关闭头像</div>
      <div class="fullscreen-content">
        <img :src="avatar" class="fullscreen-avatar" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
// 引入混入
import { avatarMixin } from "../mixin/avatarMixin";
export default {
  // 使用混入
  mixins: [avatarMixin],
  name: "PersonalCenter",
  data() {
    return {
      avatar: "",
      isFullScreen: false,
      roles: localStorage.getItem("roles"),
      uid: localStorage.getItem("uid"),
    };
  },
  created() {
    this.loadAvatar();
  },
  methods: {
    handleChange() {
      this.isFullScreen = true;
    },

    closeFullScreen() {
      this.isFullScreen = false;
    },
  },
};
</script>
<style scoped lang="less">
.el-card {
  width: 500px;
  height: 400px;
  position: relative;
  .clearfix {
    color: var(--text-color2);
  }
  .user-info {
    width: 210px;
    height: 30px;
    color: var(--text-color2);
    .user-info-id,
    .user-info-title {
      width: 240px;
    }
    .user-info-title {
      margin-top: 10px;
    }
    .avatars {
      color: var(--text-color2);
    }
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .avatar-box {
    margin-bottom: 20px;
    .avatar-title {
      cursor: pointer;
      margin-left: 5px;
      margin-top: 20px;
      display: flex;
    }
    .View-avatar {
      margin-top: -20px;
      display: flex;
      cursor: pointer;
      margin-left: 90px;
    }
  }
  .prew {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .upload {
    display: none;
  }
  .user-info-box {
    position: absolute;
    top: 130px;
    right: 110px;
  }
}

/* 全屏蒙层样式 */
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.avatar-name {
  position: fixed;
  color: #fff;
  top: 10%;
}
.avatar-name::after {
  position: absolute;
  content: " ";
  width: 0px;
  height: 2px;
  left: 1%;
  bottom: 0;
  background-color: orange;
  transition: all;
}
.close-name {
  position: fixed;
  top: 10%;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.fullscreen-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  max-height: 500px;
}
.fullscreen-avatar {
  max-width: 100%;
  max-height: 100%;
}
</style>
