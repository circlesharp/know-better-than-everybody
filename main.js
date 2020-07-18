import Vue from 'vue'
import App from './App'
import ColorList from 'colorui/color-list.js'

Vue.config.productionTip = false
Vue.ColorList = ColorList

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
