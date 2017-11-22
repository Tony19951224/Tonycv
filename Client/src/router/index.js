// 导入vue
import Vue from 'vue';

// 导入路由
import VueRouter from 'vue-router';
// 导入路径所对应的组件
import Home from '../pages/Home';
import Hot from '../pages/Hot';
import Detailed from '../pages/Detailed';
import Car from '../pages/Car';
import Me from '../pages/Me';
import Register from '../pages/Register';
import Seat from '../pages/Seat';
Vue.use(VueRouter);

// 路由匹配
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/hot',
    component: Hot
  }
  ,
  {
    path: '/detailed/:name',
    component: Detailed
  },
  {
    path: '/car',
    component: Car
  },
  ,
  {
    path: '/me',
    component: Me
  },
  {
    path: '/register',
    component: Register
  }, {
    path: '/seat',
    component: Seat
  },
]


// 导出实例
export default new VueRouter({
  routes
})
