<template>
  <div>
    <el-dialog :title="title" :visible.sync="addvisiba" :before-close="cancelModal" width="40%">
      <el-form :model="rowobj" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="rowobj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户年龄" prop="age">
          <el-input v-model.number="rowobj.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户性别" prop="sex">
          <el-select v-model="rowobj.sex" placeholder="请选择客户性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户电话" prop="tel">
          <el-input v-model="rowobj.tel" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户QQ" prop="qq">
          <el-input v-model="rowobj.qq" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户工作">
          <el-select v-model="rowobj.jobId" placeholder="请选择客户工作">
            <el-option :label="item.title" :value="item.id" v-for="(item) in myjobId" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户来源">
          <el-select v-model="rowobj.sourceId" placeholder="请选择客户来源">
            <el-option :label="item.title" :value="item.id" v-for="(item) in mysourceId" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员">
          <el-select v-model="rowobj.sellerId" placeholder="请选择销售人员">
            <el-option :label="item.name" :value="item.id" v-for="(item) in mysellerId" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbtn">取 消</el-button>
        <el-button type="primary" @click="confirmbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {systemDictionaryItemsApi, marketApi, addcustomersApi, changecustomersApi} from '../../../../network/api.js'

  export default {
    name: "addcustomerTwo",
    props: ['addvisiba', 'rowobj', 'title'],
    data() {
      return {
        // form: {
        //   name: '',
        //   age: '',
        //   gender: '',
        //   qq: '',
        //   tel: '',
        //   jobId: '',// 客户工作
        //   sourceId: '', // 客户来源
        //   sellerId: '', // 销售人员
        // },
        mysourceId: [],// 客户来源数组
        myjobId: [],// 客户工作数组
        mysellerId: [],// 销售人员数组
        rules: {
          name: [
            {required: true, message: '请正确输入客户名称', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请正确输入客户年龄', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请正确输入客户性别', trigger: 'change'}
          ],
          tel: [
            {required: true, message: '请正确输入客户手机号码', trigger: 'blur'}
          ],
          qq: [
            {required: true, message: '请正确输入客户QQ号码', trigger: 'blur'}
          ],
          jobId: [
            {required: true, message: '请正确输入客户工作', trigger: 'change'}
          ],
          sourceId: [
            {required: true, message: '请正确输入客户来源', trigger: 'change'}
          ],
          sellerId: [
            {required: true, message: '请正确输入销售人员', trigger: 'change'}
          ],
        },
        formLabelWidth: '120px',
      }
    },
    methods: {
      // 取消按钮
      cancelbtn() {
        this.cancelModal()
      },
      // 确定按钮
      confirmbtn() {


        // for (var i = 0; i < 15; i++) {
        //   addcustomersApi({
        //     name: '我是蛋蛋超人，来打我呀',
        //     age: 25,
        //     gender: 0,
        //     qq: 2222222,
        //     tel: 222222,
        //     job: {
        //       id: 491,
        //     },
        //     source: {
        //       id: 33,
        //     },
        //     seller: {
        //       id: 23636
        //     },
        //     token: localStorage.getItem('token')
        //   }).then(res => {
        //     if (res.success == true) {
        //       this.cancelModal()
        //       this.getmarketApi()
        //       this.$message.success('添加数据成功')
        //       this.$emit('trg')
        //     }
        //   })
        // }

        if (this.title == '添加潜在客户') {
          this.$refs['form'].validate(valid => {
            if (valid) {
              addcustomersApi({
                name: this.rowobj.name,
                age: this.rowobj.age,
                gender: this.rowobj.gender,
                qq: this.rowobj.qq,
                tel: this.rowobj.tel,
                job: {
                  id: this.rowobj.jobId,
                },
                source: {
                  id: this.rowobj.sourceId
                },
                seller: {
                  id: this.rowobj.sellerId
                },
                token: localStorage.getItem('token')
              }).then(res => {
                if (res.success == true) {
                  this.cancelModal()
                  this.getmarketApi()
                  this.$message.success('添加数据成功')
                  this.$emit('trg')
                }
              })
            } else {
              this.$message.error('请正确输入内容')
              return
            }
          })
        } else {
          this.$refs['form'].validate(valid => {
            if (valid) {
              changecustomersApi({
                id: this.rowobj.id,
                name: this.rowobj.name,
                age: this.rowobj.age,
                gender: this.rowobj.gender,
                qq: this.rowobj.qq,
                tel: this.rowobj.tel,
                job: {
                  id: this.rowobj.jobId,
                },
                source: {
                  id: this.rowobj.sourceId
                },
                seller: {
                  id: this.rowobj.sellerId
                },
                token: localStorage.getItem('token')
              }).then(res => {
                if (res.success == true) {
                  this.cancelModal()
                  this.getmarketApi()
                  this.$message.success('编辑数据成功')
                  this.$emit('trg')
                }
              })
            } else {
              this.$message.error('请正确输入内容')
              return
            }
          })
        }
      },
      // 点击模态框的叉叉按钮让模态框消除
      cancelModal() {
        this.$emit('update:addvisiba', false)
      },
      //获取潜在客户的数据
      getmarketApi() {
        marketApi({
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            this.mysellerId = res.data
            // console.log(this.mysellerId);
          }
        })
      },
    },
    created() {
      this.getmarketApi()
      // 获取模态框内的客户工作的数据
      systemDictionaryItemsApi({
        currentPage: 1,
        pageSize: 1000,
        parentId: 1,
        token: localStorage.getItem('token')
      }).then(res => {
        if (res.success == true) {
          this.myjobId = res.data.list
        }
      })


      // 将多个请求放在一起请求,同时请求完才会执行then
      Promise.all([
        systemDictionaryItemsApi({
          currentPage: 1,
          pageSize: 1000,
          parentId: 2,
          token: localStorage.getItem('token')
        }),
        systemDictionaryItemsApi({
          currentPage: 1,
          pageSize: 1000,
          parentId: 16,
          token: localStorage.getItem('token')
        })
      ]).then(res => {
        if (res[0].success == true && res[1].success == true) {
          this.mysourceId = [...res[0].data.list, ...res[1].data.list]
          // console.log(this.mysellerId);
        }
      })
    }
  }
</script>

<style scoped lang='less'>
  .el-dialog__header .el-dialog__title {
    font-size: 30px !important;
  }

  .el-select {
    width: 100%;
  }
</style>
