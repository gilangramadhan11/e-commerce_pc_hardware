<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">PC Hardware Store Dashboard</h1>
      <p class="text-gray-600 mb-8">Admin panel untuk toko komputer & hardware PC</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium opacity-90">Total Products</h3>
            <i class="bx bx-package text-2xl opacity-75"></i>
          </div>
          <p class="text-3xl font-bold">1500</p>
          <p class="text-xs opacity-75 mt-2">+12% from last month</p>
        </div>
        <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium opacity-90">Orders Today</h3>
            <i class="bx bx-cart text-2xl opacity-75"></i>
          </div>
          <p class="text-3xl font-bold">200</p>
          <p class="text-xs opacity-75 mt-2">+5% from yesterday</p>
        </div>
        <div class="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium opacity-90">Revenue</h3>
            <i class="bx bx-dollar-circle text-2xl opacity-75"></i>
          </div>
          <p class="text-3xl font-bold">Rp. 2M</p>
          <p class="text-xs opacity-75 mt-2">This month</p>
        </div>
        <div class="bg-linear-to-br from-red-500 to-red-600 p-6 rounded-lg shadow-md text-white">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium opacity-90">Low Stock</h3>
            <i class="bx bx-error-circle text-2xl opacity-75"></i>
          </div>
          <p class="text-3xl font-bold">23</p>
          <p class="text-xs opacity-75 mt-2">Need restock</p>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div>
              <p class="font-medium text-gray-800">#ORD-2026-001</p>
              <p class="text-sm text-gray-500">Intel Core i9-13900K + RTX 4090</p>
            </div>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Pending</span>
          </div>
          <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div>
              <p class="font-medium text-gray-800">#ORD-2026-002</p>
              <p class="text-sm text-gray-500">Corsair Vengeance 32GB RAM</p>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Shipped</span>
          </div>
          <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div>
              <p class="font-medium text-gray-800">#ORD-2026-003</p>
              <p class="text-sm text-gray-500">ASUS ROG Motherboard Z790</p>
            </div>
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Processing</span>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Top Selling Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i class="bx bx-chip text-2xl text-blue-700"></i>
              </div>
              <div>
                <p class="text-sm text-gray-800">Intel Core I9</p>
                <p class="text-sm text-gray-500">156 sold</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="bx bx-memory-card text-2xl text-green-700"></i>
              </div>
              <div>
                <p class="text-sm text-gray-800">Corsair Vengeance 32GB RAM</p>
                <p class="text-sm text-gray-500">211 sold</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i class="bx bx-desktop text-2xl text-red-700"></i>
              </div>
              <div>
                <p class="text-sm text-gray-800">ASUS ROG Motherboard Z790</p>
                <p class="text-sm text-gray-500">121 sold</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i class="bx bx-mouse text-2xl text-yellow-700"></i>
              </div>
              <div>
                <p class="text-sm text-gray-800">Vortex Ignix F7</p>
                <p class="text-sm text-gray-500">90 sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>