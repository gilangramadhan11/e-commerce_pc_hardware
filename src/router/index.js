import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products/Products.vue'
import Productcreate from '../views/Products/Productcreate.vue'
import EditProducts from '../views/Products/EditProducts.vue'
import ViewProduct from '../views/Products/ViewProduct.vue'
import Categories from '../views/Categories.vue'
import Stockalert from '../views/Stockalert.vue'
import Orderlist from '../views/Orderlist.vue'
import Pendingorders from '../views/Pendingorders.vue'
import Shipping from '../views/Shipping.vue'
import Customerlist from '../views/Customerlist.vue'
import Reviews from '../views/Reviews.vue'
import Revenue from '../views/Revenue.vue'
import Reports from '../views/Reports.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/products',
      component: Products
    },
    {
      path: '/products/create',
      component: Productcreate
    },
    {
      path: '/products/edit/:id',
      component: EditProducts
    },
    {
      path: '/products/view/:id',
      component: ViewProduct
    },
    {
      path:'/products/categories',
      component: Categories
    },
    {
      path:'/products/stock-alert',
      component: Stockalert
    },
    {
      path:'/orders',
      component: Orderlist
    },
    {
      path:'/orders/pending-orders',
      component: Pendingorders
    },
    {
      path:'/orders/shipping',
      component: Shipping
    },
    {
      path:'/customers',
      component: Customerlist
    },
    {
      path:'/customers/reviews',
      component: Reviews
    },
    {
      path:'/finance',
      component: Revenue
    },
    {
      path:'/finance/reports',
      component: Reports
    }
  ]
})

export default router
