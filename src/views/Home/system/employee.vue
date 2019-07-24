<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.user" placeholder="请输入姓名/邮箱"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="dele">
          <el-option label="全部" :value='-1'></el-option>
          <el-option :label="item.name" :value="item.id" v-for="(item) in myarray" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seachFn"><i class="el-icon-search"></i> 查询</el-button>
        <el-button type="success" @click="addFn"><i class="el-icon-plus"></i>添加</el-button>
        <el-button type="danger" @click="Alldelete"><i class="el-icon-delete"></i>批量删除</el-button>
        <el-button type="warning" @click="exportFn"><i class="el-icon-sort"></i>导出</el-button>
      </el-form-item>
    </el-form>

    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="email" label="email" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="dept.name" label="部门" show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {
    employeesApi,
    departmentsApi,
    employeesxlsesApi,
    deleteaddemployeesApi,
    AlldeleteaddemployeesApi
  } from '../../../network/api.js'

  export default {
    name: "employee",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        currentPage4: 1,
        mytotal: 0,
        myarray: [],
        dele: -1,
        pageSize: 10
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        // var arrays = []
        this.multipleSelection = val

      },
      handleSizeChange(val) {
        this.currentPage4 = val
        this.getEmployeeList()
      },
      handleCurrentChange(val) {
        this.currentPage4 = val
        this.getEmployeeList()
      },
      //查询按钮
      seachFn() {
        this.getEmployeeList()
      },
      // 添加按钮
      addFn() {
        this.$router.push('/employee/add')
      },

      // 导出按钮
      exportFn() {
        var agto = document.createElement('a')
        document.body.appendChild(agto)
        agto.href = employeesxlsesApi + '?token=' + localStorage.getItem('token')
        agto.click()
        document.body.removeChild(agto)
      },

      //编辑按钮
      handleEdit(row) {
        // console.log(row);
        this.$router.push({name: 'editEmployee', params: row})
      },

      // 删除按钮
      handleDelete(row) {
        this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          deleteaddemployeesApi({
            id: row.id,
            token: localStorage.getItem('token')
          }).then(res => {
            if (res.success == true) {
              this.getEmployeeList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 批量删除
      Alldelete() {
        let arrays = []
        for (var i = 0; i < this.multipleSelection.length; i++) {
          arrays.push(this.multipleSelection[i].id)
        }
        this.$confirm('此操作将永久删除所有员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          AlldeleteaddemployeesApi({
            ids: arrays,
            token: localStorage.getItem('token')
          }).then(res => {
            if (res.success == true) {
              this.$message.success('批量删除成功')
              this.getEmployeeList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getEmployeeList() {
        // 获取员工列表
        employeesApi({
          currentPage: this.currentPage4,
          keyword: this.formInline.username,
          deptId: this.tableData.dept,
          token: localStorage.getItem('token'),
          pageSize: this.pageSize
        }).then(res => {
          console.log(res);
          if (res.success == true) {
            this.$message.success('请求数据成功')
            this.tableData = res.data.list;
            this.mytotal = res.data.total
          }
        })
      },
    },
    created() {
      // 获取员工列表
      // employeesApi({
      //   currentPage: this.currentPage4,
      //   keyword: this.formInline.username,
      //   deptId: this.tableData.dept,
      //   token: localStorage.getItem('token'),
      //   pageSize: 10
      // }).then(res => {
      //   console.log(res);
      //   if (res.success == true) {
      //     this.$message.success('请求数据成功')
      //     this.tableData = res.data.list;
      //     this.mytotal = this.tableData.length
      //   }
      // })
      this.getEmployeeList()

      // 获取部门管理
      departmentsApi({
        currentPage: this.currentPage4,
        pageSize: this.pageSize,
        token: localStorage.getItem('token')
      }).then(res => {
        if (res.success == true) {
          console.log(res);
          this.myarray = res.data.list
        }
      })

    }
  }
</script>
<style scoped lang='less'>
  .el-pagination {
    text-align: right;
  }
</style>
