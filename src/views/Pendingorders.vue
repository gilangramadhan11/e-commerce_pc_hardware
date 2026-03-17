<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Pending Orders</h1>
        <p class="text-gray-600 mt-1">Orders awaiting confirmation and processing</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-check-double text-xl"></i>
          Process All
        </button>
      </div>
    </div>

    <!-- Alert Banner -->
    <div 
      v-if="!loading && stats.totalPending > 0" 
      class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
      <div class="flex items-center">
        <i class="bx bx-error text-yellow-500 text-2xl mr-3"></i>
        <div>
          <p class="font-semibold text-yellow-800">Action Required</p>
          <p class="text-sm text-yellow-700">You have <span class="font-bold">{{ stats.totalPending }} pending orders</span> that need processing. Average wait time: <span class="font-bold">{{ stats.avgWaitTime }}</span></p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="i in 4" :key="`stat-skeleton-${i}`" class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-gray-200 animate-pulse rounded-lg"></div>
          <div class="w-16 h-6 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
        <div class="h-6 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div class="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-time text-2xl text-yellow-600"></i>
          </div>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Today</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.todayCount }}</h3>
        <p class="text-sm text-gray-600">New Today</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-orange-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-alarm text-2xl text-orange-600"></i>
          </div>
          <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Urgent</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.urgentCount }}</h3>
        <p class="text-sm text-gray-600">Over 4 Hours</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-dollar-circle text-2xl text-purple-600"></i>
          </div>
          <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Value</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ formatPrice(stats.totalValue) }}</h3>
        <p class="text-sm text-gray-600">Pending Value</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-trending-up text-2xl text-blue-600"></i>
          </div>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Avg</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.avgWaitTime }}</h3>
        <p class="text-sm text-gray-600">Wait Time</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-lg py-4 gap-4 flex mb-6">
      <div class="relative flex-1 max-w-sm">
        <input
          v-model="searchQuery" 
          type="text"
          placeholder="Search by order ID or customer..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select 
          v-model="sortBy"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="oldest">Sort by: Oldest First</option>
          <option value="newest">Sort by: Newest First</option>
          <option value="highest">Sort by: Highest Value</option>
          <option value="lowest">Sort by: Lowest Value</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="`skeleton-${i}`" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between mb-4">
          <div class="space-y-3 flex-1">
            <div class="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div class="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div class="h-24 bg-gray-100 animate-pulse rounded mb-4"></div>
        <div class="flex gap-2 justify-end">
          <div class="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div class="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredOrders.length === 0" class="bg-white rounded-lg shadow-sm p-16 text-center">
      <i class="bx bx-check-circle text-6xl text-green-300 mb-4 block"></i>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">All Caught Up!</h3>
      <p class="text-gray-500">No pending orders at the moment</p>
    </div>

    <!-- Pending Orders List -->
    <div v-else class="space-y-4">
      <!-- Order Card 1 - Urgent -->
      <div 
        v-for="order in paginatedOrders"
        :key="order.id"
        :class="['bg-white rounded-lg shadow-sm border-l-4 overflow-hidden hover:shadow-lg transition', getUrgencyBorderColor(order.wait_hours)]">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-800">{{ order.order_number }}</h3>
                <span :class="['px-3 py-1 text-xs font-bold rounded-full', getUrgencyBadgeClass(order.wait_hours)]">
                  {{ getUrgencyText(order.wait_hours) }}
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <i class="bx bx-user"></i>
                  <span>{{ order.customer_name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-envelope"></i>
                  <span>{{ order.customer_email }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-phone"></i>
                  <span>{{ order.customer_phone }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-time"></i>
                  <span>{{ formatWaitTime(order.created_at) }}</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">{{ formatPrice(order.total_amount) }}</p>
              <p class="text-sm text-gray-500">{{ order.items.length }} item{{ order.items.length>1 ? 's' : '' }}</p>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Order Items:</h4>
            <div class="space-y-2">
              <div 
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div :class="['w-10 h-10 rounded flex items-center justify-center',  item.product.category.buttonColor || 'bg-gray-100 text-gray-700']">
                    <i :class="['text-xl', item.product.category.icon]"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ item.product_name || item.product?.name }}</p>
                    <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">{{ formatPrice(item.subtotal) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check"></i> Confirm & Process
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-show"></i> View Details
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <i class="bx bx-x"></i> Cancel
            </button>
          </div>
        </div>
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
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { supabase } from '../lib/supabase';
  import Swal from 'sweetalert2';

  const router = useRouter()

  const loading = ref(true)
  const pendingOrders = ref([])
  const searchQuery = ref('')
  const sortBy = ref('oldest')
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const fetchPendingOrders = async () => {
    try {
      loading.value = true

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(id, name, email, phone),
          
          items:order_items(
            id,
            order_id,
            product_id,
            quantity,
            price,
            subtotal,
            
              product:products(
                name, 
                category_id,
            
              category:categories(
                name, 
                icon, 
                buttonColor
              )
            )
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: true })

      if (error) throw error

      // Transform data
      pendingOrders.value = (data || []).map(order => {
        const created = new Date(order.created_at)
        const now = new Date()
        const wait_hours = Math.floor((now - created) / (1000 * 60 * 60))

        return {
          id: order.id,
          order_number: order.order_number,
          invoice_number: order.invoice_number,
          customer_name: order.customer?.name || 'Unknown',
          customer_email: order.customer?.email || '',
          customer_phone: order.customer?.phone || '',
          items: order.items || [],
          total_amount: order.total_amount,
          tracking_number: order.tracking_number,
          status: order.status,
          created_at: order.created_at,
          wait_hours
        }
      })

    } catch (error) {
      console.error('Error fetching pending orders:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Could not fetch pending orders. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      loading.value = false
    }
  }

  const stats = computed(() => {
    const now = new Date()
    const today = now.toDateString()

    const totalPending = pendingOrders.value.length
    const todayCount = pendingOrders.value.filter(o => 
      new Date(o.created_at).toDateString() === today
    ).length
    const urgentCount = pendingOrders.value.filter(o => o.wait_hours >= 4).length
    const totalValue = pendingOrders.value.reduce((sum, o) => sum + o.total_amount, 0)
    
    const avgWaitHours = totalPending > 0 
      ? pendingOrders.value.reduce((sum, o) => sum + o.wait_hours, 0) / totalPending
      : 0
    const avgWaitTime = avgWaitHours < 1 
      ? `${Math.round(avgWaitHours * 60)}m`
      : `${avgWaitHours.toFixed(1)}h`

    return {
      totalPending,
      todayCount,
      urgentCount,
      totalValue,
      avgWaitTime
    }
  })

  const filteredOrders = computed(() => {
    let result = pendingOrders.value

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(o =>
        o.order_number.toLowerCase().includes(query) ||
        o.customer_name.toLowerCase().includes(query) ||
        o.customer_email.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortBy.value === 'newest') {
      result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortBy.value === 'oldest') {
      result = [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sortBy.value === 'highest') {
      result = [...result].sort((a, b) => b.total_amount - a.total_amount)
    } else if (sortBy.value === 'lowest') {
      result = [...result].sort((a, b) => a.total_amount - b.total_amount)
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

  const formatPrice = (price) => {
    if (price >= 1000000000) return `Rp ${(price / 1000000000).toFixed(1)}B`
    if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}M`
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatWaitTime = (dateString) => {
    const created = new Date(dateString)
    const now = new Date()
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else if (diffMins >= 1) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    }
    return 'Just now'
  }

  const getUrgencyBorderColor = (hours) => {
    if (hours >= 6) return 'border-red-500'
    if (hours >= 4) return 'border-orange-500'
    if (hours >= 2) return 'border-yellow-500'
    return 'border-blue-500'
  }

  const getUrgencyBadgeClass = (hours) => {
    if (hours >= 6) return 'bg-red-100 text-red-700'
    if (hours >= 4) return 'bg-orange-100 text-orange-700'
    if (hours >= 2) return 'bg-yellow-100 text-yellow-700'
    return 'bg-blue-100 text-blue-700'
  }

  const getUrgencyText = (hours) => {
    if (hours >= 6) return `URGENT - ${hours}h waiting`
    if (hours >= 4) return `${hours}h waiting`
    if (hours >= 2) return `${hours}h waiting`
    if (hours >= 1) return `${hours}h waiting`
    return `${Math.round(hours * 60)}m waiting`
  }

  const getCategoryIcon = (category) => categoryIcons[category] || 'bx bx-package'
  const getCategoryIconBg = (category) => categoryIconBg[category] || 'bg-gray-100 text-gray-600'

  onMounted(() => {
    fetchPendingOrders()
  })
</script>