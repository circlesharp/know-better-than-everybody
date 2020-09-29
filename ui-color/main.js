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

Vue.prototype.showSimpleModal = function showSimpleModal(e) {
  const { modalName = 'modal', content, confirm, cancel } = e;
  const modal = this.$refs[modalName];
  if (!modal) {
    console.error(`本页面没有 $refs.${modalName}，去设置一个吧`);
    return;
  }
  if (modal.showModal) modal.showModal({ content, binary: !!cancel });
  modal.$on('on-ok', confirm);
  modal.$on('on-cancel', cancel);
};

Vue.prototype.showSimpleLoading = function showSimpleLoading(e) {
  if (!e) e = {};
  const { loadingName = 'loading', content } = e;
  const loading = this.$refs[loadingName];
  if (!loading) {
    console.error(`本页面没有 $refs.${loadingName}，去设置一个吧`);
    return;
  }
  if (loading.showLoading) loading.showLoading(content);
};

Vue.prototype.hideSimpleLoading = function hideSimpleLoading(e) {
  if (!e) e = {};
  const { loadingName = 'loading' } = e;
  const loading = this.$refs[loadingName];
  if (!loading) {
    console.error(`本页面没有 $refs.${loadingName}，去设置一个吧`);
    return;
  }
  if (loading.hideLoading) loading.hideLoading();
};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



