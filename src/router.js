import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
// import Menu from './components/Menu/SidebarMenu.vue'

import './store/store'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {}
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})