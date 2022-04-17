import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/IndexView.vue'),
        meta: {
          title: 'Reverie'
        }
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue'),
        meta: {
          title: '產品頁面'
        }
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
        meta: {
          title: '產品內容'
        }
      },

      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/FavoriteView.vue'),
        meta: {
          title: '收藏清單'
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
        meta: {
          title: '購物車'
        }
      },
      {
        path: 'sendorder',
        name: 'sendorder',
        component: () => import('../views/SendOrder.vue'),
        meta: {
          title: '訂購頁面'
        }
      },
      {
        path: 'paid',
        name: 'paid',
        component: () => import('../views/PaidOrder.vue'),
        meta: {
          title: '付款頁面'
        }
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
        component: () => import('../views/Dashboard/AdminOrder.vue')
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
  routes,
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
