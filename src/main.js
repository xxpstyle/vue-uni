import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'
import dateUtil from './utils/dateUtil.js';
import api from './utils/request/request.js';
import validateUtil from './utils/validateUtil.js';

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
}
Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)

Vue.prototype.$dateUtil = dateUtil;
Vue.prototype.$api = api;
Vue.prototype.$validate = validateUtil;
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
