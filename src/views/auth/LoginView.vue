<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const selectedRole = ref('Club Director')
const isLoading = ref(false)

const roles = ['Super Admin', 'Conference Director', 'Area Director', 'Club Director', 'Instructor']

const handleLogin = async () => {
  isLoading.value = true
  // Mock delay
  setTimeout(async () => {
    await authStore.login(selectedRole.value)
    router.push('/')
    isLoading.value = false
  }, 800)
}
</script>

<template>
  <div>
    <form
      class="space-y-6"
      @submit.prevent="handleLogin"
    >
      <!-- Role Selector (Demo Only) -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-secondary-700 mb-2">Select Role (Demo)</label>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="role in roles"
            :key="role" 
            type="button"
            class="px-3 py-1 text-xs rounded-full border transition-colors"
            :class="selectedRole === role ? 'bg-primary-100 border-primary-500 text-primary-700' : 'bg-white border-secondary-200 text-secondary-600 hover:bg-secondary-50'"
            @click="selectedRole = role"
          >
            {{ role }}
          </button>
        </div>
      </div>

      <BaseInput 
        id="email" 
        v-model="email" 
        label="Email Address" 
        type="email" 
        placeholder="you@example.com"
      />

      <BaseInput 
        id="password" 
        v-model="password" 
        label="Password" 
        type="password" 
        placeholder="••••••••"
      />

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          >
          <label
            for="remember-me"
            class="ml-2 block text-sm text-secondary-900"
          > Remember me </label>
        </div>
        <div class="text-sm">
          <a
            href="#"
            class="font-medium text-primary-600 hover:text-primary-500"
          > Forgot password? </a>
        </div>
      </div>

      <BaseButton
        type="submit"
        block
        :disabled="isLoading"
      >
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </BaseButton>
    </form>
  </div>
</template>
