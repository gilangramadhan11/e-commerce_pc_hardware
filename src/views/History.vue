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
      <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Total Transactions</h3>
          <i class="bx bx-history text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ totalTransactions }}</p>
        <p class="text-xs opacity-75 mt-2">Transactions</p>
      </div>

      <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Total Stock In</h3>
          <i class="bx bx-package text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ stockIn }}</p>
        <p class="text-xs opacity-75 mt-2">Transactions</p>
      </div>

      <div class="bg-linear-to-br from-red-500 to-red-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Total Stock Out</h3>
          <i class="bx bx-package text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ stockOut }}</p>
        <p class="text-xs opacity-75 mt-2">Transactions</p>
      </div>

      <div class="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Today</h3>
          <i class="bx bx-calendar text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">{{ todayTransactions }}</p>
        <p class="text-xs opacity-75 mt-2">Transactions</p>
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
      <div class=" relative">
        <select 
          v-model="selectedType"
          class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">All Types</option>
          <option value="critical">Stock In</option>
          <option value="low">Stock Out</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="loading">
              <tr v-for="i in 6" :key="`skeleton-${i}`">
                <td class="px-6 py-4">
                  <div class="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>  
                </td>
                <td class="px-6 py-4">
                  <div class="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-26 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="h-8 w-16 bg-gray-200 animate-pulse rounded mx-auto"></div>
                </td>
              </tr>
            </template>
            <template v-else-if="paginatedHistory.length > 0">
              <tr v-for="record in paginatedHistory" :key="record.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(record.created_at) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.products?.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.products?.categories?.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="record.type === 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ record.type === 'IN' ? 'Stock In' : 'Stock Out' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.notes || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button @click="viewRecord(record)" class="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="7" class="px-6 py-8 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <i class="bx bx-inbox text-4xl text-gray-300 mb-2"></i>
                    <p class="text-gray-600 font-medium">No stock in records yet</p>
                    <p class="text-gray-500 text-sm mt-1">Click "Add Stock In" button to start recording</p>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="!loading && filteredHistory.length > 0" class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Showing <span class="font-semibold">{{ startIndex + 1 }}</span> to 
        <span class="font-semibold">{{ Math.min(endIndex, filteredHistory.length) }}</span> of 
        <span class="font-semibold">{{ filteredHistory.length }}</span> results
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

    <Modal :isOpen="showViewModal" title="Stock Detail" :showFooter="false" @close="closeViewModal">
      <div class="grid grid-cols-1 gap-4">
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Date</div>
          <div class="font-medium">{{ formatDate(selectedRecord?.created_at) }}</div>
        </div>
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Product</div>
          <div class="font-medium">{{ selectedRecord?.products?.name || '-' }}</div>
        </div>
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Category</div>
          <div class="font-medium">{{ selectedRecord?.products?.categories?.name || '-' }}</div>
        </div>
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Type</div>
          <div class="font-medium">{{ selectedRecord?.type === 'IN' ? 'Stock In' : 'Stock Out' }}</div>
        </div>
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Quantity</div>
          <div class="font-medium">{{ selectedRecord?.quantity ?? '-' }}</div>
        </div>
        <div class="flex justify-between">
          <div class="text-sm text-gray-500">Notes</div>
          <div class="font-medium">{{ selectedRecord?.notes || '-' }}</div>
        </div>
        <div v-if="selectedRecord?.products?.sku" class="flex justify-between">
          <div class="text-sm text-gray-500">SKU</div>
          <div class="font-medium">{{ selectedRecord?.products?.sku }}</div>
        </div>
        <div v-if="selectedRecord?.products?.price" class="flex justify-between">
          <div class="text-sm text-gray-500">Price</div>
          <div class="font-medium">{{ formatPrice(selectedRecord?.products?.price) }}</div>
        </div>
      </div>
    </Modal>

  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'
import Swal from 'sweetalert2'
import Modal from '../components/Modal.vue'

const loading = ref(true)
const showViewModal = ref(false)
const products = ref([])
const categories = ref([])
const stockHistory = ref([])
const supplierList = ref([])
const selectedRecord = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedType = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Format price to IDR
const formatPrice = (price) => {
  if (price == null) return '-'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const formatDate = (val) => {
  if (!val) return '-'
  const d = new Date(val)
  return d.toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// Fetch categories from database
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    categories.value = data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Fetch products from database
const fetchProducts = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .order('name', { ascending: true })

    if (error) throw error
    products.value = data || []

  } catch (error) {
    console.error('Error fetching products:', error)
    Swal.fire({
      icon: 'error',
      title: 'Failed to Load',
      text: 'Could not fetch products. Please try again.',
      confirmButtonColor: '#3B82F6'
    })
  } finally {
    loading.value = false
  }
}

// Fetch stock history
const fetchStockHistory = async () => {
  try {
    const { data, error } = await supabase
      .from('stock_movements')
      .select('*, products(*, categories(*))')
      .order('created_at', { ascending: false })

    if (error) throw error
    stockHistory.value = data || []
  } catch (error) {
    console.error('Error fetching stock history:', error)
  }
}

// filtered history based on search and filters
const filteredHistory = computed(() => {
  let result = [...stockHistory.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(record =>
      record.products?.name?.toLowerCase().includes(query) ||
      record.products?.description?.toLowerCase().includes(query) ||
      record.products?.categories?.name?.toLowerCase().includes(query) ||
      record.type.toLowerCase().includes(query)
    )
  }
  if (selectedCategory.value) {
    result = result.filter(record => record.products?.category_id === selectedCategory.value)
  }
  if (selectedType.value) {
    if (selectedType.value === 'critical') {
      result = result.filter(record => record.type === 'IN')
    } else if (selectedType.value === 'low') {
      result = result.filter(record => record.type === 'OUT')
    }
  }
  return result
})

  // Pagination
  const totalPages = computed(() => Math.ceil(filteredHistory.value.length / itemsPerPage.value))
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
  const endIndex = computed(() => currentPage.value * itemsPerPage.value)
  const paginatedHistory = computed(() => filteredHistory.value.slice(startIndex.value, endIndex.value))

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

  const viewRecord = (record) => {
    selectedRecord.value = record
    showViewModal.value = true
  }

  const closeViewModal = () => {
    showViewModal.value = false
    selectedRecord.value = null
  }

  const totalTransactions = computed(() => stockHistory.value.length)
  const stockIn = computed(() => stockHistory.value.filter(r => r.type === 'IN').length)
  const stockOut = computed(() => stockHistory.value.filter(r => r.type === 'OUT').length)
  const todayTransactions = computed(() => {
    const today = new Date().toDateString()
    return stockHistory.value.filter(r => new Date(r.created_at).toDateString() === today).length
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  watch([searchQuery, selectedCategory, selectedType], () => {
    currentPage.value = 1
  })

  onMounted(async () => {
    await fetchCategories()
    await fetchProducts()
    await fetchStockHistory()
  })
</script>
  