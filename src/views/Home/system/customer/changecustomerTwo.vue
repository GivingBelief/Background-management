<template>
  <div>
    <el-dialog :title="title" :visible.sync="changesaddvisiba" :before-close="cancelModal">
      <el-form :model="rowobj" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="客户名称">
          <el-input v-model="rowobj.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户状态" prop="status">
          <el-select v-model="num" placeholder="请写入客户状态">
            <el-option label="潜在客户" :value="0"></el-option>
            <el-option label="正式客户" :value="1"></el-option>
            <el-option label="资源池客户" :value="2"></el-option>
            <el-option label="失败客户" :value="3"></el-option>
            <el-option label="流失客户" :value="4"></el-option>
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
  import {gaicustomersApi} from '../../../../network/api.js'

  export default {
    props: ['changesaddvisiba', 'title', 'rowobj'],
    name: "changecustomer",
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请正确输入新营销人员', trigger: 'blur'}
          ],
        },
        num: 0,
        formLabelWidth: '120px'
      }
    },
    methods: {
      cancelbtn() {
        console.log(1);
      },
      // 确认按钮
      confirmbtn() {
        gaicustomersApi({
          id: this.rowobj.id,
          customerId: this.rowobj.id+'',
          name: this.rowobj.name,
          status: this.num+'',
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            console.log(res);
            this.$message.success('修改潜在客服状态成功')
            this.cancelModal()
            this.$emit('trg')
          }
        })
      },
      // 点击模态框的叉叉按钮让模态框消除
      cancelModal() {
        this.$emit('update:changesaddvisiba', false)
      },
    },
    created() {

    }
  }
</script>

<style scoped lang='less'>
.el-select{
  width: 100%;
}
</style>
