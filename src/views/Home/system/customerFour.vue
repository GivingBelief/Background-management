<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="请输入姓名/电话"></el-input>
      </el-form-item>
      <el-form-item label="市场专员">
        <el-select v-model="formInline.sellerId">
          <el-option :label="item.name" :value="item.id" v-for="(item) in myregion" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="qq" label="QQ"></el-table-column>
      <el-table-column prop="job.title" label="职业"></el-table-column>
      <el-table-column prop="source.title" label="来源"></el-table-column>
      <el-table-column prop="seller.name" label="市场专员"></el-table-column>
      <el-table-column prop="displayStatus" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="absorb"><i class="el-icon-edit"></i>吸纳</el-button>
          <el-button type="warning" @click="turn(scope.row)"><i class="el-icon-edit"></i>移交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {customersApi, marketApi} from "../../../network/api";

  export default {
    name: "customerFour",
    data() {
      return {
        formInline: {
          keyword: '',
          sellerId: ''
        },
        currentPage: 1,
        pageSize: 10,
        mytotal: 0,
        myregion: [],
        tableData: []
      }
    },
    methods: {
      // 查询按钮
      onSubmit() {
        console.log('submit!');
      },
      // 获取市场专员数据
      getmarketApi() {
        marketApi({
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            this.myregion = res.data
            this.$message.success('市场专员数据获取成功')
          }
        })
      },
      // 获取失败客户数据
      getcustomersApi() {
        customersApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.formInline.keyword,
          token: localStorage.getItem('token'),
          status: 3,
          sellerId: this.formInline.sellerId
        }).then(res => {
          if (res.success == true) {
            // console.log(res.data.list);
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('失败客户数据获取成功')
          }
        })
      },
      // 吸纳按钮
      absorb() {
        console.log('我是吸纳');
      },
      //移交按钮
      turn(row) {
        console.log(row);
      },
      // 点击分页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getcustomersApi()
      }
    },

    created() {
      this.getmarketApi()
      this.getcustomersApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-pagination {
    text-align: right;
    margin-top: 20px;
    margin-right: 20px;
  }
</style>
