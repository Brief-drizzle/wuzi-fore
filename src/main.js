import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'default-passive-events'


 
// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入全局的样式
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss'
import './assets/icons' // icon
import plugins from './plugins' // plugins

// 引入mockjs
require('./mock.js')
//permission control
import './permission' 
//引入全局公共的工具类函数
import {resetForm, addDateRange} from "@/utils/common.js";

//全局引入组件
import RightToolbar from "@/components/RightToolbar"
// 分页组件
import Pagination from "@/components/Pagination";

//全局方法挂载
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
//全局组件挂载
Vue.component('RightToolbar', RightToolbar)
Vue.component('Pagination', Pagination)

Vue.use(ElementUI);
Vue.use(plugins)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
