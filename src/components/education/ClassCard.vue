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
    class="bg-white rounded-2xl border border-secondary-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    @click="navigateToDetail"
  >
    <!-- Top Decoration -->
    <div
      class="absolute top-0 left-0 w-full h-1"
      :class="isHonour ? 'bg-indigo-500' : 'bg-primary-500'"
    />

    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div
          class="p-2.5 rounded-xl shadow-inner ring-1 ring-black/5"
          :class="isHonour ? 'bg-indigo-50 text-indigo-600' : 'bg-primary-50 text-primary-600'"
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
          <p class="text-xs font-medium text-secondary-500 uppercase tracking-widest mt-1">
            {{ classData.type }} Class
          </p>
        </div>
      </div>
        
      <div class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-50 text-secondary-600 border border-secondary-100">
        {{ classData.startDate ? new Date(classData.startDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit'}) : 'N/A' }}
      </div>
    </div>

    <!-- Instructor -->
    <div class="flex items-center gap-2 mb-5">
      <div class="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center text-xs font-bold text-secondary-500">
        <User class="w-3.5 h-3.5" />
      </div>
      <p class="text-xs text-secondary-600 font-medium truncate">
        Instr. {{ classData.instructor }}
      </p>
    </div>

    <!-- Progress & Stats -->
    <div class="space-y-3">
      <div class="flex items-end justify-between text-xs">
        <span class="text-secondary-500 font-medium">Exam Readiness</span>
        <span class="font-bold text-secondary-900">{{ classData.readiness }}%</span>
      </div>
        
      <div class="w-full bg-secondary-100 rounded-full h-2 overflow-hidden">
        <div 
          class="h-full rounded-full transition-all duration-500 ease-out"
          :class="progressColor"
          :style="{ width: `${classData.readiness}%` }"
        />
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-secondary-50">
        <div class="flex items-center gap-1.5 text-secondary-500">
          <Users class="w-4 h-4" />
          <span class="text-xs font-semibold">{{ classData.students }} Students</span>
        </div>
        <button class="text-xs font-bold text-primary-600 flex items-center hover:underline">
          Manage <ChevronRight class="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  </div>
</template>
