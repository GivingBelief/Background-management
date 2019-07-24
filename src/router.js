import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      redirect: '/department',
      name: 'Home',
      component: () => import( './views/Home/Home.vue'),
      children:[
        {
          path:'/department',
          name:'Department',
          component: () => import( './views/Home/system/department.vue'),
          meta:{
            name:'/department',
            title:'部门管理'
          }
        },
        {
          path:'/employee',
          name:'Employee',
          component: () => import( './views/Home/system/employee.vue'),
           meta:{
            name:'/employee',
             title:'员工管理'
          }
        },
        {
          path:'/employee/add',
          name:'addEmployee',
          component: () => import( './views/Home/system/subs/addEmployee.vue'),
          meta:{
            name:'/employee',
            title:'员工管理'
          }
        },
        {
          path:'/employee/edit',
          name:'editEmployee',
          component: () => import( './views/Home/system/subs/editEmployee.vue'),
          meta:{
            name:'/employee',
            title:'员工管理'
          }
        },
        {
          path:'/jurisdiction',
          name:'jurisdiction',
          component: () => import( './views/Home/system/jurisdiction.vue'),
          meta:{
            name:'/jurisdiction',
            title:'权限管理'
          }
        },
        {
          path:'/role',
          name:'role',
          component: () => import( './views/Home/system/role.vue'),
          meta:{
            name:'/role',
            title:'角色管理'
          }
        },
        {
          path:'/role/add',
          name:'addroles',
          component: () => import( './views/Home/system/subs/addroles.vue'),
          meta:{
            name:'/role',
            title:'角色编辑'
          }
        },
        {
          path:'/role/edit',
          name:'editroles',
          component: () => import( './views/Home/system/subs/editroles.vue'),
          meta:{
            name:'/role',
            title:'角色编辑'
          }
        },




        {
          path:'/dictionaryMulu',
          name:'DictionaryMulu',
          component: () => import( './views/Home/system/dictionaryMulu.vue'),
           meta:{
            name:'/dictionaryMulu',
              title:'数据字典管理'
          }
        },
        {
          path:'/dictionaryMingxi',
          name:'DictionaryMingxi',
          component: () => import( './views/Home/system/dictionaryMingxi.vue'),
           meta:{
            name:'/dictionaryMingxi',
              title:'数据字典明细管理'
          }
        },
        {
          path:'/customerOne',
          name:'CustomerOne',
          component: () => import( './views/Home/system/customerOne.vue'),
          meta:{
            name:'/customerOne',
             title:'客户列表'
          }
        },
        {
          path:'/customerTwo',
          name:'CustomerTwo',
          component: () => import( './views/Home/system/customerTwo.vue'),
          meta:{
            name:'/customerTwo',
             title:'潜在客户'
          }
        },
        {
          path:'/customerThree',
          name:'CustomerThree',
          component: () => import( './views/Home/system/customerThree.vue'),
          meta:{
            name:'/customerThree',
             title:'客户池'
          }
        },
        {
          path:'/customerFour',
          name:'CustomerFour',
          component: () => import( './views/Home/system/customerFour.vue'),
          meta:{
            name:'/customerFour',
             title:'失败客户'
          }
        },
        {
          path:'/customerFive',
          name:'CustomerFive',
          component: () => import( './views/Home/system/customerFive.vue'),
          meta:{
            name:'/customerFive',
             title:'正式客户'
          }
        },
        {
          path:'/customerSix',
          name:'CustomerSix',
          component: () => import( './views/Home/system/customerSix.vue'),
          meta:{
            name:'/customerSix',
             title:'流失客户'
          }
        },
        {
          path:'/historymove',
          name:'Historymove',
          component: () => import( './views/Home/system/historymove.vue'),
          meta:{
            name:'/historymove',
             title:'移交历史'
          }
        },
        {
          path:'/historygo',
          name:'Historygo',
          component: () => import( './views/Home/system/historygo.vue'),
          meta:{
            name:'/historygo',
             title:'跟进历史'
          }
        },
        {
          path:'/statistical',
          name:'Statistical',
          component: () => import( './views/Home/system/statistical.vue'),
          meta:{
            name:'/statistical',
             title:'潜在客户报表'
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login/index.vue')
    }
  ]
})
