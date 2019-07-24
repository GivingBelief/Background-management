<template>
  <div>
    <el-button size="small" type="success" @click="lodings"><i class="el-icon-refresh"></i> 重新加载</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="expression" label="权限表达式"></el-table-column>
      <el-table-column prop="btn" label="操作">
        <el-button size="mini" type="danger" @click="deletelodings">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
            background
            @current-change="handleCurrentChange"
            prev-text="上页"
            next-text="下页"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {permissionsApi, loadpermissionsApi, deletepermissionsApi} from '../../../network/api.js'

  export default {
    name: "jurisdiction",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 5,
        mytotal: 0
      }
    },

    methods: {
      // 请求数据方法
      getpermissionsApi() {
        permissionsApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            this.mytotal = res.data.total;
            this.tableData = res.data.list;
            this.$message.success('权限数据列表请求成功')
          }
        })
      },
      // 点击分页按钮,切换列表数据
      handleCurrentChange(val) {
        this.currentPage = val
        this.getpermissionsApi()
      },
      // 重新加载数据方法
      lodings() {
        this.$confirm('加载权限会耗时，确定要操作么?', '温馨提示', {
          // distinguishCancelAndClose: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        })
            .then(() => {
              this.$confirm('加载成功', '温馨提示', {
                distinguishCancelAndClose: true,
                cancelButtonText: '取消',
                confirmButtonText: '确定',
              })
                  .then(() => {
                    loadpermissionsApi({
                      token: localStorage.getItem('token')
                    }).then(res => {
                      if (res.success == true) {
                        this.$message.success('数据加载完毕')
                        this.getpermissionsApi()
                      }
                    })
                  })
            })
      },
      // 删除按钮
      deletelodings() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletepermissionsApi({
            id: this.tableData[0].id
          }).then(res => {
            if (res.success == true) {
              this.$message.success('删除数据成功')
              this.getpermissionsApi()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      }
    },
    created() {
      this.getpermissionsApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>
