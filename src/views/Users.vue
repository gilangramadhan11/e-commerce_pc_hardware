<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-1">Users</h1>
        <p class="text-gray-500 text-sm mt-1">Manage system users and their permissions</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="exportUsers"
          class="flex items-center gap-2 border border-gray-200 text-gray-600 shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          <i class="bx bx-save text-lg"></i>
          Export
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
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Users</p>
        <p class="text-3xl font-bold text-gray-800">{{ stats.total }}</p>
        <p class="text-xs text-green-500 mt-1">All registered accounts</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Active</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.active }}</p>
        <p class="text-xs text-gray-400 mt-1">Currently active</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Admins</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.admins }}</p>
        <p class="text-xs text-gray-400 mt-1">Admin & Master Admin</p>
      </div>
      <div class="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Inactive</p>
        <p class="text-3xl font-bold text-red-500">{{ stats.inactive }}</p>
        <p class="text-xs text-gray-400 mt-1">Suspended accounts</p>
      </div>
    </div>

    <!-- Error Banner -->
    <div v-if="fetchError" class="mb-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
      <i class="bx bx-error-circle text-lg flex-shrink-0"></i>
      <span>{{ fetchError }}</span>
      <button @click="fetchUsers" class="ml-auto underline hover:no-underline">Retry</button>
    </div>

    <!-- Search & Filter -->
    <div class="py-4 rounded-lg mb-6 flex gap-4 flex-wrap">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full px-4 py-2 pl-4 pr-10 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />
        <i class="absolute bx bx-search right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>
      <div class="relative">
        <select
          v-model="selectedCategory"
          class="appearance-none pr-8 pl-4 py-2 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        >
          <option value="">All Roles</option>
          <option v-for="role in availableRoles" :key="role.id" :value="role.name">
            {{ roleLabel(role.name) }}
          </option>
        </select>
        <i class="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"></i>
      </div>
      <div class="relative">
        <select
          v-model="selectedStatus"
          class="appearance-none pr-8 pl-4 py-2 border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <!-- Loading Skeleton Rows -->
            <template v-if="loading">
              <tr v-for="i in 5" :key="`row-skeleton-${i}`" class="animate-pulse">
                <td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-gray-200"></div><div class="h-4 w-28 bg-gray-200 rounded"></div></div></td>
                <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-4 w-40 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-5 w-16 bg-gray-200 rounded-full"></div></td>
                <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200 rounded"></div></td>
                <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200 rounded mx-auto"></div></td>
              </tr>
            </template>

            <!-- Empty State -->
            <template v-else-if="filteredUsers.length === 0">
              <tr>
                <td colspan="6" class="px-6 py-16 text-center">
                  <i class="bx bx-user-x text-5xl text-gray-300 mb-3 block"></i>
                  <p class="text-gray-500 font-medium">No users found</p>
                  <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
                </td>
              </tr>
            </template>

            <!-- User Rows -->
            <template v-else>
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Name + Avatar -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                      :style="{ backgroundColor: avatarColor(user.email) }"
                    >
                      {{ initials(user.email) }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ user.full_name || '—' }}</p>
                      <p class="text-xs text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                </td>

                <!-- Roles (bisa multiple) -->
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="role in user.roles"
                      :key="role"
                      class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      :class="roleStyle(role)"
                    >
                      <i class="bx text-sm" :class="role === 'master_admin' ? 'bx-shield' : role === 'admin' ? 'bxs-user-badge' : 'bx-user'"></i>
                      {{ roleLabel(role) }}
                    </span>
                    <span v-if="!user.roles || user.roles.length === 0" class="text-xs text-gray-400 italic">No role</span>
                  </div>
                </td>

                <!-- Email -->
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>

                <!-- Status (dari auth.users banned / confirmed) -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    :class="user.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="user.is_active ? 'bg-green-500' : 'bg-red-400'"></span>
                    {{ user.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <!-- Created At -->
                <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      @click="openEditModal(user)"
                      class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Role"
                    >
                      <i class="bx bx-edit text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredUsers.length > 0" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {{ paginationInfo.from }}–{{ paginationInfo.to }} of {{ filteredUsers.length }} users</span>
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

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-800">{{ isEditing ? 'Edit User Role' : 'Add New User' }}</h2>
            <button @click="closeModal" class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
              <i class="bx bx-x text-xl"></i>
            </button>
          </div>

          <div class="space-y-4">
            <!-- Add: email + password -->
            <template v-if="!isEditing">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="user@example.com"
                  class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  :class="errors.email ? 'border-red-400' : 'border-gray-200'"
                />
                <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Minimum 6 characters"
                    class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    :class="errors.password ? 'border-red-400' : 'border-gray-200'"
                  />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i class="bx text-lg" :class="showPassword ? 'bx-hide' : 'bx-show'"></i>
                  </button>
                </div>
                <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
              </div>
            </template>

            <!-- Edit: tampilkan info user (read-only) -->
            <template v-else>
              <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                  :style="{ backgroundColor: avatarColor(selectedUser?.email || '') }"
                >
                  {{ initials(selectedUser?.email || '') }}
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ selectedUser?.full_name || selectedUser?.email }}</p>
                  <p class="text-xs text-gray-400">{{ selectedUser?.email }}</p>
                </div>
              </div>
            </template>

            <!-- Role (assign dari tabel roles) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div class="space-y-2">
                <label
                  v-for="role in availableRoles"
                  :key="role.id"
                  class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors"
                  :class="form.role === role.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input type="radio" v-model="form.role" :value="role.name" class="mt-0.5 accent-blue-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ roleLabel(role.name) }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ role.description }}</p>
                  </div>
                </label>
              </div>
              <p v-if="errors.role" class="text-xs text-red-500 mt-1">{{ errors.role }}</p>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button @click="closeModal" class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              @click="saveUser"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <i v-if="saving" class="bx bx-loader-alt animate-spin text-lg"></i>
              {{ isEditing ? 'Save Changes' : 'Add User' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
          <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bx bx-trash text-2xl text-red-500"></i>
          </div>
          <h2 class="text-base font-semibold text-gray-800 mb-1">Delete User</h2>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <strong class="text-gray-700">{{ selectedUser?.email }}</strong>?
            This will remove their account and all role assignments.
          </p>
          <div class="flex gap-3">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              @click="deleteUser"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors font-medium disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <i v-if="saving" class="bx bx-loader-alt animate-spin text-lg"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <Teleport to="body">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all"
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
const saving = ref(false)
const actionLoading = ref(null) // user.id yang sedang di-toggle
const fetchError = ref(null)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const perPage = 8

const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedUser = ref(null)
const showPassword = ref(false)

const form = ref({ email: '', password: '', role: 'admin' })
const errors = ref({})
const toast = ref({ show: false, message: '', type: 'success' })

const users = ref([])         // data dari users_with_roles + enrichment
const availableRoles = ref([]) // data dari tabel roles

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await Promise.all([fetchRoles(), fetchUsers()])
  loading.value = false
})

