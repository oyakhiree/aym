<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClubStore } from '@/stores/club'
import { Plus, Search, Filter, Users, ChevronRight, Edit2, Trash2, UserX } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const clubStore = useClubStore()
const searchQuery = ref('')
const statusFilter = ref('all') // all, active, inactive

const filteredMembers = computed(() => {
    return clubStore.members.filter(member => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()
        const matchesSearch = fullName.includes(searchQuery.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || 
            (statusFilter.value === 'active' && member.status === 'Active') ||
            (statusFilter.value === 'inactive' && member.status === 'Inactive')
        return matchesSearch && matchesStatus
    })
})

const stats = computed(() => ({
    total: clubStore.members.length,
    active: clubStore.activeMembersCount,
    inactive: clubStore.inactiveMembersCount
}))

const handleToggleStatus = (id) => {
    clubStore.toggleStatus(id)
}

const goToMember = (id) => {
    // In a real app, you'd navigate to detail view
    // router.push(`/members/${id}`)
    console.log('Navigate to member:', id)
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in pb-20 md:pb-0">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-secondary-900 tracking-tight">
          Club Members
        </h1>
        <p class="text-secondary-500 mt-1">
          Manage your {{ stats.total }} registered members
        </p>
      </div>
      <BaseButton class="w-full sm:w-auto shadow-lg shadow-primary-500/20">
        <Plus class="w-5 h-5 mr-2" />
        Add Member
      </BaseButton>
    </div>

    <!-- Stats Bar -->
    <div class="grid grid-cols-3 gap-3 sm:gap-4">
        <!-- Total -->
        <button 
            @click="statusFilter = 'all'"
            class="p-4 rounded-2xl border transition-all duration-200 text-left group relative overflow-hidden"
            :class="statusFilter === 'all' ? 'bg-white border-primary-200 shadow-md ring-1 ring-primary-100' : 'bg-white border-secondary-100 hover:border-secondary-200 hover:shadow-sm'"
        >
            <!-- Active Indicator -->
            <div v-if="statusFilter === 'all'" class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

            <div class="flex items-center justify-between relative z-10">
                <div class="p-2.5 rounded-xl transition-colors duration-200" :class="statusFilter === 'all' ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-secondary-100'">
                    <Users class="w-5 h-5" />
                </div>
                <span v-if="statusFilter === 'all'" class="w-2 h-2 rounded-full bg-primary-500"></span>
            </div>
            <div class="mt-3 relative z-10">
                <p class="text-2xl font-bold text-secondary-900 tracking-tight">{{ stats.total }}</p>
                <p class="text-xs font-medium text-secondary-500 mt-0.5">Total Members</p>
            </div>
        </button>
        
        <!-- Active -->
        <button 
            @click="statusFilter = 'active'"
            class="p-4 rounded-2xl border transition-all duration-200 text-left group relative overflow-hidden"
            :class="statusFilter === 'active' ? 'bg-white border-emerald-200 shadow-md ring-1 ring-emerald-100' : 'bg-white border-secondary-100 hover:border-secondary-200 hover:shadow-sm'"
        >
             <div v-if="statusFilter === 'active'" class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

            <div class="flex items-center justify-between relative z-10">
                <div class="p-2.5 rounded-xl transition-colors duration-200" :class="statusFilter === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'">
                    <Users class="w-5 h-5" />
                </div>
                <span v-if="statusFilter === 'active'" class="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div class="mt-3 relative z-10">
                <p class="text-2xl font-bold text-secondary-900 tracking-tight">{{ stats.active }}</p>
                <p class="text-xs font-medium text-secondary-500 mt-0.5">Active</p>
            </div>
        </button>
        
        <!-- Inactive -->
        <button 
            @click="statusFilter = 'inactive'"
            class="p-4 rounded-2xl border transition-all duration-200 text-left group relative overflow-hidden"
            :class="statusFilter === 'inactive' ? 'bg-white border-amber-200 shadow-md ring-1 ring-amber-100' : 'bg-white border-secondary-100 hover:border-secondary-200 hover:shadow-sm'"
        >
            <div v-if="statusFilter === 'inactive'" class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

            <div class="flex items-center justify-between relative z-10">
                <div class="p-2.5 rounded-xl transition-colors duration-200" :class="statusFilter === 'inactive' ? 'bg-amber-50 text-amber-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-amber-50 group-hover:text-amber-600'">
                    <UserX class="w-5 h-5" />
                </div>
                <span v-if="statusFilter === 'inactive'" class="w-2 h-2 rounded-full bg-amber-500"></span>
            </div>
            <div class="mt-3 relative z-10">
                <p class="text-2xl font-bold text-secondary-900 tracking-tight">{{ stats.inactive }}</p>
                <p class="text-xs font-medium text-secondary-500 mt-0.5">Inactive</p>
            </div>
        </button>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1 group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-500">
          <Search class="h-5 w-5 text-secondary-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name, ID, or class..." 
          class="block w-full pl-11 pr-4 py-3 border border-secondary-200 rounded-xl bg-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm shadow-sm"
        >
      </div>
      <button class="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-secondary-200 rounded-xl text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300 transition-all text-sm font-semibold shadow-sm sm:w-auto active:scale-95">
        <Filter class="w-4 h-4" />
        <span class="hidden sm:inline">Filters</span>
      </button>
    </div>

    <!-- Empty State -->
    <div 
        v-if="filteredMembers.length === 0" 
        class="bg-white rounded-3xl border border-secondary-100 p-12 text-center shadow-sm"
    >
        <div class="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-secondary-50/50">
            <Users class="w-8 h-8 text-secondary-400" />
        </div>
        <h3 class="text-lg font-bold text-secondary-900 mb-2">No members found</h3>
        <p class="text-secondary-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            {{ searchQuery ? `We couldn't find any members matching "${searchQuery}". Try adjusting your search or filters.` : 'Get started by adding your first club member.' }}
        </p>
        <BaseButton v-if="!searchQuery" variant="primary">
            <Plus class="w-5 h-5 mr-2" />
            Add First Member
        </BaseButton>
    </div>

    <!-- Mobile: Card View -->
    <div v-if="filteredMembers.length > 0" class="space-y-3 lg:hidden">
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        @click="goToMember(member.id)"
        class="bg-white rounded-2xl border border-secondary-100 p-4 flex items-center gap-4 hover:shadow-lg hover:border-primary-100 transition-all duration-300 cursor-pointer active:scale-[0.98] group relative"
      >
        <!-- Card highlight on hover -->
        <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>

        <div class="flex-shrink-0">
          <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm shadow-inner ring-2 ring-white">
            {{ member.firstName[0] }}{{ member.lastName[0] }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-secondary-900 truncate group-hover:text-primary-700 transition-colors">
            {{ member.firstName }} {{ member.lastName }}
          </p>
          <div class="flex items-center gap-2 mt-1">
             <span class="text-xs font-medium px-2 py-0.5 rounded-md bg-secondary-100 text-secondary-600">
                {{ member.class }}
             </span>
             <span class="text-xs text-secondary-400">• {{ member.gender }}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
            <!-- Status Toggle -->
            <button 
                @click.stop="handleToggleStatus(member.id)"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="[member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-200']"
            >
                <span 
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                    :class="[member.status === 'Active' ? 'translate-x-5' : 'translate-x-0']"
                />
            </button>
            <ChevronRight class="w-5 h-5 text-secondary-300 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>
    </div>

    <!-- Desktop: Premium Table View -->
    <div v-if="filteredMembers.length > 0" class="hidden lg:block bg-white rounded-3xl border border-secondary-100 overflow-hidden shadow-sm ring-1 ring-black/5">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-secondary-100 bg-secondary-50/50">
            <th scope="col" class="px-8 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">
              Member
            </th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">
              Class
            </th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">
              Guardian
            </th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="relative px-6 py-5">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-secondary-50">
          <tr
            v-for="member in filteredMembers"
            :key="member.id"
            class="hover:bg-primary-50/30 transition-colors duration-150 group"
          >
            <!-- Name & Avatar -->
            <td class="px-8 py-5 whitespace-nowrap">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm shadow-sm ring-2 ring-white">
                    {{ member.firstName[0] }}{{ member.lastName[0] }}
                  </div>
                </div>
                <div>
                  <div class="text-sm font-bold text-secondary-900 group-hover:text-primary-700 transition-colors">
                    {{ member.firstName }} {{ member.lastName }}
                  </div>
                  <div class="text-xs text-secondary-500 mt-0.5">
                    {{ member.gender }} • <span class="font-mono text-secondary-400">#{{ member.id }}</span>
                  </div>
                </div>
              </div>
            </td>
            
            <!-- Class Badge -->
            <td class="px-6 py-5 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                {{ member.class }}
              </span>
            </td>
            
            <!-- Guardian -->
            <td class="px-6 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-secondary-600">{{ member.guardian }}</div>
            </td>
            
            <!-- Status Toggle -->
            <td class="px-6 py-5 whitespace-nowrap">
              <button 
                @click="handleToggleStatus(member.id)"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="[member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-200']"
              >
                <span 
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                    :class="[member.status === 'Active' ? 'translate-x-5' : 'translate-x-0']"
                />
              </button>
            </td>
            
            <!-- Actions -->
            <td class="px-6 py-5 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                <button 
                    @click="goToMember(member.id)"
                    class="p-2 text-secondary-400 hover:text-primary-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-secondary-100"
                    title="Edit Details"
                >
                  <Edit2 class="w-4 h-4" />
                </button>
                <button 
                    class="p-2 text-secondary-400 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-secondary-100"
                    title="Delete Member"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Results Count -->
    <div v-if="filteredMembers.length > 0" class="text-center text-xs font-medium text-secondary-400 py-4 uppercase tracking-wider">
        Showing {{ filteredMembers.length }} of {{ stats.total }} members
    </div>
  </div>
</template>
