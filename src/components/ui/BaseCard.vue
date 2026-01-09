<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  noPadding: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="rounded-xl border border-secondary-100 bg-white shadow-card overflow-hidden">
    <div
      v-if="title || $slots.header"
      class="border-b border-secondary-100 px-4 py-3 sm:px-6"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-secondary-900">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="noPadding ? '' : 'p-4 sm:p-6'">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="bg-secondary-50 px-4 py-3 sm:px-6 border-t border-secondary-100"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
