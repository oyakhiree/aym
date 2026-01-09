<script setup>
import { ref } from 'vue'
import { Plus, Search, MapPin } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import CreateEventModal from '@/components/education/CreateEventModal.vue'

// Mock Events Data
const events = ref([
    {
        id: '1',
        title: 'World Pathfinder Day',
        description: 'A global celebration of Pathfinders. We will be marching at the conference headquarters.',
        date: '2026-09-19',
        location: 'Conference HQ, Lagos',
        image: 'https://images.unsplash.com/photo-1526634333649-61ac04b281f6?q=80&w=2670&auto=format&fit=crop', // Mock image
        attendees: 150
    },
    {
        id: '2',
        title: 'Nature Hiking Adventure',
        description: 'An adventurous hike through the hills to learn about nature and creation.',
        date: '2026-05-12',
        location: 'Olumo Rock',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
        attendees: 45
    },
    {
        id: '3',
        title: 'Community Service: Clean Up',
        description: 'Cleaning up the local market square as part of our GYD activities.',
        date: '2026-03-18',
        location: 'Magboro Market',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop',
        attendees: 30
    }
])

const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const handleCreateEvent = (eventData) => {
    events.value.unshift({
        id: Math.random().toString(36).substr(2, 9),
        ...eventData,
        image: eventData.image || 'https://images.unsplash.com/photo-1526634333649-61ac04b281f6?q=80&w=2670&auto=format&fit=crop', // Fallback
        attendees: 0
    })
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in pb-20 md:pb-0">
    
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-secondary-900 tracking-tight">Extracurricular Activities</h1>
        <p class="text-secondary-500 mt-1">Manage events, hikes, and special programs.</p>
      </div>
      <BaseButton class="w-full md:w-auto shadow-lg shadow-primary-500/20" @click="isCreateModalOpen = true">
         <Plus class="w-5 h-5 mr-2" />
         Create Event
      </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
       <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-center">
            <span class="text-2xl font-bold text-indigo-700">{{ events.length }}</span>
            <span class="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Total Events</span>
       </div>
       <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col justify-center">
            <span class="text-2xl font-bold text-emerald-700">{{ events.reduce((acc, curr) => acc + curr.attendees, 0) }}</span>
            <span class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Total Attendees</span>
       </div>
    </div>

    <!-- Search -->
    <div class="relative max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-4 w-4 text-secondary-400" />
        </div>
        <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search events..." 
            class="block w-full rounded-xl border-secondary-200 pl-10 sm:text-sm py-2.5 bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all"
        >
    </div>

    <!-- Events Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
            v-for="event in events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))" 
            :key="event.id"
            class="bg-white rounded-2xl border border-secondary-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
        >
            <div class="h-48 w-full overflow-hidden relative">
                <img :src="event.image" alt="Event Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-secondary-800 shadow-sm border border-secondary-100">
                    {{ new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) }}
                </div>
            </div>
            
            <div class="p-5 flex-1 flex flex-col">
                <h3 class="text-lg font-bold text-secondary-900 group-hover:text-primary-700 transition-colors mb-2">{{ event.title }}</h3>
                <p class="text-sm text-secondary-500 line-clamp-2 mb-4 flex-1">{{ event.description }}</p>
                
                <div class="flex items-center text-xs text-secondary-500 gap-4 pt-4 border-t border-secondary-50">
                     <div class="flex items-center gap-1.5">
                        <MapPin class="w-3.5 h-3.5" />
                        {{ event.location }}
                     </div>
                     <div class="ml-auto font-medium bg-secondary-50 px-2 py-1 rounded-md">
                        {{ event.attendees }} Attending
                     </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Modal -->
    <CreateEventModal 
        :isOpen="isCreateModalOpen" 
        @close="isCreateModalOpen = false"
        @create="handleCreateEvent"
    />

  </div>
</template>
