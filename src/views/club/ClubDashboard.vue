<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClubStore } from '@/stores/club'
import { useEventStore } from '@/stores/event'
import { useAuthStore } from '@/stores/auth'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'
import MemberRosterWidget from '@/components/dashboard/MemberRosterWidget.vue'
import ExamTrackerWidget from '@/components/dashboard/ExamTrackerWidget.vue'
import AddMemberModal from '@/components/club/AddMemberModal.vue'
import CreateEventModal from '@/components/education/CreateEventModal.vue'

const router = useRouter()
const clubStore = useClubStore()
const eventStore = useEventStore()
const authStore = useAuthStore()

// Modal states
const isAddMemberModalOpen = ref(false)
const isCreateEventModalOpen = ref(false)

const handleAction = (actionId) => {
    switch (actionId) {
        case 'register':
            isAddMemberModalOpen.value = true
            break
        case 'exam':
            router.push('/classes')
            break
        case 'create-event':
            isCreateEventModalOpen.value = true
            break
    }
}

const handleCreateEvent = (eventData) => {
    eventStore.addEvent(eventData)
    isCreateEventModalOpen.value = false
}

// --- Chart Configurations ---
const membershipPulseSeries = [clubStore.activeMembersCount, clubStore.inactiveMembersCount || 2]
const membershipPulseOptions = {
    chart: { type: 'donut', sparkline: { enabled: true } },
    colors: ['#4f46e5', '#e5e7eb'],
    labels: ['Active', 'Inactive'],
    plotOptions: { pie: { donut: { size: '65%' } } },
    tooltip: { enabled: true },
    stroke: { show: false }
}

const classProgressionSeries = [{ name: 'Progress', data: [80, 45, 60, 90, 30] }]
const classProgressionOptions = {
    chart: { type: 'bar', sparkline: { enabled: true } },
    colors: ['#10b981'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    xaxis: { categories: ['Friend', 'Comp', 'Expl', 'Rang', 'Voy'] },
    tooltip: { fixed: { enabled: false }, x: { show: true }, y: { title: { formatter: () => '' } } }
}

const examReadinessSeries = [75]
const examReadinessOptions = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    colors: ['#f59e0b'],
    plotOptions: { radialBar: { hollow: { size: '60%' }, track: { background: '#fef3c7' }, dataLabels: { show: false } } }
}

// Mock Data for Exam Widget
const upcomingExams = [
    { id: 1, title: 'Guide Class Assessment', date: 'Oct 24, 2025', status: 'Ready' },
    { id: 2, title: 'Standard Usage Review', date: 'Nov 02, 2025', status: 'Pending' }
]

</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Welcome Section -->
    <div>
      <h1 class="text-2xl font-bold text-secondary-900 tracking-tight">
        Welcome back, {{ authStore.user?.name || 'Director' }} 👋
      </h1>
      <p class="text-secondary-500 mt-1">
        Here's your club's "Mission Control" overview for today.
      </p>
    </div>

    <!-- Key Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
            title="Membership Pulse" 
            :value="clubStore.members.length" 
            subtitle="Total Members"
            :chart-series="membershipPulseSeries"
            :chart-options="membershipPulseOptions"
            type="donut"
            color="indigo"
            :trend="12"
        />
        <MetricCard 
            title="Class Progression" 
            value="68%" 
            subtitle="On Track"
            :chart-series="classProgressionSeries"
            :chart-options="classProgressionOptions"
            type="bar"
            color="emerald"
            :trend="5"
        />
        <MetricCard 
            title="Honours Earned" 
            value="142" 
            subtitle="This Quarter"
            color="purple"
            :trend="18"
        >
           <!-- Custom content or icon fallback could go here if no chart -->
        </MetricCard>
        <MetricCard 
            title="Exam Readiness" 
            value="8" 
            subtitle="Eligible Candidates"
            :chart-series="examReadinessSeries"
            :chart-options="examReadinessOptions"
            type="radialBar"
            color="amber"
            :trend="-2"
        />
    </div>

    <!-- Quick Actions -->
    <QuickActions @action="handleAction" />

    <!-- Feature Widgets -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Member Management (Roster) - Takes 2 cols -->
        <div class="lg:col-span-2 h-[500px]">
            <MemberRosterWidget 
                :members="clubStore.members" 
                @toggle-status="clubStore.toggleStatus"
            />
        </div>
        
        <!-- Exam & Class Tracker - Takes 1 col -->
        <div class="h-[500px]">
            <ExamTrackerWidget 
                :pending-exams="1" 
                :upcoming-exams="upcomingExams"
            />
        </div>
    </div>

    <!-- Modals -->
    <AddMemberModal 
        :isOpen="isAddMemberModalOpen" 
        @close="isAddMemberModalOpen = false" 
    />
    <CreateEventModal 
        :isOpen="isCreateEventModalOpen" 
        @close="isCreateEventModalOpen = false"
        @create="handleCreateEvent"
    />
  </div>
</template>
