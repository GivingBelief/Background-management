<template>
  <div id="app">
    <div id="nav">
      <!--<Login></Login>-->
      <!--<Home></Home>-->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  // import Login from './views/Login/index.vue'
  // import Home from './views/Home/Home.vue'
  export default {
    data() {
      return {};
    },
    components: {
      // Login,
      // Home
    },
  };
</script>

<style lang="less">
#app,#nav{
  width: 100%;
  height: 100%;
  background-color: #e9eef3;
}
</style>

