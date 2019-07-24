<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="请输入姓名/电话"></el-input>
      </el-form-item>
      <el-form-item label="市场专员">
        <el-select clearable v-model="formInline.sellerId" @change="selectchange">
          <el-option :label="item.name" :value="item.id" v-for="(item) in myarray" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchFn"><i class="el-icon-search"></i> 查询</el-button>
        <el-button type="success" @click="addFn"><i class="el-icon-plus"></i> 添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="qq" label="QQ"></el-table-column>
      <el-table-column prop="job.title" label="职业"></el-table-column>
      <el-table-column prop="source.title" label="来源"></el-table-column>
      <el-table-column prop="seller.name" label="销售员"></el-table-column>
      <el-table-column prop="displayStatus" label="状态"></el-table-column>


      <el-table-column prop="handle" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="changebtn(scope.row)"><i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="warning" size="small" @click="follow(scope.row)"><i class="el-icon-edit"></i>跟进</el-button>
          <el-button type="info" size="small" @click="turn(scope.row)"><i class="el-icon-edit"></i>移交</el-button>
          <el-button type="danger" size="small" @click="changes(scope.row)"><i class="el-icon-edit"></i>修改状态</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="5"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
    <Addcustomer :addvisiba.sync="addvisiba" @trg="doWork" :rowobj="rowobj" :title="title"></Addcustomer>
    <Followcustomer :followaddvisiba.sync="followaddvisiba" :rowobj="rowobj" :title="title"
                    :myfollow="myfollow"></Followcustomer>
    <Turnwcustomer :turnaddvisiba.sync="turnaddvisiba" :title="title" :rowobj="rowobj"
                   @customerTwo="customerTwo"></Turnwcustomer>
    <Changecustomer :changesaddvisiba.sync="changesaddvisiba" :title="title" :rowobj="rowobj"
                    @trg="lodind"></Changecustomer>
  </div>
</template>

<script>
  import Addcustomer from './customer/addcustomerTwo.vue'
  import Followcustomer from './customer/followcustomerTwo.vue'
  import Turnwcustomer from './customer/turncustomerTwo.vue'
  import Changecustomer from './customer/changecustomerTwo.vue'
  import {customersApi, marketApi} from '../../../network/api.js'

  export default {
    name: "customerTwo",
    components: {
      Addcustomer,
      Followcustomer,
      Turnwcustomer,
      Changecustomer
    },
    data() {
      return {
        currentPage1: 1,
        formInline: {
          keyword: '',
          sellerId: ''
        },
        currentPage: 1,
        pageSize: 5,
        tableData: [],
        mytotal: 0,
        myarray: [],
        addvisiba: false,
        title: '',
        followaddvisiba: false,
        turnaddvisiba: false,
        changesaddvisiba: false,
        rowobj: [],
        myfollow: [],

      }
    },
    methods: {
      // 子组件点击确定发送请求(自定义事件)
      doWork() {
        this.getcustomersApi()
      },
      //获取客户列表
      getcustomersApi() {
        customersApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.formInline.keyword,
          status: 0,
          sellerId: this.formInline.sellerId,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            // console.log(res.data.list);
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('客户列表数据请求成功')
          }
        })
        // 获取市场专员数据
        marketApi({
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            // console.log(res.data);
            this.myarray = res.data
            this.$message.success('市场专员数据请求成功')
          }
        })
      },
      // 点击分页事件
      handleCurrentChange(val) {
        this.currentPage = val
        this.getcustomersApi()
      },
      //下拉框选中事件
      selectchange() {
        console.log(this.formInline.sellerId);
      },
      //查询按钮
      searchFn() {
        this.getcustomersApi()
      },
      //点击添加按钮
      addFn() {
        this.title = '添加潜在客户'
        this.addvisiba = true
        this.rowobj.jobId = this.rowobj.job ? this.rowobj.job.id : ''
        this.rowobj.sellerId = this.rowobj.seller ? this.rowobj.seller.id : ''
        this.rowobj.sourceId = this.rowobj.source ? this.rowobj.source.id : ''
        this.rowobj = {}
      },
      //点击编辑按钮
      changebtn(row) {
        console.log(row);
        this.title = '编辑潜在客户'
        this.addvisiba = true
        this.rowobj = row
        // 深拷贝(模态框的下拉框才可以选择)
        this.rowobj = JSON.parse(JSON.stringify(row))
        this.$set(this.rowobj, 'sex', this.rowobj.gender.toString())
        this.$set(this.rowobj, 'jobId', this.rowobj.job ? this.rowobj.job.id : ' ')
        this.$set(this.rowobj, 'sellerId', this.rowobj.seller ? this.rowobj.seller.id : ' ')
        this.$set(this.rowobj, 'sourceId', this.rowobj.source ? this.rowobj.source.id : ' ')
        // console.log(this.rowobj);
      },

      //点击跟进按钮
      follow(row) {
        // this.getsystemDictionaryItemsApi()
        console.log(row);
        this.title = '跟进潜在客户'
        this.followaddvisiba = true,
            this.rowobj = row
        // 深拷贝(模态框的下拉框才可以选择)
        this.rowobj = JSON.parse(JSON.stringify(row))
        this.$set(this.rowobj, 'sex', this.rowobj.gender.toString())
        this.$set(this.rowobj, 'id', row.id)
        this.$set(this.rowobj, 'jobId', this.rowobj.job ? this.rowobj.job.id : ' ')
        this.$set(this.rowobj, 'sellerId', this.rowobj.seller ? this.rowobj.seller.id : ' ')
        this.$set(this.rowobj, 'sourceId', this.rowobj.source ? this.rowobj.source.id : ' ')
        this.$set(this.rowobj, 'myfollow', this.myfollow)
        this.$set(this.rowobj, 'inputTime', this.rowobj.inputTime)
      },

      // 点击移交按钮
      turn(row) {
        console.log(row);
        this.title = '移交潜在客户'
        this.turnaddvisiba = true
        this.rowobj = row
        // 深拷贝(模态框的下拉框才可以选择)
        this.rowobj = JSON.parse(JSON.stringify(row))
        this.$set(this.rowobj, 'sex', this.rowobj.gender.toString())
        this.$set(this.rowobj, 'id', row.id)
        this.$set(this.rowobj, 'jobId', this.rowobj.job ? this.rowobj.job.id : ' ')
        this.$set(this.rowobj, 'sellerId', this.rowobj.seller ? this.rowobj.seller.id : ' ')
        this.$set(this.rowobj, 'displayStatus', this.rowobj.displayStatus)
      },
      // 修改状态按钮
      changes(row) {
        console.log(row);
        this.title = '修改潜在客户状态'
        this.changesaddvisiba = true
        this.rowobj = JSON.parse(JSON.stringify(row))
        this.$set(this.rowobj, 'id', row.id)
        this.$set(this.rowobj, 'name', row.name)
      },
      // 点击修改状态按钮自定义事件刷新界面
      lodind() {
        this.getcustomersApi()
      },
      //点击修改状态按钮自定义事件刷新界面
      customerTwo() {
        this.getcustomersApi()
        // console.log(454544);
      }
    },
    created() {
      this.getcustomersApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-button {
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 15px;
  }

  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }

</style>
