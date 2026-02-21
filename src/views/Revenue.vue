<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Revenue Analytics</h1>
        <p class="text-gray-600 mt-1">Track sales and revenue performance</p>
      </div>
      <div class="flex gap-3">
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
        <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="bx bx-download text-xl"></i>
          Export
        </button>
      </div>
    </div>

    <!-- Revenue Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-3">
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <i class="bx bx-dollar-circle text-2xl"></i>
          </div>
          <span class="text-xs bg-white/20 px-2 py-1 rounded-full">+12.5%</span>
        </div>
        <p class="text-sm opacity-90 mb-1">Total Revenue</p>
        <p class="text-3xl font-bold">Rp 45.8B</p>
        <p class="text-xs opacity-75 mt-2">This Month</p>
      </div>

      <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-3">
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <i class="bx bx-trending-up text-2xl"></i>
          </div>
          <span class="text-xs bg-white/20 px-2 py-1 rounded-full">+8.3%</span>
        </div>
        <p class="text-sm opacity-90 mb-1">Gross Profit</p>
        <p class="text-3xl font-bold">Rp 12.4B</p>
        <p class="text-xs opacity-75 mt-2">27% Margin</p>
      </div>

      <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-3">
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <i class="bx bx-cart text-2xl"></i>
          </div>
          <span class="text-xs bg-white/20 px-2 py-1 rounded-full">+15.2%</span>
        </div>
        <p class="text-sm opacity-90 mb-1">Total Orders</p>
        <p class="text-3xl font-bold">1,247</p>
        <p class="text-xs opacity-75 mt-2">This Month</p>
      </div>

      <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-md text-white">
        <div class="flex items-center justify-between mb-3">
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <i class="bx bx-receipt text-2xl"></i>
          </div>
          <span class="text-xs bg-white/20 px-2 py-1 rounded-full">+5.7%</span>
        </div>
        <p class="text-sm opacity-90 mb-1">Avg. Order Value</p>
        <p class="text-3xl font-bold">Rp 36.7M</p>
        <p class="text-xs opacity-75 mt-2">Per Transaction</p>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
      <div class="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
        <div class="text-center text-gray-500">
          <i class="bx bx-line-chart text-6xl mb-3"></i>
          <p class="text-sm">Revenue Chart Placeholder</p>
          <p class="text-xs">(Integrate Chart.js or Recharts here)</p>
        </div>
      </div>
    </div>

    <!-- Revenue by Category -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">GPU</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 18.5B (40%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 40%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">CPU</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 13.2B (29%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 29%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">RAM</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 5.8B (13%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-500 h-2 rounded-full" style="width: 13%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">Storage</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 4.1B (9%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-indigo-500 h-2 rounded-full" style="width: 9%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">Motherboard</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 2.9B (6%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full" style="width: 6%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">Others</span>
              </div>
              <span class="text-sm font-bold text-gray-800">Rp 1.3B (3%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gray-400 h-2 rounded-full" style="width: 3%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <p class="font-semibold text-gray-800">Intel Core i9-13900K</p>
                <p class="text-xs text-gray-600">156 units sold</p>
              </div>
            </div>
            <p class="font-bold text-blue-600">Rp 1.17B</p>
          </div>

          <div class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <p class="font-semibold text-gray-800">NVIDIA RTX 4090</p>
                <p class="text-xs text-gray-600">89 units sold</p>
              </div>
            </div>
            <p class="font-bold text-green-600">Rp 2.23B</p>
          </div>

          <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <p class="font-semibold text-gray-800">Corsair Vengeance 32GB</p>
                <p class="text-xs text-gray-600">203 units sold</p>
              </div>
            </div>
            <p class="font-bold text-purple-600">Rp 406M</p>
          </div>

          <div class="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <p class="font-semibold text-gray-800">ASUS ROG Strix Z790</p>
                <p class="text-xs text-gray-600">124 units sold</p>
              </div>
            </div>
            <p class="font-bold text-orange-600">Rp 744M</p>
          </div>

          <div class="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                5
              </div>
              <div>
                <p class="font-semibold text-gray-800">Samsung 990 PRO 2TB</p>
                <p class="text-xs text-gray-600">312 units sold</p>
              </div>
            </div>
            <p class="font-bold text-indigo-600">Rp 499M</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Revenue Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Daily Revenue Breakdown</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 6, 2024</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">89</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">Rp 3.2B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 36.0M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  <i class="bx bx-trending-up"></i> +12%
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 5, 2024</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">76</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">Rp 2.8B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 36.8M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  <i class="bx bx-trending-up"></i> +8%
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 4, 2024</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">82</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">Rp 3.0B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 36.6M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                  <i class="bx bx-minus"></i> 0%
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 3, 2024</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">65</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">Rp 2.4B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 36.9M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                  <i class="bx bx-trending-down"></i> -5%
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 2, 2024</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">71</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">Rp 2.6B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 36.6M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  <i class="bx bx-trending-up"></i> +3%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Revenue logic
</script>