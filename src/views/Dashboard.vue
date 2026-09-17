<template>
  <div class="p-8 space-y-8">

    <!-- ==================== HEADER ==================== -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-gray-800">
          Welcome, {{ userName }}! 👋
        </h1>
        <p class="text-gray-600 mt-2">
          {{ getGreeting() }} • Role: <span class="font-semibold">{{ roleDisplay }}</span>
        </p>
      </div>
      <div class="text-right">
        <p class="text-sm text-gray-500">Last login</p>
        <p class="font-semibold text-gray-800">{{ currentTime }}</p>
      </div>
    </div>

    <!-- ==================== STATS CARDS ==================== -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Total Products -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium opacity-90">Total Products</h3>
          <i class="bx bx-box text-3xl opacity-50"></i>
        </div>

        <p class="text-3xl font-bold">
          {{ stats.totalProducts }}
        </p>
      </div>

      <!-- Low Stock Items -->
      <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium opacity-90">Low Stock Items</h3>
          <i class="bx bx-exclamation-triangle text-3xl opacity-50"></i>
        </div>

        <p class="text-3xl font-bold">
          {{ stats.lowStockCount }}
        </p>
      </div>

      <!-- Total Categories Products -->
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium opacity-90">Total Categories</h3>
          <i class="bx bx-category text-3xl opacity-50"></i>
        </div>

        <p class="text-3xl font-bold">
          {{ stats.totalCategories }}
        </p>
      </div>

      <!-- Total Transactions -->
      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium opacity-90">Total Transactions</h3>
          <i class="bx bx-transfer text-3xl opacity-50"></i>
        </div>

        <p class="text-3xl font-bold">
          {{ stats.totalTransactions }}
        </p>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">      
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">

            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                Stock Movement
              </h2>
              <p class="text-sm text-gray-500">
                Stock In vs Stock Out
              </p>
            </div>

            <select
              v-model="selectedPeriod"
              class="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>

          </div>

          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="chartSeries"
          />

        </div>
      </div>
      <!-- Right -->
      <div>
        <div class="bg-white rounded-2xl shadow-lg p-6 h-full">
          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                Low Stock Alerts
              </h2>
              <p class="text-sm text-gray-500">
                Products below 5 units
              </p>
            </div>

            <RouterLink
              to="/products/stock-alert"
              class="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </RouterLink>
          </div>

          <!-- Empty -->
          <div
            v-if="lowStockProducts.length === 0"
            class="flex flex-col items-center justify-center py-10 text-gray-400"
          >
            <i class="bx bx-check-circle text-5xl text-green-500"></i>
            <p class="mt-3 font-medium">
              Great!
            </p>
            <p class="text-sm">
              No critical stock.
            </p>
          </div>

          <!-- List -->
          <div
            v-else
            class="space-y-4"
          >
            <div
              v-for="product in lowStockProducts"
              :key="product.id"
              class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <!-- Left -->
              <div class="flex items-center gap-3">

                <div
                  class="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center"
                >
                  <i class="bx bx-package text-red-600 text-xl"></i>
                </div>

                <div>
                  <p class="font-semibold text-gray-800">
                    {{ product.name }}
                  </p>

                  <p class="text-xs text-gray-500">
                    {{ product.categories?.name }}
                  </p>
                </div>

              </div>

              <!-- Right -->
              <div class="text-right">

                <span
                  class="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold"
                >
                  {{ product.stock }} Left
                </span>

                <p class="text-xs text-gray-400 mt-1">
                  Min {{ product.min_stock }}
                </p>

              </div>

            </div>
          </div>

          <!-- Footer -->
          <div
            v-if="lowStockProducts.length"
            class="border-t mt-6 pt-4 flex items-center justify-between"
          >
            <span class="text-sm text-gray-500">
              Total Critical
            </span>

            <span
              class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ lowStockProducts.length }} Products
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- ================= Left ================= -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              Recent Transactions
            </h2>
            <p class="text-sm text-gray-500">
              Latest stock movements
            </p>
          </div>
          <RouterLink
            to="/transactions/history-transactions"
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </RouterLink>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b bg-gray-50">
              <tr>
                <th class="text-left py-3 px-4 text-sm font-semibold">
                  Product
                </th>
                <th class="text-center py-3 px-4 text-sm font-semibold">
                  Type
                </th>
                <th class="text-center py-3 px-4 text-sm font-semibold">
                  Qty
                </th>
                <th class="text-center py-3 px-4 text-sm font-semibold">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in recentTransactions"
                :key="item.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"
                    >
                      <i class="bx bx-package text-blue-600"></i>
                    </div>
                    <div>
                      <p class="font-medium">
                        {{ item.products?.name }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="item.type == 'IN'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'"
                  >
                    {{ item.type === 'IN' ? '+' : '-' }}{{ item.quantity }}
                  </span>
                </td>
                <td class="text-center font-semibold">
                  {{ item.quantity }}
                </td>
                <td class="text-center text-gray-500 text-sm">
                  {{ formatDate(item.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- ================= Right ================= -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              Top Products
            </h2>
            <p class="text-sm text-gray-500">
              Most stock out
            </p>
          </div>
        </div>
        <div class="space-y-5">
          <div
            v-for="(product,index) in topProducts"
            :key="product.id"
          >
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold"
                >
                  {{ index+1 }}
                </div>
                <div>
                  <p class="font-medium">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ product.total }} Sold
                  </p>
                </div>
              </div>
              <span class="font-semibold text-gray-700">
                {{ product.total }}
              </span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div
                class="h-2 rounded-full bg-blue-600"
                :style="{
                  width: (product.total / topProducts[0].total * 100) + '%'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composable/useAuth'
import { supabase } from '../lib/supabase'
import VueApexCharts from "vue3-apexcharts"

const { isAdmin, isMasterAdmin, userName, roleDisplay } = useAuth()
const currentTime = ref(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
const stats = ref({
  totalProducts: 0,
  lowStockCount: 0,
  totalCategories: 0,
  totalTransactions: 0
})
const selectedPeriod = ref(7)
const products = ref([]) // Low stock products
const lowStockProducts = ref([]) // Low stock products for the alert section
const topProducts = ref([]) // Top products based on sales
const stockHistory = ref([]) // Recent transactions
const recentTransactions = ref([]) // Recent transactions for the table

// ==================== STATE ====================
const loadDashboardData = async () => {
  try {
    const [
      { count: products, error: productError },
      { count: categories, error: categoryError },
      { count: transactions, error: transactionError }
    ] = await Promise.all([
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true }),

      supabase
        .from('categories')
        .select('*', { count: 'exact', head: true }),

      supabase
        .from('stock_movements')
        .select('*', { count: 'exact', head: true })
    ])

    if (productError) throw productError
    if (categoryError) throw categoryError
    if (transactionError) throw transactionError

    stats.value.totalProducts = products ?? 0
    stats.value.totalCategories = categories ?? 0
    stats.value.totalTransactions = transactions ?? 0
  } catch (err) {
    console.error(err)
  }
}

const loadLowStockProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      stock,  
      categories(name)
    `)
    .lt('stock', 5)
    .order('stock', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  lowStockProducts.value = data || []
  console.log('Low Stock Products:', lowStockProducts.value)
}

// ==================== FUNCTIONS ====================
const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning ☀️'
  if (hour < 18) return 'Good Afternoon 🌤️'
  return 'Good Evening 🌙'
}

const getAlertColor = (level) => {
  const colors = {
    critical: 'bg-red-600',
    low: 'bg-yellow-600',
    medium: 'bg-orange-600'
  }
  return colors[level] || 'bg-gray-600'
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

// ==================== LIFECYCLE ====================

const chartSeries = ref([
  {
    name: 'Stock In',
    data: []
  },
  {
    name: 'Stock Out',
    data: []
  }
])

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 4
  },
  colors: ['#22c55e', '#ef4444'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: []
  }
})

const loadChart = async () => {
  const { data, error } = await supabase
    .from('stock_movements')
    .select('type, quantity, created_at')
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  const grouped = {}

  data.forEach(item => {
    const date = item.created_at.slice(0, 10) // YYYY-MM-DD

    if (!grouped[date]) {
      grouped[date] = {
        in: 0,
        out: 0
      }
    }

    if (item.type === 'IN') {
      grouped[date].in += item.quantity
    } else {
      grouped[date].out += item.quantity
    }
  })

  const labels = Object.keys(grouped)

  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      categories: labels
    }
  }

  chartSeries.value = [
    {
      name: 'Stock In',
      data: labels.map(d => grouped[d].in)
    },
    {
      name: 'Stock Out',
      data: labels.map(d => grouped[d].out)
    }
  ]
}

const fetchRecentTransactions = async () => {
  const { data, error } = await supabase
    .from('stock_movements')
    .select(`
      id,
      type,
      quantity,
      created_at,
      products (
        name,
        categories (
          name
        )
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error(error)
    return
  }

  recentTransactions.value = data || []
}
const formatDate = (date) => {
  return new Date(date).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchTopProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('stock_movements')
      .select(`
        quantity,
        type,
        products (
          id,
          name
        )
      `)
      .eq('type', 'OUT')

    if (error) throw error

    // Hitung total stock out per produk
    const grouped = {}

    data.forEach(item => {
      const id = item.products.id

      if (!grouped[id]) {
        grouped[id] = {
          id,
          name: item.products.name,
          total: 0
        }
      }

      grouped[id].total += item.quantity
    })

    topProducts.value = Object.values(grouped)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  updateTime()

  await Promise.all([
    loadDashboardData(),
    loadLowStockProducts(),
    loadChart(),
    fetchRecentTransactions(),
    fetchTopProducts()
  ])

  setInterval(updateTime, 60000)
})
</script>