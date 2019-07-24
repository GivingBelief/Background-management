<template>
  <div class="Homeheader">
    <h1><i class="el-icon-loading"></i>叩丁狼客户管理系统<i class="el-icon-loading" @click="changes"></i></h1>
    <el-dropdown @command="mydelete">
      <span class="el-dropdown-link">野猪佩奇_一根葱<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import Bus from '../Bus.js'
  import {logoutApi} from '../../network/api.js'

  export default {
    name: "HomeHeader",
    data() {
      return {
        blocknone: false
      }
    },
    methods: {
      changes() {
        // console.log(111);
        this.blocknone = !this.blocknone
        Bus.$emit('changesnone', this.blocknone)
      },
      mydelete() {
        logoutApi({
          token: localStorage.removeItem('token')
        }).then(res => {
          if (res.success == true) {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            this.$router.push('/login')
          }
        })


      }
    }
  }
</script>

<style scoped lang='less'>
  .Homeheader {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    h1 {
      color: #fff;
      font-size: 20px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
