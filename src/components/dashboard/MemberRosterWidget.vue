<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronRight } from 'lucide-vue-next'

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
    <div class="bg-white rounded-2xl border border-secondary-100/80 shadow-sm overflow-hidden flex flex-col h-full">
        <!-- Header -->
        <div class="p-5 border-b border-secondary-100/80 flex items-center justify-between bg-white">
            <div>
                <h3 class="font-bold text-secondary-900 text-lg tracking-tight">Roster Overview</h3>
                <p class="text-xs text-secondary-500 mt-0.5">Quick member status controls</p>
            </div>
            <div class="relative">
                <Search class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Search..." 
                    class="pl-9 pr-3 py-2 text-sm border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-36 focus:w-48"
                >
            </div>
        </div>
        
        <!-- Member List -->
        <div class="flex-1 overflow-y-auto divide-y divide-secondary-50">
            <template v-if="filteredMembers.length > 0">
                <div 
                    v-for="member in filteredMembers" 
                    :key="member.id" 
                    class="p-4 hover:bg-secondary-50/50 transition-colors flex items-center justify-between group"
                >
                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {{ member.firstName[0] }}{{ member.lastName[0] }}
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-secondary-900 truncate">{{ member.firstName }} {{ member.lastName }}</p>
                            <p class="text-xs text-secondary-500">{{ member.class }}</p>
                        </div>
                    </div>
                    
                    <!-- Toggle Switch -->
                    <button 
                        @click="handleToggle(member.id)"
                        :aria-pressed="member.status === 'Active'"
                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        :class="[member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-200']"
                    >
                        <span class="sr-only">Toggle member status</span>
                        <span 
                            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                            :class="[member.status === 'Active' ? 'translate-x-5' : 'translate-x-0']"
                        />
                    </button>
                </div>
            </template>
            <div v-else class="p-10 text-center">
                <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search class="w-5 h-5 text-secondary-400" />
                </div>
                <p class="text-secondary-500 text-sm">No members found.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="p-4 bg-secondary-50/50 border-t border-secondary-100/80">
            <router-link 
                to="/members" 
                class="flex items-center justify-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
            >
                View All Members
                <ChevronRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </router-link>
        </div>
    </div>
</template>
