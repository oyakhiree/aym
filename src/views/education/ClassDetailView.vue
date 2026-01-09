<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { ArrowLeft, Save, Calendar, CheckCircle, XCircle } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock Class Data & Students
const students = ref([
    { id: '1', name: 'John Doe', attendance: true },
    { id: '2', name: 'Jane Smith', attendance: true },
    { id: '3', name: 'Mike Brown', attendance: false },
    { id: '4', name: 'Sarah Wilson', attendance: true },
])
      <div class="flex items-center space-x-4">
        <button
          class="p-2 -ml-2 text-secondary-500 hover:text-secondary-700 rounded-full hover:bg-secondary-100"
          @click="router.back()"
        >
          <ArrowLeft class="w-6 h-6" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            Friend Class
          </h1>
          <p class="text-sm text-gray-500">
            Attendance Record
          </p>
        </div>
      </div>
      <BaseButton @click="save">
        <Save class="w-4 h-4 mr-2" />
        Save
      </BaseButton>
    </div>

    <!-- Date Picker -->
    <div class="mb-6">
      <div class="relative max-w-xs">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar class="h-5 w-5 text-gray-400" />
        </div>
        <input 
          v-model="date" 
          type="date"
          class="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg leading-5 bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
        >
      </div>
    </div>

    <!-- Student List -->
    <BaseCard no-padding>
      <ul class="divide-y divide-secondary-200">
        <li
          v-for="student in students"
          :key="student.id"
          class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
          @click="toggleAttendance(student)"
        >
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold mr-4">
              {{ student.name[0] }}
            </div>
            <span class="text-gray-900 font-medium">{{ student.name }}</span>
          </div>
          <div>
            <CheckCircle
              v-if="student.attendance"
              class="w-6 h-6 text-green-500"
            />
            <XCircle
              v-else
              class="w-6 h-6 text-gray-300"
            />
          </div>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>
