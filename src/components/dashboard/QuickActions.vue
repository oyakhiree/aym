<script setup>
import { UserPlus, FileText, Award } from 'lucide-vue-next'

const emit = defineEmits(['action'])

const actions = [
    { label: 'New Registration', icon: UserPlus, color: 'primary', id: 'register' },
    { label: 'Request Exam', icon: Award, color: 'indigo', id: 'exam' },
    { label: 'Submit Report', icon: FileText, color: 'emerald', id: 'report' },
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
            v-for="action in actions" 
            :key="action.id"
            @click="$emit('action', action.id)"
            class="flex items-center p-4 bg-white border border-secondary-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 transition-all group text-left"
        >
            <div class="p-3 rounded-lg mr-4 transition-colors group-hover:scale-110" :class="`bg-${action.color}-50 text-${action.color}-600`">
                <component :is="action.icon" class="w-6 h-6" />
            </div>
            <div>
                <span class="block font-semibold text-secondary-900">{{ action.label }}</span>
                <span class="text-xs text-secondary-500">Quick Action</span>
            </div>
        </button>
    </div>
</template>
