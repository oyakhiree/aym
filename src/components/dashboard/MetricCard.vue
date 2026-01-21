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
    if (!props.trend) return 'text-secondary-400'
    return props.trend > 0 ? 'text-emerald-600' : 'text-red-500'
})

const trendBg = computed(() => {
    if (!props.trend) return 'bg-secondary-100'
    return props.trend > 0 ? 'bg-emerald-50/50' : 'bg-red-50/50'
})

const trendIcon = computed(() => {
    return props.trend > 0 ? '↑' : '↓'
})

const colorClasses = {
    primary: 'from-primary-500/5 to-primary-600/0',
    indigo: 'from-indigo-500/5 to-indigo-600/0',
    emerald: 'from-emerald-500/5 to-emerald-600/0',
    purple: 'from-purple-500/5 to-purple-600/0',
    amber: 'from-amber-500/5 to-amber-600/0',
}
</script>

<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm shadow-secondary-200/40 hover:shadow-lg hover:shadow-secondary-200/50 transition-all duration-300 relative overflow-hidden group border border-secondary-50">
    <!-- Subtle Gradient Decorator -->
    <div 
      class="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br rounded-full opacity-60 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110"
      :class="colorClasses[color] || colorClasses.primary"
    />

    <div class="relative z-10 flex justify-between items-start h-full">
      <div class="flex flex-col justify-between h-full flex-1 min-w-0">
        <div>
           <h3 class="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-2">
            {{ title }}
           </h3>
           <div class="flex items-baseline gap-2.5 flex-wrap">
             <span class="text-3xl font-semibold text-secondary-900 tracking-tight">{{ value }}</span>
           </div>
        </div>
        
        <div class="flex items-center gap-3 mt-4">
             <span 
              v-if="trend" 
              class="text-[10px] font-bold px-2 py-1 rounded-lg inline-flex items-center gap-1" 
              :class="[trendColor, trendBg]"
            >
              {{ trendIcon }} {{ Math.abs(trend) }}%
            </span>
             <p
              v-if="subtitle"
              class="text-xs font-medium text-secondary-400 truncate"
            >
              {{ subtitle }}
            </p>
        </div>
      </div>
        
      <!-- Optional Chart -->
      <div
        v-if="chartSeries"
        class="w-20 h-20 -mr-3 -mb-3 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
