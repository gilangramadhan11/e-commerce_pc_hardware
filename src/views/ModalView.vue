<template>
  <div class="pr-8 pl-8 pt-8 pb-0">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Modal Examples</h1>
        <p class="text-gray-600 mt-1">Demonstrasi penggunaan reusable modal component</p>
      </div>
    </div>

    <!-- Button Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Basic Modal Button -->
      <button
        @click="openBasicModal"
        class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-window text-3xl text-blue-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Basic Modal</h3>
        <p class="text-sm text-gray-600">Modal dengan konten sederhana</p>
      </button>

      <!-- Form Modal Button -->
      <button
        @click="openFormModal"
        class="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-form text-3xl text-green-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Form Modal</h3>
        <p class="text-sm text-gray-600">Modal dengan form input</p>
      </button>

      <!-- Delete Modal Button -->
      <button
        @click="openDeleteModal"
        class="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-trash text-3xl text-red-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Delete Modal</h3>
        <p class="text-sm text-gray-600">Modal konfirmasi hapus</p>
      </button>

      <!-- Success Modal Button -->
      <button
        @click="openSuccessModal"
        class="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-check-circle text-3xl text-emerald-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Success Modal</h3>
        <p class="text-sm text-gray-600">Modal notifikasi berhasil</p>
      </button>

      <!-- Info Modal Button -->
      <button
        @click="openInfoModal"
        class="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-info-circle text-3xl text-purple-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Info Modal</h3>
        <p class="text-sm text-gray-600">Modal informasi</p>
      </button>

      <!-- Warning Modal Button -->
      <button
        @click="openWarningModal"
        class="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl hover:shadow-lg transition-all"
      >
        <i class="bx bx-error-circle text-3xl text-yellow-600 mb-3"></i>
        <h3 class="font-bold text-gray-800 mb-1">Warning Modal</h3>
        <p class="text-sm text-gray-600">Modal peringatan</p>
      </button>
    </div>

    <!-- Modals -->

    <!-- Basic Modal -->
    <Modal
      :isOpen="showBasicModal"
      title="Basic Modal"
      subtitle="Ini adalah modal dasar"
      icon="info-circle"
      iconBgClass="bg-blue-100"
      iconColorClass="text-blue-600"
      @close="showBasicModal = false"
    >
      <div class="space-y-4">
        <p class="text-gray-600">
          Ini adalah contoh modal reusable yang bisa digunakan di berbagai places.
        </p>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-sm text-blue-800">
            ✨ Modal component ini dibuat dengan Tailwind CSS dan Boxicons
          </p>
        </div>
      </div>
    </Modal>

    <!-- Form Modal -->
    <Modal
      :isOpen="showFormModal"
      title="Create New Item"
      subtitle="Isi form di bawah untuk membuat item baru"
      icon="plus-circle"
      iconBgClass="bg-green-100"
      iconColorClass="text-green-600"
      confirmText="Create"
      confirmIcon="plus-circle"
      confirmBtnClass="bg-green-600 hover:bg-green-700"
      :confirmLoading="isFormLoading"
      @close="showFormModal = false"
      @confirm="handleFormSubmit"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Item Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Enter item name"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            v-model="formData.description"
            rows="3"
            placeholder="Enter description"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
            <option>Select category</option>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
        </div>
      </div>
    </Modal>

    <!-- Delete Modal -->
    <Modal
      :isOpen="showDeleteModal"
      title="Delete Item"
      subtitle="Apakah Anda yakin ingin menghapus?"
      icon="trash"
      iconBgClass="bg-red-100"
      iconColorClass="text-red-600"
      confirmText="Delete"
      confirmIcon="trash"
      confirmBtnClass="bg-red-600 hover:bg-red-700"
      :confirmLoading="isDeleteLoading"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    >
      <div class="space-y-4">
        <p class="text-gray-600">
          Item ini akan dihapus secara permanen dan tidak bisa dikembalikan.
        </p>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-800 font-medium">
            ⚠️ Pastikan ini adalah item yang ingin Anda hapus
          </p>
        </div>
      </div>
    </Modal>

    <!-- Success Modal -->
    <Modal
      :isOpen="showSuccessModal"
      title="Operation Successful"
      subtitle="Data telah berhasil disimpan"
      icon="check-circle"
      iconBgClass="bg-emerald-100"
      iconColorClass="text-emerald-600"
      showConfirmBtn
      showCancelBtn
      confirmText="OK"
      confirmBtnClass="bg-emerald-600 hover:bg-emerald-700"
      @close="showSuccessModal = false"
      @confirm="showSuccessModal = false"
    >
      <div class="space-y-4">
        <div class="text-center">
          <i class="bx bx-check-circle text-5xl text-emerald-600 mb-4 inline-block"></i>
          <p class="text-gray-600">
            Data Anda telah berhasil disimpan ke database.
          </p>
        </div>
      </div>
    </Modal>

    <!-- Info Modal -->
    <Modal
      :isOpen="showInfoModal"
      title="Information"
      subtitle="Informasi penting untuk Anda"
      icon="info-circle"
      iconBgClass="bg-purple-100"
      iconColorClass="text-purple-600"
      showConfirmBtn
      showCancelBtn
      confirmText="Understood"
      confirmBtnClass="bg-purple-600 hover:bg-purple-700"
      @close="showInfoModal = false"
      @confirm="showInfoModal = false"
    >
      <div class="space-y-4">
        <p class="text-gray-600">
          Modal component ini adalah modal yang reusable dan dapat dikustomisasi sesuai kebutuhan.
        </p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Dapat dikustomisasi title, subtitle, dan icon</li>
          <li>Support untuk custom button text</li>
          <li>Support untuk loading state</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </Modal>

    <!-- Warning Modal -->
    <Modal
      :isOpen="showWarningModal"
      title="Warning"
      subtitle="Ada peringatan yang perlu Anda ketahui"
      icon="error-circle"
      iconBgClass="bg-yellow-100"
      iconColorClass="text-yellow-600"
      confirmText="Acknowledge"
      confirmBtnClass="bg-yellow-600 hover:bg-yellow-700"
      @close="showWarningModal = false"
      @confirm="showWarningModal = false"
    >
      <div class="space-y-4">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-800">
            🚨 Perhatian: Aksi ini memiliki dampak yang signifikan terhadap sistem.
          </p>
        </div>
        <p class="text-gray-600">
          Pastikan Anda memahami konsekuensi sebelum melanjutkan.
        </p>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '../components/Modal.vue'

// Modal states
const showBasicModal = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)
const showInfoModal = ref(false)
const showWarningModal = ref(false)

// Form data
const formData = ref({
  name: '',
  description: ''
})

// Loading states
const isFormLoading = ref(false)
const isDeleteLoading = ref(false)

// Open functions
const openBasicModal = () => {
  showBasicModal.value = true
}

const openFormModal = () => {
  showFormModal.value = true
}

const openDeleteModal = () => {
  showDeleteModal.value = true
}

const openSuccessModal = () => {
  showSuccessModal.value = true
}

const openInfoModal = () => {
  showInfoModal.value = true
}

const openWarningModal = () => {
  showWarningModal.value = true
}

// Handle functions
const handleFormSubmit = async () => {
  isFormLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData.value)
    
    // Reset form
    formData.value = { name: '', description: '' }
    showFormModal.value = false
    showSuccessModal.value = true
  } finally {
    isFormLoading.value = false
  }
}

const handleDelete = async () => {
  isDeleteLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Item deleted')
    
    showDeleteModal.value = false
    showSuccessModal.value = true
  } finally {
    isDeleteLoading.value = false
  }
}
</script>
