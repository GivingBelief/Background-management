<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="请输入姓名/电话"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" clearable>
          <el-option :label="item.name" :value="item.id" v-for="(item) in mystatus" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="市场专员">
        <el-select v-model="formInline.sellerId" clearable>
          <el-option :label="item.name" :value="item.id" v-for="(item) in myarray" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="displayGender" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="qq" label="QQ"></el-table-column>
      <el-table-column prop="job.title" label="职业"></el-table-column>
      <el-table-column prop="source.title" label="来源"></el-table-column>
      <el-table-column prop="seller.name" label="市场专员"></el-table-column>
      <el-table-column prop="displayStatus" label="状态"></el-table-column>
    </el-table>


    <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {customersApi, marketApi} from '../../../network/api.js'

  export default {
    name: "customerOne",
    data() {
      return {
        formInline: {
          keyword: '',
          status: -1,
          sellerId: '',
        },

        tableData: [],
        currentPage: 1,
        pageSize: 10,
        mytotal: 0,
        myarray: [],
        myname:[],
        mystatus: [
          {id: -1, name: '全部'},
          {id: 0, name: '潜在客户'},
          {id: 1, name: '正式客户'},
          {id: 2, name: '资源池客户'},
          {id: 3, name: '失败客户'},
          {id: 4, name: '流失客户'}
        ]
      }
    },
    methods: {
      onSubmit() {
        this.getcustomersApi()
      },
      // 点击分页按钮
      handleCurrentChange(val) {
        this.currentPage = val
        this.getcustomersApi()
      },
      // 获取客户的所有信息
      getcustomersApi() {
        customersApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.formInline.keyword,
          sellerId: this.formInline.sellerId,
          status: this.formInline.status,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            console.log(res);
            // console.log(res.data.list);
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('获取客户数据成功')
          }
        })
      },
      // 获取市场专员数据
      getmarketApi() {
        marketApi({
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            console.log(res);
            this.myarray = res.data

            this.myarray.forEach(item => {
              this.myname = item.name;
              // console.log(this.myname);
            })

            // this.formInline.sellerId = res.data[0].id
            this.$message.success('获取专员数据成功')
          }
        })
      }
    },
    created() {
      this.getcustomersApi()
      this.getmarketApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-table-column {
    height: 50px;
  }

  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
</style>
