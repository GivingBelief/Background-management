<template>
  <div>
    <el-dialog :title="title" :visible.sync="followaddvisiba" :before-close="cancelModal">
      <el-form :model="rowobj" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="rowobj.name" autocomplete="off" disabled=""></el-input>
        </el-form-item>

        <el-form-item label="跟进时间" prop="inputTime">
          <el-date-picker v-model="rowobj.inputTime" type="date" format="yyyy-MM-dd " placeholder="请选择活动时间"
                          clearable></el-date-picker>
        </el-form-item>


        <el-form-item label="跟进记录" prop="record">
          <el-input v-model="rowobj.record" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营销方式" prop="marketing">
          <el-select v-model="num" placeholder="请写入营销方式">
            <el-option :label="item.title" :value="item.id" v-for="(item) in myfollow"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进结果" prop="result">
          <el-select v-model="grade" placeholder="请写入跟进结果">
            <el-option label="差" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="优" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="nytextarea" autocomplete="off"></el-input>
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
  import {systemDictionaryItemsApi, customerTraceHistoriesApi} from '../../../../network/api.js'

  export default {
    props: ['followaddvisiba', 'rowobj', 'title'],
    name: "followcustomer",
    data() {
      return {
        myfollow: [],
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '请正确输入客户姓名', trigger: 'blur'}
          ],
          Time: [
            {required: true, message: '请正确输入跟进时间', trigger: 'blur'}
          ],
          record: [
            {required: true, message: '请正确输入跟进记录', trigger: 'blur'}
          ],
          marketing: [
            {required: true, message: '请正确输入营销方式', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '请正确输入跟进结果', trigger: 'blur'}
          ],
        },
        num: '',
        grade: '1',
        nytextarea: ''
      }
    },
    methods: {
      cancelbtn() {
        console.log(1);
      },

      // 将时间戳转化为年月日
      RiQi(sj) {
        var now = new Date(sj);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      },


      // 点击确定按钮
      confirmbtn() {
        customerTraceHistoriesApi({
          name: this.rowobj.name,
          customer: {
            id: this.rowobj.id
          },
          traceType: {
            id: this.num
          },
          traceTime: this.RiQi(this.rowobj.inputTime),
          traceDetails: this.rowobj.record,
          traceResult: this.grade,
          remark: this.nytextarea,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            console.log(res);
            this.$message.success('跟进数据成功')
            this.cancelModal()
          }
        })
      },
      // 点击模态框的叉叉按钮让模态框消除
      cancelModal() {
        this.$emit('update:followaddvisiba', false)
      },
      // 获取营销方法
      getsystemDictionaryItemsApi() {
        systemDictionaryItemsApi({
          currentPage: 1,
          pageSize: 1000,
          parentId: 26,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            this.num = res.data.list[0].id
            this.myfollow = res.data.list
            // console.log(this.myfollow);
            this.$message.success('获取营销方式成功')
          }
        })
      }

    },
    created() {
      this.getsystemDictionaryItemsApi()
    }
  }
</script>

<style scoped lang='less'>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
</style>
