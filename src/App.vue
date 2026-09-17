<template>
  <div id="app">
    <component :is="layoutComponent">
      <RouterView />
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DashboardLayout from './layouts/DashboardLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  return route.meta.layout === 'blank'
    ? BlankLayout
    : DashboardLayout
})
</script>