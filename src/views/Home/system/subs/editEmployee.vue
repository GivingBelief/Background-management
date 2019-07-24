<template>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>

    <el-form-item label="部门" prop="desc">
      <el-select v-model="ruleForm.desc" placeholder="请选择部门" :value='-1'>
        <!--<el-option label="全部" ></el-option>-->
        <el-option :label="item.name" :value="item.id" v-for="(item) in ruleForm.myarray" :key="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="超级管理员" prop="resource">
      <el-switch v-model="ruleForm.resource"></el-switch>
    </el-form-item>

    <el-transfer v-show="ruleForm.resource" v-model="myvalue" :data="mytransfer"></el-transfer>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
  import {departmentsApi, rolesApi, changeaddemployeesApi} from '../../../../network/api.js'
  let generateData = (arr) => {
    let data = [];
    arr.map((item)=>{
      data.push({
        key:item.id,
        label:item.name
      })
    })
    return data
  }
  export default {
    name: "editEmployee",
    data() {
      return {
        mytransfer: this.myemloyee,
        myvalue: [],
        ruleForm: {
          name: '',
          password: '',
          age: '',
          email: '',
          resource: true,
          desc: '人力资源部',
          checkPass: '',
          myarray: [],
        },
        myemloyee: [],
        myblock: -1,
        pageSize: 100,
        currentPage4: 1,
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 修改员工
            changeaddemployeesApi({
              name:this.$route.params.name,
              password:this.$route.params.password,
              email:this.$route.params.email,
              age:this.$route.params.age,
              admin: this.$route.params.admin,
              dept: {
                id: this.ruleForm.desc
              },
              ids: this.myemloyee,
              id:this.$route.params.id,
              token:localStorage.getItem('token')
            }).then(res=>{
              if (res.success==true){
                this.$message.success('修改数据成功')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      // console.log(this.$route.params);
      this.ruleForm.name = this.$route.params.name;
      this.ruleForm.email = this.$route.params.email;
      this.ruleForm.age = this.$route.params.age;
      this.ruleForm.desc=this.$route.params.dept.id;
      this.ruleForm.resource = this.$route.params.admin;

      // 获取部门
      departmentsApi({
        currentPage: this.currentPage4,
        pageSize: this.pageSize,
        token: localStorage.getItem('token')
      }).then(res => {
        if (res.success == true) {
          if (res.success == true) {
            this.ruleForm.myarray = res.data.list
          }
        }
      })
      // 获取角色
      rolesApi({
        currentPage: this.currentPage4,
        pageSize: this.pageSize,
        token: localStorage.getItem('token')
      }).then(res => {
        if (res.success == true) {
          console.log(res)
          this.tempmytransfer = res.data.list
          this.mytransfer = generateData(this.tempmytransfer)
          console.log(this.mytransfer)
          this.tempmytransfer = this.mytransfer
          console.log(this.tempmytransfer);
        }
      })
    }
  }
</script>

<style scoped lang='less'>
  .el-input {
    width: 60% !important;
  }

  .el-form-item {
    margin-top: 10px;
  }
</style>
