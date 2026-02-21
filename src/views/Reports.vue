<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Reports</h1>
        <p class="text-gray-600 mt-1">Generate and view business reports</p>
      </div>
      <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        <i class="bx bx-plus text-xl"></i>
        New Report
      </button>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <button class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-md text-white text-left hover:shadow-lg transition-shadow">
        <i class="bx bx-line-chart text-3xl mb-3"></i>
        <h3 class="font-semibold mb-1">Sales Report</h3>
        <p class="text-xs opacity-90">View sales performance</p>
      </button>

      <button class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white text-left hover:shadow-lg transition-shadow">
        <i class="bx bx-package text-3xl mb-3"></i>
        <h3 class="font-semibold mb-1">Inventory Report</h3>
        <p class="text-xs opacity-90">Stock levels & movements</p>
      </button>

      <button class="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-md text-white text-left hover:shadow-lg transition-shadow">
        <i class="bx bx-user text-3xl mb-3"></i>
        <h3 class="font-semibold mb-1">Customer Report</h3>
        <p class="text-xs opacity-90">Customer insights</p>
      </button>

      <button class="bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-md text-white text-left hover:shadow-lg transition-shadow">
        <i class="bx bx-dollar-circle text-3xl mb-3"></i>
        <h3 class="font-semibold mb-1">Financial Report</h3>
        <p class="text-xs opacity-90">Revenue & expenses</p>
      </button>
    </div>

    <!-- Report Generator -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Generate Custom Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sales Report</option>
            <option>Inventory Report</option>
            <option>Customer Report</option>
            <option>Financial Report</option>
            <option>Product Performance</option>
            <option>Order Summary</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
            <option>JSON</option>
          </select>
        </div>

        <div class="flex items-end">
          <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <i class="bx bx-refresh"></i> Generate
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Recent Reports</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Report 1 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-line-chart text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Monthly Sales Report</p>
                    <p class="text-xs text-gray-500">sales_report_feb_2024.pdf</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Sales
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Feb 1 - Feb 28, 2024
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 6, 2024</div>
                <div class="text-xs text-gray-500">10:30 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  <i class="bx bx-check-circle"></i> Ready
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                    <i class="bx bx-download text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Share">
                    <i class="bx bx-share text-lg"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                    <i class="bx bx-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Report 2 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-package text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Inventory Analysis</p>
                    <p class="text-xs text-gray-500">inventory_q1_2024.xlsx</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Inventory
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Jan 1 - Mar 31, 2024
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 5, 2024</div>
                <div class="text-xs text-gray-500">03:15 PM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  <i class="bx bx-check-circle"></i> Ready
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                    <i class="bx bx-download text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Share">
                    <i class="bx bx-share text-lg"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                    <i class="bx bx-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Report 3 - Processing -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-user text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Customer Insights Q1</p>
                    <p class="text-xs text-gray-500">customer_report_q1.pdf</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                  Customer
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Jan 1 - Mar 31, 2024
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 6, 2024</div>
                <div class="text-xs text-gray-500">11:45 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full">
                  <i class="bx bx-loader-circle bx-spin"></i> Processing
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-gray-400 cursor-not-allowed rounded" disabled>
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-400 cursor-not-allowed rounded" disabled>
                    <i class="bx bx-download text-lg"></i>
                  </button>
                  <button class="p-2 text-gray-400 cursor-not-allowed rounded" disabled>
                    <i class="bx bx-share text-lg"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Cancel">
                    <i class="bx bx-x text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Report 4 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-dollar-circle text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Financial Summary Jan</p>
                    <p class="text-xs text-gray-500">finance_jan_2024.pdf</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                  Financial
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Jan 1 - Jan 31, 2024
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Feb 1, 2024</div>
                <div class="text-xs text-gray-500">09:00 AM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  <i class="bx bx-check-circle"></i> Ready
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                    <i class="bx bx-download text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Share">
                    <i class="bx bx-share text-lg"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                    <i class="bx bx-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Report 5 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <i class="bx bx-shopping-bag text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Product Performance</p>
                    <p class="text-xs text-gray-500">product_analysis_2024.csv</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  Product
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Jan 1 - Feb 6, 2024
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Jan 30, 2024</div>
                <div class="text-xs text-gray-500">02:20 PM</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                  <i class="bx bx-check-circle"></i> Ready
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                    <i class="bx bx-show text-lg"></i>
                  </button>
                  <button class="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                    <i class="bx bx-download text-lg"></i>
                  </button>
                  <button class="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Share">
                    <i class="bx bx-share text-lg"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                    <i class="bx bx-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Scheduled Reports -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Scheduled Reports</h3>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
          <i class="bx bx-plus"></i> Add Schedule
        </button>
      </div>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <i class="bx bx-calendar text-2xl text-blue-600"></i>
            <div>
              <p class="font-semibold text-gray-800">Weekly Sales Summary</p>
              <p class="text-xs text-gray-600">Every Monday at 9:00 AM</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
            <button class="p-2 text-gray-600 hover:bg-gray-200 rounded">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <i class="bx bx-calendar text-2xl text-green-600"></i>
            <div>
              <p class="font-semibold text-gray-800">Monthly Inventory Check</p>
              <p class="text-xs text-gray-600">1st of every month at 8:00 AM</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
            <button class="p-2 text-gray-600 hover:bg-gray-200 rounded">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-60">
          <div class="flex items-center gap-3">
            <i class="bx bx-calendar text-2xl text-gray-600"></i>
            <div>
              <p class="font-semibold text-gray-800">Quarterly Financial Report</p>
              <p class="text-xs text-gray-600">Every 3 months on 1st</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">Paused</span>
            <button class="p-2 text-gray-600 hover:bg-gray-200 rounded">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reports logic
</script>