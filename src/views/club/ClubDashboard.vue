<script setup>
import { ref } from 'vue'
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
    plotOptions: { pie: { donut: { size: '75%', labels: { show: false } } } },
    tooltip: { enabled: false },
    stroke: { width: 0 }
}

const classProgressionSeries = [{ name: 'Progress', data: [80, 45, 60, 90, 30] }]
const classProgressionOptions = {
    chart: { type: 'bar', sparkline: { enabled: true } },
    colors: ['#10b981'],
    plotOptions: { bar: { borderRadius: 3, columnWidth: '65%' } },
    xaxis: { categories: ['Friend', 'Comp', 'Expl', 'Rang', 'Voy'] },
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
}

const examReadinessSeries = [75]
const examReadinessOptions = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    colors: ['#f59e0b'],
    plotOptions: { radialBar: { hollow: { size: '65%' }, track: { background: '#fef3c7', strokeWidth: '100%' }, dataLabels: { show: false } } },
    stroke: { lineCap: 'round' }
}

// Mock Data for Exam Widget
const upcomingExams = [
    { id: 1, title: 'Guide Class Assessment', date: 'Oct 24, 2025', status: 'Ready' },
    { id: 2, title: 'Standard Usage Review', date: 'Nov 02, 2025', status: 'Pending' }
]
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-700">
    <!-- Welcome Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1 md:px-0">
      <div>
        <h1 class="text-2xl md:text-3xl font-semibold text-secondary-900 tracking-tight leading-tight">
          Welcome back, {{ authStore.user?.name || 'Director' }}
        </h1>
        <p class="text-secondary-500 font-medium mt-1 text-base md:text-lg">
          Here's your club's overview for today.
        </p>
      </div>
      <div class="hidden md:block">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-secondary-100 shadow-sm">
          Last updated: Just now
        </span>
      </div>
    </div>

    <!-- Key Metrics Grid (Scrollable on Mobile, Grid on Desktop) -->
    <div class="flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <MetricCard 
          title="Active Membership" 
          :value="clubStore.members.length" 
          subtitle="Total Members"
          :chart-series="membershipPulseSeries"
          :chart-options="membershipPulseOptions"
          type="donut"
          color="indigo"
          :trend="12"
          class="h-full"
        />
      </div>
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <MetricCard 
          title="Class Progression" 
          value="68%" 
          subtitle="On Track"
          :chart-series="classProgressionSeries"
          :chart-options="classProgressionOptions"
          type="bar"
          color="emerald"
          :trend="5"
          class="h-full"
        />
      </div>
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <MetricCard 
          title="Honours Earned" 
          value="142" 
          subtitle="This Quarter"
          color="purple"
          :trend="18"
          class="h-full"
        >
          <!-- Custom content or icon fallback could go here if no chart -->
        </MetricCard>
      </div>
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <MetricCard 
          title="Exam Readiness" 
          value="8" 
          subtitle="Eligible Candidates"
          :chart-series="examReadinessSeries"
          :chart-options="examReadinessOptions"
          type="radialBar"
          color="amber"
          :trend="-2"
          class="h-full"
        />
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="text-lg font-semibold text-secondary-900 mb-4 px-1">
        Quick Actions
      </h2>
      <QuickActions @action="handleAction" />
    </div>

    <!-- Feature Widgets -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
      :is-open="isAddMemberModalOpen" 
      @close="isAddMemberModalOpen = false" 
    />
    <CreateEventModal 
      :is-open="isCreateEventModalOpen" 
      @close="isCreateEventModalOpen = false"
      @create="handleCreateEvent"
    />
  </div>
</template>
