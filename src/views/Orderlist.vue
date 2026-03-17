<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Order List</h1>
        <p class="text-gray-600 mt-1">All orders from customers</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
        <button 
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          New Order
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div v-for="i in 5" :key="`stat-skeleton-${i}`" class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div class="space-y-2 flex-1">
            <div class="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div class="w-10 h-10 bg-gray-200 animate-pulse roundes"></div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Orders</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.total }}</p>
          </div>
          <i class="bx bx-cart text-3xl text-blue-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Pending</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.pending }}</p>
          </div>
          <i class="bx bx-time text-3xl text-yellow-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Processing</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.processing }}</p>
          </div>
          <i class="bx bx-loader-circle text-3xl text-purple-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Completed</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.completed }}</p>
          </div>
          <i class="bx bx-check-circle text-3xl text-green-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Cancelled</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.cancelled }}</p>
          </div>
          <i class="bx bx-x-circle text-3xl text-red-500"></i>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg py-4 gap-4 flex mb-6">
      <div class="relative flex-1 max-w-sm">
        <input
          v-model="searchQuery" 
          type="text"
          placeholder="Search by order ID, customer name..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select 
          v-model="selectedStatus"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="relative">
        <select 
          v-model="selectedDateRange"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <button class="flex items-center gap-2 border border-gray-200 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <i class="bx bx-filter-alt"></i> Filter
        </button>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            
            <template v-if="loading">
              <tr v-for="i in 5" :key="`skeleton-${i}`">
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                    <div class="space-y-2">
                      <div class="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                      <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <div class="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </td>
              </tr>
            </template>

            <template v-else-if="filteredOrders.length === 0">
              <tr>
                <td colspan="7" class="px-6 py-16 text-center">
                  <i class="bx bx-cart text-6xl text-gray-300 mb-4 block"></i>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
                  <p class="text-gray-500">Try adjusting your filters</p>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr 
                v-for="order in paginatedOrders"
                :key="order.id"
                class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-bold text-blue-600">{{ order.order_number }}</div>
                  <div class="text-xs text-gray-500">{{ order.invoice_number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center mr-3', getAvatarColor(order.customer_name)]">
                      <span class="text-sm font-bold">{{ getInitials(order.customer_name) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ order.customer_name }}</div>
                      <div class="text-xs text-gray-500">{{ order.customer_email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{getFirstProduct(order.items)}}</div>
                  <div class="text-xs text-gray-500">{{ getItemsCount(order.items) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900">{{ formatPrice(order.total_amount) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.created_at) }}</div>
                  <div class="text-xs text-gray-500">{{ formatTime(order.created_at) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-3 py-1 text-xs font-bold rounded-full', getStatusClass(order.status)]">
                    {{ capitalizeFirst(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                      <i class="bx bx-show text-lg"></i>
                    </button>
                    <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Process Order">
                      <i class="bx bx-check text-lg"></i>
                    </button>
                    <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Print Invoice">
                      <i class="bx bx-printer text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && filteredOrders.length > 0" class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Showing <span class="font-semibold">{{ startIndex + 1 }}</span> to 
        <span class="font-semibold">{{ Math.min(endIndex, filteredOrders.length) }}</span> of       
        <span class="font-semibold">{{ filteredOrders.length }}</span> results
      </p>
      <div class="flex gap-1">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="['flex items-center px-4 py-1 rounded border shadow hover:bg-gray-50', currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300']"
        >
          <i class="bx bx-chevron-left text-xl"></i>
        </button>
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="currentPage = page"
          :class="['flex items-center px-3 py-1 rounded border shadow hover:bg-gray-50', currentPage === page ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300']"
        >
          {{ page }}
        </button>
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="['flex items-center px-4 py-1 rounded border shadow hover:bg-gray-50', currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300']"
        >
          <i class="bx bx-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch, capitalize } from 'vue';
  import { useRouter } from 'vue-router';
  import { supabase } from '../lib/supabase';
  import Swal from 'sweetalert2';

  const router = useRouter()

  const loading = ref(true)
  const orders = ref ([])
  const searchQuery = ref('')
  const selectedStatus = ref('')
  const selectedDateRange = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const fetchOrders = async () => {
    try {
      loading.value = true
      
      const { data, error } = await supabase
      .from('orders')
      .select(`
        *, 
        customer:customers(*),
        items:order_items(
          id,
          product:products(name),
          quantity,
          price 
        )
      `)
      .order('created_at', { ascending: false})

    if (error) throw error

      orders.value = (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        invoice_number: order.invoice_number,
        customer_name: order.customer?.name || 'Unknown',
        customer_email: order.customer?.email || '',
        items: order.items || [],
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at
      }))
    } catch (error) {
      console.error('Error fetching orders:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Could not fetch orders. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      loading.value = false
    }
  }

  const stats = computed(() => {
    const total = orders.value.length
    const pending = orders.value.filter(o => o.status === 'pending').length
    const processing = orders.value.filter(o => o.status === 'processing').length
    const completed = orders.value.filter(o => o.status === 'delivered').length
    const cancelled = orders.value.filter(o => o.status === 'cancelled').length

    return { total, pending, processing, completed, cancelled }
  })

  const filteredOrders = computed(() => {
    let result = orders.value

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(o =>
        o.order_number.toLowerCase().includes(query) ||
        o.customer_name.toLowerCase().includes(query) ||
        o.customer_email.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (selectedStatus.value) {
      result = result.filter(o => o.status === selectedStatus.value)
    }

    // Date range filter
    if (selectedDateRange.value) {
      const now = new Date()
      result = result.filter(o => {
        const orderDate = new Date(o.created_at)
        
        if (selectedDateRange.value === 'today') {
          return orderDate.toDateString() === now.toDateString()
        } else if (selectedDateRange.value === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return orderDate >= weekAgo
        } else if (selectedDateRange.value === 'month') {
          return orderDate.getMonth() === now.getMonth() && 
                orderDate.getFullYear() === now.getFullYear()
        }
        
        return true
      })
    }

    return result
  })

  const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
  const endIndex = computed(() => currentPage.value * itemsPerPage.value)
  const paginatedOrders = computed(() => filteredOrders.value.slice(startIndex.value, endIndex.value))

  const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else if (current <= 3) {
      pages.push(1, 2, 3, 4, 5)
    } else if (current >= total - 2) {
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      for (let i = current - 2; i <= current + 2; i++) pages.push(i)
    }

    return pages
  })

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getFirstProduct = (items) => {
    if (!items || items.length === 0) return 'No items'
    return items[0].product?.name || 'Unknown product'
  }

  const getItemsCount = (items) => {
    if (!items || items.length === 0) return ''
    if (items.length === 1) return 'Single item'
    return `+ ${items.length - 1} more item${items.length > 2 ? 's' : ''}`
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const getStatusClass = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  // Clear filters
  const clearFilters = () => {
    searchQuery.value = ''
    selectedStatus.value = ''
    selectedDateRange.value = ''
    currentPage.value = 1
  }

  // Pagination
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  // Reset page when filters change
  watch([searchQuery, selectedStatus, selectedDateRange], () => {
    currentPage.value = 1
  })

  onMounted(()=>{
    fetchOrders()
  })
</script>