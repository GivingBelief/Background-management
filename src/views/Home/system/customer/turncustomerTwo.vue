<template>
  <div>
    <el-dialog :title="title" :visible.sync="turnaddvisiba" :before-close="cancelModal">
      <el-form :model="rowobj" ref="form" :rules="rules" :label-width="formLabelWidth">

        <el-form-item label="客户姓名">
          <el-input v-model="rowobj.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="旧营销人员">
          <el-input v-model="rowobj.displayStatus" disabled></el-input>
        </el-form-item>

        <el-form-item label="新营销人员" prop="region">
          <el-select v-model="num" placeholder="请填写新营销人员">
            <el-option :label="item.name" :value="item.id" v-for="(item) in myarray" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="移交原因" prop="cause">
          <el-input type="textarea" v-model="rowobj.cause"></el-input>
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
  import {marketApi,customerTransfersApi} from '../../../../network/api.js'

  export default {
    props: ['turnaddvisiba', 'title', "rowobj"],
    name: "turncustomerTwo",
    data() {
      return {
        form: {
          name: '',
          region: ''
        },
        num: '',
        myarray: [],
        formLabelWidth: '120px',
        rules: {
          newperson: [
            {required: true, message: '请正确输入新营销人员', trigger: 'blur'}
          ],
          cause: [
            {required: true, message: '请正确输入移交原因', trigger: 'blur'}
          ]
        }
      }

    },
    methods: {
      cancelbtn() {
        console.log(1);
      },
      // 确定按钮
      confirmbtn() {
        // console.log(this.title);
        /*  console.log(this.rowobj.name);
          console.log(this.rowobj.id+'');
          console.log(this.rowobj.displayStatus);
          console.log(this.rowobj.sellerId+'');
          console.log(this.num+'');
          console.log(this.rowobj.cause);*/
        customerTransfersApi({
          customer:{
            name:this.rowobj.name,
            id:this.rowobj.id+''
          },
          oldSeller:{
            name:this.rowobj.displayStatus,
            id:this.rowobj.sellerId+''
          },
          newSeller:{
            id:this.num+''
          },
          reason:this.rowobj.cause,
          token:localStorage.getItem('token')
        }).then(res=>{
          if (res.success==true){
            // console.log(res);
            this.$message.success('移交数据成功')
            this.cancelModal()
          }
        })
        if (this.title=='移交潜在客户'){
          this.$emit('customerTwo')
        }else if (this.title=='移交模态框'){
          this.$emit('trg')
        }
      },
      // 点击模态框的叉叉按钮让模态框消除
      cancelModal() {
        this.$emit('update:turnaddvisiba', false)
      },
      // 获取市场专员数据
      getmarketApi() {
        marketApi({
          token: localStorage.getItem('token')
        }).then(res => {
              if (res.success == true) {
                this.num = res.data[0].id
                this.myarray = res.data
                this.$message.success('市场专员请求成功')
              }
            }
        )
      }
    },
    created() {
      this.getmarketApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-select {
    width: 100%;
  }
</style>
