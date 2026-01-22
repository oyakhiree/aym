import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateId } from '@/utils/idGenerator'
import { MEMBER_STATUS } from '@/constants/curriculum'
import { mockMembers } from '@/mocks'
import type { Member, MemberFormData, MemberStatus } from '@/types'

export const useClubStore = defineStore('club', () => {
    // State - Members (initialized from mock data)
    const members = ref<Member[]>([...mockMembers])

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
