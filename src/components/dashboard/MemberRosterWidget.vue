<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronRight, MoreHorizontal } from 'lucide-vue-next'

const props = defineProps({
    members: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['toggle-status'])

const searchQuery = ref('')

const filteredMembers = computed(() => {
    return props.members
            .filter(m => 
                (m.firstName + ' ' + m.lastName).toLowerCase().includes(searchQuery.value.toLowerCase())
            )
            .slice(0, 5)
})

const handleToggle = (id) => {
    emit('toggle-status', id)
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-secondary-100/60 shadow-sm shadow-secondary-200/40 flex flex-col h-full overflow-hidden">
    <!-- Header -->
    <div class="p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 class="font-semibold text-secondary-900 text-base tracking-tight">
          Recent Members
        </h3>
        <p class="text-xs text-secondary-500 font-medium mt-1">
          Active roster overview
        </p>
      </div>
      <div class="relative group">
        <Search class="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Find member..." 
          class="pl-9 pr-3 py-2 text-xs font-medium bg-secondary-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all w-full sm:w-40 placeholder-secondary-400 text-secondary-900"
        >
      </div>
    </div>
        
    <!-- Member List -->
    <div class="flex-1 overflow-y-auto">
      <div class="px-3 pb-2 space-y-1">
        <template v-if="filteredMembers.length > 0">
          <div 
            v-for="member in filteredMembers" 
            :key="member.id" 
            class="p-3 hover:bg-secondary-50/80 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer border border-transparent hover:border-secondary-100/50"
          >
            <div class="flex items-center space-x-3.5 min-w-0">
              <div class="relative">
                <div class="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-bold text-xs ring-2 ring-white shadow-sm">
                  {{ member.firstName[0] }}{{ member.lastName[0] }}
                </div>
                <div 
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  :class="member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-400'"
                />
              </div>
               
              <div class="min-w-0">
                <p class="text-sm font-semibold text-secondary-900 truncate group-hover:text-primary-700 transition-colors">
                  {{ member.firstName }} {{ member.lastName }}
                </p>
                <p class="text-[11px] font-medium text-secondary-500 uppercase tracking-wide">
                  {{ member.class }}
                </p>
              </div>
            </div>
                        
            <!-- Actions -->
            <button class="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-200/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
              <MoreHorizontal class="w-4 h-4" />
            </button>
          </div>
        </template>
        <div
          v-else
          class="h-40 flex flex-col items-center justify-center text-center"
        >
          <div class="w-10 h-10 bg-secondary-50 rounded-full flex items-center justify-center mb-3">
            <Search class="w-4 h-4 text-secondary-400" />
          </div>
          <p class="text-secondary-500 text-xs font-medium">
            No members found.
          </p>
        </div>
      </div>
    </div>
        
    <!-- Footer -->
    <div class="p-3 bg-secondary-50/30 border-t border-secondary-100/50">
      <router-link 
        to="/members" 
        class="flex items-center justify-center w-full py-2 text-xs font-bold text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-xl transition-all group uppercase tracking-wide"
      >
        View All Members
        <ChevronRight class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
      </router-link>
    </div>
  </div>
</template>
