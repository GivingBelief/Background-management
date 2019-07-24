<template>
  <div>
    <el-button type="success" @click="btnclick"><i class="el-icon-plus"></i>添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="110px"></el-table-column>
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column prop="sn" label="部门编号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i
                  class=" el-icon-edit"></i> 编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i
                  class=" el-icon-delete"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            @prev-click="prevclick"
            @next-click="nextclick"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="mytotal"
            :page-size="pageSize"
            prev-text="上一页"
            next-text="下一页">
    </el-pagination>


    <el-dialog :title="elname" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off" placeholder="请输入部门编号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successbtn">保存</el-button>
        <el-button @click="defeatedbtn">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    departmentsApi,
    addDepartmentApi,
    changeaddDepartmentApi,
    deleteaddDepartmentApi
  } from '../../../network/api.js'

  export default {
    name: "department",
    data() {
      return {
        tableData: [],
        mytotal: 0,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          id: 0
        },
        elname: '',
        pageSize: 5,
        formLabelWidth: '120px',
        num: 0,
      }
    },
    methods: {
      // 编辑按钮
      handleEdit(index, row) {
        this.num = 1
        console.log(row);
        this.elname = '部门编辑'
        this.dialogFormVisible = true
        this.form.name = row.name
        this.form.region = row.sn
        this.form.id = row.id
        // // console.log(index, row);

      },

      // 删除按钮
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteaddDepartmentApi({
            name: row.name,
            sn: row.sn,
            token: localStorage.getItem('token'),
            id: row.id,
          }).then(res => {
            if (res.success == true) {
              this.$message.success('删除当前部门成功')
              this.getdepartmentsApi()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      prevclick() {
        console.log(1);

      },
      nextclick() {
        console.log(2);
      },

      // 分页跳转
      handleSizeChange(val) {
        this.currentPage4 = val
        this.getdepartmentsApi()
      },
      handleCurrentChange(val) {
        this.currentPage4 = val
        this.getdepartmentsApi()
      },

      // 添加按钮
      btnclick() {
        this.dialogFormVisible = true
        this.elname = '部门添加'
        this.num = 0
      },
      // 保存按钮
      successbtn() {
        this.dialogFormVisible = false
        if (this.num == 0) {
          // 添加部门
          addDepartmentApi({
            name: this.form.name,
            sn: this.form.region,
            token: localStorage.getItem("token")
          }).then(res => {
            if (res.success == true) {
              console.log(res);
              this.$message.success("添加部门成功");
              this.mytotal = res.data.total
              this.getdepartmentsApi()
              console.log(res.data);
            }
          })
        } else {
          // 编辑部门
          changeaddDepartmentApi({
            name: this.form.name,
            sn: this.form.region,
            token: localStorage.getItem('token'),
            id: this.form.id
          }).then(res => {
            if (res.success == true) {
              this.$message.success('部门修改成功')
              this.getdepartmentsApi()
            }
          })
        }
        this.form.name = ''
        this.form.region = ''
      },
      // 取消按钮
      defeatedbtn() {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.region = ''
      },

      // 获取部门管理数据
      getdepartmentsApi() {
        departmentsApi({
          currentPage: this.currentPage4,
          pageSize: this.pageSize,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            // console.log(res);
            this.mytotal = res.data.total
            this.tableData = res.data.list
          }
        })

      }
    },


    created() {
      this.getdepartmentsApi()

    }
  }
</script>

<style scoped lang='less'>
  .el-button {
    margin-bottom: 10px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .el-dialog {
    width: 40% !important;
  }
</style>
