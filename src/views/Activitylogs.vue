<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-1">Activity Logs</h1>
        <p class="text-gray-500 text-sm mt-1">Track all user actions and system events</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="exportLogs"
          class="flex items-center gap-2 border border-gray-200 text-gray-600 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          <i class="bx bx-save text-lg"></i>
          Export
        </button>
        <button
          @click="fetchLogs"
          :disabled="loading"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow disabled:opacity-60"
        >
          <i class="bx text-lg" :class="loading ? 'bx-loader-alt animate-spin' : 'bx-refresh'"></i>
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="i in 4" :key="`stat-skeleton-${i}`" class="p-6 rounded-lg shadow-md bg-gray-200 animate-pulse h-32"></div>
    </div>

    <!-- Stats Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Logs</p>
        <p class="text-3xl font-bold text-gray-800">{{ stats.total }}</p>
        <p class="text-xs text-gray-400 mt-1">All recorded events</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Today</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.today }}</p>
        <p class="text-xs text-gray-400 mt-1">Events this day</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Errors</p>
        <p class="text-3xl font-bold text-red-500">{{ stats.errors }}</p>
        <p class="text-xs text-gray-400 mt-1">Failed actions</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Unique Users</p>
        <p class="text-3xl font-bold text-purple-600">{{ stats.uniqueUsers }}</p>
        <p class="text-xs text-gray-400 mt-1">Active this period</p>
      </div>
    </div>

    <!-- Error Banner -->
    <div v-if="fetchError" class="mb-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
      <i class="bx bx-error-circle text-lg flex-shrink-0"></i>
      <span>{{ fetchError }}</span>
      <button @click="fetchLogs" class="ml-auto underline hover:no-underline">Retry</button>
    </div>

    <!-- Search & Filter -->
    <div class="py-4 rounded-lg mb-6 flex gap-4 flex-wrap">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by user, action, description..."
          class="w-full px-4 py-2 pl-4 pr-10 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />
        <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>

      <!-- Filter: Action Type -->
      <div class="relative">
        <select
          v-model="selectedAction"
          class="appearance-none pr-8 pl-4 py-2 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        >
          <option value="">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
          <option value="export">Export</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>

      <!-- Filter: Status -->
      <div class="relative">
        <select
          v-model="selectedStatus"
          class="appearance-none pr-8 pl-4 py-2 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>

      <!-- Filter: Date Range -->
      <div class="relative">
        <select
          v-model="selectedRange"
          class="appearance-none pr-8 pl-4 py-2 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">

            <!-- Loading Skeleton -->
            <template v-if="loading">
              <tr v-for="i in 8" :key="`skel-${i}`" class="animate-pulse">
                <td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gray-200"></div><div class="h-3 w-24 bg-gray-200 rounded"></div></div></td>
                <td class="px-6 py-4"><div class="h-5 w-16 bg-gray-200 rounded-full"></div></td>
                <td class="px-6 py-4"><div class="h-3 w-48 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-3 w-20 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-5 w-16 bg-gray-200 rounded-full"></div></td>
                <td class="px-6 py-4"><div class="h-3 w-28 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-5 w-12 bg-gray-200 rounded mx-auto"></div></td>
              </tr>
            </template>

            <!-- Empty State -->
            <template v-else-if="filteredLogs.length === 0">
              <tr>
                <td colspan="7" class="px-6 py-16 text-center">
                  <i class="bx bx-file-blank text-5xl text-gray-300 mb-3 block"></i>
                  <p class="text-gray-500 font-medium">No activity logs found</p>
                  <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
                </td>
              </tr>
            </template>

            <!-- Log Rows -->
            <template v-else>
              <tr
                v-for="log in paginatedLogs"
                :key="log.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- User -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      :style="{ backgroundColor: avatarColor(log.user_email) }"
                    >
                      {{ initials(log.user_email) }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ log.user_email?.split('@')[0] ?? '—' }}</p>
                      <p class="text-xs text-gray-400">{{ log.user_email }}</p>
                    </div>
                  </div>
                </td>

                <!-- Action Badge -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    :class="actionStyle(log.action)"
                  >
                    <i class="bx text-sm" :class="actionIcon(log.action)"></i>
                    {{ capitalize(log.action) }}
                  </span>
                </td>

                <!-- Description -->
                <td class="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  <p class="truncate" :title="log.description">{{ log.description }}</p>
                </td>

                <!-- Module -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    <i class="bx text-sm" :class="moduleIcon(log.module)"></i>
                    {{ capitalize(log.module) }}
                  </span>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    :class="statusStyle(log.status)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="statusDot(log.status)"></span>
                    {{ capitalize(log.status) }}
                  </span>
                </td>

                <!-- Timestamp -->
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <p>{{ formatDate(log.created_at) }}</p>
                  <p class="text-xs text-gray-400">{{ formatTime(log.created_at) }}</p>
                </td>

                <!-- Detail Button -->
                <td class="px-6 py-4 text-center">
                  <button
                    @click="openDetail(log)"
                    class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Detail"
                  >
                    <i class="bx bx-show text-lg"></i>
                  </button>
                </td>
              </tr>
            </template>

          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredLogs.length > 0" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {{ paginationInfo.from }}–{{ paginationInfo.to }} of {{ filteredLogs.length }} logs</span>
        <div class="flex items-center gap-1">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i class="bx bx-chevron-left text-lg"></i>
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="w-8 h-8 rounded-lg text-sm transition-colors"
            :class="currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
          >{{ page }}</button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i class="bx bx-chevron-right text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div v-if="showDetail" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showDetail = false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-semibold text-gray-800">Log Detail</h2>
            <button @click="showDetail = false" class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
              <i class="bx bx-x text-xl"></i>
            </button>
          </div>

          <div v-if="selectedLog" class="space-y-4">
            <!-- User -->
            <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                :style="{ backgroundColor: avatarColor(selectedLog.user_email) }"
              >
                {{ initials(selectedLog.user_email) }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">{{ selectedLog.user_email?.split('@')[0] }}</p>
                <p class="text-xs text-gray-400">{{ selectedLog.user_email }}</p>
              </div>
              <div class="ml-auto">
                <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" :class="statusStyle(selectedLog.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="statusDot(selectedLog.status)"></span>
                  {{ capitalize(selectedLog.status) }}
                </span>
              </div>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400 mb-1">Action</p>
                <span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" :class="actionStyle(selectedLog.action)">
                  <i class="bx text-sm" :class="actionIcon(selectedLog.action)"></i>
                  {{ capitalize(selectedLog.action) }}
                </span>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400 mb-1">Module</p>
                <span class="inline-flex items-center gap-1 text-xs text-gray-600 font-medium">
                  <i class="bx text-sm" :class="moduleIcon(selectedLog.module)"></i>
                  {{ capitalize(selectedLog.module) }}
                </span>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400 mb-1">Date</p>
                <p class="text-sm font-medium text-gray-700">{{ formatDate(selectedLog.created_at) }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-400 mb-1">Time</p>
                <p class="text-sm font-medium text-gray-700">{{ formatTime(selectedLog.created_at) }}</p>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-400 mb-1">Description</p>
              <p class="text-sm text-gray-700">{{ selectedLog.description }}</p>
            </div>

            <!-- IP Address & User Agent -->
            <div class="bg-gray-50 rounded-xl p-4 space-y-2" v-if="selectedLog.ip_address || selectedLog.user_agent">
              <div v-if="selectedLog.ip_address" class="flex items-center gap-2">
                <i class="bx bx-globe text-gray-400 text-sm"></i>
                <p class="text-xs text-gray-500">IP: <span class="text-gray-700 font-medium">{{ selectedLog.ip_address }}</span></p>
              </div>
              <div v-if="selectedLog.user_agent" class="flex items-start gap-2">
                <i class="bx bx-laptop text-gray-400 text-sm mt-0.5"></i>
                <p class="text-xs text-gray-500 break-all">{{ selectedLog.user_agent }}</p>
              </div>
            </div>

            <!-- Metadata JSON -->
            <div v-if="selectedLog.metadata" class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs text-gray-400 mb-2">Metadata</p>
              <pre class="text-xs text-green-400 overflow-x-auto">{{ JSON.stringify(selectedLog.metadata, null, 2) }}</pre>
            </div>
          </div>

          <button
            @click="showDetail = false"
            class="mt-5 w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Teleport>

    <!-- Toast -->
    <Teleport to="body">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium"
        :class="toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'"
      >
        <i class="bx text-lg" :class="toast.type === 'success' ? 'bx-check-circle' : 'bx-error-circle'"></i>
        {{ toast.message }}
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

// ─── State ────────────────────────────────────────────────────────────────────
const loading = ref(true)
const fetchError = ref(null)
const logs = ref([])

const searchQuery = ref('')
const selectedAction = ref('')
const selectedStatus = ref('')
const selectedRange = ref('')
const currentPage = ref(1)
const perPage = 10

const showDetail = ref(false)
const selectedLog = ref(null)
const toast = ref({ show: false, message: '', type: 'success' })

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchLogs()
  loading.value = false
})

// ─── Fetch ────────────────────────────────────────────────────────────────────
/**
 * Ambil data dari tabel `activity_logs`.
 * Tabel ini perlu dibuat terlebih dahulu — SQL ada di bawah.
 */
const fetchLogs = async () => {
  loading.value = true
  fetchError.value = null
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    logs.value = data ?? []
  } catch (err) {
    console.error('fetchLogs error:', err)
    fetchError.value = 'Failed to load activity logs. Check your Supabase table and permissions.'
    logs.value = mockLogs // fallback ke mock data
  } finally {
    loading.value = false
  }
}

