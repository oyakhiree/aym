<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div 
    class="rounded-2xl border border-secondary-100/80 bg-white shadow-sm overflow-hidden transition-all duration-200"
    :class="{ 'hover:shadow-md hover:border-secondary-200 cursor-pointer': hoverable }"
  >
    <div
      v-if="title || $slots.header"
      class="border-b border-secondary-100/80 px-5 py-4 sm:px-6 bg-secondary-50/30"
    >
      <slot name="header">
        <h3 class="text-base font-semibold text-secondary-900 tracking-tight">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="noPadding ? '' : 'p-5 sm:p-6'">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="bg-secondary-50/50 px-5 py-4 sm:px-6 border-t border-secondary-100/80"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
