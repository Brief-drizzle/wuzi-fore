import tab from './tab'
import modal from './modal'


export default {
  install(Vue) {
    // 页签操作
    Vue.prototype.$tab = tab
    Vue.prototype.$modal = modal
  }
}
