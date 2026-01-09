<script setup>
import { Calendar, CheckCircle, Clock, FileText } from 'lucide-vue-next'

const props = defineProps({
    pendingExams: {
        type: Number,
        default: 0
    },
    upcomingExams: {
        type: Array,
        default: () => []
    }
})
</script>

<template>
    <div class="bg-white rounded-2xl border border-secondary-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div class="p-5 border-b border-secondary-100 flex items-center justify-between bg-indigo-50/50">
            <h3 class="font-bold text-secondary-900 text-lg flex items-center">
                <FileText class="w-5 h-5 mr-2 text-indigo-500" />
                Exam Portal
            </h3>
            <span v-if="pendingExams > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {{ pendingExams }} Pending
            </span>
        </div>
        
        <div class="flex-1 p-6 flex flex-col justify-center items-center text-center" v-if="upcomingExams.length === 0 && pendingExams === 0">
            <div class="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle class="w-8 h-8 text-secondary-400" />
            </div>
            <h4 class="text-secondary-900 font-medium mb-1">No Exams Scheduled</h4>
            <p class="text-sm text-secondary-500 mb-4">You're all caught up! No pending assessments.</p>
            <button class="text-indigo-600 hover:text-indigo-700 text-sm font-semibold border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors">
                Schedule Class Exam
            </button>
        </div>
        
        <div v-else class="flex-1 p-0">
            <div v-for="exam in upcomingExams" :key="exam.id" class="p-4 border-b border-secondary-100 last:border-0 hover:bg-indigo-50/10 transition-colors">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-sm font-bold text-secondary-900">{{ exam.title }}</span>
                    <span class="text-xs font-semibold px-2 py-1 rounded bg-indigo-100 text-indigo-700">{{ exam.status }}</span>
                </div>
                <div class="flex items-center text-xs text-secondary-500 mb-3">
                    <Calendar class="w-3 h-3 mr-1" /> {{ exam.date }}
                </div>
                <div v-if="exam.status === 'Ready'" class="mt-2 text-right">
                    <button class="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors">
                        Generate Codes
                    </button>
                </div>
            </div>
            
             <!-- Pending State Placeholder -->
             <div v-if="pendingExams > 0 && upcomingExams.length === 0" class="p-6 text-center">
                <div class="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-3">
                     <Clock class="w-6 h-6 text-orange-600" />
                </div>
                <p class="text-sm text-secondary-600">Waiting for Area Coordinator approval.</p>
             </div>
        </div>
    </div>
</template>
