<script setup lang="ts">
import { Award } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { READINESS_THRESHOLD } from '@/constants/curriculum'
import type { Student } from '@/types'

interface Props {
    roster: Student[]
}

defineProps<Props>()

defineEmits<{
    'requestExam': [studentId: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Info Banner -->
    <div class="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-5 flex gap-4 text-blue-800 text-sm shadow-sm">
      <div class="p-2 bg-blue-100 rounded-lg h-fit text-blue-600">
        <Award class="w-5 h-5 flex-shrink-0" />
      </div>
      <div>
        <h4 class="font-bold mb-1 text-blue-900">
          Final Exam Eligibility
        </h4>
        <p class="leading-relaxed text-blue-700/80">
          Students must achieve a Readiness Score of <strong class="text-blue-900">{{ READINESS_THRESHOLD }}% or higher</strong> to take the final exam. This score is calculated based on attendance (40%) and assignment grades (60%).
        </p>
      </div>
    </div>

    <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="student in roster" 
        :key="student.id" 
        class="bg-white p-5 rounded-2xl border border-secondary-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary-100 transition-all duration-300 group"
      >
        <div class="flex justify-between items-start mb-5">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-secondary-100 flex items-center justify-center font-bold text-sm text-secondary-600 shadow-inner">
              {{ student.name.charAt(0) }}
            </div>
            <div>
              <h3 class="font-bold text-secondary-900 leading-tight group-hover:text-primary-700 transition-colors">
                {{ student.name }}
              </h3>
              <p class="text-xs text-secondary-500 font-medium">
                ID: {{ student.id }}
              </p>
            </div>
          </div>
                    
          <div 
            class="px-2.5 py-1 rounded-lg text-xs font-bold border"
            :class="[
              (student.readinessScore ?? 0) >= 75 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
              (student.readinessScore ?? 0) >= 50 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
              'bg-red-50 text-red-700 border-red-100'
            ]"
          >
            {{ student.readinessScore || 0 }}% Ready
          </div>
        </div>
                
        <div class="space-y-4">
          <div class="space-y-1.5">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-wider text-secondary-400">
              <span>Progress</span>
              <span>{{ student.readinessScore || 0 }}/100</span>
            </div>
            <div class="w-full bg-secondary-100/50 rounded-full h-2 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :style="{ width: `${student.readinessScore || 0}%` }"
                :class="[
                  (student.readinessScore ?? 0) >= 75 ? 'bg-emerald-500' : 
                  (student.readinessScore ?? 0) >= 50 ? 'bg-amber-500' : 
                  'bg-red-500'
                ]"
              />
            </div>
          </div>

          <div class="pt-2">
            <BaseButton 
              v-if="student.examStatus === 'None' || !student.examStatus"
              :disabled="!student.examEligible" 
              class="w-full justify-center shadow-lg shadow-primary-500/10"
              :variant="student.examEligible ? 'primary' : 'secondary'"
              @click="$emit('requestExam', student.id)"
            >
              {{ student.examEligible ? 'Request Exam' : 'Not Eligible Yet' }}
            </BaseButton>
            <div 
              v-else 
              class="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wide rounded-xl border transition-colors"
              :class="student.examStatus === 'Requested' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-secondary-50 text-secondary-600 border-secondary-100'"
            >
              {{ student.examStatus === 'Requested' ? 'Exam Requested' : student.examStatus }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
