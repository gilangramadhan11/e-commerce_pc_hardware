<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="close"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div class="flex items-center gap-3">
            <div
              v-if="icon"
              :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center',
                iconBgClass
              ]"
            >
              <i :class="['bx', `bx-${icon}`, iconColorClass, 'text-xl']"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
              <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
            </div>
          </div>
          <button
            @click="close"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i class="bx bx-x text-xl text-gray-500"></i>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <slot />
        </div>

        <!-- Modal Footer (Optional) -->
        <div v-if="showFooter" class="flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <slot name="footer">
            <button
              v-if="showConfirmBtn"
              @click="confirm"
              :disabled="confirmLoading"
              :class="[
                'flex-1 py-2.5 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                confirmBtnClass
              ]"
            >
              <i v-if="confirmLoading" class="bx bx-loader-circle bx-spin text-lg"></i>
              <i v-else :class="['bx', `bx-${confirmIcon}`, 'text-lg']"></i>
              {{ confirmLoading ? confirmLoadingText : confirmText }}
            </button>
            <button
              v-if="showCancelBtn"
              @click="close"
              class="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 font-medium transition-colors"
            >
              {{ cancelText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  // Modal state
  isOpen: {
    type: Boolean,
    default: false
  },

  // Header
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },

  // Icon
  icon: {
    type: String,
    default: 'plus-circle' // boxicon name without 'bx-' prefix
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-100'
  },
  iconColorClass: {
    type: String,
    default: 'text-blue-600'
  },

  // Footer
  showFooter: {
    type: Boolean,
    default: true
  },
  showConfirmBtn: {
    type: Boolean,
    default: true
  },
  showCancelBtn: {
    type: Boolean,
    default: true
  },

  // Confirm button
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  confirmIcon: {
    type: String,
    default: 'check-circle'
  },
  confirmBtnClass: {
    type: String,
    default: 'bg-blue-600 hover:bg-blue-700'
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  confirmLoadingText: {
    type: String,
    default: 'Processing...'
  },

  // Cancel button
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

const confirm = () => {
  emit('confirm')
}
</script>
