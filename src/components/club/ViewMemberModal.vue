<script setup>
import { computed } from 'vue'
import { X, Calendar, User, Users, Phone, Shield, FileText, Edit2, Mail, MapPin } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  isOpen: Boolean,
  member: Object
})

const emit = defineEmits(['close'])

const classes = ['Friend', 'Companion', 'Explorer', 'Ranger', 'Voyager', 'Guide']

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
        v-if="isOpen && member"
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
              class="relative w-full transform rounded-t-3xl sm:rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:max-w-xl border border-secondary-100 max-h-[90vh] flex flex-col overflow-hidden"
            >
              <!-- Modern Header with Cover -->
              <div class="relative h-32 bg-primary-50">
                <!-- Abstract Pattern Background -->
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <button
                  class="absolute top-4 right-4 rounded-full p-2 text-secondary-400 hover:text-secondary-600 hover:bg-white/80 backdrop-blur-sm transition-all z-10"
                  @click="$emit('close')"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Profile Content -->
              <div class="px-6 pb-8 -mt-12 relative flex-1 overflow-y-auto">
                <div class="flex justify-between items-end mb-6">
                  <!-- Avatar -->
                  <div class="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                    <div class="h-full w-full rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 font-bold text-3xl border border-primary-100/50">
                      {{ member.firstName[0] }}{{ member.lastName[0] }}
                    </div>
                    <span 
                      class="absolute bottom-2 right-1 w-5 h-5 rounded-full border-[3px] border-white shadow-sm"
                      :class="member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'"
                    />
                  </div>

                  <!-- Action -->
                  <button class="mb-2 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-secondary-700 bg-white border border-secondary-200 hover:bg-secondary-50 hover:border-secondary-300 rounded-xl transition-all shadow-sm">
                    <Edit2 class="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                <div>
                  <h2 class="text-2xl font-bold text-secondary-900 tracking-tight">
                    {{ member.firstName }} {{ member.lastName }}
                  </h2>
                  <div class="flex items-center gap-3 mt-2 text-sm text-secondary-500 font-medium">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-secondary-100 text-secondary-700 border border-secondary-200">
                      {{ member.class }}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-secondary-300" />
                    <span>Member ID: #{{ member.id }}</span>
                  </div>
                </div>

                <hr class="my-6 border-secondary-100/50">

                <div class="grid grid-cols-2 gap-x-8 gap-y-6">
                  <!-- Personal Info -->
                  <div class="col-span-2 sm:col-span-1 space-y-4">
                    <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider flex items-center gap-2">
                      Personal Details
                    </h4>
                    
                    <div class="space-y-4">
                      <div class="flex items-start gap-3 group">
                        <div class="p-2 rounded-lg bg-secondary-50 text-secondary-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                          <User class="w-4 h-4" />
                        </div>
                        <div>
                          <p class="text-xs text-secondary-500 font-medium">
                            Gender
                          </p>
                          <p class="text-sm font-semibold text-secondary-900 mt-0.5">
                            {{ member.gender }}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3 group">
                        <div class="p-2 rounded-lg bg-secondary-50 text-secondary-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                          <Calendar class="w-4 h-4" />
                        </div>
                        <div>
                          <p class="text-xs text-secondary-500 font-medium">
                            Date of Birth
                          </p>
                          <p class="text-sm font-semibold text-secondary-900 mt-0.5">
                            {{ member.dob }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Guardian Info -->
                  <div class="col-span-2 sm:col-span-1 space-y-4">
                    <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider flex items-center gap-2">
                      Guardian Info
                    </h4>
                    
                    <div class="space-y-4">
                      <div class="flex items-start gap-3 group">
                        <div class="p-2 rounded-lg bg-secondary-50 text-secondary-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                          <Shield class="w-4 h-4" />
                        </div>
                        <div>
                          <p class="text-xs text-secondary-500 font-medium">
                            Guardian Name
                          </p>
                          <p class="text-sm font-semibold text-secondary-900 mt-0.5">
                            {{ member.guardian }}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3 group">
                        <div class="p-2 rounded-lg bg-secondary-50 text-secondary-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                          <Phone class="w-4 h-4" />
                        </div>
                        <div>
                          <p class="text-xs text-secondary-500 font-medium">
                            Phone
                          </p>
                          <p class="text-sm font-semibold text-secondary-900 mt-0.5 text-primary-600 hover:underline cursor-pointer">
                            +234 812 345 6789
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Documents Section -->
                <div class="mt-8 bg-secondary-50/50 rounded-2xl p-5 border border-secondary-100">
                  <h4 class="text-sm font-bold text-secondary-900 mb-4 flex items-center gap-2">
                    <FileText class="w-4 h-4 text-secondary-500" /> Documents
                  </h4>
                  
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-secondary-200/60 shadow-sm hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group">
                    <div class="flex items-center gap-3">
                      <div class="p-2.5 bg-red-50 rounded-lg border border-red-100 group-hover:bg-red-100 transition-colors">
                        <FileText class="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors">
                          Birth Certificate.pdf
                        </p>
                        <p class="text-xs text-secondary-500 mt-0.5">
                          Uploaded on Jan 10, 2026
                        </p>
                      </div>
                    </div>
                    <button class="px-3 py-1.5 text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
