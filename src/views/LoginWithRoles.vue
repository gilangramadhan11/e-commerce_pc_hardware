<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-6">

    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-10">

        <div
          class="mx-auto w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg"
        >
          <i class="bx bx-package text-5xl text-white"></i>
        </div>

        <h1 class="mt-5 text-3xl font-bold text-slate-800">
          Inventory System
        </h1>

        <p class="text-slate-500 mt-2">
          Inventory Management System
        </p>

      </div>

      <!-- Card -->

      <div
        class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8"
      >

        <div class="mb-8">

          <h2 class="text-2xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p class="text-slate-500 mt-1">
            Sign in to access your dashboard
          </p>

        </div>

        <form
          @submit.prevent="handleLogin"
          class="space-y-5"
        >

          <!-- Email -->

          <div>

            <label class="block text-sm font-medium mb-2">
              Email
            </label>

            <div class="relative">

              <i
                class="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>

              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

            </div>

          </div>

          <!-- Password -->

          <div>

            <label class="block text-sm font-medium mb-2">
              Password
            </label>

            <div class="relative">

              <i
                class="bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full rounded-xl border border-slate-300 pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
              >
                <i
                  :class="showPassword ? 'bx bx-hide' : 'bx bx-show'"
                ></i>
              </button>

            </div>

          </div>

          <!-- Remember -->

          <div
            class="flex items-center justify-between text-sm"
          >

            <label class="flex items-center gap-2">

              <input
                type="checkbox"
                class="rounded border-slate-300 text-blue-600"
              >

              Remember me

            </label>

            <a
              href="#"
              class="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          <!-- Button -->

          <button
            :disabled="loading"
            type="submit"
            class="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition disabled:opacity-50"
          >

            <span v-if="!loading">

              Sign In

            </span>

            <span
              v-else
              class="flex items-center justify-center gap-2"
            >

              <i class="bx bx-loader-alt bx-spin"></i>

              Signing In...

            </span>

          </button>

        </form>

      </div>

      <p class="text-center text-sm text-slate-400 mt-8">
        © 2026 Inventory System
      </p>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import Swal from 'sweetalert2'

const router = useRouter()

// Form State
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

// Handle Login
const handleLogin = async () => {
  // Validation
  if (!email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please enter both email and password',
      confirmButtonColor: '#10b981'
    })
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address',
      confirmButtonColor: '#10b981'
    })
    return
  }

  try {
    loading.value = true

    // Attempt login with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      console.error('Login error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password',
        confirmButtonColor: '#10b981'
      })
      return
    }

    if (data.user) {
      // Get user role
      const { data: roleData } = await supabase
        .rpc('get_user_roles', { user_id: data.user.id })

      const roles = roleData?.map(r => r.role_name) || []
      const roleDisplay = getRoleDisplayName(roles[0] || 'user')

      // Success - show welcome message with role
      await Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        html: `
          <p>Hello, <strong>${data.user.email}</strong></p>
          <p class="text-sm mt-2">
            Role: <strong>${roleDisplay}</strong>
          </p>
        `,
        timer: 1500,
        showConfirmButton: false
      })
      // Redirect to dashboard
      router.push('/')
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An unexpected error occurred. Please try again.',
      confirmButtonColor: '#10b981'
    })
  } finally {
    loading.value = false
  }
}

// Get role display name
const getRoleDisplayName = (role) => {
  const names = {
    master_admin: '👑 Master Admin',
    admin: '🛡️ Administrator',
    user: '👤 User'
  }
  return names[role] || 'User'
}
</script>

<style scoped>
/* Smooth transitions */
input:focus {
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: scale(0.98);
}
</style>