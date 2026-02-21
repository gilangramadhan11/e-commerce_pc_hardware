
<template>
  <div class="flex h-full bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen"/>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col bg-gray-100 transition-all duration-300" :class="sidebarOpen ? 'ml-0' : 'ml-0'">
      <Navbar/>

      <!-- Page Content -->
      <main class="flex-1 p-8 mb-4 mr-6 overflow-y-auto bg-white rounded-xl shadow-lg">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  
  import Sidebar from './components/Sidebar.vue';
  import Navbar from './components/Navbar.vue';
  
 </script>
