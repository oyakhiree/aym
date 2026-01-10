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

    // Mock Data - Events
    const events = ref([
        {
            id: '1',
            title: 'World Pathfinder Day',
            description: 'A global celebration of Pathfinders. We will be marching at the conference headquarters.',
            date: '2026-09-19',
            location: 'Conference HQ, Lagos',
            image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop',
            attendees: 150,
            report: null // No report yet
        },
        {
            id: '2',
            title: 'Nature Hiking Adventure',
            description: 'An adventurous hike through the hills to learn about nature and creation.',
            date: '2026-05-12',
            location: 'Olumo Rock',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
            attendees: 45,
            report: {
                summary: 'The hike was a resounding success. We identified 15 species of birds.',
                attendance: 42,
                images: [
                    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2673&auto=format&fit=crop'
                ]
            }
        },
        {
            id: '3',
            title: 'Community Service: Clean Up',
            description: 'Cleaning up the local market square as part of our GYD activities.',
            date: '2026-03-18',
            location: 'Magboro Market',
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop',
            attendees: 30,
            report: null
        }
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

    // --- Event Actions ---
    const addEvent = (eventData) => {
        events.value.unshift({
            id: Math.random().toString(36).substr(2, 9),
            ...eventData,
            image: eventData.image || 'https://images.unsplash.com/photo-1526634333649-61ac04b281f6?q=80&w=2670&auto=format&fit=crop',
            attendees: 0,
            report: null
        })
    }

    const updateEvent = (id, updates) => {
        const index = events.value.findIndex(e => e.id === id)
        if (index !== -1) {
            events.value[index] = { ...events.value[index], ...updates }
        }
    }

    const submitEventReport = (id, reportData) => {
        const event = events.value.find(e => e.id === id)
        if (event) {
            event.report = {
                submittedAt: new Date().toISOString(),
                ...reportData
            }
            // Update main attendee count if reported differently?
            if (reportData.attendance) event.attendees = reportData.attendance
        }
    }

    return {
        activeClasses,
        events, // Exported
        progressiveClasses,
        honours,
        stats,
        addClass,
        updateAttendance,
        addAssignment,
        updateGrade,
        addEvent,
        updateEvent,
        submitEventReport
    }
})
