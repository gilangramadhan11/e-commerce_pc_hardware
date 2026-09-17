// ============================================
// src/composables/useAuth.js
// ============================================

import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const user = ref(null)
  const roles = ref([])
  const loading = ref(false)

  // Get current user
  const getCurrentUser = async () => {
    loading.value = true
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
      
      if (currentUser) {
        await getUserRoles(currentUser.id)
      }
    } catch (error) {
      console.error('Error getting current user:', error)
    } finally {
      loading.value = false
    }
  }

  // Get user roles dari database
  const getUserRoles = async (userId) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_roles', { user_id: userId })

      if (error) throw error
      
      roles.value = data.map(r => r.role_name) || []
    } catch (error) {
      console.error('Error getting user roles:', error)
      roles.value = []
    }
  }

  // Check if user has specific role
  const hasRole = (roleName) => {
    return roles.value.includes(roleName)
  }

  // Check if user is master admin
  const isMasterAdmin = computed(() => hasRole('master_admin'))

  // Check if user is admin
  const isAdmin = computed(() => hasRole('admin') || hasRole('master_admin'))

  // Get user display name
  const userName = computed(() => {
    return user.value?.email?.split('@')[0] || 'User'
  })

  // Get role display name
  const roleDisplay = computed(() => {
    if (isMasterAdmin.value) return 'Master Admin'
    if (hasRole('admin')) return 'Administrator'
    return 'User'
  })

  // Get first role
  const firstRole = computed(() => {
    return roles.value[0] || null
  })

  onMounted(() => {
    getCurrentUser()
  })

  return {
    user,
    roles,
    loading,
    hasRole,
    isMasterAdmin,
    isAdmin,
    userName,
    roleDisplay,
    firstRole,
    getCurrentUser,
    getUserRoles
  }
}

// ============================================
// src/composables/usePermission.js
// ============================================

export function usePermission() {
  const permissions = ref([])

  // Get user permissions
  const getPermissions = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          role:roles (
            name,
            permissions
          )
        `)
        .eq('user_id', userId)

      if (error) throw error

      // Collect all unique permissions from all roles
      const allPermissions = new Set()
      data.forEach(ur => {
        if (ur.role?.permissions) {
          ur.role.permissions.forEach(p => allPermissions.add(p))
        }
      })

      permissions.value = Array.from(allPermissions)
    } catch (error) {
      console.error('Error getting permissions:', error)
      permissions.value = []
    }
  }

  // Check if user has permission
  const hasPermission = (permission) => {
    return permissions.value.includes(permission)
  }

  // Check multiple permissions (all must exist)
  const hasAllPermissions = (permissionList) => {
    return permissionList.every(p => hasPermission(p))
  }

  // Check multiple permissions (any can exist)
  const hasAnyPermission = (permissionList) => {
    return permissionList.some(p => hasPermission(p))
  }

  return {
    permissions,
    getPermissions,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission
  }
}

// ============================================
// src/utils/roleUtils.js
// ============================================

export const ROLES = {
  MASTER_ADMIN: 'master_admin',
  ADMIN: 'admin',
  USER: 'user'
}

export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',

  // View
  VIEW_ALL: 'view_all',
  VIEW_REPORTS: 'view_reports',

  // Edit/Create
  EDIT_ALL: 'edit_all',
  CREATE_PRODUCTS: 'create_products',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_CATEGORIES: 'manage_categories',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_STOCK: 'manage_stock',

  // Delete
  DELETE_ALL: 'delete_all'
}

export const ROLE_HIERARCHY = {
  master_admin: 3,
  admin: 2,
  user: 1
}

// Check if role A has higher permission than role B
export const hasHigherRole = (roleA, roleB) => {
  return (ROLE_HIERARCHY[roleA] || 0) > (ROLE_HIERARCHY[roleB] || 0)
}

// Get role color
export const getRoleColor = (role) => {
  const colors = {
    master_admin: 'bg-red-100 text-red-800',
    admin: 'bg-blue-100 text-blue-800',
    user: 'bg-gray-100 text-gray-800'
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
}

// Get role icon
export const getRoleIcon = (role) => {
  const icons = {
    master_admin: 'bx bx-crown',
    admin: 'bx bx-shield-alt',
    user: 'bx bx-user'
  }
  return icons[role] || 'bx bx-user'
}

// Get role display name
export const getRoleDisplayName = (role) => {
  const names = {
    master_admin: 'Master Admin',
    admin: 'Administrator',
    user: 'User'
  }
  return names[role] || role
}