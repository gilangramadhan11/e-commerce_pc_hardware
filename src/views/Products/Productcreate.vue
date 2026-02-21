<template>
  <div class="pr-8 pl-8 pt-8 pb-0">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Add New Product</h1>
        <p class="text-gray-600 mt-1">Fill in the product details below</p>
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
                class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required>
                <option disabled value="">
                  Select Category
                </option>
                <option 
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id">
                {{ cat.name }}
                </option>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Upload Image <span class="text-red-500">*</span>
              </label>
              <div
                @drop.prevent="handleDrop"
                @dragover.prevent="dragOver = true"
                @dragleave.prevent="dragOver = false"
                :class="['border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors', dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400']"
                @click="$refs.fileInput.click()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept="iamge/*"
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
                  <img 
                    :src="imagePreview" alt="Preview" class="max-h-32 mx-auto rounded">
                    <button
                      type="button"
                      @click.stop="removeImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"  
                    >
                      <i class="bx bx-x text-lg"></i>
                    </button>
                </div>
              </div>
              <div v-if="selectedFile" class="mt-2 text-sm text-gray-600">
                <p><strong>File:</strong> {{ selectedFile.name }}</p>
                <p><strong>File:</strong>{{ formatFileSize(selectedFile.size) }}</p>
              </div>
              <div v-if="uploading" class="mt-3">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-700">Uploading...</span>
                  <span class="text-blue-600 font-medium">{{ uploadProgress }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{width: uploadProgress + '%'}"  
                  >
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Image will be upload to Supabase Storage
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div class="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <img 
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="max-h-44 object-contain"
                >
                <div v-else class="text-center text-gray-400">
                  <i class="bx bx-image text-5xl"></i>
                  <p class="text-sm mt-2">No image selected</p>
                </div>
              </div>
              <div v-if="form.image" class="mt-2">
                <p class="text-xs text-gray-500 mb-1">Uploaded URL:</p>
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
                min="0"
                step="any"
                placeholder="ex. 500"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button 
          type="submit"
          :disabled="uploading || saving"
          class="ml-auto flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="bx bx-save text-xl" :class="{'bx-spin': saving }"></i>
            {{ saving ? 'Saving...' : 'Save Product' }}
          </button>
          <button
            type="button"
            @click="resetForm"
            :disabled="uploading || saving"
            class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="bx bx-reset text-xl"></i>
            Reset Form
          </button>
          <button
            type="button"
            @click="goBack"
            :disabled="uploading || saving"
            class="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="bx bx-x text-xl"></i>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import Swal from 'sweetalert2'

const router = useRouter()

  const form = ref ({
    name: '',
    description: '',
    category_id: '',
    brand: '',
    price: null,
    stock: null,
    sku: '',
    Image: '',
    warranty: '',
    weight: null
  })

  const categories = ref([])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')

    categories.value = data
  }

  //image upload state
  const selectedFile = ref (null)
  const imagePreview = ref ('')
  const uploading = ref (false)
  const uploadProgress = ref(0)
  const dragOver = ref(false)
  const saving = ref(false)

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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

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
  const validateAndPreviewFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select an image file (PNG, JPG, WEBP)',
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Image size must be less than 5MB',
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    selectedFile.value = file

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Remove image
  const removeImage = () => {
    selectedFile.value = null
    imagePreview.value = ''
    form.value.image = ''
    uploadProgress.value = 0
  }

  // Upload image to Supabase Storage
  const uploadImage = async () => {
    if (!selectedFile.value) {
      throw new Error('No image selected')
    }

    uploading.value = true
    uploadProgress.value = 0

    try {
      // Generate unique filename
      const fileExt = selectedFile.value.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `products/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, selectedFile.value, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      form.value.image = publicUrl
      uploadProgress.value = 100

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    } finally {
      uploading.value = false
    }
  }

  const handleSubmit = async () => {
    try {
      if (!form.value.name || !form.value.description || !form.value.category_id || 
          !form.value.brand || form.value.price === null || form.value.stock === null) {
        await Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please fill in all required fields',
          confirmButtonColor: '#3B82F6'
        })
        return
      }

      if (!selectedFile.value && !form.value.image) {
        await Swal.fire({
          icon: 'error',
          title: 'Image Required',
          text: 'Please upload a product image',
          confirmButtonColor: '#3B82F6'
        })
        return
      }

      saving.value = true

      // Upload image first if not already uploaded
      if (selectedFile.value && !form.value.image) {
        await uploadImage()
      }

      const newProduct = {
        name: form.value.name,
              description: form.value.description,
              category_id: form.value.category_id,
              brand: form.value.brand,
              price: Number(form.value.price),
              stock: Number(form.value.stock),
              status: determineStatus(form.value.stock),
              sku: form.value.sku || null,
              image: form.value.image,
              warranty: form.value.warranty || null,
              weight: form.value.weight || null
      }

      const result = await Swal.fire({
        title: 'Add Product?',
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
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        const { error } = await supabase
          .from('products')
          .insert([ 
            newProduct
          ])

        if(error) throw error
          
        // Success message
        await Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: `${form.value.name} has been added successfully.`,
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })

        // Navigate back to products list
        router.push('/products')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to add product. Please try again.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      saving.value = false
    }
  }

  const resetForm = async () => {
    const result = await Swal.fire({
      title: 'Reset Form?',
      text: 'All entered data will be cleared.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      form.value = {
        name: '',
        description: '',
        category_id: '',
        brand: '',
        price: null,
        stock: null,
        sku: '',
        image: '',
        warranty: '',
        weight: null
      }
      imageError.value = false
      imagePreview.value = ''
      uploadProgress.value = 0

      Swal.fire({
        icon: 'success',
        title: 'Form Reset',
        text: 'All fields have been cleared.',
        confirmButtonColor: '#3B82F6',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  const goBack = ()=>{
    if (form.value.name || form.value.description || form.value.category_id){
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Are you sure you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, leave',
        cancelButtonText: 'Stay'
      }).then((result) => {
        if(result.isConfirmed){
          router.push('/products')
        }
      })
    } else {
      router.push('/products')
    }
  }

  onMounted(() => {
    fetchCategories()
  })
</script>