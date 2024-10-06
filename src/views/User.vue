<template>
  <div class="manage">
    <el-dialog
      :title="modelType ? '编辑用户' : '新增用户'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-alert
        title="请填写信息再进行确定"
        type="error"
        v-show="alertVisible"
      ></el-alert>
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card style="height: 80%">
              <el-form-item label="姓名" prop="name">
                <el-input
                  placeholder="请输入姓名"
                  v-model="form.name"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 80%">
              <el-form-item label="年龄" prop="age">
                <el-input
                  placeholder="请输入年龄"
                  v-model="form.age"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 80%; margin-top: 10px">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 80%; margin-top: 10px">
              <el-form-item label="出生日期" prop="birth">
                <el-date-picker
                  v-model="form.birth"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 80%; margin-top: 10px">
              <el-form-item label="地址" prop="addr">
                <el-input
                  placeholder="请输入地址"
                  v-model="form.addr"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button
        @click="handleAdd"
        class="el-button el-button--primary"
        type="primary"
      >
        + 新增
      </el-button>
      <el-button
        type="danger"
        class="danger"
        @click="hanlderReomve"
        :disabled="this.seles.length === 0"
      >
        - 批量删除</el-button
      >
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入搜索内容"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlerSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table
        height="77%"
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
        @selection-change="handleSelect"
        @select="handleSelect"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              class="emit"
              @click="handlerEidt(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              class="dangers"
              @click="handlerDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "UserManage",
  data() {
    return {
      // 弹窗
      alertVisible: false,
      // 编辑或者新增
      dialogVisible: false,
      // 跟踪搜索错误信息
      searchError: false,
      // 加载状态
      loading: false,
      input: "",
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      // 存放id
      seles: [],
      modelType: 0, //表示新增的弹窗 1编辑 0新增
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 1) {
            // 编辑
            editUser(this.form).then(() => {
              this.getList();
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
            });
          } else {
            // 新增
            addUser(this.form).then(() => {
              this.getList();
              this.$message({
                type: "success",
                message: "新增成功!",
              });
            });
          }
          // 清空表单数据 以便下次不会影响其他弹窗
          this.resetForm();
          this.dialogVisible = false;
          this.alertVisible = false;
        } else {
          this.alertVisible = true;
        }
      });
    },
    // 弹窗关闭的时候
    handleClose() {
      // 清空表单
      this.resetForm();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
      //  调用resetForm方法 用于统一重置表单
      this.resetForm();
    },
    handlerEidt(row) {
      this.$confirm("此操作将编辑该文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 赋值
          this.form = JSON.parse(JSON.stringify(row));
          // 编辑
          this.modelType = 1;
          // 显示弹窗
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消编辑",
          });
        });
    },
    // 删除功能
    handlerDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            // 重新获取商品列表的接口
            this.getList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除",
          });
        });
    },
    // 复选框的选中状态
    async handleSelect(seles) {
      this.seles = seles.map((item) => item.id);
      // console.log(this.seles);
    },
    // 批量删除
    async hanlderReomve() {
      try {
        const confirmResult = await this.$confirm(
          "此操作将永久删除该文件, 是否继续?",
          "温馨提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        if (confirmResult === "confirm") {
          // 使用Promise.all来等待所有请求完成
          const promises = this.seles.map((id) => delUser({ id }));
          await Promise.all(promises);
          // 在所有请求成功后刷新列表
          this.getList();
          // 成功信息
          this.$message({
            type: "success",
            message: "批量删除成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "已取消批量删除",
          });
        }
      } catch (error) {
        // 处理请求失败的情况
        this.$message({
          type: "error",
          message: `批量删除失败: ${error.message}`,
        });
      }
    },
    handleAdd() {
      this.$confirm("此操作将新增文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.modelType = 0; // 设置为新增模式
          this.dialogVisible = true; // 显示对话框
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消新增",
          });
        });
    },
    // 添加一个resetForm方法，用于统一重置表单
    resetForm() {
      this.$nextTick(() => {
        try {
          this.$refs.form.resetFields(); // 重置表单字段
          this.form = {
            // 重置表单数据模型
            name: "",
            age: "",
            sex: "", // 确保与初始值一致
            birth: "",
            address: "",
          };
        } catch (error) {
          console.error("resetForm方法执行时遇到错误:", error);
        }
      });
    },
    // 获取列表的数据
    getList() {
      // 获取的列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          // console.log(data);
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    // 修正分页处理逻辑
    handleSizeChange(val) {
      this.pageData.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getList();
    },

    /*
     * 搜索
     * @param {FUNCTION}
     * @returns
     */
    // 使用防抖函数处理搜索
    handlerSearch() {
      if (!this.userForm.name) {
        this.$message.warning("请输入关键字");
        return;
      }
      // 重置之前的错误提示标志（如果有的话）
      this.searchError = false;
      // 设置加载状态，准备进行搜索
      this.loading = true;
      // 1.通过 setTimeout 模拟延迟，以模拟搜索请求
      // 2.调用获取列表的方法，并传递搜索参数
      setTimeout(() => {
        getUser({ params: { ...this.userForm, ...this.pageData } })
          .then(({ data }) => {
            if (data.list && data.list.length > 0) {
              // 有数据返回，更新表格数据
              this.tableData = data.list;
              this.total = data.count || 0;
              this.$message.success("搜索成功！");
            } else {
              // 没有数据匹配搜索条件，非错误情况，给予用户无结果提示
              this.$message.info("没有找到匹配的记录。");
            }
            // 清除加载状态
            this.loading = false;
          })
          .catch((error) => {
            // 真正的请求失败处理
            this.loading = false;
            this.$message.error("搜索失败，请稍后重试。");
            console.error(error.message);
          });
      }, 2000);
    },
  },

  // 当组件创建完成后调用getList方法
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .el-button--primary {
      background-color: var(--bg4);
      border-color: var(--border4);
      color: var(--text-color);
    }
    .danger {
      position: absolute;
      left: 90px;
      background-color: var(--bg5);
      border-color: var(--border4);
      color: var(--text-color);
    }
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .emit {
      background-color: var(--bg4);
      border-color: var(--border4);
      color: var(--text-color);
    }
    .dangers {
      background-color: var(--bg5);
      border-color: var(--border4);
    }
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
.el-card {
  cursor: pointer;
}
// 鼠标经过卡片 显示高亮效果
.el-card:hover {
  box-shadow: 0 0 10px #ccc;
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
/* 使用 ::v-deep 或 /deep/ 根据你的 Vue 版本 */
::v-deep .el-pagination {
  background-color: var(--bg6); /* 设置背景色为黑色 */
  color: var(--text-color9); /* 设置主要的文字颜色为白色 */

  /* 调整分页按钮和链接的样式 */
  .el-pager li {
    background-color: var(--bg6) !important;
    color: var(--text-color9);
    border-color: transparent;
  }
  .el-pager li:hover,
  .el-pager li.active {
    background-color: var(--bg6) !important; /* 鼠标悬停或激活状态下的背景色 */
  }

  /* 调整输入框的样式 */
  .el-input__inner {
    background-color: var(--bg6);
    color: var(--text-colo9);
    border-color: transparent;
  }

  /* 调整按钮的样式 */
  button {
    background-color: var(--bg6);
    color: var(--text-color9);
    border-color: transparent;
  }
}
</style>
