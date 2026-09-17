import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products/Products.vue'
import Productcreate from '../views/Products/Productcreate.vue'
import EditProducts from '../views/Products/EditProducts.vue'
import ViewProduct from '../views/Products/ViewProduct.vue'
import Categories from '../views/Categories.vue'
import Stockalert from '../views/Stockalert.vue'
import Reports from '../views/Reports.vue'
import Stockin from '../views/Stockin.vue'
import Stockout from '../views/Stockout.vue'
import History from '../views/History.vue'
import Users from '../views/Users.vue'
import activitylog from '../views/Activitylogs.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginWithRoles.vue'),
      meta: { 
        title: 'Login - Inventory Management System',
        requiresAuth: false,
        layout: 'blank'
      }
    },
    {
      path: '/',
      component: Dashboard,
      meta: { 
        title: 'Dashboard - Inventory Management System',
        requiresAuth: true,
        layout: 'dashboard',
        roles: ['master_admin', 'admin', 'user']
      }
    },
    {
      path: '/products',
      component: Products,
      meta: { 
        title: 'Products - Inventory Management System',
        requiresAuth: true,
        layout: 'products',
        roles: ['master_admin', 'admin', 'user']
      }
    },
    {
      path: '/products/create',
      component: Productcreate,
      meta: { 
        title: 'Create Product - Inventory Management System',
        requiresAuth: true,
        layout: 'products',
        roles: ['master_admin', 'admin']
      }
    },
    {
      path: '/products/edit/:id',
      component: EditProducts,
      meta: { 
        title: 'Edit Product - Inventory Management System',
        requiresAuth: true,
        layout: 'products',
        roles: ['master_admin', 'admin']
      }
    },
    {
      path: '/products/view/:id',
      component: ViewProduct,
      meta: { 
        title: 'View Product - Inventory Management System',
        requiresAuth: true,
        layout: 'products',
        roles: ['master_admin', 'admin']
      }
    },
    {
      path:'/products/categories',
      component: Categories,
      meta: { 
        title: 'Categories - Inventory Management System',
        requiresAuth: true,
        layout: 'categories',
        roles: ['master_admin', 'admin']
      }
    },
    {
      path:'/products/stock-alert',
      component: Stockalert,
      meta: { 
        title: 'Stock Alert - Inventory Management System',
        requiresAuth: true,
        layout: 'stock-alert',
        roles: ['master_admin', 'admin', 'user']
      }
    },
    {
      path:'/transactions/stock-in',
      component: Stockin,
      meta: { 
        title: 'Stock In - Inventory Management System',
        requiresAuth: true,
        layout: 'transactions',
        roles: ['master_admin', 'admin', 'user']
      } 
    },
    {
      path:'/transactions/stock-out',
      component: Stockout,
      meta: { 
        title: 'Stock Out - Inventory Management System',
        requiresAuth: true,
        layout: 'transactions',
        roles: ['master_admin', 'admin', 'user']
      }
    },
    {
      path:'/transactions/history-transactions',
      component: History,
      meta: { 
        title: 'Transaction History - Inventory Management System',
        requiresAuth: true,
        layout: 'transactions',
        roles: ['master_admin', 'admin', 'user']
      } 
    },
    {
      path: '/users',
      component: Users,
      meta: {
        title: 'Users - Inventory Management System',
        requiresAuth: true,
        layout: 'users',
        roles: ['master_admin']
      }
    },
    {
      path: '/activity-log',
      component: activitylog,
      meta: {
        title: 'Activity Log - Inventory Management System',
        requiresAuth: true,
        layout: 'activity-log',
        roles: ['master_admin']
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const isAuthenticated = !!session

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
