<template>
  <div>
    <el-row class="tac">
      <el-col class="tac-col">
        <el-menu
                :default-active="OnRouter"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                router
                unique-opened>
          <el-submenu :index="myindex+''" v-for="(item,myindex) in myarray" :key="item.title">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index='smitem.path' v-for="(smitem,index) in item.children" :key="index">
              <span>{{smitem.title}}</span></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Bus from '../Bus.js'
  import myarray from './config/siderbarMeua.js'

  export default {
    name: "HomeSide",
    data() {
      return {
        isCollapse: false,
        myarray: myarray,
        // OnRouter:this.OnRouter
      }
    },
    computed:{
      OnRouter(){
        return this.$route.meta.name
      }
    },
    created() {
      var that = this
      Bus.$on('changesnone', function (msg) {
        that.isCollapse = msg
      })
    }
  }
</script>

<style scoped lang='less'>

  .el-submenu {
    text-align: left;

    .el-menu-item {
      padding-left: 50px !important;
    }
  }

  .el-menu {
    border-right: none !important;
  }


</style>
