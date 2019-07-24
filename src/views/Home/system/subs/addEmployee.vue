<template>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="验证密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="desc">
      <el-select v-model="ruleForm.desc" :value='-1' placeholder="请选择部门">
        <!--<el-option label="全部" :value='-1'></el-option>-->
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
  import {departmentsApi, rolesApi, addemployeesApi} from '../../../../network/api.js'
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
    name: "addEmployee",
    data() {



      /* 校验密码 */
      var validatePsd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.password !== "") {
            this.$refs.ruleForm.validateField("psd2");
          }
          callback();
        }
      };
      /* 校验再次输入密码 */
      var validatePsd2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };

      return {
        mytransfer: [],
        tempmytransfer: [],
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
        tempmyemloyee:[],
        myblock: -1,
        pageSize: 100,
        currentPage4: 1,
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {validator: validatePsd, trigger: "blur"}
          ],
          checkPass: [
            {required: true, message: "请再次输入密码", trigger: "blur"},
            {validator: validatePsd2, trigger: "blur"}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 添加员工
            addemployeesApi({
              name: this.ruleForm.name,
              password: this.ruleForm.password,
              email: this.ruleForm.email,
              age: this.ruleForm.age,
              admin: this.ruleForm.resource,
              dept: {
                id: this.ruleForm.desc
              },
              ids: this.myemloyee,
              token: localStorage.getItem('token')
            }).then(res => {
              if (res.success == true) {
                this.$message.success('添加员工成功')
                this.$router.push('/employee')
              }else {
                this.$message.success('请正确输入员工,谢谢')
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
       /*for (var i = 0; i < 100; i++) {
         addemployeesApi({
           name: '我是蔡徐坤,喜欢rap'+Math.random()*100,
           password: 1,
           email: '148@qq.com',
           age: 16,
           admin: true,
           dept: {
             id: i
           },
           ids: this.myemloyee,
           token: localStorage.getItem('token'+Math.random())
         }).then(res => {
           if (res.success == true) {
             this.$message.success('添加员工成功')
             this.$router.push('/employee')
           }else {
             this.$message.success('请正确输入员工,谢谢')
           }
         })
       }*/

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
