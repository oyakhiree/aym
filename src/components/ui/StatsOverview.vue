<script setup lang="ts">
import { type Component } from 'vue'

interface StatItem {
    label: string
    value: string | number
    icon: Component
    color: 'blue' | 'purple' | 'emerald' | 'indigo' | 'amber' | 'primary'
}

defineProps<{
    stats: StatItem[]
}>()

const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    primary: 'bg-primary-50 text-primary-600 border-primary-100'
}
</script>

<template>
  <div class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto py-2 md:p-1 -mx-4 px-4 md:mx-0 snap-x snap-mandatory scrollbar-hide">
    <div 
      v-for="(stat, idx) in stats"
      :key="idx"
      class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center bg-white p-4 rounded-2xl border border-secondary-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div 
        class="p-3 rounded-xl border"
        :class="colorClasses[stat.color] || colorClasses.primary"
      >
        <component
          :is="stat.icon"
          class="w-6 h-6"
        />
      </div>
      <div>
        <p class="text-xs font-semibold text-secondary-500 uppercase tracking-wider">
          {{ stat.label }}
        </p>
        <p class="text-2xl font-bold text-secondary-900">
          {{ stat.value }}
        </p>
      </div>
    </div>
  </div>
</template>
