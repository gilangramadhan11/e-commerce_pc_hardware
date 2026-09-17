<template>
  <div class="flex h-screen bg-gray-100 p-3 gap-4"> 
    <aside
      class="flex flex-col"
      :class="['bg-gray-800 text-white transition-all duration-300 ease-in-out rounded-3xl shadow-lg',
        isOpen ? 'w-64' :'w-20'
      ]">
      
      <div 
        :class="['flex items-center pl-4 pt-2 pb-2 pr-4  border-b-2 border-white',
          isOpen ? 'justify-between' : 'justify-center']">
        <h2 v-show="isOpen"
            class="text-2xl font-menu text-white">
            Menu
        </h2>
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >☰
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-2 px-3">
          <li v-for="item in filteredMenu"
              :key="item.name">
            <router-link 
              v-if="!item.subMenu" :to="item.path"
              @click="setActive(item.name)"
              :class="['flex items-center gap-4 px-4 py-4 rounded-lg transition-colors', isOpen ? 'gap-4 px-4' : 'justify-center px-2', isActiveRoute(item.path)
                ? 'bg-linear-to-r from-blue-500 to-indigo-700 text-white shadow-md'
                : 'hover:bg-gray-700'
              ]">
                <i :class="item.icon" class="text-2xl"></i>
                <span v-show="isOpen" class="font-medium flex-1">{{ item.name }}</span>   
            </router-link>
              <a 
                v-else href=""
                @click.prevent="toggleSubmenu(item.name)"
                :class="['flex items-center py-3 rounded-lg transition-colors', isOpen ? 'gap-4 px-4'
                : 'justify-center px-2', 'hover:bg-gray-700'
                ]"
              >
                <i :class="item.icon" class="text-2xl"></i>
                <span v-show="isOpen" class="font-medium flex-1">{{ item.name }}</span>
                <i 
                  v-if="item.subMenu && isOpen" 
                  class="bx-bx-chevron-down text-2xl transition-transform duration-200"
                  :class="{ 'rotate-180' : isExpanded(item.name) }">
                </i>
              </a>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <ul
                v-if="item.subMenu && isExpanded(item.name) && isOpen"
                class="mt-2 space-y-1 ml-4"
              >
                <li 
                  v-for="subItem in getVisibleSubmenu(item.subMenu)"
                  :key="subItem.name"
                >
                  <router-link :to="subItem.path"
                    @click="setActive(subItem.name)"
                    :class="['flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                      isActiveRoute(subItem.path) 
                    ? 'bg-linear-to-r from-blue-500 to-indigo-700 text-white shadow-md'
                    : 'hover:bg-gray-700'
                    ]"
                    >
                    <span class="w-2 h-2 rounded-full bg-current"></span>
                    <span>{{ subItem.name }}</span>
                  </router-link>  
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </nav>

      <div class="p-4 border-t-2 border-white">
        <div 
          :class="['flex items-center gap-3', 
          isOpen ? 'justify-between' : 'justify-center']">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span class="text-sm font-bold">
              {{ userInitial }}
            </span>
          </div>
          <div 
            v-show="isOpen"
            class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">{{ currentUserInfo?.email?.split('@')[0] }}</p>
            <p class="text-xs text-slate-400 truncate">{{ currentUserInfo?.email || 'user@example.com' }}</p>
            <span class="text-xs bg-blue-600 px-2 py-1 rounded">{{ currentUserInfo?.roles?.[0] }}</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter} from 'vue-router'
  import { supabase } from '../lib/supabase'
  
  const userRole = ref('user') // Simulated user role, replace with actual authentication logic
  
  const route = useRoute()
  const router = useRouter()

  const isOpen = ref(true)
  const activeItem = ref('Dashboard')
  const expandedMenu = ref([])
  const profile = ref(null)
  const userInfo = ref(null)
  const currentUser = ref(null)
  const currentUserInfo = ref(null)

  
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }
  
  const setActive =(itemName) => {
    activeItem.value = itemName
  }
  
  const toggleSubmenu = (itemName) => {
    const index = expandedMenu.value.indexOf(itemName)
    if (index > -1){
      expandedMenu.value.splice(index, 1)
    } else {
      expandedMenu.value.push(itemName)
    }
  }
  
  const isExpanded = (itemName) => {
    return expandedMenu.value.includes(itemName)
  }
  
  const isActiveRoute = (path) => {
    return route.path === path
  }
  
  const menuItem = [
    {
      name: 'Dashboard',
      path: '/',
      icon: 'bx bx-home',
      roles: ['master_admin', 'admin', 'user']
    },
    {
      name: 'Products',
      path: '/product',
      icon: 'bx bx-package',
      roles: ['master_admin', 'admin', 'user'],
      subMenu: [
        {name: 'All Products', path: '/products', roles: ['master_admin', 'admin', 'user']},
        {name: 'Categories', path: '/products/categories', roles: ['master_admin', 'admin']},
        {name: 'Stock Alert', path: '/products/stock-alert', roles: ['master_admin', 'admin', 'user']}
      ]
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: 'bx bx-sync',
      roles: ['master_admin', 'admin', 'user'],
      subMenu: [
        {name: 'Stock In', path: '/transactions/stock-in', roles: ['master_admin', 'admin']},
        {name: 'Stock Out', path: '/transactions/stock-out', roles: ['master_admin', 'admin']},
        {name: 'History Transactions', path: '/transactions/history-transactions', roles: ['master_admin', 'admin', 'user']}
      ]
    },
    {
      name: 'Users',
      path: '/users',
      icon: 'bx bx-user',
      roles: ['master_admin'],
      subMenu: [
        {name: 'User List', path: '/users', roles: ['master_admin']},
        {name: 'Activity Log', path: '/activity-log', roles: ['master_admin']}
      ]
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'bx bx-cog',
      roles: ['master_admin', 'admin', 'user'],
      subMenu: [
        {name: 'Profile', path: '/settings', roles: ['master_admin', 'admin', 'user']},
        {name: 'Store Config', path: '/settings/store-config', roles: ['master_admin', 'admin', 'user']}
      ]
    }
  ]
  
  const filteredMenu = computed(() => {
    return menuItem.filter(item =>
      item.roles?.includes(userRole.value)
    )
  })

  const getVisibleSubmenu = (subMenu) => {
    if (!subMenu) return []

    return subMenu.filter(sub =>
      sub.roles.includes(userRole.value)
    )
  }

  onMounted(async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('users_with_roles')
      .select('roles')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    userRole.value =
      data.roles.find(role =>
        ['master_admin', 'admin', 'user'].includes(role)
      ) || 'user'

    console.log('Roles:', data.roles)
    console.log('Current Role:', userRole.value)
  })

  const goTo = (path) => {
    router.push(path)
  }

  onMounted(async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('users_with_roles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    currentUserInfo.value = data
  })

  const userInitial = computed(() => {
    const name =
      profile.value?.full_name ||
      currentUser.value?.email?.split('@')[0] ||
      'User'

    const words = name.split(' ')

    if (words.length > 1) {
      return (
        words[0][0] +
        words[1][0]
      ).toUpperCase()
    }

    return name.substring(0, 2).toUpperCase()
  })
</script>