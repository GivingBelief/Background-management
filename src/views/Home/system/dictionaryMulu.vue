<template>
  <div>
    <el-button type="success" @click="blockbtn"><i class="el-icon-plus"></i> 添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="sn" label="编码"></el-table-column>
      <el-table-column prop="intro" label="简介"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"><i
                  class=" el-icon-edit"></i> 编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleDelete(scope.row)"><i
                  class=" el-icon-plus"></i> 添加明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="数据字典标题:" prop="name">
          <el-input v-model="form.name" placeholder="请输入数据字典标题"></el-input>
        </el-form-item>

        <el-form-item label="数据字典编号:" prop="id">
          <el-input v-model="form.sn" placeholder="请输入数据字典编号"></el-input>
        </el-form-item>
        <el-form-item label="数据字典简介:" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入数据字典简介"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successbtn">保存</el-button>
        <el-button @click="defeatedbtn">取消</el-button>
      </div>
    </el-dialog>

    <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next,total"
            :total="mytotal">
    </el-pagination>
  </div>
</template>

<script>
  import {systemDictionariesApi, addsystemDictionariesApi, changesystemDictionariesApi} from '../../../network/api.js'

  export default {
    name: "dictionary",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        dialogFormVisible: false,
        mytotal: 0,
        title: '',
        form: {
          name: '',
          id: '',
          intro: '',
          sn: ''
        },
        changes: 0,
        rules: {
          name: [
            {required: true, message: '请输入数据字典标题', trigger: 'blur'}
          ],
          sn: [
            {required: true, message: '请输入数据字典编号', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '请输入数据字典简介', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      // 获取数据字典管理数据
      getsystemDictionariesApi() {
        systemDictionariesApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('数据获取成功')
          }
        })
      },
      // 添加按钮
      blockbtn() {
        this.dialogFormVisible = true
        this.title = '数据字典添加'
        this.changes = 0;

        // this.form.name='没有删除键,不要刷数据'
        // this.form.sn=250
        // this.form.intro='你过来呀'
        // for (var i = 0; i < 50; i++) {
        //   addsystemDictionariesApi({
        //     title: this.form.name,
        //     sn:  this.form.sn,
        //     intro:  this.form.intro,
        //     token: localStorage.getItem('token')
        //   }).then(res => {
        //     if (res.success == true) {
        //       // console.log(res);
        //       this.dialogFormVisible = false;
        //       this.$message.success('添加数据成功');
        //       this.getsystemDictionariesApi()
        //     }
        //   })
        // }

      },
      // 保存按钮
      successbtn() {
        if (this.form.name.length == 0 || this.form.sn.length == 0 || this.form.intro.length == 0) {
          this.$message.error('请输入内容')
        } else {
          // 添加按钮进入
          if (this.changes == 0) {
            addsystemDictionariesApi({
              title: this.form.name,
              sn: this.form.id,
              intro: this.form.intro,
              token: localStorage.getItem('token')
            }).then(res => {
              if (res.success == true) {
                // console.log(res);
                this.dialogFormVisible = false;
                this.$message.success('添加数据成功');
                this.getsystemDictionariesApi()
              }
            })
          } else if (this.changes == 1) {
            // console.log(1);
            // 编辑按钮进入
            changesystemDictionariesApi({
              intro: this.form.intro,
              title: this.form.name,
              sn: this.form.sn,
              id: this.form.id,
              token: localStorage.getItem('token'),
            }).then(res => {
              if (res.success == true) {
                this.dialogFormVisible = false;
                this.$message.success('修改数据成功')
                this.getsystemDictionariesApi()
                this.form.name = ''
                this.form.sn = ''
                this.form.intro = ''
              }
            })
          }
        }
      },
      //取消按钮
      defeatedbtn() {
        this.dialogFormVisible = false;
      },
      // 编辑按钮
      handleEdit(row) {
        this.changes = 1
        this.form.name = row.title;
        this.form.sn = row.sn;
        this.form.id = row.id;
        this.form.intro = row.intro;
        this.dialogFormVisible = true
        this.title = '数据字典编辑'
      },
      // 添加明细按钮
      handleDelete(row) {
        // 传值拼接路径
        this.$router.push({name: 'DictionaryMingxi', query: {params: row.id,mytitle:row.title}})
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.getsystemDictionariesApi()
      }
    },
    created() {
      this.getsystemDictionariesApi()

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

  .el-form-item {
    margin-bottom: 30px;
    height: 50px;

    .el-input {
      width: 80% !important;
      height: 50px !important;
    }
  }

  .el-form {
    .el-form-item {
      font-weight: 600;

    }
  }


</style>
