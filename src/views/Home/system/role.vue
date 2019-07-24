<template>
  <div>
    <el-button type="success" size="small" @click="addroles"><i class="el-icon-plus"></i> 添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="sn" label="角色编号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"><i
                  class=" el-icon-edit"></i> 编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"><i
                  class=" el-icon-delete"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
            prev-text="上页"
            next-text="下页"
            @current-change="handleCurrentChange"
            :current-page="1"
            layout="prev, pager, next, total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {RolesApi, deleteAddrolesApi} from '../../../network/api.js'

  export default {
    name: "role",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        mytotal: 0
      }
    },
    methods: {
      // 获取角色数据
      getrolesApi() {
        RolesApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            console.log(res.data);
            this.mytotal = res.data.total
            this.tableData = res.data.list
            this.$message.success('角色数据请求成功')
          }
        })
      },
      // 添加按钮
      addroles() {
        this.$router.push('/role/add')
      },

      // 分页按钮
      handleCurrentChange(val) {
        this.currentPage = val
        this.getrolesApi()
      },
      //编辑按钮
      handleEdit(row) {
        console.log(row);
        this.$router.push({name: 'editroles', params: row})

      },
      // 删除按钮
      handleDelete(row) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAddrolesApi({
            token: localStorage.getItem('token'),
            id: row.id
          }).then(res => {
            if (res.success == true) {
              this.$message.success('删除角色成功')
              this.getrolesApi()
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
      this.getrolesApi()
    }
  }
</script>

<style scoped lang='less'>
.el-pagination{
  text-align: center;
  margin-top: 30px;
}
</style>
