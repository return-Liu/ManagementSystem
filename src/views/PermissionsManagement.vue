<template>
  <div class="container" :class="{ 'color-deficiency-mode': value3 }">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :title="modelType ? '新增用户权限' : '编辑用户权限'"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="permission">
          <el-input v-model="form.permission"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <!-- 日期 -->
          <el-date-picker
            v-model="form.createTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: flex-end">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card>
      <div
        slot="header"
        class="Permissions-Management"
        style="color: var(--text-color1)"
      >
        权限管理
      </div>
      <div class="main">
        <el-button
          type="primary"
          class="el-button-primary"
          @click="handlerAdd"
          icon="el-icon-plus"
          >添加权限</el-button
        >
      </div>
      <div class="table">
        <el-table :data="tableData">
          <el-table-column prop="name" label="用户名称">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="permission" label="用户权限">
            <template slot-scope="scope">
              {{ scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
                {{ scope.row.status === "1" ? "启用" : "禁用" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                size="mini"
                type="primary"
                class="edit"
                @click="handlereidt(scope.row)"
                >编辑</span
              >
              <span
                size="mini"
                type="danger"
                class="dangers"
                @click="handlerDelete(scope.row)"
                >删除</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "PermissionsManagement",
  data() {
    return {
      value3: localStorage.getItem("deficiency") === "true",
      dialogVisible: false,
      roles: "",
      form: {
        name: "",
        permission: "",
        createTime: null,
        status: "",
        permissionType: "success", // 新增一个字段来控制标签类型
      },
      modelType: 0, // 0 新增 1 编辑
      tableData: [],
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        permission: [
          { required: true, message: "请输入用户权限", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
      },
    };
  },
  created() {
    this.tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    this.$root.$on("updateSidebarDeficiency", (newDeficiency) => {
      // 控制色弱模式
      this.value3 = newDeficiency;
      if (newDeficiency) {
        document.body.classList.add("color-deficiency-mode");
      } else {
        document.body.classList.remove("color-deficiency-mode");
      }
    });
    this.roles = localStorage.getItem("roles");
  },
  methods: {
    // 封装日期函数
    formatDate(date) {
      if (!date) return "";
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const d = date.getDate().toString().padStart(2, "0");
      return `${y}-${m}-${d}`;
    },
    handlerAdd() {
      if (this.roles !== "超级管理员") {
        this.$message({
          type: "error",
          message: "亲，您的权限不足",
        });
        return;
      }
      this.$confirm("此操作将新增权限, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })

        .then(() => {
          this.modelType = 1; // 设置为新增模式
          this.dialogVisible = true; // 显示对话框
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消新增",
          });
        });
    },
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    resetForm() {
      this.$nextTick(() => {
        try {
          this.$refs.form.resetFields();
          this.form = {
            name: "",
            permission: "",
            createTime: null,
            status: "",
            permissionType: "success",
          };
        } catch (error) {
          console.error("表单数据异常:", error);
        }
      });
    },
    submitForm() {
      if (
        this.form.name === "" ||
        (this.form.permission === "" &&
          this.form.createTime === null &&
          this.form.status === "")
      ) {
        this.$message.error("请输入表单数据");
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.createTime = this.formatDate(this.form.createTime);
          this.dialogVisible = false;
          if (this.modelType === 0) {
            const index = this.tableData.findIndex(
              (item) => item.name === this.form.name
            );
            if (index !== -1) {
              this.tableData.splice(index, 1, { ...this.form });
              this.$message.success("编辑成功");
            } else {
              this.$message.error("未找到要编辑的记录");
            }
          } else {
            this.tableData.push({ ...this.form });
            this.$message.success("新增成功");
          }
          this.resetForm();
          localStorage.setItem("tableData", JSON.stringify(this.tableData));
        }
      });
    },
    handlereidt(row) {
      if (this.roles !== "超级管理员") {
        this.$message({
          type: "error",
          message: "亲，您的权限不足",
        });
        return;
      }
      this.$confirm("此操作将编辑权限, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.modelType = 0; // 设置为编辑模式
          this.dialogVisible = true;
          this.form = JSON.parse(JSON.stringify(row));
          //  处理状态
          this.form.status = this.form.status === "1" ? "启用" : "禁用";
          console.log(this.form); // 调试用，生产环境中可以移除
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消编辑",
          });
        });
    },
    handlerRemove(row) {
      if (this.roles !== "超级管理员") {
        this.$message({
          type: "error",
          message: "亲，您的权限不足",
        });
        return;
      }
      this.$confirm("此操作将删除权限, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(this.tableData.indexOf(row), 1);
          this.$message.success("删除成功");
          localStorage.setItem("tableData", JSON.stringify(this.tableData));
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.color-deficiency-mode {
  --bg10: #f5f5f5; /* 更柔和的背景颜色 */
  --text-color9: #000000; /* 更深的文字颜色 */
  --border1: rgba(0, 0, 0, 0.2); /* 更明显的边框颜色 */
  --border3: rgba(0, 0, 0, 0.2); /* 更明显的边框颜色 */
  --highlight-color: #ffcc00; /* 高亮颜色 */
}
.container {
  width: 100%;
  height: 100%;
}
.el-card {
  width: initial;
  background: var(--bg10);
  border: var(--border1);
}
.el-card__header {
  border: 0;
}
::v-deep .el-table {
  background-color: var(--bg10);
}
::v-deep .el-table__body-wrapper tbody tr {
  background-color: var(--bg10);
}
::v-deep .el-table__header {
  background-color: var(--bg10);
}
::v-deep .el-table__header th {
  background-color: var(--bg10);
}
.el-button-primary {
  background-color: var(--bg4);
  border-color: var(--border4);
  color: var(--text-color1);
}
.edit {
  color: skyblue;
  margin-left: 30px;
}
.dangers {
  color: rgb(196, 67, 67);
  margin-left: 30px;
}
.el-button-danger {
  background-color: var(--bg5);
  border-color: var(--border4);
  color: var(--text-color1);
}
</style>
