<script setup lang="ts">
import { Calendar, CheckCircle } from 'lucide-vue-next'
import type { Student } from '@/types'

interface Props {
    roster: Student[]
    selectedDate: string
}

defineProps<Props>()

const emit = defineEmits<{
    'update:selectedDate': [value: string]
    'toggleAttendance': [studentId: string]
}>()

const handleAttendance = (studentId: string): void => {
    emit('toggleAttendance', studentId)
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-secondary-100 shadow-sm">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-50 rounded-lg text-primary-600">
                    <Calendar class="w-5 h-5" />
                </div>
                <span class="text-sm font-medium text-secondary-700">Select Date:</span>
            </div>
            <input 
                :value="selectedDate"
                @input="(e: Event) => $emit('update:selectedDate', (e.target as HTMLInputElement)?.value ?? '')"
                type="date" 
                class="rounded-lg border-secondary-200 text-sm focus:ring-primary-500 focus:border-primary-500"
            >
        </div>

        <div class="bg-white rounded-2xl border border-secondary-100 overflow-hidden shadow-sm">
            <ul class="divide-y divide-secondary-50">
                <li 
                    v-for="student in roster" 
                    :key="student.id"
                    @click="handleAttendance(student.id)"
                    class="p-4 flex items-center justify-between hover:bg-secondary-50 cursor-pointer transition-colors group"
                >
                    <div class="flex items-center gap-4">
                        <div class="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-bold text-sm">
                            {{ student.name.charAt(0) }}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-secondary-900">{{ student.name }}</p>
                            <p class="text-xs text-secondary-400">ID: {{ student.id }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-medium" :class="student.attendance[selectedDate] ? 'text-emerald-600' : 'text-secondary-400'">
                            {{ student.attendance[selectedDate] ? 'Present' : 'Absent' }}
                        </span>
                        <div class="relative">
                            <CheckCircle v-if="student.attendance[selectedDate]" class="w-6 h-6 text-emerald-500" />
                            <div v-else class="w-6 h-6 rounded-full border-2 border-secondary-300 group-hover:border-primary-400"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
