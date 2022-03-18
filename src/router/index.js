import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/IndexView.vue')
  },
  {
    path: '/f',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('../views/ServiceView')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'adminproducts',
        name: 'adminproducts',
        component: () => import('../views/Dashboard/AdminProducts.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/Dashboard/OrderView.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/Dashboard/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
