<template>
  <div class="flex h-full bg-gray-100">
    <Sidebar />

    <div class="flex-1 flex flex-col bg-gray-100">
      <Navbar />

      <main class="flex-1 p-8 mb-4 mr-6 overflow-y-auto bg-white rounded-xl shadow-lg">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>