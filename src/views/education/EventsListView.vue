<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { useSearchable } from '@/composables/useSearchable'
import { useDisclosure } from '@/composables/useDisclosure'
import { Plus, Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import StatsOverview from '@/components/ui/StatsOverview.vue'
import CreateEventModal from '@/components/education/CreateEventModal.vue'

const router = useRouter()
const store = useEventStore()

// Composables
const { isOpen: isCreateModalOpen, open: openCreateModal, close: closeCreateModal } = useDisclosure()

const { searchQuery, filteredItems: searchedEvents } = useSearchable(
    computed(() => store.events),
    [ 'title', 'location' ]
)

const handleCreateEvent = (eventData) => {
    store.addEvent(eventData)
}

const navigateToEvent = (id) => {
    router.push(`/events/${id}`)
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in pb-20 md:pb-0">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-secondary-900 tracking-tight">
          Extracurricular Activities
        </h1>
        <p class="text-secondary-500 mt-1">
          Manage events, hikes, and special programs.
        </p>
      </div>
      <BaseButton
        class="w-full sm:w-auto shadow-lg shadow-primary-500/20"
        @click="openCreateModal"
      >
        <Plus class="w-5 h-5 mr-2" />
        Create Activity
      </BaseButton>
    </div>

    <!-- Stats (Snap Scroll on Mobile) -->
    <StatsOverview 
      :stats="[
        { label: 'Total Activities', value: store.events.length, icon: Calendar, color: 'indigo' },
        { 
          label: 'Total Attendees', 
          value: store.events.reduce((acc, curr) => acc + (curr.report ? curr.report.attendance : 0), 0), 
          icon: Users, 
          color: 'emerald' 
        }
      ]"
    />

    <!-- Search -->
    <div class="relative max-w-md group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-500">
        <Search class="h-4 w-4 text-secondary-400 group-focus-within:text-primary-500" />
      </div>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search activities by title..." 
        class="block w-full rounded-xl border-secondary-200 pl-10 sm:text-sm py-2.5 bg-secondary-50/30 focus:bg-white focus:border-primary-500 focus:ring-primary-500/20 transition-all header-search"
      >
    </div>

    <!-- Events Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in searchedEvents" 
        :key="event.id"
        class="group bg-white rounded-3xl border border-secondary-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-900/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col relative"
        @click="navigateToEvent(event.id)"
      >
        <!-- Image Container -->
        <div class="h-60 w-full overflow-hidden relative">
          <img
            :src="event.image || '/placeholder-image.jpg'"
            alt="Event Cover"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            @error="$event.target.src = 'https://placehold.co/600x400?text=Activity'"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          <!-- Floating Date Badge -->
          <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-white/50 flex flex-col items-center min-w-[60px]">
            <span class="text-[10px] font-bold text-red-500 uppercase tracking-wider">{{ new Date(event.date).toLocaleDateString(undefined, { month: 'short' }) }}</span>
            <span class="text-xl font-bold text-secondary-900 leading-none">{{ new Date(event.date).toLocaleDateString(undefined, { day: 'numeric' }) }}</span>
          </div>

          <!-- Status Pill -->
          <div 
            v-if="event.report"
            class="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1"
          >
            <Users class="w-3 h-3" /> Report Filed
          </div>
        </div>
            
        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-start justify-between gap-4 mb-3">
            <h3 class="text-xl font-bold text-secondary-900 leading-tight group-hover:text-primary-600 transition-colors">
              {{ event.title }}
            </h3>
          </div>
            
          <p class="text-sm text-secondary-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
            {{ event.description }}
          </p>
            
          <!-- Footer Details -->
          <div class="flex items-center gap-4 text-xs font-semibold text-secondary-500 pt-4 border-t border-secondary-50">
            <div class="flex items-center gap-1.5 bg-secondary-50 px-2.5 py-1 rounded-md text-secondary-600">
              <MapPin class="w-3.5 h-3.5" />
              <span class="truncate max-w-[150px]">{{ event.location }}</span>
            </div>
            
            <div 
              v-if="!event.report" 
              class="ml-auto text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              View Details <ArrowRight class="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <CreateEventModal 
      :is-open="isCreateModalOpen" 
      @close="closeCreateModal"
      @create="handleCreateEvent"
    />
  </div>
</template>
