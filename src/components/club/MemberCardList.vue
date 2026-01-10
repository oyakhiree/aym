<script setup>
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps({
    members: Array
})

const emit = defineEmits(['view', 'toggleStatus'])
</script>

<template>
    <div class="space-y-3">
        <div
            v-for="member in members"
            :key="member.id"
            @click="$emit('view', member.id)"
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
                    @click.stop="$emit('toggleStatus', member.id)"
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
</template>
