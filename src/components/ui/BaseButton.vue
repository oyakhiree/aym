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
  },
  loading: {
    type: Boolean,
    default: false,
  }
})

const baseClasses = `
  inline-flex items-center justify-center 
  rounded-xl font-semibold tracking-tight
  transition-all duration-200 ease-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  active:scale-[0.98] select-none
`

const sizeClasses = {
  sm: 'px-3.5 py-2 text-sm min-h-[36px] gap-1.5',
  md: 'px-5 py-2.5 text-sm min-h-[44px] gap-2', // Mobile friendly target
  lg: 'px-6 py-3.5 text-base min-h-[52px] gap-2.5',
}

const variantClasses = {
  primary: `
    bg-gradient-to-b from-primary-500 to-primary-600 
    text-white 
    hover:from-primary-600 hover:to-primary-700 
    focus-visible:ring-primary-500 
    shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30
  `,
  secondary: `
    bg-white text-secondary-700 
    border border-secondary-200 
    hover:bg-secondary-50 hover:border-secondary-300 
    focus-visible:ring-secondary-400 
    shadow-sm
  `,
  outline: `
    bg-transparent 
    border-2 border-primary-500 text-primary-600 
    hover:bg-primary-50 
    focus-visible:ring-primary-500
  `,
  ghost: `
    bg-transparent text-secondary-600 
    hover:bg-secondary-100 hover:text-secondary-800 
    focus-visible:ring-secondary-400
  `,
  danger: `
    bg-gradient-to-b from-red-500 to-red-600 
    text-white 
    hover:from-red-600 hover:to-red-700 
    focus-visible:ring-red-500 
    shadow-md shadow-red-500/20
  `,
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
    :disabled="disabled || loading"
  >
    <!-- Loading Spinner -->
    <svg 
      v-if="loading" 
      class="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <slot />
  </button>
</template>
