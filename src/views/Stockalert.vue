<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Stock Alert</h1>
        <p class="text-gray-600 mt-1">Monitor and manage low stock product</p>
      </div>
      <button class="flex items-center gap-2 border border-gray-200 text-gray-600 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <i class="bx bx-save text-xl"></i>
        Export
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-linear-to-br from-red-500 to-red-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Critical Stock</h3>
          <i class="bx bx-error-circle text-3xl opacity-75"></i>
        </div>
        <p class="3xl font-bold">8</p>
        <p class="text-xs opacity-75 mt-2">Below 5 Units</p>
      </div>

      <div class="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Low Stock</h3>
          <i class="bx bx-error text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">15</p>
        <p class="text-xs opacity-75 mt-2">Below 10 units</p>
      </div>

      <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">Need Restock</h3>
          <i class="bx bx-package text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">23</p>
        <p class="text-xs opacity-75 mt-2">Total alerts</p>
      </div>

      <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium opacity-90">On Order</h3>
          <i class="bx bx-cart text-3xl opacity-75"></i>
        </div>
        <p class="text-3xl font-bold">12</p>
        <p class="text-xs opacity-75 mt-2">Being restocked</p>
      </div>
    </div>

    <div class="py-4 rounded-lg mb-6 flex gap-4">
      <div class="relative flex-1 max-w-sm">
        <input 
          type="text"
          placeholder="Search products..."
          class="w-full px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"        
          >
          <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="ml-auto relative">
        <select class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Alerts</option>
        <option>Critical (< 5)</option>
        <option>Low (< 10)</option>
        <option>Medium (< 20)</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
      <div class="relative">
        <select class="appearance-none pr-8 px-4 py-2 border border-gray-200 shadow rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Categories</option>
          <option>CPU</option>
          <option>GPU</option>
          <option>RAM</option>
          <option>Motherboard</option>
          <option>Storage</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="hover:bg-red-50 bg-red-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-desktop text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">NVIDIA RTX 4090</div>
                    <div class="text-sm text-gray-500">24GB GDDR6X</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">GPU</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-red-600">3</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">10</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-error-circle"></i>
                  Critical
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2 days ago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                  Restock Now
                </button>
              </td>
            </tr>

            <tr class="hover:bg-red-50 bg-red-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-chip text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">AMD Ryzen 9 7950X</div>
                    <div class="text-sm text-gray-500">16 cores, 5.7GHz</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">CPU</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-red-600">4</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">15</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-error-circle"></i>
                  Critical
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">5 days ago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                  Restock Now
                </button>
              </td>
            </tr>

            <tr class="hover:bg-yellow-50 bg-yellow-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-memory-card text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">G.Skill Trident Z5 RGB</div>
                    <div class="text-sm text-gray-500">32GB DDR5 6000MHz</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">RAM</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-yellow-600">7</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">15</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-error"></i>
                  Low Stock
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">1 week ago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-medium">
                  Order Stock
                </button>
              </td>
            </tr>

            <tr class="hover:bg-yellow-50 bg-yellow-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-hdd text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Samsung 990 PRO</div>
                    <div class="text-sm text-gray-500">2TB NVMe SSD</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">Storage</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-yellow-600">9</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">20</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-error"></i>
                  Low Stock
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3 days ago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-medium">
                  Order Stock
                </button>
              </td>
            </tr>

            <tr class="hover:bg-yellow-50 bg-yellow-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-laptop text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">ASUS ROG Strix Z790-E</div>
                    <div class="text-sm text-gray-500">ATX Gaming Motherboard</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">Motherboard</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-yellow-600">8</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">12</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-error"></i>
                  Low Stock
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">6 days ago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-medium">
                  Order Stock
                </button>
              </td>
            </tr>

            <tr class="hover:bg-blue-50 bg-blue-50/30">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <i class="bx bx-plug text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Corsair RM850x</div>
                    <div class="text-sm text-gray-500">850W 80+ Gold PSU</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">PSU</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-blue-600">6</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">15</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full flex items-center gap-1 w-fit">
                  <i class="bx bx-loader-circle bx-spin"></i>
                  On Order
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yesterday</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="px-3 py-1 bg-gray-200 text-gray-500 rounded cursor-not-allowed" disabled>
                  Processing
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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