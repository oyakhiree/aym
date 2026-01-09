<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCurriculumStore } from '@/stores/curriculum'
import baseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CreateAssignmentModal from '@/components/education/CreateAssignmentModal.vue'
import { 
    ArrowLeft, Calendar, CheckCircle, XCircle, 
    ClipboardList, Award, MoreVertical, Plus 
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const store = useCurriculumStore()

const classId = route.params.id
const currentClass = computed(() => store.activeClasses.find(c => c.id === classId))

// Tabs
const activeTab = ref('Attendance')
const tabs = ['Attendance', 'Assignments', 'Exams']

// State
const selectedDate = ref(new Date().toISOString().split('T')[0])
const isAssignmentModalOpen = ref(false)

// Actions
const handleAttendance = (studentId) => {
    if(!currentClass.value) return
    const student = currentClass.value.roster.find(s => s.id === studentId)
    // Toggle
    const isPresent = !student.attendance[selectedDate.value]
    store.updateAttendance(classId, studentId, selectedDate.value, isPresent)
}

const handleCreateAssignment = (assignmentData) => {
    store.addAssignment(classId, assignmentData)
}

const handleGrade = (studentId, assignmentId, event) => {
    const score = parseInt(event.target.value) || 0
    store.updateGrade(classId, studentId, assignmentId, score)
}

const requestExam = (studentId) => {
    // In a real app this would call an API
    const student = currentClass.value.roster.find(s => s.id === studentId)
    if(student){
        student.examStatus = 'Requested'
    }
}

// Redirect if not found
onMounted(() => {
    if(!currentClass.value) {
        // Fallback for reload on mock data
        // router.push('/classes') 
    }
})
</script>

<template>
  <div v-if="currentClass" class="space-y-6 pb-20 md:pb-0 animate-in fade-in">
    
    <!-- Header -->
    <div class="flex items-center gap-4">
        <button 
            @click="router.back()"
            class="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-full transition-all"
        >
            <ArrowLeft class="w-6 h-6" />
        </button>
        <div>
            <h1 class="text-2xl font-bold text-secondary-900 leading-tight">{{ currentClass.name }}</h1>
             <p class="text-sm text-secondary-500 flex items-center gap-2">
                {{ currentClass.type }} Class • <span class="text-primary-600 font-medium">{{ currentClass.students }} Students</span>
             </p>
        </div>
        <div class="ml-auto">
             <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                active
             </div>
        </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-secondary-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200"
          :class="[
            activeTab === tab
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
          ]"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <!-- ATTENDANCE TAB -->
    <div v-if="activeTab === 'Attendance'" class="space-y-6">
        <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-secondary-100 shadow-sm">
            <div class="flex items-center gap-3">
                 <div class="p-2 bg-primary-50 rounded-lg text-primary-600">
                    <Calendar class="w-5 h-5" />
                 </div>
                 <span class="text-sm font-medium text-secondary-700">Select Date:</span>
            </div>
            <input 
                v-model="selectedDate" 
                type="date" 
                class="rounded-lg border-secondary-200 text-sm focus:ring-primary-500 focus:border-primary-500"
            >
        </div>

        <div class="bg-white rounded-2xl border border-secondary-100 overflow-hidden shadow-sm">
            <ul class="divide-y divide-secondary-50">
                <li 
                    v-for="student in currentClass.roster" 
                    :key="student.id"
                    @click="handleAttendance(student.id)"
                    class="p-4 flex items-center justify-between hover:bg-secondary-50 cursor-pointer transition-colors group"
                >
                    <div class="flex items-center gap-4">
                        <div class="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-bold text-sm">
                            {{ student.name.charAt(0) }}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-secondary-900">{{ student.name }}</p>
                            <p class="text-xs text-secondary-400">ID: {{ student.id }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                         <span class="text-sm font-medium" :class="student.attendance[selectedDate] ? 'text-emerald-600' : 'text-secondary-400'">
                            {{ student.attendance[selectedDate] ? 'Present' : 'Absent' }}
                         </span>
                         <div class="relative">
                            <CheckCircle v-if="student.attendance[selectedDate]" class="w-6 h-6 text-emerald-500" />
                            <div v-else class="w-6 h-6 rounded-full border-2 border-secondary-300 group-hover:border-primary-400"></div>
                         </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- ASSIGNMENTS TAB -->
    <div v-if="activeTab === 'Assignments'" class="space-y-6">
         <div class="flex justify-end">
            <BaseButton @click="isAssignmentModalOpen = true">
                <Plus class="w-4 h-4 mr-2" /> New Assignment
            </BaseButton>
         </div>

         <!-- Assignment Horizontal Scroll / List -->
         <div class="bg-secondary-50/50 rounded-2xl border border-secondary-100 p-4 overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider sticky left-0 bg-secondary-50 z-10 w-48">Student</th>
                        <th 
                            v-for="assign in currentClass.assignments" 
                            :key="assign.id"
                            class="px-4 py-3 text-center text-xs font-semibold text-secondary-500 uppercase tracking-wider min-w-[140px]"
                        >
                            <div class="flex flex-col items-center">
                                <span class="text-secondary-900">{{ assign.title }}</span>
                                <span class="text-[10px] text-secondary-400 font-normal mt-0.5">Max: {{ assign.maxScore }} • {{ assign.type }}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-secondary-50">
                    <tr v-for="student in currentClass.roster" :key="student.id">
                        <td class="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10 shadow-sm border-r border-secondary-100">
                             <span class="text-sm font-medium text-secondary-900">{{ student.name }}</span>
                        </td>
                        <td 
                            v-for="assign in currentClass.assignments" 
                            :key="assign.id"
                             class="px-4 py-3 whitespace-nowrap text-center"
                        >
                            <input 
                                :value="student.grades[assign.id] || 0"
                                @change="(e) => handleGrade(student.id, assign.id, e)"
                                type="number" 
                                class="w-20 text-center rounded-lg border-secondary-200 text-sm focus:ring-primary-500 focus:border-primary-500 py-1"
                                min="0" 
                                :max="assign.maxScore"
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div v-if="currentClass.assignments.length === 0" class="text-center py-12 text-secondary-500 text-sm">
                No assignments created yet.
            </div>
         </div>
    </div>

    <!-- EXAMS TAB -->
    <div v-if="activeTab === 'Exams'" class="space-y-6">
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm">
            <Award class="w-5 h-5 flex-shrink-0" />
            <p>Students must achieve a Readiness Score of <strong>75% or higher</strong> to be eligible for the final exam. This score is calculated based on attendance (40%) and assignment grades (60%).</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             <div 
                v-for="student in currentClass.roster" 
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
                        @click="requestExam(student.id)" 
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

    <!-- Modals -->
    <CreateAssignmentModal 
        :isOpen="isAssignmentModalOpen" 
        @close="isAssignmentModalOpen = false"
        @create="handleCreateAssignment"
    />

  </div>
  <div v-else class="text-center py-20">
      <p class="text-secondary-500">Loading class details...</p>
  </div>
</template>
