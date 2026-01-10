import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateId } from '@/utils/idGenerator'
import { MEMBER_STATUS } from '@/constants/curriculum'

export const useClubStore = defineStore('club', () => {
    // Mock Data
    const members = ref([
        { id: '1', firstName: 'John', lastName: 'Doe', gender: 'Male', class: 'Friend', status: 'Active', dob: '2010-05-15', guardian: 'Mr. Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', gender: 'Female', class: 'Companion', status: 'Active', dob: '2009-08-20', guardian: 'Mrs. Smith' },
        { id: '3', firstName: 'Mike', lastName: 'Brown', gender: 'Male', class: 'Explorer', status: 'Inactive', dob: '2008-01-10', guardian: 'Mr. Brown' },
        { id: '4', firstName: 'Sarah', lastName: 'Wilson', gender: 'Female', class: 'Ranger', status: 'Active', dob: '2007-11-05', guardian: 'Mrs. Wilson' },
        { id: '5', firstName: 'David', lastName: 'Lee', gender: 'Male', class: 'Voyager', status: 'Active', dob: '2006-03-30', guardian: 'Mr. Lee' },
    ])

    const activeMembersCount = computed(() => members.value.filter(m => m.status === 'Active').length)
    const inactiveMembersCount = computed(() => members.value.filter(m => m.status === 'Inactive').length)

    const toggleStatus = (id) => {
        const member = members.value.find(m => m.id === id)
        if (member) {
            member.status = member.status === 'Active' ? 'Inactive' : 'Active'
        }
    }

    const addMember = (memberData) => {
        const newMember = {
            id: generateId(),
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            dob: memberData.dob,
            gender: memberData.gender,
            class: memberData.class,
            guardian: memberData.guardian,
            status: memberData.status || MEMBER_STATUS.ACTIVE,
            joinedDate: new Date().toISOString(),
            ...memberData
        }
        members.value.unshift(newMember)
    }

    return {
        members,
        activeMembersCount,
        inactiveMembersCount,
        toggleStatus,
        addMember
    }
})
