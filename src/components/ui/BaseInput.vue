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
    default: ' ',
  },
  error: {
    type: String,
    default: '',
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        class="peer block w-full rounded-lg border border-secondary-300 bg-white px-4 py-3 text-secondary-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-secondary-50 disabled:text-secondary-500 min-h-[48px]"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': error }"
        placeholder=" "
        @input="$emit('update:modelValue', $event.target.value)" 
      >
      <label
        :for="id"
        class="absolute left-4 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-secondary-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600"
        :class="{ 'text-red-500 peer-focus:text-red-500': error }"
      >
        {{ label }}
      </label>
    </div>
    <p
      v-if="error"
      class="mt-1 text-sm text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>
