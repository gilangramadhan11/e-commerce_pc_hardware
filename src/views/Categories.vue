<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div class="relative">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Categories</h1>
        <p class="text-gray-600 mt-1">Manage product categories</p>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <button 
          @click="openAddModal"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          Add Categories
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="i in 4" :key="`stat-skeleton-${i}`" class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div class="space-y-2 flex-1">
            <div class="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div class="w-10 h-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Categories</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.total }}</p>
          </div>
          <i class="bx bx-chip text-3xl text-blue-500"></i>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow border-t-4 border-green-500 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
          <p class="text-sm text-gray-600 mb-1">Active Products</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.activeProducts }}</p>
          </div>
          <i class="bx bx-check-circle text-3xl text-green-500"></i>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow border-t-4 border-purple-500 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
          <p class="text-sm text-gray-600 mb-1">Top Category</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.topCategory }}</p>
          </div>
          <i class="bx bx-trending-up text-3xl text-purple-500"></i>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-500 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
          <p class="text-sm text-gray-600 mb-1">Empty Categories</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.empty }}</p>
          </div>
          <i class="bx bx-error text-3xl text-yellow-500"></i>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="`skeleton-${i}`" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="bg-gray-200 animate-pulse p-6 h-32"></div>
        <div class="p-4 space-y-3">
          <div class="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div class="flex gap-2 mt-4">
            <div class="h-9 bg-gray-200 animate-pulse rounded flex-1"></div>
            <div class="h-9 bg-gray-200 animate-pulse rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        <div :class="['p-6 text-white', category.gradient]">
          <div class="flex items-center justify-between mb-4">
            <i :class="[category.icon, 'text-4xl']"></i>
            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Active</span>
          </div>
          <h3 class="text-xl font-bold">{{ category.name }}</h3>
          <p class="text-sm opacity-90 mt-1">{{ category.subtitle }}</p>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-gray-600">Total Products</span>
            <span class="text-lg font-bold text-gray-800">{{ category.product_count || 0 }}</span>
          </div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-gray-600">Total Value</span>
            <span class="text-sm font-semibold text-gray-800">{{ formatPrice(category.total_value || 0) }}</span>
          </div>
          <div class="flex gap-2">
            <button 
              @click="editCategory(category)"
              :class="['flex-1 px-3 py-2 rounded hover:opacity-90 transition-colors text-sm font-medium cursor-pointer', category.buttonColor]">
              <i class="bx bx-edit-alt"></i> Edit
            </button>
            <button 
              @click="deleteCategory(category)"
              class="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium cursor-pointer">
              <i class="bx bx-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">
            {{ isEditing ? 'Edit Category' : 'Add New Category' }}
          </h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <i class="bx bx-x text-2xl"></i>
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Category Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g., CPU, GPU, RAM"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <!-- Subtitle -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subtitle <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.subtitle"
              type="text"
              placeholder="e.g., Processors, Graphics Cards"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="2"
              placeholder="Brief description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Icon Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Icon <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="icon in availableIcons"
                :key="icon"
                type="button"
                @click="form.icon = icon"
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors',
                  form.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <i :class="[icon, 'text-xl']"></i>
              </button>
            </div>
          </div>

          <!-- Gradient Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Color Theme <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="grad in availableGradients"
                :key="grad.value"
                type="button"
                @click="selectGradient(grad)"
                :class="[
                  'h-12 rounded-lg border-2 transition-all text-white font-medium text-sm',
                  grad.value,
                  form.gradient === grad.value ? 'border-gray-800 scale-105' : 'border-transparent'
                ]"
              >
                {{ grad.name }}
              </button>
            </div>
          </div>

          <!-- Preview -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-xs text-gray-600 mb-2">Preview:</p>
            <div :class="['p-4 rounded-lg text-white', form.gradient]">
              <div class="flex items-center justify-between mb-2">
                <i :class="[form.icon, 'text-3xl']"></i>
                <span class="px-2 py-1 bg-white/20 rounded-full text-xs">Active</span>
              </div>
              <h3 class="font-bold">{{ form.name || 'Category Name' }}</h3>
              <p class="text-xs opacity-90">{{ form.subtitle || 'Subtitle' }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i :class="['bx', saving ? 'bx-loader bx-spin' : 'bx-save', 'mr-2']"></i>
              {{ saving ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </button>
            <button
              type="button"
              @click="closeModal"
              :disabled="saving"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
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
  import { supabase } from '../lib/supabase'
  import Swal from 'sweetalert2'

  const loading = ref(true)
  const categories = ref([])
  const showModal =  ref(false)
  const isEditing = ref(false)
  const editingId = ref(null)
  const saving = ref(false)

  const form = ref({
    name: '',
    subtitle: '',
    description: '',
    icon: 'bx bx-chip',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    buttonColor: 'bg-blue-50 text-blue-600'
  })

  const availableIcons = [
    'bx bx-chip',
    'bx bx-desktop',
    'bx bx-memory-card',
    'bx bx-laptop',
    'bx bx-hdd',
    'bx bx-plug',
    'bx bx-box',
    'bx bx-wind',
    'bx bx-folder',
    'bx bx-package',
    'bx bx-category',
    'bx bxs-cube'
  ]

// Available gradients
  const availableGradients = [
    { name: 'Blue', value: 'bg-gradient-to-br from-blue-500 to-blue-600', button: 'bg-blue-50 text-blue-600' },
    { name: 'Green', value: 'bg-gradient-to-br from-green-500 to-green-600', button: 'bg-green-50 text-green-600' },
    { name: 'Purple', value: 'bg-gradient-to-br from-purple-500 to-purple-600', button: 'bg-purple-50 text-purple-600' },
    { name: 'Orange', value: 'bg-gradient-to-br from-orange-500 to-orange-600', button: 'bg-orange-50 text-orange-600' },
    { name: 'Indigo', value: 'bg-gradient-to-br from-indigo-500 to-indigo-600', button: 'bg-indigo-50 text-indigo-600' },
    { name: 'Red', value: 'bg-gradient-to-br from-red-500 to-red-600', button: 'bg-red-50 text-red-600' },
    { name: 'Pink', value: 'bg-gradient-to-br from-pink-500 to-pink-600', button: 'bg-pink-50 text-pink-600' },
    { name: 'Cyan', value: 'bg-gradient-to-br from-cyan-500 to-cyan-600', button: 'bg-cyan-50 text-cyan-600' },
    { name: 'Yellow', value: 'bg-gradient-to-br from-yellow-500 to-yellow-600', button: 'bg-yellow-50 text-yellow-600' },
    { name: 'Teal', value: 'bg-gradient-to-br from-teal-500 to-teal-600', button: 'bg-teal-50 text-teal-600' }
  ]

  const stats = computed(() => {
    const total = categories.value.length
    const activeProducts = categories.value.reduce((sum, cat) => sum + (cat.product_count || 0), 0)
    const topCat = categories.value.reduce((max, cat) => 
      (cat.product_count || 0) > (max.product_count || 0) ? cat : max, 
      categories.value[0] || {}
    )
    const empty = categories.value.filter(cat => (cat.product_count || 0) === 0).length

    return {
      total,
      activeProducts,
      topCategory: topCat?.name || '-',
      empty
    }
  })

  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const fetchCategories = async () => {
    try {
      loading.value = true

      // Fetch categories with product count and total value
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          products:products(count)
        `)
        .order('name', { ascending: true })

      if (error) throw error

      // Process data
      categories.value = await Promise.all((data || []).map(async cat => {
        // Get total value for this category
        const { data: products } = await supabase
          .from('products')
          .select('price, stock')
          .eq('category', cat.name)

        const totalValue = (products || []).reduce((sum, p) => sum + (p.price * p.stock), 0)

        return {
          ...cat,
          product_count: cat.products?.[0]?.count || 0,
          total_value: totalValue
        }
      }))

    } catch (error) {
      console.error('Error fetching categories:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Could not fetch categories.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      loading.value = false
    }
  }

  const selectGradient = (grad) => {
    form.value.gradient = grad.value
    form.value.buttonColor = grad.button
  }

  const openAddModal = () => {
    isEditing.value = false
    form.value = {
      name: '',
      subtitle: '',
      description: '',
      icon: 'bx bx-chip',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      buttonColor: 'bg-blue-50 text-blue-600'
    }
    showModal.value = true
  }

  const editCategory = (category) => {
    isEditing.value = true
    editingId.value = category.id
    form.value = {
      name: category.name,
      subtitle: category.subtitle || '',
      description: category.description || '',
      icon: category.icon,
      gradient: category.gradient,
      buttonColor: category.buttonColor
    }
    showModal.value = true
  }

// Close modal
const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingId.value = null
}

// Handle submit
const handleSubmit = async () => {
    try {
      saving.value = true

      if (!form.value.name.trim() || !form.value.subtitle.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Name and subtitle are required',
          confirmButtonColor: '#3B82F6'
        })
        return
      }

      const categoryData = {
        name: form.value.name.trim(),
        subtitle: form.value.subtitle.trim(),
        description: form.value.description.trim() || null,
        icon: form.value.icon,
        gradient: form.value.gradient,
        buttonColor: form.value.buttonColor
      }

      if (isEditing.value) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingId.value)

        if (error) throw error

        // Update local
        const index = categories.value.findIndex(c => c.id === editingId.value)
        if (index !== -1) {
          categories.value[index] = {
            ...categories.value[index],
            ...categoryData
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Category updated successfully.',
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })
      } else {
        const { data, error } = await supabase
          .from('categories')
          .insert([categoryData])
          .select()
          .single()

        if (error) throw error

        categories.value.push({
          ...data,
          product_count: 0,
          total_value: 0
        })

        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Category created successfully.',
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })
      }

      closeModal()
    } catch (error) {
      console.error('Error saving category:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to save category.',
        confirmButtonColor: '#3B82F6'
      })
    } finally {
      saving.value = false
    }
  }

// Delete category
  const deleteCategory = async (category) => {
    const result = await Swal.fire({
      title: 'Delete Category?',
      html: `
        <div class="text-left">
          <p class="mb-2">Delete: <strong>${category.name}</strong></p>
          ${category.product_count > 0 
            ? `<p class="text-sm text-yellow-600">⚠️ This category has ${category.product_count} product(s).</p>`
            : ''
          }
          <p class="text-sm text-gray-500 mt-2">This cannot be undone.</p>
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
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        })

        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', category.id)

        if (error) throw error

        categories.value = categories.value.filter(c => c.id !== category.id)

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${category.name} deleted.`,
          confirmButtonColor: '#3B82F6',
          timer: 2000
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  }

  onMounted(() => {
    fetchCategories()
  })
</script>