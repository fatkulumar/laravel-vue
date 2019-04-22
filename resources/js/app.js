
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSwal from 'vue-swal'
import Spinner from 'vue-simple-spinner'

// import Paginate from 'vuejs-paginate'
// Vue.component('paginate', Paginate)
window.Vue.use(VueRouter);
window.Vue.use(VueSwal)
window.Vue.use(Spinner) 

// Vue.component('selectize-component', require('vue2-selectize'));
// Vue.component('vue-pagination', require('laravel-vue-pagination'));
Vue.component('vue-simple-spinner',require('vue-simple-spinner'));
Vue.component('vue-pagination', require('laravel-vue-pagination'));



Vue.use(VueRouter)

// Vue.component('vue-pagination', require('laravel-vue-pagination'));

import Index from './components/Index.vue';
import Create from './components/Create.vue';
import Read from './components/Read.vue';
import Update from './components/Update.vue';

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const routes = [
  { path: '/', component: Index },
  { path: '/create', component: Create },
  { path: '/read/:id', component: Read, name:"readPost" },
  { path: '/:id/edit', component: Update, name:"editPost" }
  
]

const router = new VueRouter({
  hashbang: true,
  history: true,
  routes // short for `routes: routes`
})

  
// const app = new Vue({
//     el: '#app'
// });
const app = new Vue({
  router
  // data: {
  //   langs: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Ruby', 'Python', 'Erlang'],
  //   paginate: ['languages']
  // }
}).$mount('#app')
