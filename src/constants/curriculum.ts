/**
 * Curriculum & Education Constants
 * Centralized configuration for business logic thresholds and options.
 */

import type { ExamStatus as ExamStatusType, MemberStatus as MemberStatusType, AssignmentType } from '@/types'

// Readiness Score Configuration
export const READINESS_THRESHOLD: number = 75 // Minimum score for exam eligibility
export const ATTENDANCE_WEIGHT: number = 0.4
export const GRADE_WEIGHT: number = 0.6

// Progressive Class Levels (in order)
export const PROGRESSIVE_CLASSES: readonly string[] = [
    'Friend',
    'Companion',
    'Explorer',
    'Ranger',
    'Voyager',
    'Guide',
    'Master Guide'
] as const

// Available Honours
export const HONOURS: readonly string[] = [
    'Christian Citizenship',
    'Stewardship',
    'Basic Rescue',
    'Camping Skills I',
    'Camping Skills II',
    'Drilling & Marching',
    'First Aid',
    'Nature Study'
] as const

// Exam Status Types
export const EXAM_STATUS: Record<string, ExamStatusType> = {
    NONE: 'None',
    REQUESTED: 'Requested',
    APPROVED: 'Approved',
    TAKEN: 'Taken'
} as const

// Member Status Types
export const MEMBER_STATUS: Record<string, MemberStatusType> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
} as const

// Assignment Types
export const ASSIGNMENT_TYPES: Record<string, AssignmentType> = {
    CLASSWORK: 'Classwork',
    HOMEWORK: 'Homework',
    MEMORY_VERSE: 'Memory Verse',
    PRACTICAL: 'Practical'
} as const
