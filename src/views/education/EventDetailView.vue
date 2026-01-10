<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCurriculumStore } from '@/stores/curriculum'
import { 
    ArrowLeft, Calendar, MapPin, Edit, FileText, Image, 
    UploadCloud, CheckCircle, Users 
} from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import CreateEventModal from '@/components/education/CreateEventModal.vue'

const router = useRouter()
const route = useRoute()
const store = useCurriculumStore()

const eventId = route.params.id
const event = computed(() => store.events.find(e => e.id === eventId))

// Modal State
const isEditModalOpen = ref(false)

// Report Form
const reportForm = reactive({
    attendance: 0,
    summary: '',
    images: []
})
const isReportSubmitting = ref(false)

// Initialize report form if report exists
onMounted(() => {
   if(event.value && event.value.report) {
       reportForm.attendance = event.value.report.attendance
       reportForm.summary = event.value.report.summary
       reportForm.images = event.value.report.images || []
   }
})

const handleUpdateEvent = (updatedData) => {
    store.updateEvent(eventId, updatedData)
}

const handleFileSelect = (e) => {
    // Mock upload: assume user selected valid images
    // In real app, upload to server/storage bucket
    const fileCount = e.target.files.length
    for(let i=0; i < fileCount; i++) {
        // Fallback mock URLs for demo
        reportForm.images.push(`https://source.unsplash.com/random/800x600?nature,sig=${Math.random()}`)
    }
}

const submitReport = () => {
    isReportSubmitting.value = true
    // Simulate API delay
    setTimeout(() => {
        store.submitEventReport(eventId, { ...reportForm })
        isReportSubmitting.value = false
    }, 800)
}

const goBack = () => router.push('/events')

</script>

<template>
  <div v-if="event" class="space-y-6 pb-20 md:pb-0 animate-in fade-in">
    
    <!-- Hero / Header -->
    <div class="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-sm group">
        <img :src="event.image" alt="Event Cover" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
             <button @click="goBack" class="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors">
                <ArrowLeft class="w-5 h-5" />
             </button>

             <div class="flex items-end justify-between">
                <div>
                     <div class="flex items-center gap-2 text-primary-200 mb-2 font-medium">
                        <Calendar class="w-4 h-4" />
                        {{ new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                     </div>
                     <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-2">{{ event.title }}</h1>
                     <div class="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin class="w-4 h-4 text-gray-400" />
                        {{ event.location }}
                     </div>
                </div>
                <BaseButton @click="isEditModalOpen = true" variant="primary" class="hidden sm:flex shadow-xl shadow-black/20 border-0 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white">
                    <Edit class="w-4 h-4 mr-2" />
                    Edit Event
                </BaseButton>
             </div>
        </div>
    </div>

    <!-- Mobile Edit Button (Floating) -->
    <button 
        @click="isEditModalOpen = true"
        class="sm:hidden fixed bottom-24 right-4 z-30 p-4 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 active:scale-90 transition-transform"
    >
        <Edit class="w-6 h-6" />
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Details & Description -->
        <div class="lg:col-span-2 space-y-8">
            <section>
                <h3 class="text-lg font-bold text-secondary-900 mb-3 flex items-center gap-2">
                    <FileText class="w-5 h-5 text-secondary-500" />
                    About This Event
                </h3>
                <p class="text-secondary-600 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
            </section>

            <!-- Report Section -->
            <section class="bg-white rounded-2xl border border-secondary-100 p-6 shadow-sm">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-lg font-bold text-secondary-900">Event Report</h3>
                         <p class="text-sm text-secondary-500">{{ event.report ? 'Report submitted successfully' : 'Submit post-event details' }}</p>
                    </div>
                    <div v-if="event.report" class="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                        <CheckCircle class="w-3.5 h-3.5" /> Filed
                    </div>
                </div>

                <div v-if="!event.report" class="space-y-5">
                    <!-- Report Form -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="space-y-1.5">
                            <label class="text-sm font-medium text-secondary-700">Actual Attendance</label>
                            <input v-model="reportForm.attendance" type="number" class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-sm font-medium text-secondary-700">Upload Photos</label>
                            <div class="flex items-center gap-2 w-full p-2 border border-dashed border-secondary-300 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors cursor-pointer relative">
                                <UploadCloud class="w-5 h-5 text-secondary-400 ml-2" />
                                <span class="text-sm text-secondary-500">Select images...</span>
                                <input type="file" multiple accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileSelect">
                            </div>
                        </div>
                    </div>
                    
                     <div class="space-y-1.5">
                        <label class="text-sm font-medium text-secondary-700">Detailed Summary / Remarks</label>
                        <textarea v-model="reportForm.summary" rows="4" class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4" placeholder="How did the event go? Any incidents or highlights?"></textarea>
                    </div>

                    <div class="flex justify-end pt-2">
                        <BaseButton @click="submitReport" :loading="isReportSubmitting" class="w-full sm:w-auto">Submit Report</BaseButton>
                    </div>
                </div>

                <div v-else class="space-y-6">
                    <!-- Read Only Report View -->
                     <div class="grid grid-cols-2 gap-4 bg-secondary-50/50 p-4 rounded-xl border border-secondary-100">
                        <div>
                            <span class="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Attendance</span>
                            <div class="text-2xl font-bold text-secondary-900 flex items-center gap-2">
                                {{ event.report.attendance }}
                                <Users class="w-5 h-5 text-secondary-400" />
                            </div>
                        </div>
                         <div>
                            <span class="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Submitted On</span>
                            <div class="text-sm font-medium text-secondary-700 mt-1">
                                {{ new Date(event.report.submittedAt).toLocaleDateString() }}
                            </div>
                        </div>
                     </div>
                     
                     <div>
                        <span class="text-xs font-bold text-secondary-900 uppercase tracking-wider block mb-2">Summary</span>
                        <p class="text-secondary-600 text-sm leading-relaxed">{{ event.report.summary }}</p>
                     </div>
                </div>

            </section>
        </div>

        <!-- Right Column: Gallery (Mock) -->
        <div class="space-y-6">
            <h3 class="text-lg font-bold text-secondary-900 flex items-center gap-2">
                <Image class="w-5 h-5 text-secondary-500" />
                Gallery
            </h3>
            
            <div v-if="reportForm.images.length > 0" class="grid grid-cols-2 gap-3">
                <div v-for="(img, idx) in reportForm.images" :key="idx" class="aspect-square rounded-xl overflow-hidden bg-secondary-100 border border-secondary-100 shadow-sm group relative">
                    <img :src="img" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
            </div>
            <div v-else class="text-center py-10 bg-secondary-50 rounded-2xl border border-secondary-100 border-dashed text-secondary-400">
                <Image class="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p class="text-sm">No photos uploaded yet</p>
            </div>
        </div>

    </div>

    <!-- Edit Modal -->
    <CreateEventModal 
        :isOpen="isEditModalOpen" 
        :eventToEdit="event"
        @close="isEditModalOpen = false"
        @update="handleUpdateEvent"
    />

  </div>
  <div v-else class="text-center py-20">
      <p class="text-secondary-500">Event not found...</p>
      <button @click="goBack" class="text-primary-600 hover:underline mt-2">Go back</button>
  </div>
</template>
