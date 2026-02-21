//ngoding di laptop
<template>
  <div class="pr-8 pl-8 pt-8 pb-0">
    <div class="flex items-center justify-between mb-8">
      <div class="relative">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Products List</h1>
        <p class="text-gray-600 mt-1">Manage your PC hardware inventory</p>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <button class="flex items-center bg-green-600 gap-2 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
        <RouterLink 
          to="/products/create" 
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          Add Products
        </RouterLink>
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
        v-model="selectedStatus"
        class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
        <option value="">Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
    </div>
  </div>

  <div 
    v-if="searchQuery || selectedCategory || selectedStatus" 
    class="bg-blue-50 rounded-lg p-4 mb-4 flex items-center justify-between shadow-sm">
      <p class="text-sm text-gray-600">
        Found <span class="font-bold text-indigo-600">{{ sortedProducts.length }}</span> products 
        <span v-if="searchQuery"> matching "<span class="font-sembold"> {{ searchQuery }}</span>"</span>
      </p>
      <button 
        @click="clearFilter"
        class="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
        <i class="bx bx-x"></i> Clear Filter
      </button>
  </div>
  
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200 text-center">
          <tr>
            <th 
              @click="setSort('name')"
              class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center gap-1">  
                Products <i :class="['text-sm',getSortIcon('name')]"></i>
              </div>
            </th>
            <th 
              @click="setSort('category')"
              class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center gap-1">
                Category <i :class="['text-sm',getSortIcon('category')]"></i>
              </div>
            </th>
            <th 
              @click="setSort('price')"
              class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center gap-1">
                Price <i :class="['text-sm',getSortIcon('price')]"></i>
              </div>
            </th>
            <th 
              @click="setSort('stock')"
              class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center gap-1">
                Stock <i :class="['text-sm',getSortIcon('stock')]"></i>
              </div>
            </th>
            <th 
              @click="setSort('status')"
              class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center gap-1">
                Status <i :class="['text-sm',getSortIcon('status')]"></i>
              </div>
            </th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="loading">
            <tr v-for="i in 8" :key="`skeleton-${i}`">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-4">
                  <div class="h-10 w-10 rounded bg-gray-200 animate-pulse"></div>
                  <div class="space-y-2">
                    <div class="h-3 w-36 bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="h-6 w-16 bg-gray-200 animate-pulse rounded-full mx-auto"></div>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="h-3 w-24 bg-gray-200 animate-pulse rounded mx-auto"></div>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="h-3 w-8 bg-gray-200 animate-pulse rounded mx-auto"></div>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="h-6 w-20 bg-gray-200 animate-pulse rounded-full mx-auto"></div>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <div class="h-7 w-14 bg-gray-200 animate-pulse rounded-full"></div>
                  <div class="h-7 w-14 bg-gray-200 animate-pulse rounded-full"></div>
                  <div class="h-7 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </td>
            </tr>
          </template>

          <template v-else-if="sortedProducts.length === 0">
            <tr>
              <td colspan="6" class="px-6 py-16 text-center">
                <i class="bx bx-search-alt text-6xl text-gray-300 mb-4 block"></i>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p class="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button @click="clearFilter" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Clear all filters
                </button>
              </td>
            </tr>
          </template>
          
          <template v-else>
            <tr 
              v-for="product in paginateProducts"
              :key="product.id"
              class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-white rounded flex items-center justify-center mr-5">
                    <img :src="product.image" class="object-cover w-10 h-10" alt="">
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.description}}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', product.categories?.buttonColor || 'bg-gray-100 text-gray-700']">{{product.categories?.name}}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{formatPrice(product.price)}}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{ product.stock }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  :class="['px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full', statusClass(product.status)]">
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center text-xs font-medium justify-center">
                  <RouterLink 
                    :to="`/products/view/${product.id}`"
                    class="flex items-center px-3 py-1 gap-2 text-gray-600 hover:text-gray-600 cursor-pointer"> 
                    <i class="bx bx-show text-xl"></i>
                  </RouterLink>
                  <RouterLink 
                    :to="`/products/edit/${product.id}`"
                    class="flex items-center px-3 py-1 gap-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                    <i class="bx bx-edit text-xl"></i>
                  </RouterLink>
                  <button 
                    @click="deleteProduct(product)"
                    class="flex items-center px-3 py-1 gap-2 text-red-600 hover:text-red-700 cursor-pointer">
                    <i class="bx bx-trash text-xl"></i>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    
    <div class="mt-6 flex items-center justify-between">
      <template v-if="loading">
        <div class="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
        <div class="flex gap-1">
          <div v-for="i in 5" :key="i" class="h-8 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </template>
      
      <template v-else-if="sortedProducts.length > 0" class="mt-6 flex items-center justify-between">
        <p class="text-sm text-gray-700">
          Showing <span class="font-semibold">{{ startIndex + 1 }}</span> to 
          <span class="font-semibold">{{ Math.min(endIndex, sortedProducts.length) }}</span> of 
          <span class="font-semibold">{{ sortedProducts.length }}</span> results
        </p>
        <div class="flex gap-1">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"  
            :class="['flex items-center px-4 py-1 rounded border border-gray-300 shadow hover:bg-gray-50', currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300']">
            <i class="bx bx-chevron-left text-xl"></i>
          </button>
          <button 
            v-for="page in visiblePage"
            :key="page"
            @click="currentPage = page"
            :class="['flex items-center px-3 py-1 rounded border shadow hover:bg-gray-50', currentPage === page ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
            : 'border-gray-300']"
          >
            {{ page }}
          </button>
          <button 
            @click="nextPage"
            :disabled="currentPage === totalPage"  
            :class="['flex items-center px-4 py-1 rounded border border-gray-300 shadow hover:bg-gray-50', currentPage === totalPage ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300']"
            >
            <i class="bx bx-chevron-right text-xl"></i>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { supabase } from '../../lib/supabase'
  import { deleteImageFromStorage } from '../../lib/storageHelpers'
  import Swal from 'sweetalert2'

  const products = ref([])
  const searchQuery = ref("")
  const selectedStatus = ref ('')
  const selectedCategory = ref ('')
  const sortField = ref('')
  const sortDirection = ref('asc')
  const currentPage = ref(1)
  const perPage = ref (5)
  const loading = ref(true)

  const categories = ref([])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')

    categories.value = data
  }

  const fetchProducts = async () => {
    try {
      loading.value = true
      const { data, error } = await supabase
        .from('products')
        .select(`*, categories(*)`)
        .order('created_at', { ascending: false})
      if(error) throw error
      
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
  
  function setSort(field) {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    }else{
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  function getSortIcon(field){
    if (sortField.value !== field) return 'bx bx-sort'

    return sortDirection.value === 'asc'
    ? 'bx bx-chevron-up'
    : 'bx bx-chevron-down'
  }

  const sortedProducts = computed(() => {
    let result = [...products.value]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()

      result = result.filter(products => {
        return (
          products.name?.toLowerCase().includes(query) ||
          products.description?.toLowerCase().includes(query) ||
          products.categories?.name?.toLowerCase().includes(query) ||
          products.status?.toLowerCase().includes(query) ||
          products.price?.toString().includes(query) ||
          products.stock?.toString().includes(query)
        )
      }) 
    }

    if (selectedStatus.value){
      result = result.filter(products => 
        products.status === selectedStatus.value
      )
    }

    if (selectedCategory.value){
      result = result.filter(products => 
        products.category_id === selectedCategory.value
      )
    }

    if(sortField.value){
      result.sort((a, b)=>{
        let valueA 
        let valueB 

        if (sortField.value === 'category') {
          valueA = a.categories?.name || ''
          valueB = b.categories?.name || ''
        } else {
          valueA = a[sortField.value]
          valueB = b[sortField.value]
        }

        if(typeof valueA === 'string'){
          return sortDirection.value === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
        }

        return sortDirection.value === 'asc'
        ? valueA - valueB
        : valueB - valueA
      })
    }

    return result
  })

  const totalPage = computed(()=> {
    return Math.ceil(sortedProducts.value.length / perPage.value)
  })

  const startIndex = computed(()=>{
    return (currentPage.value - 1) * perPage.value
  })

  const endIndex = computed(()=>{
    return currentPage.value * perPage .value
  })

  const paginateProducts = computed (()=>{
    return sortedProducts.value.slice(startIndex.value, endIndex.value)
  })

  const visiblePage = computed (()=>{
    const pages = []
    const total = totalPage.value
    const current = currentPage.value

    if (total <= 5) {
      for (let i = 1; i <= total; i++){
        pages.push(i)
      }
    }else{
      if (current <= 3) {
        pages.push(1,2,3,4,5)
      }else if(current >= total - 2) {
        for (let i = total - 4; i <= total; i++){
          pages.push(i)
        }
      }else {
        for (let i = current - 2; i <= current + 2; i++){
          pages.push(i)
        }
      }
    }

    return pages
  })
  
  const deleteProduct = async (product) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `
        <div class="text-center">
          <p class="mb-2">Do you want to delete: <strong>${product.name}</strong></p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })
    
    if (result.isConfirmed) {
      try {
        // Show loading
        Swal.fire({
          title: 'Deleting...',
          html: 'Please wait while we delete the product and its image.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        // 1. Delete image from Supabase Storage (if exists)
        if (product.image && product.image.includes('supabase')) {
          const imageResult = await deleteImageFromStorage(product.image)
          
          if (!imageResult.success) {
            console.warn('Image deletion warning:', imageResult.error)
            // Continue to delete product even if image deletion fails
          }
        }

        // 2. Delete product from database
        const { error: dbError } = await supabase
          .from('products')
          .delete()
          .eq('id', product.id)

        if (dbError) throw dbError
        products.value = products.value.filter(p => p.id !== product.id)
        // Success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          html: `
            <p><strong>${product.name}</strong> has been deleted.</p>
            <p class="text-sm text-gray-600 mt-2">Product and image removed from storage.</p>
          `,
          confirmButtonColor: '#3B82F6',
          timer: 3000
        })

      } catch (error) {
        console.error('Error deleting product:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete product. Please try again.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  }

  const clearFilter = () => {
    searchQuery.value = ''
    selectedCategory.value = ''
    selectedStatus.value = ''
    currentPage.value = 1
  }

  const nextPage = () => {
    if (currentPage.value < totalPage.value){
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1){
      currentPage.value--
    }
  }

  watch([searchQuery, selectedCategory, selectedStatus], ()=>{
    currentPage.value = 1
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigitsL: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const statusColor = {
    "In Stock": "bg-green-100 text-green-700",
    "Low Stock": "bg-yellow-100 text-yellow-700",
    "Out of Stock": "bg-red-100 text-red-700"
  }

  const statusClass = (status) => {
    return statusColor[status] || "bg-gray-100 text-gray-700"
  }
  
  onMounted(() => {
    fetchProducts()
  })

  onMounted(() => {
    fetchCategories()
  })
</script>