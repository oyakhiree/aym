<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  trend: Number, // Percentage change
  color: {
    type: String,
    default: 'primary' // primary, success, warning, etc.
  },
  chartSeries: Array,
  chartOptions: Object,
  type: {
      type: String,
      default: 'area' // area, bar, radialBar, etc.
  }
})

const trendColor = computed(() => {
    if (!props.trend) return 'text-gray-500'
    return props.trend > 0 ? 'text-green-600' : 'text-red-600'
})

const trendIcon = computed(() => {
    return props.trend > 0 ? '↑' : '↓'
})
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-secondary-100 hover:shadow-md transition-shadow relative overflow-hidden group">
    <!-- Decorator -->
    <div 
        class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"
        :class="`from-${color}-500 to-${color}-600`"
    ></div>

    <div class="relative z-10 flex justify-between items-start">
        <div>
            <h3 class="text-sm font-medium text-secondary-500 mb-1">{{ title }}</h3>
            <div class="flex items-baseline space-x-2">
                <span class="text-3xl font-bold text-secondary-900 tracking-tight">{{ value }}</span>
                <span v-if="trend" class="text-xs font-semibold px-2 py-0.5 rounded-full bg-opacity-10" :class="[trendColor, `bg-${trend > 0 ? 'green' : 'red'}-100`]">
                    {{ trendIcon }} {{ Math.abs(trend) }}%
                </span>
            </div>
            <p v-if="subtitle" class="text-xs text-secondary-400 mt-2">{{ subtitle }}</p>
        </div>
        
        <!-- Optional Icon or Chart -->
        <div v-if="chartSeries" class="w-24 h-16 -mr-2 -mt-2">
             <apexchart :type="type" :options="chartOptions" :series="chartSeries" height="100%" width="100%"></apexchart>
        </div>
    </div>
  </div>
</template>
