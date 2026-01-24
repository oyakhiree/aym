<script setup lang="ts">
import { ref } from 'vue'
import { Plus, FolderOpen, ChevronDown, ChevronUp, Calendar, FileText, Download, Users } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Student, Assignment } from '@/types'

interface Props {
    roster: Student[]
    assignments: Assignment[]
}

interface GradeUpdate {
    studentId: string
    assignmentId: string
    score: number
}

defineProps<Props>()

const emit = defineEmits<{
    'createAssignment': []
    'updateGrade': [data: GradeUpdate]
}>()

const expandedAssignmentId = ref<string | null>(null)

const toggleAssignment = (id: string) => {
    expandedAssignmentId.value = expandedAssignmentId.value === id ? null : id
}

const handleGrade = (studentId: string, assignmentId: string, event: Event): void => {
    const target = event.target as HTMLInputElement
    const score = parseInt(target.value) || 0
    emit('updateGrade', { studentId, assignmentId, score })
}

const getGradePercentage = (score: number, max: number): number => {
    if (!max) return 0
    return Math.round((score / max) * 100)
}

const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-emerald-600 bg-emerald-50'
    if (percentage >= 70) return 'text-primary-600 bg-primary-50'
    if (percentage >= 50) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-xl font-bold text-secondary-900 tracking-tight">
          Assignments & Grades
        </h3>
        <p class="text-secondary-500 text-sm mt-1">
          Manage classwork, homework, and assessments.
        </p>
      </div>
      <BaseButton
        class="shadow-lg shadow-primary-500/20 w-full sm:w-auto justify-center"
        @click="$emit('createAssignment')"
      >
        <Plus class="w-4 h-4 mr-2" /> New Assignment
      </BaseButton>
    </div>

    <!-- Assignments List (Accordion) -->
    <div v-if="assignments.length > 0" class="space-y-3">
      <div 
        v-for="assign in assignments" 
        :key="assign.id"
        class="group bg-white rounded-2xl border border-secondary-100/50 transition-all duration-300"
        :class="expandedAssignmentId === assign.id ? 'shadow-lg shadow-black/[0.02] ring-1 ring-secondary-900/5' : 'hover:border-secondary-200/80 hover:shadow-sm'"
      >
        <!-- Header / Toggle -->
        <div 
          class="p-5 flex items-center justify-between cursor-pointer select-none"
          @click="toggleAssignment(assign.id)"
        >
          <div class="flex items-center gap-5">
            <div 
              class="h-10 w-10 flex items-center justify-center rounded-full transition-colors duration-300"
              :class="expandedAssignmentId === assign.id ? 'bg-secondary-900 text-white' : 'bg-secondary-50 text-secondary-400 group-hover:bg-secondary-100 group-hover:text-secondary-600'"
            >
              <FileText class="w-5 h-5" stroke-width="2" />
            </div>
            
            <div class="flex flex-col gap-1">
              <h4 class="text-base font-semibold text-secondary-900 leading-none tracking-tight">
                {{ assign.title }}
              </h4>
              <div class="flex items-center gap-3 text-xs text-secondary-500">
                <span class="font-medium">{{ assign.type }}</span>
                <span class="w-1 h-1 rounded-full bg-secondary-200" />
                <span>{{ new Date(assign.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}</span>
                <span class="w-1 h-1 rounded-full bg-secondary-200" />
                 <span class="font-medium">Max: {{ assign.maxScore }}</span>
              </div>
            </div>
          </div>
          
          <div 
             class="h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300"
             :class="expandedAssignmentId === assign.id ? 'bg-secondary-100 text-secondary-900 rotate-180' : 'text-secondary-300 group-hover:bg-secondary-50'"
          >
            <ChevronDown class="w-5 h-5" stroke-width="2.5" />
          </div>
        </div>

        <!-- Expanded Content (Grading Table) -->
        <div 
          v-show="expandedAssignmentId === assign.id"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-secondary-100 text-xs font-medium text-secondary-400 uppercase tracking-widest bg-gray-50/30">
                  <th class="pl-8 pr-6 py-3 font-semibold min-w-[200px]">Student</th>
                  <th class="px-6 py-3 text-center w-32 font-semibold">Score</th>
                  <th class="px-6 py-3 text-center w-32 font-semibold">Status</th>
                  <th class="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-secondary-50">
                <tr 
                  v-for="student in roster" 
                  :key="student.id"
                  class="group/row hover:bg-secondary-50/50 transition-colors"
                >
                  <td class="pl-8 pr-6 py-3">
                    <div class="flex items-center gap-3">
                      <div class="h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-secondary-600 flex items-center justify-center text-xs font-bold ring-1 ring-white shadow-sm">
                        {{ student.name.charAt(0) }}
                      </div>
                      <span class="text-sm font-medium text-secondary-700 group-hover/row:text-secondary-900 transition-colors">
                        {{ student.name }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-3 text-center">
                    <input 
                      :value="student.grades[assign.id] || 0"
                      type="number"
                      class="w-16 text-center bg-transparent hover:bg-white focus:bg-white rounded-lg border border-transparent hover:border-secondary-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-semibold text-secondary-900 py-1.5 transition-all outline-none" 
                      min="0"
                      :max="assign.maxScore"
                      @change="(e) => handleGrade(student.id, assign.id, e)"
                    >
                  </td>
                  <td class="px-6 py-3 text-center">
                    <span 
                      v-if="student.grades[assign.id] !== undefined"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all"
                      :class="getGradePercentage(student.grades[assign.id] || 0, assign.maxScore) >= 70 ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="getGradePercentage(student.grades[assign.id] || 0, assign.maxScore) >= 70 ? 'bg-emerald-500' : 'bg-orange-500'" />
                      {{ getGradePercentage(student.grades[assign.id] || 0, assign.maxScore) }}%
                    </span>
                    <span v-else class="text-secondary-300 text-sm">-</span>
                  </td>
                   <td class="px-6 py-3 text-right">
                    <button class="text-secondary-300 hover:text-secondary-600 p-2 hover:bg-secondary-100 rounded-lg transition-all">
                        <Download class="w-4 h-4" />
                    </button>
                   </td>
                </tr>
                <tr v-if="roster.length === 0">
                    <td colspan="4" class="px-6 py-8 text-center text-secondary-400 text-sm">
                        No students enrolled.
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Assignment Footer -->
          <div class="px-8 py-3 bg-secondary-50/30 border-t border-secondary-100/50 flex items-center justify-between text-[11px] font-medium text-secondary-500 uppercase tracking-wider rounded-b-2xl">
            <span class="flex items-center gap-2">
                <Users class="w-3.5 h-3.5" /> {{ roster.length }} Candidates
            </span>
            <span>Avg: <span class="text-secondary-900">85%</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-dashed border-secondary-200"
    >
      <div class="p-4 bg-secondary-50 rounded-full mb-4">
        <FolderOpen class="w-10 h-10 text-secondary-300" />
      </div>
      <h4 class="text-lg font-bold text-secondary-900 mb-1">
        No assignments yet
      </h4>
      <p class="text-secondary-500 text-sm max-w-sm mb-6">
        Create your first assignment to start tracking classwork, tests, and homework grades.
      </p>
      <BaseButton variant="outline" @click="$emit('createAssignment')">
        Create Assignment
      </BaseButton>
    </div>
  </div>
</template>
