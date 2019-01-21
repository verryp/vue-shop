import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About' // * atau pake import CHeader from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    },

    {
      path: '/books',
      name: 'books',
      component: () => import(/* webpackChunkName: "books" */ './views/Books.vue')
    },

    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('./views/Category.vue')
    }
  ]
})

// export default router
