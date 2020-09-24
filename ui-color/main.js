import Vue from 'vue'
import App from './App'

import './common/iconfont.js';

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


Vue.config.productionTip = false

Vue.prototype.showSimpleModal = function({modalName, content, callback}) {
  const modal = this.$refs[modalName];
  if (!modal) {
    console.error(`本页面没有 $refs.${modalName}，去设置一个吧`);
    return;
  }
  modal.showModal && modal.showModal(content);
  modal.$on('on-modal-hide', callback);
};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



