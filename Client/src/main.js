// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import axios from 'axios';
 
import './assets/font-awesome/css/font-awesome.min.css';
 
import router from './router';
Vue.prototype.$axios = axios


FastClick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
