<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Home, Users, BookOpen, User, Bell, ChevronDown, LogOut, Calendar } from 'lucide-vue-next'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Education', href: '/classes', icon: BookOpen },
  { name: 'Activities', href: '/events', icon: Calendar },
  { name: 'Profile', href: '/profile', icon: User },
]

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

// Close dropdown on click outside
const closeDropdown = () => {
    showContextDropdown.value = false
}

// Helper functions for mobile navigation classes
const getItemClasses = (isActive) => {
    return [
        isActive 
            ? 'bg-primary-50 text-primary-700 flex-grow-[1.5] shadow-sm shadow-primary-500/10 min-[400px]:flex-1 min-[400px]:grow min-[400px]:bg-transparent min-[400px]:shadow-none min-[400px]:text-primary-600' 
            : 'text-secondary-400 flex-grow hover:text-secondary-600 active:bg-secondary-50 min-[400px]:flex-1 min-[400px]:grow'
    ]
}

const getIconClasses = (isActive) => {
    return [
        isActive ? 'text-primary-600 min-[400px]:-translate-y-0.5' : 'text-current',
        'min-[400px]:h-5 min-[400px]:w-5'
    ]
}

const getTextClasses = (isActive) => {
    return [
        isActive ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0',
        'min-[400px]:max-w-none min-[400px]:opacity-100'
    ]
}
</script>

