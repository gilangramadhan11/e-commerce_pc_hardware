<template>
  <div class="pr-8 pl-8 pt-8 pb-0">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Stock In</h1>
        <p class="text-gray-600 mt-1">Monitor and manage stock in product</p>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <button 
          @click="openModal()"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          Add Stock In
        </button>
      </div>
    </div>

      <div class="bg-white rounded-lg py-4 gap-4 flex mb-6">
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
            <option value="">
              All Category
            </option>
            <option 
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id">
            {{ cat.name }}
            </option>
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
      </div>
      
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
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
                    <div class="h-4 w-8 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="h-4 w-26 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="h-8 w-16 bg-gray-200 animate-pulse rounded mx-auto"></div>
                  </td>
                </tr>
              </template>
              
              <template v-else-if="filteredStockInHistory.length > 0">
                <tr v-for="item in filteredStockInHistory" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ formatDate(item.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ item.products?.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ item.products?.categories?.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ item.quantity }} units
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ item.supplier || '-' }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {{ item.notes || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="openViewModal(item)"
                        class="flex items-center px-3 py-1 gap-2 text-blue-600 hover:text-blue-700 cursor-pointer hover:bg-blue-50 rounded">
                        <i class="bx bx-show text-xl"></i>
                      </button>
                      <button 
                        @click="deleteStockIn(item)"
                        class="flex items-center px-3 py-1 gap-2 text-red-600 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded">
                        <i class="bx bx-trash text-xl"></i>
                      </button>
                    </div>
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

      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="bx bx-plus-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800">
                  {{ isViewMode ? 'View Stock In' : (isEditing ? 'Edit Stock In' : 'Add Stock In') }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ isViewMode ? 'Read-only stock details' : 'Record incoming inventory' }}
                </p>
              </div>
            </div>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-lg">
              <i class="bx bx-x text-xl text-gray-500"></i>
            </button>
          </div>

          <div class="p-6 space-y-5">

            <!-- Product Select -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">
                Product <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.product_id"
                @change="onProductChange"
                :disabled="isViewMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">-- Select Product --</option>
                <optgroup v-for="cat in categories" :key="cat.id" :label="cat.name">
                  <option
                    v-for="product in getProductsByCategory(cat.name)"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.name }} — Stock: {{ product.stock }}
                  </option>
                </optgroup>
              </select>
            </div>

            <!-- Selected Product Info Card -->
            <div v-if="selectedProduct" class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-200">
              <div class="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200">
                <img
                  v-if="selectedProduct.image"
                  :src="selectedProduct.image"
                  class="w-full h-full object-cover"
                  @error="e => e.target.style.display='none'"
                >
                <div v-else class="w-full h-full flex items-center justify-center">
                  <i class="bx bx-box text-2xl text-gray-300"></i>
                </div>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-800">{{ selectedProduct.name }}</p>
                <p class="text-sm text-gray-500">{{ selectedProduct.category }} • SKU: {{ selectedProduct.sku || 'N/A' }}</p>
                <p class="text-sm text-gray-600 mt-1">Selling Price: <span class="font-medium">{{ formatPrice(selectedProduct.price) }}</span></p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">{{ isViewMode ? 'Adding Stock' : 'Current Stock' }}</p>
                <p :class="['text-2xl font-bold',!isViewMode && selectedProduct.stock < 5 ? 'text-red-600' : !isViewMode && selectedProduct.stock < 10 ? 'text-yellow-600' : 'text-gray-800']">
                  {{  isViewMode ? '+' + form.quantity : selectedProduct.stock }}
                </p>
                <p class="text-xs text-gray-400">units</p>
              </div>
            </div>

            <!-- Stock Preview -->
            <div v-if="!isViewMode && selectedProduct && form.quantity" class="grid grid-cols-3 gap-3">
              <div class="bg-gray-50 border rounded-xl p-4 text-center">
                <p class="text-xs text-gray-500 mb-1">Stock Before</p>
                <p class="text-2xl font-bold text-gray-600">{{ selectedProduct.stock }}</p>
              </div>
              <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p class="text-xs text-gray-500 mb-1">Adding</p>
                <p class="text-2xl font-bold text-green-600">+{{ form.quantity }}</p>
              </div>
              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p class="text-xs text-gray-500 mb-1">New Stock</p>
                <p class="text-2xl font-bold text-blue-600">{{ selectedProduct.stock + (form.quantity || 0) }}</p>
              </div>
            </div>

            <!-- Row: Quantity + Cost Per Unit -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Cost per Unit (Rp)</label>
                <input
                  v-model.number="form.cost_per_unit"
                  type="number"
                  min="0"
                  placeholder="Purchase price per unit"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>
            </div>

            <!-- Total Cost Preview -->
            <div v-if="form.quantity && form.cost_per_unit" class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <span class="text-sm font-medium text-green-800">Total Purchase Cost:</span>
              <span class="text-lg font-bold text-green-700">{{ formatPrice(form.quantity * form.cost_per_unit) }}</span>
            </div>

            <!-- Row: Supplier + Reference -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Supplier</label>
                <div class="relative">
                  <input
                    v-model="form.supplier"
                    type="text"
                    list="suppliers-list"
                    placeholder="Supplier name"
                    :disabled="isViewMode"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                  <datalist id="suppliers-list">
                    <option v-for="s in supplierList" :key="s" :value="s">{{ s }}</option>
                  </datalist>
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Reference Number</label>
                <input
                  v-model="form.reference_number"
                  type="text"
                  placeholder="PO-2024-001"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="Additional notes about this stock in..."
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none disabled:bg-gray-50 disabled:text-gray-500"
                :disabled="isViewMode"
              ></textarea>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
            <button
              v-if="!isViewMode"
              @click="submitForm"
              :disabled="saving || !form.product_id || !form.quantity || form.quantity < 1"
              class="flex-1 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i v-if="saving" class="bx bx-loader-circle bx-spin text-lg"></i>
              <i v-else class="bx bx-check-circle text-lg"></i>
              {{ saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Confirm Stock In') }}
            </button>
            <button
              @click="closeModal"
              class="flex-1 px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 font-medium"
            >
              {{ isViewMode ? 'Close' : 'Cancel' }}
            </button>
          </div>
          
        </div>
      </div>
    </div>

</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { supabase } from '../lib/supabase'
  import Swal from 'sweetalert2'

  // State
  const loading = ref(true)
  const showModal = ref(false)
  const editingId = ref(null)
  const saving = ref(false)
  const selectedProduct = ref(null)
  const isEditing = ref(false)
  const isViewMode = ref(false)
  
  // Data
  const products = ref([])
  const categories = ref([])
  const stockInHistory = ref([])
  const supplierList = ref([])

  // Filters
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedDateRange = ref('')

  // Form
  const form = ref({
    product_id: '',
    type: 'IN',
    quantity: null,
    cost_per_unit: null,
    supplier: '',
    reference_number: '',
    notes: ''
  })

  // Default form state
  const defaultForm = () => ({
    product_id: '',
    type: 'IN',
    quantity: null,
    cost_per_unit: null,
    supplier: '',
    reference_number: '',
    notes: ''
  })

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
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
      
      // Extract unique suppliers from stock in history
      await fetchSuppliers()
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

  // Fetch stock in history
  const fetchStockInHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('stock_movements')
        .select('*, products(*, categories(*))')
        .eq('type', 'IN')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      stockInHistory.value = data || []
    } catch (error) {
      console.error('Error fetching stock in history:', error)
    }
  }

  // Fetch unique suppliers
  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('stock_movements')
        .select('supplier')
        .neq('supplier', null)
      
      if (error) throw error
      
      const uniqueSuppliers = [...new Set(data?.map(item => item.supplier) || [])]
      supplierList.value = uniqueSuppliers.filter(s => s)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    }
  }

  // Get products by category
  const getProductsByCategory = (categoryName) => {
    return products.value.filter(product => 
      product.categories?.name === categoryName
    )
  }

  // Handle product selection change
  const onProductChange = () => {
    if (form.value.product_id) {
      selectedProduct.value = products.value.find(p => p.id === form.value.product_id) || null
    } else {
      selectedProduct.value = null
    }
  }

  // Submit form for add/edit
  const submitForm = async () => {
    if (!form.value.product_id || !form.value.quantity || form.value.quantity < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in product and quantity',
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    saving.value = true
    try {
      const payload = {
        product_id: form.value.product_id,
        type: 'IN',
        quantity: form.value.quantity,
        cost_per_unit: form.value.cost_per_unit || 0,
        supplier: form.value.supplier || null,
        reference_number: form.value.reference_number || null,
        notes: form.value.notes || null,
        created_at: new Date().toISOString()
      }

      let response
      if (isEditing.value) {
        // Update existing stock in record
        response = await supabase
          .from('stock_movements')
          .update({
            quantity: payload.quantity,
            cost_per_unit: payload.cost_per_unit,
            supplier: payload.supplier,
            reference_number: payload.reference_number,
            notes: payload.notes
          })
          .eq('id', editingId.value)

        if (response.error) throw response.error

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Stock in record has been updated successfully',
          confirmButtonColor: '#3B82F6'
        })
      } else {
        // Insert new stock in record
        response = await supabase
          .from('stock_movements')
          .insert([payload])

        if (response.error) throw response.error

        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', payload.product_id)
          .single()

        if (productError) throw productError

        // Update stock
        const { error: updateError } = await supabase
          .from('products')
          .update({
            stock: product.stock + payload.quantity
          })
          .eq('id', payload.product_id)

        if (updateError) throw updateError

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Stock in has been recorded successfully',
          confirmButtonColor: '#3B82F6'
        })
      }

      // Refresh data
      await fetchStockInHistory()
      await fetchProducts()
      await fetchSuppliers()
      closeModal()
    } catch (error) {
      console.error('Error submitting form:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to save stock in record. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      saving.value = false
    }
  }

  // Open modal for add or edit
  const openModal = (record = null) => {
    if (record) {
      // Edit mode
      isEditing.value = true
      isViewMode.value = true
      editingId.value = record.id
      selectedProduct.value = record.products || null
      form.value = {
        product_id: record.product_id,
        type: 'IN',
        quantity: record.quantity,
        cost_per_unit: record.cost_per_unit,
        supplier: record.supplier,
        reference_number: record.reference_number,
        notes: record.notes
      }
    } else {
      // Add mode
      isEditing.value = false
      isViewMode.value = false
      editingId.value = null
      selectedProduct.value = null
      form.value = defaultForm()
    }
    showModal.value = true
  }

  // View modal with record details
  const openViewModal = (record) => {
    isViewMode.value = true
    isEditing.value = false
    editingId.value = record.id
    selectedProduct.value = record.products || null
    form.value = {
      product_id: record.product_id,
      type: 'IN',
      quantity: record.quantity,
      cost_per_unit: record.cost_per_unit,
      supplier: record.supplier,
      reference_number: record.reference_number,
      notes: record.notes
    }
    showModal.value = true
  }

  // Close modal
  const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
    form.value = defaultForm()
    editingId.value = null
    isEditing.value = false
    isViewMode.value = false
  }

  // Filter stock in history
  const filteredStockInHistory = computed(() => {
    let result = [...stockInHistory.value]

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(item => 
        item.products?.name?.toLowerCase().includes(query) ||
        item.supplier?.toLowerCase().includes(query) ||
        item.reference_number?.toLowerCase().includes(query) ||
        item.notes?.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory.value) {
      result = result.filter(item => 
        item.products?.category_id === selectedCategory.value
      )
    }

    // Date range filter
    if (selectedDateRange.value) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const itemDate = (item) => {
        const date = new Date(item.created_at)
        date.setHours(0, 0, 0, 0)
        return date
      }

      if (selectedDateRange.value === 'today') {
        result = result.filter(item => itemDate(item).getTime() === today.getTime())
      } else if (selectedDateRange.value === 'week') {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        result = result.filter(item => itemDate(item).getTime() >= weekAgo.getTime())
      } else if (selectedDateRange.value === 'month') {
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        result = result.filter(item => itemDate(item).getTime() >= monthAgo.getTime())
      }
    }

    return result
  })

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Delete stock in record
  const deleteStockIn = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Stock In Record',
      text: `Are you sure you want to delete the stock in record for ${item.products?.name}?`,
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    })

    if (!result.isConfirmed) return

    try {
      const { error } = await supabase
        .from('stock_movements')
        .delete()
        .eq('id', item.id)

      if (error) throw error

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Stock in record has been deleted successfully',
        confirmButtonColor: '#3B82F6'
      })

      // Refresh data
      await fetchStockInHistory()
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting stock in:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to delete stock in record. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }

  // Initialize on mount
  onMounted(async () => {
    await fetchCategories()
    await fetchProducts()
    await fetchStockInHistory()
  })
</script>