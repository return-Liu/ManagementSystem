<template>
  <div class="container">
    <el-card style="background-color: var(--bg1); border: var(--border1)">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="user-info">
        <div class="avatars">头像</div>
        <img :src="avatarUrl" ref="avatarImg" class="avatar" alt="" />
        <div class="avatar-box">
          <label
            class="avatar-title"
            ref="uploadLabel"
            for="uploadInput"
            style="color: var(--text-color2)"
            >更换头像</label
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
    </el-card>
  </div>
</template>
<script>
// 引入头像
export default {
  name: "PersonalCenter",
  data() {
    return {
      avatarUrl: localStorage.getItem("avatarUrl"),
    };
  },
  methods: {
    handleFileChange(e) {
      try {
        // 获取头像文件
        const file = e.target.files[0];
        // console.log(file);
        // 判断文件是否存在 不存在退出
        if (!file) return;
        // 创建文件读取对象
        const reader = new FileReader();
        // 当文件读取成功
        reader.onload = () => {
          // 将头像地址赋值给avatarImg
          this.avatarUrl = reader.result;
          //  通过ref获取头像
          this.$refs.avatarImg.src = this.avatarUrl;
          // 存储新的头像
          localStorage.setItem("avatarUrl", this.avatarUrl);
        };
        // 读取文件
        reader.readAsDataURL(file);
        // 成功信息
        this.$message({
          message: "头像更换成功",
          type: "success",
        });
        // 失败信息
      } catch (error) {
        this.$message({
          message: "头像更换失败",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.el-card {
  width: 500px;
  height: 400px;
  .clearfix {
    // margin-top: 20px;
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
      margin-left: 44px;
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
}
</style>
