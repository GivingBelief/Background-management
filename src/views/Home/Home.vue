<template>
  <div class="home">
    <el-container>
      <el-header class="el-header">
        <HomeHeader></HomeHeader>
      </el-header>
      <el-container class="el-container">
        <el-aside class="el-aside" :width="isCollapse==true?'60px':'270px'">
          <HomeSide></HomeSide>
        </el-aside>
        <el-main class="el-main" :class="{'miniBox':isCollapse}">
          <h3>{{Ontitle}}</h3>
          <div class="main">
            <router-view></router-view>
          </div>
          <footer><span>Copyright &copy;2016-2019 <a href="#">叩丁狼</a>. All rights reserved.
        </span>
            <span>Version 1.0.0</span>
          </footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import HomeHeader from "./HomeHeader.vue";
  import HomeSide from "./HomeSide.vue";
  // import {loginApi} from "../../network/api.js";
  import Bus from '../Bus.js'

  export default {
    name: "home",
    data() {
      return {
        isCollapse: false
      }
    },
    components: {
      HomeHeader,
      HomeSide
    },
    created() {
      // loginApi({});
      var that = this
      Bus.$on('changesnone', function (msg) {
        that.isCollapse = msg
      })
    },
    computed:{
      Ontitle(){
        return this.$route.meta.title
      }
    }
  };
</script>
<style scoped lang="less">
  .el-header {
    background-color: #429cff;
    color: #333;
    text-align: center;
    line-height: 70px;
    padding: 0 !important;
    height: 70px !important;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 70px;
    background-color: #545c64;
    transition: all 0.5s;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 70px;
    left: 270px;
    padding-bottom: 0;
    transition: all 0.5s;

    &.miniBox {
      left: 60px;

    }

    h3 {
      height: 40px;
    }

    .main {
      background-color: #fff;
      width: 100%;
      position: relative;
      height: calc(~"100% - 80px");
      padding: 20px 10px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0px;
        opacity: 0;
        -webkit-overflow-scrolling: touch;
      }    }

    footer {
      height: 40px;
      line-height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;

    }
  }

  body > .el-container {
    margin-bottom: 40px;

  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>


