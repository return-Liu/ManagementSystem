<template>
  <div
    class="mallMeggage animate__animated animate__fadeIn"
    :class="{ 'color-deficiency-mode': value3 }"
  >
    <el-dialog
      :title="modelType ? '编辑产品' : '新增产品'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-alert
        title="请输入表单信息"
        type="error"
        v-show="alertVisible"
      ></el-alert>
      <!-- 商品的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        class="animate__animated animate__backInDown"
        :model="form"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="名称" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入产品名称"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择产品类型">
                  <el-option
                    v-for="item in productTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="数量" prop="number">
                <el-input
                  v-model="form.number"
                  placeholder="请输入产品数量"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="价格" prop="price">
                <el-input
                  v-model="form.price"
                  placeholder="请输入产品价格"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="24">
            <el-card style="height: 100%">
              <el-form-item label="介绍" prop="description">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入产品内容"
                  v-model="form.description"
                  max="30"
                  min="0"
                >
                </el-input>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          style="color: #fff; background-color: #409eff; border-color: #409eff"
          @click="handleSubmit"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button
        type="primary"
        class="el-button el-button--primary"
        @click="hanlderAdd"
      >
        <i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button
        type="danger"
        class="danger"
        @click="hanlderReomve"
        :disabled="this.seles.length === 0"
      >
        <i class="el-icon-delete"></i> 批量删除</el-button
      >
      <el-button type="primary" class="Im_port" @click="handlerImport"
        ><i class="el-icon-download"></i> 导出Excel</el-button
      >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        style="display: none"
        accept=".xlsx, .xls"
      />
      <el-button type="primary" class="Ex_port" @click="handlerExport()"
        ><i class="el-icon-download"></i> 导出Excel</el-button
      >
      <el-form
        style="width: 1562px; display: flex; justify-content: flex-end"
        :inline="true"
        :model="mallForm"
      >
        <el-form-item>
          <el-input
            v-model="mallForm.name"
            placeholder="请输入关键字"
            ref="search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handlerSearch"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table
        height="78%"
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0,0.3)"
        @selection-change="handleSelect"
        @select="handleSelect"
        style="width: 100%"
      >
        <!-- 添加一列用于复选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="description" label="介绍"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              size="mini"
              type="primary"
              class="edit"
              @click="handlerEdit(scope.row)"
            >
              <i class="el-icon-edit"></i> 编辑
            </span>
            <span
              size="mini"
              type="danger"
              class="dangers"
              @click="handlerDelete(scope.row)"
            >
              <i class="el-icon-delete"></i> 删除
            </span>
            <span size="mini" @click="handlerView(scope.row)" class="View">
              <i class="el-icon-view"></i> 查看
            </span></template
          >
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
        产品信息:{{ vieName }}
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
import { getMall, addMall, editMall, delMall } from "../api";
import * as XLSX from "xlsx";
// 引入混入
import { pagedataMixin } from "../mixin/pagedataMixin";
export default {
  // 使用混入
  mixins: [pagedataMixin],
  // 关闭语法检查
  /* eslint-disable */
  name: "Products",
  data() {
    return {
      value3: localStorage.getItem("deficiency") === "true",
      roles: "", // 角色
      searchError: false,
      dialogVisible: false,
      alertVisible: false,
      // 查看弹窗的数据
      vieName: "",
      viewList: false,
      // 加载搜索的状态
      loading: false,
      // 表格数据
      tableData: [],
      // 存放id
      seles: [],
      modelType: 0, //表示新增的弹窗 1编辑 0新增
      total: 0, //当前的总条数默认为0
      pageData: {
        // 单页
        page: 1,
        // 每页10条
        limit: 10,
      },
      mallForm: {
        // 搜索时的表单数据
        name: "",
      },
      form: {
        description: "",
        name: "",
        type: "",
        number: "",
        price: "",
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称" }],
        type: [{ required: true, message: "请选择商品类型" }],
        number: [{ required: true, message: "请输入商品数量" }],
        price: [{ required: true, message: "请输入商品价格" }],
        description: [{ required: true, message: "请输入商品介绍" }],
      },
      productTypes: [
        { value: "新款电脑", label: "新款电脑" },
        { value: "保湿面霜", label: "保湿面霜" },
        { value: "智能手机", label: "智能手机" },
        { value: "时尚衬衫", label: "时尚衬衫" },
        { value: "经典小说", label: "经典小说" },
        { value: "智能化", label: "智能化" },
      ],
    };
  },
  mounted() {
    console.log(XLSX);
  },
  methods: {
    // 查看内容
    handlerView(row) {
      if (this.roles !== "超级管理员") {
        this.handlerDialog();
        return;
      }
      this.viewList = true;
      this.vieName = `
  产品名称: ${row.name}
  产品类型: ${row.type}
  产品数量: ${row.number}
  产品价格: ${row.price}
  产品介绍:${row.description}
`;
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
          json.every(
            (item) =>
              item.name &&
              item.type &&
              item.number &&
              item.price &&
              item.description
          )
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
        await addMall(data);
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
        const response = await getMall({
          params: { ...this.mallForm, ...this.pageData },
        });
        // 4.获取数据
        const data = response.data.list;
        // 5.只导出选中的数据
        const filterData = data.filter((item) => this.seles.includes(item.id));
        console.log("选中导出的数据", filterData);
        // 6.创建工作表
        const worksheet = XLSX.utils.json_to_sheet(filterData);
        // 7.创建工作簿
        const workbook = XLSX.utils.book_new();
        // 8.将工作表添加到工作簿中，并指定工作表的名称为 "Products"
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        // 9.使用 XLSX.writeFile 浏览器原生API
        XLSX.writeFile(workbook, "products.xlsx");
      } catch (error) {
        // 10.捕获错误，并显示错误消息
        this.$message.error("导出失败: " + error.message);
      }
    },
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.modelType === 1) {
            try {
              await editMall(this.form);
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
              await addMall(this.form);
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
    async handlerEdit(row) {
      if (this.roles !== "前端开发管理组") {
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
      } catch (error) {
        this.$message({
          type: "error",
          message: "已取消编辑",
        });
      }
    },
    // 删除
    async handlerDelete(row) {
      if (this.roles !== "前端开发管理组") {
        this.handlerDialog();
        return;
      }
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          await delMall({ id: row.id });
          // 重新获取商品列表的接口
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } catch (error) {
          this.$message({
            type: "error",
            message: "删除失败: " + error.message,
          });
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "已取消删除",
        });
      }
    },
    // 复选框的选中状态
    async handleSelect(seles) {
      this.seles = seles.map((item) => item.id);
      console.log(this.seles);
    },
    // 批量删除 分批处理
    async hanlderReomve() {
      if (this.roles !== "前端开发管理组") {
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
              batch.map((id) => delMall({ id }))
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
    async hanlderAdd() {
      if (this.roles !== "前端开发管理组") {
        this.handlerDialog();
        return;
      }

      try {
        await this.$confirm("此操作将新增文件, 是否继续?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        // 显示新增
        this.modelType = 0;
        // 显示弹窗
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
      // 使用$nextTick确保DOM更新后再执行重置操作
      this.$nextTick(() => {
        try {
          this.$refs.form.resetFields(); // 重置表单字段
          this.form = {
            // 重置表单数据模型
            name: "",
            type: "",
            number: "",
            price: "",
            description: "",
          };
        } catch (error) {
          console.error("resetForm方法执行时遇到错误:", error);
        }
      });
    },
    // 调用
    getList() {
      // 获取商品列表
      getMall({ params: { ...this.mallForm, ...this.pageData } }).then(
        (data) => {
          this.tableData = data.data.list;
          this.total = data.data.count || 0;
        }
      );
    },
    /*
     * 搜索
     * @param {FUNCTION}
     * @returns
     */
    // 列表搜索
    async handlerSearch() {
      if (!this.mallForm.name) {
        this.$message.warning("请输入关键字");
        return;
      }
      // 判断是否输入非法字符
      const illegalCharacters = /[^\w\s\u4e00-\u9fa5]/;
      if (illegalCharacters.test(this.mallForm.name)) {
        this.$message.error("请输入合法字符");
        // 将表格清空
        this.tableData = [];
        return;
      }
      // 重置之前的错误提示标志（如果有的话）
      this.searchError = false;
      // 设置加载状态，准备进行搜索
      this.loading = true;
      try {
        // 模拟延迟，以模拟搜索请求
        await new Promise((reslove) => setTimeout(reslove, 2000));
        // 调用获取列表的方法，并传递搜索参数 （包括表单参数, 分页参数）
        const response = await getMall({
          params: { ...this.mallForm, ...this.pageData },
        });
        // 判断响应中data里的列表或大于0
        if (response.data.list && response.data.list.length > 0) {
          // 有数据就返回数据 更新表格数据
          this.tableData = response.data.list;
          this.total = response.data.count || 0;
          this.$message.success("搜索成功！");
          // 清空输入框
          this.mallForm.name = "";
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
        // 清除加载状态
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
.el-alert {
  margin-bottom: 10px;
}
.mallMeggage {
  display: flex;
  flex-direction: column;
  height: 89%; /* 确保这个容器占据全部可用高度 */
  .el-button--primary {
    background-color: var(--bg4);
    border-color: var(--border4);
    color: var(--text-color1);
  }
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
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
      left: 365px;
      background-color: var(--bg4);
      border-color: var(--border4);
      color: var(--text-color1);
    }
  }
  ::v-deep .el-table td.el-table__cell div {
    width: 270px;
  }

  ::v-deep .el-button + .el-button {
    margin-left: 10px;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .edit,
    .View {
      color: skyblue;
      margin-left: 20px;
    }
    .dangers {
      color: rgb(196, 67, 67);
      margin-left: 20px;
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
/* // 鼠标经过卡片 显示高亮效果 */
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
    color: var(--text-color9);
    border-color: transparent;
  }
  button {
    background-color: var(--bg6);
    color: var(--text-color9);
    border-color: transparent;
  }
}
</style>
