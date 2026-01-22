<script setup>
import { reactive, computed } from 'vue'
import { useClubStore } from '@/stores/club'
import { X, Upload, Calendar, User, Users, Phone, Shield } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { PROGRESSIVE_CLASSES } from '@/constants/curriculum'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const clubStore = useClubStore()

const form = reactive({
  firstName: '',
  lastName: '',
  dob: '',
  gender: 'Male',
  class: 'Friend',
  guardian: '',
  phone: '',
  status: true // true = Active, false = Inactive
})

const classes = PROGRESSIVE_CLASSES

const isFormValid = computed(() => {
  return form.firstName && form.lastName && form.dob && form.guardian
})

const handleSubmit = () => {
    if (!isFormValid.value) return
    
    clubStore.addMember({
        ...form,
        status: form.status ? 'Active' : 'Inactive'
    })
    
    // Reset and close
    Object.assign(form, {
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'Male',
        class: 'Friend',
        guardian: '',
        phone: '',
        status: true
    })
    emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
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
          class="fixed inset-0 bg-secondary-900/40 backdrop-blur-sm transition-opacity"
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
              class="relative w-full transform rounded-t-3xl sm:rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:max-w-2xl border border-secondary-100 max-h-[90vh] flex flex-col overflow-hidden"
            >
              <!-- Header (Cleaner) -->
              <div class="bg-white px-6 py-5 flex items-start justify-between">
                <div>
                  <h3
                    id="modal-title"
                    class="text-xl font-bold text-secondary-900 leading-6 tracking-tight"
                  >
                    New Member Registration
                  </h3>
                  <p class="text-sm text-secondary-500 mt-1">
                    Add a new pathfinder or adventurer to your roster.
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
              <div class="px-6 pb-6 space-y-6 flex-1 overflow-y-auto">
                <!-- Personal Info Section -->
                <div>
                  <h4 class="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User class="w-4 h-4" /> Personal Information
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">First Name <span class="text-red-500">*</span></label>
                      <input
                        v-model="form.firstName"
                        type="text"
                        class="block w-full rounded-lg border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                        placeholder="e.g. John"
                      >
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Last Name <span class="text-red-500">*</span></label>
                      <input
                        v-model="form.lastName"
                        type="text"
                        class="block w-full rounded-lg border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                        placeholder="e.g. Doe"
                      >
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Date of Birth <span class="text-red-500">*</span></label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar class="h-4 w-4 text-secondary-400" />
                        </div>
                        <input
                          v-model="form.dob"
                          type="date"
                          class="block w-full rounded-lg border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                        >
                      </div>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Gender</label>
                      <select
                        v-model="form.gender"
                        class="block w-full rounded-lg border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr class="border-secondary-100/50">

                <!-- Club Info Section -->
                <div>
                  <h4 class="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users class="w-4 h-4" /> Club Details
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Class Assignment</label>
                      <select
                        v-model="form.class"
                        class="block w-full rounded-lg border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                      >
                        <option
                          v-for="c in classes"
                          :key="c"
                          :value="c"
                        >
                          {{ c }}
                        </option>
                      </select>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Initial Status</label>
                      <div class="flex items-center gap-3 pt-2">
                        <button 
                          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
                          :class="[form.status ? 'bg-emerald-500' : 'bg-secondary-200']"
                          @click="form.status = !form.status"
                        >
                          <span 
                            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                            :class="[form.status ? 'translate-x-5' : 'translate-x-0']"
                          />
                        </button>
                        <span
                          class="text-sm font-medium"
                          :class="form.status ? 'text-emerald-600' : 'text-secondary-500'"
                        >
                          {{ form.status ? 'Active Member' : 'Inactive' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="border-secondary-100/50">

                <!-- Guardian Info Section -->
                <div>
                  <h4 class="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield class="w-4 h-4" /> Guardian Info
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Guardian Name <span class="text-red-500">*</span></label>
                      <input
                        v-model="form.guardian"
                        type="text"
                        class="block w-full rounded-lg border-secondary-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                        placeholder="Parent/Guardian Full Name"
                      >
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-secondary-600 uppercase tracking-wide">Phone Number</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone class="h-4 w-4 text-secondary-400" />
                        </div>
                        <input
                          v-model="form.phone"
                          type="tel"
                          class="block w-full rounded-lg border-secondary-200 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 bg-secondary-50/30"
                          placeholder="+234..."
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- File Upload -->
                <div class="bg-secondary-50 border border-dashed border-secondary-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-secondary-100 hover:border-secondary-300 transition-all cursor-pointer group">
                  <div class="p-3 bg-white rounded-xl shadow-sm mb-2 group-hover:scale-110 transition-transform">
                    <Upload class="w-5 h-5 text-primary-600" />
                  </div>
                  <p class="text-sm font-medium text-secondary-900">
                    Upload Birth Certificate
                  </p>
                  <p class="text-xs text-secondary-500 mt-1">
                    SVG, PNG, JPG or PDF (MAX. 800x400px)
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div class="bg-white px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2 pb-6">
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
                  Add Member
                </BaseButton>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
