<template>
  <div class="flex h-screen bg-gray-100 p-3 gap-4"> 
    <aside
      class="flex flex-col"
      :class="['bg-gray-800 text-white transition-all duration-300 ease-in-out rounded-3xl shadow-lg',
        isOpen ? 'w-64' :'w-20'
      ]"?>
      
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
          <li v-for="item in menuItem"
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
                  v-for="subItem in item.subMenu"
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
            <span class="text-sm font-bold">U</span>
          </div>
          <div 
            v-show="isOpen"
            class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Irene</p>
            <p class="text-xs text-slate-400 truncate">Ireneredvelvet@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRoute, useRouter} from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()

  const isOpen = ref(true)
  const activeItem = ref('Dashboard')
  const expandedMenu = ref([])

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
      icon: 'bx bx-home'
    },
    {
      name: 'Products',
      path: '/product',
      icon: 'bx bx-package',
      subMenu: [
        {name: 'All Products', path: '/products'},
        {name: 'Categories', path: '/products/categories'},
        {name: 'Stock Alert', path: '/products/stock-alert'}
      ]
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: 'bx bx-cart',
      subMenu: [
        {name: 'Order List', path: '/orders'},
        {name: 'Pending Orders', path: '/orders/pending-orders'},
        {name: 'Shipping', path: '/orders/shipping'}
      ]
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: 'bx bx-user',
      subMenu: [
        {name: 'Customers List', path: '/customers'},
        {name: 'Reviews', path: '/customers/reviews'},
      ]
    },
    {
      name: 'Finance',
      path: '/finance',
      icon: 'bx bx-dollar-circle',
      subMenu: [
        {name: 'Revenue', path: '/finance'},
        {name: 'Reports', path:'/finance/reports'}
      ]
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'bx bx-cog',
      subMenu: [
        {name: 'Profile', path: '/settings'},
        {name: 'Store Config', path: '/settings/store-config'}
      ]
    }
  ]

  const goTo = (path) => {
    router.push(path)
  }
</script>