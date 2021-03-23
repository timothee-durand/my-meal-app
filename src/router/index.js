import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import ChoixPlat from '@/views/ChoixPlat.vue'
import ListeCourse from '@/views/ListeCoursePage.vue'
import MesRecettes from '@/views/MesRecettes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Register
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/recettes',
    name: 'Recettes',
    component: ChoixPlat
  },
  {
    path: '/liste-course',
    name: 'ListeCourse',
    component: ListeCourse
  },
  {
    path: '/mes-recettes',
    name: 'MesRecettes',
    component: MesRecettes
  },
  {
    path: '*',
    name: 'NotFound',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(router.app.$store.state.isConnected)
  if (!router.app.$store.state.isConnected && to.name !== 'login') {
    router.push('login')
    return
  }
  next()
})

export default router
