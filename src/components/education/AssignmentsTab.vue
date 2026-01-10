<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
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

const handleGrade = (studentId: string, assignmentId: string, event: Event): void => {
    const target = event.target as HTMLInputElement
    const score = parseInt(target.value) || 0
    emit('updateGrade', { studentId, assignmentId, score })
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex justify-end">
            <BaseButton @click="$emit('createAssignment')">
                <Plus class="w-4 h-4 mr-2" /> New Assignment
            </BaseButton>
        </div>

        <div class="bg-secondary-50/50 rounded-2xl border border-secondary-100 p-4 overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider sticky left-0 bg-secondary-50 z-10 w-48">Student</th>
                        <th 
                            v-for="assign in assignments" 
                            :key="assign.id"
                            class="px-4 py-3 text-center text-xs font-semibold text-secondary-500 uppercase tracking-wider min-w-[140px]"
                        >
                            <div class="flex flex-col items-center">
                                <span class="text-secondary-900">{{ assign.title }}</span>
                                <span class="text-[10px] text-secondary-400 font-normal mt-0.5">Max: {{ assign.maxScore }} • {{ assign.type }}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-secondary-50">
                    <tr v-for="student in roster" :key="student.id">
                        <td class="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10 shadow-sm border-r border-secondary-100">
                            <span class="text-sm font-medium text-secondary-900">{{ student.name }}</span>
                        </td>
                        <td 
                            v-for="assign in assignments" 
                            :key="assign.id"
                            class="px-4 py-3 whitespace-nowrap text-center"
                        >
                            <input 
                                :value="student.grades[assign.id] || 0"
                                @change="(e) => handleGrade(student.id, assign.id, e)"
                                type="number" 
                                class="w-20 text-center rounded-lg border-secondary-200 text-sm focus:ring-primary-500 focus:border-primary-500 py-1"
                                min="0" 
                                :max="assign.maxScore"
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div v-if="assignments.length === 0" class="text-center py-12 text-secondary-500 text-sm">
                No assignments created yet.
            </div>
        </div>
    </div>
</template>
