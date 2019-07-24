<template>
  <div class="Logindiv">
    <div class="Login">
      <h3 class="login-title">叩丁狼客户管理系统</h3>
      <el-form :model="loginForm" :rules="rules" ref="form">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder="账号"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" @keypress.enter.native="submitForm" type="password" placeholder="密码"/>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {loginApi} from "../../network/api.js";

  export default {
    data() {
      return {
        loginForm: {
          name: "", // 账号
          password: "" // 密码
        },
        rules: {
          name: [{required: true, message: "请输入正确账号", trigger: "blur"}],
          password: [
            {required: true, message: "请输入正确密码", trigger: "blur"}
          ]
        }
      };
    },
    components: {},
    methods: {
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            loginApi({
              username: this.loginForm.name,
              password: this.loginForm.password
            }).then(res => {
              console.log(res);
              if (res.success == true) {
                localStorage.setItem('token', res.data)
                localStorage.setItem('username',this.loginForm.name)
                localStorage.setItem('password',this.loginForm.password)
                this.$router.push('/home')
              }
            })
            this.$message.success("恭喜你，登录成功");
          } else {
            this.$message.error("错了哦，请重新输入");
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .Logindiv {
    width: 100%;
    height: 100%;
    background-color: #324057;
    position: relative;

    .Login {
      width: 400px;
      height: 250px;
      /*background-color: pink;*/
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;

      .login-title {
        padding: 10px 0;
        color: #fff;
        font-size: 24px;
        text-align: center;
      }

      .logininput {
        margin-bottom: 20px;
      }

      .loginbtn {
        width: 100%;
      }
    }
  }
</style>
