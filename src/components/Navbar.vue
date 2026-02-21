<template>
  <div class="pr-6 pb-3 pt-3">
    <nav class="h-14 bg-white flex items-center px-3 rounded-3xl shadow-lg">
      <div class="relative w-64">
        <i class="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text"
          v-model="search"
          placeholder="Search..."
          class="pl-9 pr-3 w-40 focus:w-64 transition-all duration-300 rounded-xl focus:bg-slate-100 outline-none text-sm">
          <Transition name="dropdown">
            <div 
              v-show="filteredMenu.length"
              class="absolute mt-5 w-full bg-white rounded-2xl shadow-lg z-50">
              <button
                v-for="item in filteredMenu"
                :key="item.name"
                class="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
              >{{ item.name }}
              </button>
            </div>
          </Transition>
      </div>
      <div class="ml-auto flex items-center">
        <div class="relative" ref="closeNotifOutside">
          <button class="relative rounded-lg gap-2 p-2 items-center cursor-pointer hover:bg-slate-100 hover:rounded-full"
          @click.stop="toggleNotif">
          <i 
            class="bx bx-bell text-xl"
            :class="unreadCount > 0 ? 'animate-bell text-indigo-600' : ''">
          </i>
          <span 
            v-if="unreadCount > 0"
            class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full
            ">

          </span> 
        </button>
          <Transition name="dropdown">
            <div 
              v-show="notifMenu"
              class="absolute right-0 mt-3 w-36 bg-white rounded-2xl shadow-lg origin-top overflow-hidden transition-all duration-300 ease-out transform"
              :class="notifMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'">
              <div class="px-4 py-3 font-semibold text-sm border-b">
                Notification
              </div>
              <div class="max-h-64 overflow-auto">
                <div 
                  v-for="notif in notifikasi" 
                  :key="notif.id"
                  @click="markAsRead(notif)"
                  class="px-4 py-3 gap-3 text-sm cursor-pointer hover:bg-slate-100 transition"
                  :class="notif.unread ? 'bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-gray-100'" >
                  <span class="w-2 h-2 mt-1 rounded-full"
                    :class="notif.unread ? 'bg-indigo-500' : 'bg-transparent'">
                  </span>
                  <div>
                    <P class="text-gray-700">{{ notif.text }}</P>
                    <P class="text-gray-400 text-xs">{{ notif.time }}</P>
                  </div>
                </div>
              </div>
              <div class="text-center py-2 text-sm text-indigo-600 hover:bg-gray-50 hover:rounded-2xl">
                View All
              </div>
            </div>
          </Transition>
        </div>
        <div class="relative" ref="dropdownOutside">
          <button class="flex items-center gap-2 px-2 py-2 rounded-lg hover:cursor-pointer" @click.stop="toggleUserMenu">
            <img src="../assets/img/irene.jpg" class="w-8 h-8 rounded-full object-cover" alt="User">
            <span class="text-sm text-slate-700 font-medium">Irene</span>
            <i class="bx bx-chevron-down"></i>
          </button>
          <!-- Dropdown -->
          <Transition name="dropdown">
            <div
              v-show="userMenu"
              class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lg overflow-hidden  origin-top transition-all duration-200 ease-out transform"
              :class="userMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'"
            >
            <div class="relative h-36 bg-linear-to-r from-blue-500 to-indigo-700 overflow-hidden">
              <div class="relative z-10 h-full flex flex-col items-center justify-center text-sm gap-1">
                <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md z-10">
                  <img src="../assets/img/irene.jpg" class="w-full h-full rounded-full object-cover" alt="User">
                </div>
                  <p class="font-semibold text-white text-sm">Irene</p>
                  <p class="text-white text-xs">Admin</p>
              </div>
                <svg
                  class="absolute bottom-0 left-0 w-full"
                  viewBox="0 0 1440 90"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d="M0,30 
                      C120,90 240,10 360,30
                      C480,70 600,100 720,60
                      C840,20 960,10 1080,35
                      C1200,60 1320,90 1440,50
                      L1440,100 L0,100 Z"
                  />
                </svg>
              </div>
              <div class="py-2 flex flex-col items-left gap-1"> 
                <button class="inline-flex items-center gap-3 px-4 py-2 hover:bg-slate-100 cursor-pointer hover:rounded-3xl hover:text-sky-500">
                  <i class="bx bx-cog text-lg hover:text-sky-500"></i>Setting
                </button>
                <button class="inline-flex items-center gap-3 px-4 py-2 hover:bg-slate-100 cursor-pointer hover:rounded-3xl hover:text-sky-500">
                  <i class="bx bx-user text-lg hover:text-sky-500"></i>Account
                </button>
                <button class="inline-flex items-center gap-3 px-4 py-2 hover:bg-slate-100 cursor-pointer hover:rounded-3xl text-red-500 ">
                  <i class="bx bx-log-out text-lg"></i>Logout
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>  
    </nav>
  </div>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

  const userMenu = ref(false)
  const dropdownOutside = ref(null)
  const notifMenu = ref(false)
  const closeNotifOutside = ref(null)
  const search = ref ('')

  function toggleUserMenu(){
    userMenu.value = !userMenu.value
    notifMenu.value = false
  }

  function handleClickOutside(e){
    if(dropdownOutside.value && !dropdownOutside.value.contains(e.target)){
      userMenu.value = false
  }}

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  const notifikasi = ref([
    { id:1, text: 'User baru', time:'2 menit lalu', unread: true},
    { id:2, text: 'Order Berhasil', time:'5 menit lalu', unread: true},
    { id:3, text: 'Server restart', time:'10 menit lalu', unread: false},
  ])

  function toggleNotif () {
    notifMenu.value = !notifMenu.value
    userMenu.value = false
  }

  function handleClickOutsideNotif(e){
    if(closeNotifOutside.value && !closeNotifOutside.value.contains(e.target)){
      notifMenu.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutsideNotif)
  })

  onBeforeUnmount(()=> {
    document.removeEventListener('click', handleClickOutsideNotif)
  })

  const unreadCount = computed (()=>
    notifikasi.value.filter(n => n.unread).length
  )

  function markAsRead(notif){
    notif.unread = false
  }

  const menuList = ref([
    { name: 'Dashboard' },
    { name: 'Users' },
    { name: 'Settings' },
  ])

  const filteredMenu = computed(() => {
    if (!search.value) return []
    return menuList.value.filter(m =>
      m.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })

</script>