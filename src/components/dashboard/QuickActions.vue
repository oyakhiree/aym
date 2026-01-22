<script setup>
import { UserPlus, Calendar, Award, ArrowRight } from 'lucide-vue-next'

const emit = defineEmits(['action'])

const actions = [
    { 
        label: 'New Registration', 
        description: 'Add a new member',
        icon: UserPlus, 
        color: 'primary', 
        id: 'register' 
    },
    { 
        label: 'Request Exam', 
        description: 'Schedule assessment',
        icon: Award, 
        color: 'indigo', 
        id: 'exam' 
    },
    { 
        label: 'Create Event', 
        description: 'New club activity',
        icon: Calendar, 
        color: 'emerald', 
        id: 'create-event' 
    },
]

const colorClasses = {
    primary: {
        bg: 'bg-primary-50',
        text: 'text-primary-600',
        border: 'group-hover:border-primary-200',
        shadow: 'group-hover:shadow-primary-500/10'
    },
    indigo: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'group-hover:border-indigo-200',
        shadow: 'group-hover:shadow-indigo-500/10'
    },
    emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'group-hover:border-emerald-200',
        shadow: 'group-hover:shadow-emerald-500/10'
    }
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
    <button 
      v-for="action in actions" 
      :key="action.id"
      class="group relative flex flex-col p-5 bg-white border border-secondary-100/60 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [&:nth-child(odd):last-child]:col-span-2 sm:[&:nth-child(odd):last-child]:col-auto"
      :class="[colorClasses[action.color].border, colorClasses[action.color].shadow]"
      @click="$emit('action', action.id)"
    >
      <div class="flex justify-between items-start w-full mb-3">
        <div 
          class="p-2.5 rounded-xl transition-all duration-300" 
          :class="[colorClasses[action.color].bg, colorClasses[action.color].text]"
        >
          <component
            :is="action.icon"
            class="w-5 h-5"
          />
        </div>
        <div class="p-1 rounded-full bg-secondary-50 text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-1 -mt-1">
          <ArrowRight class="w-3.5 h-3.5" />
        </div>
      </div>
      
      <div class="text-left">
        <span class="block font-semibold text-secondary-900 text-sm mb-0.5 group-hover:text-primary-600 transition-colors">{{ action.label }}</span>
        <span class="text-xs text-secondary-500 block leading-relaxed">{{ action.description }}</span>
      </div>
    </button>
  </div>
</template>
