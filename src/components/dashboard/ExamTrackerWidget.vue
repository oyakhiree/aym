<script setup>
import { Calendar, CheckCircle, Clock, FileText, ChevronRight } from 'lucide-vue-next'

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
  <div class="bg-white rounded-2xl border border-secondary-100/80 shadow-sm overflow-hidden flex flex-col h-full">
    <!-- Header -->
    <div class="p-5 border-b border-secondary-100/80 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/30">
      <div class="flex items-center">
        <div class="p-2 bg-indigo-100 rounded-xl mr-3">
          <FileText class="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 class="font-bold text-secondary-900 text-lg tracking-tight">
            Exam Portal
          </h3>
          <p class="text-xs text-secondary-500">
            Assessment management
          </p>
        </div>
      </div>
      <span 
        v-if="pendingExams > 0" 
        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700"
      >
        <Clock class="w-3 h-3 mr-1" />
        {{ pendingExams }} Pending
      </span>
    </div>
        
    <!-- Empty State -->
    <div 
      v-if="upcomingExams.length === 0 && pendingExams === 0" 
      class="flex-1 p-8 flex flex-col justify-center items-center text-center"
    >
      <div class="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-2xl flex items-center justify-center mb-4">
        <CheckCircle class="w-8 h-8 text-secondary-400" />
      </div>
      <h4 class="text-secondary-900 font-semibold mb-1">
        All Caught Up!
      </h4>
      <p class="text-sm text-secondary-500 mb-5 max-w-[200px]">
        No pending assessments or scheduled exams.
      </p>
      <button class="text-indigo-600 hover:text-indigo-700 text-sm font-semibold border border-indigo-200 rounded-xl px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 flex items-center">
        <Calendar class="w-4 h-4 mr-2" />
        Schedule Exam
      </button>
    </div>
        
    <!-- Exam List -->
    <div
      v-else
      class="flex-1 overflow-y-auto divide-y divide-secondary-50"
    >
      <div 
        v-for="exam in upcomingExams" 
        :key="exam.id" 
        class="p-4 hover:bg-indigo-50/30 transition-colors"
      >
        <div class="flex justify-between items-start mb-2">
          <span class="text-sm font-semibold text-secondary-900">{{ exam.title }}</span>
          <span 
            class="text-xs font-semibold px-2 py-1 rounded-lg"
            :class="exam.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
          >
            {{ exam.status }}
          </span>
        </div>
        <div class="flex items-center text-xs text-secondary-500 mb-3">
          <Calendar class="w-3.5 h-3.5 mr-1.5" /> {{ exam.date }}
        </div>
        <div
          v-if="exam.status === 'Ready'"
          class="text-right"
        >
          <button class="text-xs bg-indigo-600 text-white px-3.5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-sm">
            Generate Codes
          </button>
        </div>
      </div>
            
      <!-- Pending State -->
      <div
        v-if="pendingExams > 0 && upcomingExams.length === 0"
        class="p-8 text-center"
      >
        <div class="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl mb-4">
          <Clock class="w-6 h-6 text-amber-600" />
        </div>
        <h4 class="text-secondary-900 font-semibold mb-1">
          Awaiting Approval
        </h4>
        <p class="text-sm text-secondary-500">
          Your exam request is pending Area Coordinator review.
        </p>
      </div>
    </div>
        
    <!-- Footer -->
    <div
      v-if="upcomingExams.length > 0"
      class="p-4 bg-secondary-50/50 border-t border-secondary-100/80"
    >
      <button class="flex items-center justify-center w-full text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group">
        View All Exams
        <ChevronRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  </div>
</template>
