import Vue from 'vue';
import App from './App'

import cuCustom from './static/colorui/components/cu-custom.vue';
Vue.component('cu-custom', cuCustom);

import Price from './pages/price/price.vue';
Vue.component('Price', Price);

import Saving from './pages/saving/saving.vue';
Vue.component('Saving', Saving);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