// ─── Data Fetching ────────────────────────────────────────────────────────────

/**
 * Ambil semua roles dari tabel `roles`
 */
const fetchRoles = async () => {
  const { data, error } = await supabase
    .from('roles')
    .select('id, name, description, permissions')
    .order('name')

  if (error) {
    console.error('fetchRoles error:', error)
    return
  }
  availableRoles.value = data
}

/**
 * Ambil semua user dari view `users_with_roles`.
 *
 * View ini hanya bisa dibaca oleh admin. Untuk mendapat data lengkap
 * (banned_until, email_confirmed_at) kita join via supabase.auth.admin
 * — namun di client-side kita pakai service role atau RPC.
 *
 * Alternatif: buat function/RPC di Supabase untuk list users + status.
 * Di sini kita pakai view `users_with_roles` lalu ambil status dari
 * `user_roles` dengan join manual.
 */
const fetchUsers = async () => {
  fetchError.value = null
  try {
    // Gunakan view users_with_roles yang sudah JOIN auth.users + roles
    const { data, error } = await supabase
      .from('users_with_roles')
      .select('id, email, created_at, roles')

    if (error) throw error

    // Ambil metadata tambahan (banned status) via auth.admin jika tersedia
    // Kalau tidak pakai service key, is_active default true
    users.value = (data || []).map(u => ({
      ...u,
      full_name: u.email?.split('@')[0] ?? '',
      roles: Array.isArray(u.roles) ? u.roles.filter(Boolean) : [],
      // banned_until dihandle di server; default active
      is_active: true,
    }))

    // Coba ambil banned status via admin API (butuh service role key di env)
    await enrichBanStatus()
  } catch (err) {
    console.error('fetchUsers error:', err)
    fetchError.value = 'Failed to load users. Check your Supabase permissions.'
  }
}

