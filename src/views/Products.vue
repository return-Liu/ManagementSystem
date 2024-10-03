<template>
  <div class="mallMeggage">
    <el-dialog
      :title="modelType ? '编辑产品' : '新增产品'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-alert
        title="请填写信息再进行确定"
        type="error"
        v-show="alertVisible"
      ></el-alert>
      <!-- 商品的表单信息 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="产品名称" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入产品名称"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="产品类型" prop="type">
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
              <el-form-item label="产品数量" prop="number">
                <el-input
                  v-model="form.number"
                  placeholder="请输入产品数量"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="height: 100%">
              <el-form-item label="产品价格" prop="price">
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
              <el-form-item label="产品介绍" prop="description">
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
        + 新增</el-button
      >
      <el-button
        type="danger"
        class="danger"
        @click="hanlderReomve"
        :disabled="this.seles.length === 0"
      >
        - 批量删除</el-button
      >
      <el-form :inline="true" :model="mallForm">
        <el-form-item>
          <el-input
            v-model="mallForm.name"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlerSearch">搜索</el-button>
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
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelect"
        @select="handleSelect"
        style="width: 100%"
      >
        <!-- 添加一列用于复选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="产品名称"> </el-table-column>
        <el-table-column prop="type" label="产品类型"> </el-table-column>
        <el-table-column prop="number" label="产品数量"></el-table-column>
        <el-table-column prop="price" label="产品价格"> </el-table-column>
        <el-table-column prop="description" label="产品介绍"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
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
import { getMall, addMall, editMall, delMall } from "../api";
export default {
  name: "ProductsManage",
  data() {
    return {
      searchError: false,
      dialogVisible: false,
      alertVisible: false,
      // 加载搜索的状态
      loading: false,
      input: "",
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
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 1) {
            editMall(this.form).then(() => {
              this.getList();
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
            });
          } else {
            addMall(this.form).then(() => {
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
    handleClose() {
      // console.log(this.form);
      // 清空表单
      this.resetForm();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    cancel() {
      // 调用handleClose方法
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
    handlerDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMall({ id: row.id }).then(() => {
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
    handleSelect(seles) {
      this.seles = seles.map((item) => item.id);
      // console.log(this.seles);
    },
    // 批量删除
    hanlderReomve() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const promises = this.seles.map((id) => delMall({ id }));
          Promise.all(promises).then(() => {
            this.getList();
            this.$message({
              type: "success",
              message: "批量删除成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消批量删除",
          });
        });
    },
    hanlderAdd() {
      this.$confirm("此操作将新增文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.modelType = 0;
          this.dialogVisible = true;
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
    // 列表搜索
    handlerSearch() {
      if (!this.mallForm.name) {
        this.$message.warning("请输入关键字");
        return;
      }
      // 重置之前的错误提示标志（如果有的话）
      this.searchError = false;
      // 设置加载状态，准备进行搜索
      this.loading = true;
      // 1.通过 setTimeout 模拟延迟，以模拟搜索请求
      // 2.调用获取列表的方法，并传递搜索参数 （包括表单参数, 分页参数）
      setTimeout(() => {
        getMall({ params: { ...this.mallForm, ...this.pageData } })
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

  // 在组件创建完成后调用getList方法
  created() {
    this.getList();
  },
};
</script>
<style scoped lang="less">
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
    color: var(--text-color9);
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
      color: var(--text-color9);
    }
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .dangers {
      background-color: var(--bg5);
      border-color: var(--border4);
      color: var(--text-color9);
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
