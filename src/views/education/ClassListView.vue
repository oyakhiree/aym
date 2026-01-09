<script setup>
import { useEducationStore } from '@/stores/education'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { Book, Users, Plus } from 'lucide-vue-next'

const eduStore = useEducationStore()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Education / Classes
      </h1>
      <BaseButton size="sm">
        <Plus class="w-4 h-4 mr-2" />
        New Class
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="cls in eduStore.classes"
        :key="cls.id"
        class="cursor-pointer hover:border-primary-300 transition-colors"
      >
        <div class="flex items-start justify-between">
          <div class="p-2 bg-blue-50 rounded-lg">
            <Book class="w-6 h-6 text-blue-600" />
          </div>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
            {{ cls.type }}
          </span>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          {{ cls.title }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          Instructor: {{ cls.instructor }}
        </p>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center text-sm text-gray-500">
            <Users class="w-4 h-4 mr-1.5" />
            {{ cls.students }} Students
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
