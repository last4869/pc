import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('./views/feedback.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      redirect: '/bangumi',
      children: [{
        path: '/bangumi',
        name: 'bangumi',
        component: () => import('./views/bangumi.vue')
      },
      {
        path: '/bangumiDetail',
        name: 'bangumiDetail',
        component: () => import('./views/bangumiDetail.vue')
      },
      {
        path: '/newBangumi',
        name: 'newBangumi',
        component: () => import('./views/newBangumi.vue')
      },
      {
        path: '/player',
        name: 'player',
        component: () => import('./views/player.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('./views/login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('./views/register.vue')
      }]
    }
  ]
})
