<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { Member } from '@/types'

/**
 * MemberCardList - Mobile card view for member list
 * 
 * This component and MemberTable share the same interface contract
 * for consistent behavior across different viewport sizes.
 */
interface Props {
    members: Member[]
}

defineProps<Props>()

defineEmits<{
    view: [id: string]
    toggleStatus: [id: string]
}>()
</script>

<template>
  <div class="space-y-3 pb-safe">
    <div
      v-for="member in members"
      :key="member.id"
      class="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-primary-900/5 hover:-translate-y-1 overflow-hidden"
      @click="$emit('view', member.id)"
    >
      <!-- Fluid gradient blob background effect -->
      <div class="absolute -right-12 -top-12 w-32 h-32 bg-primary-100/30 rounded-full blur-3xl group-hover:bg-primary-200/40 transition-colors duration-500" />
      
      <div class="relative flex items-center justify-between z-10">
        <!-- Left: Avatar & Info -->
        <div class="flex items-center gap-4">
          <!-- Avatar container with status indicator ring -->
          <div class="relative">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-secondary-50 to-white flex items-center justify-center text-secondary-700 font-bold text-sm border border-white shadow-sm ring-1 ring-secondary-100/50">
              {{ member.firstName[0] }}{{ member.lastName[0] }}
            </div>
            <!-- Status Dot -->
            <span 
              class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
              :class="member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'"
            />
          </div>

          <div class="flex flex-col">
            <h3 class="text-base font-bold text-secondary-900 leading-none mb-1 group-hover:text-primary-600 transition-colors">
              {{ member.firstName }} {{ member.lastName }}
            </h3>
            <div class="flex items-center gap-2 text-xs text-secondary-500 font-medium">
              <span class="bg-secondary-100/50 px-2 py-0.5 rounded-md text-secondary-600 border border-secondary-100/50">
                {{ member.class }}
              </span>
              <span class="w-1 h-1 rounded-full bg-secondary-300" />
              <span>{{ member.gender }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Action Trigger -->
        <button 
          class="h-9 w-9 flex items-center justify-center rounded-full bg-secondary-50 text-secondary-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all duration-300 shadow-sm"
        >
          <ChevronRight class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  </div>
</template>
