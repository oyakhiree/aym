<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, Users, BookOpen, User, Menu, Bell } from 'lucide-vue-next'

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
</script>

<template>
  <div class="min-h-screen bg-secondary-50 font-sans text-secondary-900">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div class="flex flex-col flex-1 min-h-0 bg-white border-r border-secondary-200">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-primary-600">
          <span class="text-xl font-bold text-white tracking-tight">AYM Connect</span>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                route.path === item.href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-6 w-6"
                :class="[
                  route.path === item.href ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-500'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        <div class="flex-shrink-0 flex border-t border-secondary-200 p-4">
          <div class="flex items-center">
            <div>
              <div class="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                JD
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-secondary-700">
                Jane Doe
              </p>
              <p class="text-xs font-medium text-secondary-500">
                Club Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden sticky top-0 z-20 bg-white border-b border-secondary-200 h-16 flex items-center justify-between px-4">
      <div class="font-bold text-lg text-primary-700">
        AYM Connect
      </div>
      <button class="p-2 text-secondary-500 hover:text-secondary-700">
        <Bell class="w-6 h-6" />
      </button>
    </header>

    <!-- Main Content -->
    <main class="md:ml-64 pb-20 md:pb-8">
      <div class="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 flex justify-around pb-safe z-30">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex flex-col items-center justify-center w-full py-2 pb-safe-offset transition-colors active:scale-95"
        :class="[
          route.path === item.href ? 'text-primary-600' : 'text-secondary-400'
        ]"
      >
        <component
          :is="item.icon"
          class="h-6 w-6 mb-1"
        />
        <span class="text-[10px] font-medium">{{ item.name }}</span>
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
