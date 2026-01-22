<script setup>
import { ref, computed } from 'vue'
import { useClassStore } from '@/stores/class'
import { useSearchable } from '@/composables/useSearchable'
import { useDisclosure } from '@/composables/useDisclosure'
import { Plus, Search, BookOpen, Award, GraduationCap } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import StatsOverview from '@/components/ui/StatsOverview.vue'
import ClassCard from '@/components/education/ClassCard.vue'
import CreateClassModal from '@/components/education/CreateClassModal.vue'

const store = useClassStore()

// State
const activeTab = ref('Progressive') // Progressive, Honour

// Composables
const { isOpen: isCreateModalOpen, open: openCreateModal, close: closeCreateModal } = useDisclosure()

const { searchQuery, filteredItems: searchedClasses } = useSearchable(
    computed(() => store.activeClasses),
    [ 'name', 'instructor' ]
)

const filteredClasses = computed(() => {
    return searchedClasses.value.filter(c => c.type === activeTab.value)
})
</script>

<template>
  <div class="space-y-6 animate-in fade-in pb-20 md:pb-0">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-secondary-900 tracking-tight">
          Education & Classes
        </h1>
        <p class="text-secondary-500 mt-1">
          Manage progressive classes and honour programs
        </p>
      </div>
      <BaseButton 
        class="w-full sm:w-auto shadow-lg shadow-primary-500/20"
        @click="openCreateModal"
      >
        <Plus class="w-5 h-5 mr-2" />
        Start New Class
      </BaseButton>
    </div>

    <!-- Stats Overview (Snap Scroll) -->
    <StatsOverview 
        :stats="[
            { label: 'Active Classes', value: store.stats.activeCount, icon: BookOpen, color: 'blue' },
            { label: 'Enrolled Students', value: store.stats.totalStudents, icon: GraduationCap, color: 'purple' }
        ]"
    />

    <!-- Tabs & Search -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-1 rounded-2xl border border-secondary-100 sm:p-2 sticky top-20 z-20 shadow-sm">
      <div class="flex p-1 bg-secondary-50/50 rounded-xl w-full sm:w-auto">
        <button 
          v-for="tab in ['Progressive', 'Honour']" 
          :key="tab"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200"
          :class="activeTab === tab ? 'bg-white text-primary-600 shadow-sm ring-1 ring-black/5' : 'text-secondary-500 hover:text-secondary-700'"
          @click="activeTab = tab"
        >
          <BookOpen
            v-if="tab === 'Progressive'"
            class="w-4 h-4"
          />
          <Award
            v-else
            class="w-4 h-4"
          />
          {{ tab }}
        </button>
      </div>

      <div class="relative w-full sm:w-72 group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-500">
          <Search class="h-4 w-4 text-secondary-400 group-focus-within:text-primary-500" />
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search classes..." 
          class="block w-full rounded-xl border-secondary-200 pl-10 sm:text-sm py-2.5 focus:border-primary-500 focus:ring-primary-500/20 transition-all bg-secondary-50/30 focus:bg-white header-search"
        >
      </div>
    </div>

    <!-- Grid -->
    <div
      v-if="filteredClasses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 align-top"
    >
      <ClassCard 
        v-for="cls in filteredClasses" 
        :key="cls.id" 
        :class-data="cls" 
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-16 bg-white rounded-3xl border border-secondary-100 border-dashed"
    >
      <div class="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen class="w-8 h-8 text-secondary-300" />
      </div>
      <h3 class="text-lg font-bold text-secondary-900">
        No classes found
      </h3>
      <p class="text-secondary-500 text-sm max-w-xs mx-auto mt-2">
        {{ searchQuery ? `No results for "${searchQuery}" in ${activeTab}` : `You haven't started any ${activeTab} classes yet.` }}
      </p>
      <BaseButton
        v-if="!searchQuery"
        class="mt-6"
        @click="openCreateModal"
      >
        Start New Class
      </BaseButton>
    </div>

    <CreateClassModal
      :is-open="isCreateModalOpen"
      @close="closeCreateModal"
    />
  </div>
</template>
