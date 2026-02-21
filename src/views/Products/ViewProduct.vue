<template>
  <div class="p-8">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Loading product details...</p>
      </div>
    </div>
    <div v-else-if="product">
      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
            <span :class="['px-3 py-1 text-sm font-bold rounded-full', statusClass]">{{ product.status }}
            </span>
          </div>
          <p class="text-gray-600">Product Details</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="goBack" 
            class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="bx bx-arrow-back text-xl"></i>
            Back
          </button>
          <button
            @click="editProduct" 
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i class="bx bx-edit text-xl"></i>
            Edit Product
          </button>
          <button
            @click="deleteProduct" 
            class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <i class="bx bx-trash text-xl"></i>
            Delete
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">  
          <div class="bg-white rounded-lg border border-gray-100 shadow p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Image</h3>
            <div class="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                v-if="product.image"
                :src="product.image" 
                :alt="product.image"
                class="w-full h-full object-contain">
              <div v-else class="text-center text-gray-400">
                <i class="bx bx-image text-6xl"></i>
                <p class="text-sm mt-2">No image available</p>
              </div>
            </div>
          </div>
          <div class="bg-white border border-gray-100 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-dollar-circle text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-xs text-gray-600">Price</p>
                    <p class="text-lg font-bold text-green-600">{{ formatPrice(product.price) }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-package text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-xs text-gray-600">Stock</p>
                    <p class="text-lg font-bold text-blue-600">{{ product.stock }} units</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-category text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-xs text-gray-600">Category</p>
                    <p class="text-lg font-bold text-purple-600">{{ product.categories.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-gray-100 shadow p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-info-circle text-blue-600"></i>
              Basic Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Product Name</label>
                <p class="text-gray-900 font-medium">{{ product.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Brand</label>
                <p class="text-gray-900 font-medium">{{ product.brand || '-' }}</p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <p class="text-gray-900">{{ product.description }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">SKU</label>
                <p class="text-gray-900 font-mono">{{ product.sku || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <span 
                  :class="['inline-flex px-3 py-1 text-sm font-medium rounded-full', statusClass]">
                  {{ product.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-dollar-circle text-green-600"></i>
              Pricing & Inventory
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                <label class="block text-sm font-medium text-gray-600 mb-1">Price</label>
                <p class="text-2xl font-bold text-green-600">{{ formatPrice(product.price) }}</p>
              </div>
              <div class="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                <label class="block text-sm font-medium text-gray-600 mb-1">Stock Quantity</label>
                <p class="text-2xl font-bold text-blue-600">{{ product.stock }}</p>
                <p class="text-xs text-gray-600 mt-1">units available</p>
              </div>
              <div class="p-4 border-l-4 border-purple-500 bg-purple-50 rounded">
                <label class="block text-sm font-medium text-gray-600 mb-1">Inventory Status</label>
                <p class="text-2xl font-bold text-purple-600">{{ stockPercentage }}%</p>
                <p class="text-xs text-gray-600 mt-1">stock level</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-detail text-orange-600"></i>
              Additional Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Warranty</label>
                <p class="text-gray-900">{{ product.warranty || 'No warranty information' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Weight</label>
                <p class="text-gray-900">{{ product.weight ? `${product.weight} grams` : 'Not specified' }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-time text-gray-600"></i>
              Metadata
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Product ID</label>
                <p class="text-gray-900 font-mono">#{{ product.id }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Category</label>
                <span 
                  :class="['inline-flex px-3 py-1 text-sm font-medium rounded-full', product.categories?.buttonColor || 'bg-gray-100 text-gray-700']">
                  {{ product.categories?.name }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                <p class="text-gray-900">{{ formatDate(product.created_at) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
                <p class="text-gray-900">{{ formatDate(product.update_at) }}</p>
              </div>
              <div class="md:col-span-2" v-if="product.image">
                <label class="block text-sm font-medium text-gray-500 mb-1">Image URL</label>
                <div class="flex items-center gap-2">
                  <input 
                    :value="product.image"
                    readonly 
                    class="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded font-mono"
                  >
                  <button
                    @click="copyImageUrl"
                    class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    title="Copy URL"
                  >
                    <i class="bx bx-copy"></i>
                  </button>
                  <a
                    :href="product.image"
                    target="_blank"
                    class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    title="Open image"
                  >
                    <i class="bx bx-link-external"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="bx bx-error-circle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
        <button
          @click="goBack"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </button>
      </div>
    </div> 
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { supabase } from '../../lib/supabase'
  import { deleteImageFromStorage } from '../../lib/storageHelpers'
  import Swal from 'sweetalert2'

  const route = useRoute()
  const router = useRouter()

  const loading = ref(true)
  const product = ref(null)
  const productId = ref(route.params.id)
  

  const statusClass = computed(() => {
    if (!product.value) return ''
    
    const statusColors = {
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-yellow-100 text-yellow-700',
      'Out of Stock': 'bg-red-100 text-red-700'
    }
    
    return statusColors[product.value.status] || 'bg-gray-100 text-gray-700'
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dataString) => {
    if (!dataString) return '-'

    const date = new Date(dataString)
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(product.value.image)
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Image URL copied to clipboard',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const stockPercentage = computed(()=>{
    if (!product.value) return 0
    return Math.min(100, Math.round((product.value.stock / 100) * 100))
  })

  const fetchProduct = async () => {
    try {
      loading.value = true
      
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('id', productId.value)
        .single()

      if (error) throw error

      product.value = data

    } catch (error) {
      console.error('Error fetching product:', error)
      product.value = null
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `
        <div class="text-left">
          <p class="mb-2">Do you want to delete:</p>
          <p class="mb-2"><strong>${product.value.name}</strong></p>
          <p class="text-sm text-red-600">⚠️ This will also delete the product image from storage.</p>
          <p class="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
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
        Swal.fire({
          title: 'Deleting...',
          html: 'Please wait while we delete the product.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        // Delete image from storage
        if (product.value.image?.includes('supabase')) {
          const imageResult = await deleteImageFromStorage(product.value.image)
          if (!imageResult.success) {
            console.warn('Image deletion warning:', imageResult.error)
          }
        }

        // Delete product from database
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId.value)

        if (error) throw error

        // Success
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${product.value.name} has been deleted.`,
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })

        router.push('/products')

      } catch (error) {
        console.error('Error deleting product:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete product.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  }

  const goBack = () => {
    router.push('/products')
  }

  const editProduct = () => {
    router.push(`/products/edit/${productId.value}`)
  }
  onMounted(() => {
    fetchProduct()
  })
</script>