import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'index',
    component: () => import('../views/IndexView.vue')
  },
  {
    path: '/',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
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
      },
      {
        path: 'sendorder',
        name: 'sendorder',
        component: () => import('../views/SendOrder.vue')
      },
      {
        path: 'paid',
        name: 'paid',
        component: () => import('../views/PaidOrder.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '',
    name: 'Admin',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'adminProducts',
        name: 'adminproducts',
        component: () => import('../views/Dashboard/AdminProducts.vue')
      },
      {
        path: 'adminOrder',
        name: 'adminOrder',
        component: () => import('../views/Dashboard/OrderView.vue')
      },
      {
        path: 'adminCoupon',
        name: 'adminCoupon',
        component: () => import('../views/Dashboard/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
