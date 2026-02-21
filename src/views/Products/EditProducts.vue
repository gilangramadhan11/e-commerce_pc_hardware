<template>
  <div class="pr-8 pl-8 pt-8 pb-0">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-indigo-600 mb-4"></div>
        <p class="text-gray-600">Loading product data...</p>
      </div>
    </div> 
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Edit Product</h1>
          <p class="text-gray-600 mt-1">Update product details below</p>
        </div>
        <button 
          @click="goBack"
          class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <i class="bx bx-arrow-back text-xl"></i>
          Back to Products
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-8 ">
        <form @submit.prevent="handleSubmit">
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-info-circle text-blue-600"></i>
              Product Information
            </h2>
            <div class="grid grid-cols-1 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span class="text-red-600">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="ex. Intel Core i9-13900K"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  >
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Description <span class="text-red-600">*</span>
                </label>
                <textarea 
                  v-model="form.description"
                  rows="3"
                  placeholder="ex. 24 cores, 5.8GHz, LGA1700 socket"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.category_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option disabled value="">Select Category</option>
                  <option 
                    v-for="cat in categories"
                    :key="cat.id"
                    :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Brand <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.brand"
                  type="text"
                  placeholder="ex. Intel, AMD, NVIDIA"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-dollar-circle text-green-600"></i>
              Pricing & Stock
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Price (IDR) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                  <input
                    v-model="form.price" 
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                </div>
                <p v-if="form.price" class="text-sm text-gray-500 mt-1"> 
                  {{ formatPrice(form.price) }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.stock"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                <p 
                  v-if="form.stock !== null" 
                  class="text-sm text-gray-500 mt-1"
                  :class="stockStatusClass">
                  {{ stockStatusText }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Optional)
                </label>
                <input
                  v-model="form.sku"
                  type="text"
                  placeholder="ex. CPU-INT-I9-001"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-image text-purple-600"></i>
              Product Image
            </h2>

            <div v-if="currentImage && !newImageSelected" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div class="relative inline-block">
                <img 
                  :src="currentImage" 
                  alt="Current product image" 
                  class="h-32 object-contain border-2 border-gray-300 rounded-lg"
                >
                <button
                  type="button"
                  @click="removeCurrentImage"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  title="Change image"
                >
                  <i class="bx bx-x text-lg"></i>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Click X to change image
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ currentImage && !newImageSelected ? 'Change Image' : 'Upload New Image' }}
                  <span class="text-red-500">*</span>
                </label>
                
                <!-- Upload Area -->
                <div 
                  @drop.prevent="handleDrop"
                  @dragover.prevent="dragOver = true"
                  @dragleave.prevent="dragOver = false"
                  :class="[
                    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                    dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                  ]"
                  @click="$refs.fileInput.click()"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  >
                  
                  <div v-if="!imagePreview">
                    <i class="bx bx-cloud-upload text-5xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-600 mb-1">
                      <span class="text-blue-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                  
                  <div v-else class="relative inline-block">
                    <img :src="imagePreview" alt="Preview" class="max-h-32 mx-auto rounded">
                    <button
                      type="button"
                      @click.stop="removeNewImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <i class="bx bx-x text-lg"></i>
                    </button>
                  </div>
                </div>

                <!-- File Info -->
                <div v-if="selectedFile" class="mt-2 text-sm text-gray-600">
                  <p><strong>File:</strong> {{ selectedFile.name }}</p>
                  <p><strong>Size:</strong> {{ formatFileSize(selectedFile.size) }}</p>
                </div>

                <!-- Upload Progress -->
                <div v-if="uploading" class="mt-3">
                  <div class="flex items-center justify-between text-sm mb-1">
                    <span class="text-gray-700">Uploading new image...</span>
                    <span class="text-blue-600 font-medium">{{ uploadProgress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: uploadProgress + '%' }"
                    ></div>
                  </div>
                </div>

                <p class="text-xs text-gray-500 mt-2">
                  {{ imageChangeMessage }}
                </p>
              </div>

              <!-- Image Preview -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <div class="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <img 
                    v-if="imagePreview || currentImage" 
                    :src="imagePreview || currentImage" 
                    alt="Preview" 
                    class="max-h-44 object-contain"
                  >
                  <div v-else class="text-center text-gray-400">
                    <i class="bx bx-image text-5xl"></i>
                    <p class="text-sm mt-2">No image selected</p>
                  </div>
                </div>
                
                <!-- Image URL Info -->
                <div v-if="form.image" class="mt-2">
                  <p class="text-xs text-gray-500 mb-1">Image URL:</p>
                  <input
                    :value="form.image"
                    type="text"
                    readonly
                    class="w-full px-3 py-1 text-xs border border-gray-300 rounded bg-gray-50"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="bx bx-detail text-orange-600"></i>
              Additional Information
            </h2>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Period
                </label>
                <input
                  v-model="form.warranty"
                  type="text"
                  placeholder="ex. 3 Years"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Weight (grams)
                </label>
                <input
                  v-model="form.weight"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="ex. 500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="saving"
              class="ml-auto flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="bx bx-save text-xl" :class="{ 'bx-spin': saving }"></i>
              {{ saving ? 'Saving...' : 'Update Product' }}
            </button>
            <button
              type="button"
              @click="goBack"
              :disabled="saving"
              class="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="bx bx-x text-xl"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { supabase } from '../../lib/supabase'
  import { deleteImageFromStorage, uploadImageToStorage, validateImageFile, formatFileSize } from '../../lib/storagehelpers'
  import Swal from 'sweetalert2'

  const route = useRoute()
  const router = useRouter()

  // State
  const loading = ref(true)
  const saving = ref(false)
  const productId = ref(route.params.id)
  const categories = ref([])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')

    categories.value = data
  }

  // Form data
  const form = ref({
    name: '',
    description: '',
    category_id: null,
    brand: '',
    price: null,
    stock: null,
    sku: '',
    image: '',
    warranty: '',
    weight: null
  })

  // Image state
  const currentImage = ref('')
  const originalImage = ref('')
  const selectedFile = ref(null)
  const imagePreview = ref('')
  const uploading = ref(false)
  const uploadProgress = ref(0)
  const dragOver = ref(false)
  const newImageSelected = ref(false)

  const imageChangeMessage = computed(() => {
    if (newImageSelected.value || !currentImage.value) {
      return 'New image will be uploaded to Supabase Storage'
    }
    return 'Click X on current image to change it'
  })

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      validateAndPreviewFile(file)
    }
  }

  // Handle drag and drop
  const handleDrop = (event) => {
    dragOver.value = false
    const file = event.dataTransfer.files[0]
    if (file) {
      validateAndPreviewFile(file)
    }
  }

  // Validate and preview file
  const validateAndPreviewFile = async (file) => {
    const validation = await validateImageFile(file, 5)
    
    if (!validation.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: validation.error,
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    selectedFile.value = file
    newImageSelected.value = true

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Remove current image (to upload new one)
  const removeCurrentImage = () => {
    currentImage.value = ''
    newImageSelected.value = true
  }

  // Remove new image selection
  const removeNewImage = () => {
    selectedFile.value = null
    imagePreview.value = ''
    newImageSelected.value = false
    uploadProgress.value = 0
  }

  // method
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  //computed
  const stockStatusText = computed(()=>{
    const stock = Number(form.value.stock)

    if (!form.value.stock && form.value.stock !== 0) return ''
    if (form.value.stock === 0) return 'Out of Stock'
    if (form.value.stock < 10) return 'Low Stock'
    return 'In Stock'
  })
  const stockStatusClass = computed(()=>{
    const stock = Number(form.value.stock)

    if (!form.value.stock && form.value.stock !== 0) return ''
    if (form.value.stock === 0) return 'text-red-600 font-medium'
    if (form.value.stock < 10) return 'text-yellow-600 font-medium'
    return 'text-green-600 font-medium'
  })

  const determineStatus = (stock) => {
    if (stock === 0) return 'Out of Stock'
    if (stock <10 ) return 'Low Stock'
    return 'In Stock'
  }

  // Upload new image and delete old one
  const replaceImage = async () => {
    if (!selectedFile.value) {
      return originalImage.value
    }

    uploading.value = true
    uploadProgress.value = 0

    try {
      // Upload new image
      uploadProgress.value = 30
      const uploadResult = await uploadImageToStorage(selectedFile.value)
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error?.message || 'Failed to upload image')
      }

      uploadProgress.value = 70

      // Delete old image if it exists and is from Supabase
      if (originalImage.value && originalImage.value.includes('supabase')) {
        await deleteImageFromStorage(originalImage.value)
      }

      uploadProgress.value = 100
      return uploadResult.url

    } catch (error) {
      console.error('Error replacing image:', error)
      throw error
    } finally {
      uploading.value = false
    }
  }

  const fetchProduct = async () => {
    try {
      loading.value = true
      
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(id,name)')
        .eq('id', productId.value)
        .single()

      if (error) throw error

      if (!data) {
        await Swal.fire({
          icon: 'error',
          title: 'Product Not Found',
          text: 'The product you are looking for does not exist.',
          confirmButtonColor: '#3B82F6'
        })
        router.push('/products')
        return
      }

      // Populate form with data
      form.value = {
        name: data.name || '',
        description: data.description || '',
        category_id: data.category_id || '',
        brand: data.brand || '',
        price: data.price || null,
        stock: data.stock || null,
        sku: data.sku || '',
        image: data.image || '',
        warranty: data.warranty || '',
        weight: data.weight || null
      }

      currentImage.value = data.image || ''
      originalImage.value = data.image || ''

    } catch (error) {
      console.error('Error fetching product:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load product data. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
      router.push('/products')
    } finally {
      loading.value = false
    }
  }

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!form.value.name || !form.value.description || !form.value.category_id || 
          !form.value.brand || form.value.price === null || form.value.stock === null || 
          !form.value.image) {
        await Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please fill in all required fields',
          confirmButtonColor: '#3B82F6'
        })
        return
      }

      // Check if image exists (either current or new)
      if (!currentImage.value && !selectedFile.value) {
        await Swal.fire({
          icon: 'error',
          title: 'Image Required',
          text: 'Please provide a product image',
          confirmButtonColor: '#3B82F6'
        })
        return
      }

      // Show confirmation
      const result = await Swal.fire({
        title: 'Update Product?',
        html: `
          <div class="text-left">
            <p class="mb-2"><strong>Product:</strong> ${form.value.name}</p>
            <p class="mb-2"><strong>Category:</strong> ${form.value.category_id}</p>
            <p class="mb-2"><strong>Price:</strong> ${formatPrice(form.value.price)}</p>
            <p class="mb-2"><strong>Stock:</strong> ${form.value.stock} units</p>
          </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3B82F6',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        saving.value = true

        // Handle image replacement if new image selected
        let imageUrl = form.value.image
        if (newImageSelected.value && selectedFile.value) {
          imageUrl = await replaceImage()
        }

        // Prepare update data
        const updateData = {
          name: form.value.name,
          description: form.value.description,
          category_id: form.value.category_id,
          brand: form.value.brand,
          price: form.value.price,
          stock: form.value.stock,
          status: determineStatus(form.value.stock),
          sku: form.value.sku || null,
          image: imageUrl,
          warranty: form.value.warranty || null,
          weight: form.value.weight || null
        }

        // Update in Supabase
        const { error } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', productId.value)

        if (error) throw error

        // Success message
        await Swal.fire({
          icon: 'success',
          title: 'Product Updated!',
          text: `${form.value.name} has been updated successfully.`,
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })

        // Navigate back to products list
        router.push('/products')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      saving.value = false
    }
  }

  const goBack = () => {
    router.push('/products')
  }

  // Load product data on mount
  onMounted(() => {
    fetchProduct()
    fetchCategories()
  })

</script>