/**
 * Enrich users dengan ban status dari Supabase Auth Admin API.
 * Membutuhkan VITE_SUPABASE_SERVICE_KEY di .env (jangan expose ke production client!).
 * Jika tidak ada, semua user dianggap active.
 */
const enrichBanStatus = async () => {
  const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
  if (!serviceKey) return // skip kalau tidak ada service key

  try {
    const adminClient = supabase(SUPABASE_URL, serviceKey)
    const { data, error } = await adminClient.auth.admin.listUsers()
    if (error || !data?.users) return

    const banMap = {}
    data.users.forEach(u => {
      banMap[u.id] = !u.banned_until || new Date(u.banned_until) < new Date()
    })

    users.value = users.value.map(u => ({
      ...u,
      is_active: banMap[u.id] !== undefined ? banMap[u.id] : true,
    }))
  } catch (e) {
    console.warn('enrichBanStatus: could not fetch ban status', e)
  }
}

// ─── Computed ─────────────────────────────────────────────────────────────────
const stats = computed(() => ({
  total: users.value.length,
  active: users.value.filter(u => u.is_active).length,
  inactive: users.value.filter(u => !u.is_active).length,
  admins: users.value.filter(u =>
    u.roles?.includes('admin') || u.roles?.includes('master_admin')
  ).length,
}))

const filteredUsers = computed(() => {
  let list = users.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(u =>
      u.email?.toLowerCase().includes(q) ||
      u.full_name?.toLowerCase().includes(q)
    )
  }
  if (selectedCategory.value) {
    list = list.filter(u => u.roles?.includes(selectedCategory.value))
  }
  if (selectedStatus.value) {
    const isActive = selectedStatus.value === 'active'
    list = list.filter(u => u.is_active === isActive)
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / perPage)))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

