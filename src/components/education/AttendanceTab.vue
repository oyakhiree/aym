<script setup lang="ts">
import { Calendar, CheckCircle, XCircle } from 'lucide-vue-next'
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
        <!-- Date Selector Card -->
        <div class="flex items-center justify-between bg-white p-5 rounded-2xl border border-secondary-100 shadow-sm hover:border-primary-100 transition-colors">
            <div class="flex items-center gap-4">
                <div class="p-2.5 bg-primary-50 rounded-xl text-primary-600 border border-primary-100/50">
                    <Calendar class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-secondary-500 uppercase tracking-widest mb-0.5">Attendance Date</p>
                  <p class="text-secondary-900 font-medium">Select a date to view or mark attendance</p>
                </div>
            </div>
            <input 
                :value="selectedDate"
                @input="(e: Event) => $emit('update:selectedDate', (e.target as HTMLInputElement)?.value ?? '')"
                type="date" 
                class="rounded-xl border-secondary-200 text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 px-3 bg-secondary-50/50"
            >
        </div>

        <!-- Student List -->
        <div class="bg-white rounded-3xl border border-secondary-100 overflow-hidden shadow-sm">
            <div class="px-5 py-4 border-b border-secondary-50 bg-secondary-50/30 flex justify-between items-center sticky top-0 backdrop-blur-sm z-10">
                <h3 class="text-sm font-bold text-secondary-700">Class Roster</h3>
                <span class="text-xs font-medium text-secondary-500 bg-white px-2.5 py-1 rounded-full border border-secondary-200 shadow-sm">
                    {{ roster.length }} Students
                </span>
            </div>
            <ul class="divide-y divide-secondary-50">
                <li 
                    v-for="student in roster" 
                    :key="student.id"
                    @click="handleAttendance(student.id)"
                    class="p-4 sm:px-6 flex items-center justify-between hover:bg-secondary-50/80 cursor-pointer transition-all duration-200 active:scale-[0.99]"
                >
                    <div class="flex items-center gap-4">
                        <div 
                          class="h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ring-1 ring-black/5 transition-colors"
                          :class="student.attendance[selectedDate] ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-secondary-500 border border-secondary-100'"
                        >
                            {{ student.name.charAt(0) }}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-secondary-900">{{ student.name }}</p>
                            <p class="text-[11px] text-secondary-400 font-medium mt-0.5">ID: #{{ student.id }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <span 
                          class="text-xs font-bold uppercase tracking-wider transition-colors" 
                          :class="student.attendance[selectedDate] ? 'text-emerald-600' : 'text-secondary-400'"
                        >
                            {{ student.attendance[selectedDate] ? 'Present' : 'Absent' }}
                        </span>
                        
                        <button 
                             class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                             :class="student.attendance[selectedDate] ? 'bg-emerald-100 text-emerald-600 scale-105 shadow-inner' : 'bg-secondary-100 text-secondary-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-secondary-600'"
                        >
                            <CheckCircle v-if="student.attendance[selectedDate]" class="w-6 h-6" />
                            <div v-else class="w-5 h-5 rounded-full border-[2.5px] border-current opacity-60"></div>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
