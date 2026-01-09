import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCurriculumStore = defineStore('curriculum', () => {
    // Mock Data - Active Classes
    const activeClasses = ref([
        {
            id: '1',
            type: 'Progressive',
            name: 'Friend',
            instructor: 'Master Guide John',
            students: 12,
            readiness: 85, // % ready for exam
            startDate: '2026-01-05',
            status: 'Active'
        },
        {
            id: '2',
            type: 'Honour',
            name: 'Christian Citizenship',
            instructor: 'Jane Doe',
            students: 25,
            readiness: 40,
            startDate: '2026-01-08',
            status: 'Active'
        },
        {
            id: '3',
            type: 'Progressive',
            name: 'Companion',
            instructor: 'David Wilson',
            students: 8,
            readiness: 92,
            startDate: '2025-11-20',
            status: 'Active'
        },
    ])

    // Mock Data - Master List (Available options)
    const progressiveClasses = ['Friend', 'Companion', 'Explorer', 'Ranger', 'Voyager', 'Guide']
    const honours = [
        'Christian Citizenship',
        'Stewardship',
        'Basic Rescue',
        'Camping Skills I',
        'Camping Skills II',
        'Drilling & Marching'
    ]

    const stats = computed(() => {
        return {
            activeCount: activeClasses.value.filter(c => c.status === 'Active').length,
            totalStudents: activeClasses.value.reduce((acc, curr) => acc + curr.students, 0)
        }
    })

    const addClass = (classData) => {
        activeClasses.value.unshift({
            id: Math.random().toString(36).substr(2, 9),
            students: 0,
            readiness: 0,
            status: 'Active',
            ...classData
        })
    }

    return {
        activeClasses,
        progressiveClasses,
        honours,
        stats,
        addClass
    }
})
