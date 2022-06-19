import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this;//安装全局事件总线
  },
  router,
  store,
}).$mount('#app')