// ─── Mock Data (fallback / development) ──────────────────────────────────────
const mockLogs = [
  { id: 1, user_email: 'andi@example.com', action: 'login', module: 'auth', description: 'User logged in successfully', status: 'success', ip_address: '192.168.1.1', user_agent: 'Mozilla/5.0 Chrome/120', metadata: null, created_at: new Date().toISOString() },
  { id: 2, user_email: 'budi@example.com', action: 'create', module: 'products', description: 'Created product "Laptop Asus X512"', status: 'success', ip_address: '192.168.1.2', user_agent: 'Mozilla/5.0 Firefox/121', metadata: { product_id: 42, name: 'Laptop Asus X512' }, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 3, user_email: 'citra@example.com', action: 'delete', module: 'users', description: 'Attempted to delete user ID 5', status: 'error', ip_address: '192.168.1.3', user_agent: null, metadata: { user_id: 5 }, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: 4, user_email: 'andi@example.com', action: 'update', module: 'orders', description: 'Updated order #1023 status to "shipped"', status: 'success', ip_address: '192.168.1.1', user_agent: null, metadata: { order_id: 1023, status: 'shipped' }, created_at: new Date(Date.now() - 10800000).toISOString() },
  { id: 5, user_email: 'budi@example.com', action: 'export', module: 'reports', description: 'Exported sales report Q1 2024', status: 'success', ip_address: '192.168.1.2', user_agent: null, metadata: { report: 'Q1-2024' }, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 6, user_email: 'deni@example.com', action: 'login', module: 'auth', description: 'Failed login attempt — wrong password', status: 'error', ip_address: '10.0.0.5', user_agent: 'Mozilla/5.0 Safari/17', metadata: null, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 7, user_email: 'eka@example.com', action: 'update', module: 'users', description: 'Updated role for user budi@example.com to Admin', status: 'success', ip_address: '192.168.1.5', user_agent: null, metadata: { target_user: 'budi@example.com', new_role: 'admin' }, created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 8, user_email: 'citra@example.com', action: 'create', module: 'categories', description: 'Created category "Elektronik"', status: 'success', ip_address: '192.168.1.3', user_agent: null, metadata: { category: 'Elektronik' }, created_at: new Date(Date.now() - 345600000).toISOString() },
  { id: 9, user_email: 'andi@example.com', action: 'logout', module: 'auth', description: 'User logged out', status: 'success', ip_address: '192.168.1.1', user_agent: null, metadata: null, created_at: new Date(Date.now() - 432000000).toISOString() },
  { id: 10, user_email: 'budi@example.com', action: 'update', module: 'products', description: 'Updated stock for product ID 42', status: 'warning', ip_address: '192.168.1.2', user_agent: null, metadata: { product_id: 42, old_stock: 10, new_stock: 0 }, created_at: new Date(Date.now() - 518400000).toISOString() },
]

