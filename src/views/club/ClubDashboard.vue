<script setup>
import { useClubStore } from '@/stores/club'
import { useAuthStore } from '@/stores/auth'
import BaseCard from '@/components/ui/BaseCard.vue'
import { Users, UserCheck, TrendingUp, AlertCircle } from 'lucide-vue-next'

const clubStore = useClubStore()
const authStore = useAuthStore()

const stats = [
    { name: 'Total Active Members', value: clubStore.activeMembersCount, icon: Users, color: 'text-primary-600', bg: 'bg-primary-100' },
    { name: 'Attendance Rate', value: '92%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Pending Exams', value: '3', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
]
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        Welcome, {{ authStore.user?.name || 'Club Director' }}
      </h1>
      <p class="text-gray-500">
        Here's what's happening in your club today.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard
        v-for="stat in stats"
        :key="stat.name"
        class="relative overflow-hidden"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 rounded-md p-3"
            :class="stat.bg"
          >
            <component
              :is="stat.icon"
              class="h-6 w-6"
              :class="stat.color"
              aria-hidden="true"
            />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ stat.name }}
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">
                  {{ stat.value }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Recent Activity Section (Placeholder) -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        Recent Activity
      </h2>
      <BaseCard>
        <div class="text-center py-8 text-gray-500">
          No recent activity to report.
        </div>
      </BaseCard>
    </div>
  </div>
</template>
