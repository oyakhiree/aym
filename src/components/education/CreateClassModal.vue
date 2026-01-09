<script setup>
import { reactive, computed } from 'vue'
import { useCurriculumStore } from '@/stores/curriculum'
import { X, BookOpen, Award, User, Calendar } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const store = useCurriculumStore()

const form = reactive({
    type: 'Progressive',
    name: '',
    instructor: '',
    startDate: new Date().toISOString().split('T')[0]
})

const isFormValid = computed(() => form.name && form.instructor && form.startDate)

const availableClasses = computed(() => {
    return form.type === 'Progressive' ? store.progressiveClasses : store.honours
})

const handleSubmit = () => {
    if(!isFormValid.value) return
    store.addClass({ ...form })
    // Reset
    form.name = ''
    form.instructor = ''
    form.startDate = new Date().toISOString().split('T')[0]
    
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
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-center sm:block" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div class="flex flex-col justify-end min-h-screen sm:min-h-full sm:items-center sm:justify-center p-0 sm:p-4 text-center w-full">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0 sm:opacity-0"
            enter-to-class="translate-y-0 sm:translate-y-0 sm:scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-y-0 sm:translate-y-0 sm:scale-100 opacity-100"
            leave-to-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0 sm:opacity-0"
          >
            <div v-if="isOpen" class="relative w-full transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:max-w-xl border-t sm:border border-secondary-100">
                
              <!-- Header -->
              <div class="bg-secondary-50/50 px-6 py-4 border-b border-secondary-100 flex items-center justify-between">
                <div>
                   <h3 class="text-lg font-bold text-secondary-900 leading-6" id="modal-title">Start New Class</h3>
                   <p class="text-sm text-secondary-500 mt-0.5">Begin a new progressive class or honour.</p>
                </div>
                <button @click="$emit('close')" class="rounded-full p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-all">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Body -->
              <div class="px-6 py-6 space-y-5">
                
                <!-- Class Type Selector -->
                <div class="grid grid-cols-2 gap-3 p-1 bg-secondary-100 rounded-xl">
                    <button 
                        @click="form.type = 'Progressive'"
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                        :class="form.type === 'Progressive' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'"
                    >
                        <BookOpen class="w-4 h-4" />
                        Progressive
                    </button>
                    <button 
                        @click="form.type = 'Honour'"
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                        :class="form.type === 'Honour' ? 'bg-white text-indigo-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'"
                    >
                        <Award class="w-4 h-4" />
                        Honour
                    </button>
                </div>

                <!-- Fields -->
                <div class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-sm font-medium text-secondary-700">Select Class/Honour <span class="text-red-500">*</span></label>
                        <select v-model="form.name" class="block w-full rounded-xl border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3">
                            <option value="" disabled>Choose a class...</option>
                            <option v-for="item in availableClasses" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-sm font-medium text-secondary-700">Instructor <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User class="h-4 w-4 text-secondary-400" />
                            </div>
                            <input v-model="form.instructor" type="text" class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3" placeholder="Enter instructor name">
                        </div>
                    </div>

                     <div class="space-y-1.5">
                        <label class="text-sm font-medium text-secondary-700">Start Date</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar class="h-4 w-4 text-secondary-400" />
                            </div>
                            <input v-model="form.startDate" type="date" class="block w-full rounded-xl border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3">
                        </div>
                    </div>
                </div>

              </div>

              <!-- Footer -->
              <div class="bg-secondary-50/50 px-6 py-4 border-t border-secondary-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button 
                    @click="$emit('close')" 
                    class="w-full sm:w-auto px-4 py-2.5 border border-secondary-300 shadow-sm text-sm font-medium rounded-xl text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                >
                  Cancel
                </button>
                <BaseButton 
                    @click="handleSubmit" 
                    :disabled="!isFormValid"
                    class="w-full sm:w-auto"
                >
                  Create Class
                </BaseButton>
              </div>

            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
