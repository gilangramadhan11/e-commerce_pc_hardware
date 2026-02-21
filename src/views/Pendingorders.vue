<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Pending Orders</h1>
        <p class="text-gray-600 mt-1">Orders awaiting confirmation and processing</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-check-double text-xl"></i>
          Process All
        </button>
      </div>
    </div>

    <!-- Alert Banner -->
    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
      <div class="flex items-center">
        <i class="bx bx-error text-yellow-500 text-2xl mr-3"></i>
        <div>
          <p class="font-semibold text-yellow-800">Action Required</p>
          <p class="text-sm text-yellow-700">You have <span class="font-bold">89 pending orders</span> that need processing. Average wait time: 2.5 hours</p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-time text-2xl text-yellow-600"></i>
          </div>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Today</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">45</h3>
        <p class="text-sm text-gray-600">New Today</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-orange-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-alarm text-2xl text-orange-600"></i>
          </div>
          <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Urgent</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">18</h3>
        <p class="text-sm text-gray-600">Over 4 Hours</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-dollar-circle text-2xl text-purple-600"></i>
          </div>
          <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Value</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">Rp 2.1B</h3>
        <p class="text-sm text-gray-600">Pending Value</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i class="bx bx-trending-up text-2xl text-blue-600"></i>
          </div>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Avg</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-1">2.5h</h3>
        <p class="text-sm text-gray-600">Wait Time</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-lg py-4 gap-4 flex mb-6">
      <div class="relative flex-1 max-w-sm">
        <input 
          type="text"
          placeholder="Search by order ID or customer..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>Sort by: Oldest First</option>
          <option>Sort by: Newest First</option>
          <option>Sort by: Highest Value</option>
          <option>Sort by: Lowest Value</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
    </div>

    <!-- Pending Orders List -->
    <div class="space-y-4">
      <!-- Order Card 1 - Urgent -->
      <div class="bg-white rounded-lg shadow-sm border-l-4 border-red-500 overflow-hidden hover:shadow-lg transition">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-800">#ORD-2024-089</h3>
                <span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  URGENT - 6h waiting
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <i class="bx bx-user"></i>
                  <span>Michael Brown</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-envelope"></i>
                  <span>michael@example.com</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-phone"></i>
                  <span>+62 812-3456-7890</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-time"></i>
                  <span>6 hours ago</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">Rp 45,000,000</p>
              <p class="text-sm text-gray-500">3 items</p>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Order Items:</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <i class="bx bx-chip text-blue-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">Intel Core i9-13900K</p>
                    <p class="text-xs text-gray-500">Qty: 1</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 7,500,000</p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                    <i class="bx bx-desktop text-green-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">NVIDIA RTX 4090</p>
                    <p class="text-xs text-gray-500">Qty: 1</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 25,000,000</p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                    <i class="bx bx-memory-card text-purple-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">Corsair Vengeance 64GB DDR5</p>
                    <p class="text-xs text-gray-500">Qty: 2</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 12,500,000</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check"></i> Confirm & Process
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-show"></i> View Details
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <i class="bx bx-x"></i> Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Order Card 2 -->
      <div class="bg-white rounded-lg shadow-sm border-l-4 border-yellow-500 overflow-hidden hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-800">#ORD-2024-088</h3>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                  4h waiting
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <i class="bx bx-user"></i>
                  <span>Sarah Wilson</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-envelope"></i>
                  <span>sarah@example.com</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-phone"></i>
                  <span>+62 813-5555-6666</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-time"></i>
                  <span>4 hours ago</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">Rp 18,500,000</p>
              <p class="text-sm text-gray-500">2 items</p>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Order Items:</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                    <i class="bx bx-laptop text-orange-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">ASUS ROG Strix Z790-E</p>
                    <p class="text-xs text-gray-500">Qty: 1</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 8,500,000</p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                    <i class="bx bx-hdd text-indigo-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">Samsung 990 PRO 2TB</p>
                    <p class="text-xs text-gray-500">Qty: 5</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 10,000,000</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check"></i> Confirm & Process
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-show"></i> View Details
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <i class="bx bx-x"></i> Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Order Card 3 -->
      <div class="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 overflow-hidden hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-800">#ORD-2024-087</h3>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  1h waiting
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <i class="bx bx-user"></i>
                  <span>Kevin Lee</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-envelope"></i>
                  <span>kevin@example.com</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-phone"></i>
                  <span>+62 814-7777-8888</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-time"></i>
                  <span>1 hour ago</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">Rp 5,200,000</p>
              <p class="text-sm text-gray-500">1 item</p>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Order Items:</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <i class="bx bx-plug text-red-600"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">Corsair RM1000x 1000W</p>
                    <p class="text-xs text-gray-500">Qty: 2</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-gray-800">Rp 5,200,000</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check"></i> Confirm & Process
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-show"></i> View Details
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <i class="bx bx-x"></i> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">Showing <span class="font-semibold">1</span> to <span class="font-semibold">10</span> of <span class="font-semibold">15</span> results</p>
      <div class="flex gap-1">
        <button class="flex items-center px-4 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          <i class="bx bx-chevron-left text-xl"></i>
        </button>
        <button class="flex items-center px-3 py-1 rounded border border-indigo-500 shadow hover:bg-gray-50">
          1
        </button>
        <button class="flex items-center px-3 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          2
        </button>
        <button class="flex items-center px-3 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          3
        </button>
        <button class="flex items-center px-3 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          ...
        </button>
        <button class="flex items-center px-3 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          9
        </button>
        <button class="flex items-center px-4 py-1 rounded border border-gray-300 shadow hover:bg-gray-50">
          <i class="bx bx-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pending orders logic
</script>