<template>
  <div
    class="min-h-screen bg-[#FDFDFD] font-sans text-secondary-900"
    @click="closeDropdown"
  >
    <!-- Desktop Sidebar -->
    <aside class="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col z-50">
      <div class="flex flex-col flex-1 min-h-0 bg-white border-r border-secondary-100/60">
        <!-- Brand & Context Selector -->
        <div class="flex flex-col px-6 py-8">
          <div class="flex items-center space-x-3 mb-8">
            <div class="h-10 w-10 overflow-hidden rounded-xl shadow-sm border border-secondary-100/50">
              <img
                src="/aym logo.png"
                alt="AYM Logo"
                class="h-full w-full object-contain"
              >
            </div>
            <span class="text-xl font-semibold tracking-tight text-secondary-900">Royal Diadem</span>
          </div>
          
          <!-- Context Selector -->
          <div
            class="relative"
            @click.stop
          >
            <button 
              class="w-full flex items-center justify-between px-4 py-3 bg-secondary-50/50 hover:bg-secondary-50 rounded-2xl transition-all duration-200 border border-secondary-100/50 group" 
              @click="toggleContext"
            >
              <div class="flex flex-col items-start">
                <span class="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-0.5">Club Context</span>
                <span class="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors">{{ currentContext }} Club</span>
              </div>
              <ChevronDown 
                class="w-4 h-4 text-secondary-400 transition-transform duration-200" 
                :class="{ 'rotate-180': showContextDropdown }"
              />
            </button>
             
            <!-- Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95 -translate-y-2"
              enter-to-class="transform opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100 translate-y-0"
              leave-to-class="transform opacity-0 scale-95 -translate-y-2"
            >
              <div
                v-if="showContextDropdown"
                class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-secondary-200/20 border border-secondary-100/80 p-1.5 overflow-hidden text-secondary-800 z-50 ring-1 ring-black/5"
              >
                <button 
                  class="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-secondary-50 flex items-center justify-between transition-colors group" 
                  @click="setContext('Pathfinder')"
                >
                  <span :class="currentContext === 'Pathfinder' ? 'font-semibold text-secondary-900' : 'text-secondary-600'">Pathfinder Club</span>
                  <div
                    v-if="currentContext === 'Pathfinder'"
                    class="w-2 h-2 rounded-full bg-primary-600 shadow-sm"
                  />
                </button>
                <button 
                  class="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-secondary-50 flex items-center justify-between transition-colors group" 
                  @click="setContext('Adventurer')"
                >
                  <span :class="currentContext === 'Adventurer' ? 'font-semibold text-secondary-900' : 'text-secondary-600'">Adventurer Club</span>
                  <div
                    v-if="currentContext === 'Adventurer'"
                    class="w-2 h-2 rounded-full bg-primary-600 shadow-sm"
                  />
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 flex flex-col overflow-y-auto px-4">
          <nav class="space-y-1.5">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200"
              :class="[
                route.path === item.href
                  ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-500/10'
                  : 'text-secondary-500 hover:bg-secondary-50 hover:text-secondary-900 hover:translate-x-1'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3.5 flex-shrink-0 h-[1.15rem] w-[1.15rem] transition-colors duration-200"
                :class="[
                  route.path === item.href ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'
                ]"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        
        <!-- User Profile & Notifications -->
        <div class="flex-shrink-0 p-6">
          <div class="bg-secondary-50/50 rounded-2xl p-1 border border-secondary-100/50">
            <div class="flex items-center p-3">
              <div class="relative">
                <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-100 to-indigo-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0 shadow-inner">
                  JD
                </div>
                <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
                
              <div class="ml-3 flex-1 min-w-0">
                <p class="text-sm font-semibold text-secondary-900 truncate">
                  Jane Doe
                </p>
                <p class="text-[11px] font-medium text-secondary-500 truncate uppercase tracking-tight">
                  {{ currentContext }} Director
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1 mt-1">
              <button class="flex items-center justify-center py-2 text-secondary-400 hover:text-secondary-600 hover:bg-white rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-secondary-200/50">
                <Bell class="w-4 h-4" />
              </button>
              <button class="flex items-center justify-center py-2 text-secondary-400 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-secondary-200/50">
                <LogOut class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-secondary-100/60 h-16 flex items-center justify-between px-4 transition-all duration-300">
      <div class="flex items-center space-x-3">
        <div class="h-8 w-8 overflow-hidden rounded-lg shadow-sm border border-secondary-100/50">
          <img
            src="/aym logo.png"
            alt="AYM Logo"
            class="h-full w-full object-contain"
          >
        </div>
        <span class="font-semibold text-lg text-secondary-900 tracking-tight">Royal Diadem</span>
      </div>
      
      <div class="flex items-center space-x-2">
        <button 
          class="text-xs font-medium text-secondary-600 bg-secondary-50 px-3 py-1.5 rounded-full flex items-center border border-secondary-200/50 active:scale-95 transition-transform" 
          @click.stop="toggleContext"
        >
          {{ currentContext }}
          <ChevronDown
            class="w-3 h-3 ml-1"
            :class="{ 'rotate-180': showContextDropdown }"
          />
        </button>
        <button class="relative p-2 text-secondary-500 hover:text-secondary-700 rounded-full transition-colors active:scale-95">
          <Bell class="w-6 h-6" />
          <span class="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
    
    <!-- Mobile Context Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="showContextDropdown" 
        class="md:hidden fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl shadow-secondary-900/10 border border-secondary-100 p-2 z-40 origin-top"
        @click.stop
      >
        <button 
          class="w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between transition-colors" 
          :class="currentContext === 'Pathfinder' ? 'bg-primary-50 text-primary-700' : 'text-secondary-600 hover:bg-secondary-50'" 
          @click="setContext('Pathfinder')"
        >
          <span class="font-medium">Pathfinder Club</span>
          <div
            v-if="currentContext === 'Pathfinder'"
            class="w-2 h-2 rounded-full bg-primary-600 shadow-sm"
          />
        </button>
        <button 
          class="w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between transition-colors" 
          :class="currentContext === 'Adventurer' ? 'bg-primary-50 text-primary-700' : 'text-secondary-600 hover:bg-secondary-50'" 
          @click="setContext('Adventurer')"
        >
          <span class="font-medium">Adventurer Club</span>
          <div
            v-if="currentContext === 'Adventurer'"
            class="w-2 h-2 rounded-full bg-primary-600 shadow-sm"
          />
        </button>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="md:ml-72 pb-[6.5rem] md:pb-10 pt-8 transition-all duration-300 ease-in-out">
      <div class="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-4 left-3 right-3 bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-secondary-900/10 rounded-2xl flex justify-between items-center p-1.5 gap-1.5 z-40 ring-1 ring-black/5 min-[400px]:p-2 min-[400px]:gap-2 transition-all duration-300">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center justify-center p-3 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative overflow-hidden hover:bg-secondary-50 min-[400px]:flex-col min-[400px]:py-3 min-[400px]:px-1"
        :class="getItemClasses(route.path === item.href)"
      >
        <div class="flex items-center gap-2 min-[400px]:flex-col min-[400px]:gap-0.5">
          <component
            :is="item.icon"
            class="h-5 w-5 flex-shrink-0 transition-colors duration-300 transform"
            :class="getIconClasses(route.path === item.href)"
            :stroke-width="route.path === item.href ? 2.5 : 2"
          />
          <span 
            class="text-xs font-bold whitespace-nowrap overflow-hidden transition-all duration-300 min-[400px]:text-[10px] min-[400px]:font-medium min-[400px]:tracking-wide min-[400px]:text-center"
            :class="getTextClasses(route.path === item.href)"
          >
            {{ item.name }}
          </span>
        </div>
      </router-link>
    </nav>
  </div>
</template>
