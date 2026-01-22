import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateId } from '@/utils/idGenerator'
import {
    PROGRESSIVE_CLASSES,
    HONOURS,
    READINESS_THRESHOLD,
    ATTENDANCE_WEIGHT,
    GRADE_WEIGHT,
    EXAM_STATUS
} from '@/constants/curriculum'
import { mockClasses } from '@/mocks'
import type { ClassData, ClassFormData, Assignment, Student, ClassStats, ExamStatus } from '@/types'

export const useClassStore = defineStore('class', () => {
    // State - Active Classes (initialized from mock data)
    const activeClasses = ref<ClassData[]>([...mockClasses])

    // Expose constants for use in components
    const progressiveClasses = PROGRESSIVE_CLASSES
    const honours = HONOURS

    // Computed
    const stats = computed<ClassStats>(() => ({
        activeCount: activeClasses.value.filter(c => c.status === 'Active').length,
        totalStudents: activeClasses.value.reduce((acc, curr) => acc + curr.students, 0)
    }))

    // Actions
    const addClass = (classData: ClassFormData): void => {
        const newClass: ClassData = {
            id: generateId(),
            students: 0,
            readiness: 0,
            status: 'Active',
            assignments: [],
            roster: [],
            ...classData
        }
        activeClasses.value.unshift(newClass)
    }

    const getClassById = (id: string): ClassData | undefined => {
        return activeClasses.value.find(c => c.id === id)
    }

    const updateAttendance = (classId: string, studentId: string, date: string, isPresent: boolean): void => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (!cls) return

        const student = cls.roster.find(s => s.id === studentId)
        if (student) {
            student.attendance[date] = isPresent
            updateReadiness(cls)
        }
    }

    const addAssignment = (classId: string, assignment: Omit<Assignment, 'id' | 'date'>): void => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (cls) {
            const newAssignment: Assignment = {
                id: generateId(),
                date: new Date().toISOString().split('T')[0],
                ...assignment
            }
            cls.assignments.push(newAssignment)
            // Initialize grades for this assignment
            cls.roster.forEach(s => {
                if (!s.grades) s.grades = {}
                s.grades[newAssignment.id] = 0
            })
            updateReadiness(cls)
        }
    }

    const updateGrade = (classId: string, studentId: string, assignmentId: string, score: number): void => {
        const cls = activeClasses.value.find(c => c.id === classId)
        if (!cls) return
        const student = cls.roster.find(s => s.id === studentId)
        if (student) {
            student.grades[assignmentId] = score
            updateReadiness(cls)
        }
    }

    /**
     * Core Business Logic: Calculate Readiness Score
     * Uses constants for weights and thresholds
     */
    const updateReadiness = (cls: ClassData): void => {
        let totalClassReadiness = 0

        cls.roster.forEach((student: Student) => {
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

            // Weighted Score using constants
            student.readinessScore = Math.round((attendancePct * ATTENDANCE_WEIGHT) + (gradePct * GRADE_WEIGHT))

            // Exam Eligibility using constant threshold
            student.examEligible = student.readinessScore >= READINESS_THRESHOLD
            student.examStatus = student.examStatus || (EXAM_STATUS.NONE as ExamStatus)

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
        getClassById,
        updateAttendance,
        addAssignment,
        updateGrade
    }
})
