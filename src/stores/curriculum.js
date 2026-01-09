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
            students: 4,
            readiness: 85, // Avg readiness
            startDate: '2026-01-05',
            status: 'Active',
            // Mock Roster & Data
            assignments: [
                { id: 'hw1', title: 'Memorize Psalm 23', maxScore: 100, type: 'Memory Verse', date: '2026-01-06' },
                { id: 'cw1', title: 'Knot Tying Practical', maxScore: 50, type: 'Classwork', date: '2026-01-10' }
            ],
            roster: [
                {
                    id: 's1', name: 'John Doe',
                    attendance: { '2026-01-05': true, '2026-01-06': true, '2026-01-07': true },
                    grades: { 'hw1': 90, 'cw1': 45 }
                },
                {
                    id: 's2', name: 'Jane Smith',
                    attendance: { '2026-01-05': true, '2026-01-06': false, '2026-01-07': true },
                    grades: { 'hw1': 100, 'cw1': 50 }
                },
                {
                    id: 's3', name: 'Mike Brown',
                    attendance: { '2026-01-05': false, '2026-01-06': false, '2026-01-07': true },
                    grades: { 'hw1': 0, 'cw1': 30 } // 0 indicates missing/graded 0
                },
                {
                    id: 's4', name: 'Sarah Wilson',
                    attendance: { '2026-01-05': true, '2026-01-06': true, '2026-01-07': true },
                    grades: { 'hw1': 95, 'cw1': 48 }
                }
            ]
        },
        {
            id: '2',
            type: 'Honour',
            name: 'Christian Citizenship',
            instructor: 'Jane Doe',
            students: 25,
            readiness: 40,
            startDate: '2026-01-08',
            status: 'Active',
            assignments: [],
            roster: []
        },
        {
            id: '3',
            type: 'Progressive',
            name: 'Companion',
            instructor: 'David Wilson',
            students: 8,
            readiness: 92,
            startDate: '2025-11-20',
            status: 'Active',
            assignments: [],
            roster: []
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
            assignments: [],
            roster: [],
            ...classData
        })
    }

    // --- Actions ---

    // Record Attendance: date string (YYYY-MM-DD), updates for all students in list (or toggle single)
    const updateAttendance = (classId, studentId, date, isPresent) => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (!cls) return

        const student = cls.roster.find(s => s.id === studentId)
        if (student) {
            student.attendance[date] = isPresent
            updateReadiness(cls)
        }
    }

    const addAssignment = (classId, assignment) => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (cls) {
            cls.assignments.push({
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString().split('T')[0],
                ...assignment
            })
            // Initialize grades for this assignment
            cls.roster.forEach(s => {
                if (!s.grades) s.grades = {}
                s.grades[assignment.id] = 0 // Default or null
            })
            updateReadiness(cls)
        }
    }

    const updateGrade = (classId, studentId, assignmentId, score) => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (!cls) return
        const student = cls.roster.find(s => s.id === studentId)
        if (student) {
            student.grades[assignmentId] = score
            updateReadiness(cls)
        }
    }

    // Core Business Logic: Calculate Readiness
    // Readiness = (Attendance % * 0.4) + (Assignment Avg % * 0.6)
    // Exam eligibility requires > 75% Total Score
    const updateReadiness = (cls) => {
        let totalClassReadiness = 0

        cls.roster.forEach(student => {
            // 1. Attendance Score
            const days = Object.keys(student.attendance).length
            const presentDays = Object.values(student.attendance).filter(Boolean).length
            const attendancePct = days > 0 ? (presentDays / days) * 100 : 100

            // 2. Assignment Score
            let gradeSum = 0
            let maxSum = 0
            cls.assignments.forEach(a => {
                gradeSum += (student.grades[a.id] || 0)
                maxSum += (a.maxScore || 100)
            })
            const gradePct = maxSum > 0 ? (gradeSum / maxSum) * 100 : 100

            // Weighted Score
            student.readinessScore = Math.round((attendancePct * 0.4) + (gradePct * 0.6))

            // Exam Eligibility
            student.examEligible = student.readinessScore >= 75
            student.examStatus = student.examStatus || 'None' // None, Requested, Approved, Taken

            totalClassReadiness += student.readinessScore
        })

        // Update Class Aggregate
        cls.readiness = cls.roster.length > 0 ? Math.round(totalClassReadiness / cls.roster.length) : 0
    }

    return {
        activeClasses,
        progressiveClasses,
        honours,
        stats,
        addClass,
        updateAttendance,
        addAssignment,
        updateGrade
    }
})
