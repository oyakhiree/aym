<script setup lang="ts">
import { Plus, FolderOpen, ChevronDown, ChevronUp } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Student, Assignment } from '@/types'
import { ref } from 'vue'

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

const expandedStudentId = ref<string | null>(null)

const toggleStudent = (id: string) => {
    expandedStudentId.value = expandedStudentId.value === id ? null : id
}

const handleGrade = (studentId: string, assignmentId: string, event: Event): void => {
    const target = event.target as HTMLInputElement
    const score = parseInt(target.value) || 0
    emit('updateGrade', { studentId, assignmentId, score })
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-secondary-900 leading-tight">Assignments & Grades</h3>
              <p class="text-xs text-secondary-500 font-medium mt-1">Manage classwork and homework scores</p>
            </div>
            <BaseButton @click="$emit('createAssignment')" class="shadow-lg shadow-primary-500/20 w-full sm:w-auto justify-center">
                <Plus class="w-4 h-4 mr-2" /> New Assignment
            </BaseButton>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block bg-white rounded-2xl border border-secondary-100 shadow-sm overflow-hidden flex flex-col relative h-[500px]">
            <div class="overflow-auto flex-1 custom-scrollbar">
                <table class="min-w-full text-left border-collapse">
                    <thead class="bg-secondary-50/80 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
                        <tr>
                            <th class="px-5 py-4 text-xs font-bold text-secondary-500 uppercase tracking-widest sticky left-0 bg-secondary-50 z-30 w-56 border-b border-r border-secondary-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                Student Name
                            </th>
                            <th 
                                v-for="assign in assignments" 
                                :key="assign.id"
                                class="px-3 py-3 text-center min-w-[160px] border-b border-secondary-200/60"
                            >
                                <div class="flex flex-col items-center">
                                    <span class="text-sm font-bold text-secondary-800 line-clamp-1 px-2" :title="assign.title">{{ assign.title }}</span>
                                    <div class="flex items-center gap-1.5 mt-1">
                                      <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-secondary-200/50 text-secondary-600">{{ assign.type }}</span>
                                      <span class="text-[10px] text-secondary-400 font-medium">/ {{ assign.maxScore }} pts</span>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-secondary-50 bg-white">
                        <tr v-for="student in roster" :key="student.id" class="group hover:bg-secondary-50/30 transition-colors">
                            <td class="px-5 py-4 whitespace-nowrap sticky left-0 bg-white group-hover:bg-secondary-50/30 z-10 border-r border-secondary-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                <div class="flex items-center gap-3">
                                   <div class="w-8 h-8 rounded-full bg-secondary-100 text-secondary-500 flex items-center justify-center text-xs font-bold shadow-inner">
                                     {{ student.name.charAt(0) }}
                                   </div>
                                    <span class="text-sm font-semibold text-secondary-900">{{ student.name }}</span>
                                </div>
                            </td>
                            <td 
                                v-for="assign in assignments" 
                                :key="assign.id"
                                class="px-3 py-3 text-center"
                            >
                                <div class="relative inline-block">
                                    <input 
                                        :value="student.grades[assign.id] || 0"
                                        @change="(e) => handleGrade(student.id, assign.id, e)"
                                        type="number" 
                                        class="w-20 text-center rounded-lg border-secondary-200 text-sm font-medium text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 py-1.5 transition-shadow hover:border-secondary-300"
                                        min="0" 
                                        :max="assign.maxScore"
                                    >
                                    <span 
                                      class="absolute -right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                      :class="{ 'opacity-100 text-emerald-500': (student.grades[assign.id] / assign.maxScore) >= 0.8 }"
                                    >
                                      %
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div v-if="assignments.length === 0" class="flex flex-col items-center justify-center h-64 text-center">
                    <div class="p-4 bg-secondary-50 rounded-full mb-3">
                        <FolderOpen class="w-8 h-8 text-secondary-300" />
                    </div>
                    <h4 class="text-secondary-900 font-bold mb-1">No assignments yet</h4>
                    <p class="text-secondary-500 text-sm max-w-xs">Create your first assignment to start tracking grades.</p>
                </div>
            </div>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden space-y-4">
            <div 
                v-for="student in roster" 
                :key="student.id"
                class="bg-white rounded-2xl border border-secondary-100 overflow-hidden transition-all duration-300 shadow-sm"
                :class="{ 'ring-2 ring-primary-500/20 border-primary-200': expandedStudentId === student.id }"
            >
                <div 
                  @click="toggleStudent(student.id)"
                  class="p-4 flex items-center justify-between cursor-pointer bg-white"
                >
                   <div class="flex items-center gap-3">
                       <div class="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-sm">
                           {{ student.name.charAt(0) }}
                       </div>
                       <div>
                           <p class="font-bold text-secondary-900">{{ student.name }}</p>
                           <p class="text-xs text-secondary-500 font-medium">Avg: {{ '85%' }}</p> <!-- Mock Placeholder -->
                       </div>
                   </div>
                   <button class="p-1 rounded-full text-secondary-400">
                       <ChevronDown v-if="expandedStudentId !== student.id" class="w-5 h-5" />
                       <ChevronUp v-else class="w-5 h-5" />
                   </button>
                </div>

                <div 
                  v-if="expandedStudentId === student.id"
                  class="bg-secondary-50/50 border-t border-secondary-100 p-4 space-y-4"
                >
                    <div 
                      v-for="assign in assignments" 
                      :key="assign.id"
                      class="flex items-center justify-between gap-4"
                    >
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-secondary-800 truncate">{{ assign.title }}</p>
                            <p class="text-[10px] text-secondary-500">{{ assign.type }} • Max {{ assign.maxScore }}</p>
                        </div>
                        <div class="flex items-center gap-2">
                             <input 
                                :value="student.grades[assign.id] || 0"
                                @change="(e) => handleGrade(student.id, assign.id, e)"
                                type="number" 
                                class="w-16 text-center rounded-lg border-secondary-200 text-sm font-bold text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 py-2"
                                min="0" 
                                :max="assign.maxScore"
                            >
                            <span class="text-xs font-medium text-secondary-400">/{{ assign.maxScore }}</span>
                        </div>
                    </div>
                     <div v-if="assignments.length === 0" class="text-center py-4 text-secondary-500 text-sm">
                        No assignments created yet.
                    </div>
                </div>
            </div>
             <div v-if="roster.length === 0" class="text-center py-12 text-secondary-500 text-sm">
                No students enrolled yet.
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #cbd5e1;
}
</style>
