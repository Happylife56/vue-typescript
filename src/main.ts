import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/element.js';

// 引入icons
import './assets/iconfont/iconfont.css';
// 引入公用的mixins
const Mixin = require('./mixins')
Vue.mixin(Mixin)

// 引入公用过滤器
const filters = require('./filters')

// 设置全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
