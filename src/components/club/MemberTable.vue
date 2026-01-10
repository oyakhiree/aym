<script setup>
import { Edit2, Trash2 } from 'lucide-vue-next'

const props = defineProps({
    members: Array
})

const emit = defineEmits(['view', 'toggleStatus', 'delete'])
</script>

<template>
  <div class="bg-white rounded-3xl border border-secondary-100 overflow-hidden shadow-sm ring-1 ring-black/5">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-secondary-100 bg-secondary-50/50">
          <th
            scope="col"
            class="px-8 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider"
          >
            Member
          </th>
          <th
            scope="col"
            class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider"
          >
            Class
          </th>
          <th
            scope="col"
            class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider"
          >
            Guardian
          </th>
          <th
            scope="col"
            class="px-6 py-5 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            class="relative px-6 py-5"
          >
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-secondary-50">
        <tr
          v-for="member in members"
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
            <div class="text-sm font-medium text-secondary-600">
              {{ member.guardian }}
            </div>
          </td>
                    
          <!-- Status Toggle -->
          <td class="px-6 py-5 whitespace-nowrap">
            <button 
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              :class="[member.status === 'Active' ? 'bg-emerald-500' : 'bg-secondary-200']"
              @click="$emit('toggleStatus', member.id)"
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
                class="p-2 text-secondary-400 hover:text-primary-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-secondary-100"
                title="Edit Details"
                @click="$emit('view', member.id)"
              >
                <Edit2 class="w-4 h-4" />
              </button>
              <button 
                class="p-2 text-secondary-400 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-secondary-100"
                title="Delete Member"
                @click="$emit('delete', member.id)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
