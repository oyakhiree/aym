<script setup>
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps({
    members: Array
})

const emit = defineEmits(['view', 'toggleStatus'])
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="member in members"
      :key="member.id"
      class="bg-white rounded-2xl border border-secondary-100 p-4 flex items-center gap-4 hover:shadow-lg hover:border-primary-100 transition-all duration-300 cursor-pointer active:scale-[0.98] group relative"
      @click="$emit('view', member.id)"
    >
      <!-- Card highlight on hover -->
      <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />

      <div class="flex-shrink-0">
        <div class="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-sm border border-primary-100/50">
          {{ member.firstName[0] }}{{ member.lastName[0] }}
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <p class="text-sm font-bold text-secondary-900 truncate group-hover:text-primary-700 transition-colors">
            {{ member.firstName }} {{ member.lastName }}
          </p>
          <span 
             class="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
             :class="member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-secondary-50 text-secondary-500 border-secondary-100'"
          >
            {{ member.status }}
          </span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs font-medium px-2 py-0.5 rounded-md bg-secondary-50 text-secondary-600 border border-secondary-100">
            {{ member.class }}
          </span>
          <span class="text-xs text-secondary-400">• {{ member.gender }}</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <ChevronRight class="w-5 h-5 text-secondary-300 group-hover:text-primary-500 transition-colors" />
      </div>
    </div>
  </div>
</template>
