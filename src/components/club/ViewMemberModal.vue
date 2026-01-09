<script setup>
import { computed } from 'vue'
import { X, Calendar, User, Users, Phone, Shield, FileText, Edit2 } from 'lucide-vue-next'
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
      <div v-if="isOpen && member" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div v-if="isOpen" class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-secondary-100">
                
              <!-- Header with Cover/Avatar -->
              <div class="relative bg-gradient-to-br from-primary-600 to-indigo-700 h-32">
                 <button @click="$emit('close')" class="absolute top-4 right-4 rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all z-10">
                    <X class="w-5 h-5" />
                 </button>
                 
                 <div class="absolute -bottom-10 left-6">
                    <div class="h-20 w-20 rounded-2xl bg-white p-1 shadow-lg">
                        <div class="h-full w-full rounded-xl bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center text-primary-700 font-bold text-2xl">
                            {{ member.firstName[0] }}{{ member.lastName[0] }}
                        </div>
                    </div>
                 </div>
              </div>

              <!-- Action Bar -->
              <div class="flex justify-end pt-4 px-6 gap-2">
                 <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Edit2 class="w-4 h-4" />
                    Edit Profile
                 </button>
              </div>

              <!-- Body -->
              <div class="px-6 pb-8 pt-2 space-y-6">
                
                <div>
                   <h2 class="text-2xl font-bold text-secondary-900">{{ member.firstName }} {{ member.lastName }}</h2>
                   <div class="flex items-center gap-2 mt-1">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                        {{ member.class }}
                      </span>
                      <span class="text-sm text-secondary-500 flex items-center gap-1.5">
                         <span class="w-1.5 h-1.5 rounded-full" :class="member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-300'"></span>
                         {{ member.status }}
                      </span>
                   </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <!-- Personal -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-semibold text-secondary-400 uppercase tracking-wider border-b border-secondary-100 pb-2">Full Details</h4>
                        
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <User class="w-4 h-4 text-secondary-400 mt-0.5" />
                                <div>
                                    <p class="text-xs text-secondary-500">Gender</p>
                                    <p class="text-sm font-medium text-secondary-900">{{ member.gender }}</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <Calendar class="w-4 h-4 text-secondary-400 mt-0.5" />
                                <div>
                                    <p class="text-xs text-secondary-500">Date of Birth</p>
                                    <p class="text-sm font-medium text-secondary-900">{{ member.dob }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Guardian -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-semibold text-secondary-400 uppercase tracking-wider border-b border-secondary-100 pb-2">Guardian</h4>
                         <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <Shield class="w-4 h-4 text-secondary-400 mt-0.5" />
                                <div>
                                    <p class="text-xs text-secondary-500">Guardian Name</p>
                                    <p class="text-sm font-medium text-secondary-900">{{ member.guardian }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Documents -->
                <div class="bg-secondary-50 rounded-xl p-4 border border-secondary-100">
                    <h4 class="text-sm font-semibold text-secondary-900 mb-3 flex items-center gap-2">
                        <FileText class="w-4 h-4 text-secondary-500" /> Documents
                    </h4>
                    <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-secondary-200 shadow-sm">
                        <div class="flex items-center gap-3">
                             <div class="p-2 bg-red-50 rounded-lg">
                                <FileText class="w-5 h-5 text-red-500" />
                             </div>
                             <div>
                                <p class="text-sm font-medium text-secondary-900">Birth Certificate.pdf</p>
                                <p class="text-xs text-secondary-500">Uploaded on Jan 10, 2026</p>
                             </div>
                        </div>
                        <button class="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline">View</button>
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
