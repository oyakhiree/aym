<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, Users, BookOpen, User, Bell, ChevronDown, LogOut } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Education', href: '/classes', icon: BookOpen },
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
</script>

<template>
  <div class="min-h-screen bg-secondary-50 font-sans text-secondary-900" @click="closeDropdown">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-50">
      <div class="flex flex-col flex-1 min-h-0 bg-white border-r border-secondary-100 shadow-sm">
        <!-- Brand & Context Selector -->
        <div class="flex flex-col px-4 py-5 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700 text-white">
          <div class="flex items-center space-x-2.5 mb-4">
             <div class="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
                <BookOpen class="w-5 h-5 text-white" />
             </div>
             <span class="text-lg font-bold tracking-tight">Royal Diadem</span>
          </div>
          
          <!-- Context Selector -->
          <div class="relative" @click.stop>
             <button 
                @click="toggleContext" 
                class="w-full flex items-center justify-between px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/10 text-sm font-medium"
             >
                <span>{{ currentContext }} Club</span>
                <ChevronDown 
                    class="w-4 h-4 text-white/70 transition-transform duration-200" 
                    :class="{ 'rotate-180': showContextDropdown }"
                />
             </button>
             
             <!-- Dropdown -->
             <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
             >
                <div v-if="showContextDropdown" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-secondary-100 py-1 overflow-hidden text-secondary-800 z-50">
                    <button 
                        @click="setContext('Pathfinder')" 
                        class="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary-50 flex items-center justify-between transition-colors"
                    >
                        Pathfinder Club
                        <div v-if="currentContext === 'Pathfinder'" class="w-2 h-2 rounded-full bg-primary-600"></div>
                    </button>
                    <button 
                        @click="setContext('Adventurer')" 
                        class="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary-50 flex items-center justify-between transition-colors"
                    >
                        Adventurer Club
                        <div v-if="currentContext === 'Adventurer'" class="w-2 h-2 rounded-full bg-primary-600"></div>
                    </button>
                </div>
             </Transition>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 flex flex-col overflow-y-auto py-5 px-3">
          <nav class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
              :class="[
                route.path === item.href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-5 w-5 transition-colors"
                :class="[
                  route.path === item.href ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'
                ]"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        
        <!-- User Profile & Notifications -->
        <div class="flex-shrink-0 border-t border-secondary-100 p-4">
          <div class="flex items-center justify-between mb-4">
             <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Alerts</span>
             <button class="relative p-2 text-secondary-500 hover:text-primary-600 hover:bg-secondary-50 transition-colors rounded-full">
                <Bell class="w-5 h-5" />
                <span class="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
             </button>
          </div>
          
          <div class="flex items-center p-3 rounded-xl bg-secondary-50/70 border border-secondary-100">
            <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-200 to-indigo-200 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
               JD
            </div>
            <div class="ml-3 flex-1 min-w-0">
              <p class="text-sm font-semibold text-secondary-900 truncate">Jane Doe</p>
              <p class="text-xs text-secondary-500 truncate">{{ currentContext }} Director</p>
            </div>
            <button class="p-2 text-secondary-400 hover:text-secondary-600 transition-colors rounded-full hover:bg-secondary-100">
                <LogOut class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-secondary-100 h-16 flex items-center justify-between px-4">
      <div class="flex items-center space-x-2.5">
         <div class="p-1.5 bg-primary-600 rounded-lg">
             <BookOpen class="w-5 h-5 text-white" />
         </div>
         <span class="font-bold text-lg text-secondary-900">Royal Diadem</span>
      </div>
      
      <div class="flex items-center space-x-2">
          <button 
            @click.stop="toggleContext" 
            class="text-sm font-medium text-secondary-600 bg-secondary-100 px-3 py-1.5 rounded-full flex items-center border border-secondary-200"
          >
             {{ currentContext }}
             <ChevronDown class="w-3 h-3 ml-1" :class="{ 'rotate-180': showContextDropdown }" />
          </button>
          <button class="relative p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-full transition-colors">
            <Bell class="w-6 h-6" />
            <span class="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
      </div>
    </header>
    
    <!-- Mobile Context Dropdown -->
    <Transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <div 
            v-if="showContextDropdown" 
            class="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-secondary-200 shadow-xl p-3 z-30"
            @click.stop
        >
           <button 
                @click="setContext('Pathfinder')" 
                class="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors" 
                :class="currentContext === 'Pathfinder' ? 'bg-primary-50 text-primary-700' : 'text-secondary-600 hover:bg-secondary-50'"
            >
               Pathfinder Club <div v-if="currentContext === 'Pathfinder'" class="w-2 h-2 rounded-full bg-primary-600"></div>
           </button>
           <button 
                @click="setContext('Adventurer')" 
                class="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors" 
                :class="currentContext === 'Adventurer' ? 'bg-primary-50 text-primary-700' : 'text-secondary-600 hover:bg-secondary-50'"
            >
               Adventurer Club <div v-if="currentContext === 'Adventurer'" class="w-2 h-2 rounded-full bg-primary-600"></div>
           </button>
        </div>
    </Transition>

    <!-- Main Content -->
    <main class="md:ml-64 pb-24 md:pb-10">
      <div class="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-secondary-100 flex justify-around pb-safe z-40">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex flex-col items-center justify-center w-full py-2.5 pb-safe-offset transition-all active:scale-95 duration-150"
        :class="[
          route.path === item.href ? 'text-primary-600' : 'text-secondary-400'
        ]"
      >
        <div 
            class="p-1.5 rounded-xl transition-colors" 
            :class="route.path === item.href ? 'bg-primary-50' : ''"
        >
            <component
              :is="item.icon"
              class="h-5 w-5"
              :stroke-width="route.path === item.href ? 2.5 : 2"
            />
        </div>
        <span class="text-[10px] font-medium mt-1">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>