const paginationInfo = computed(() => {
  const from = (currentPage.value - 1) * perPage + 1
  const to = Math.min(currentPage.value * perPage, filteredUsers.value.length)
  return { from, to }
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initials = (email = '') => {
  const name = email.split('@')[0] ?? ''
  return name.slice(0, 2).toUpperCase()
}

const avatarColor = (email = '') => {
  const colors = ['#4F7CFF', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316']
  const idx = (email.charCodeAt(0) || 0) % colors.length
  return colors[idx]
}

const roleLabel = (role) => {
  const map = { master_admin: 'Master Admin', admin: 'Admin', user: 'User' }
  return map[role] ?? role
}

const roleStyle = (role) => {
  const map = {
    master_admin: 'bg-purple-50 text-purple-700',
    admin: 'bg-blue-50 text-blue-700',
    user: 'bg-gray-100 text-gray-600',
  }
  return map[role] ?? 'bg-gray-100 text-gray-600'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// ─── Toast ────────────────────────────────────────────────────────────────────
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ─── Modal ────────────────────────────────────────────────────────────────────
const openAddModal = () => {
  isEditing.value = false
  form.value = { email: '', password: '', role: 'admin' }
  errors.value = {}
  showPassword.value = false
  showModal.value = true
}

const openEditModal = (user) => {
  isEditing.value = true
  selectedUser.value = user
  // Ambil role pertama user untuk pre-fill (jika perlu multi-role, ubah ke checkbox)
  form.value = { email: user.email, password: '', role: user.roles?.[0] ?? 'admin' }
  errors.value = {}
  showModal.value = true
}

const closeModal = () => { showModal.value = false }

const validate = () => {
  const errs = {}
  if (!isEditing.value) {
    if (!form.value.email.trim()) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.value.email)) errs.email = 'Enter a valid email.'
    if (!form.value.password || form.value.password.length < 6)
      errs.password = 'Password must be at least 6 characters.'
  }
  if (!form.value.role) errs.role = 'Please select a role.'
  errors.value = errs
  return Object.keys(errs).length === 0
}

// ─── CRUD Actions ─────────────────────────────────────────────────────────────

/**
 * Add User: buat akun via Supabase Auth Admin, lalu assign role di user_roles.
 * Edit User: hapus role lama lalu insert role baru di user_roles.
 */
const saveUser = async () => {
  if (!validate()) return
  saving.value = true

  try {
    if (isEditing.value) {
      // ── Update role via RPC (SECURITY DEFINER — bypass RLS) ─────────────────
      const userId = selectedUser.value.id

      const { error: rpcErr } = await supabase.rpc('assign_user_role', {
        p_user_id: userId,
        p_role_name: form.value.role,
      })
      if (rpcErr) throw rpcErr

      // Update local state
      const idx = users.value.findIndex(u => u.id === userId)
      if (idx !== -1) users.value[idx].roles = [form.value.role]

      const {
        data: { user: currentUser }
      } = await supabase.auth.getUser()

      await supabase.from('activity_logs').insert({
        user_email: currentUser.email,
        action: 'update',
        module: 'users',
        description: `Updated role for ${selectedUser.value.email} to ${form.value.role}`,
        status: 'success',
        metadata: {
          target: selectedUser.value.id,
          role: form.value.role
        }
      })

      showToast('Role updated successfully.')
    } else {
      // ── Create new user ──────────────────────────────────────────────────────
      // Membutuhkan service role key untuk auth.admin.createUser
      const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
      if (!serviceKey) throw new Error('VITE_SUPABASE_SERVICE_KEY is required to create users.')

      const adminClient = supabase(SUPABASE_URL, serviceKey)
      const { data: authData, error: authErr } = await adminClient.auth.admin.createUser({
        email: form.value.email,
        password: form.value.password,
        email_confirm: true,
      })
      if (authErr) throw authErr

      const newUserId = authData.user.id

      // Assign role
      const targetRole = availableRoles.value.find(r => r.name === form.value.role)
      if (targetRole) {
        await supabase.from('user_roles').insert({
          user_id: newUserId,
          role_id: targetRole.id,
        })
      }

      // Tambah ke local state
      users.value.unshift({
        id: newUserId,
        email: form.value.email,
        full_name: form.value.email.split('@')[0],
        roles: [form.value.role],
        is_active: true,
        created_at: new Date().toISOString(),
      })

      showToast('User created successfully.')
    }

    closeModal()
  } catch (err) {
    console.error('saveUser error:', err)
    showToast(err.message ?? 'Something went wrong.', 'error')
  } finally {
    saving.value = false
  }
}

/**
 * Toggle ban status via Auth Admin API.
 * Membutuhkan service role key.
 */
const toggleStatus = async (user) => {
  actionLoading.value = user.id
  try {
    const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
    if (!serviceKey) throw new Error('Service key required to change user status.')

    const adminClient = supabase(SUPABASE_URL, serviceKey)
    const newBanned = user.is_active // kalau aktif, kita ban

    const { error } = await adminClient.auth.admin.updateUserById(user.id, {
      ban_duration: newBanned ? '876600h' : 'none', // ban = 100 tahun | unban = 'none'
    })
    if (error) throw error

    user.is_active = !user.is_active
    showToast(`User ${user.is_active ? 'activated' : 'deactivated'}.`)
  } catch (err) {
    showToast(err.message ?? 'Failed to update status.', 'error')
  } finally {
    actionLoading.value = null
  }
}

const confirmDelete = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

/**
 * Delete user via Auth Admin API (cascade ke user_roles otomatis via FK).
 */
const deleteUser = async () => {
  saving.value = true
  try {
    const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
    if (!serviceKey) throw new Error('Service key required to delete users.')

    const adminClient = supabase(SUPABASE_URL, serviceKey)
    const { error } = await adminClient.auth.admin.deleteUser(selectedUser.value.id)
    if (error) throw error

    users.value = users.value.filter(u => u.id !== selectedUser.value.id)
    showDeleteModal.value = false
    showToast('User deleted.')
  } catch (err) {
    showToast(err.message ?? 'Failed to delete user.', 'error')
  } finally {
    saving.value = false
  }
}

/**
 * Export filtered users ke CSV
 */
const exportUsers = () => {
  const headers = ['Email', 'Roles', 'Status', 'Created At']
  const rows = filteredUsers.value.map(u => [
    u.email,
    (u.roles ?? []).map(roleLabel).join('; '),
    u.is_active ? 'Active' : 'Inactive',
    u.created_at?.slice(0, 10) ?? '',
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'users.csv'; a.click()
  URL.revokeObjectURL(url)
  showToast('Exported to users.csv')
}

</script>