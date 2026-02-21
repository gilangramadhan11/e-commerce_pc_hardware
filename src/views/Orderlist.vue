<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Order List</h1>
        <p class="text-gray-600 mt-1">All orders from customers</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
        <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          New Order
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Orders</p>
            <p class="text-2xl font-bold text-gray-800">1,247</p>
          </div>
          <i class="bx bx-cart text-3xl text-blue-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Pending</p>
            <p class="text-2xl font-bold text-gray-800">89</p>
          </div>
          <i class="bx bx-time text-3xl text-yellow-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Processing</p>
            <p class="text-2xl font-bold text-gray-800">124</p>
          </div>
          <i class="bx bx-loader-circle text-3xl text-purple-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Completed</p>
            <p class="text-2xl font-bold text-gray-800">1,034</p>
          </div>
          <i class="bx bx-check-circle text-3xl text-green-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Cancelled</p>
            <p class="text-2xl font-bold text-gray-800">12</p>
          </div>
          <i class="bx bx-x-circle text-3xl text-red-500"></i>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg py-4 gap-4 flex mb-6">
      <div class="relative flex-1 max-w-sm">
        <input 
          type="text"
          placeholder="Search by order ID, customer name..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="relative">
        <select class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>Custom Range</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <button class="flex items-center gap-2 border border-gray-200 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <i class="bx bx-filter-alt"></i> Filter
        </button>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Order 1 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">#ORD-2024-001</div>
                <div class="text-xs text-gray-500">INV-2024-001</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-bold text-blue-600">JD</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">John Doe</div>
                    <div class="text-xs text-gray-500">john@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">Intel Core i9-13900K</div>
                <div class="text-xs text-gray-500">+ 2 more items</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rp 32,500,000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 6, 2024</div>
                <div class="text-xs text-gray-500">10:30 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full">
                  Pending
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Process Order">
                    <i class="bx bx-check text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Print Invoice">
                    <i class="bx bx-printer text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Order 2 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">#ORD-2024-002</div>
                <div class="text-xs text-gray-500">INV-2024-002</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-bold text-purple-600">AS</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Alice Smith</div>
                    <div class="text-xs text-gray-500">alice@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">NVIDIA RTX 4090</div>
                <div class="text-xs text-gray-500">+ 1 more item</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rp 28,000,000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 6, 2024</div>
                <div class="text-xs text-gray-500">09:15 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full">
                  Processing
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Mark as Shipped">
                    <i class="bx bx-package text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Print Invoice">
                    <i class="bx bx-printer text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Order 3 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">#ORD-2024-003</div>
                <div class="text-xs text-gray-500">INV-2024-003</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-bold text-green-600">BJ</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Bob Johnson</div>
                    <div class="text-xs text-gray-500">bob@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">Corsair Vengeance 32GB</div>
                <div class="text-xs text-gray-500">Single item</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rp 2,000,000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 5, 2024</div>
                <div class="text-xs text-gray-500">04:20 PM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
                  Shipped
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Track Shipment">
                    <i class="bx bx-map text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Print Invoice">
                    <i class="bx bx-printer text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Order 4 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">#ORD-2024-004</div>
                <div class="text-xs text-gray-500">INV-2024-004</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-bold text-yellow-600">CD</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Carol Davis</div>
                    <div class="text-xs text-gray-500">carol@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">ASUS ROG Motherboard</div>
                <div class="text-xs text-gray-500">+ 3 more items</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rp 15,750,000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 5, 2024</div>
                <div class="text-xs text-gray-500">02:45 PM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  Delivered
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Review">
                    <i class="bx bx-star text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Print Invoice">
                    <i class="bx bx-printer text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Order 5 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">#ORD-2024-005</div>
                <div class="text-xs text-gray-500">INV-2024-005</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-bold text-red-600">DW</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">David Wilson</div>
                    <div class="text-xs text-gray-500">david@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">Samsung 990 PRO SSD</div>
                <div class="text-xs text-gray-500">Single item</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rp 3,200,000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 4, 2024</div>
                <div class="text-xs text-gray-500">11:00 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">
                  Cancelled
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-400 cursor-not-allowed rounded" disabled title="Cancelled">
                    <i class="bx bx-x text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Refund">
                    <i class="bx bx-undo text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
// Order list logic
</script>