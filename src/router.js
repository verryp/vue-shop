import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About' // * atau pake import CHeader from '@/views/About.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import('./views/Book.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('./views/Checkout.vue'),
      meta: {auth: true} // menandakan route ini hanya boleh diakses ketika user sudah login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
    // jika user adalah guest(yang belum login)
    if(store.getters['auth/guest']){
      // tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/setAlert', {
        status : true,
        text  : 'Login doloe!',
        type  : 'error',
      })

      store.dispatch('setPrevUrl', to.path) // * nyimpen current url
      // tampilkan form login
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    }
    else{
      next()
    } 
  }
  else{
      next()
  }
})

export default router
