import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store/store'
import { UTable, UTableColumn } from 'umy-ui'
import VueRouter from 'vue-router';

// import Manager from './components/Manager.vue'

Vue.component(UTable.name, UTable)
Vue.component(UTableColumn.name, UTableColumn)
Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  el: '#app',
  components: { App },
  store,
  router,
  render: h => h(App),
})