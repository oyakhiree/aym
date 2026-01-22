<script setup>
import { Calendar, CheckCircle, Clock, ChevronRight } from 'lucide-vue-next'

defineProps({
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
  <div class="bg-white rounded-2xl border border-secondary-100/60 shadow-sm shadow-secondary-200/40 flex flex-col h-full overflow-hidden">
    <!-- Header -->
    <div class="p-6 pb-4 flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-secondary-900 text-base tracking-tight">
          Exam Portal
        </h3>
        <p class="text-xs text-secondary-500 font-medium mt-1">
          Assessment schedule
        </p>
      </div>
      <span 
        v-if="pendingExams > 0" 
        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 ring-1 ring-amber-500/10"
      >
        <Clock class="w-2.5 h-2.5 mr-1" />
        {{ pendingExams }} PENDING
      </span>
    </div>
        
    <!-- Empty State -->
    <div 
      v-if="upcomingExams.length === 0 && pendingExams === 0" 
      class="flex-1 p-8 flex flex-col justify-center items-center text-center"
    >
      <div class="w-12 h-12 bg-secondary-50 rounded-2xl flex items-center justify-center mb-4 ring-8 ring-secondary-50/50">
        <CheckCircle class="w-6 h-6 text-secondary-400" />
      </div>
      <h4 class="text-secondary-900 font-bold text-sm mb-1">
        All Caught Up!
      </h4>
      <p class="text-xs text-secondary-500 mb-6 max-w-[160px] leading-relaxed">
        No pending assessments or scheduled exams.
      </p>
      <button class="text-indigo-600 hover:text-indigo-700 text-xs font-bold border border-indigo-200 rounded-xl px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 flex items-center shadow-sm hover:shadow-indigo-100">
        <Calendar class="w-3.5 h-3.5 mr-2" />
        Schedule Exam
      </button>
    </div>
        
    <!-- Exam List -->
    <div
      v-else
      class="flex-1 overflow-y-auto"
    >
      <div class="px-3 pb-2 space-y-2">
        <div 
          v-for="exam in upcomingExams" 
          :key="exam.id" 
          class="p-4 bg-secondary-50/50 hover:bg-indigo-50/30 rounded-xl transition-all border border-transparent hover:border-indigo-100 group"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm font-bold text-secondary-900 group-hover:text-indigo-900 transition-colors">{{ exam.title }}</span>
            <span 
              class="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider"
              :class="exam.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
            >
              {{ exam.status }}
            </span>
          </div>
          <div class="flex items-center text-xs font-medium text-secondary-500 mb-3">
            <Calendar class="w-3.5 h-3.5 mr-1.5 text-secondary-400" /> {{ exam.date }}
          </div>
          <div
            v-if="exam.status === 'Ready'"
            class="flex justify-end"
          >
            <button class="text-[10px] bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-300 transform active:scale-95">
              Generate Codes
            </button>
          </div>
        </div>
            
        <!-- Pending State -->
        <div
          v-if="pendingExams > 0 && upcomingExams.length === 0"
          class="p-6 text-center"
        >
          <div class="inline-flex items-center justify-center p-3 bg-amber-50 rounded-2xl mb-3 ring-4 ring-amber-50/50">
            <Clock class="w-5 h-5 text-amber-500" />
          </div>
          <h4 class="text-secondary-900 font-bold text-sm mb-1">
            Awaiting Approval
          </h4>
          <p class="text-xs text-secondary-500 max-w-[200px] mx-auto">
            Your exam request is pending Area Coordinator review.
          </p>
        </div>
      </div>
    </div>
        
    <!-- Footer -->
    <div
      v-if="upcomingExams.length > 0"
      class="p-3 bg-secondary-50/30 border-t border-secondary-100/50"
    >
      <button class="flex items-center justify-center w-full py-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-xl transition-all group uppercase tracking-wide">
        View All Exams
        <ChevronRight class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  </div>
</template>
