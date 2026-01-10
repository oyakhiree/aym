<script setup>
import { reactive, computed } from 'vue'
import { X, FileText, ClipboardList } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'create'])

const form = reactive({
    title: '',
    type: 'Classwork',
    maxScore: 100
})

const isFormValid = computed(() => form.title && form.maxScore > 0)

const handleSubmit = () => {
    if(!isFormValid.value) return
    emit('create', { ...form })
    // Reset
    form.title = ''
    form.type = 'Classwork'
    form.maxScore = 100
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
              class="relative w-full transform rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:max-w-md border-t sm:border border-secondary-100 max-h-[90vh] flex flex-col overflow-hidden"
            >
              <!-- Header -->
              <div class="bg-secondary-50/50 px-6 py-4 border-b border-secondary-100 flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-secondary-900 leading-6">
                    New Assignment
                  </h3>
                </div>
                <button
                  class="rounded-full p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-all"
                  @click="$emit('close')"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Body -->
              <div class="px-6 py-6 space-y-5 flex-1 overflow-y-auto">
                <!-- Type Selector -->
                <div class="grid grid-cols-2 gap-3 p-1 bg-secondary-100 rounded-xl">
                  <button 
                    class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                    :class="form.type === 'Classwork' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'"
                    @click="form.type = 'Classwork'"
                  >
                    <ClipboardList class="w-4 h-4" />
                    Classwork
                  </button>
                  <button 
                    class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                    :class="form.type === 'Homework' ? 'bg-white text-indigo-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'"
                    @click="form.type = 'Homework'"
                  >
                    <FileText class="w-4 h-4" />
                    Homework
                  </button>
                </div>

                <div class="space-y-4">
                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-secondary-700">Title <span class="text-red-500">*</span></label>
                    <input
                      v-model="form.title"
                      type="text"
                      class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3"
                      placeholder="e.g. Memory Verse Psalm 23"
                    >
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-secondary-700">Max Score</label>
                    <input
                      v-model="form.maxScore"
                      type="number"
                      class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3"
                    >
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="bg-secondary-50/50 px-6 py-4 border-t border-secondary-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button 
                  class="w-full sm:w-auto px-4 py-2.5 border border-secondary-300 shadow-sm text-sm font-medium rounded-xl text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all" 
                  @click="$emit('close')"
                >
                  Cancel
                </button>
                <BaseButton 
                  :disabled="!isFormValid" 
                  class="w-full sm:w-auto"
                  @click="handleSubmit"
                >
                  Create
                </BaseButton>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
