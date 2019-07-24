<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="请输入姓名/电话"></el-input>
      </el-form-item>
      <el-form-item label="市场专员">
        <el-select v-model="formInline.sellerId" clearable>
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
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="absorb"><i class="el-icon-edit"></i>吸纳</el-button>
          <el-button type="warning" @click="turn(scope.row)"><i class="el-icon-edit"></i>移交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="吸纳客户数据" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="吸纳备注" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="textarea" placeholder="请吸纳备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesbtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 移交组件 -->
    <TurncustomerTwo :turnaddvisiba.sync="turnaddvisiba" :title="title" :rowobj="rowobj"
                     @trg="trgclick"></TurncustomerTwo>


    <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout=" prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {marketApi, customersApi} from '../../../network/api.js'
  import TurncustomerTwo from './customer/turncustomerTwo.vue'

  export default {
    name: "customerThree",
    components: {TurncustomerTwo},
    data() {
      return {
        formInline: {
          keyword: '',
          sellerId: ''
        },
        turnaddvisiba: false,
        form: {
          name: '',
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        myregion: [],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        title: '',
        rowobj: [],
        mytotal: 0
      }
    },
    methods: {
      // 点击查询按钮
      onSubmit() {
        this.getcustomersApi()
      },
      //子组件传递过来的自定义事件
      trgclick() {
        this.getcustomersApi()
      },
      //点击吸纳按钮
      absorb() {
        this.dialogFormVisible = true
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
      // 获取客户池的数据
      getcustomersApi() {
        customersApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.formInline.keyword,
          token: localStorage.getItem('token'),
          status: 2,
          sellerId: this.formInline.sellerId
        }).then(res => {
          if (res.success == true) {
            // console.log(res.data.list);
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('客户池数据获取成功')
          }
        })
      },

      // 点击吸纳按钮
      yesbtn() {
        this.$message.error('只有市场专员或者市场主管才可以吸纳客户')
        this.dialogFormVisible = false
        this.form.name = ''
      },
      // 点击移交按钮
      turn(row) {
        this.turnaddvisiba = true
        this.title = '移交模态框'
        this.rowobj = row
        // 深拷贝(模态框的下拉框才可以选择)
        this.rowobj = JSON.parse(JSON.stringify(row))
        this.$set(this.rowobj, 'sex', this.rowobj.gender.toString())
        this.$set(this.rowobj, 'id', row.id)
        this.$set(this.rowobj, 'name', row.name)
        this.$set(this.rowobj, 'jobId', this.rowobj.job ? this.rowobj.job.id : ' ')
        this.$set(this.rowobj, 'sellerId', this.rowobj.seller ? this.rowobj.seller.id : ' ')
        this.$set(this.rowobj, 'displayStatus', this.rowobj.displayStatus)
      },

      //点击分页按钮
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
    margin-right: 30px;
  }
</style>
