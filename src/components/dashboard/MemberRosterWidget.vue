<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps({
    members: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['toggle-status'])

const searchQuery = ref('')
const loadingId = ref(null)

const filteredMembers = computed(() => {
    return props.members
            .filter(m => 
                (m.firstName + ' ' + m.lastName).toLowerCase().includes(searchQuery.value.toLowerCase())
            )
            .slice(0, 5) // Limit to 5 for widget
})

const handleToggle = async (id) => {
    // Optimistic UI handled by parent store, but we can show loading state if needed
    // For now, instant flip
    emit('toggle-status', id)
}
</script>

<template>
    <div class="bg-white rounded-2xl border border-secondary-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div class="p-5 border-b border-secondary-100 flex items-center justify-between bg-white">
            <h3 class="font-bold text-secondary-900 text-lg">Roster Overview</h3>
            <div class="relative">
                <Search class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Search..." 
                    class="pl-9 pr-3 py-1.5 text-sm border border-secondary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-shadow w-32 focus:w-48"
                >
            </div>
        </div>
        
        <div class="flex-1 overflow-y-auto">
            <template v-if="filteredMembers.length > 0">
                <div v-for="member in filteredMembers" :key="member.id" class="p-4 hover:bg-secondary-50 transition-colors flex items-center justify-between border-b border-secondary-50 last:border-0">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                            {{ member.firstName[0] }}{{ member.lastName[0] }}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-secondary-900">{{ member.firstName }} {{ member.lastName }}</p>
                            <p class="text-xs text-secondary-500">{{ member.class }}</p>
                        </div>
                    </div>
                    
                    <!-- Toggle Switch -->
                    <button 
                        @click="handleToggle(member.id)"
                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        :class="[member.status === 'Active' ? 'bg-green-500' : 'bg-gray-200']"
                    >
                        <span class="sr-only">Use setting</span>
                        <span 
                            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            :class="[member.status === 'Active' ? 'translate-x-5' : 'translate-x-0']"
                        />
                    </button>
                </div>
            </template>
            <div v-else class="p-8 text-center text-secondary-500 text-sm">
                No members found.
            </div>
        </div>
        
        <div class="p-3 bg-secondary-50 border-t border-secondary-100 text-center">
            <router-link to="/members" class="text-sm font-medium text-primary-600 hover:text-primary-700">View All Members</router-link>
        </div>
    </div>
</template>
