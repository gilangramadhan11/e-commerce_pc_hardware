<template>
  <div class="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex">

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- LEFT SIDE - BRANDING & DESCRIPTION -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div class="hidden lg:flex lg:w-1/2 flex-col justify-center items-start p-12">

      <!-- Logo Section -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-14 h-14 bg-linear-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <i class="bx bx-package text-white text-3xl"></i>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Inventory</h1>
            <p class="text-sm text-green-300 font-medium">Management System</p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="w-16 h-1 bg-linear-to-r from-green-400 to-emerald-600 rounded-full mb-8"></div>

      <!-- Description -->
      <div class="max-w-md">
        <h2 class="text-3xl font-bold text-white mb-4 leading-tight">
          Smart Inventory Management
        </h2>
        <p class="text-gray-300 text-lg mb-8 leading-relaxed">
          Track, manage, and optimize your stock with our comprehensive inventory management system. Real-time insights to keep your business running smoothly.
        </p>

        <!-- Features List -->
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <i class="bx bx-check text-green-400 text-sm"></i>
            </div>
            <div>
              <p class="text-white font-semibold">Real-time Stock Tracking</p>
              <p class="text-gray-400 text-sm">Monitor inventory levels 24/7</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <i class="bx bx-check text-green-400 text-sm"></i>
            </div>
            <div>
              <p class="text-white font-semibold">Automated Alerts</p>
              <p class="text-gray-400 text-sm">Get notified when stock runs low</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <i class="bx bx-check text-green-400 text-sm"></i>
            </div>
            <div>
              <p class="text-white font-semibold">Detailed Analytics</p>
              <p class="text-gray-400 text-sm">Comprehensive reports and insights</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <i class="bx bx-check text-green-400 text-sm"></i>
            </div>
            <div>
              <p class="text-white font-semibold">Multi-User Support</p>
              <p class="text-gray-400 text-sm">Collaborate with your team seamlessly</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Brand -->
      <div class="mt-auto pt-12 border-t border-gray-700/50 w-full">
        <p class="text-gray-400 text-sm">
          <span class="text-white font-semibold">Inventory System</span> © 2024. All rights reserved.
        </p>
      </div>

    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- RIGHT SIDE - LOGIN FORM -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">

      <div class="w-full max-w-md">

        <!-- Logo (Mobile Only) -->
        <div class="lg:hidden mb-8 text-center">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <i class="bx bx-package text-white text-2xl"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Inventory</h1>
              <p class="text-xs text-green-300 font-medium">Management System</p>
            </div>
          </div>
        </div>

        <!-- Form Header -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p class="text-gray-400">Sign in to your account to continue</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bx bx-envelope mr-2"></i>Email Address
            </label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                class="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
              >
              <i class="bx bx-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bx bx-lock-alt mr-2"></i>Password
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all pr-12"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                title="Toggle password visibility"
              >
                <i :class="['bx text-lg', showPassword ? 'bx-hide' : 'bx-show']"></i>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-600 bg-gray-800 cursor-pointer accent-green-500"
              >
              <span>Remember me</span>
            </label>
            <a href="#" class="text-green-400 hover:text-green-300 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/50"
          >
            <i v-if="loading" class="bx bx-loader-circle bx-spin text-lg"></i>
            <i v-else class="bx bx-lock-open-alt text-lg"></i>
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>

        </form>

        <!-- Demo Credentials -->
        <div class="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p class="text-xs text-blue-300 font-semibold mb-2">
            <i class="bx bx-info-circle mr-1"></i>Demo Credentials
          </p>
          <div class="space-y-1 text-xs text-blue-200">
            <p><span class="text-blue-400 font-mono">Email:</span> admin@inventory.com</p>
            <p><span class="text-blue-400 font-mono">Password:</span> password123</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-3 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="py-2.5 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <i class="bx bxl-google text-lg"></i>
            <span class="hidden sm:inline">Google</span>
          </button>
          <button
            type="button"
            class="py-2.5 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <i class="bx bxl-microsoft text-lg"></i>
            <span class="hidden sm:inline">Microsoft</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-8 text-center">
          <p class="text-gray-400 text-sm">
            Don't have an account?
            <a href="#" class="text-green-400 hover:text-green-300 font-bold transition-colors">
              Create one
            </a>
          </p>
        </div>

      </div>

    </div>

    <!-- Background Decoration -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
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
      // Success
      await Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: `Hello, ${data.user.email}!`,
        timer: 1500,
        showConfirmButton: false
      })

      // Redirect to dashboard
      router.push('/dashboard')
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

// Demo Login (for testing)
const demoLogin = async () => {
  email.value = 'admin@inventory.com'
  password.value = 'password123'
  await handleLogin()
}

// Handle Enter key
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
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