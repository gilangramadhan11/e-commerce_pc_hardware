<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Shipping Management</h1>
        <p class="text-gray-600 mt-1">Track and manage shipped orders</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <i class="bx bx-map text-xl"></i>
          Track All
        </button>
        <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
      </div>
    </div>

    <!-- Shipping Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">In Transit</h3>
          <i class="bx bx-package text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">67</p>
        <p class="text-xs opacity-75 mt-2">Active shipments</p>
      </div>

      <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Out for Delivery</h3>
          <i class="bx bx-car text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">28</p>
        <p class="text-xs opacity-75 mt-2">Arriving today</p>
      </div>

      <div class="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Delivered</h3>
          <i class="bx bx-check-circle text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">1,034</p>
        <p class="text-xs opacity-75 mt-2">This month</p>
      </div>

      <div class="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Avg. Delivery</h3>
          <i class="bx bx-time text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">2.8d</p>
        <p class="text-xs opacity-75 mt-2">Average time</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <input 
            type="text" 
            placeholder="Search by tracking number, order ID..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Couriers</option>
          <option>JNE</option>
          <option>J&T Express</option>
          <option>SiCepat</option>
          <option>AnterAja</option>
        </select>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>In Transit</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Failed Delivery</option>
        </select>
      </div>
    </div>

    <!-- Shipping Timeline Cards -->
    <div class="space-y-4">
      <!-- Shipment 1 - Out for Delivery -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div class="bg-linear-to-r from-green-500 to-green-600 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="bx bx-car text-2xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold">#ORD-2024-045</h3>
                <p class="text-sm opacity-90">Tracking: JNE-2024-789456</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-4 py-2 bg-white/20 rounded-lg text-sm font-bold">
                OUT FOR DELIVERY
              </span>
              <p class="text-xs mt-2 opacity-90">ETA: Today, 5:00 PM</p>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Customer & Order Info -->
          <div class="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p class="text-xs text-gray-500 mb-1">CUSTOMER</p>
              <p class="font-semibold text-gray-800">John Doe</p>
              <p class="text-sm text-gray-600">john@example.com</p>
              <p class="text-sm text-gray-600">+62 812-3456-7890</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">DELIVERY ADDRESS</p>
              <p class="text-sm text-gray-800">Jl. Sudirman No. 123</p>
              <p class="text-sm text-gray-800">Jakarta Selatan, DKI Jakarta 12190</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">COURIER</p>
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <span class="text-xs font-bold text-green-600">JNE</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">JNE Express</p>
                  <p class="text-xs text-gray-600">REG Service</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tracking Timeline -->
          <div class="border-l-2 border-green-500 pl-6 space-y-4">
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
              <div class="pb-4">
                <p class="text-sm font-semibold text-gray-800">Out for Delivery</p>
                <p class="text-xs text-gray-500">Feb 6, 2024 - 09:30 AM</p>
                <p class="text-xs text-gray-600 mt-1">Package is on the way to your location</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-gray-300 rounded-full border-4 border-white"></div>
              <div class="pb-4">
                <p class="text-sm font-semibold text-gray-800">Arrived at Distribution Center</p>
                <p class="text-xs text-gray-500">Feb 6, 2024 - 06:00 AM</p>
                <p class="text-xs text-gray-600 mt-1">Jakarta Selatan Hub</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-gray-300 rounded-full border-4 border-white"></div>
              <div class="pb-4">
                <p class="text-sm font-semibold text-gray-800">In Transit</p>
                <p class="text-xs text-gray-500">Feb 5, 2024 - 08:00 PM</p>
                <p class="text-xs text-gray-600 mt-1">Package on the way to Jakarta</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-gray-300 rounded-full border-4 border-white"></div>
              <div>
                <p class="text-sm font-semibold text-gray-800">Package Picked Up</p>
                <p class="text-xs text-gray-500">Feb 5, 2024 - 02:00 PM</p>
                <p class="text-xs text-gray-600 mt-1">Package received by courier</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 mt-6">
            <button class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-phone"></i> Contact Driver
            </button>
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-map"></i> Track Real-time
            </button>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <i class="bx bx-printer"></i> Print Label
            </button>
          </div>
        </div>
      </div>

      <!-- Shipment 2 - In Transit -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div class="bg-linear-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="bx bx-package text-2xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold">#ORD-2024-044</h3>
                <p class="text-sm opacity-90">Tracking: JNT-2024-654321</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-4 py-2 bg-white/20 rounded-lg text-sm font-bold">
                IN TRANSIT
              </span>
              <p class="text-xs mt-2 opacity-90">ETA: Tomorrow, 3:00 PM</p>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Customer & Order Info -->
          <div class="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p class="text-xs text-gray-500 mb-1">CUSTOMER</p>
              <p class="font-semibold text-gray-800">Alice Smith</p>
              <p class="text-sm text-gray-600">alice@example.com</p>
              <p class="text-sm text-gray-600">+62 813-5555-6666</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">DELIVERY ADDRESS</p>
              <p class="text-sm text-gray-800">Jl. Gatot Subroto No. 456</p>
              <p class="text-sm text-gray-800">Bandung, Jawa Barat 40123</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">COURIER</p>
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span class="text-xs font-bold text-red-600">J&T</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">J&T Express</p>
                  <p class="text-xs text-gray-600">YES Service</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tracking Timeline -->
          <div class="border-l-2 border-blue-500 pl-6 space-y-4">
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
              <div class="pb-4">
                <p class="text-sm font-semibold text-gray-800">In Transit to Bandung</p>
                <p class="text-xs text-gray-500">Feb 6, 2024 - 03:00 AM</p>
                <p class="text-xs text-gray-600 mt-1">Package is on the way</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-gray-300 rounded-full border-4 border-white"></div>
              <div class="pb-4">
                <p class="text-sm font-semibold text-gray-800">Departed from Origin Hub</p>
                <p class="text-xs text-gray-500">Feb 5, 2024 - 10:00 PM</p>
                <p class="text-xs text-gray-600 mt-1">Jakarta Central Hub</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[1.65rem] w-4 h-4 bg-gray-300 rounded-full border-4 border-white"></div>
              <div>
                <p class="text-sm font-semibold text-gray-800">Package Picked Up</p>
                <p class="text-xs text-gray-500">Feb 5, 2024 - 04:00 PM</p>
                <p class="text-xs text-gray-600 mt-1">Package received by courier</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 mt-6">
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-map"></i> Track Package
            </button>
            <button class="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              <i class="bx bx-bell"></i> Set Notification
            </button>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <i class="bx bx-printer"></i> Print
            </button>
          </div>
        </div>
      </div>

      <!-- Shipment 3 - Delivered -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow opacity-75">
        <div class="bg-linear-to-r from-gray-400 to-gray-500 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="bx bx-check-circle text-2xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold">#ORD-2024-043</h3>
                <p class="text-sm opacity-90">Tracking: SCP-2024-987654</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-4 py-2 bg-white/20 rounded-lg text-sm font-bold">
                DELIVERED
              </span>
              <p class="text-xs mt-2 opacity-90">Feb 5, 2024 - 04:30 PM</p>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Customer & Order Info -->
          <div class="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p class="text-xs text-gray-500 mb-1">CUSTOMER</p>
              <p class="font-semibold text-gray-800">Bob Johnson</p>
              <p class="text-sm text-gray-600">bob@example.com</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">DELIVERY ADDRESS</p>
              <p class="text-sm text-gray-800">Jl. Ahmad Yani No. 789</p>
              <p class="text-sm text-gray-800">Surabaya, Jawa Timur 60234</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">RECEIVED BY</p>
              <p class="font-semibold text-green-600">Bob Johnson (Self)</p>
              <p class="text-xs text-gray-600">Signature confirmed</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check-double"></i> Confirm Delivery
            </button>
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-show"></i> View POD
            </button>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <i class="bx bx-archive"></i> Archive
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Showing <span class="font-medium">1</span> to <span class="font-medium">3</span> of <span class="font-medium">95</span> shipments
      </p>
      <div class="flex gap-2">
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Shipping logic
</script>