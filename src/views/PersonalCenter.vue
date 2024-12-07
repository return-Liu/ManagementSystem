<template>
  <div class="container">
    <el-card style="background-color: var(--bg10); border: var(--border1)">
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
          <span class="user-info-title" style="color: var(--text-color2)"
            >用户名: {{ roles }}
          </span>
        </div>
        <div class="user-info-content"></div>
      </div>
    </el-card>
    <!-- 全屏蒙层 -->
    <div v-if="isFullScreen" class="fullscreen-overlay">
      <span class="avatar-name">我的头像</span>
      <span class="close-name" @click="closeFullScreen">关闭头像</span>
      <div class="fullscreen-content">
        <img :src="avatar" class="fullscreen-avatar" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      avatar: localStorage.getItem("avatar"),
      isFullScreen: false,
      roles: localStorage.getItem("roles"),
    };
  },

  methods: {
    handleChange() {
      this.isFullScreen = true;
    },
    handleFileChange(e) {
      try {
        // 获取头像文件
        const file = e.target.files[0];
        // 判断文件是否存在 不存在退出
        if (!file) return;
        // 创建文件读取对象
        const reader = new FileReader();
        // 当文件读取成功
        reader.onload = () => {
          // 将头像地址赋值给avatarImg
          this.avatar = reader.result;
          // 通过ref获取头像
          this.$refs.avatarImg.src = this.avatar;
          // 存储新的头像
          localStorage.setItem("avatar", this.avatar);
        };
        // 读取文件
        reader.readAsDataURL(file);
        // 成功信息
        this.$message({
          message: "头像更换成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
      }
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
    right: 180px;
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