// ─── Computed ─────────────────────────────────────────────────────────────────
const stats = computed(() => {
  const todayStr = new Date().toDateString()
  return {
    total: logs.value.length,
    today: logs.value.filter(l => new Date(l.created_at).toDateString() === todayStr).length,
    errors: logs.value.filter(l => l.status === 'error').length,
    uniqueUsers: new Set(logs.value.map(l => l.user_email)).size,
  }
})

const filteredLogs = computed(() => {
  let list = logs.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(l =>
      l.user_email?.toLowerCase().includes(q) ||
      l.action?.toLowerCase().includes(q) ||
      l.description?.toLowerCase().includes(q) ||
      l.module?.toLowerCase().includes(q)
    )
  }
  if (selectedAction.value) list = list.filter(l => l.action === selectedAction.value)
  if (selectedStatus.value) list = list.filter(l => l.status === selectedStatus.value)
  if (selectedRange.value) {
    const now = new Date()
    list = list.filter(l => {
      const d = new Date(l.created_at)
      if (selectedRange.value === 'today') return d.toDateString() === now.toDateString()
      if (selectedRange.value === 'week') return (now - d) <= 7 * 86400000
      if (selectedRange.value === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      return true
    })
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / perPage)))

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredLogs.value.slice(start, start + perPage)
})

