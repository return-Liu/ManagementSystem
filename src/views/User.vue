<template>
  <div
    class="manage animate__animated animate__fadeIn"
    :class="{ 'color-deficiency-mode': value3 }"
  >
    <el-dialog
      :title="modelType ? '编辑用户' : '新增用户'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-alert
        title="请输入表单信息"
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
        class="animate__animated animate__backInDown"
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
                <el-select v-model="form.sex" placeholder="请选择性别">
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
                  placeholder="请选择日期"
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
      <el-button type="primary" class="Im_port" @click="handlerImport"
        >导入Excel</el-button
      >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        style="display: none"
        accept=".xlsx, .xls"
      />
      <el-button type="primary" class="Ex_port" @click="handlerExport()"
        >导出Excel</el-button
      >
      <el-form
        :inline="true"
        :model="userForm"
        style="width: 1562px; display: flex; justify-content: flex-end"
      >
        <el-form-item>
          <el-input
            v-model="userForm.name"
            placeholder="请输入关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handlerSearch"
            >搜索</el-button
          >
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
            <span
              size="mini"
              type="primary"
              class="edit"
              @click="handlerEidt(scope.row)"
              >编辑</span
            >
            <span
              size="mini"
              type="danger"
              class="dangers"
              @click="handlerDelete(scope.row)"
              >删除</span
            >
            <span size="mini" @click="handlerView(scope.row)" class="View"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-card
        style="background-color: var(--bg10); border: var(--border1)"
        class="ViewContent"
        v-show="viewList"
      >
        <i
          @click="viewClose"
          style="position: absolute; right: 10px; top: 10px"
          class="el-icon el-icon-close"
        ></i>
        用户信息:{{ vieName }}
      </el-card>
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
import * as XLSX from "xlsx";
// 引入混入
import { pagedataMixin } from "../mixin/pagedataMixin";
export default {
  // 使用混入
  mixins: [pagedataMixin],
  // 关闭语法检查
  /* eslint-disable */
  name: "User",
  data() {
    return {
      value3: localStorage.getItem("deficiency") === "true",
      // 用户状态
      roles: "",
      // 弹窗
      alertVisible: false,
      // 编辑或者新增
      dialogVisible: false,
      // 查看弹窗的数据
      vieName: "",
      viewList: false,
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
    // 查看内容
    handlerView(row) {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
      this.viewList = true;
      this.vieName = ` 用户姓名: ${row.name} 用户性别: ${
        row.sex == 1 ? "男" : "女"
      } 用户年龄: ${row.age} 用户出生日期: ${row.birth} 用户地址: ${row.addr}`;
    },
    // 导入文件
    handleFileChange(e) {
      // 获取文件
      const file = e.target.files[0];
      // 如果文件不存在退出
      if (!file) return;
      // 创建文件读取对象
      const reader = new FileReader();
      // 当文件读取成功
      reader.onload = (e) => {
        // 读取文件
        const data = e.target.result;
        // 读取二进制文件
        const workbook = XLSX.read(data, { type: "binary" });
        // 获取第一个sheet
        const sheetName = workbook.SheetNames[0];
        // 获取第一个sheet数据
        const worksheet = workbook.Sheets[sheetName];
        // 转为json格式
        const json = XLSX.utils.sheet_to_json(worksheet);
        // 输出数据
        console.log(json);
        // 验证数据
        if (
          json.every((item) => item.name && item.age && item.sex && item.addr)
        ) {
          // 发送到后端
          this.importData(json);
        } else {
          this.$message.error("数据格式不正确");
        }
      };
      // 读取文件
      reader.readAsBinaryString(file);
    },
    // 异步导入数据
    async importData(data) {
      try {
        // 发送请求
        await addUser(data);
        // 如果导入成功
        this.$message.success("导入成功");
        console.log("表格数据", this.tableData);
        // 将导入的数据追加到表格中
        this.tableData.push(...data);
        // 重新获取列表数据
        this.getList();
      } catch (error) {
        // 导入失败则显示错误信息
        this.$message.error("导入失败: " + error.message);
      }
    },
    // 导出excel
    handlerExport() {
      // 调用导出方法
      this.exportExcel();
    },
    async exportExcel() {
      // 判断导出Eecel是否被勾选中
      if (this.seles.length <= 0) {
        this.$message({
          type: "warning",
          message: "请选择要导出的数据",
        });
        return;
      }
      try {
        // 1.检查 XLSX 是否定义：
        if (!XLSX) {
          // 2.如果 XLSX 没有定义，抛出一个错误。
          throw new Error("XLSX is not defined");
        }
        // 3.发送请求获取数据
        const response = await getUser({
          params: { ...this.userForm, ...this.pageData },
        });
        // 4.获取数据
        const data = response.data.list;
        // 拿到性别
        const sex = data.map((item) => {
          return item.sex == 1 ? "男" : "女";
        });
        // 5.将性别通过遍历添加到数据中
        data.forEach((element, index) => {
          element.sex = sex[index];
        });
        // 6.只导出选中的数据
        const filterData = data.filter((item) => this.seles.includes(item.id));
        console.log("选中导出的数据", filterData);
        // 7.创建工作表
        const worksheet = XLSX.utils.json_to_sheet(filterData);
        // 8.创建工作簿
        const workbook = XLSX.utils.book_new();
        // 9.将工作表添加到工作簿中，并指定工作表的名称为 "Users"
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        // 10.使用 XLSX.writeFile 浏览器原生API
        XLSX.writeFile(workbook, "Users.xlsx");
      } catch (error) {
        // 11.捕获错误，并显示错误消息
        this.$message.error("导出失败: " + error.message);
      }
    },
    // 提交用户表单
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.modelType === 1) {
            try {
              await editUser(this.form);
              this.getList();
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
              // 清空表单数据 以便下次不会影响其他弹窗
              this.resetForm();
              this.dialogVisible = false;
              this.alertVisible = false;
            } catch (error) {
              this.$message({
                type: "error",
                message: "编辑失败: " + error.message,
              });
            }
          } else {
            try {
              await addUser(this.form);
              this.getList();
              this.$message({
                type: "success",
                message: "新增成功!",
              });
              // 清空表单数据 以便下次不会影响其他弹窗
              this.resetForm();
              this.dialogVisible = false;
              this.alertVisible = false;
            } catch (error) {
              this.$message({
                type: "error",
                message: "新增失败: " + error.message,
              });
            }
          }
        } else {
          // 表单验证未通过，显示提示框
          this.alertVisible = true;
        }
      });
    },
    async handlerEidt(row) {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
      try {
        await this.$confirm("此操作将编辑该文件, 是否继续?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        // 赋值
        this.form = JSON.parse(JSON.stringify(row));
        // 编辑
        this.modelType = 1;
        // 显示弹窗
        this.dialogVisible = true;
      } catch {
        this.$message({
          type: "error",
          message: "已取消编辑",
        });
      }
    },
    // 删除功能
    async handlerDelete(row) {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          await delUser({ id: row.id });
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } catch {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        }
      } catch {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    // 复选框的选中状态
    async handleSelect(seles) {
      this.seles = seles.map((item) => item.id);
      // console.log(this.seles);
    },
    // 批量删除
    async hanlderReomve() {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
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
          const batchSize = 10; // 每批处理的数量
          // 成功的总数
          let successCount = 0;
          // 失败的总数
          let failedCount = 0;
          // 使用循环方式 遍历每一条复选框 i累加每次批量处理的数量
          for (let i = 0; i < this.seles.length; i += batchSize) {
            // 获取当前批次的数据 i是当前批次的开始索引，i+batchSize是当前批次的结束索引
            const batch = this.seles.slice(i, i + batchSize);
            // 等待所有请求 将新数组中的每个id转换为一个删除请求
            const results = await Promise.all(
              batch.map((id) => delUser({ id }))
            );
            // 统计成功和失败的数量
            successCount += results.filter((result) => result).length;
            failedCount += results.filter((result) => !result).length;
          }
          // 刷新列表
          this.getList();
          if (failedCount > 0) {
            this.$message({
              type: "warning",
              message: `批量删除完成，成功 ${successCount} 项，失败 ${failedCount} 项`,
            });
          } else {
            this.$message({
              type: "success",
              message: "批量删除成功",
            });
          }
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
    async handleAdd() {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
      try {
        await this.$confirm("此操作将新增文件, 是否继续?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.modelType = 0;
        this.dialogVisible = true;
      } catch {
        this.$message({
          type: "error",
          message: "已取消新增",
        });
      }
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
    /*
     * 搜索
     * @param {FUNCTION}
     * @returns
     */
    async handlerSearch() {
      if (!this.userForm.name) {
        this.$message.warning("请输入关键字");
        return;
      }
      // 判断是否输入非法字符
      const illegalCharacters = /[^\w\s\u4e00-\u9fa5]/;
      if (illegalCharacters.test(this.userForm.name)) {
        this.$message.error("请输入合法字符");
        return;
      }
      // 重置之前的错误提示标志（如果有的话）
      this.searchError = false;
      // 设置加载状态，准备进行搜索
      this.loading = true;
      try {
        await new Promise((reslove) => setTimeout(reslove, 2000));
        const response = await getUser({
          params: { ...this.userForm, ...this.pageData },
        });
        // 判断响应中data里的列表或大于0
        if (response.data.list && response.data.list.length > 0) {
          this.tableData = response.data.list;
          this.total = response.data.count || 0;
          this.$message.success("搜索成功！");
        } else {
          // 没有数据匹配搜索条件，非错误情况，给予用户无结果提示
          this.$message.info("没有找到匹配的记录。");
        }
      } catch (error) {
        // 真正的请求失败处理
        this.loading = false;
        this.$message.error("搜索失败，请稍后重试。");
        console.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getList();
    this.roles = localStorage.getItem("roles");
    console.log(this.roles);
    this.$root.$on("updateSidebarDeficiency", (newDeficiency) => {
      // 控制色弱模式
      this.value3 = newDeficiency;
      if (newDeficiency) {
        document.body.classList.add("color-deficiency-mode");
      } else {
        document.body.classList.remove("color-deficiency-mode");
      }
    });
  },
};
</script>
<style lang="less" scoped>
.color-deficiency-mode {
  --bg10: #f9f9f9; /* 更柔和的背景颜色 */
  --text-color9: #333333; /* 更深的文字颜色 */
  filter: brightness(90%) contrast(110%) sepia(10%) hue-rotate(20deg);
}
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
      color: var(--text-color1);
    }
    .danger {
      position: absolute;
      left: 90px;
      background-color: var(--bg5);
      border-color: var(--border4);
      color: var(--text-color1);
    }
    .Im_port {
      position: absolute;
      left: 220px;
      background-color: var(--bg4);
      border-color: var(--border4);
      color: var(--text-color1);
    }
    .Ex_port {
      position: absolute;
      left: 350px;
      background-color: var(--bg4);
      border-color: var(--border4);
      color: var(--text-color1);
    }
  }
  ::v-deep .el-table td.el-table__cell div {
    width: 260px;
  }
  ::v-deep .el-button + .el-button {
    margin-left: 5px;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .edit,
    .View {
      color: skyblue;
      margin-left: 30px;
    }
    .dangers {
      color: rgb(196, 67, 67);
      margin-left: 30px;
    }
    .ViewContent {
      background-color: rgba(0, 0, 0, 0.8);
      width: 800px;
      height: 100px;
      color: var(--text-color1);
      padding: 10px;
      opacity: 0.8;
      position: relative;
      top: 10px;
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
