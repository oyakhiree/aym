<script setup>
import { UserPlus, Calendar, Award } from 'lucide-vue-next'

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
        description: 'Schedule class assessment',
        icon: Award, 
        color: 'indigo', 
        id: 'exam' 
    },
    { 
        label: 'Create Event', 
        description: 'Report a new club activity',
        icon: Calendar, 
        color: 'emerald', 
        id: 'create-event' 
    },
]

const colorClasses = {
    primary: {
        bg: 'bg-primary-50',
        text: 'text-primary-600',
        groupHover: 'group-hover:bg-primary-100 group-hover:text-primary-700'
    },
    indigo: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        groupHover: 'group-hover:bg-indigo-100 group-hover:text-indigo-700'
    },
    emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        groupHover: 'group-hover:bg-emerald-100 group-hover:text-emerald-700'
    }
}
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button 
            v-for="action in actions" 
            :key="action.id"
            @click="$emit('action', action.id)"
            class="group flex items-center p-4 bg-white border border-secondary-100/80 rounded-2xl shadow-sm hover:shadow-md hover:border-secondary-200 transition-all duration-200 text-left"
        >
            <div 
                class="p-3 rounded-xl mr-4 transition-all duration-200" 
                :class="[colorClasses[action.color].bg, colorClasses[action.color].text, colorClasses[action.color].groupHover]"
            >
                <component :is="action.icon" class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div class="flex-1 min-w-0">
                <span class="block font-semibold text-secondary-900 text-sm">{{ action.label }}</span>
                <span class="text-xs text-secondary-500 truncate block">{{ action.description }}</span>
            </div>
            <svg class="w-5 h-5 text-secondary-300 group-hover:text-secondary-500 transition-colors ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
    </div>
</template>
