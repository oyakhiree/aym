<script setup>
import { computed, ref } from 'vue'
import { useClubStore } from '@/stores/club'
import { useSearchable } from '@/composables/useSearchable'
import { useDisclosure } from '@/composables/useDisclosure'
import { Plus, Search, Filter, Users, UserX } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import AddMemberModal from '@/components/club/AddMemberModal.vue'
import ViewMemberModal from '@/components/club/ViewMemberModal.vue'
import MemberCardList from '@/components/club/MemberCardList.vue'
import MemberTable from '@/components/club/MemberTable.vue'

const clubStore = useClubStore()

// State
const statusFilter = ref('all') // all, active, inactive
const selectedMember = ref(null)

// Composables
const { isOpen: isAddModalOpen, open: openAddModal, close: closeAddModal } = useDisclosure()
const { isOpen: isViewModalOpen, open: openViewModal, close: closeViewModal } = useDisclosure()

const { searchQuery, filteredItems: searchedMembers } = useSearchable(
    computed(() => clubStore.members), 
    [ 'firstName', 'lastName', (item) => `${item.firstName} ${item.lastName}` ]
)

const filteredMembers = computed(() => {
    return searchedMembers.value.filter(member => {
        const matchesStatus = statusFilter.value === 'all' || 
            (statusFilter.value === 'active' && member.status === 'Active') ||
            (statusFilter.value === 'inactive' && member.status === 'Inactive')
        return matchesStatus
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
    const member = clubStore.members.find(m => m.id === id)
    if (member) {
        selectedMember.value = member
        openViewModal()
    }
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in pb-20 md:pb-0">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-secondary-900 tracking-tight">
          Club Members
        </h1>
        <p class="text-secondary-500 mt-1">
          Manage your {{ stats.total }} registered members
        </p>
      </div>
      <BaseButton 
        class="w-full sm:w-auto shadow-lg shadow-primary-500/20"
        @click="openAddModal"
      >
        <Plus class="w-5 h-5 mr-2" />
        Add Member
      </BaseButton>
    </div>

    <!-- Stats Bar (Horizontal Scroll on Mobile) -->
    <div class="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto py-2 md:p-1 -mx-4 px-4 md:mx-0 snap-x snap-mandatory scrollbar-hide">
      <!-- Total -->
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <button 
          class="w-full p-5 rounded-2xl bg-white border border-secondary-100 shadow-sm hover:shadow-md hover:border-secondary-200 transition-all duration-300 text-left group relative overflow-hidden h-full"
          :class="{ 'ring-2 ring-primary-500/20 border-primary-200': statusFilter === 'all' }"
          @click="statusFilter = 'all'"
        >
          <div class="flex items-center justify-between mb-4 relative z-10">
            <div
              class="p-2 rounded-xl transition-colors duration-200"
              :class="statusFilter === 'all' ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-primary-50 group-hover:text-primary-600'"
            >
              <Users class="w-5 h-5" />
            </div>
            <span
              v-if="statusFilter === 'all'"
              class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"
            />
          </div>
          <div class="relative z-10">
            <p class="text-3xl font-semibold text-secondary-900 tracking-tight">
              {{ stats.total }}
            </p>
            <p class="text-xs font-medium text-secondary-500 mt-1 uppercase tracking-wide">
              Total Members
            </p>
          </div>
        </button>
      </div>
            
      <!-- Active -->
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <button 
          class="w-full p-5 rounded-2xl bg-white border border-secondary-100 shadow-sm hover:shadow-md hover:border-secondary-200 transition-all duration-300 text-left group relative overflow-hidden h-full"
          :class="{ 'ring-2 ring-emerald-500/20 border-emerald-200': statusFilter === 'active' }"
          @click="statusFilter = 'active'"
        >
          <div class="flex items-center justify-between mb-4 relative z-10">
            <div
              class="p-2 rounded-xl transition-colors duration-200"
              :class="statusFilter === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'"
            >
              <Users class="w-5 h-5" />
            </div>
            <span
              v-if="statusFilter === 'active'"
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            />
          </div>
          <div class="relative z-10">
            <p class="text-3xl font-semibold text-secondary-900 tracking-tight">
              {{ stats.active }}
            </p>
            <p class="text-xs font-medium text-secondary-500 mt-1 uppercase tracking-wide">
              Active Members
            </p>
          </div>
        </button>
      </div>
            
      <!-- Inactive -->
      <div class="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center">
        <button 
          class="w-full p-5 rounded-2xl bg-white border border-secondary-100 shadow-sm hover:shadow-md hover:border-secondary-200 transition-all duration-300 text-left group relative overflow-hidden h-full"
          :class="{ 'ring-2 ring-amber-500/20 border-amber-200': statusFilter === 'inactive' }"
          @click="statusFilter = 'inactive'"
        >
          <div class="flex items-center justify-between mb-4 relative z-10">
            <div
              class="p-2 rounded-xl transition-colors duration-200"
              :class="statusFilter === 'inactive' ? 'bg-amber-50 text-amber-600' : 'bg-secondary-50 text-secondary-500 group-hover:bg-amber-50 group-hover:text-amber-600'"
            >
              <UserX class="w-5 h-5" />
            </div>
            <span
              v-if="statusFilter === 'inactive'"
              class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
            />
          </div>
          <div class="relative z-10">
            <p class="text-3xl font-semibold text-secondary-900 tracking-tight">
              {{ stats.inactive }}
            </p>
            <p class="text-xs font-medium text-secondary-500 mt-1 uppercase tracking-wide">
              Inactive Members
            </p>
          </div>
        </button>
      </div>
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
      <h3 class="text-lg font-bold text-secondary-900 mb-2">
        No members found
      </h3>
      <p class="text-secondary-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
        {{ searchQuery ? `We couldn't find any members matching "${searchQuery}". Try adjusting your search or filters.` : 'Get started by adding your first club member.' }}
      </p>
      <BaseButton
        v-if="!searchQuery"
        variant="primary"
        @click="openAddModal"
      >
        <Plus class="w-5 h-5 mr-2" />
        Add First Member
      </BaseButton>
    </div>

    <!-- Mobile: Card View (Using Child Component) -->
    <MemberCardList 
      v-if="filteredMembers.length > 0"
      :members="filteredMembers"
      class="lg:hidden"
      @view="goToMember"
      @toggle-status="handleToggleStatus"
    />

    <!-- Desktop: Table View (Using Child Component) -->
    <MemberTable 
      v-if="filteredMembers.length > 0"
      :members="filteredMembers"
      class="hidden lg:block"
      @view="goToMember"
      @toggle-status="handleToggleStatus"
    />
        
    <!-- Results Count -->
    <div
      v-if="filteredMembers.length > 0"
      class="text-center text-xs font-medium text-secondary-400 py-4 uppercase tracking-wider"
    >
      Showing {{ filteredMembers.length }} of {{ stats.total }} members
    </div>

    <AddMemberModal
      :is-open="isAddModalOpen"
      @close="closeAddModal"
    />
    <ViewMemberModal
      :is-open="isViewModalOpen"
      :member="selectedMember"
      @close="closeViewModal"
    />
  </div>
</template>
