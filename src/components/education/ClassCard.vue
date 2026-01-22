<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, Award, Users, ChevronRight, User } from 'lucide-vue-next'

const props = defineProps({
  classData: Object
})

const router = useRouter()

const navigateToDetail = () => {
  router.push({ name: 'class-detail', params: { id: props.classData.id } })
}

const isHonour = computed(() => props.classData.type === 'Honour')

const progressColor = computed(() => {
    const score = props.classData.readiness
    if(score >= 75) return 'bg-emerald-500'
    if(score >= 50) return 'bg-amber-500'
    return 'bg-red-500'
})
</script>

<template>
  <div 
    class="group relative bg-white rounded-2xl border border-secondary-100 p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 cursor-pointer overflow-hidden"
    @click="navigateToDetail"
  >
    <!-- Fluid Decoration -->
    <div 
      class="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
      :class="isHonour ? 'bg-indigo-100' : 'bg-primary-100'"
    />

    <div class="relative z-10">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div
            class="p-2.5 rounded-xl transition-colors duration-300"
            :class="isHonour ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'"
          >
            <Award
              v-if="isHonour"
              class="w-6 h-6"
            />
            <BookOpen
              v-else
              class="w-6 h-6"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-secondary-900 leading-tight group-hover:text-primary-700 transition-colors">
              {{ classData.name }}
            </h3>
            <p class="text-xs font-semibold text-secondary-500 uppercase tracking-widest mt-1">
              {{ classData.type }}
            </p>
          </div>
        </div>
          
        <!-- Date Badge -->
        <div class="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-secondary-50 text-secondary-600 border border-secondary-100 group-hover:border-secondary-200 transition-colors">
          {{ classData.startDate ? new Date(classData.startDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit'}) : 'N/A' }}
        </div>
      </div>

      <!-- Instructor -->
      <div class="flex items-center gap-2 mb-6">
        <div class="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center border border-white shadow-sm ring-1 ring-secondary-50">
          <User class="w-3.5 h-3.5 text-secondary-500" />
        </div>
        <p class="text-sm font-medium text-secondary-600">
          <span class="text-secondary-400 font-normal mr-1">Instructor:</span> {{ classData.instructor }}
        </p>
      </div>

      <!-- Footer Stats -->
      <div class="pt-4 border-t border-secondary-100/60 flex items-center justify-between">
        <div class="flex items-center gap-4">
           <!-- Students -->
           <div class="flex items-center gap-1.5" title="Enrolled Students">
             <Users class="w-4 h-4 text-secondary-400" />
             <span class="text-sm font-bold text-secondary-700">{{ classData.students }}</span>
           </div>

           <!-- Readiness -->
           <div class="flex items-center gap-1.5" title="Exam Readiness">
             <div class="w-2 h-2 rounded-full" :class="progressColor" />
             <span class="text-sm font-bold text-secondary-700">{{ classData.readiness }}%</span>
           </div>
        </div>

        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-50 text-secondary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
