<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClubStore } from '@/stores/club'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { ArrowLeft, Save, Upload } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const clubStore = useClubStore()

const member = ref(null)
const isEditing = ref(false)

// Form Data
const formData = ref({})

onMounted(() => {
    const id = route.params.id
    const found = clubStore.members.find(m => m.id === id)
    if (found) {
        member.value = found
        formData.value = { ...found }
    } else {
        // Handle not found (redirect or show error)
        router.push('/members')
    }
})

const save = () => {
    // Mock Save
    isEditing.value = false
    // Update store (simplified)
    const index = clubStore.members.findIndex(m => m.id === member.value.id)
    if (index !== -1) {
        clubStore.members[index] = { ...formData.value }
        member.value = { ...formData.value }
    }
}
</script>

<template>
  <div v-if="member">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <button
          class="p-2 -ml-2 text-secondary-500 hover:text-secondary-700 rounded-full hover:bg-secondary-100"
          @click="router.back()"
        >
          <ArrowLeft class="w-6 h-6" />
        </button>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Member' : member.firstName + ' ' + member.lastName }}
        </h1>
      </div>
      <div class="flex space-x-3">
        <BaseButton
          v-if="!isEditing"
          variant="outline"
          @click="isEditing = true"
        >
          Edit Profile
        </BaseButton>
        <BaseButton
          v-else
          @click="save"
        >
          <Save class="w-4 h-4 mr-2" />
          Save Changes
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <BaseCard title="Personal Information">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput 
              id="firstName" 
              v-model="formData.firstName" 
              label="First Name" 
              :disabled="!isEditing"
            />
            <BaseInput 
              id="lastName" 
              v-model="formData.lastName" 
              label="Last Name" 
              :disabled="!isEditing"
            />
            <BaseInput 
              id="dob" 
              v-model="formData.dob" 
              label="Date of Birth"
              type="date" 
              :disabled="!isEditing"
            />
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                v-model="formData.gender" 
                :disabled="!isEditing"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </BaseCard>

        <BaseCard title="Guardian Information">
          <BaseInput 
            id="guardian" 
            v-model="formData.guardian" 
            label="Guardian Name" 
            :disabled="!isEditing"
          />
        </BaseCard>
      </div>

      <!-- Sidebar / Meta -->
      <div class="space-y-6">
        <BaseCard title="Club Status">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-gray-500">Current Status</span>
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="formData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
            >
              {{ formData.status }}
            </span>
          </div>
          <BaseButton 
            v-if="isEditing" 
            variant="outline" 
            block 
            @click="clubStore.toggleStatus(member.id); formData.status = member.status"
          >
            Toggle Status
          </BaseButton>
          <div class="mt-6 pt-6 border-t border-gray-100">
            <label class="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
            <select 
              v-model="formData.class" 
              :disabled="!isEditing"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option>Friend</option>
              <option>Companion</option>
              <option>Explorer</option>
              <option>Ranger</option>
              <option>Voyager</option>
              <option>Guide</option>
            </select>
          </div>
        </BaseCard>

        <BaseCard title="Documents">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center">
            <div class="text-center">
              <Upload class="mx-auto h-8 w-8 text-gray-400" />
              <div class="mt-2 text-xs text-gray-500">
                Upload Birth Certificate
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
