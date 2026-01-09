<script setup>
import { computed, ref } from 'vue'
import { useClubStore } from '@/stores/club'
import { Plus, Search, MoreVertical, Edit, Trash } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const clubStore = useClubStore()
const searchQuery = ref('')

const filteredMembers = computed(() => {
    return clubStore.members.filter(member => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()
        return fullName.includes(searchQuery.value.toLowerCase())
    })
})

const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Club Members
        </h1>
        <p class="text-sm text-gray-500">
          Manage your club roster and status
        </p>
      </div>
      <BaseButton class="w-full sm:w-auto">
        <Plus class="w-5 h-5 mr-2" />
        Add Member
      </BaseButton>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search members..." 
          class="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition duration-150 ease-in-out sm:min-h-[44px]"
        >
      </div>
    </div>

    <!-- Mobile: Card View -->
    <div class="grid grid-cols-1 gap-4 sm:hidden">
      <BaseCard
        v-for="member in filteredMembers"
        :key="member.id"
        no-padding
        class="relative"
      >
        <div class="p-4 flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
              {{ member.firstName[0] }}{{ member.lastName[0] }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ member.firstName }} {{ member.lastName }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ member.class }}
            </p>
          </div>
          <div>
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer select-none"
              :class="getStatusColor(member.status)"
              @click="clubStore.toggleStatus(member.id)"
            >
              {{ member.status }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Desktop: Table View -->
    <div class="hidden sm:block overflow-hidden border border-secondary-200 rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-secondary-200">
        <thead class="bg-secondary-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
            >
              Class
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
            >
              Gender
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              class="relative px-6 py-3"
            >
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-secondary-200">
          <tr
            v-for="member in filteredMembers"
            :key="member.id"
            class="hover:bg-secondary-50 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {{ member.firstName[0] }}{{ member.lastName[0] }}
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ member.firstName }} {{ member.lastName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ member.guardian }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ member.class }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">
                {{ member.gender }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer select-none transition-colors hover:opacity-80"
                :class="getStatusColor(member.status)"
                @click="clubStore.toggleStatus(member.id)"
              >
                {{ member.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-primary-600 hover:text-primary-900 mr-4">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
