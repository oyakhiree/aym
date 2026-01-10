import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateId } from '@/utils/idGenerator'
import { MEMBER_STATUS } from '@/constants/curriculum'
import type { Member, MemberFormData, MemberStatus } from '@/types'

export const useClubStore = defineStore('club', () => {
    // State - Members
    const members = ref<Member[]>([
        { id: '1', firstName: 'John', lastName: 'Doe', gender: 'Male', class: 'Friend', status: 'Active', dob: '2010-05-15', guardian: 'Mr. Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', gender: 'Female', class: 'Companion', status: 'Active', dob: '2009-08-20', guardian: 'Mrs. Smith' },
        { id: '3', firstName: 'Mike', lastName: 'Brown', gender: 'Male', class: 'Explorer', status: 'Inactive', dob: '2008-01-10', guardian: 'Mr. Brown' },
        { id: '4', firstName: 'Sarah', lastName: 'Wilson', gender: 'Female', class: 'Ranger', status: 'Active', dob: '2007-11-05', guardian: 'Mrs. Wilson' },
        { id: '5', firstName: 'David', lastName: 'Lee', gender: 'Male', class: 'Voyager', status: 'Active', dob: '2006-03-30', guardian: 'Mr. Lee' },
    ])

    // Computed
    const activeMembersCount = computed<number>(() =>
        members.value.filter(m => m.status === 'Active').length
    )

    const inactiveMembersCount = computed<number>(() =>
        members.value.filter(m => m.status === 'Inactive').length
    )

    // Actions
    const toggleStatus = (id: string): void => {
        const member = members.value.find(m => m.id === id)
        if (member) {
            member.status = member.status === 'Active' ? 'Inactive' : 'Active'
        }
    }

    const addMember = (memberData: MemberFormData): void => {
        // Handle status - could be boolean from form or string
        let status: MemberStatus = MEMBER_STATUS.ACTIVE as MemberStatus
        if (typeof memberData.status === 'boolean') {
            status = memberData.status ? 'Active' : 'Inactive'
        } else if (memberData.status) {
            status = memberData.status
        }

        const newMember: Member = {
            id: generateId(),
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            dob: memberData.dob,
            gender: memberData.gender,
            class: memberData.class,
            guardian: memberData.guardian,
            phone: memberData.phone,
            status,
            joinedDate: new Date().toISOString()
        }
        members.value.unshift(newMember)
    }

    const getMemberById = (id: string): Member | undefined => {
        return members.value.find(m => m.id === id)
    }

    return {
        members,
        activeMembersCount,
        inactiveMembersCount,
        toggleStatus,
        addMember,
        getMemberById
    }
})
