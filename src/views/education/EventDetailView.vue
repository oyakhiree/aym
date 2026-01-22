<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { 
    ArrowLeft, Calendar, MapPin, Edit, FileText, Image, 
    UploadCloud, CheckCircle, Users 
} from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import CreateEventModal from '@/components/education/CreateEventModal.vue'

const router = useRouter()
const route = useRoute()
const store = useEventStore()

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
  <div
    v-if="event"
    class="space-y-8 pb-20 md:pb-0 animate-in fade-in"
  >
    <!-- Cinematic Header -->
    <div class="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl group">
      <img
        :src="event.image"
        alt="Event Cover"
        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      >
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-between">
        <!-- Top Action Bar -->
        <div class="flex justify-between items-start">
          <button
            class="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all border border-white/10 group/btn"
            @click="goBack"
          >
            <ArrowLeft class="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>

          <BaseButton
            variant="primary"
            class="hidden sm:flex shadow-xl shadow-black/20 border-0 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white"
            @click="isEditModalOpen = true"
          >
            <Edit class="w-4 h-4 mr-2" />
            Edit Event
          </BaseButton>
        </div>

        <div class="space-y-4 max-w-3xl">
          <!-- Badges -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 border border-white/10">
              <Calendar class="w-3.5 h-3.5" />
              {{ new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 border border-white/10">
              <MapPin class="w-3.5 h-3.5" />
              {{ event.location }}
            </div>
          </div>

          <h1 class="text-3xl md:text-5xl font-bold leading-tight text-white tracking-tight">
            {{ event.title }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Mobile Edit Button (Floating) -->
    <button 
      class="sm:hidden fixed bottom-24 right-4 z-30 p-4 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 active:scale-90 transition-transform"
      @click="isEditModalOpen = true"
    >
      <Edit class="w-6 h-6" />
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Details & Description -->
      <div class="lg:col-span-2 space-y-10">
        <section>
          <h3 class="text-xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
            <FileText class="w-5 h-5 text-secondary-500" />
            About This Event
          </h3>
          <div class="prose prose-sm md:prose-base prose-headings:font-bold prose-p:text-secondary-600 prose-a:text-primary-600 max-w-none">
            <p class="whitespace-pre-line leading-relaxed text-secondary-600">
              {{ event.description }}
            </p>
          </div>
        </section>

        <!-- Report Section -->
        <section class="bg-white rounded-3xl border border-secondary-100 p-6 md:p-8 shadow-sm">
          <div class="flex items-center justify-between mb-8 pb-6 border-b border-secondary-50">
            <div>
              <h3 class="text-xl font-bold text-secondary-900">
                Event Report
              </h3>
              <p class="text-sm text-secondary-500 mt-1">
                {{ event.report ? 'Report submitted successfully' : 'Submit post-event outcomes and photos' }}
              </p>
            </div>
            <div
              v-if="event.report"
              class="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-100/50 shadow-sm"
            >
              <CheckCircle class="w-4 h-4" /> Filed
            </div>
          </div>

          <div
            v-if="!event.report"
            class="space-y-6"
          >
            <!-- Report Form -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide">Actual Attendance</label>
                <div class="relative">
                  <Users class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    v-model="reportForm.attendance"
                    type="number"
                    class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 bg-secondary-50/30"
                    placeholder="0"
                  >
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide">Upload Photos</label>
                <div class="flex items-center gap-2 w-full p-2.5 border border-dashed border-secondary-300 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors cursor-pointer relative group">
                  <div class="p-2 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                    <UploadCloud class="w-5 h-5 text-primary-500" />
                  </div>
                  <span class="text-sm text-secondary-500 font-medium">Select images...</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    @change="handleFileSelect"
                  >
                </div>
              </div>
            </div>
                    
            <div class="space-y-2">
              <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide">Detailed Summary</label>
              <textarea
                v-model="reportForm.summary"
                rows="4"
                class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4 bg-secondary-50/30 resize-none"
                placeholder="How did the event go? Any incidents or highlights?"
              />
            </div>

            <div class="flex justify-end pt-4">
              <BaseButton
                :loading="isReportSubmitting"
                class="w-full sm:w-auto px-8 py-3 shadow-lg shadow-primary-500/20"
                @click="submitReport"
              >
                Submit Report
              </BaseButton>
            </div>
          </div>

          <div
            v-else
            class="space-y-6"
          >
            <!-- Read Only Report View -->
            <div class="grid grid-cols-2 gap-4 bg-secondary-50/50 p-5 rounded-2xl border border-secondary-100">
              <div>
                <span class="text-xs font-bold text-secondary-500 uppercase tracking-wider">Attendance</span>
                <div class="text-3xl font-bold text-secondary-900 flex items-center gap-2 mt-1">
                  {{ event.report.attendance }}
                  <span class="text-sm font-medium text-secondary-400">Attendees</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-bold text-secondary-500 uppercase tracking-wider">Submitted On</span>
                <div class="text-sm font-bold text-secondary-900 mt-2 bg-white inline-block px-3 py-1 rounded-lg border border-secondary-200 shadow-sm">
                  {{ new Date(event.report.submittedAt).toLocaleDateString() }}
                </div>
              </div>
            </div>
                     
            <div class="prose prose-sm max-w-none text-secondary-600 bg-secondary-50 p-5 rounded-2xl border border-secondary-100/50">
              <p>{{ event.report.summary }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Gallery (Mock) -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-secondary-900 flex items-center gap-2">
          <Image class="w-5 h-5 text-secondary-500" />
          Gallery
        </h3>
            
        <div
          v-if="reportForm.images.length > 0"
          class="grid grid-cols-2 gap-3"
        >
          <div
            v-for="(img, idx) in reportForm.images"
            :key="idx"
            class="aspect-square rounded-2xl overflow-hidden bg-secondary-100 border border-secondary-100 shadow-sm group relative"
          >
            <img
              :src="img"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
          </div>
        </div>
        <div
          v-else
          class="text-center py-16 bg-secondary-50/50 rounded-3xl border-2 border-dashed border-secondary-200 text-secondary-400"
        >
          <Image class="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p class="text-sm font-medium">
            No photos uploaded
          </p>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <CreateEventModal 
      :is-open="isEditModalOpen" 
      :event-to-edit="event"
      @close="isEditModalOpen = false"
      @update="handleUpdateEvent"
    />
  </div>
  <div
    v-else
    class="text-center py-20"
  >
    <p class="text-secondary-500">
      Event not found...
    </p>
    <button
      class="text-primary-600 hover:underline mt-2"
      @click="goBack"
    >
      Go back
    </button>
  </div>
</template>
