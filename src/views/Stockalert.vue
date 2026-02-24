<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Stock Alert</h1>
        <p class="text-gray-600 mt-1">Monitor and manage low stock product</p>
      </div>
      <button class="flex items-center gap-2 border border-gray-200 text-gray-600 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <i class="bx bx-save text-xl"></i>
        Export
      </button>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="i in 4" :key="`stat-skeleton-${i}`" class="p-6 rounded-lg shadow-md bg-gray-200 animate-pulse h-32"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-linear-to-br from-red-500 to-red-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Critical Stock</h3>
          <i class="bx bx-error-circle text-3xl opacity-75"></i>
        </div>
        <p class="3xl font-bold">{{ stats.critical }}</p>
        <p class="text-xs opacity-75 mt-2">Below 5 Units</p>
      </div>

      <div class="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Low Stock</h3>
          <i class="bx bx-error text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ stats.low }}</p>
        <p class="text-xs opacity-75 mt-2">Below 10 units</p>
      </div>

      <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Need Restock</h3>
          <i class="bx bx-package text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ stats.needRestock }}</p>
        <p class="text-xs opacity-75 mt-2">Total alerts</p>
      </div>

      <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">On Order</h3>
          <i class="bx bx-cart text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ stats.onOrder }}</p>
        <p class="text-xs opacity-75 mt-2">Being restocked</p>
      </div>
    </div>

    <div class="py-4 rounded-lg mb-6 flex gap-4">
      <div class="relative flex-1 max-w-sm">
        <input
          v-model="searchQuery" 
          type="text"
          placeholder="Search products..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select 
          v-model="selectedAlert"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">All Alerts</option>
          <option value="critical">Critical (< 5)</option>
          <option value="low">Low (< 10)</option>
          <option value="medium">Medium (< 20)</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="relative">
        <select 
          v-model="selectedCategory"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">All Category</option>
          <option 
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="loading">
              <tr v-for="i in 6" :key="`skeleton-${i}`">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-200 animate-pulse rounded"></div>
                    <div class="space-y-2">
                      <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                      <div class="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-8 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-8 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                </td>
              </tr>
            </template>
            
            <template v-else-if="filteredProducts.length === 0">
              <tr>
                <td colspan="7" class="px-6 py-16 text-center">
                  <i class="bx bx-package text-6xl text-gray-300 mb-4 block"></i>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">No stock alerts</h3>
                  <p class="text-gray-500">All products are well-stocked</p>
                </td>
              </tr>
            </template>
            
            <template v-else>
              <tr 
                v-for="product in paginatedProducts"
                :key="product.id"
                :class="getRowClass(product.stock)"
                class="transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div :class="['w-10 h-10 rounded flex items-center justify-center mr-3', product.categories?.buttonColor || 'bg-gray-100 text-gray-700']">
                      <i :class="['text-xl', product.categories?.icon]"></i>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{product.name}}</div>
                      <div class="text-sm text-gray-500">{{ product.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-2 py-1 text-xs font-medium rounded', product.categories?.buttonColor]">{{ product.categories?.name }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['text-lg font-bold', getStockColor(product.stock)]">{{ product.stock }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ product.min_stock || 10}}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full flex items-center gap-1 w-fit', getStatusClass(product)]">
                    <i :class="getStatusIcon(product)"></i>
                    {{ getStatusText(product) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDate(product.updated_at) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                    Restock Now
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="!loading && filteredProducts.length > 0" class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Showing <span class="font-semibold">{{ startIndex + 1 }}</span> to 
        <span class="font-semibold">{{ Math.min(endIndex, filteredProducts.length) }}</span> of 
        <span class="font-semibold">{{ filteredProducts.length }}</span> results
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
  import { ref, computed, watch, onMounted } from 'vue'
  import { supabase } from '../lib/supabase'
  import Swal from 'sweetalert2'

  const loading = ref(true)
  const products = ref([])
  const categories = ref([])
  const selectedCategory = ref('')
  const searchQuery = ref('')
  const selectedAlert = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const fetchData = async () => {
    try {
      loading.value = true

      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name, icon, buttonColor')
        .order('name')

      categories.value = categoriesData || []

      // Fetch low stock products (stock < 20)
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .lt('stock', 20)
        .order('stock', { ascending: true })

      if (error) throw error

      products.value = (productsData || []).map(p => ({
        ...p,
        min_stock: p.min_stock || 10,
        restock_status: p.stock < 5 ? 'critical' : p.stock < 10 ? 'low' : 'medium'
      }))

    } catch (error) {
      console.error('Error fetching data:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Could not fetch stock alerts.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      loading.value = false
    }
  }

  const stats = computed(() => {
    const critical = products.value.filter(p => p.stock < 5).length
    const low = products.value.filter(p => p.stock >= 5 && p.stock < 10).length
    const needRestock = products.value.filter(p => p.stock < 20).length
    const onOrder = 0 // This would come from a separate orders table

    return { critical, low, needRestock, onOrder }
  })

  const filteredProducts = computed(() => {
  let result = [...products.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(products =>
      products.name?.toLowerCase().includes(query) ||
      products.description?.toLowerCase().includes(query) ||
      products.categories?.name?.toLowerCase().includes(query)
    )
  }

  // Alert level filter
  if (selectedAlert.value === 'critical') {
      result = result.filter(p => p.stock < 5)
    } else if (selectedAlert.value === 'low') {
      result = result.filter(p => p.stock >= 5 && p.stock < 10)
    } else if (selectedAlert.value === 'medium') {
      result = result.filter(p => p.stock >= 10 && p.stock < 20)
    }

    // Category filter
    if (selectedCategory.value) {
      result = result.filter(products => products.category_id === selectedCategory.value)
    }

    return result
  })

  // Pagination
  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
  const endIndex = computed(() => currentPage.value * itemsPerPage.value)
  const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))

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

  const getRowClass = (stock) => {
    if (stock < 5) return 'hover:bg-red-50 bg-red-50/50'
    if (stock < 10) return 'hover:bg-yellow-50 bg-yellow-50/50'
    return 'hover:bg-blue-50 bg-blue-50/30'
  }

  const getIconBg = (stock) => {
    if (stock < 5) return 'bg-red-100'
    if (stock < 10) return 'bg-yellow-100'
    return 'bg-blue-100'
  }

  const getIconColor = (stock) => {
    if (stock < 5) return 'text-red-600'
    if (stock < 10) return 'text-yellow-600'
    return 'text-blue-600'
  }

  const getStockColor = (stock) => {
    if (stock < 5) return 'text-red-600'
    if (stock < 10) return 'text-yellow-600'
    return 'text-blue-600'
  }

  const getStatusClass = (product) => {
    if (product.stock < 5) return 'bg-red-100 text-red-800'
    if (product.stock < 10) return 'bg-yellow-100 text-yellow-800'
    return 'bg-blue-100 text-blue-800'
  }

  const getStatusIcon = (product) => {
    if (product.restock_status === 'on_order') return 'bx bx-loader-circle bx-spin'
    if (product.stock < 5) return 'bx bx-error-circle'
    if (product.stock < 10) return 'bx bx-error'
    return 'bx bx-package'
  }

  const getStatusText = (product) => {
    if (product.restock_status === 'on_order') return 'On Order'
    if (product.stock < 5) return 'Critical'
    if (product.stock < 10) return 'Low Stock'
    return 'Need Restock'
  }

  const getActionButtonClass = (stock) => {
    if (stock < 5) return 'bg-blue-600 hover:bg-blue-700'
    if (stock < 10) return 'bg-yellow-600 hover:bg-yellow-700'
    return 'bg-green-600 hover:bg-green-700'
  }

  const getActionButtonText = (stock) => {
    if (stock < 5) return 'Restock Now'
    if (stock < 10) return 'Order Stock'
    return 'Plan Restock'
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('id-ID')
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  watch([searchQuery, selectedAlert, selectedCategory], () => {
    currentPage.value = 1
  })

  onMounted(() => {
    fetchData()
  })
</script>