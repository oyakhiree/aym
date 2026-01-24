<script setup>
import { reactive, computed, watch } from 'vue'
import { X, Calendar, MapPin, Image } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  isOpen: Boolean,
  eventToEdit: Object // Optional event object for editing
})

const emit = defineEmits(['close', 'create', 'update'])

const form = reactive({
    title: '',
    description: '',
    date: '',
    location: '',
    image: ''
})

// Watch for changes when modal opens/closes or edit target changes
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        if (props.eventToEdit) {
            // Edit Mode: Pre-fill
            Object.assign(form, { ...props.eventToEdit })
        } else {
            // Create Mode: Reset
            form.title = ''
            form.description = ''
            form.date = ''
            form.location = ''
            form.image = ''
        }
    }
})

const isFormValid = computed(() => form.title && form.date)

const handleSubmit = () => {
    if(!isFormValid.value) return
    const payload = { ...form }
    
    if (props.eventToEdit) {
        emit('update', { id: props.eventToEdit.id, ...payload })
    } else {
        emit('create', payload)
    }
    emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex justify-center sm:block"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm transition-opacity"
          @click="$emit('close')"
        />

        <div class="flex flex-col justify-end min-h-screen sm:min-h-full sm:items-center sm:justify-center p-0 sm:p-4 text-center w-full">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0 sm:opacity-0"
            enter-to-class="translate-y-0 sm:translate-y-0 sm:scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-y-0 sm:translate-y-0 sm:scale-100 opacity-100"
            leave-to-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0 sm:opacity-0"
          >
            <div
              v-if="isOpen"
              class="relative w-full transform rounded-t-3xl sm:rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:max-w-lg border-t sm:border border-secondary-100 max-h-[90vh] flex flex-col overflow-hidden"
            >
              <!-- Header -->
              <div class="bg-white px-6 py-5 flex items-start justify-between">
                <div>
                  <h3 class="text-xl font-bold text-secondary-900 leading-6 tracking-tight">
                    {{ eventToEdit ? 'Edit Activity' : 'Create New Activity' }}
                  </h3>
                  <p class="text-sm text-secondary-500 mt-1">
                    {{ eventToEdit ? 'Update activity details below.' : 'Plan a new activity for the club.' }}
                  </p>
                </div>
                <button
                  class="rounded-full p-2 -mr-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-50 transition-all"
                  @click="$emit('close')"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Body -->
              <div class="px-6 pb-6 space-y-5 flex-1 overflow-y-auto">
                <div>
                  <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1.5 block">Activity Title <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 bg-secondary-50/30"
                    placeholder="e.g. Summer Hiking Trip"
                  >
                </div>
                 
                <div>
                  <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1.5 block">Description</label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 bg-secondary-50/30 resize-none"
                    placeholder="Briefly describe the activity..."
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1.5 block">Date <span class="text-red-500">*</span></label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar class="h-4 w-4 text-secondary-400" />
                      </div>
                      <input
                        v-model="form.date"
                        type="date"
                        class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3"
                      >
                    </div>
                  </div>
                  <div>
                    <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1.5 block">Location</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin class="h-4 w-4 text-secondary-400" />
                      </div>
                      <input
                        v-model="form.location"
                        type="text"
                        class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3"
                        placeholder="City, Venue"
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <label class="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1.5 block">Cover Image URL</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image class="h-4 w-4 text-secondary-400" />
                    </div>
                    <input
                      v-model="form.image"
                      type="text"
                      placeholder="https://..."
                      class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                    >
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="bg-white px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2 pb-6 border-t border-secondary-50">
                <button 
                  class="w-full sm:w-auto px-6 py-2.5 border border-secondary-200 shadow-sm text-sm font-medium rounded-xl text-secondary-600 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all" 
                  @click="$emit('close')"
                >
                  Cancel
                </button>
                <BaseButton 
                  :disabled="!isFormValid" 
                  class="w-full sm:w-auto shadow-lg shadow-primary-500/20"
                  @click="handleSubmit"
                >
                  {{ eventToEdit ? 'Save Changes' : 'Create Activity' }}
                </BaseButton>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
