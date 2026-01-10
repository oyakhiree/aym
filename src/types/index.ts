/**
 * Type Definitions for AYM Club Management System
 * Following TypeScript best practices with strict typing
 */

// ============================================
// Member Types
// ============================================

export type Gender = 'Male' | 'Female'
export type MemberStatus = 'Active' | 'Inactive'

export interface Member {
    id: string
    firstName: string
    lastName: string
    dob: string
    gender: Gender
    class: string
    guardian: string
    phone?: string
    status: MemberStatus
    joinedDate?: string
}

export interface MemberFormData {
    firstName: string
    lastName: string
    dob: string
    gender: Gender
    class: string
    guardian: string
    phone?: string
    status?: MemberStatus | boolean
}

// ============================================
// Class/Education Types
// ============================================

export type ClassType = 'Progressive' | 'Honour'
export type ExamStatus = 'None' | 'Requested' | 'Approved' | 'Taken'
export type AssignmentType = 'Classwork' | 'Homework' | 'Memory Verse' | 'Practical'

export interface Assignment {
    id: string
    title: string
    maxScore: number
    type: AssignmentType
    date: string
}

export interface StudentAttendance {
    [date: string]: boolean
}

export interface StudentGrades {
    [assignmentId: string]: number
}

export interface Student {
    id: string
    name: string
    attendance: StudentAttendance
    grades: StudentGrades
    readinessScore?: number
    examEligible?: boolean
    examStatus?: ExamStatus
}

export interface ClassData {
    id: string
    type: ClassType
    name: string
    instructor: string
    students: number
    readiness: number
    startDate: string
    status: 'Active' | 'Completed' | 'Cancelled'
    assignments: Assignment[]
    roster: Student[]
}

export interface ClassFormData {
    type: ClassType
    name: string
    instructor: string
    startDate: string
}

// ============================================
// Event Types
// ============================================

export interface EventReport {
    summary: string
    attendance: number
    images: string[]
    submittedAt?: string
}

export interface Event {
    id: string
    title: string
    description: string
    date: string
    location: string
    image: string
    attendees: number
    report: EventReport | null
}

export interface EventFormData {
    title: string
    description?: string
    date: string
    location?: string
    image?: string
}

export interface EventReportFormData {
    summary: string
    attendance: number
    images: string[]
}

// ============================================
// Store Return Types
// ============================================

export interface ClassStats {
    activeCount: number
    totalStudents: number
}

// ============================================
// API Response Types (for future use)
// ============================================

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}

// ============================================
// Error Handling Types
// ============================================

export interface AsyncResult<T> {
    success: boolean
    data?: T
    error?: string
}
