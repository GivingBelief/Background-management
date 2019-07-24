<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="活动区域">
        <el-select v-model="catelog" placeholder="活动区域" @change="selectchanges">
          <el-option :label="item.title" :value="item.id" v-for="(item) in myarray" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit"><i class="el-icon-plus"></i>添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="sequence" label="序号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="prev, pager, next,jumper,total"
            :total="mytotal">
    </el-pagination>

    <el-dialog :title="mytitle" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="form" :label-width="mywidth" :rules="rules">
        <el-form-item label="字典目录" prop="name">
          <el-input v-model="form.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="明细标题" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="明细序号" prop="sequence">
          <el-input v-model="form.sequence" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbtn">取 消</el-button>
        <el-button type="primary" @click="changebtn">确 定</el-button>
      </div>
    </el-dialog>

    <!--<el-button type="primary" @click="btnclick">点击</el-button>-->
    <!--<Mymodal :visiba1.sync="visiba1"></Mymodal>-->
  </div>
</template>

<script>
  // import Mymodal from './content/mymodal.vue'
  import {
    systemDictionaryItemsApi,
    systemDictionariesApi,
    changesystemDictionaryItemsApi,
    addsystemDictionaryItemsApi,
    deletesystemDictionaryItemsApi
  } from '../../../network/api.js'

  export default {
    name: "dictionaryMingxi",
    // components: {Mymodal},
    data() {
      return {
        catelog: 1,
        formInline: {
          user: '',
          region: ''
        },
        form: {
          title: '',
          name: '',
          sequence: '',
          id: ''
        },
        // 状态
        mydata: 0,
        mywidth: '120px',
        mytitle: '',
        dialogFormVisible: false,
        mytotal: 0,
        myarray: [],
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        mycatelogtitle: '',

        // visiba1: false,

        rules: {
          title: [{required: true, message: '请输入明细标题', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入明细序号', trigger: 'blur'}],
        }
      }
    },
    methods: {
      // 添加按钮
      onSubmit() {
        this.dialogFormVisible = true
        this.mytitle = '数据字典明细添加'
        this.mydata = 0
        // console.log(this.myarray);
        this.form.name = this.mycatelogtitle
        this.form.title = ''
        this.form.sequence = ''
        this.form.id = ''

        // for (var i = 0; i < 10; i++) {
        //   addsystemDictionaryItemsApi({
        //     title: '下面有请'+i+'号女嘉宾',
        //     parentId: 1,
        //     sequence: 5555,
        //     token: localStorage.getItem('token')
        //   }).then(res => {
        //     if (res.success == true) {
        //       console.log(res);
        //       this.$message.success('添加数据成功')
        //       this.getsystemDictionaryItemsApi()
        //       this.dialogFormVisible = false
        //     }
        //   })
        // }
      },
      // 编辑按钮
      handleEdit(row) {
        // console.log(row);
        this.mydata = 1
        this.dialogFormVisible = true
        this.mytitle = '数据字典明细编辑'
        // console.log(this.myarray);
        this.form.name = this.mycatelogtitle
        this.form.title = row.title
        this.form.id = row.id
        this.form.sequence = row.sequence
      },
      // 删除按钮
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletesystemDictionaryItemsApi({
            token: localStorage.getItem('token'),
            id: row.id
          }).then(res => {
            if (res.success == true) {
              this.$message.success('删除数据成功')
              this.getsystemDictionaryItemsApi()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      // 取消按钮
      cancelbtn() {
        this.$refs['form'].resetFields()
        this.getsystemDictionaryItemsApi()
        this.dialogFormVisible = false
      },
      // 确定按钮(发送请求)
      changebtn() {
        if (this.form.title.length == 0 || this.form.sequence.length == 0) {
          this.$message.error('请输入内容')
        } else {
          // 状态机mydata==0,打开的是编辑模态框
          if (this.mydata == 0) {
            console.log(this.form.title);
            console.log(this.form.name);
            console.log(this.form.sequence);
            addsystemDictionaryItemsApi({
              title: this.form.title,
              parentId: this.catelog * 1,
              sequence: this.form.sequence,
              token: localStorage.getItem('token')
            }).then(res => {
              if (res.success == true) {
                console.log(res);
                this.$message.success('添加数据成功')
                this.getsystemDictionaryItemsApi()
                this.dialogFormVisible = false
              }
            })
          } else if (this.mydata == 1) {
            // 状态机mydata==1,打开的是编辑模态框
            changesystemDictionaryItemsApi({
              parentId: this.catelog * 1,
              sequence: this.form.sequence,
              title: this.form.title,
              id: this.form.id,
              token: localStorage.getItem('token')
            }).then(res => {
              if (res.success == true) {
                // console.log(res);
                this.$message.success('编辑数据成功')
                this.getsystemDictionaryItemsApi()
                this.dialogFormVisible = false
              }
            })
          }
        }

      },

      handleSizeChange(val) {
        this.currentPage = val
        this.getsystemDictionaryItemsApi()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getsystemDictionaryItemsApi()

      },
      // 获取明细数据
      getsystemDictionaryItemsApi() {
        systemDictionaryItemsApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          parentId: this.catelog,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            // console.log(res);
            this.tableData = res.data.list
            this.mytotal = res.data.total
            this.$message.success('明细数据请求成功')
          }
        })
      },
      //下拉框修改值
      selectchanges() {
        // console.log(this.catelog);
        this.myarray.forEach(item => {
          if (item.id == this.catelog) {
            this.mycatelogtitle = item.title
            return false
          }
        })
        this.getsystemDictionaryItemsApi()
      },

      // btnclick() {
      //   // console.log(1);
      //   this.visiba1 = true
      // }
    },
    created() {
      // 获取目录数据
      systemDictionariesApi({
        currentPage: 1,
        pageSize: 500
      }).then(res => {
        if (res.success == true) {
          this.myarray = res.data.list
          // console.log(this.$route.query);
          // 使用3元方程判断取值
          this.catelog = this.$route.query.params ? this.$route.query.params : res.data.list[0].id
          this.mycatelogtitle = this.$route.query.mytitle ? this.$route.query.mytitle : res.data.list[0].title
          // console.log(this.mycatelogtitle);
          this.$message.success('目录数据请求成功')
          // 接收点击传过来的值
          // this.catelog = this.$route.params.id
          // 重新获取明细数据
          this.getsystemDictionaryItemsApi()
        }
      })


    }

  }
</script>

<style scoped lang='less'>
  .el-pagination {
    text-align: right;
    margin-top: 30px;
  }
</style>
