<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  trend: Number,
  color: {
    type: String,
    default: 'primary'
  },
  chartSeries: Array,
  chartOptions: Object,
  type: {
      type: String,
      default: 'area'
  }
})

const trendColor = computed(() => {
    if (!props.trend) return 'text-secondary-500'
    return props.trend > 0 ? 'text-emerald-600' : 'text-red-500'
})

const trendBg = computed(() => {
    if (!props.trend) return 'bg-secondary-100'
    return props.trend > 0 ? 'bg-emerald-50' : 'bg-red-50'
})

const trendIcon = computed(() => {
    return props.trend > 0 ? '↑' : '↓'
})

const colorClasses = {
    primary: 'from-primary-500/10 to-primary-600/5',
    indigo: 'from-indigo-500/10 to-indigo-600/5',
    emerald: 'from-emerald-500/10 to-emerald-600/5',
    purple: 'from-purple-500/10 to-purple-600/5',
    amber: 'from-amber-500/10 to-amber-600/5',
}
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-secondary-100/80 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
    <!-- Subtle Gradient Decorator -->
    <div 
      class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br rounded-full opacity-50 blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125"
      :class="colorClasses[color] || colorClasses.primary"
    />

    <div class="relative z-10 flex justify-between items-start">
      <div class="flex-1">
        <h3 class="text-sm font-medium text-secondary-500 mb-2">
          {{ title }}
        </h3>
        <div class="flex items-baseline gap-2 flex-wrap">
          <span class="text-3xl font-bold text-secondary-900 tracking-tight">{{ value }}</span>
          <span 
            v-if="trend" 
            class="text-xs font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5" 
            :class="[trendColor, trendBg]"
          >
            {{ trendIcon }} {{ Math.abs(trend) }}%
          </span>
        </div>
        <p
          v-if="subtitle"
          class="text-xs text-secondary-400 mt-2"
        >
          {{ subtitle }}
        </p>
      </div>
        
      <!-- Optional Chart -->
      <div
        v-if="chartSeries"
        class="w-24 h-16 -mr-2 -mt-2 flex-shrink-0"
      >
        <apexchart
          :type="type"
          :options="chartOptions"
          :series="chartSeries"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  </div>
</template>
