<template>
  <div class="addroles">
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" size="mini" class="demo-ruleForm">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编号:" prop="sn">
        <el-input v-model="ruleForm.sn" placeholder="请输入角色编号"></el-input>
      </el-form-item>
      <el-form-item label="分配权限:" prop="myvalue">
        <br>
        <el-transfer v-model="ruleForm.myvalue" :data="mytwoarray"></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="danger">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {permissionsApi, changeAddrolesApi} from '../../../../network/api.js'

  const generateData = (arr) => {
    const mydata = [];
    arr.map(item => {
      mydata.push({
        key: item.id,
        label: item.name
      })
    })
    return mydata;
  }
  export default {
    name: "edit",
    data() {
      return {

        ruleForm: {
          name: '',
          sn: '',
          myvalue: [],
          id:0
        },
        currentPage: 1,
        pageSize: 100,
        myarray: [],
        mytwoarray: this.myarray,
      }
    },
    methods: {
      // 获取数据添加到穿梭框
      getpermissionsApi() {
        permissionsApi({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          token: localStorage.getItem('token')
        }).then(res => {
          if (res.success == true) {
            // console.log(res.data.list);
            this.myonearray = res.data.list
            this.mytwoarray = generateData(this.myonearray)
            this.$message.success('请求数据成功')
          }
        })
      },
      // 保存按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            changeAddrolesApi({
              name: this.ruleForm.name,
              sn: this.ruleForm.sn,
              ids: this.ruleForm.myvalue,
              id: this.ruleForm.id,
              token: localStorage.getItem('token')
            }).then(res => {
              if (res.success === true) {
                console.log(res);
                this.$message.success('修改数据成功')
                this.$router.push('/role')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
    },
    created() {
      this.ruleForm.name=this.$route.params.name
      this.ruleForm.sn=this.$route.params.sn
      this.ruleForm.myvalue=this.$route.params.permissions
      this.ruleForm.id=this.$route.params.id
      this.getpermissionsApi()
    }
  }
</script>

<style scoped lang='less'>
  .addroles {
    padding: 20px 50px;

    .el-form-item {
      font-weight: 600;

      .el-input {
        width: 60% !important;
      }
    }
  }

</style>
