<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, Users, BookOpen, User, Menu, Bell, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Education', href: '/classes', icon: BookOpen },
  { name: 'Profile', href: '/profile', icon: User },
]

const currentRouteName = computed(() => route.name)

// Desktop Sidebar State
const sidebarOpen = ref(false)

// Context Logic
const currentContext = ref('Pathfinder')
const showContextDropdown = ref(false)

const toggleContext = () => {
    showContextDropdown.value = !showContextDropdown.value
}

const setContext = (context) => {
    currentContext.value = context
    showContextDropdown.value = false
}
</script>

<template>
  <div class="min-h-screen bg-secondary-50 font-sans text-secondary-900">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col shadow-xl z-50 bg-white">
      <div class="flex flex-col flex-1 min-h-0 border-r border-secondary-200">
        <!-- Brand & Context Selector -->
        <div class="flex flex-col px-4 py-5 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
          <div class="flex items-center space-x-2 mb-4">
             <!-- Logo Placeholder -->
             <div class="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <BookOpen class="w-6 h-6 text-white" />
             </div>
             <span class="text-lg font-bold tracking-tight">Meridian</span>
          </div>
          
          <!-- Context Selector -->
          <div class="relative">
             <button 
                @click="toggleContext" 
                class="w-full flex items-center justify-between px-3 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-colors border border-white/10 text-sm font-medium"
             >
                <span>{{ currentContext }} Club</span>
                <ChevronDown class="w-4 h-4 text-white/70" />
             </button>
             
             <!-- Dropdown -->
             <div v-if="showContextDropdown" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden text-gray-800 z-50">
                <button @click="setContext('Pathfinder')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between">
                   Pathfinder <div v-if="currentContext === 'Pathfinder'" class="w-2 h-2 rounded-full bg-primary-600"></div>
                </button>
                <button @click="setContext('Adventurer')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between">
                   Adventurer <div v-if="currentContext === 'Adventurer'" class="w-2 h-2 rounded-full bg-primary-600"></div>
                </button>
             </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col overflow-y-auto pt-5 pb-4 px-3">
          <nav class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out"
              :class="[
                route.path === item.href
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-5 w-5 transition-colors"
                :class="[
                  route.path === item.href ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        
        <!-- User Profile & Notifications -->
        <div class="flex-shrink-0 border-t border-secondary-100 p-4 bg-secondary-50/50">
          <div class="flex items-center justify-between mb-4">
             <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Notifications</span>
             <button class="relative p-1.5 text-secondary-500 hover:text-primary-600 transition-colors rounded-full hover:bg-white">
                <Bell class="w-5 h-5" />
                <span class="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
             </button>
          </div>
          
          <div class="flex items-center p-2 rounded-xl bg-white border border-secondary-200 shadow-sm">
            <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-100 to-indigo-100 flex items-center justify-center text-primary-700 font-bold border border-white shadow-inner">
               JD
            </div>
            <div class="ml-3 overflow-hidden">
              <p class="text-sm font-semibold text-secondary-900 truncate">Jane Doe</p>
              <p class="text-xs text-secondary-500 truncate">{{ currentContext }} Director</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden sticky top-0 z-30 bg-white border-b border-secondary-200 h-16 flex items-center justify-between px-4 shadow-sm">
      <div class="flex items-center space-x-2">
         <div class="p-1.5 bg-primary-600 rounded-lg">
             <BookOpen class="w-5 h-5 text-white" />
         </div>
         <span class="font-bold text-lg text-secondary-900">Meridian</span>
      </div>
      
      <div class="flex items-center space-x-2">
          <button @click="toggleContext" class="text-sm font-medium text-secondary-600 bg-secondary-50 px-3 py-1.5 rounded-full flex items-center border border-secondary-200">
             {{ currentContext }}
             <ChevronDown class="w-3 h-3 ml-1" />
          </button>
          <button class="relative p-2 text-secondary-500 hover:text-secondary-700">
            <Bell class="w-6 h-6" />
            <span class="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
      </div>
      
       <!-- Mobile Context Dropdown -->
       <div v-if="showContextDropdown" class="absolute top-16 left-0 right-0 bg-white border-b border-secondary-200 shadow-xl p-2 z-40 animate-in slide-in-from-top-2">
           <button @click="setContext('Pathfinder')" class="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between" :class="currentContext === 'Pathfinder' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'">
               Pathfinder Club <div v-if="currentContext === 'Pathfinder'" class="w-2 h-2 rounded-full bg-primary-600"></div>
           </button>
           <button @click="setContext('Adventurer')" class="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between" :class="currentContext === 'Adventurer' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'">
               Adventurer Club <div v-if="currentContext === 'Adventurer'" class="w-2 h-2 rounded-full bg-primary-600"></div>
           </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="md:ml-64 pb-20 md:pb-8 transition-all duration-300">
      <div class="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 flex justify-around pb-safe z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex flex-col items-center justify-center w-full py-2 pb-safe-offset transition-all active:scale-95 duration-200"
        :class="[
          route.path === item.href ? 'text-primary-600' : 'text-secondary-400 hover:text-secondary-500'
        ]"
      >
        <div class="relative p-1 rounded-full" :class="route.path === item.href ? 'bg-primary-50' : ''">
            <component
              :is="item.icon"
              class="h-6 w-6"
              :stroke-width="route.path === item.href ? 2.5 : 2"
            />
        </div>
        <span class="text-[10px] font-medium mt-0.5">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
.pb-safe-offset {
    padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
}
</style>
