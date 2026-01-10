<script setup>
import { Award } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { READINESS_THRESHOLD } from '@/constants/curriculum'

const props = defineProps({
    roster: Array
})

const emit = defineEmits(['requestExam'])
</script>

<template>
    <div class="space-y-6">
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm">
            <Award class="w-5 h-5 flex-shrink-0" />
            <p>Students must achieve a Readiness Score of <strong>{{ READINESS_THRESHOLD }}% or higher</strong> to be eligible for the final exam. This score is calculated based on attendance (40%) and assignment grades (60%).</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div 
                v-for="student in roster" 
                :key="student.id" 
                class="bg-white p-5 rounded-2xl border border-secondary-100 shadow-sm flex flex-col justify-between"
            >
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-bold text-secondary-900">{{ student.name }}</h3>
                        <p class="text-xs text-secondary-500 mt-1">Readiness Score</p>
                    </div>
                    <div 
                        class="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-opacity-20"
                        :class="[
                            student.readinessScore >= 75 ? 'bg-emerald-100 text-emerald-700 ring-emerald-500' : 
                            student.readinessScore >= 50 ? 'bg-amber-100 text-amber-700 ring-amber-500' : 
                            'bg-red-100 text-red-700 ring-red-500'
                        ]"
                    >
                        {{ student.readinessScore || 0 }}%
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div class="w-full bg-secondary-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                            class="h-full rounded-full transition-all duration-500"
                            :style="{ width: `${student.readinessScore || 0}%` }"
                            :class="[
                                student.readinessScore >= 75 ? 'bg-emerald-500' : 
                                student.readinessScore >= 50 ? 'bg-amber-500' : 
                                'bg-red-500'
                            ]"
                        ></div>
                    </div>

                    <BaseButton 
                        v-if="student.examStatus === 'None' || !student.examStatus"
                        @click="$emit('requestExam', student.id)" 
                        :disabled="!student.examEligible"
                        class="w-full justify-center"
                        :variant="student.examEligible ? 'primary' : 'secondary'"
                    >
                        {{ student.examEligible ? 'Request Exam' : 'Not Eligible Yet' }}
                    </BaseButton>
                    <div v-else class="text-center py-2 text-sm font-semibold rounded-lg bg-secondary-50 text-secondary-600 border border-secondary-100">
                        Status: {{ student.examStatus }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