const paginationInfo = computed(() => ({
  from: (currentPage.value - 1) * perPage + 1,
  to: Math.min(currentPage.value * perPage, filteredLogs.value.length),
}))

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initials = (email = '') => (email.split('@')[0] ?? '').slice(0, 2).toUpperCase()

const avatarColor = (email = '') => {
  const colors = ['#4F7CFF', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316']
  return colors[(email.charCodeAt(0) || 0) % colors.length]
}

const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1)

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatTime = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const actionStyle = (action) => {
  const map = {
    create: 'bg-green-50 text-green-700',
    update: 'bg-blue-50 text-blue-700',
    delete: 'bg-red-50 text-red-700',
    login:  'bg-purple-50 text-purple-700',
    logout: 'bg-gray-100 text-gray-600',
    export: 'bg-amber-50 text-amber-700',
  }
  return map[action] ?? 'bg-gray-100 text-gray-600'
}

const actionIcon = (action) => {
  const map = {
    create: 'bx-plus-circle',
    update: 'bx-edit',
    delete: 'bx-trash',
    login:  'bx-log-in',
    logout: 'bx-log-out',
    export: 'bx-export',
  }
  return map[action] ?? 'bx-circle'
}

const moduleIcon = (module) => {
  const map = {
    auth:       'bx-lock',
    users:      'bx-user',
    products:   'bx-box',
    orders:     'bx-cart',
    categories: 'bx-category',
    reports:    'bx-bar-chart',
    stock:      'bx-package',
  }
  return map[module] ?? 'bx-cube'
}

const statusStyle = (status) => {
  const map = {
    success: 'bg-green-50 text-green-700',
    error:   'bg-red-50 text-red-600',
    warning: 'bg-amber-50 text-amber-700',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600'
}

const statusDot = (status) => {
  const map = {
    success: 'bg-green-500',
    error:   'bg-red-400',
    warning: 'bg-amber-400',
  }
  return map[status] ?? 'bg-gray-400'
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const openDetail = (log) => {
  selectedLog.value = log
  showDetail.value = true
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const exportLogs = () => {
  const headers = ['User', 'Action', 'Module', 'Description', 'Status', 'IP Address', 'Timestamp']
  const rows = filteredLogs.value.map(l => [
    l.user_email,
    l.action,
    l.module,
    `"${(l.description ?? '').replace(/"/g, '""')}"`,
    l.status,
    l.ip_address ?? '',
    l.created_at,
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'activity_logs.csv'; a.click()
  URL.revokeObjectURL(url)
  showToast('Exported to activity_logs.csv')
}
</script>