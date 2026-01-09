<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative w-full group">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-secondary-600 mb-1.5 transition-colors group-focus-within:text-primary-600"
      :class="{ 'text-red-500': error }"
    >
      {{ label }}
    </label>
    
    <!-- Input Container -->
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        class="
          block w-full rounded-xl border bg-white 
          px-4 py-3 text-secondary-900 
          placeholder:text-secondary-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed
          min-h-[48px]
        "
        :class="[
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-secondary-200 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300'
        ]"
        @input="$emit('update:modelValue', $event.target.value)" 
      >
    </div>
    
    <!-- Hint or Error Text -->
    <p
      v-if="error"
      class="mt-1.5 text-sm text-red-500 flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1.5 text-sm text-secondary-500"
    >
      {{ hint }}
    </p>
  </div>
</template>
