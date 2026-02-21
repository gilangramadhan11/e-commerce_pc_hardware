<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Customer List</h1>
        <p class="text-gray-600 mt-1">Manage and view all customers</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
        <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-plus text-xl"></i>
          Add Customer
        </button>
      </div>
    </div>

    <!-- Customer Stats -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Customers</p>
            <p class="text-2xl font-bold text-gray-800">3,847</p>
          </div>
          <i class="bx bx-user text-3xl text-blue-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Active</p>
            <p class="text-2xl font-bold text-gray-800">3,245</p>
          </div>
          <i class="bx bx-user-check text-3xl text-green-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">New (30d)</p>
            <p class="text-2xl font-bold text-gray-800">156</p>
          </div>
          <i class="bx bx-user-plus text-3xl text-yellow-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">VIP Members</p>
            <p class="text-2xl font-bold text-gray-800">234</p>
          </div>
          <i class="bx bx-crown text-3xl text-purple-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Inactive</p>
            <p class="text-2xl font-bold text-gray-800">602</p>
          </div>
          <i class="bx bx-user-x text-3xl text-red-500"></i>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="md:col-span-2">
          <input 
            type="text" 
            placeholder="Search by name, email, phone..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>VIP</option>
        </select>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Time</option>
          <option>This Month</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
        </select>
        <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <i class="bx bx-filter-alt"></i> Filter
        </button>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Customer 1 - VIP -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3 relative">
                    <span class="text-lg font-bold text-white">JD</span>
                    <i class="bx bxs-crown absolute -top-1 -right-1 text-yellow-400 text-lg"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">John Doe</div>
                    <div class="text-xs text-purple-600 font-semibold">VIP Member</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">john.doe@example.com</div>
                <div class="text-xs text-gray-500">+62 812-3456-7890</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">87</div>
                <div class="text-xs text-gray-500">orders</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-green-600">Rp 245M</div>
                <div class="text-xs text-gray-500">lifetime</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Jan 2022</div>
                <div class="text-xs text-gray-500">3 years ago</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Order History">
                    <i class="bx bx-cart text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Message">
                    <i class="bx bx-message-dots text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Customer 2 - Active -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-lg font-bold text-white">AS</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Alice Smith</div>
                    <div class="text-xs text-gray-500">Regular Customer</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">alice.smith@example.com</div>
                <div class="text-xs text-gray-500">+62 813-5555-6666</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">23</div>
                <div class="text-xs text-gray-500">orders</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-green-600">Rp 68M</div>
                <div class="text-xs text-gray-500">lifetime</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Jun 2023</div>
                <div class="text-xs text-gray-500">1 year ago</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Order History">
                    <i class="bx bx-cart text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Message">
                    <i class="bx bx-message-dots text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Customer 3 - New -->
            <tr class="hover:bg-gray-50 bg-yellow-50/30">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 relative">
                    <span class="text-lg font-bold text-white">BJ</span>
                    <span class="absolute -top-1 -right-1 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      NEW
                    </span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Bob Johnson</div>
                    <div class="text-xs text-gray-500">New Customer</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">bob.johnson@example.com</div>
                <div class="text-xs text-gray-500">+62 814-7777-8888</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">2</div>
                <div class="text-xs text-gray-500">orders</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-green-600">Rp 8.5M</div>
                <div class="text-xs text-gray-500">lifetime</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Jan 2024</div>
                <div class="text-xs text-gray-500">1 month ago</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full">
                  New
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Order History">
                    <i class="bx bx-cart text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Message">
                    <i class="bx bx-message-dots text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Customer 4 - Active -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-lg font-bold text-white">CD</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Carol Davis</div>
                    <div class="text-xs text-gray-500">Regular Customer</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">carol.davis@example.com</div>
                <div class="text-xs text-gray-500">+62 815-9999-0000</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">15</div>
                <div class="text-xs text-gray-500">orders</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-green-600">Rp 42M</div>
                <div class="text-xs text-gray-500">lifetime</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Mar 2023</div>
                <div class="text-xs text-gray-500">1 year ago</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Order History">
                    <i class="bx bx-cart text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Message">
                    <i class="bx bx-message-dots text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Customer 5 - Inactive -->
            <tr class="hover:bg-gray-50 opacity-60">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mr-3">
                    <span class="text-lg font-bold text-white">DW</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">David Wilson</div>
                    <div class="text-xs text-gray-500">Inactive</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">david.wilson@example.com</div>
                <div class="text-xs text-gray-500">+62 816-1111-2222</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">7</div>
                <div class="text-xs text-gray-500">orders</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-600">Rp 18M</div>
                <div class="text-xs text-gray-500">lifetime</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Aug 2022</div>
                <div class="text-xs text-gray-500">2 years ago</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Send Promotion">
                    <i class="bx bx-gift text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Message">
                    <i class="bx bx-message-dots text-lg"></i>
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
      <p class="text-sm text-gray-700">
        Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">3,847</span> customers
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
// Customer list logic
</script>