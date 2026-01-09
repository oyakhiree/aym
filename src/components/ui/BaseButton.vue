<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, ghost, danger
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-base min-h-[44px]', // Mobile friendly target
  lg: 'px-6 py-3 text-lg min-h-[52px]',
}

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  secondary: 'bg-white text-secondary-700 border border-secondary-200 hover:bg-secondary-50 focus:ring-secondary-400',
  outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  ghost: 'bg-transparent text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus:ring-secondary-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const classes = computed(() => {
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.block ? 'w-full' : '',
  ].join(' ')
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
