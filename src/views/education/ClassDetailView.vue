<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClassStore } from '@/stores/class'
import CreateAssignmentModal from '@/components/education/CreateAssignmentModal.vue'
import AttendanceTab from '@/components/education/AttendanceTab.vue'
import AssignmentsTab from '@/components/education/AssignmentsTab.vue'
import ExamsTab from '@/components/education/ExamsTab.vue'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const store = useClassStore()

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
    if (!currentClass.value) return
    const student = currentClass.value.roster.find(s => s.id === studentId)
    const isPresent = !student.attendance[selectedDate.value]
    store.updateAttendance(classId, studentId, selectedDate.value, isPresent)
}

const handleCreateAssignment = (assignmentData) => {
    store.addAssignment(classId, assignmentData)
}

const handleGrade = ({ studentId, assignmentId, score }) => {
    store.updateGrade(classId, studentId, assignmentId, score)
}

const requestExam = (studentId) => {
    const student = currentClass.value.roster.find(s => s.id === studentId)
    if (student) {
        student.examStatus = 'Requested'
    }
}

onMounted(() => {
    if (!currentClass.value) {
        // Fallback for reload on mock data
    }
})
</script>

<template>
  <div
    v-if="currentClass"
    class="space-y-6 pb-20 md:pb-0 animate-in fade-in"
  >
    <!-- Header -->
    <div class="flex items-center gap-4">
      <button 
        class="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-full transition-all"
        @click="router.back()"
      >
        <ArrowLeft class="w-6 h-6" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-secondary-900 leading-tight">
          {{ currentClass.name }}
        </h1>
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
      <nav
        class="-mb-px flex space-x-8"
        aria-label="Tabs"
      >
        <button
          v-for="tab in tabs"
          :key="tab"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200"
          :class="[
            activeTab === tab
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
          ]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <!-- Tab Content (Using Child Components) -->
    <AttendanceTab 
      v-if="activeTab === 'Attendance'"
      :roster="currentClass.roster"
      :selected-date="selectedDate"
      @update:selected-date="selectedDate = $event"
      @toggle-attendance="handleAttendance"
    />

    <AssignmentsTab 
      v-if="activeTab === 'Assignments'"
      :roster="currentClass.roster"
      :assignments="currentClass.assignments"
      @create-assignment="isAssignmentModalOpen = true"
      @update-grade="handleGrade"
    />

    <ExamsTab 
      v-if="activeTab === 'Exams'"
      :roster="currentClass.roster"
      @request-exam="requestExam"
    />

    <!-- Modals -->
    <CreateAssignmentModal 
      :is-open="isAssignmentModalOpen" 
      @close="isAssignmentModalOpen = false"
      @create="handleCreateAssignment"
    />
  </div>
  <div
    v-else
    class="text-center py-20"
  >
    <p class="text-secondary-500">
      Loading class details...
    </p>
  </div>
</template>
